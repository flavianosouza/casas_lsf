"""
Google Drive helper for fetching public assets (plantas, 3D renders, PDFs).

Uses the public lh3.googleusercontent.com CDN for images and Drive's direct
download URL for PDFs. No OAuth required — files must be set to "anyone with
link can view" (which n8n does by default when it uploads).

For discovery (finding the file ID from a projeto's telefone + tipologia),
we rely on cached mappings in the `projeto_assets_cache` table. On cache miss
we return None and log — we do NOT hit Drive API at request time to avoid
quotas and latency. Cache is populated separately (Fase 2 background job).
"""
from __future__ import annotations

import re
from typing import Literal, Optional
import httpx


DRIVE_FOLDER_PLANTAS_2D = "16cIsT6SBIDqciALn5GW-DTYDVSy7x9s6"
DRIVE_FOLDER_MAPA = "1nhhYvVgxKzOD128GJEvBFfknvmYddJJO"


def lh3_url(file_id: str) -> str:
    """Public CDN URL for a Drive file (works for images and small docs)."""
    return f"https://lh3.googleusercontent.com/d/{file_id}"


def drive_uc_url(file_id: str) -> str:
    """Direct download URL (used for PDFs)."""
    return f"https://drive.google.com/uc?export=download&id={file_id}"


def extract_drive_file_ids(google_drive_link: Optional[str]) -> list[str]:
    """Parse `plantas_geradas.google_drive_link` which may contain multiple
    links separated by '|'. Returns list of file IDs."""
    if not google_drive_link:
        return []
    ids = []
    for link in google_drive_link.split("|"):
        m = re.search(r"/file/d/([A-Za-z0-9_-]+)", link.strip())
        if m:
            ids.append(m.group(1))
    return ids


AssetTipo = Literal["planta2d", "render3d", "pdf"]


PDF_TITULOS = {
    "mapa": "Mapa de Quantidade",
    "cron_fin": "Cronograma Financeiro",
    "cron_exe": "Cronograma Executivo",
    "proposta": "Proposta de Licenciamento",
}


async def fetch_drive_bytes(file_id: str, *, is_pdf: bool = False) -> tuple[bytes, str]:
    """Fetch file bytes from Drive public URL. Returns (bytes, content_type)."""
    url = drive_uc_url(file_id) if is_pdf else lh3_url(file_id)
    async with httpx.AsyncClient(follow_redirects=True, timeout=30.0) as client:
        r = await client.get(url)
        r.raise_for_status()
        content_type = r.headers.get("content-type", "application/octet-stream")
        return r.content, content_type
