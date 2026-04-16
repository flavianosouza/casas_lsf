# AUDITORIA COMPLETA DO SISTEMA — S124

**Data:** 2026-03-22 | **Auditor:** Claude Opus 4.6 | **Fonte:** API Live (n8n.lsfbuilderpro.com)

---

## RESUMO EXECUTIVO

| Metrica | Valor |
|---------|-------|
| Workflows auditados | **31 activos** (+ Qualificador ja auditado S123) |
| Total nodes analisados | **~300 nodes** |
| Total issues encontradas | **157** |
| P0 Criticas | **15** |
| P1 Importantes | **70** |
| P2 Menores | **72** |

### Por Categoria

| Categoria | Workflows | Nodes | P0 | P1 | P2 | Total |
|-----------|-----------|-------|----|----|----| ------|
| CORE | 6 | 125 | 2 | 34 | 13 | 49 |
| TOOLS | 6 | 35 | 2 | 11 | 17 | 30 |
| AUTOMACAO | 6 | 41 | 9 | 14 | 13 | 36 |
| COMUNICACAO | 5 | 62 | 2 | 11 | 14 | 27 |
| REPORTING+MONITORING | 7 | 37 | 0 | 0 | 15 | 15 |
| Qualificador (S123) | 1 | 33 | 0 | 0 | 0 | 0 |
| **TOTAL** | **31** | **~300** | **15** | **70** | **72** | **157** |

---

## ACCAO IMEDIATA: DESACTIVAR

| Workflow | ID | Razao |
|----------|----|-------|
| **Rescue Leads** | DFcn5TiJkXtl83p2 | **100% nao-funcional.** Sem auth, sem body, instance errada. Superseded por Visual Hook |

---

## P0 — ISSUES CRITICAS (15)

### CORE (2 P0)

| # | Workflow | Issue | Impacto |
|---|----------|-------|---------|
| 1 | **Orcamentista** (eV1txGMzmqOnuWyO) | Node "Retornar Erro" orfao — sem conexao de entrada, nunca executa | Erro silencioso: falhas na pipeline nao retornam erro ao caller |
| 2 | **Orcamentista** (eV1txGMzmqOnuWyO) | Node "Check Whatsapp OK" duplicado (2 nodes com funcao identica) | Confusao de manutencao, possivel routing errado |

### TOOLS (2 P0)

| # | Workflow | Issue | Impacto |
|---|----------|-------|---------|
| 3 | **Terreno PDF** (gUb7Cvc2jXOxQPmP) | Webhook orfao — sem connections de saida | Endpoint activo mas nao faz nada, aceita requests inuteis |
| 4 | **Terreno PDF** (gUb7Cvc2jXOxQPmP) | Ghost connections para nodes que nao existem | Workflow structurally broken |

### AUTOMACAO (9 P0)

| # | Workflow | Issue | Impacto |
|---|----------|-------|---------|
| 5 | **Visual Hook** (OQTYmPqyMeMrJ0h6) | Evo API key ERRADA (diferente da .env) | Mensagens WhatsApp nao enviadas |
| 6 | **Visual Hook** (OQTYmPqyMeMrJ0h6) | SQL usa colunas que nao existem (`status`, `ultimo_contato`) | Query falha ou retorna zero rows |
| 7 | **Rescue Leads** (DFcn5TiJkXtl83p2) | Sem auth header na Evo API call | 401 Unauthorized em todas as execucoes |
| 8 | **Rescue Leads** (DFcn5TiJkXtl83p2) | Sem body na HTTP request + instance name errada | Request sempre falha |
| 9 | **Update Prices** (MZWwj0WcEXr3y8mJ) | Query parametrizada mas sem parametros definidos | Query executa sem filtro ou falha |
| 10 | **Update Prices** (MZWwj0WcEXr3y8mJ) | Credential placeholder (nao configurada) | Conexao DB falha |
| 11 | **Hunter** (CBaxIWzRVMHXEmka) | Referencia node que nao existe no workflow | Crash em runtime |
| 12 | **Hunter** (CBaxIWzRVMHXEmka) | Evo API key ERRADA | Mensagens WhatsApp nao enviadas |
| 13 | **Hunter** (CBaxIWzRVMHXEmka) | SQL usa colunas erradas (`status`, `ultimo_contato`) | Dados nunca encontrados/actualizados |

### COMUNICACAO (2 P0)

| # | Workflow | Issue | Impacto |
|---|----------|-------|---------|
| 14 | **Agente Email** (ODdxPCHo1xVweF2q) | Anti-loop filter bloqueia emails legitimos de leads | Leads que enviam email ficam sem resposta |
| 15 | **Agendar Visita** (gPc93sP7IKzucGGI) | DB update "visita agendada" executa independentemente do resultado do booking | Lead marcado como agendado mesmo quando Calendar API falha |

---

## P1 — ISSUES IMPORTANTES (70)

### CORE — Sem Error Handling HTTP (34 P1)

| Workflow | Nodes sem continueOnFail/onError | Count |
|----------|----------------------------------|-------|
| **Gerar Planta** (LZVsCIDeMAHXxFke) | 9 HTTP nodes (Gemini API, Anthropic, Drive, html2pdf) | 11 |
| **Gerar 3D** (mdS08sfQ3nhQ3HC7) | 8 HTTP nodes (Gemini, Drive, Evo API) + batch nodes | 8 |
| **Chat-Admin API** (Xjz2Ysd1rqLzLSWY) | Agent sem onError + 7 tools com workflowInputs vazio | 8 |
| **Orcamentista** (eV1txGMzmqOnuWyO) | Gemini Vision, html2pdf, Drive upload | 4 |
| **Guardar Planta** (cJMQSnMhryaoCrWI) | Evo API getBase64 | 2 |
| **Chat-Admin HTML** (LsHLmw9VEvXhIOAC) | Nenhum (0 issues) | 0 |

### CORE — API Keys Hardcoded (P1)

| Workflow | Issue |
|----------|-------|
| Gerar Planta | Gemini API key hardcoded em 4+ HTTP nodes |
| Gerar 3D | Gemini API key hardcoded em 3+ HTTP nodes |
| Orcamentista | Gemini API key hardcoded em 2+ HTTP nodes |

### TOOLS — SQL Injection (11 P1)

| Workflow | Issue |
|----------|-------|
| **Consultar Terrenos** (MmNHju2hE8M1pPum) | Template interpolation `{{ $json.field }}` em SQL |
| **Proposta Licenciamento** (JLDnddV05BepDVjw) | Template interpolation em SQL |
| **Verificar PDM** (pCcjFg5dtaQqo9dQ) | Template interpolation em SQL |
| **Servico Unitario** (kgJKOIdrGMo538Bf) | Template interpolation em SQL |
| **Listar Projetos** (1g6ZtK2leCVdv9Lp) | Template interpolation em SQL |
| **Terreno PDF** (gUb7Cvc2jXOxQPmP) | html2pdf API key hardcoded |

### AUTOMACAO (14 P1)

| Workflow | Issue |
|----------|-------|
| **Follow-up** (EWgbilxrkoE0dszE) | Sem error handling nas HTTP requests Evo API |
| **Follow-up** (EWgbilxrkoE0dszE) | Sem validacao de resposta antes de marcar "enviado" |
| **Visual Hook** (OQTYmPqyMeMrJ0h6) | SQL injection via template interpolation |
| **Visual Hook** (OQTYmPqyMeMrJ0h6) | Sem continueOnFail nos HTTP nodes |
| **Rescue Leads** (DFcn5TiJkXtl83p2) | Instance name hardcoded errada |
| **Rescue Leads** (DFcn5TiJkXtl83p2) | Sem timeout configurado no HTTP |
| **Update Prices** (MZWwj0WcEXr3y8mJ) | SQL injection via template interpolation |
| **Update Prices** (MZWwj0WcEXr3y8mJ) | Sem error handling DB/HTTP |
| **Hunter** (CBaxIWzRVMHXEmka) | SQL injection via template interpolation |
| **Hunter** (CBaxIWzRVMHXEmka) | Sem continueOnFail em HTTP nodes |
| **Notificar Quente** (i9ZHdq0gy6EWwcNM) | Sem validacao dados antes de enviar Telegram |
| **Notificar Quente** (i9ZHdq0gy6EWwcNM) | Sem error handling no Telegram send |
| **Notificar Quente** (i9ZHdq0gy6EWwcNM) | Template interpolation em SQL |
| **Notificar Quente** (i9ZHdq0gy6EWwcNM) | Sem timeout/retry configurado |

### COMUNICACAO (11 P1)

| Workflow | Issue |
|----------|-------|
| **Agente Email** (ODdxPCHo1xVweF2q) | Sem onError handler no Agent Claude |
| **Agente Email** (ODdxPCHo1xVweF2q) | Sem rate limiting nas respostas |
| **Agente Email** (ODdxPCHo1xVweF2q) | Sem validacao do email sender |
| **Enviar Email** (3lf0l82YSBo9BYYg) | Sem error handling no Resend API call |
| **Enviar Email** (3lf0l82YSBo9BYYg) | Sem validacao de email format |
| **Agendar Visita** (gPc93sP7IKzucGGI) | Sem retry no Calendar API |
| **Agendar Visita** (gPc93sP7IKzucGGI) | Sem validacao data/hora antes de booking |
| **Agendar Visita** (gPc93sP7IKzucGGI) | Sem cleanup on failure |
| **Telegram Notif** (varias) | Sem error handling em sends |
| **Instagram** (AKmb51meWZ2tlUoR) | HMAC verificacao removida (crypto bloqueado n8n) — validacao estrutural como fallback |
| **Instagram Verify** (F2ehvUWNQ7T9nuSC) | Workflow archivado mas ainda referenciado |

---

## P2 — ISSUES MENORES (72)

### Padrao Cross-Cutting

| Padrao | Workflows Afectados | Count |
|--------|---------------------|-------|
| Sem auth nos webhooks (expostos publicamente) | Dashboard KPIs, Relatorio, varias APIs | 8 |
| Falta `String(x\|\|'')` guards antes de `.toLowerCase()` | Terrenos, PDM, Hunter, Visual Hook | 7 |
| Node versions desactualizadas (v1 vs v1.1+) | Multiplos | 12 |
| Sem retry/timeout em HTTP nodes | Multiplos | 15 |
| Sem logging/audit trail em sub-workflows | Todos os sub-workflows | 6 |
| Falta validacao input em executeWorkflowTrigger | Terrenos, PDM, Servico Unitario | 5 |
| Sem cleanup de dados temporarios | Gerar 3D, Gerar Planta | 4 |
| DB connection sem pool/timeout config | Multiplos | 8 |
| Sem VACUUM/maintenance scheduled | Dashboard KPIs | 2 |
| Credential IDs hardcoded em nodes | Multiplos | 5 |

---

## PADROES CROSS-CUTTING CRITICOS

### 1. Evo API Key Inconsistente
- **Correcto:** `9131580B9518-43B7-B63C-811DBB7F25F9` (conforme .env)
- **Errado em:** Visual Hook, Hunter (keys diferentes)
- **Accao:** Verificar e corrigir API key em todos os workflows que usam Evo API

### 2. SQL Colunas Fantasma
- `status` (nao existe em `leads` — deveria ser `fase_conversa` ou campo em `projetos`)
- `ultimo_contato` (nao existe — deveria ser `ultima_interacao` ou calculado)
- **Afecta:** Visual Hook, Hunter, possivelmente Rescue Leads
- **Accao:** Mapear schema real vs queries em todos os workflows

### 3. SQL Injection via Template Interpolation
- **Padrao vulneravel:** `SELECT * FROM leads WHERE telefone = '{{ $json.telefone }}'`
- **Padrao correcto:** `SELECT * FROM leads WHERE telefone = $1` (parametrizado, como Instagram faz)
- **Afecta:** Terrenos, PDM, Servico Unitario, Listar Projetos, Visual Hook, Hunter, Update Prices, Notificar Quente
- **Modelo:** Instagram workflow (S110-S111) — gold standard com SQL parametrizado

### 4. Gemini API Key Hardcoded
- API key presente em plaintext em 9+ HTTP nodes across Gerar Planta, Gerar 3D, Orcamentista
- **Accao:** Migrar para n8n credential ou environment variable

### 5. Falta de Error Handling Sistematica
- 18+ HTTP nodes sem `continueOnFail` ou `onError` handler
- Qualificador e Instagram sao os unicos com error handling robusto
- **Accao:** Aplicar padrao `onError: continueErrorOutput` do Qualificador (S122) a todos os workflows

---

## RANKING DE WORKFLOWS (Saude)

| Rank | Workflow | Score | Notas |
|------|----------|-------|-------|
| A+ | **Instagram Comentarios** | Excelente | Gold standard: SQL parametrizado, dedup, sanitizacao, HMAC (validacao estrutural), error handling |
| A+ | **Qualificador WhatsApp** | Excelente | S123: 33/33 nodes auditados, 13/13 tools, onError, slash commands |
| A+ | **Chat-Admin HTML** | Excelente | 0 issues, bem estruturado |
| A | **Dashboard KPIs API** | Bom | Funcional, SQL correcto. Falta: auth webhook |
| A | **Health Check** | Bom | Funcional, 3 checks OK. Falta: mais checks (disk, memory) |
| B | **Follow-up** | Aceitavel | Funcional mas sem error handling HTTP. SQL corrigido S122 |
| B | **Gerar Planta** | Aceitavel | Funcional 100% mas 9 HTTP nodes sem error handling |
| B | **Guardar Planta** | Aceitavel | Funcional, 2 issues menores |
| B | **Orcamentista** | Aceitavel | 88% taxa, 2 P0 estruturais (node orfao, duplicado) |
| B | **Gerar 3D** | Aceitavel | 94% taxa, 8 HTTP nodes sem error handling |
| B | **Relatorio Semanal** | Aceitavel | Funcional, sem auth |
| C | **Agente Email** | Problematico | Anti-loop bloqueia leads legitimos (P0) |
| C | **Agendar Visita** | Problematico | DB update incondicional (P0) |
| C | **Enviar Email** | Problematico | Sem error handling Resend |
| C | **Notificar Quente** | Problematico | SQL injection + sem error handling |
| C | **Chat-Admin API** | Problematico | 7 tools com workflowInputs vazio, sem onError |
| D | **Terreno PDF** | Critico | Webhook orfao + ghost connections |
| D | **Visual Hook** | Critico | API key errada + SQL colunas fantasma |
| D | **Hunter** | Critico | Node inexistente + API key errada + SQL errado |
| D | **Update Prices** | Critico | Sem params + credential placeholder |
| F | **Rescue Leads** | Non-funcional | **DESACTIVAR IMEDIATAMENTE** |

---

## PLANO DE ACCAO RECOMENDADO

### Fase 1 — Emergencia (P0 fixes, ~2h)
1. **DESACTIVAR** Rescue Leads
2. **FIX** Visual Hook: API key correcta + SQL colunas reais
3. **FIX** Hunter: remover ref node fantasma + API key + SQL
4. **FIX** Agente Email: anti-loop filter para nao bloquear leads
5. **FIX** Agendar Visita: condicionar DB update ao sucesso do booking
6. **FIX** Orcamentista: remover node orfao + node duplicado
7. **FIX** Terreno PDF: remover webhook orfao + ghost connections (ou desactivar se nao e usado)

### Fase 2 — Seguranca (SQL injection + API keys, ~3h)
1. **Parametrizar SQL** em 8 workflows (seguir modelo Instagram)
2. **Migrar Gemini API key** para credential n8n (9 HTTP nodes)
3. **Migrar html2pdf API key** para credential n8n
4. **Verificar Update Prices** credential + query params

### Fase 3 — Resiliencia (Error handling, ~4h)
1. **Adicionar onError/continueOnFail** em 18+ HTTP nodes (Gerar Planta, Gerar 3D, Orcamentista)
2. **Adicionar onError ao Chat-Admin API** Agent node
3. **Adicionar workflowInputs** aos 7 tools vazios do Chat-Admin API
4. **Adicionar error handling** ao Follow-up (Evo API calls)
5. **Adicionar validacao** input em sub-workflows (Terrenos, PDM, Servico Unitario)

### Fase 4 — Hardening (P2 cleanup, ~2h)
1. **Auth nos webhooks** Dashboard KPIs + Relatorio
2. **String guards** em queries com `.toLowerCase()`
3. **Update node versions** onde aplicavel
4. **Cleanup** nodes/connections orfaos

---

## METRICAS COMPARATIVAS

### Antes vs Depois da Auditoria
| Metrica | Pre-Auditoria | Pos-S123 (Qualificador) | Target S124+ |
|---------|---------------|------------------------|--------------|
| Workflows auditados | 1 (Qualificador) | 1/31 (3%) | 31/31 (100%) |
| P0 issues conhecidos | 0 | 0 (Qualificador limpo) | 15 descobertos |
| SQL parametrizado | 2 workflows | 2 workflows | 10+ workflows |
| Error handling HTTP | Qualificador + Instagram | Qualificador + Instagram | Todos |

### Referencia: Instagram como Gold Standard
O Instagram (S110-S111) implementa TODOS os padroes correctos:
- SQL parametrizado ($1, $2)
- Dedup (ON CONFLICT DO NOTHING)
- Input sanitization (XML escape)
- Error handling em todos os nodes
- Validacao estrutural de input
- Audit trail (guardar todos os tipos)

**Recomendacao:** Usar Instagram como template para refactoring dos outros workflows.

---

**Relatório gerado automaticamente a partir de auditoria live API em 2026-03-22**
**Auditor:** Claude Opus 4.6 | **Sessao:** S124
