"""Update existing articles via the API PUT endpoint with corrected orthography."""
import json
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "backend"))
from app.seed_data import ARTIGOS

API_URL = "https://casas-lsf-backend.dy3pb5.easypanel.host"

from urllib.request import Request, urlopen
from urllib.error import HTTPError

# First, get existing articles to find their IDs by slug
resp = urlopen(f"{API_URL}/api/artigos/?por_pagina=50")
data = json.loads(resp.read().decode())

# Build slug -> id mapping
slug_to_id = {}
for artigo in data["artigos"]:
    slug_to_id[artigo["slug"]] = artigo["id"]

print(f"Encontrados {len(slug_to_id)} artigos na base de dados.\n")

# Update each article
for artigo_data in ARTIGOS:
    slug = artigo_data["slug"]
    artigo_id = slug_to_id.get(slug)

    if not artigo_id:
        print(f"  SKIP: {slug} - nao encontrado na BD")
        continue

    payload = {
        "titulo": artigo_data["titulo"],
        "resumo": artigo_data["resumo"],
        "conteudo_html": artigo_data["conteudo_html"],
        "meta_title": artigo_data.get("meta_title"),
        "meta_description": artigo_data.get("meta_description"),
        "tags": artigo_data.get("tags"),
    }

    body = json.dumps(payload).encode("utf-8")
    req = Request(
        f"{API_URL}/api/artigos/{artigo_id}",
        data=body,
        headers={"Content-Type": "application/json"},
        method="PUT",
    )
    try:
        resp = urlopen(req)
        print(f"  OK: {slug}")
    except HTTPError as e:
        err_body = e.read().decode()
        print(f"  ERRO ({e.code}): {slug} - {err_body}")

print("\nAtualização concluída!")
