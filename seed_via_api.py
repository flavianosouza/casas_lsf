"""Seed articles via the API POST endpoint."""
import json
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "backend"))
from app.seed_data import ARTIGOS

API_URL = "https://casas-lsf-backend.dy3pb5.easypanel.host"

# Use urllib since requests might not be installed
from urllib.request import Request, urlopen
from urllib.error import HTTPError

for artigo in ARTIGOS:
    payload = {
        **artigo,
        "status": "publicado",
    }
    data = json.dumps(payload).encode("utf-8")
    req = Request(
        f"{API_URL}/api/artigos/",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        resp = urlopen(req)
        print(f"  OK: {artigo['slug']}")
    except HTTPError as e:
        body = e.read().decode()
        if "409" in str(e.code) or "ja existe" in body.lower():
            print(f"  Ja existe: {artigo['slug']}")
        else:
            print(f"  ERRO ({e.code}): {artigo['slug']} - {body}")

print("\nSeed concluido!")
