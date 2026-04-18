"""
Add sync-assets pipeline to workflow Gerar Visualizacao 3D (mdS08sfQ3nhQ3HC7).

Adiciona 2 nós em paralelo após "Agregar URLs":
  - Buscar Projeto ID 3D (postgres): resolve projeto_id a partir de telefone
  - Sync Assets 3D ao Site (HTTP POST): popula projeto_assets_cache no casaslsf

Safe: ambos os nós têm onError=continueRegularOutput, não bloqueiam WhatsApp.

Uso: python add_sync_to_gerar_3d.py
"""
import os
import sys

# Reuse DeployClient from LSF-Intelligence-AI (read-only reference)
LSF_DEPLOY_PATH = r"C:\Users\PC\Desktop\LSF-Intelligence-AI\scripts\deploy"
sys.path.insert(0, LSF_DEPLOY_PATH)
from deploy_utils import DeployClient  # noqa: E402

WORKFLOW_ID = "mdS08sfQ3nhQ3HC7"
SOURCE_NODE = "Agregar URLs"
PG_NODE_NAME = "Buscar Projeto ID 3D"
HTTP_NODE_NAME = "Sync Assets 3D ao Site"

BACKEND_URL = "https://casas-lsf-backend.dy3pb5.easypanel.host"
SECRET = "diagnostico-lsf-2026-abril"
POSTGRES_CRED_ID = "ibASYoMr4VE9xhU9"  # "Postgres n8n-evo"
POSTGRES_CRED_NAME = "Postgres n8n-evo"


def build_postgres_node():
    """Resolve projeto_id: use agent-supplied first, else lookup by telefone."""
    return {
        "parameters": {
            "operation": "executeQuery",
            "query": (
                "SELECT COALESCE(\n"
                "  CAST(NULLIF($1, '') AS INTEGER),\n"
                "  (SELECT id FROM projetos\n"
                "    WHERE telefone = $2\n"
                "      AND ativo = true AND deleted_at IS NULL\n"
                "    ORDER BY updated_at DESC NULLS LAST, id DESC\n"
                "    LIMIT 1)\n"
                ") AS projeto_id"
            ),
            "queryReplacement": (
                "={{ String($('Parse Input').first().json.projeto_id || '') }},"
                "={{ $json.telefone || '' }}"
            ),
            "options": {},
        },
        "id": "buscar-projeto-id-3d-001",
        "name": PG_NODE_NAME,
        "type": "n8n-nodes-base.postgres",
        "typeVersion": 2.5,
        "position": [3200, 1500],
        "credentials": {
            "postgres": {
                "id": POSTGRES_CRED_ID,
                "name": POSTGRES_CRED_NAME,
            }
        },
        "onError": "continueRegularOutput",
    }


def build_http_node():
    """POST render_3d_drive_ids to casaslsf backend sync-assets."""
    body = (
        "={{ {"
        " \"render_3d_drive_ids\": ($('Agregar URLs').first().json.imagens || [])"
        ".map(i => i.file_id).filter(Boolean)"
        " } }}"
    )
    url = (
        f"={{{{ ($json.projeto_id || 0) > 0 ? "
        f"'{BACKEND_URL}/api/admin/sync-assets/' + $json.projeto_id + "
        f"'?secret={SECRET}' : "
        f"'{BACKEND_URL}/health' }}}}"
    )
    return {
        "parameters": {
            "method": "POST",
            "url": url,
            "sendBody": True,
            "specifyBody": "json",
            "jsonBody": body,
            "options": {"timeout": 8000},
        },
        "id": "sync-assets-3d-001",
        "name": HTTP_NODE_NAME,
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 4.2,
        "position": [3500, 1500],
        "onError": "continueRegularOutput",
    }


def main():
    client = DeployClient()
    print(f"[1/5] Fetching workflow {WORKFLOW_ID}...")
    wf = client.fetch_workflow(WORKFLOW_ID)
    print(f"      Name: {wf.get('name')}")
    print(f"      Nodes: {len(wf.get('nodes', []))}")

    nodes = wf.get("nodes", [])
    connections = wf.get("connections", {})

    # Idempotency
    existing = [n["name"] for n in nodes if n["name"] in (PG_NODE_NAME, HTTP_NODE_NAME)]
    if existing:
        print(f"[!] Nodes already present ({existing}) — replacing")
        nodes = [n for n in nodes if n["name"] not in (PG_NODE_NAME, HTTP_NODE_NAME)]

    print(f"[2/5] Adding '{PG_NODE_NAME}' (postgres)...")
    nodes.append(build_postgres_node())

    print(f"[3/5] Adding '{HTTP_NODE_NAME}' (HTTP POST)...")
    nodes.append(build_http_node())

    # Agregar URLs current outputs: [Retornar Resultado], [Atualizar Fase Conversa]
    # Add a 3rd output branch to our new postgres node.
    src_conn = connections.get(SOURCE_NODE, {}).get("main", [])
    while len(src_conn) < 3:
        src_conn.append([])

    # Clean self-refs
    for i in range(len(src_conn)):
        src_conn[i] = [c for c in src_conn[i] if c.get("node") not in (PG_NODE_NAME, HTTP_NODE_NAME)]

    src_conn[2].append({"node": PG_NODE_NAME, "type": "main", "index": 0})
    connections[SOURCE_NODE] = {"main": src_conn}

    # Postgres -> HTTP
    connections[PG_NODE_NAME] = {
        "main": [[{"node": HTTP_NODE_NAME, "type": "main", "index": 0}]]
    }

    wf["nodes"] = nodes
    wf["connections"] = connections

    print(f"[4/5] Validating + deploying (with auto-backup)...")
    client.deploy_workflow(WORKFLOW_ID, wf, version_label="add_sync_assets_3d")

    ok, msg = client.smoke_test(WORKFLOW_ID)
    print(f"[5/5] Smoke: {'OK' if ok else 'FAIL'}: {msg}")


if __name__ == "__main__":
    main()
