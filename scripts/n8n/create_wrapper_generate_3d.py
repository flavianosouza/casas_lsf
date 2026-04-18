"""
Create wrapper workflow that exposes Gerar 3D (mdS08sfQ3nhQ3HC7) via webhook.

Arquitectura:
  POST https://{N8N}/webhook/generate-3d-casaslsf
    header: X-Casaslsf-Secret: diagnostico-lsf-2026-abril
    body: { projeto_id?, telefone?, lead_id? }
  → workflow wrapper chama mdS08sfQ3nhQ3HC7 como sub-workflow
  → responde { ok: true }

Isto permite ao backend casaslsf disparar gerações 3D sem alterar o workflow
original e sem expor credenciais n8n.

Uso: python create_wrapper_generate_3d.py
"""
import os
import sys
import requests

LSF_DEPLOY_PATH = r"C:\Users\PC\Desktop\LSF-Intelligence-AI\scripts\deploy"
sys.path.insert(0, LSF_DEPLOY_PATH)
from deploy_utils import DeployClient  # noqa: E402

WRAPPER_NAME = "Admin Generate 3D (casaslsf trigger)"
TARGET_3D_WORKFLOW_ID = "mdS08sfQ3nhQ3HC7"
WEBHOOK_PATH = "generate-3d-casaslsf"
WEBHOOK_SECRET = "diagnostico-lsf-2026-abril"


def build_webhook_node():
    return {
        "parameters": {
            "httpMethod": "POST",
            "path": WEBHOOK_PATH,
            "responseMode": "responseNode",
            "options": {},
        },
        "id": "webhook-generate-3d-casaslsf",
        "name": "Webhook Casaslsf",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 2,
        "position": [250, 300],
        "webhookId": WEBHOOK_PATH,
    }


def build_auth_check():
    """If header secret doesn't match, return 401."""
    return {
        "parameters": {
            "conditions": {
                "options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict"},
                "conditions": [
                    {
                        "id": "auth-secret-check",
                        "leftValue": "={{ $json.headers['x-casaslsf-secret'] }}",
                        "rightValue": WEBHOOK_SECRET,
                        "operator": {"type": "string", "operation": "equals"},
                    }
                ],
                "combinator": "and",
            },
            "options": {},
        },
        "id": "auth-check",
        "name": "Verificar Secret",
        "type": "n8n-nodes-base.if",
        "typeVersion": 2,
        "position": [500, 300],
    }


def build_parse_body():
    """Extract projeto_id / telefone / lead_id from body."""
    return {
        "parameters": {
            "jsCode": (
                "const body = $input.first().json.body || {};\n"
                "const projeto_id = body.projeto_id ? Number(body.projeto_id) : null;\n"
                "const telefone = body.telefone ? String(body.telefone).replace(/\\D/g, '') : null;\n"
                "const lead_id = body.lead_id ? Number(body.lead_id) : null;\n"
                "if (!projeto_id && !telefone && !lead_id) {\n"
                "  throw new Error('Need at least one of: projeto_id, telefone, lead_id');\n"
                "}\n"
                "return [{ json: { projeto_id, telefone, lead_id, query: telefone || '' } }];"
            ),
        },
        "id": "parse-body",
        "name": "Parse Body",
        "type": "n8n-nodes-base.code",
        "typeVersion": 2,
        "position": [750, 200],
    }


def build_execute_sub():
    """Call Gerar 3D as sub-workflow."""
    return {
        "parameters": {
            "workflowId": {
                "__rl": True,
                "value": TARGET_3D_WORKFLOW_ID,
                "mode": "id",
            },
            "workflowInputs": {
                "mappingMode": "defineBelow",
                "value": {
                    "lead_id": "={{ $json.lead_id }}",
                    "telefone": "={{ $json.telefone }}",
                    "projeto_id": "={{ $json.projeto_id }}",
                    "query": "={{ $json.query }}",
                },
                "schema": [
                    {"id": "lead_id", "displayName": "lead_id", "type": "number", "required": False, "canBeUsedToMatch": False, "defaultMatch": False, "display": True},
                    {"id": "telefone", "displayName": "telefone", "type": "string", "required": False, "canBeUsedToMatch": False, "defaultMatch": False, "display": True},
                    {"id": "projeto_id", "displayName": "projeto_id", "type": "number", "required": False, "canBeUsedToMatch": False, "defaultMatch": False, "display": True},
                    {"id": "query", "displayName": "query", "type": "string", "required": False, "canBeUsedToMatch": False, "defaultMatch": False, "display": True},
                ],
                "matchingColumns": [],
            },
            "options": {},
        },
        "id": "execute-gerar-3d",
        "name": "Executar Gerar 3D",
        "type": "n8n-nodes-base.executeWorkflow",
        "typeVersion": 1.2,
        "position": [1000, 200],
    }


def build_respond_ok():
    return {
        "parameters": {
            "respondWith": "json",
            "responseBody": "={{ { ok: true, projeto_id: $('Parse Body').first().json.projeto_id, triggered_at: $now } }}",
            "options": {"responseCode": 200},
        },
        "id": "respond-ok",
        "name": "Responder OK",
        "type": "n8n-nodes-base.respondToWebhook",
        "typeVersion": 1,
        "position": [1250, 200],
    }


def build_respond_401():
    return {
        "parameters": {
            "respondWith": "json",
            "responseBody": "={{ { error: 'Invalid or missing X-Casaslsf-Secret header' } }}",
            "options": {"responseCode": 401},
        },
        "id": "respond-401",
        "name": "Responder 401",
        "type": "n8n-nodes-base.respondToWebhook",
        "typeVersion": 1,
        "position": [750, 450],
    }


def build_workflow():
    return {
        "name": WRAPPER_NAME,
        "nodes": [
            build_webhook_node(),
            build_auth_check(),
            build_parse_body(),
            build_execute_sub(),
            build_respond_ok(),
            build_respond_401(),
        ],
        "connections": {
            "Webhook Casaslsf": {
                "main": [[{"node": "Verificar Secret", "type": "main", "index": 0}]]
            },
            "Verificar Secret": {
                "main": [
                    # true
                    [{"node": "Parse Body", "type": "main", "index": 0}],
                    # false
                    [{"node": "Responder 401", "type": "main", "index": 0}],
                ]
            },
            "Parse Body": {
                "main": [[{"node": "Executar Gerar 3D", "type": "main", "index": 0}]]
            },
            "Executar Gerar 3D": {
                "main": [[{"node": "Responder OK", "type": "main", "index": 0}]]
            },
        },
        "settings": {
            "executionOrder": "v1",
        },
    }


def find_existing_by_name(client, name):
    """Search all workflows for a matching name."""
    r = requests.get(
        f"{client.base_url}/api/v1/workflows?limit=250",
        headers=client.headers,
    )
    r.raise_for_status()
    for wf in r.json().get("data", []):
        if wf.get("name") == name:
            return wf.get("id")
    return None


def create_workflow(client, wf_data):
    """POST /workflows to create new."""
    payload = {
        "name": wf_data["name"],
        "nodes": wf_data["nodes"],
        "connections": wf_data["connections"],
        "settings": wf_data.get("settings", {}),
    }
    r = requests.post(f"{client.base_url}/api/v1/workflows", headers=client.headers, json=payload)
    if not r.ok:
        print(f"[ERROR] {r.status_code}: {r.text[:400]}")
        r.raise_for_status()
    return r.json()


def main():
    client = DeployClient()
    wf_data = build_workflow()

    print(f"[1/4] Checking if '{WRAPPER_NAME}' already exists...")
    existing_id = find_existing_by_name(client, WRAPPER_NAME)
    if existing_id:
        print(f"      Found existing: {existing_id} — updating via PUT")
        client.deploy_workflow(existing_id, wf_data, version_label="update_wrapper")
        wf_id = existing_id
    else:
        print("[2/4] Creating new workflow...")
        created = create_workflow(client, wf_data)
        wf_id = created.get("id")
        print(f"      Created ID: {wf_id}")
        print(f"[3/4] Activating...")
        r = requests.post(f"{client.base_url}/api/v1/workflows/{wf_id}/activate", headers=client.headers)
        r.raise_for_status()
        print(f"      Activated")

    print(f"[4/4] Webhook URL to use from casaslsf backend:")
    print(f"        {client.base_url.replace('/api/v1', '')}/webhook/{WEBHOOK_PATH}")
    print(f"        (send POST with header X-Casaslsf-Secret: {WEBHOOK_SECRET})")
    print(f"        body: {{\"projeto_id\": 453}}  (or telefone, lead_id)")


if __name__ == "__main__":
    main()
