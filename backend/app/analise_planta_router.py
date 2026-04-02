"""
Router: /api/analise-planta
Recebe upload de planta (JPG/PNG/PDF), valida, guarda no R2, cria lead na BD,
dispara webhook N8N para campanha.
"""
import os
import re
import io
import time
import hashlib
from datetime import datetime
from collections import defaultdict
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Request
from sqlalchemy import text
import httpx
import boto3
from botocore.config import Config as BotoConfig

router = APIRouter(tags=["analise-planta"])

# ─── Config ─────────────────────────────────────────────
R2_ACCESS_KEY = os.getenv("R2_ACCESS_KEY_ID", "03962a23645842dcb614f17fd9e3547f")
R2_SECRET_KEY = os.getenv("R2_SECRET_ACCESS_KEY", "5f4eba845db326d07a651acf7022a6f42dd0816567d0d6d477ce42551adfa2be")
R2_ENDPOINT = os.getenv("R2_ENDPOINT", "https://f0fd03f172150c2ce35fb6d939ef641f.r2.cloudflarestorage.com")
R2_BUCKET = os.getenv("R2_BUCKET", "casaslsf-media")
R2_PUBLIC_URL = "https://media.casaslsf.com"

N8N_CAMPANHA_WEBHOOK = "https://n8n.lsfbuilderpro.com/webhook/campanha-analise-planta"

# Engineering DB (n8n server — leads table)
ENG_DB_URL = os.getenv("ENGINEERING_DB_URL", "")

# ─── Rate limiting (in-memory, per-IP) ──────────────────
_rate_limits: dict[str, list[float]] = defaultdict(list)
RATE_LIMIT = 5  # max requests per minute per IP

# ─── Magic bytes for file validation ────────────────────
MAGIC_BYTES = {
    "image/jpeg": [b"\xff\xd8\xff"],
    "image/png": [b"\x89PNG"],
    "application/pdf": [b"%PDF"],
}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".pdf"}


def _check_rate_limit(ip: str) -> bool:
    now = time.time()
    _rate_limits[ip] = [t for t in _rate_limits[ip] if now - t < 60]
    if len(_rate_limits[ip]) >= RATE_LIMIT:
        return False
    _rate_limits[ip].append(now)
    return True


def _validate_magic_bytes(content: bytes, content_type: str) -> bool:
    patterns = MAGIC_BYTES.get(content_type, [])
    if not patterns:
        return False
    return any(content[:len(p)] == p for p in patterns)


def _strip_exif(content: bytes, content_type: str) -> bytes:
    if content_type not in ("image/jpeg", "image/png"):
        return content
    try:
        from PIL import Image
        img = Image.open(io.BytesIO(content))
        clean = io.BytesIO()
        img.save(clean, format=img.format or "JPEG", quality=95)
        return clean.getvalue()
    except Exception:
        return content


def _normalize_phone(phone: str) -> str:
    digits = re.sub(r"\D", "", phone)
    # Remove PT prefix
    for prefix in ["00351", "+351", "351"]:
        if digits.startswith(prefix.replace("+", "")):
            digits = digits[len(prefix.replace("+", "")):]
    return digits[-9:] if len(digits) >= 9 else digits


def _validate_phone(phone: str) -> bool:
    digits = _normalize_phone(phone)
    return len(digits) == 9 and digits[0] in ("9", "2")


@router.post("/api/analise-planta")
async def analise_planta(
    request: Request,
    file: UploadFile = File(...),
    nome: str = Form(...),
    telefone: str = Form(...),
    utm_source: str = Form(""),
    utm_medium: str = Form(""),
    utm_campaign: str = Form(""),
):
    # ─── Rate limit ─────────────────────────────────────
    client_ip = request.client.host if request.client else "unknown"
    if not _check_rate_limit(client_ip):
        raise HTTPException(429, "Demasiados pedidos. Tente novamente em 1 minuto.")

    # ─── Validate nome ──────────────────────────────────
    nome = nome.strip()
    if len(nome) < 2:
        raise HTTPException(422, "Nome deve ter pelo menos 2 caracteres.")

    # ─── Validate telefone ──────────────────────────────
    if not _validate_phone(telefone):
        raise HTTPException(422, "Telefone inválido. Deve ter 9 dígitos e começar por 9 ou 2.")
    phone_normalized = _normalize_phone(telefone)

    # ─── Validate file extension ────────────────────────
    filename = file.filename or "unknown"
    ext = os.path.splitext(filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(422, f"Tipo de ficheiro não suportado: {ext}. Use JPG, PNG ou PDF.")

    # Check double extension attack
    parts = filename.split(".")
    if len(parts) > 2:
        raise HTTPException(422, "Nome de ficheiro inválido.")

    # ─── Read file content ──────────────────────────────
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(422, f"Ficheiro demasiado grande. Máximo: {MAX_FILE_SIZE // (1024*1024)}MB.")
    if len(content) < 1024:
        raise HTTPException(422, "Ficheiro demasiado pequeno ou corrompido.")

    # ─── Validate magic bytes ───────────────────────────
    content_type = file.content_type or "application/octet-stream"
    # Map extension to expected content type
    ext_to_mime = {".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".pdf": "application/pdf"}
    expected_mime = ext_to_mime.get(ext, content_type)

    if not _validate_magic_bytes(content, expected_mime):
        raise HTTPException(422, "Conteúdo do ficheiro não corresponde ao tipo declarado.")

    # ─── Strip EXIF ─────────────────────────────────────
    content = _strip_exif(content, expected_mime)

    # ─── Upload to R2 ───────────────────────────────────
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_hash = hashlib.md5(content[:4096]).hexdigest()[:8]
    r2_key = f"plantas-campanha/{ts}_{phone_normalized}_{file_hash}{ext}"

    try:
        s3 = boto3.client(
            "s3",
            endpoint_url=R2_ENDPOINT,
            aws_access_key_id=R2_ACCESS_KEY,
            aws_secret_access_key=R2_SECRET_KEY,
            config=BotoConfig(signature_version="s3v4"),
            region_name="auto",
        )
        s3.put_object(Bucket=R2_BUCKET, Key=r2_key, Body=content, ContentType=expected_mime)
        r2_url = f"{R2_PUBLIC_URL}/{r2_key}"
    except Exception as e:
        raise HTTPException(500, f"Erro ao guardar ficheiro: {str(e)[:100]}")

    # ─── Insert lead in engineering DB ──────────────────
    lead_id = None
    if ENG_DB_URL:
        try:
            import asyncpg
            conn = await asyncpg.connect(ENG_DB_URL.replace("+asyncpg", "").replace("postgresql://", "postgresql://"))
            row = await conn.fetchrow(
                """INSERT INTO leads (telefone, nome, origem, utm_source, utm_medium, utm_campaign)
                   VALUES ($1, $2, 'campanha_analise_planta', $3, $4, $5)
                   ON CONFLICT DO NOTHING
                   RETURNING id""",
                phone_normalized, nome,
                utm_source or None, utm_medium or None, utm_campaign or None
            )
            if row:
                lead_id = row["id"]
            else:
                # Lead already exists — get existing ID
                row = await conn.fetchrow(
                    "SELECT id FROM leads WHERE RIGHT(telefone, 9) = RIGHT($1, 9) LIMIT 1",
                    phone_normalized
                )
                if row:
                    lead_id = row["id"]
            await conn.close()
        except Exception:
            pass  # Lead creation is best-effort — webhook still fires

    # ─── Trigger N8N webhook ────────────────────────────
    wa_link = ""
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(N8N_CAMPANHA_WEBHOOK, json={
                "nome": nome,
                "telefone": phone_normalized,
                "r2_url": r2_url,
                "lead_id": lead_id,
                "utm_source": utm_source,
                "utm_medium": utm_medium,
                "utm_campaign": utm_campaign,
            })
            if resp.status_code == 200:
                data = resp.json()
                wa_link = data.get("wa_link", "")
    except Exception:
        pass  # Webhook is best-effort

    if not wa_link:
        wa_link = f"https://wa.me/351930423456?text={httpx.URL('').copy_merge_params({'text': f'Olá! Enviei a minha planta para análise. O meu nome é {nome}.'})}"
        # Simpler fallback
        import urllib.parse
        msg = urllib.parse.quote(f"Olá! Enviei a minha planta para análise no site. O meu nome é {nome}.")
        wa_link = f"https://wa.me/351930423456?text={msg}"

    return {
        "success": True,
        "lead_id": lead_id,
        "r2_url": r2_url,
        "wa_link": wa_link,
        "message": "Planta recebida com sucesso. Vamos analisar e contactar por WhatsApp em 24h.",
    }
