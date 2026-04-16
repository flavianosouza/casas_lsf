# PLANO DE MELHORIAS S155
**Data:** 2026-03-28/29 | **Sessão:** S154-S155

---

## FEITO NESTA SESSÃO

### S154 — Bugs e Qualidade
- [x] F1: DB tipologia autoritária + smart override
- [x] F2: Área "000" fallback BD
- [x] F3: Cobertura !isMoradiaContext
- [x] F4: Validador rejeita score 0 / erro_parse
- [x] F5: BOM Error Handler (3 nodes Orcamentista)
- [x] F6: JSON.parse try/catch + fix scope (enriched/merged)
- [x] F7: Fix querSuite scope (T0 else block)
- [x] E2E Audit 22 workflows, 286 nodes, 0 CRITICAL

### S154 — Template Orçamento
- [x] Template profissional (condições gerais, exclusões, termo aceitação, garantia 5+10 anos, IVA 6%)
- [x] Margem escondida em TODOS os tipos (era visível em não-HAB)
- [x] Local da Obra no PDF

### S154 — Conhecimento Técnico
- [x] Conhecimento LSF injectado no Felipe (fogo, térmico, sísmico, IVA, gamas, alvenaria, extras)
- [x] Conhecimento injectado no Chat-Admin (dados técnicos + preços actualizados)
- [x] Conhecimento injectado no Agente Email (LSF vs alvenaria, vantagens, IVA)
- [x] Instagram classificador com contexto LSF

### S154 — Novas Features
- [x] Tool #14 analisar_planta_alvenaria (prompt + skill completa)
- [x] T0/Loft support (numQuartos=0, open space, blueprintRules)
- [x] Typing "digitando..." no WhatsApp
- [x] Instagram Claude-powered replies (analisa comentário + caption do post)
- [x] Instagram DM histórico na BD (reply_text, dm_text, timestamps)
- [x] CLAUDE.md regras de segurança para não partir o que funciona

### S155 — Melhorias
- [x] M1: Mensagens WhatsApp em partes (split + delay humanizado via Code node)
- [x] M2: Detecção de áudios WhatsApp (placeholder para agent)
- [x] M4: Remarketing 30 dias (já existia — Follow-up Tier 3)
- [x] M5: Email + Telegram alert após gerar orçamento (4 PDFs)
- [x] M7: Telegram alerta "Orçamento Gerado"
- [x] M8: Backup 21/21 workflows para local
- [x] Concurrency lock por lead (anti-duplicação de tools)

---

## FALTA FAZER (próximas sessões)

### PRIORIDADE ALTA
- [x] M2b: Transcrição de áudios WhatsApp com Gemini — DONE (Evo API download + Gemini 2.0 Flash transcription)
- [x] M3: Follow-up automático por email — DONE (branch paralelo no Follow-up workflow, Resend API, HTML branded)
- [x] Concurrency lock por lead — DONE (anti-duplicação de tools, 5min timeout)
- [x] Sub-workflow analisar_planta_alvenaria — DONE (workflow tFL5oYVWdO6jTV3A, 5 nodes, Claude Vision + comparação + tool no Qualificador)

### PRIORIDADE MÉDIA
- [x] M6: Galeria de obras no WhatsApp — DONE (20 fotos + 1 video T3 chave-na-mao, Drive folders, BD galeria_obras)
- [ ] Orçamento multi-tipologia (lead pede "T3 base E T3 premium" para comparar)
- [ ] Proposta unificada por email (enviar 4 PDFs num email profissional automático)
- [ ] Multi-unidade/coliving (10 lofts T0 de 35m2 = projeto multi-unidade)

### PRIORIDADE BAIXA
- [ ] Dashboard funil de vendas (pipeline visual: contacto → planta → orçamento → visita → contrato)
- [ ] Relatório mensal automático (PDF com KPIs, leads, conversão)
- [ ] Backup automático semanal para Git (cron job)
- [ ] Multi-idioma (inglês, francês para expatriados)
- [ ] Website chatbot (widget casaslsf.com → Felipe)
- [ ] API pública para parceiros/arquitectos
