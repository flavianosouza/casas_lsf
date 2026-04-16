# ESTADO ATUAL DO SISTEMA - LSF Intelligence AI

**Data:** 2026-04-05 | **Sessao:** 156 — S156: Mega sessao (3 dias). Auto-Avaliacao Felipe (workflow+tabela agent_learnings). Campanha "Analise Minha Planta" completa: landing page casaslsf.com/analise-planta (Next.js dark mode), FastAPI /api/analise-planta (upload+R2+BD), N8N campanha webhook (AXGD4WIs4Ow7EoKw 12 nodes), funil 5 emails automaticos (aHdVt7RXBuW2SN41), PDF 5 paginas personalizado (template redesenhado, upload R2 via backend proxy), Meta Pixel+CAPI (209600556259611), criativos Canva (4 posts+stories fotos reais), triggers Felipe expandidos (20+ frases Tool #14, prompt 40.4k chars), Meta Ads Monitor (w1E00OOOJOWWLdUl 9h Telegram), debounce imagens fix (jitter+imageCount), DB migration UTM (3 cols leads + tabela campanha_analise_planta). **26 workflows activos. Known bugs: NONE**

---

## RESUMO RAPIDO

| Componente | Status | Motor | Taxa | Notas |
|------------|--------|-------|------|-------|
| Qualificador WhatsApp | **S156** | **Claude Sonnet 4.5** | **100%** | 14 tools, **36 nodes**, prompt **~40.4k chars**. S156: +Buscar Learnings Recentes (paralelo), +20 triggers Tool #14, debounce imagens (jitter+imageCount). S146: +secao MOTOR BOM |
| Chat-Admin | **S139** | Claude Sonnet 4.5 | - | 13 tools, paridade Qualificador. S139: projeto_id em 12/12 tools |
| Orcamentista | **S154** | Gemini Vision + **BOM Engine v1** | **100%** | **21 nodes**, 4 PDFs, multi-pisos. **S154:** +BOM Error Handler node (erros de Motor BOM v1/Buscar BOM Ref/Buscar Regras Escala eram silenciosamente engolidos). **S148:** 3 fixes stale refs+valor_mao_obra+bdi. **S147:** Calibracao (3 fixes). **S145:** Motor BOM v1 Code Node |
| Gerar Planta | **S154** | Gemini+Claude | **100%** | **43 nodes**, RECRIAR unificado, Claude Arquiteto+Validador. **S154:** (F1) DB tipologia autoritaria — regex /t(\d)/ apanhava "T0" de "Lofts T0" ignorando T3 da BD. (F2) area "000" -> fallback BD. (F3) cobertura guarded !isMoradiaContext. (F4) Validador rejeita score<4 e erro_parse (era aprovado:true com score 0!) |
| Gerar 3D | **S107** | Gemini Image | **94%** | 27 nodes, 7 vistas. 3/50 erros (timeouts Gemini) |
| Follow-up Auto | **S122** | - | - | 7 nodes, 5 tiers, phone normalization. S122: +ultima_interacao WHERE em TIERS 1-4 |
| Agente Email | **S125** | Claude Sonnet 4.5 | - | 9 nodes, anti-loop corrigido (leads@casaslsf.com passa). S125: fix ehProprio exclusion |
| Instagram | **S131** | Claude Sonnet 4.5 | **100%** | 26 nodes. **LIVE em producao.** S131: fix dedup race condition (DMs duplicados). +tabela `instagram_dedup` (comment_id PK). Verificar Duplicado: SELECT -> INSERT atomico (ON CONFLICT DO NOTHING + RETURNING). S130: self-loop guard, expression eval, DM Private Reply. Token IGAA* renovado (S129) |
| Agendar Visita | **S124** | - | - | **18 nodes** (+IF guard), Calendar OAuth2. S124: DB update condicional ao sucesso Calendar |
| Health Check | **S132** | - | - | `r5erAUczAlsiBuB5` **16 nodes**, **5 checks** (PG/Evo/Anthropic/Gemini/Drive), 30min, alerta Telegram. S132: fix Tem Erros? Number() type |
| Dashboard KPIs | **S132** | PG | - | `iZFE00PmnKvNvQ5k` GET /webhook/dashboard-kpis. S132: +onError Buscar KPIs |
| Hunter Integrado | **S125** | Firecrawl | - | `CBaxIWzRVMHXEmka` 7 nodes. S125: Fix ghost ref Filtrar Terrenos->Firecrawl Agent + Evo API key corrigida |
| Guardar Planta | **S132** | - | **100%** | `cJMQSnMhryaoCrWI`. S132: fix SQL unterminated string (prompt_atual quotes) |
| Listar Projetos | **S132** | PG | **100%** | `1g6ZtK2leCVdv9Lp`. S132: fix queryReplacement (was queryParametersJson broken) |
| Campanha Analise Planta | **S156** | Claude Haiku + Resend | **100%** | **12 nodes** `AXGD4WIs4Ow7EoKw`. Webhook → Postgres → wa.me → Telegram → Email Resend → Claude analise → PDF R2. Landing page: casaslsf.com/analise-planta |
| Funil Email Campanha | **S156** | Resend | **100%** | **4 nodes** `aHdVt7RXBuW2SN41`. Schedule 15min. 5 emails automaticos (E1 imediato, E2 +30min analise, E3 +24h vantagens, E4 +72h urgencia, E5 +7d ultima). Dedup atomico |
| Meta Ads Monitor | **S156** | Meta Marketing API | **100%** | **4 nodes** `w1E00OOOJOWWLdUl`. Schedule 9h. Busca metricas → Telegram relatorio diario |
| Auto-Avaliacao Felipe | **S156** | Claude Haiku | **100%** | **13 nodes** `lkKzZIsTyd3hLmLW`. Schedule 23h. Analisa conversas → agent_learnings → alerta Telegram se score < 60 |
| Demais | OK | - | - | Terrenos, PDM, Servico Unitario, Relatorio, Telegram |

---

## 1. WORKFLOWS N8N (43 total, 30 ativos, 13 inactivos/archived)

### Qualificador WhatsApp (GcLmgtWBpqtApjR7) — 33 nodes
- **Motor:** Claude Sonnet 4.5 (temp 0.4), Postgres Chat Memory (30 msgs). **Sem fallback**
- **13 Tools:** calcular_orcamento, mapa_de_quantidade (4 PDFs), gerar_planta (+2 vistas bg), consultar_terrenos, proposta_licenciamento, guardar_planta_recebida, gerar_3d (7 vistas), servico_unitario, notificar_quente, agendar_visita, verificar_pdm, enviar_email, listar_projetos
- **S146:** Knowledge injection — +secao MOTOR BOM detalhada (18 cats, 114 items, precos referencia ao kg, 3 gamas). +secao CREDIBILIDADE expandida. Prompt 29.4k -> 30.7k chars
- **S139:** projeto_id em 12/12 tools. Multi-projecto robusto
- **S109:** Removido fallback OpenAI GPT-4o. Claude unico motor
- **S104:** Prompt optimizado 57k -> 23k chars (-59%)
- **S98:** Consulta Arquitectonica (RESUMO VISUAL obrigatorio) | **S97:** 7 slash commands, optout
- **S86:** Multi-Projecto (projeto_id $fromAI) | **S67:** defineBelow + expressoes

### Orcamentista (eV1txGMzmqOnuWyO) — 20 nodes
- Pipeline: Parse -> Buscar Planta -> Gemini Vision -> **Buscar BOM Ref -> Buscar Regras Escala** -> Buscar Precos -> **Motor BOM v1** -> Gravar -> HTML -> 4 PDFs -> Drive -> WA
- **S148:** E2E Smoke Test — 3 fixes: (B1) Stale ref $('Calcular Orcamento Detalhado')->$('Motor BOM v1') em Gerar HTML + Adicionar Cronogramas. (B2) valor_mao_obra no INSERT+ON CONFLICT ($14=total_mo). (B2b) Hotfix $15 bdi_percentual. Verificado: #846 T3 120m2 Media=264,215 EUR, 18 cats, valor_mao_obra=79,041 OK
- **S147:** Calibracao — 5 testes (T2-T4, base/medio/premium). Steel PERFEITO (<0.02%). 3 fixes: pintura double-count, OSB 12mm (18->10), Steel MO (3->2). Savings 6.5-7.2%. Ranges ajustados (spec 1.5mm heavy)
- **S146:** Gemini Vision: +nota precisao BOM (perimetro critico para calculo aco)
- **S145:** Motor BOM v1 — Code Node ~1000 linhas. +2 Postgres nodes. BOM linha a linha: 91+23 items. Aco interpolacao T2/T4. 18 categorias
- **S133:** Fix PDF data mismatch + system-wide queryParametersJson->queryReplacement (35/35 Postgres OK)
- **S106:** Lead data em todos 4 PDFs | **S105:** Fix rodape perim_ext*0.8
- Multi-pisos (S89), cotas janelas (S88), LEFT JOIN projetos (S87)

### Chat-Admin (LsHLmw9VEvXhIOAC + Xjz2Ysd1rqLzLSWY)
- 13 tools, prompt 7613 chars, auth token 'obrasnet2026admin'

### Gerar Planta (LZVsCIDeMAHXxFke) — 43 nodes
- **S149:** Fix SyntaxError em 2 Code nodes — S146 knowledge injection injectou newlines literais em JS strings double-quoted. Preparar Arquiteto: 36 linhas quebradas (REGRAS ESTRUTURAIS), escaped+merged (88->51 linhas). Preparar Validador: 14 linhas quebradas (E1-E4), escaped+merged (64->49 linhas). Scripts: `fix_s149_preparar_arquiteto_surrogates.py`, `fix_s149b_preparar_validador.py`
- **S146:** Knowledge injection — Arquiteto: +regras estruturais LSF (kg/m2 por area, perfis por uso, vaos max 5.5m, empilhamento multi-piso). Validador: +E1-E4 verificacoes estruturais (informativas, nao pontuadas)
- **S140:** +num_pisos/tem_cave/composicao_pisos. Cave pipeline (cave labels + 3-panel Cave|RC|Andar). REGRAS ESTRUTURAIS DE EMPILHAMENTO (prumada hidraulica, nucleo rigido, alinhamento paredes portantes, modulo 0.6m, vaos max 5.5m)
- **S115:** Pipeline RECRIAR unificado. `isRecriar` flag. Opcao_A=fiel, Opcao_B=melhorada. Claude Arquiteto processa esbocos. Validacao imagem. Area auto-detect
- **S113:** +6 nodes Claude Arquiteto + Validador. BAD (Briefing Arquitetonico Detalhado). Score 0-12 (F1-F6+T1-T3+D1-D3)
- S102: Tipologia enforce + area tolerance +/-10% + comboio detection + anti-leaking
- Multi-floor (S85), RECRIAR image-to-image (S73C), criatividade arq L/T/U/V (S76)

### Gerar 3D (mdS08sfQ3nhQ3HC7) — 27 nodes
- 7 vistas (3 drone + 4 interior), DNA visual, temp 0.15, pool condicional
- **S107:** Fix piscina perdida SO/Noturna (P0), fix multiFloor perdido (P0), tipo_obra_nome (P1), has1oAndar regex (P1), rear_facade hint (P2), fallback DNA, interiores numFloors fallback
- S102: base64 validation + continueOnFail em Upload/Partilhar

### Instagram (AKmb51meWZ2tlUoR) — 26 nodes
- Webhook -> Claude classifica -> Reply/DM leads quentes -> Telegram
- **S111:** 8 fixes: BUG-IG-007 (HMAC P0), BUG-IG-008 (event_type guard Reply), BUG-IG-011 (anti-prompt injection), BUG-IG-012 (Verificar DM success), BUG-IG-013 (ON CONFLICT dedup), BUG-IG-014 (respondido SPAM/POSITIVO), BUG-IG-015 (+event_type/comment_id cols), BUG-IG-016 (dedup by comment_id). DB: +2 colunas, +UNIQUE index
- **S110:** 6 bug fixes: BUG-IG-001 (creds reais), BUG-IG-002 (changes+messaging+live_comments), BUG-IG-003 (Instagram Token em Reply/DM), BUG-IG-004 (+Guardar Outro node SPAM/POSITIVO), BUG-IG-005 (SQL parameterized), BUG-IG-006 (API v22.0)

### Automacoes
- **Follow-up (EWgbilxrkoE0dszE):** Diario 14h, 5 tiers, exclui optout, phone normalize
- **Email (ODdxPCHo1xVweF2q):** Gmail -> Claude -> Resend -> Telegram. S125: anti-loop fix (leads@ passa)
- **Notificar Quente (i9ZHdq0gy6EWwcNM):** Via Telegram
- **Agendar Visita (gPc93sP7IKzucGGI):** Calendar OAuth2 + Telegram, 16 nodes
- **Relatorio (31dzynulE6VmFOSb):** Segunda 8h, stats SQL + Telegram

### Monitorizacao (S119)
- **Health Check** (`r5erAUczAlsiBuB5`) — **16 nodes**, Schedule 30min, **5 checks** (PostgreSQL, Evo API, Anthropic API, **Gemini API**, **Google Drive**), alerta Telegram se erros. S124: `scripts/deploy/fix_s124_health_check.py`
- **Dashboard KPIs API** (`iZFE00PmnKvNvQ5k`) — Webhook GET /webhook/dashboard-kpis, sem auth. Retorna: leads (total/hoje/7d/30d/optout), projetos (total/ativos), orcamentos (total/7d), plantas (total/7d), top_tipologias, fases_projeto. Scripts: `scripts/deploy/deploy_dashboard_kpis.py`, `fix_kpis_query.py`

### Sub-workflows
- Terrenos (MmNHju2hE8M1pPum), Servico Unitario (kgJKOIdrGMo538Bf), PDM (pCcjFg5dtaQqo9dQ)
- Enviar Email (3lf0l82YSBo9BYYg), Listar Projetos (1g6ZtK2leCVdv9Lp), Guardar Planta (cJMQSnMhryaoCrWI)
- Hunter (CBaxIWzRVMHXEmka) — S125: fix ghost ref + Evo API key
- Proposta Licenciamento (JLDnddV05BepDVjw)

---

## 2. BASE DE DADOS

**PostgreSQL:** 76.13.15.128:5432 | DB: postgres | Credential n8n: hr2XLhfZOgMPj2jX

| Tabela | Registos | Notas |
|--------|----------|-------|
| leads | **129** | +28 ultimos 7d, +81 ultimos 30d. 4 optout. S119 KPIs |
| plantas_geradas | **442** | +171 ultimas 7d. +projeto_id FK. **DB: 79MB** (era 324MB, -76%) |
| orcamentos | **51** | +13 ultimos 7d. +projeto_id FK |
| precos_materiais | **497** | 30 categorias. +LSF-ACO-GALV (id=497, 7 EUR/kg). S143: perfis actualizados, OSB, isolamento |
| projetos | **390** | 390 total. +num_pisos(66 multi), +tem_cave(22), +composicao_pisos(79). Top fases: planta_enviada(276), info_inicial(37), orcamento(36) |
| instagram_leads | S90 | user_id, username, post_id, intencao |
| n8n_chat_histories | ~2700+ | |
| perfis_lsf_specs | **17** | S143: 17 perfis LSF com peso_kg_m, preco_ml (GENERATED = peso*7) |
| bom_referencia | **97** | S144: 91 T2_78m2 + 6 T4_200m2, 15 categorias, 10 grupos orcamento |
| bom_regras_escala | **62** | S144: 57 linear, 4 fixo, 1 perimetro. factor_por_m2 + ajuste_por_piso |
| Outras | - | composicoes(34), composicao_itens(175), terrenos(120+43), pdm(24), instagram_dedup |

---

## 3. APIs INTEGRADAS

| API | Status | Uso |
|-----|--------|-----|
| **Anthropic Claude** | **ATIVO S101** | Motor principal (Qualificador + Chat-Admin + Email + Instagram) |
| Google Gemini | ATIVO | Quantitativos + renders 3D + plantas 2D (gemini-3.1-flash-image-preview) |
| Evolution API | ATIVO | WhatsApp (evo.lsfbuilderpro.com) |
| html2pdf.app | ATIVO | PDFs |
| Google Drive | ATIVO | Upload PDFs + 3D |
| Google Calendar | ATIVO | Visitas |
| Resend | ATIVO | Email (orcamento@casaslsf.com) |
| Telegram | ATIVO | Notificacoes (Chat ID 1057802876) |

---

## 4. REGRAS FUNDAMENTAIS

- **Lead e autoridade maxima.** Felipe executa, nao decide
- Resposta: ESTRUTURA 3 PARTES (Responder+Recomendar+Perguntar)
- PT-PT: "esta a pensar" nao "esta pensando"
- Se existe tool -> USAR. Nao prometer — FAZER
- Consulta Arquitectonica + RESUMO VISUAL obrigatorio antes de gerar planta

---

## 5. DEPENDENCIAS CRITICAS

| Regra | Consequencia se violar |
|-------|----------------------|
| `json_agg(row_to_json(t))` em Buscar Precos | 81x multiplicacao |
| Gemini timeout 120s | Plantas >150m2 falham |
| `Number(x)` antes de aritmetica | Concatenacao string |
| `String(x\|\|'')` antes de `.toLowerCase()` | null crash |
| executeWorkflowTrigger v1 (NAO v1.1) | WorkflowHasIssuesError |
| toolWorkflow `_pickStr()` guard | query.toLowerCase crash |
| `this.helpers.httpRequest()` (NAO $http) | $http undefined em Code v2 |

---

## 6. BUGS ZERO — Estado

### Sprints Completos
| Sprint | Bugs | Estado |
|--------|------|--------|
| Sprint 0 (S101) | Migracao GPT-4o -> Claude Sonnet 4.5 | **DONE** (3 agentes migrados) |
| Sprint 1 (S101) | BUG-001 a 004 (P0 criticos) | **DONE** (4/4 corrigidos) |
| Sprint 2 (S102) | BUG-005 a 011 (P1 graves) | **DONE** (6 fixados + 1 resolved transient) |
| Sprint 3 (S103) | BUG-012 a 015 (P2 moderados) | **DONE** (2 fixados + 1 resolved + 1 archived) |
| Sprint 4 (S103) | BUG-016 a 019 (DB cleanup) | **DONE** (016+017 SQL fix, 018 plan, 019 done) |
| Sprint 5 (S103) | MELHORIA-001 a 005 (Infra) | **DONE** (Firewall + Snapshot + base64 migrated + cleanup) |

### Detalhe Fixes
| Bug | Fix | Sessao |
|-----|-----|--------|
| BUG-001: Orcamento area/tipologia erradas | Priorizar lead values, MAX(area) | S101 |
| BUG-002: Consulta arq ignorada | Guardrail + REGRA CRITICA tool | S101 |
| BUG-003: Proposta lead_id error | RIGHT(telefone,9) match | S101 |
| BUG-004: Follow-up phone format | Normalizacao robusta (strip+prefix) | S101 |
| BUG-005: Tipologia alterna | TIPOLOGIA OBRIGATORIA no prompt Gemini | S102 |
| BUG-006: Prompt leaking imagens | Removidos placeholders [] + anti-leaking | S102 |
| BUG-007: Area inconsistente | Tolerancia +/-10%, hard limit +/-15% | S102 |
| BUG-008: Layout comboio | Deteccao + descricao tecnica comboio | S102 |
| BUG-009: 3D Upload binary error | Validacao base64 + continueOnFail | S102 |
| BUG-010: Hunter $http undefined | this.helpers.httpRequest() | S102 |
| BUG-011: Listar Projetos syntax | Resolved (transient sandbox cache) | S102 |
| BUG-012: Mensagens duplicadas | +Filtro Output node + prompt anti-spam | S103 |
| BUG-013: Debug text ao lead | +Filtro Output node (strip debug patterns) | S103 |
| BUG-014: Telegram Notify error | Resolved (0 erros recentes) | S103 |
| BUG-015: Instagram Verify syntax | Fix documentado ($json prefix), workflow archived | S103 |
| BUG-016: 99 plantas sem projeto_id | 3-phase fix: safe match(2) + timestamp(41) + new projects(56) = 99/99 | S103 |
| BUG-017: Plantas orfas | 92 sem lead: 59 PT + 11 BR + 11 CH + 7 unknown + 4 intl | S103 |
| BUG-018: DB 324MB base64 | Plan: 209 safe to clear (have Drive), 90 need upload. Script ready | S103 |
| BUG-019: Stats desatualizados | DONE (stats updated S103) | S103 |

### Sprint 5 - Infra (S103)
| Melhoria | Resultado |
|----------|-----------|
| MELHORIA-001 | **Firewall ATIVO** (LSF-Production-Firewall: SSH+HTTP+HTTPS. PostgreSQL BLOQUEADO externamente) |
| MELHORIA-002 | **Snapshot criado** (action 84157833, 2026-03-17) |
| MELHORIA-003 | **Base64 migrado** Phase 1: 208 plants cleared. DB: 324MB -> 79MB (-76%). VACUUM FULL OK |
| MELHORIA-004 | Dashboard metricas (3 dashboards ja activos no n8n) |
| MELHORIA-005 | **Auditado:** 34 activos, 2 inativos (TEMPs). 4 TEMPs activos para review manual |

**BUGS_ZERO COMPLETO: 20/20 bugs + 5 melhorias infra. Sistema em producao.**

### Sprint 6 - Qualidade PDFs (S105-S106)
| Fix | Descricao | Sessao |
|-----|-----------|--------|
| Mapa Quantidades - Rodape | `perim_ext * 0.8` (desconto aberturas paredes exteriores) | S105 |
| PDF1 (Orcamento) | +telefone em "Dados do Cliente" | S106 |
| PDF2 (Cron. Financeiro) | +nome cliente, +tipo obra, +acabamento | S106 |
| PDF3 (Cron. Executivo) | +nome cliente, +tipo obra | S106 |
| PDF4 (Proposta Licenc.) | +telefone, +acabamento na identificacao projeto | S106 |

### Sprint 7 - Gerar 3D Quality (S107)
| Fix | Prioridade | Descricao | Sessao |
|-----|------------|-----------|--------|
| Piscina perdida SO/Noturna | **P0** | Extrair NE/SO nao propagava has_piscina -> SO+Noturna nunca mostravam pool | S107 |
| MultiFloor perdido SO/Noturna/Int | **P0** | Extrair NE/SO nao propagava num_floors/multiFloorBlock -> 2 pisos so no NE | S107 |
| tipo_obra_nome codigo | P1 | NE usava 'moradia' (codigo) em vez de 'Moradia' (display) | S107 |
| has1oAndar loose | P1 | `includes('1')` match '150m2' -> falso multi-piso. Fix: regex `\b1\W{0,2}ANDAR` | S107 |
| rear_facade hint SO | P2 | SO prompt so verificava left_facade, falta rear_facade -> janelas fantasma | S107 |
| Fallback DNA | IMP | Quando Gemini JSON parse falha, fallback nao tinha architectural_dna | S107 |
| Interiores numFloors | IMP | Fallback via analise.building.num_floors (safety net) | S107 |

### Sprint 8 - Instagram Full Fix (S110)
| Fix | Bug | Descricao | Sessao |
|-----|-----|-----------|--------|
| Credentials reais | BUG-IG-001 | `CRIAR_NO_N8N` placeholder -> IDs reais (Anthropic, Instagram, Postgres, Telegram) | S110 |
| Extractor multi-formato | BUG-IG-002 | Suporta changes (comments) + messaging (DMs/story) + live_comments | S110 |
| Credential Reply/DM | BUG-IG-003 | Reply/DM usam Instagram Token (httpHeaderAuth) em vez de credential errada | S110 |
| Guardar SPAM/POSITIVO | BUG-IG-004 | +Guardar Outro node no Switch fallback (SPAM+POSITIVO salvos na BD) | S110 |
| SQL injection fix | BUG-IG-005 | Queries com concatenacao -> parametrizadas ($1, $2...) | S110 |
| API version update | BUG-IG-006 | Graph API v21.0 -> v22.0 | S110 |

### Sprint 9 - Instagram Quality (S111)
| Fix | Bug | Descricao | Sessao |
|-----|-----|-----------|--------|
| **HMAC Verification** | **BUG-IG-007** | **Verificar HMAC node: SHA256 timing-safe do Meta App Secret. Payloads nao assinados silenciosamente descartados** | **S111** |
| Event type guard Reply | BUG-IG-008 | IF Comentario LQ/PG: so faz /replies quando event_type='comment'. DMs nao tentam reply | S111 |
| Anti-prompt injection | BUG-IG-011 | Comentario sanitizado com XML tags + escape &lt;/&gt; no prompt Claude | S111 |
| Verificar DM success | BUG-IG-012 | +Verificar DM node: checa resposta antes de dm_enviada=TRUE. Telegram mostra status real | S111 |
| ON CONFLICT dedup | BUG-IG-013 | INSERT ... ON CONFLICT (instagram_user_id, comment_id) DO NOTHING. Race condition eliminada | S111 |
| respondido SPAM/POSITIVO | BUG-IG-014 | +Atualizar Outro Respondido: SPAM/POSITIVO marcados respondido=TRUE na BD | S111 |
| +event_type/comment_id | BUG-IG-015 | ALTER TABLE +2 colunas. Stored em todos INSERTs. UNIQUE INDEX dedup | S111 |
| Dedup by comment_id | BUG-IG-016 | Verificar Duplicado usa comment_id (unico) em vez de post_id (partilhado) | S111 |

### Sprint S132 - Fix S126 Hardening SQL Bugs
| Fix | Workflow | Descricao | Deploy |
|-----|----------|-----------|--------|
| Guardar Planta SQL | `cJMQSnMhryaoCrWI` | Unterminated string in prompt_atual (S126 hardening lost closing `'`). Fix: `||` concatenation | `fix_s132_sql_quotes.py` |
| Orcamentista Gravar SQL | `eV1txGMzmqOnuWyO` | Unterminated string in descricao_projeto + literal $N in titulo. Fix: `||` concatenation | `fix_s132_sql_quotes.py` |
| Orcamentista Buscar Precos | `eV1txGMzmqOnuWyO` | `queryParametersJson` expression not evaluated by n8n Postgres v2.5. "there is no parameter $1". Fix: inline expression in SQL | `fix_s132_buscar_precos.py` |
| Qualificador Auto Criar Lead | `GcLmgtWBpqtApjR7` | $1,$2 params without binding. Fix: +queryReplacement | `fix_s132_remaining_bugs.py` |
| Listar Projetos | `1g6ZtK2leCVdv9Lp` | `queryParametersJson` broken (same as Buscar Precos). Fix: convert to queryReplacement | `fix_s132_remaining_v2.py` |
| Health Check Tem Erros? | `r5erAUczAlsiBuB5` | "Wrong type: '0' is string but expecting number". Fix: Number() wrapper | `fix_s132_remaining_v2.py` |
| Dashboard KPIs | `iZFE00PmnKvNvQ5k` | +onError on Buscar KPIs | `fix_s132_remaining_v2.py` |
| Orcamentista +onError | `eV1txGMzmqOnuWyO` | Added continueErrorOutput to 7 nodes lacking it | `fix_s132_buscar_precos.py` |

**Root cause:** S126 SQL parametrization hardening added `$N` params but some nodes used `queryParametersJson` (broken in n8n Postgres v2.5 options) instead of `queryReplacement` (working format). Some nodes had `$N` without any binding at all.

**Key learning:** In n8n Postgres v2.5, use `options.queryReplacement` NOT `options.queryParametersJson`. The latter may silently fail to evaluate expressions.

### Sprint 10 - Analise Lead Miguel Parreira (S120)

**Lead:** Miguel Parreira | +351 966 570 590 | T4 moradia 167m2, 4 niveis (cave+RC+1o+sotao)
**Dados:** 11x /reset em 2 dias (20-22/03/2026), 90+ ficheiros (esbocos, plantas, PDFs, 3D, audios)

#### 9 Bugs Identificados
| Bug | P | Descricao | Workflow |
|-----|---|-----------|----------|
| **BUG-S120-1** | **P0** | **Planta gerada antes de receber todos os esbocos.** Sistema dispara `guardar_planta_recebida` + `gerar_planta(modo=recriar)` na PRIMEIRA imagem, nao espera pela segunda | Qualificador + Guardar Planta |
| **BUG-S120-2** | **P0** | **Mensagens duplicadas ao receber multiplas imagens.** Cada imagem gera resposta separada, lead recebe 2-3 mensagens quase identicas | Qualificador |
| **BUG-S120-3** | **P0** | **Sistema nao espera confirmacao antes de gerar planta.** Lead envia esboco e sistema gera imediatamente sem perguntar "quer que eu gere?" | Qualificador |
| **BUG-S120-4** | **P0** | **PDFs gerados com tipologia e area ERRADAS.** Orcamento diz T3/120m2 quando lead pediu T4/167m2. Dados do lead nao chegam ao Orcamentista | Orcamentista |
| **BUG-S120-5** | P1 | **Follow-up ignora conversa activa.** Lead recebe follow-up automatico enquanto conversa esta a decorrer (Flaviano intervindo manualmente) | Follow-up |
| **BUG-S120-6** | P1 | **Sistema adopta nome errado.** Chamou lead de "Filipa" em vez de "Miguel" (provavel confusao com outro lead/contexto) | Qualificador |
| **BUG-S120-7** | P1 | **"Aguarde 1-2 min" enviado APOS imagens ja entregues.** Mensagem de espera chega depois das plantas, confunde o lead | Qualificador + Gerar Planta |
| **BUG-S120-8** | **P0** | **Creditos Anthropic esgotados = lead sem resposta 14h.** Em 20/03 sistema parou de responder, lead ficou 14h sem atendimento | Qualificador (Anthropic API) |
| **BUG-S120-9** | P2 | **Intervencao manual Flaviano misturada com bot.** Nao ha indicacao clara de quando e humano vs bot, confunde contexto | Qualificador |

#### 11 Problemas UX/Flow
1. **11x /reset em 2 dias** — lead nao consegue avancar, precisa resetar constantemente
2. **Sem persistencia apos /reset** — toda informacao perdida, lead repete tudo
3. **Sem handling multi-imagem** — sistema nao agrupa 2+ imagens como 1 pedido
4. **Cave e sotao NUNCA gerados** — planta so mostra RC e 1o andar, ignora cave e sotao pedidos
5. **Texto precos repetitivo** — mesma tabela precos enviada multiplas vezes na conversa
6. **Sem opcao de alteracao incremental** — lead pede "mude a cozinha" e sistema re-gera tudo
7. **Renders 3D nao refletem planta real** — 3D generico, nao corresponde a planta gerada
8. **Sem controlo de qualidade dos PDFs** — PDFs enviados sem validacao de dados
9. **Bot nao reconhece fotos de obra** — lead envia foto de terreno/obra e bot nao interpreta
10. **Mensagens longas demais** — respostas com 500+ palavras quando lead so quer confirmacao
11. **Sem mecanismo de escalacao automatica** — lead frustrado mas sistema nao escala para Flaviano

#### 9/9 Bugs Fixados (S121-S123)
| Bug | P | Fix | Estado |
|-----|---|-----|--------|
| **BUG-S120-1** | **P0** | Prompt: guardar imagem + perguntar se tem mais. SO gerar apos confirmacao | **FIXED S122** |
| **BUG-S120-2** | **P0** | Prompt: resposta curta ao receber imagem (sem 3 partes completas) | **FIXED S122** |
| **BUG-S120-3** | **P0** | Prompt: REGRAS MULTI-IMAGEM obrigatorias. Esperar confirmacao | **FIXED S122** |
| **BUG-S120-4** | **P0** | Orcamentista: `$('Buscar Planta do Lead').first().json` (COALESCE DB values) | **FIXED S121** |
| **BUG-S120-5** | P1 | Follow-up SQL: +`ultima_interacao < NOW() - INTERVAL '2 hours'` em TIERS 1-4 | **FIXED S122** |
| **BUG-S120-6** | P1 | Prompt: +NOME DO LEAD rule + pushName no agent input `[NOME: xxx]` | **FIXED S122** |
| **BUG-S120-7** | P1 | Prompt: "Chamar PRIMEIRO, comentar DEPOIS". Nunca enviar texto espera antes de tool | **FIXED S122** |
| **BUG-S120-8** | **P0** | +Node `Resposta Erro API` (onError handler). Mensagem amigavel + contacto Flaviano | **FIXED S122** |
| **BUG-S120-9** | P2 | +`/pausa` e `/retomar` slash commands. Pausa bot, Flaviano atende | **FIXED S122** |

#### Sprint 11 - Hotfix Deploy S122 + Auditoria Completa (S123)
| Fix | P | Descricao | Node |
|-----|---|-----------|------|
| **Merge Optout crash** | **P0** | Deploy S122 injectou `optoutResult`/`enriched` (nao existem). Correcto: `db`/`merged`. **BLOQUEAVA TODOS OS LEADS** | Merge Optout |
| Pausa field mismatch | P1 | `isOptout` (camelCase) em vez de `is_optout` (snake_case). Leads pausados nao eram interceptados pelo IF: Opted Out? | Merge Optout |
| Handle Optout pausa msg | P2 | Nao diferenciava pausa vs optout. Leads pausados recebiam msg "/voltar" em vez de "/retomar" | Handle Optout |
| IF nodes metadata | P2 | IF: Is Slash Command? e IF: Opted Out? sem `conditions.options.version: 2` + `typeValidation` | IF nodes |

**Auditoria completa S123:** 33/33 nodes verificados, 13/13 tools com workflowInputs, connections OK, prompt 27.6k/595 linhas OK, Agent onError OK, Enviar WhatsApp OK

#### Sprint 12 — Auditoria Completa do Sistema (S124)

**31/31 workflows auditados via API live. ~300 nodes. 157 issues (15 P0, 70 P1, 72 P2).**
Relatorio completo: `docs/AUDITORIA_COMPLETA_S124.md`

| Categoria | Workflows | P0 | P1 | P2 | Total |
|-----------|-----------|----|----|----| ------|
| CORE | 6 | 2 | 34 | 13 | 49 |
| TOOLS | 6 | 2 | 11 | 17 | 30 |
| AUTOMACAO | 6 | 9 | 14 | 13 | 36 |
| COMUNICACAO | 5 | 2 | 11 | 14 | 27 |
| REPORTING+MONITORING | 7 | 0 | 0 | 15 | 15 |
| Qualificador (S123) | 1 | 0 | 0 | 0 | 0 |
| **TOTAL** | **31** | **15** | **70** | **72** | **157** |

**Top P0 Criticos:**
- Rescue Leads: 100% nao-funcional (DESACTIVAR)
- Visual Hook + Hunter: Evo API key errada + SQL colunas fantasma
- Update Prices: credential placeholder + query sem params
- Agente Email: anti-loop bloqueia leads legitimos
- Agendar Visita: DB update incondicional
- Orcamentista: node orfao + node duplicado
- Terreno PDF: webhook orfao + ghost connections

**Padroes Cross-Cutting:** SQL injection em 8+ workflows (template interpolation), Gemini API key hardcoded em 9+ nodes, Evo API key inconsistente em 3 workflows, 18+ HTTP nodes sem error handling

#### Sprint 12b - Fix Massivo S124 (mesma sessao)

**Fase 1 - P0 Fixes (11/15 auto-fixados):**
| Fix | Workflow | Resultado |
|-----|----------|-----------|
| Rescue Leads | 5qjbijwXTGrvOD5A | **DESACTIVADO** |
| Orcamentista orfaos | eV1txGMzmqOnuWyO | Removidos 3 nodes (21->18): "Retornar Erro" orfao + "Check WhatsApp OK" duplicado |
| Terreno PDF | 9Ov2-7ftWsIwQr3BjwwJy | Removidos 2 webhooks orfaos + 2 ghost connections |
| Visual Hook API key | 7S8tgHoECfUUOMed | Evo API key corrigida + SQL: status->fase_conversa, ultimo_contato->ultima_interacao |
| Update Prices | Xp25ExS55ALZLx3S | **DESACTIVADO** (credential+query broken) |
| Hunter SQL | CBaxIWzRVMHXEmka | SQL: status->fase_conversa, ultimo_contato->ultima_interacao (3 replacements) |
| Agendar Visita | gPc93sP7IKzucGGI | Calendar onError=continueErrorOutput + IF "Check Calendar OK" guard antes DB update |
| **Manual:** Hunter ghost ref | CBaxIWzRVMHXEmka | Node "Notificar Leads WhatsApp" referencia "Filtrar Terrenos" inexistente |
| **Manual:** Agente Email | ODdxPCHo1xVweF2q | Anti-loop filter nao identificado automaticamente |

**F1+F2 - Health Check (5 checks):**
- +Check Gemini (HTTP POST generativelanguage.googleapis.com)
- +Check Google Drive (HTTP GET drive/v3/about)
- +Merge Results 3 + Merge Final para integrar novos checks
- Avaliar Saude: +Gemini status detection (429/403/400) + Drive status
- 12->16 nodes, 3->5 checks

**Fase 2 - SQL Parametrization (3 workflows):**
- Consultar Terrenos: 22 interpolacoes parametrizadas ($1..$22)
- Verificar PDM: 3 interpolacoes parametrizadas
- Listar Projetos: 2 interpolacoes parametrizadas

**Fase 3 - HTTP Error Handling (16 nodes):**
- Gerar Planta: 8 HTTP nodes -> onError=continueErrorOutput
- Gerar 3D: 4 HTTP nodes -> onError=continueErrorOutput
- Orcamentista: 3 HTTP nodes -> onError=continueErrorOutput
- Guardar Planta: 1 HTTP node -> onError=continueErrorOutput

**UX Prompt Fixes (4 regras):**
- Anti-repeticao precos (mostrar faixas 1x, depois referir escolha)
- Limite duro 500 chars por mensagem
- Escalacao automatica explicita (6 criterios)
- Comportamento apos /reset (tratar como 1a interacao)

**Infra - Deploy Utils (deploy_utils.py):**
- DeployClient com validacao pre-deploy automatica (**10 checks** — S135: +dup IDs, +queryParametersJson, +onError conflicts, +onError without connections, +Anthropic credential type)
- Versionamento automatico (backups/versions/)
- Smoke test pos-deploy
- Returns `(ok, errors, warnings)` — errors BLOCK deploy, warnings are informational

**Scripts criados:** `fix_s124_p0_audit.py`, `fix_s124_health_check.py`, `fix_s124_fase2_3.py`, `fix_s124_ux_prompt.py`, `deploy_utils.py`

**Gold Standard:** Instagram (SQL parametrizado, dedup, sanitizacao, error handling completo)

#### Sprint 13 — Hardening Completo S126

**Fase 2 — SQL Parametrization (16 nodes / 10 workflows):**
| Workflow | Node | Params | Detalhes |
|----------|------|--------|----------|
| Qualificador | Check Optout | 1 | WHERE RIGHT(telefone) |
| Orcamentista | Buscar Planta do Lead | 7 | NULLIF chains + WHERE |
| Orcamentista | Buscar Precos DB | 1 | WHERE gama |
| Orcamentista | Gravar Orcamento no BD | 15 | INSERT VALUES + ON CONFLICT |
| Orcamentista | Atualizar Fase Conversa | 2 | WHERE id + telefone |
| Gerar 3D | Buscar Planta e Lead | 6 | WHERE + ORDER BY NULLIF |
| Gerar 3D | Atualizar Fase Conversa | 2 | WHERE id + telefone |
| Guardar Planta | Guardar na BD | 7 | INSERT VALUES |
| Follow-up | Registar Follow-up BD | 5 | UPDATE SET + WHERE |
| Agendar Visita | Atualizar Fase Conversa | 1 | WHERE telefone |
| Visual Hook | Marcar Visual Hook Enviado | 1 | WHERE lead_id |
| Hunter | Salvar Terrenos | 1 | json_to_recordset |
| Agente Email | Guardar Lead BD | 7 | INSERT VALUES + ON CONFLICT |
| Enviar Email | Buscar Dados Lead | 2 | WHERE telefone |
| Enviar Email | Buscar Links Projeto | 3 | WHERE telefone + NULLIF |
| Enviar Email | Registar Envio BD | 3 | UPDATE SET + WHERE |

**Excluidos (dynamic SQL by design):** DB Comando, DB Set Notificado (Qualificador) - query IS `={{ $json._sql }}`

**Fase 3 — HTTP Error Handling (24 HTTP + 1 Agent / 12 workflows):**
| Workflow | Nodes | Tipo |
|----------|-------|------|
| Qualificador | Enviar WhatsApp, Enviar WA Comando | HTTP |
| Chat-Admin API | Chat Agent | Agent |
| Proposta Licenciamento | Gerar PDF Proposta | HTTP |
| Terreno PDF | HTTP Request, Generate PDF (Local) | HTTP |
| Follow-up | Enviar Follow-up WhatsApp | HTTP |
| Agendar Visita | Notificar Telegram, Buscar Eventos Calendar, Enviar WA Confirmacao, Enviar Email Confirmacao | HTTP |
| Visual Hook | Gerar Imagem Gemini, Tornar Publica Drive, Enviar Imagem Resgate | HTTP |
| Hunter | Notificar Telegram | HTTP |
| Agente Email | Claude Gerar Resposta, Enviar Email Resend, Notificar Telegram | HTTP |
| Enviar Email | Enviar via Resend | HTTP |
| Instagram | Classificar Intencao, Reply Lead Quente, DM Instagram, Reply Generico | HTTP |
| Health Check | Alertar Telegram | HTTP |

**Fase 4 — Webhook Auth (6 webhooks analisados):**
- Qualificador `/whatsapp-qualificador`: N/A (Evo API callback)
- Chat-Admin `/chat-admin` + `/chat-admin-api`: Token validation in workflow body
- Instagram `/instagram-comentarios`: N/A (Meta webhook callback, structural validation)
- Dashboard KPIs `/dashboard-kpis`: Read-only, no PII - low risk
- Dashboard Metricas `/dashboard`: Read-only - low risk

**Scripts:** `fix_s126_hardening.py`, `fix_s126_chat_admin.py`, `scan_sql_detail.py`
**Backups:** `backups/versions/` (auto-versioned pre-deploy por DeployClient)

#### 6 Erros N8N (diagnosticados S120, 6/6 fixados S121)
| Workflow | Erro | Causa | Fix | Estado |
|----------|------|-------|-----|--------|
| Health Check (`r5erAUczAlsiBuB5`) | IF node type mismatch | errorCount string vs number | `typeValidation: loose` | **FIXED S121** |
| Dashboard KPIs (`iZFE00PmnKvNvQ5k`) | SQL `data_criacao` | Query ja corrigida S119 (usa `created_at`) | Confirmado webhook 200 OK | **FIXED S121** |
| Hunter (`CBaxIWzRVMHXEmka`) | HTTP 404 Firecrawl | URL ja /v1/extract. body serialization errada | `body: object` + continueOnFail | **FIXED S121** |
| Health Check (`r5erAUczAlsiBuB5`) | Anthropic credits sem alerta | `$env.ANTHROPIC_API_KEY` undefined, sem categorizar billing errors | Credential directa `Bk484HJ8dYkpiTnQ` + categorizar billing/credits -> CRITICO + `conditions.options.version: 2` | **FIXED S121** |
| Instagram (`AKmb51meWZ2tlUoR`) | `Module 'crypto' is disallowed` | n8n security update bloqueou crypto nativo no Code node | Validacao estrutural payload Meta (entry/changes/messaging) em vez de HMAC. Webhook URL path serve como auth | **FIXED S121** |
| Orcamentista (`eV1txGMzmqOnuWyO`) | PDFs com dados errados (T3/120m2 vs T4/167m2) | `Adicionar Cronogramas`: (1) tipologia_pedida/area_pedida NUNCA definidos no pipeline, (2) var hoisting: tipoObra usado antes de definido, (3) area cai para valor Gemini em vez de DB | Read `$('Buscar Planta do Lead').first().json` (COALESCE tipologia + tamanho_desejado_m2). Fix tipoObra antes de uso. Deploy: `scripts/deploy/fix_orcamentista_data_loss.py` | **FIXED S121** |

---

## 7. HISTORICO SESSOES (resumo)

| Sessao | Data | Descricao |
|--------|------|-----------|
| **S150** | **25/03** | **Auditoria Estado.** Verificacao sistema: 30/43 workflows activos, 0 ficheiros apagados, skills organizadas (10 pastas com SKILL.md). ESTADO_ATUAL.md actualizado para S150 |
| **S149** | **25/03** | **Fix Preparar Arquiteto + Validador SyntaxError (Gerar Planta).** S146 knowledge injection quebrou 2 Code nodes com newlines literais em JS strings. Preparar Arquiteto: 36 linhas quebradas, escaped+merged (88->51). Preparar Validador: 14 linhas quebradas, escaped+merged (64->49). Scripts: fix_s149_preparar_arquiteto_surrogates.py, fix_s149b_preparar_validador.py |
| **S148** | **25/03** | **E2E Smoke Test + 3 Bug Fixes Orcamentista.** B1: Stale ref $('Calcular Orcamento Detalhado')->$('Motor BOM v1') em Gerar HTML + Adicionar Cronogramas. B2: valor_mao_obra adicionado ao INSERT (era sempre 0). B2b: Hotfix $15 bdi_percentual. Verificado: Record #846 T3 120m2 Media=264,215 EUR (2,202 EUR/m2), 18 cats, valor_mao_obra=79,041 OK. 12 test workflows cleaned up |
| **S147** | **25/03** | **BOM Engine Fase 5 — Calibracao.** 5 testes (T2-T4, base/medio/premium, 1-2 pisos). Steel PERFEITO (<0.02% desvio 5/5). 3 bugs: pintura double-count, OSB 12mm (18→10), Steel MO (3→2). Savings 6.5-7.2%. Ranges ajustados (spec 1.5mm heavy). Deploy prod 3/3 fixes verified. Scripts: calibration_phase5_s147.py, retest_calibration_s147.py, deploy_bom_fixes_s147.py |
| **S146** | **25/03** | **BOM Engine Fase 4 — Knowledge Injection.** Qualificador: +secao MOTOR BOM (18 cats, 114 items). Arquiteto: +regras estruturais (kg/m2, vaos, perfis). Validador: +E1-E4 estruturais. Gemini Vision: +nota precisao BOM. 3 workflows, 7/7 checks PASS |
| **S145** | **25/03** | **BOM Engine Fase 3 — Motor BOM v1.** Code Node ~1000 linhas substitui Set Calcular. +2 Postgres nodes. Calculo BOM linha a linha: 91 items referencia + 23 extras. Aco por kg com interpolacao T2/T4. T2 78m2: aco=4662kg, 194944 EUR, 2499 EUR/m2, 18 categorias |
| **S140** | **24/03** | **num_pisos + tem_cave Structured.** (1) DB: +num_pisos int DEFAULT 1, +tem_cave bool DEFAULT false, +composicao_pisos text. (2) Parent tools: Qualificador+Chat-Admin Gerar Planta +num_pisos/$fromAI +tem_cave/$fromAI +description. (3) Sub-workflow: Extrair Dados Lead S140 override, Criar Projeto SQL +$4/$5/$6, Atualizar Projeto SQL +$6/$7/$8. (4) Backfill via plantas_geradas.prompt_atual regex: 66 multi-pisos, 22 cave, 79 composicao. 3 workflows deployed |
| **S139** | **24/03** | **projeto_id Harmonization.** Root cause: Chat-Admin vs WhatsApp conflito = ambos chamam 12 sub-workflows com params diferentes. (1) Added projeto_id a 8+9 tools = 24/24 PASS. (2) Proposta Licenciamento lateral join filtra por projeto_id. (3) Enviar Email Lead trigger ref fix. 4 workflows deployed. Multi-projeto robusto |
| **S138** | **24/03** | **Bug Hunt Fase 2 — Functional.** 7 real bugs fixed: Retornar Erro JSON escape, Buscar Precos DB `=` prefix+qR, Consultar Terrenos qPJ→qR+6x ILIKE, Health Check IF strict, Chat-Admin +3 params, Telegram Notify msg guard, Chat-Admin .trim(). 8 workflows re-deployed. Known bugs: NONE |
| **S137** | **23/03** | **Bug Hunt Fase 1 — Structural.** 60 fixes em 16 workflows. 22/22 PASS |
| **S136** | **23/03** | **CLAUDE_GITHUB Potencializacao Completa.** Phase 4: Design system v1.0+Dashboard redesign+PDF template. Phase 5: Knowledge base 9 ficheiros `docs/kb/`+Defuddle testado. 5/5 fases DONE |
| **S135** | **23/03** | **Pre-deploy Validation + GSD Hooks Verified.** Phase 2: 5 GSD hooks testados e funcionais (statusline, workflow-guard, prompt-guard, context-monitor, check-update). Phase 3: (1) Criada skill `n8n-predeploy-validation.md` com classificacao BLOCK/WARN/INFO + false positive patterns + workflow baselines. (2) Enhanced `deploy_utils.py` de 6 para 10 checks (+dup IDs, +queryParametersJson, +onError conflicts, +onError without connections, +Anthropic credential type). Return signature: `(ok, errors, warnings)`. (3) Validated 3 live wf: Qualificador PASS (0 err/3 warn), Gerar 3D BLOCK (2 err), Gerar Planta BLOCK (1 err). Bugs found (deferred): Gerar Planta dup node ID, Gerar 3D queryParametersJson+continueOnFail conflict, ~19 nodes onError without error connections |
| **S134** | **23/03** | **Claude Code Tooling Phase 2.** 5 GSD hooks activados em settings.local.json: Notification (statusline), PreToolUse (workflow-guard, prompt-guard), PostToolUse (context-monitor), SessionStart (check-update). Hooks config validated |
| **S133** | **23/03** | **Fix PDF Data Mismatch + System-wide queryParametersJson.** (1) Root cause: Qualificador sends tipologia_pedida/area_pedida but Parse Input dropped them. Fix: 3 nodes patched. (2) ALL 15 Postgres nodes using queryParametersJson converted to queryReplacement across 10 workflows. Script: `fix_s133_all_qpj_to_qr.py` |
| **S132** | **23/03** | **Fix S126 Hardening SQL Bugs.** 8 fixes: Guardar Planta SQL unterminated string, Orcamentista Gravar SQL, Buscar Precos queryParametersJson broken, Qualificador Auto Criar Lead params, Listar Projetos queryParametersJson, Health Check Number() type, Dashboard KPIs onError, Orcamentista +onError 7 nodes. Key learning: queryParametersJson silently fails in n8n Postgres v2.5 |
| **S131** | **23/03** | **Instagram Dedup Race Condition Fix.** DMs duplicados causados por race condition entre webhook events. Fix: +tabela `instagram_dedup` (comment_id PK), Verificar Duplicado: SELECT->INSERT atomico (ON CONFLICT DO NOTHING + RETURNING). Script: `fix_s131_instagram_dedup_race.py` |
| **S130** | **23/03** | **Instagram 3 Bug Fixes.** (1) **Self-loop guard:** Bot processava proprios replies como novos comentarios (username obras_net, user_id 17841425888570262). Fix: return [] em Extrair Dados Comentario. (2) **Expression eval:** Reply mostrava expressao n8n literal (`@{{ $('Extrair Dados Comentario')... }}`). Causa: jsonBody sem prefixo `=` nao avalia {{ }}. Fix: `={{ JSON.stringify({...}) }}`. (3) **DM Private Reply:** recipient.id (IGUID) incompativel com Messaging API. Fix: recipient.comment_id (Instagram Private Reply API). Scripts: `fix_s130_instagram_selfloop_dm.py`, `fix_s130b_instagram_expressions.py` |
| **S129** | **23/03** | **Instagram Token Renovado.** Token IGAA* expirado (error 190). Novo token gerado no Meta App Dashboard. Credential `XzAvbrnelwpWP5gN` ("Instagram Token - obras_net") atualizada com Bearer + novo IGAA*. 3 nodes (Reply Lead Quente, DM Instagram, Reply Generico) re-apontados de credential antiga `JVnTwFHcfbn3rf8j` (apagada) para `XzAvbrnelwpWP5gN`. Exec 40574: Reply Lead Quente OK (id:18564560368040078). DM falha com erro separado (recipient_id format). .env atualizado |
| **S128** | **23/03** | **Instagram URL Fix.** 3 nodes (Reply Lead Quente, Reply Generico, DM Instagram) corrigidos de `graph.facebook.com` para `graph.instagram.com`. IGAA* tokens so funcionam em graph.instagram.com. Script: `fix_s128_instagram_url.py` |
| **S127** | **23/03** | **Instagram LIVE + Fix BUG CRITICO anthropicApi.** (1) Instagram confirmado LIVE: primeiro comentario real fabiolaoliveira67 "oi". Token obras_net validado, App Live mode, webhook Meta OK. (2) **BUG CRITICO:** `predefinedCredentialType: anthropicApi` avariado em HTTP Request nodes n8n. Afectava 4 nodes/3 wf (Instagram Classificar Intencao, Email Claude Gerar Resposta, Gerar Planta Arquiteto+Validador). Fix: criada credential "Anthropic Header Auth" (httpHeaderAuth, id `9LJzcpuTka9VGfU2`, header `x-api-key`). Exec 40556 confirma classificacao Claude OK ("Teste"->SPAM). Billing: 75.50 US$, auto-reload ON |
| **S126** | **22/03** | **Hardening Fase 2-3-4 COMPLETO.** F2: SQL parametrization 16 nodes/10 wf (Qualificador+Orcamentista+Gerar3D+Guardar Planta+Follow-up+Agendar Visita+Visual Hook+Hunter+Agente Email+Enviar Email). F3: onError 24 HTTP+1 Agent/12 wf (ALL workflows). F4: Webhook auth N/A (external callbacks). 25/25 workflows CLEAN. Scripts: `fix_s126_hardening.py`, `fix_s126_chat_admin.py` |
| **S125** | **22/03** | **P0 Manual Fixes (3/3).** Hunter: ghost ref $('Filtrar Terrenos')->$('Firecrawl Agent') + Evo API key corrigida. Agente Email: anti-loop broadfix (casaslsf.com && !leads@). Script: `fix_s125_p0_manual.py` |
| **S124** | **22/03** | **Auditoria Completa do Sistema.** 31/31 workflows auditados via API live (~300 nodes). **157 issues: 15 P0, 70 P1, 72 P2.** Top P0: Rescue Leads non-funcional (desactivar), Visual Hook+Hunter API key errada + SQL fantasma, Update Prices credential placeholder, Agente Email anti-loop bloqueia leads, Agendar Visita DB update incondicional, Orcamentista nodes orfaos. Cross-cutting: SQL injection 8+ wf, Gemini key hardcoded 9+ nodes, Evo key inconsistente 3 wf. Gold standard: Instagram. Relatorio: `docs/AUDITORIA_COMPLETA_S124.md` |
| **S123** | **22/03** | **Hotfix P0 + Auditoria completa Qualificador.** (1) Fix crash Merge Optout: deploy S122 injectou `optoutResult`/`enriched` (vars erradas) -> `db`/`merged`. **Bloqueava todos os leads.** (2) Fix pausa field names: `isOptout`->`is_optout`. Leads pausados agora interceptados. (3) Fix Handle Optout: diferencia pausa vs optout (msg /retomar vs /voltar). (4) IF nodes metadata v2. Auditoria: 33/33 nodes, 13/13 tools, connections, prompt 27.6k OK |
| **S122** | **22/03** | **Fix 8/9 bugs S120.** Qualificador: (1) REGRAS MULTI-IMAGEM - guardar+confirmar+esperar antes de gerar (S120-1+2+3). (2) +pushName no agent input [NOME:] + regra nome (S120-6). (3) Timing reforçado "chamar PRIMEIRO" (S120-7). (4) +Resposta Erro API node onError handler (S120-8). (5) +/pausa +/retomar slash commands (S120-9). Follow-up: +ultima_interacao WHERE em TIERS 1-4 (S120-5). Qualificador 32->33 nodes, prompt 26.4k->27.6k chars. Deploy: `fix_s122_bugs.py` |
| **S121** | **22/03** | **Fix 6/6 erros n8n (TODOS).** (1) Health Check: IF typeValidation strict->loose. (2) Dashboard KPIs: confirmado ja corrigido (webhook 200 OK). (3) Hunter: body serialization fix + continueOnFail. (4) Health Check Anthropic: credential directa + billing/credits categorization + CRITICO prefix + IF v2 conditions.options.version. (5) Instagram crypto: validacao estrutural payload Meta (entry/changes/messaging) substitui HMAC bloqueado. (6) **Orcamentista data loss P0:** Root cause em Adicionar Cronogramas - tipologia_pedida/area_pedida nunca definidos + var hoisting tipoObra. Fix: `$('Buscar Planta do Lead').first().json` para DB values (COALESCE tipologia + tamanho_desejado_m2). Deploy: `fix_orcamentista_data_loss.py` |
| **S120** | **22/03** | **Analise profunda lead Miguel Parreira (+351 966 570 590).** Chat completo (~1600 linhas, 2 dias), 90+ ficheiros (esbocos, plantas, PDFs, 3D, audios). 9 bugs identificados (5x P0, 3x P1, 1x P2). 11 problemas UX/flow. 6 erros n8n activos diagnosticados (Health Check IF type, KPIs SQL data_criacao, Hunter /v1/agent 404, Anthropic credits, Instagram crypto, Orcamentista data loss). Lead fez 11x /reset em 2 dias — sistema incapaz de manter contexto e gerar correctamente T4/167m2/4 niveis |
| **S119** | **22/03** | **Actualizacao n8n completa (8 tarefas).** (1) Limpeza 3 TEMP workflows [ARCHIVED]. (2) Limpeza 2 Legacy OLD [ARCHIVED] (0 refs, 0 execucoes). (3) Instagram erros: causa crypto S116 ja corrigida, 100% success. (4) Health Check deployed `r5erAUczAlsiBuB5` (30min, PG+Evo+Anthropic, Telegram). (5) Dashboard KPIs API deployed `iZFE00PmnKvNvQ5k` (GET /webhook/dashboard-kpis). (6) Anti-Robo: verificado ja aplicado (26.4k chars). (7) Optimizacoes: taxas Qualif 100%, Planta 100%, Orc 88%, 3D 94%. (8) Hunter fix: /v1/agent->/v1/extract (Firecrawl endpoint mudou). Scripts: deploy_health_check.py, deploy_dashboard_kpis.py, fix_kpis_query.py, fix_hunter_firecrawl.py. Total pos-S119: 38 workflows (31 activos, 7 archived). Pendentes: F1-F9 em `docs/atualizarn8n.md` |
| **S118** | **22/03** | **n8n-mcp MCP server.** Configurado `.mcp.json` (project-scoped). Build fix: `tsc -p tsconfig.build.json`. Telemetry disabled. 20 tools (7 docs + 13 n8n mgmt). Server: `CLAUDE_GITHUB/n8n-mcp-main/dist/mcp/index.js` |
| **S117** | **22/03** | **Instalacao Ferramentas CLAUDE_GITHUB.** 5 repos integrados: (1) claude-code-cookbook PT: 39 commands + 9 roles em `.claude/commands/cook-pt/` e `.claude/agents/roles/`. (2) get-shit-done: 57 commands + 18 agents + 5 hooks em `.claude/commands/gsd/`, `.claude/agents/`, `.claude/hooks/`. (3) n8n-mcp: MCP server com 1084+ nodes knowledge base. (4) obsidian-skills: 5 skills (markdown, bases, canvas, cli, defuddle). (5) ui-ux-pro-max: 7 skills (design, brand, banner, slides, ui-styling, design-system, ui-ux-pro-max). Criado `.planning/` (PROJECT, STATE, ROADMAP, REQUIREMENTS, config.json). Skill mestre `obrasnet.md` em `.claude/skills/`. Total: 96 commands + 18 agents + 9 roles + 20 skills + 5 hooks. Doc: `docs/CLAUDE_GITHUB_POTENCIAL.md` |
| **S116** | **19-20/03** | **Instagram Meta App Review.** App "LSF PRO BUILDER" (1442599727459729). IG App (963285583030800). FB Login "Instagram LSF" (3100416520161797). Script `scripts/deploy/test_meta_app_review.py` **v3: 25/25 TODOS via graph.facebook.com**. Instagram (17 perms): basic, content_publish, manage_comments, manage_messages, manage_insights, manage_contents, shopping, branded_content(3), marketplace, upcoming_events, content_publish, basic. Facebook (6 perms): public_profile, email, pages_read_engagement, business_management, business_asset_user_profile_access, human_agent. WhatsApp (2): whatsapp_business_management, whatsapp_business_messaging. IDs: FB User 1952155152047439, Page Obrasnet 970474956380891, Business 110134927012859, IG Business 17841425888570262. Meta dashboard: Instagram "Testing in progress", WhatsApp "Testing not started". Contadores levam ate 24h. Proximo: esperar contadores -> submeter App Review |
| **S115** | **19/03** | **Recriar Melhorias:** 8 fixes ao pipeline de esboco em Gerar Planta. Pipeline unificado (isRecriar), Claude Arquiteto processa esbocos, 2 opcoes A=Fiel/B=Melhorada, validacao imagem, area auto-detect, multi-piso recriar, regras qualidade+negativePrompt, PT unificado. Deploy: `scripts/deploy/deploy_recriar_melhorias.py` |
| **S114** | **19/03** | **Monitorizacao:** Health Check workflow (5 checks, 15min, heartbeat 6h) + Dashboard KPIs API + Dashboard HTML (tema escuro, 16+ KPIs, auto-refresh) + Actualizacao CLAUDE_PROJECT_PROMPT.md + ESTADO_ATUAL.md |
| **S111** | 18/03 | **Instagram Quality:** 8 fixes (HMAC P0, event_type guard, anti-injection, DM verify, ON CONFLICT, +2 DB cols). 21->26 nodes |
| **S110** | 18/03 | **Instagram:** 6 bug fixes (creds, extractor multi-format, SQL inject, API v22.0, +Guardar Outro). 20->21 nodes |
| **S109** | 17/03 | **Qualificador:** Removido fallback OpenAI GPT-4o (3 nodes). Claude Sonnet 4.5 unico motor. 35->32 nodes |
| **S107** | 17/03 | **Gerar 3D:** 5 bug fixes (piscina P0, multiFloor P0, tipo_obra_nome P1, has1oAndar P1, rear_facade P2) + 2 melhorias (fallback DNA, interiores numFloors) |
| **S105-106** | 17/03 | **Orcamentista:** Fix rodape (perim_ext*0.8) + lead data (nome/tel/acabamento/tipo) em todos 4 PDFs |
| **S104** | 17/03 | **Prompt Optimization:** Qualificador 57k -> 23k chars (-59%). Removidas duplicacoes GPT-4o |
| **S103** | 16-17/03 | **Sprint 3+4+5:** BUG-012-019 + Firewall + Snapshot + base64 migrado (324->79MB) + workflow audit |
| **S102** | 16/03 | **Sprint 2:** BUG-005-011 (7 P1 bugs). Gemini prompts + 3D upload + Hunter |
| **S101** | 16/03 | **Sprint 0+1:** Migracao Claude + BUG-001-004 (4 P0 bugs) |
| S100 | 15/03 | Fix sketch/planta reference (OR projeto_id IS NULL) |
| S99 | 15/03 | Fix Agendar Visita + audit 12 tools workflowInputs |
| S98 | 15/03 | Consulta Arquitectonica + RESUMO VISUAL obrigatorio |
| S97 | 15/03 | 7 slash commands WhatsApp + optout system |
| S96-96b | 15/03 | Fix NaN orcamento + 3D multi-floor query |
| S93-95 | 14-15/03 | Fix Follow-up P0 + Gerar Planta P1 + ACAO IMEDIATA |
| S90-92 | 14/03 | Instagram pipeline + Teste E2E (34 PASS / 7 FAIL) |
| S85-89 | 12-13/03 | Multi-floor + multi-pisos orcamento + 3D fixes + multi-projecto |
| S73-84 | 05-12/03 | RECRIAR image-to-image + RGEU + 7 sub-tipos + auto-criar leads |
| S51-72 | 02-05/03 | Multi-projecto + email agent + defineBelow + 3D 7 vistas + DNA visual |
| S30-50 | 28/02-02/03 | Follow-up tiers + terrenos + email anti-loop + prompt fixes |
| S1-29 | 24-28/02 | Sistema base: fix 81x + Gemini + Drive + media + safeMath + PDM + industrial |

---

## 8. CONTACTO E SERVICOS

- **Flaviano Souza** | 930 423 456 | Seg-Sex 9h-18h, Sab 9h-13h
- **Precos:** Basico 1000-1500 | Medio 1400-2000 | Premium 1800-2500 EUR/m2
- **Site:** casaslsf.com (GA4: G-9HVPSLW5W5, GTM: GTM-N8CH63PC)

---

**Ultima atualizacao:** 2026-03-25 (S150 — Auditoria estado. S149: Fix SyntaxError Gerar Planta. S148: E2E Smoke Test Orcamentista. S147: Calibracao BOM. S146: Knowledge injection. S145: Motor BOM v1. **Known bugs: NONE. 30/43 workflows activos.**)
