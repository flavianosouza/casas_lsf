# LSF Intelligence AI - Links do Sistema

> Atualizado: 24/03/2026 | Sessao 138

---

## Paineis Web (Acessiveis por Browser)

| Painel              | URL                                                       | Descricao                      |
| ------------------- | --------------------------------------------------------- | ------------------------------ |
| N8N Editor          | https://n8n.lsfbuilderpro.com                             | Editor de workflows n8n        |
| Chat Admin          | https://n8n.lsfbuilderpro.com/webhook/chat-admin?token=obrasnet2026admin | Painel web do assistente admin |
| Dashboard Metricas  | https://n8n.lsfbuilderpro.com/webhook/dashboard           | KPIs e metricas do sistema     |
| Dashboard KPIs API  | https://n8n.lsfbuilderpro.com/webhook/dashboard-kpis      | API JSON com KPIs              |
| GrupoObrasNet       | https://n8n.lsfbuilderpro.com/webhook/grupoobrasnet       | Pagina principal GrupoObrasNet |
| GrupoObrasNet Custo | https://n8n.lsfbuilderpro.com/webhook/grupoobrasnet-custo | Simulador de custos            |
| GrupoObrasNet Lucro | https://n8n.lsfbuilderpro.com/webhook/grupoobrasnet-lucro | Simulador de lucro             |
| Site                | https://casaslsf.com                                      | Site publico OBRASNET          |

---

## Webhooks Internos (API - NAO acessiveis por browser)

| Webhook                 | Metodo | URL                                                         | Workflow ID      |
| ----------------------- | ------ | ----------------------------------------------------------- | ---------------- |
| Chat Admin API          | POST   | https://n8n.lsfbuilderpro.com/webhook/chat-admin-api        | Xjz2Ysd1rqLzLSWY |
| Qualificador WhatsApp   | POST   | https://n8n.lsfbuilderpro.com/webhook/whatsapp-qualificador | GcLmgtWBpqtApjR7 |
| Notify Human (Telegram) | POST   | https://n8n.lsfbuilderpro.com/webhook/notify-human          | pQsxBXc6kIDc2VBd |
| Instagram Comentarios   | POST   | https://n8n.lsfbuilderpro.com/webhook/instagram-comentarios | AKmb51meWZ2tlUoR |
| Health Check (Schedule) | -      | Cron cada 30min                                             | r5erAUczAlsiBuB5 |

---

## Servicos Externos

| Servico                  | URL                            | Notas                            |
| ------------------------ | ------------------------------ | -------------------------------- |
| Evolution API (WhatsApp) | https://evo.lsfbuilderpro.com  | Instancia: QUALIFICADOR WHATSAPP |
| Easypanel                | https://easypanel.lsfbuilderpro.com | Admin VPS                   |
| Google Drive             | https://drive.google.com       | Plantas, orcamentos, renders 3D  |
| Telegram Bot             | Chat ID: 1057802876            | Notificacoes para Flaviano       |
| Meta Business            | https://business.facebook.com  | Instagram App + Webhooks         |

---

## Workflows Ativos (29 total, S138)

### Core (6)

| Workflow              | ID               | Nodes | Motor               | Descricao                              |
| --------------------- | ---------------- | ----- | -------------------- | -------------------------------------- |
| Qualificador WhatsApp | GcLmgtWBpqtApjR7 | 33    | Claude Sonnet 4.5    | Agente principal WhatsApp (13 tools)   |
| Chat-Admin HTML       | LsHLmw9VEvXhIOAC | -     | -                    | Interface web admin (GET)              |
| Chat-Admin API        | Xjz2Ysd1rqLzLSWY | 21    | Claude Sonnet 4.5    | API do chat admin (13 tools)           |
| Orcamentista          | eV1txGMzmqOnuWyO | 18    | Gemini Vision        | Pipeline orcamentos (4 PDFs)           |
| Gerar Planta          | LZVsCIDeMAHXxFke | 43    | Gemini+Claude        | Plantas 2D + Arquiteto + Validador     |
| Gerar 3D              | mdS08sfQ3nhQ3HC7 | 27    | Gemini Image         | Renders 3D (7 vistas)                  |

### Sub-workflows / Tools (8)

| Workflow              | ID               | Descricao                              |
| --------------------- | ---------------- | -------------------------------------- |
| Consultar Terrenos    | MmNHju2hE8M1pPum | Pesquisa terrenos BD (4 tiers)         |
| Guardar Planta        | cJMQSnMhryaoCrWI | Guardar planta recebida (media)        |
| Enviar Email Lead     | 3lf0l82YSBo9BYYg | Enviar email via Resend                |
| Listar Projetos       | 1g6ZtK2leCVdv9Lp | Listar projetos do lead                |
| Verificar PDM         | pCcjFg5dtaQqo9dQ | Consulta PDM municipal                 |
| Servico Unitario      | kgJKOIdrGMo538Bf | Orcamento servico unitario             |
| Notificar Quente      | i9ZHdq0gy6EWwcNM | Notificacao Telegram lead quente       |
| Agendar Visita        | gPc93sP7IKzucGGI | Google Calendar + Telegram             |

### Automacao (5)

| Workflow              | ID               | Schedule      | Descricao                    |
| --------------------- | ---------------- | ------------- | ---------------------------- |
| Follow-up Auto        | EWgbilxrkoE0dszE | Diario 14h    | 5 tiers, exclui optout       |
| Relatorio Semanal     | 31dzynulE6VmFOSb | Segunda 8h    | Stats SQL + Telegram         |
| Agente Email          | ODdxPCHo1xVweF2q | Gmail trigger | Claude classifica + responde |
| Health Check          | r5erAUczAlsiBuB5 | Cada 30min    | 5 checks + alerta Telegram   |
| Visual Hook           | 7S8tgHoECfUUOMed | Diario        | Hook visual automatico       |

### Instagram (2)

| Workflow              | ID               | Descricao                              |
| --------------------- | ---------------- | -------------------------------------- |
| Instagram Comentarios | AKmb51meWZ2tlUoR | Webhook Meta -> Claude -> Reply/DM     |
| Instagram Verify      | F2ehvUWNQ7T9nuSC | Verificacao token Meta                 |

### Reporting / Dashboards (4)

| Workflow              | ID               | Descricao                              |
| --------------------- | ---------------- | -------------------------------------- |
| Dashboard Metricas    | ren3l1RQhlU4X6zd | Webhook GET /dashboard                 |
| Dashboard KPIs        | iZFE00PmnKvNvQ5k | Webhook GET /dashboard-kpis (JSON)     |
| Notify Human          | pQsxBXc6kIDc2VBd | Webhook -> Telegram                    |
| Proposta Licenciamento| JLDnddV05BepDVjw | Gerar proposta PDF                     |

### Outros (4)

| Workflow              | ID               | Descricao                              |
| --------------------- | ---------------- | -------------------------------------- |
| Hunter Integrado      | CBaxIWzRVMHXEmka | Firecrawl scraping terrenos            |
| Terreno PDF           | 9Ov2-7ftWsIwQr3BjwwJy | PDF terreno                     |
| GrupoObrasNet (3x)    | -                | Paginas web (principal, custo, lucro)  |

### Desactivados (2)

| Workflow              | ID               | Razao                                  |
| --------------------- | ---------------- | -------------------------------------- |
| Rescue Leads          | 5qjbijwXTGrvOD5A | Non-funcional (S124)                   |
| Update Prices         | Xp25ExS55ALZLx3S | Credential+query broken (S124)         |

---

## Credenciais Chave

| Credencial             | ID n8n            | Uso                       |
| ---------------------- | ----------------- | ------------------------- |
| Postgres               | hr2XLhfZOgMPj2jX | Base de dados principal   |
| Anthropic Header Auth  | 9LJzcpuTka9VGfU2 | Claude API (HTTP nodes)   |
| Anthropic Native       | Bk484HJ8dYkpiTnQ | Claude API (Agent nodes)  |
| OpenAI                 | 5HvrH1uPjjg0KnJK | Fallback (desactivado)    |
| Google Calendar OAuth2 | QCMKbU6X93rx3Cjz | Agendar visitas           |
| Telegram Bot           | g5Q8KdYNJ3H8hshj | Notificacoes              |
| Instagram Token        | XzAvbrnelwpWP5gN | IGAA* (Bearer, ~60 dias)  |
| Evolution API Key      | -                 | 9131580B9518-43B7-B63C-811DBB7F25F9 |

---

## Base de Dados

| Parametro | Valor |
| --------- | ----- |
| Host      | 76.13.15.128 |
| Port      | 5432 |
| DB        | postgres |
| User      | postgres |
| Size      | ~79MB |

### Tabelas Principais

| Tabela            | Registos | Descricao                              |
| ----------------- | -------- | -------------------------------------- |
| leads             | ~129     | Leads WhatsApp + Email                 |
| projetos          | ~362     | Projetos por lead (multi-projeto)      |
| plantas_geradas   | ~442     | Plantas 2D + links Drive               |
| orcamentos        | ~51      | Orcamentos gerados                     |
| precos_materiais  | 470      | Tabela precos (3 gamas)                |
| terrenos          | 163      | Terrenos Idealista                     |
| n8n_chat_histories| ~2700+   | Historico conversas                    |
| instagram_leads   | -        | Leads Instagram                        |
| instagram_dedup   | -        | Dedup DMs (comment_id PK)             |
| pdm               | 24       | Regras PDM municipais                  |
