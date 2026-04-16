# AUDITORIA COMPLETA DO SISTEMA - LSF Intelligence AI + Casas LSF

**Data:** 2026-02-17 (Auditoria Completa v6 - SEO Fase 4)
**Data original:** 2026-02-10
**Objetivo:** Mapear TUDO que existe no sistema - codigo, workflows, BD, APIs, scripts, website, SEO

---

## RESUMO EXECUTIVO

### Status Geral: **100% OPERACIONAL**

| Metrica | Valor |
|---------|-------|
| Workflows N8N totais | 32 (12 activos) |
| Workflows PRINCIPAIS | 6 activos + 1 follow-up |
| Ferramentas do agente | 5 (orcamento rapido, terrenos, planta 2D, orcamento detalhado, proposta licenciamento) |
| Tabelas PostgreSQL | 16 + tabela artigos (CASAS LSF) |
| APIs integradas | 8 |
| Composicoes BD | 34 (todas com caderno encargos) |
| Materiais BD | 230 activos (100% com mao de obra > 0) |
| Leads BD | 49+ |
| Terrenos BD | 68 |
| Plantas geradas | 7 |
| Artigos blog | 222 (migrados do WordPress) |
| Categorias SEO | 14 |
| Paginas SEO autoridade | 7 |
| Componentes frontend | 11 |
| Scripts automacao | 38+ |
| Linhas de codigo total | ~18.000+ |

---

## 1. ESTRUTURA DOS PROJETOS

### 1.1 LSF-Intelligence-AI (Automacao + N8N + Scripts)

```
LSF-Intelligence-AI/
├── README.md                              # Documentacao geral (3563 linhas)
├── extract_wp_posts.py                    # Extrai posts do WordPress SQL dump (3012 linhas)
├── import_wp_to_api.py                    # Importa posts WP para API CASAS LSF (7018 linhas)
├── recategorize_seo.py                    # Recategoriza artigos com SEO + dados GSC (7850 linhas)
├── wp_posts_extracted.json                # Posts extraidos do WordPress (2.2M linhas)
├── wp_posts_summary.json                  # Resumo dos posts extraidos
├── temp_agent_wf.json                     # Backup workflow agente
├── temp_followup_wf.json                  # Backup workflow follow-up
├── mcp-tools/
│   ├── server.js                          # Servidor MCP 5 ferramentas (340 linhas)
│   ├── package.json                       # Dependencies (MCP SDK, pg, dotenv)
│   ├── tools_schema.json                  # Schema das tools MCP (121 linhas)
│   └── .env                              # Credenciais BD + APIs
├── prompts/
│   ├── lsf_agent_system_prompt.json       # System prompt v5.1 (117 linhas)
│   └── image_gen_template.json            # Template Gemini plantas (52 linhas)
├── workflows/
│   ├── visual_hook_automatico.json        # Workflow visual hook (143 linhas)
│   └── workflow_mapa_quantidades.json     # Workflow mapa quantidades (138 linhas)
├── sql/
│   └── rescue_leads_query.sql             # Query resgate leads frios (79 linhas)
├── scripts/
│   ├── n8n_api.py                         # Modulo base API N8N (42 linhas)
│   ├── mapa_quantidades.js                # Calculo orcamento profissional (499 linhas)
│   ├── migrate_seo_fields.py              # Migrar campos SEO na BD (50 linhas)
│   ├── seo_bulk_update.py                 # Bulk update SEO 222 artigos (298 linhas)
│   ├── seo_content_enhance.py             # Otimizar HTML dos artigos (229 linhas)
│   ├── fix_n8n_workflows.py               # Fix follow-up loop + agente (314 linhas)
│   ├── deploy/                            # 17 scripts de deploy N8N
│   │   ├── deploy_orcamentista.py         # Deploy pipeline orcamentista (664 linhas)
│   │   ├── deploy_orcamento_v2.py         # Upgrade 9→13 categorias (316 linhas)
│   │   ├── deploy_caderno_encargos.py     # Caderno encargos no PDF (493 linhas)
│   │   ├── deploy_followup_automatico.py  # Deploy follow-up automatico (234 linhas)
│   │   ├── deploy_dashboard_leads.py      # Deploy dashboard leads (217 linhas)
│   │   ├── deploy_prompt_merged.py        # Deploy prompt merged (253 linhas)
│   │   ├── deploy_prompt_v2.py            # Deploy prompt v2 (230 linhas)
│   │   ├── add_orcamento_tool.py          # Adicionar tool #4 ao agente (132 linhas)
│   │   ├── restore_agent_prompt.py        # Restaurar prompt completo v5.0 (190 linhas)
│   │   ├── update_precos_dinamicos.py     # Precos dinamicos da BD (333 linhas)
│   │   ├── integrar_proposta_licenciamento.py # Sub-workflow proposta (469 linhas)
│   │   ├── integrar_3pdfs.py              # Integra 3 PDFs (621 linhas)
│   │   ├── migrate_to_tools_agent.py      # Migrar para tools agent (423 linhas)
│   │   ├── fix_proposta_subworkflow.py    # Fix sub-workflow proposta (126 linhas)
│   │   ├── update_agent_3pdfs.py          # Update agente 3 PDFs (89 linhas)
│   │   ├── update_footer_empresa.py       # Update footer empresa (55 linhas)
│   │   ├── update_html_template.py        # Update template HTML (179 linhas)
│   │   ├── update_planta_titulo.py        # Update titulo planta (165 linhas)
│   │   └── add_drive_sharing.py           # Sharing Google Drive (176 linhas)
│   ├── generators/                        # 5 scripts geradores PDF
│   │   ├── gen_proposta_licenciamento.py  # Gerar proposta licenciamento (389 linhas)
│   │   ├── gen_cronograma_executivo.py    # Gerar cronograma executivo (273 linhas)
│   │   ├── gen_cronograma_financeiro.py   # Gerar cronograma financeiro (324 linhas)
│   │   ├── gen_preview_final.py           # Preview final PDF (346 linhas)
│   │   └── gen_preview_profissional.py    # Preview profissional PDF (384 linhas)
│   ├── fix/
│   │   └── fix_whatsapp_filter.py         # Filtro mensagens nao-texto (134 linhas)
│   └── db/                                # 7 scripts base de dados
│       ├── add_caderno_encargos.py        # Caderno encargos 34 textos (676 linhas)
│       ├── add_materials_v2.py            # Adicionar materiais v2 (160 linhas)
│       ├── fix_encoding.py                # Fix encoding BD (61 linhas)
│       ├── normalize_categories.py        # Normalizar 31→16 categorias (163 linhas)
│       ├── populate_composicoes.py        # Popular composicoes v1 (507 linhas)
│       ├── populate_composicoes_v2.py     # Popular composicoes v2 (254 linhas)
│       └── update_mao_obra_lisboa.py      # Precos MO Lisboa 113 itens (312 linhas)
├── docs/                                  # 12 documentos
│   ├── AUDITORIA_SISTEMA_ATUAL.md         # Este ficheiro
│   ├── SEO_ARCHITECTURE.md                # Arquitetura SEO completa (770 linhas) [NOVO Fase 4]
│   ├── PLANO_EXECUCAO.md                  # Plano execucao pipeline (428 linhas)
│   ├── ERROS_SISTEMA.md                   # Erros e correcoes (182 linhas)
│   ├── CONFIGURACAO_WORKFLOW_ATUAL.md     # Config workflow actual (552 linhas)
│   ├── PLANO_MIGRACAO_AI_AGENT.md         # Plano migracao agente (436 linhas)
│   ├── escopo_projeto_sistema_lsf.md      # Escopo do projecto (216 linhas)
│   ├── objetivo_do_projeto.md             # Objetivos (36 linhas)
│   ├── hunter_integration.md              # Integracao Hunter (88 linhas)
│   ├── Mapa_de_quantidade.md              # Regras orcamento LSF (270 linhas)
│   ├── skill_idealista.md                 # Skill scraping Idealista (686 linhas)
│   └── skill_materiais.md                 # Skill precos materiais (814 linhas)
├── skills/
│   └── firecrawl_hunter/SKILL.md          # Skill Firecrawl precos PT (204 linhas)
├── assets/
│   ├── logo_obrasnet_b64.txt              # Logo base64
│   ├── logo_obrasnet_small_b64.txt        # Logo pequeno base64
│   ├── logo_obrasnet_png.png              # Logo PNG
│   └── qr_whatsapp.txt                    # QR code WhatsApp
├── backups/                               # 11 backups de workflows
│   ├── wf_orcamentista.json               # Backup orcamentista
│   ├── workflow_main_backup.json          # Backup principal
│   └── ... (9 ficheiros)
└── BLOG_ANTIGO/
    └── casaslsf_flaviano_wp473.sql        # Dump WordPress original (108 MB)
```

### 1.2 CASAS LSF (Website Frontend + Backend)

```
CASAS LSF/
├── frontend/                              # Next.js 16 + Tailwind v4
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                   # Homepage (105 linhas)
│   │   │   ├── layout.tsx                 # Root layout + JSON-LD Organization (138 linhas)
│   │   │   ├── actions.ts                 # Server actions (32 linhas)
│   │   │   ├── robots.ts                  # Robots.txt config (14 linhas)
│   │   │   ├── sitemap.ts                 # Sitemap dinamico 14 estaticas + 222 artigos (123 linhas)
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx               # Blog listing (280 linhas)
│   │   │   │   └── [slug]/page.tsx        # Artigo individual SEO completo (407 linhas)
│   │   │   ├── simulador/page.tsx         # Simulador orcamento
│   │   │   ├── plantas/page.tsx           # Modelos de casas
│   │   │   ├── custos/page.tsx            # Pagina custos
│   │   │   ├── metodos/page.tsx           # Metodos construcao
│   │   │   ├── como-funciona/page.tsx     # Como funciona
│   │   │   ├── sobre-obrasnet/page.tsx    # Sobre a OBRASNET (212 linhas) [NOVO]
│   │   │   ├── metodologia-construtiva/page.tsx   # Metodologia LSF (222 linhas) [NOVO]
│   │   │   ├── processo-construcao-lsf/page.tsx   # Processo construtivo (267 linhas) [NOVO]
│   │   │   ├── preco-construcao-lsf-por-m2/page.tsx # Precos por m2 (269 linhas) [NOVO]
│   │   │   ├── quanto-custa-casa-lsf/page.tsx     # Quanto custa casa (250 linhas) [NOVO]
│   │   │   ├── casa-lsf-financiamento/page.tsx    # Financiamento (269 linhas) [NOVO]
│   │   │   └── empresa-construcao-lsf-portugal/page.tsx # Empresa LSF PT (280 linhas) [NOVO]
│   │   ├── components/                    # 10 componentes (904 linhas total)
│   │   │   ├── GerarEstudoButton.tsx      # Formulario estudo tecnico N8N (269 linhas) [NOVO]
│   │   │   ├── ExitIntentCapture.tsx      # Modal exit intent lead capture (148 linhas) [NOVO]
│   │   │   ├── Footer.tsx                 # Footer 5 colunas (164 linhas)
│   │   │   ├── Navbar.tsx                 # Navegacao (75 linhas)
│   │   │   ├── RelatedArticles.tsx        # Artigos relacionados (64 linhas) [NOVO]
│   │   │   ├── AuthorSection.tsx          # Seccao autor E-E-A-T (38 linhas) [NOVO]
│   │   │   ├── Breadcrumbs.tsx            # Breadcrumbs acessiveis (33 linhas) [NOVO]
│   │   │   ├── WhatsAppCta.tsx            # CTA WhatsApp (35 linhas) [NOVO]
│   │   │   ├── InlineCta.tsx              # CTA inline no artigo (44 linhas) [NOVO]
│   │   │   └── FaqSection.tsx             # FAQ accordion details/summary (34 linhas) [NOVO]
│   │   ├── lib/
│   │   │   └── ...
│   │   └── middleware.ts                  # Middleware redirects 301 + 15 rotas + 3 blog slug redirects (130 linhas)
│   └── package.json
├── backend/                               # FastAPI + async SQLAlchemy + PostgreSQL
│   ├── app/
│   │   ├── main.py                        # FastAPI app + /api/gerar-estudo (201 linhas)
│   │   ├── models.py                      # SQLAlchemy models Lead + Artigo (45 linhas)
│   │   ├── schemas.py                     # Pydantic schemas (105 linhas)
│   │   ├── database.py                    # AsyncSession PostgreSQL (52 linhas)
│   │   ├── routers.py                     # Router leads CRUD (25 linhas)
│   │   ├── artigos_router.py              # Router artigos + related (194 linhas)
│   │   └── seed_data.py                   # 10 artigos seed (441 linhas)
│   └── requirements.txt                   # fastapi, uvicorn, sqlalchemy, asyncpg, httpx
└── .github/                               # CI/CD (se existir)
```

---

## 2. WEBSITE CASAS LSF (casaslsf.com)

### 2.1 Stack Tecnica

| Tecnologia | Versao | Funcao |
|------------|--------|--------|
| Next.js | 16 | Framework frontend (App Router, ISR, SSR) |
| Tailwind CSS | v4 | Styling (glass-card, btn-primary, text-gradient) |
| FastAPI | 0.110+ | Backend API async |
| SQLAlchemy | 2.0+ | ORM async com asyncpg |
| PostgreSQL | - | Base de dados principal |
| EasyPanel | - | Hosting (auto-deploy de GitHub push) |

### 2.2 URLs de Producao

| Servico | URL |
|---------|-----|
| Frontend | https://casas-lsf-frontend.dy3pb5.easypanel.host |
| Backend API | https://casas-lsf-backend.dy3pb5.easypanel.host |
| Dominio producao | https://casaslsf.com |
| GitHub | https://github.com/flavianosouza/casas_lsf.git |
| Docs API | https://casas-lsf-backend.dy3pb5.easypanel.host/docs |

### 2.3 Paginas do Website (14 + 222 artigos)

**Paginas estaticas:**
| Pagina | Prioridade Sitemap | Tipo |
|--------|-------------------|------|
| `/` (Homepage) | 1.0 | Landing |
| `/simulador` | 0.9 | Conversao |
| `/plantas` | 0.8 | Catalogo |
| `/custos` | 0.8 | Informacional |
| `/metodos` | 0.7 | Informacional |
| `/como-funciona` | 0.7 | Informacional |
| `/blog` | 0.8 | Blog listing |
| `/sobre-obrasnet` | 0.8 | E-E-A-T **[NOVO]** |
| `/metodologia-construtiva` | 0.8 | Pilar SEO **[NOVO]** |
| `/processo-construcao-lsf` | 0.8 | Pilar SEO **[NOVO]** |
| `/preco-construcao-lsf-por-m2` | 0.9 | Pilar SEO (7307 cliques GSC) **[NOVO]** |
| `/quanto-custa-casa-lsf` | 0.9 | Comercial **[NOVO]** |
| `/casa-lsf-financiamento` | 0.8 | Pilar SEO **[NOVO]** |
| `/empresa-construcao-lsf-portugal` | 0.8 | Transacional **[NOVO]** |

**Artigos blog:** 222 artigos em `/blog/[slug]` (prioridade 0.6, revalidate 300s)

### 2.4 Componentes Frontend (10)

| Componente | Linhas | Funcao | Status |
|------------|--------|--------|--------|
| GerarEstudoButton | 269 | Formulario estudo tecnico → N8N webhook | **NOVO** |
| ExitIntentCapture | 148 | Modal exit intent → salva lead na BD | **NOVO** |
| Footer | 164 | Footer 5 colunas com links paginas SEO | Atualizado |
| Navbar | 75 | Navegacao principal | Original |
| RelatedArticles | 64 | Grid 4 artigos da mesma categoria | **NOVO** |
| AuthorSection | 38 | Bio autor E-E-A-T + credenciais IMPIC | **NOVO** |
| Breadcrumbs | 33 | Navegacao breadcrumb acessivel | **NOVO** |
| WhatsAppCta | 35 | Botao WhatsApp wa.me com mensagem contextual | **NOVO** |
| InlineCta | 44 | CTA inserido apos 2o paragrafo do artigo | **NOVO** |
| FaqSection | 34 | FAQ accordion details/summary sem JS | **NOVO** |

### 2.5 API Backend - Endpoints

| Metodo | Endpoint | Funcao |
|--------|----------|--------|
| GET | `/` | Health check API |
| GET | `/health` | Status check |
| GET | `/docs` | Swagger/OpenAPI docs |
| POST | `/api/leads/` | Criar lead |
| GET | `/api/leads/` | Listar leads |
| GET | `/api/artigos/` | Listar artigos (paginado) |
| GET | `/api/artigos/slugs` | Todos os slugs (sitemap) |
| GET | `/api/artigos/categories` | Listar categorias |
| GET | `/api/artigos/related/{slug}` | Artigos relacionados (mesma categoria) **[NOVO]** |
| GET | `/api/artigos/{slug}` | Artigo por slug |
| POST | `/api/artigos/` | Criar artigo |
| PUT | `/api/artigos/{id}` | Atualizar artigo |
| POST | `/api/gerar-estudo` | Gerar estudo tecnico (N8N + lead) **[NOVO]** |
| POST | `/api/migrate-seo` | Migracao campos SEO |

### 2.6 SEO Implementado

**JSON-LD Schemas:**
- `Organization` - no layout.tsx (nome, logo, URL, contacto, redes sociais)
- `LocalBusiness` - no layout.tsx (endereco, telefone, horario, geo, taxID)
- `Article` - em blog/[slug] (author, wordCount, dateModified, articleSection)
- `BreadcrumbList` - em blog/[slug] (Home > Blog > Categoria > Titulo)
- `FAQPage` - em blog/[slug] (quando faq_json existe)
- `HowTo` - em processo-construcao-lsf (6 fases construcao)

**Campos SEO por artigo (6 novos):**
- `faq_json` (JSON) - 4-6 FAQs geradas por artigo
- `search_intent` (String) - informacional / comercial / transacional
- `internal_links_json` (JSON) - links internos
- `pillar_slug` (String) - slug do artigo pilar
- `read_time_minutes` (Integer) - tempo leitura calculado
- `updated_at` (DateTime)

**Distribuicao de intencao (222 artigos):**
- 112 informacional (50.5%)
- 72 comercial (32.4%)
- 38 transacional (17.1%)

**Middleware (15 rotas + redirects 301 + 3 blog slug redirects):**
- Redirects: `/portfolio/*` → `/plantas`, `/produto/*` → `/plantas`
- Redirects: `/precos-m2` → `/custos`, `/sobre` → `/`
- Redirects: `/contacto` e `/contactos` → `/simulador`
- Blog slug redirects (3): slugs antigos WP → slugs correctos BD **[NOVO Fase 4]**
- Catch-all: paths desconhecidos → `/blog/{slug}` (WordPress compat, com correcao slug)

### 2.7 Migracao WordPress

| Metrica | Valor |
|---------|-------|
| Posts importados | 222 (de 212+10 seed) |
| Categorias criadas | 14 SEO-optimizadas |
| Redirects 301 | Todos os slugs antigos WP |
| Limpeza HTML | Fusion Builder shortcodes removidos |
| Encoding | UTF-8 normalizado |
| Artigos com FAQs | 221/222 (1 erro slug com %c2%b2) |
| Artigos otimizados HTML | 127/222 (H1→H2, lazy loading, alt text) |

**14 Categorias SEO:**
1. construcao-lsf
2. precos-construcao
3. casas-modulares
4. credito-habitacao
5. icf-plastbau
6. telhados-coberturas
7. terrenos-licencas
8. remodelacao
9. pavilhoes-garagens
10. dicas-construcao
11. isolamento-energia
12. casas-madeira
13. betao
14. acabamentos

---

## 3. WORKFLOWS N8N - 7 ACTIVOS PRINCIPAIS

### 3.1 Qualificador WhatsApp (PRINCIPAL)

- **ID:** GcLmgtWBpqtApjR7
- **Status:** ACTIVO | 11 nodes (10 originais + Filtro Mensagens)
- **Modelo:** GPT-4o (via n8n LangChain)
- **promptType:** define
- **System Prompt:** v5.1 (7644 chars) - inclui apresentacao de servicos

**Pipeline (CORRIGIDO 16/02):**
```
WhatsApp (Evolution API) → Webhook → Filtro Mensagens (Code) → Felipe Cardoso - Consultor LSF (AI Agent GPT-4o)
    → Tool #1: Calcular Orcamento (Code inline)
    → Tool #2: Consultar Terrenos (Workflow → MmNHju2hE8M1pPum)
    → Tool #3: Gerar Planta (Workflow → LZVsCIDeMAHXxFke)
    → Tool #4: Mapa de Quantidade (Workflow → eV1txGMzmqOnuWyO)
    → Tool #5: Proposta Licenciamento (Workflow → JLDnddV05BepDVjw)
    → Enviar WhatsApp (Evolution API)
    + Postgres Chat Memory
```

**Node "Filtro Mensagens" (NOVO 16/02):**
- Filtra `event !== 'messages.upsert'` (ignora receipts, status)
- Filtra `key.fromMe === true` (evita echo loop do bot)
- Filtra `key.remoteJid.endsWith('@g.us')` (ignora grupos)
- Filtra `status@broadcast` (ignora broadcasts)
- Filtra mensagens vazias/sem texto
- `responseMode: 'responseHeaders'` (responde 200 imediatamente ao webhook)

**5 Ferramentas conectadas (ai_tool):**
1. `calcular_orcamento_lsf` - Estimativa rapida por m2
2. `consultar_terrenos` - Pesquisa BD terrenos
3. `gerar_planta` - Planta 2D tecnica (Gemini 2.5 Flash)
4. `mapa_de_quantidade` - Orcamento profissional PDF (13 categorias)
5. `proposta_licenciamento` - Proposta formal licenciamento PDF

---

### 3.2 Follow-up Automatico (CORRIGIDO 16/02)

- **ID:** EWgbilxrkoE0dszE
- **Status:** ACTIVO | 5 nodes
- **Trigger:** Cron cada 6 horas

**Pipeline:**
```
Cron 6h → Buscar Leads Sem Resposta (Postgres) → Preparar Mensagens (Code)
    → Enviar Follow-up WhatsApp (HTTP) → Registar Follow-up (Postgres)
```

**Correcoes aplicadas (16/02):**

| Problema | Antes | Depois |
|----------|-------|--------|
| Horario | Disparava 24/7 (23h, 05h) | 09h-18h Seg-Sex (Europe/Lisbon) |
| Loop infinito | `ultima_interacao = NOW()` resetava timer | **REMOVIDO** - so actualiza observacoes |
| Repeticao | Sem controlo de duplicados | Tier deduplication (24h, 48h, 72h) |
| Limite | Sem limite por lead | MAX 3 follow-ups por lead |
| Volume | 10 msgs por execucao | MAX 5 msgs por execucao |
| Dedup | Sem verificacao | Skip se tier ja foi enviado |

**SQL Query (corrigida):**
- Filtra leads com ultima_interacao entre 24h e 7 dias
- Exclui leads convertidos
- Verifica horario comercial (EXTRACT HOUR/DOW Portugal)
- Conta ocorrencias de "Follow-up" em observacoes (max 3)
- Limite 10 leads por query

**Code Node (corrigido):**
- Double-check horario comercial em JS (belt + suspenders)
- Tier deduplication: verifica se "Follow-up 24h/48h/72h" ja existe em observacoes
- 3 niveis de mensagem: 24h (duvidas), 48h (opcoes LSF), 72h (despedida)
- Mensagens personalizadas com nome do lead
- Max 5 follow-ups por execucao

---

### 3.3 Gerar Planta LSF (Sub-workflow)

- **ID:** LZVsCIDeMAHXxFke
- **Status:** ACTIVO | 20 nodes
- **Motor:** Gemini 2.5 Flash (gemini-2.5-flash-image)

**Pipeline:**
```
Execute Workflow Trigger → Preparar Prompt → Chamar Gemini API → Extrair Imagem
    → Imagem Gerada? (IF)
        SIM → Adicionar Logo → Upload Google Drive → Guardar BD → Enviar WhatsApp
        NAO → Retornar Erro
```

---

### 3.4 Orcamentista v3 (Sub-workflow)

- **ID:** eV1txGMzmqOnuWyO
- **Status:** ACTIVO | 21 nodes
- **Motor:** Gemini 2.0 Flash (Vision) + html2pdf.app

**Pipeline:**
```
Webhook Trigger → Buscar Planta → Gemini Vision → Buscar Precos BD
    → Calcular Orcamento (13 categorias) → Caderno Encargos → Gerar HTML
    → html2pdf.app → Upload Google Drive → Retornar Resultado
```

**13 Categorias do Orcamento:**
0. Estaleiro e Preparacao Terreno
1. Fundacoes (sapata corrida + laje)
2. Estrutura LSF - Paredes Exteriores
3. Estrutura LSF - Paredes Interiores
4. Impermeabilizacoes
5. Cobertura
6. Caixilharias e Portas
7. Acabamentos (pavimento + pintura)
8. WC e Cozinha
9. Instalacoes Electricas
10. Instalacoes Hidraulicas
11. Drenagem Aguas Pluviais
12. Telecomunicacoes ITED

**Precos:** Dinamicos da BD (34 composicoes com 175 itens)
**Margem:** 35% sobre materiais e mao de obra
**3 Niveis:** Base, Media (recomendado), Premium
**Caderno de Encargos:** 34 descricoes tecnicas profissionais no PDF

---

### 3.5 Proposta de Licenciamento (Sub-workflow)

- **ID:** JLDnddV05BepDVjw
- **Status:** ACTIVO | 7 nodes
- **Motor:** html2pdf.app + Google Drive

**Pipeline:**
```
Execute Workflow Trigger → Buscar Lead (Postgres) → Gerar HTML Proposta (Set)
    → Gerar PDF (html2pdf.app) → Upload Google Drive → Partilhar PDF → Retornar Resultado
```

**Conteudo da Proposta:**
- Entidade Proponente: OBRASNET UNIP LDA (NIF 515866989, Alvara IMPIC 94665)
- Design premium (gradient escuro, card estilo business)
- 13 especialidades obrigatorias (Arquitetura, Estabilidade, Termico, Acustico, ITED, SCIE, etc.)
- Prazo: 4-5 meses (2 fases)
- Valor: 10.000 EUR ate 200m2, 66 EUR/m2 acima
- Condicoes: 50% adjudicacao + 50% entrega

---

### 3.6 Consultar Terrenos

- **ID:** MmNHju2hE8M1pPum
- **Status:** ACTIVO | 2 nodes
- **Dados:** 68 terrenos (Sintra 23, Lisboa 20, Oeiras 20, Ericeira 2, Alenquer 2)

---

### 3.7 Outros Workflows Activos

| ID | Nome | Funcao |
|----|------|--------|
| 7S8tgHoECfUUOMed | Visual Hook Automatico | Envio automatico planta a leads frios |
| Xp25ExS55ALZLx3S | Update Prices Weekly | Actualizacao semanal precos Firecrawl |
| CBaxIWzRVMHXEmka | Hunter Integrado | Integracao hunter terrenos |
| KSzIYbis18Pbc64d | Orcamentista AI (backup) | Versao backup orcamentista |
| 5qjbijwXTGrvOD5A | Rescue Leads | Resgate de leads frios |
| pQsxBXc6kIDc2VBd | Notify Human Telegram | Notificacoes Telegram |

---

## 4. SERVICOS DISPONIVEIS VIA WHATSAPP

O agente apresenta **6 servicos** quando o lead pergunta o que fazemos:

| # | Servico | Descricao | Tool |
|---|---------|-----------|------|
| 1 | Consulta Gratuita | Conversa para perceber necessidades (tipologia, area, acabamentos) | Agente (conversa) |
| 2 | Pesquisa de Terrenos | Pesquisa em BD com 68+ terrenos em Lisboa/Sintra/Oeiras | consultar_terrenos |
| 3 | Planta 2D da Casa | Esboco planta tecnica gerada por IA (Gemini 2.5 Flash) | gerar_planta |
| 4 | Orcamento Detalhado | PDF profissional 13 categorias + caderno encargos | mapa_de_quantidade |
| 5 | Proposta Licenciamento | Comunicacao Previa com 13 especialidades obrigatorias | proposta_licenciamento |
| 6 | Construcao Completa | Moradia LSF do zero ate chave na mao (6-10 meses) | Agente (informativo) |

**Fluxo Ideal:**
```
1. Ola → Perguntar nome
2. Entender o sonho → tipologia, area, localizacao
3. Sem terreno? → consultar_terrenos
4. Tem dados suficientes? → gerar_planta
5. Planta aprovada? → mapa_de_quantidade (orcamento PDF)
6. Quer licenciamento? → proposta_licenciamento
7. Lead quente (>70 pts)? → Sugerir reuniao
```

---

## 5. BASE DE DADOS POSTGRESQL

### 5.1 BD Principal (N8N / Intelligence AI) - 16 tabelas

| Tabela | Rows | Funcao |
|--------|------|--------|
| leads | 49+ | Dados dos leads/clientes |
| conversas | 2746+ | Historico de conversas |
| n8n_chat_memory | 966+ | Memoria do agente |
| n8n_chat_histories | 54 | Historico chats |
| precos_materiais | 230 | Materiais com precos (100% com MO) |
| composicao_itens | 175 | Itens das composicoes |
| composicoes | 34 | Composicoes de construcao (100% com caderno encargos) |
| orcamentos_base | 107 | Orcamentos de referencia |
| terrenos | 68 | Terrenos disponiveis |
| custos_base | 12 | Custos de referencia |
| plantas_geradas | 7 | Plantas 2D geradas |
| stats_diarias | 7 | Estatisticas diarias |
| terrenos_projeto_aprovado | 5 | Terrenos com projecto |
| orcamentos | 0 | Orcamentos gerados (tabela nova) |
| historico_precos | 0 | Historico de precos |
| leads_quentes | 0 | View leads quentes |

**Precos Materiais (230 activos):**

| Categoria | Itens | Media Preco |
|-----------|-------|-------------|
| Acabamentos | 37 | 159.61 EUR |
| AVAC | 11 | 2162.73 EUR |
| Caixilharias e Portas | 22 | 697.05 EUR |
| Cobertura | 15 | 33.70 EUR |
| Electrica | 25 | 200.69 EUR |
| Estaleiro | 10 | 872.00 EUR |
| Estrutura LSF | 2 | 117.50 EUR |
| Exterior | 8 | 898.88 EUR |
| Fixacoes | 6 | 2.26 EUR |
| Fundacoes | 11 | 67.98 EUR |
| Hidraulica | 34 | 387.28 EUR |
| Impermeabilizacao | 7 | 12.40 EUR |
| Isolamento | 14 | 25.09 EUR |
| Movimentos Terra | 9 | 18.89 EUR |
| Perfis LSF | 8 | 5.31 EUR |
| Revestimentos | 11 | 28.46 EUR |

**34 Composicoes com Caderno de Encargos:**

| Categoria | Composicoes | Niveis |
|-----------|-------------|--------|
| Paredes Exteriores | COMP-PAR-EXT-BASE/MEDIA/PREM | Base, Media, Premium |
| Paredes Interiores | COMP-PAR-INT-BASE/MEDIA/PREM + COMP-PAR-WC | Base, Media, Premium + WC |
| Cobertura | COMP-COB-BASE/MEDIA/PREM | Base, Media, Premium |
| Fundacoes | COMP-FUN-SAPATA + COMP-FUN-LAJE | Unico |
| WC | COMP-WC-BASE/MEDIA/PREM | Base, Media, Premium |
| Cozinha | COMP-COZ-BASE/MEDIA/PREM | Base, Media, Premium |
| Pavimento | COMP-PAV-BASE/MEDIA/PREM | Base, Media, Premium |
| Pintura | COMP-PINT-INT + COMP-PINT-EXT | Interior, Exterior |
| Electrica | COMP-ELEC-DIV + COMP-ELEC-QUAD + COMP-ITED | Por divisao, Quadro, ITED |
| Hidraulica | COMP-HID-WC + COMP-AGUA-REDE + COMP-ESGO-REDE + COMP-DREN-PLUV | Por WC + Redes gerais |
| Impermeabilizacao | COMP-IMP-FUND + COMP-IMP-WC | Fundacoes, WC |
| Outros | COMP-PREP-TERRENO + COMP-ESTALEIRO | Unico |

### 5.2 BD CASAS LSF (Website) - tabela artigos

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | PK |
| titulo | String | Titulo do artigo |
| slug | String | URL slug (unique) |
| resumo | Text | Resumo/excerpt |
| conteudo_html | Text | Conteudo HTML completo |
| categoria | String | Uma das 14 categorias SEO |
| tags | JSON | Array de tags |
| meta_title | String(60) | Titulo SEO optimizado |
| meta_description | String(155) | Descricao SEO optimizada |
| imagem_destaque | String | URL imagem capa |
| status | String | publicado/rascunho |
| published_at | DateTime | Data publicacao |
| faq_json | JSON | 4-6 FAQs por artigo **[NOVO]** |
| search_intent | String(20) | informacional/comercial/transacional **[NOVO]** |
| internal_links_json | JSON | Links internos **[NOVO]** |
| pillar_slug | String(255) | Slug artigo pilar **[NOVO]** |
| read_time_minutes | Integer | Tempo leitura **[NOVO]** |
| updated_at | DateTime | Data actualizacao **[NOVO]** |

---

## 6. APIs INTEGRADAS (8)

| # | API | Funcao | Estado |
|---|-----|--------|--------|
| 1 | Evolution API | WhatsApp send/receive (texto + imagens) | ACTIVO |
| 2 | OpenAI GPT-4o | Motor AI do agente principal | ACTIVO |
| 3 | Gemini 2.5 Flash | Geracao de plantas 2D | ACTIVO |
| 4 | Gemini 2.0 Flash | Vision API (extrair quantitativos) | ACTIVO |
| 5 | Google Drive API | Upload plantas e PDFs | ACTIVO |
| 6 | html2pdf.app | Conversao HTML para PDF (orcamento + proposta) | ACTIVO |
| 7 | Firecrawl SDK | Web scraping terrenos/materiais | ACTIVO |
| 8 | Telegram Bot | Notificacoes para equipa humana | ACTIVO |

**URLs e Credenciais:**

| Servico | URL/Dados |
|---------|-----------|
| N8N | https://n8n.lsfbuilderpro.com |
| Evolution API | https://evo.lsfbuilderpro.com |
| Evolution Instance | QUALIFICADOR WHATSAPP |
| WhatsApp | +351 930 423 456 |
| BD PostgreSQL | 76.13.15.128:5432 |
| Postgres Credentials (N8N) | ID: hr2XLhfZOgMPj2jX |
| Frontend | https://casas-lsf-frontend.dy3pb5.easypanel.host |
| Backend API | https://casas-lsf-backend.dy3pb5.easypanel.host |
| Dominio | https://casaslsf.com |
| GitHub | https://github.com/flavianosouza/casas_lsf.git |

---

## 7. AGENT SYSTEM PROMPT (v5.1 - 7644 chars)

**Seccoes do prompt:**
1. IDENTIDADE - Consultor Experiente LSF Portugal (PT-PT)
2. PERSONALIDADE - Amigavel, consultivo, tecnico mas simples
3. REGRAS DE OURO - Nunca listas de perguntas, contextualizar, responder primeiro
4. CONHECIMENTO LSF - Precos, tempos, seguranca, financiamento
5. APRESENTACAO DE SERVICOS - 6 servicos que o agente apresenta quando perguntado
6. FERRAMENTAS (5) - Instrucoes de uso natural com triggers
7. FLUXO IDEAL - 7 passos do lead ao fecho
8. PONTUACAO - Sistema mental FRIO/MORNO/QUENTE (0-100)
9. DADOS A EXTRAIR - 17+ campos
10. SAIDA ESTRUTURADA - JSON dados_extraidos obrigatorio

---

## 8. PIPELINE COMPLETA DO SISTEMA

```
                    ENTRADA
                       |
        +--------------+--------------+--------------+
        |              |              |              |
    WhatsApp       Blog/SEO       Exit Intent     Estudo Tecnico
    (+351 930      222 artigos    Modal lead       Formulario N8N
     423 456)      14 categorias  capture          7 campos
        |              |              |              |
        |         casaslsf.com   POST /api/leads  POST /api/gerar-estudo
        |              |              |              |
        +--------------+--------------+--------------+
                       |
              Webhook N8N + Filtro Mensagens
              (fromMe, event, grupos, vazio)
                       |
         +-------------+-------------+
         |    AI Agent (GPT-4o)      |
         |  Felipe Cardoso v5.1     |
         |  System Prompt 7644ch    |
         |  Postgres Chat Memory    |
         +-------------+-------------+
                       |
    +-----+------+-----+-------+---------+
    |     |      |     |       |         |
  Orc.  Terr.  Planta Orc.   Proposta  Resposta
  Rapido (BD)   2D    Detalhado Licenc.  Texto
    |     |      |     |       |         |
    |     |   Gemini  Gemini   html2pdf  |
    |     |   2.5     Vision   .app      |
    |     |   Flash   2.0     Google     |
    |     |      |   html2pdf  Drive     |
    |     |   Google  .app       |       |
    |     |   Drive  Google      |       |
    |     |      |   Drive       |       |
    +-----+------+-----+-------+---------+
                       |
                  WhatsApp
               (Evolution API)
                       |
                    CLIENTE
                       |
              Follow-up Automatico
              (24h → 48h → 72h)
              Horario: 09-18h Seg-Sex
              Max 3 por lead
```

---

## 9. SCRIPTS EXECUTADOS (Historico)

### Scripts de WordPress Migration
| Script | Funcao | Resultado |
|--------|--------|-----------|
| `extract_wp_posts.py` | Extrair posts do SQL dump WP | 212 posts extraidos |
| `import_wp_to_api.py` | Importar para API CASAS LSF | 212 artigos criados |
| `recategorize_seo.py` | Recategorizar com dados GSC | 14 categorias SEO |

### Scripts SEO Bulk
| Script | Funcao | Resultado |
|--------|--------|-----------|
| `migrate_seo_fields.py` | Adicionar 6 campos SEO | 6 colunas criadas |
| `seo_bulk_update.py` | Classificar intent + meta + FAQs | 221/222 actualizados |
| `seo_content_enhance.py` | Otimizar HTML (H1→H2, lazy, alt) | 127/222 otimizados |

### Scripts N8N Fix
| Script | Funcao | Resultado |
|--------|--------|-----------|
| `fix_n8n_workflows.py` | Fix follow-up loop + agente | 2 workflows corrigidos |

### Scripts BD
| Script | Funcao | Resultado |
|--------|--------|-----------|
| `populate_composicoes.py` | Popular 26 composicoes | 26 criadas |
| `populate_composicoes_v2.py` | Completar composicoes | 34 total |
| `add_caderno_encargos.py` | Textos tecnicos CYPE | 34 descricoes |
| `update_mao_obra_lisboa.py` | Precos MO Lisboa | 113 itens actualizados |
| `normalize_categories.py` | Normalizar categorias | 31→16 |

### Scripts Deploy N8N
| Script | Funcao | Resultado |
|--------|--------|-----------|
| `deploy_orcamentista.py` | Pipeline orcamento 11 nodes | Deployed |
| `deploy_orcamento_v2.py` | Upgrade 9→13 categorias | Deployed |
| `deploy_caderno_encargos.py` | Caderno no PDF | Deployed |
| `deploy_followup_automatico.py` | Follow-up automatico | Deployed |
| `integrar_proposta_licenciamento.py` | Sub-workflow proposta | Deployed |
| `integrar_3pdfs.py` | 3 PDFs integrados | Deployed |
| `migrate_to_tools_agent.py` | Migrar para tools | Deployed |

---

## 10. PROGRESSO E STATUS

| Componente | Status | Notas |
|------------|--------|-------|
| **N8N / Intelligence AI** | | |
| Chatbot WhatsApp | FUNCIONANDO | GPT-4o, 5 tools, filtro mensagens |
| Agent GPT-4o + Prompt v5.1 | FUNCIONANDO | 7644 chars, 5 tools |
| Tool #1: Orcamento Rapido | FUNCIONANDO | Code inline |
| Tool #2: Consultar Terrenos | FUNCIONANDO | 68 terrenos |
| Tool #3: Gerar Planta 2D | FUNCIONANDO | Gemini 2.5 Flash, 20 nodes |
| Tool #4: Orcamento Detalhado | FUNCIONANDO | 13 cats, caderno encargos |
| Tool #5: Proposta Licenciamento | FUNCIONANDO | PDF premium, 13 especialidades |
| Follow-up Automatico | CORRIGIDO 16/02 | Horario comercial, max 3, dedup |
| Filtro Mensagens WhatsApp | CORRIGIDO 16/02 | fromMe, event, grupo, broadcast |
| Precos Dinamicos BD | FUNCIONANDO | 230 materiais, 100% com MO |
| Caderno de Encargos | FUNCIONANDO | 34/34 descricoes tecnicas |
| PDF Profissional | FUNCIONANDO | html2pdf.app |
| Google Drive | FUNCIONANDO | Plantas + PDFs |
| WhatsApp Imagens | FUNCIONANDO | Evolution API sendMedia |
| PostgreSQL (16 tabelas) | FUNCIONANDO | 2746 conversas, 49+ leads |
| MCP Server (5 tools) | FUNCIONANDO | server.js |
| Visual Hook Automatico | FUNCIONANDO | Cron + planta auto |
| **Website CASAS LSF** | | |
| Frontend Next.js 16 | FUNCIONANDO | App Router, ISR, Tailwind v4 |
| Backend FastAPI | FUNCIONANDO | Async SQLAlchemy, PostgreSQL |
| Blog 222 artigos | FUNCIONANDO | 14 categorias, ISR 300s |
| 7 Paginas SEO autoridade | FUNCIONANDO | JSON-LD, FAQs, CTAs |
| Breadcrumbs | FUNCIONANDO | Em todos os artigos |
| FAQ Accordion | FUNCIONANDO | details/summary sem JS |
| InlineCta | FUNCIONANDO | Apos 2o paragrafo |
| WhatsApp CTA | FUNCIONANDO | wa.me contextual |
| AuthorSection E-E-A-T | FUNCIONANDO | IMPIC, experiencia |
| RelatedArticles | FUNCIONANDO | API + componente |
| GerarEstudoButton | FUNCIONANDO | N8N webhook + lead BD |
| ExitIntentCapture | FUNCIONANDO | Modal + sessionStorage |
| Sitemap dinamico | FUNCIONANDO | 14 estaticas + 222 artigos |
| Middleware redirects | FUNCIONANDO | 15 rotas + 301 WP + 3 blog slug redirects |
| JSON-LD schemas | FUNCIONANDO | 6 tipos implementados |
| SEO bulk update | EXECUTADO | 221/222 artigos |
| SEO Fase 4 meta CTR | EXECUTADO | 5 artigos top otimizados |
| SEO Fase 4 redirects | EXECUTADO | 3 slugs 404→301 (200K+ imp) |
| SEO Fase 4 keywords | EXECUTADO | 6 paginas + 2025→2026 |
| Content enhancement | EXECUTADO | 127/222 artigos |
| Deploy EasyPanel | FUNCIONANDO | Auto-deploy GitHub push |

**PROGRESSO TOTAL: 100%**

---

## 11. CORRECOES APLICADAS

### 17/02/2026 - SEO Fase 4 (Otimizacao GSC + Redirects)

**301 Redirects Blog Slugs (3 URLs com 200K+ impressoes combinadas que davam 404):**
- `telhados-e-coberturas-preco-m2-portugal` → `telhados-e-coberturas-precos` (67K imp)
- `casas-modulares-t3-portugal-precos` → `casas-modulares-portugal-chave-na-mao` (94K imp)
- `manta-termica-telhado-preco-m2` → `descubra-tudo-sobre-isolamento-termico-melhores-materiais-e-instalacao` (40K imp)
- Implementado em middleware.ts (BLOG_SLUG_REDIRECTS map + logica antes de SKIP_PREFIXES)
- Root catch-all tambem corrigido para evitar double 301

**Meta Titles/Descriptions Otimizados para CTR (5 artigos top, via PUT API):**
- tecto-falso-pladur-preco-m2 → "Teto Falso Pladur: Preco por m2 em 2026 [Tabela Atualizada]"
- telhados-e-coberturas-precos → "Telhados e Coberturas: Precos por m2 em 2026 [Guia Completo]"
- pavilhoes-pre-fabricados-preco-m2 → "Pavilhoes Pre-Fabricados: Preco m2 em 2026 [Tabela Completa]"
- casas-modulares-portugal-chave-na-mao → "Casas Modulares T3 Portugal: Precos Chave na Mao 2026"
- isolamento-termico → "Isolamento Termico: 10 Melhores Materiais e Precos 2026"

**Keywords Meta Adicionadas a 6 Paginas Estaticas:**
- /, /plantas, /simulador, /custos, /metodos, /como-funciona

**Referencias 2025→2026 Atualizadas (12 ocorrencias):**
- /casa-lsf-financiamento (6x)
- /quanto-custa-casa-lsf (2x)
- /preco-construcao-lsf-por-m2 (4x)

**Cloudflare R2 Configurado:**
- Credenciais adicionadas ao mcp-tools/.env (token, access key, secret, endpoints EU+US)

**Anchor URLs (#Casas_lsf):**
- Investigado: canonicals ja estavam corretos (sem fragment). Sem accao adicional.

**Deploy:** Git push → GitHub → EasyPanel auto-deploy

---

### 16/02/2026 - Fix N8N Workflows + SEO Completo

**N8N Follow-up (EWgbilxrkoE0dszE):**
- **FIX CRITICO:** Removido `ultima_interacao = NOW()` no UPDATE (CAUSA DO LOOP INFINITO)
- **FIX:** Adicionado horario comercial 09-18h Seg-Sex (Europe/Lisbon) na SQL
- **FIX:** Adicionado max 3 follow-ups por lead (contagem em observacoes)
- **FIX:** Adicionado tier deduplication no Code node (24h/48h/72h)
- **FIX:** Double-check horario em JavaScript (belt + suspenders)
- **FIX:** Reduzido de 10 para 5 msgs por execucao

**N8N Agente WhatsApp (GcLmgtWBpqtApjR7):**
- **FIX CRITICO:** Adicionado node "Filtro Mensagens" (Code) entre Webhook e Agent
- **FIX:** Filtro `event === 'messages.upsert'` (ignorava receipts/status)
- **FIX:** Filtro `fromMe === false` (evita echo loop do bot)
- **FIX:** Filtro grupos (`@g.us`) e broadcasts (`status@broadcast`)
- **FIX:** Filtro mensagens vazias/sem texto
- **FIX:** `responseMode` alterado de `lastNode` para `responseHeaders` (200 OK imediato)
- **FIX:** Conexoes: Webhook → Filtro → Felipe Cardoso (antes: Webhook → Felipe directo)

### 15/02/2026 - SEO Fases 1-3 + Conversao

**SEO Fase 1 - Base Tecnica:**
- Migracao BD: 6 novos campos SEO (faq_json, search_intent, etc.)
- JSON-LD: Organization, LocalBusiness, Article, BreadcrumbList, FAQPage
- 8 novos componentes: Breadcrumbs, FaqSection, InlineCta, WhatsAppCta, AuthorSection, GerarEstudoButton, ExitIntentCapture, RelatedArticles
- Middleware actualizado com 7 novas rotas
- Bulk update: 221/222 artigos com intent, meta, FAQs, read_time

**SEO Fase 2 - Autoridade E-E-A-T:**
- 7 paginas SEO autoridade criadas (sobre-obrasnet, metodologia, processo, preco-m2, quanto-custa, financiamento, empresa-pt)
- RelatedArticles componente + endpoint API `GET /api/artigos/related/{slug}`
- Footer expandido para 5 colunas com links novas paginas
- Sitemap actualizado com 14 paginas estaticas
- **Commit:** `9cde69c` - 12 files changed, 1814 insertions

**SEO Fase 3 - Conversao:**
- GerarEstudoButton: formulario 7 campos → N8N webhook → lead BD
- ExitIntentCapture: modal exit intent → lead BD com origem="exit_intent"
- Backend `/api/gerar-estudo`: salva lead + envia N8N + trigger WhatsApp
- Content enhancement: 127 artigos otimizados (H1→H2, lazy loading, alt text, relative links)
- **Commit:** `8589bf7` - 5 files changed, 545 insertions

**WordPress Migration:**
- 212 posts importados do dump SQL WordPress
- 14 categorias SEO criadas baseadas em dados Google Search Console
- Redirects 301 configurados no middleware
- Fusion Builder shortcodes limpos do HTML
- 10 artigos seed originais mantidos

### 15/02/2026 - Auditoria v4 + Fixes Criticos

- **FIX CRITICO:** Tool Proposta Licenciamento ligada ao agente (faltava connection ai_tool)
- **FIX:** 113 materiais com MO=0 actualizados com precos Lisboa
- **FIX:** WhatsApp agent (promptType: define + model gpt-4o)
- **NOVO:** Sub-workflow Proposta Licenciamento (JLDnddV05BepDVjw) - 7 nodes
- **NOVO:** Seccao APRESENTACAO DE SERVICOS no prompt (6 servicos)
- **NOVO:** Design premium Entidade Proponente (gradient card)
- **FIX:** Margens PDF proposta (top:5, bottom:15)
- **FIX:** Telefone corrigido (+351 930 423 456)
- **FIX:** Removido "Modular" do subtitulo empresa
- **FIX:** Fluxo ideal step 6 duplicado -> 6 e 7
- Prompt actualizado para v5.1 (7644 chars)
- BD: 34 composicoes, 230 materiais (100% MO), 34 descricoes tecnicas

### 14/02/2026 - Auditoria v3
- Auditoria total de todos os ficheiros do projeto

### 13/02/2026 - Orcamentista v3 + Caderno Encargos
- Deploy pipeline orcamentista completa
- Upgrade 9→13 categorias
- Caderno de encargos integrado no PDF

### 11/02/2026 - Geracao de Plantas
- Sub-workflow "Gerar Planta LSF" reconstruido (5→18→20 nodes)
- Motor: Gemini 2.5 Flash

### 10/02/2026 - Auditoria Inicial
- Mapeamento de 24 workflows

---

## 12. DADOS DA EMPRESA

| Campo | Valor |
|-------|-------|
| Denominacao | OBRASNET UNIP LDA |
| NIF | 515 866 989 |
| Alvara IMPIC | 94665 - PAR |
| Sede | R. Abade Faria 18, 1.o Dto - 2725-475 Mem Martins, Sintra |
| Concelho/Distrito | Sintra / Lisboa |
| Website | www.casaslsf.com |
| Email | orcamento@casaslsf.com |
| Telefone | +351 930 423 456 |

---

## 13. COMMITS GIT (CASAS LSF)

| Hash | Data | Descricao | Ficheiros |
|------|------|-----------|-----------|
| `latest` | 17/02/2026 | SEO Fase 4: 301 redirects blog slugs, meta CTR, keywords, 2025→2026 | 10+ files |
| `9cde69c` | 15/02/2026 | SEO Fase 2: 7 paginas autoridade, RelatedArticles, Footer, linkagem interna | 12 files, +1814 |
| `8589bf7` | 15/02/2026 | SEO Fase 3: Gerar Estudo Tecnico (N8N), Exit Intent, conversao | 5 files, +545 |

---

**Ultima atualizacao:** 2026-02-24
**Responsavel:** Auditoria automatizada do sistema
**Status:** OPERACIONAL COM BUGS CRITICOS NO ORCAMENTISTA

---

## 14. ATUALIZACAO 2026-02-24 - Sessao de Debug + Configuracao

### 14.1 Teste Orcamentista - BUGS CRITICOS ENCONTRADOS

**Workflow:** `LSF Orcamentista Native` (ID: `eV1txGMzmqOnuWyO`)
**Status:** ERRO REPETIDO em todas as execucoes recentes

#### BUG 1 - Multiplicacao de Items (CRITICO)

O node `Buscar Precos DB` retorna **81 linhas** (uma por material/preco). No n8n cada linha vira um item separado que flui independentemente pelo pipeline:

| Node | Items |
|------|-------|
| Buscar Planta do Lead | 1 |
| Gemini Vision | 1 |
| Buscar Precos DB | **81** |
| Calcular Orcamento | **81** (duplicados) |
| Gravar no BD | **81** (duplicados no banco) |
| Gerar HTML | **81** |
| Gerar PDF | **81 requests simultaneos** |

**Resultado:** O html2pdf.app tem limite de 8 conversoes paralelas. 81 requests = `403 Forbidden - Parallel conversions limit '8' reached`.

**Correcao necessaria:** Agregar os 81 precos num unico item antes do `Calcular Orcamento`:
```sql
SELECT json_agg(row_to_json(t)) as precos FROM (...query existente...) t
```

#### BUG 2 - Timeout Gemini Vision

| Campo | Valor |
|-------|-------|
| Node | Gemini Vision - Extrair Quantitativos |
| Erro | `ECONNABORTED` - connection aborted |
| Timeout | 60s (insuficiente para imagens grandes) |

**Correcao:** Aumentar timeout para 120s + adicionar `onError: continueErrorOutput`.

#### BUG 3 - Dados Duplicados no BD

Cada execucao que passa do `Gravar Orcamento no BD` insere **81 linhas duplicadas** na tabela `orcamentos`. Necessario cleanup apos correcao.

### 14.2 Retry + Fallback no Gerar PDF (PARCIALMENTE CORRIGIDO)

O node `Gerar PDF` ja tem:
- `onError: continueErrorOutput` (fallback para "Retornar Sem PDF")
- Retry: 3 tentativas com 5s espera

Mas nao resolve o problema raiz (81 requests simultaneos).

### 14.3 Google Tag Manager - CONFIGURADO

**GTM ID:** `GTM-N8CH63PC`
**Ficheiro:** `scripts/deploy/deploy_chat_admin.py`

Adicionados os 2 snippets GTM standard:
- Head snippet (JavaScript) entre `</style>` e `</head>`
- Noscript fallback apos `<body>`

**Status:** Configurado localmente, falta deploy (`python scripts/deploy/deploy_chat_admin.py`)

### 14.4 Configuracao Email

| Servico | Status |
|---------|--------|
| Resend API | Configurado (API key no .env) |
| Gmail/SMTP/IMAP | NAO configurado |
| Canal email no n8n | NAO existe |
| Email admin | flavianogesso@gmail.com |
| Email empresa | orcamento@casaslsf.com |

Canal principal continua a ser **WhatsApp** (Evolution API).

### 14.5 Leads com Plantas Geradas

| Lead | Telefone | Tipologia | Tamanho | Versoes |
|------|----------|-----------|---------|---------|
| Admin Dashboard | admin-web | T4 | - | 12 |
| Fabiola | 351930423470 | T3 | 180m2 | 2 |
| Nathan Lopes | 5514991737789 | - | - | 1 |
| Obrasnet | 351930423456 | - | - | 22 |

### 14.6 Execucoes N8N Recentes

| ID | Workflow | Status | Duracao |
|----|----------|--------|---------|
| 30089 | Qualificador (teste) | SUCCESS | 0s (webhook ack) |
| 30088 | Sub-workflow | SUCCESS | 1.4s |
| 30085 | **Orcamentista** | **ERROR** | 17.7s |
| 30083 | **Orcamentista** | **ERROR** | 19.8s |
| 30081 | **Orcamentista** | **ERROR** | 17.1s |
| 30078 | **Orcamentista** | **ERROR** | 60.3s (timeout Gemini) |

### 14.7 Proximos Passos

1. **URGENTE:** Corrigir multiplicacao de items no orcamentista (agregar precos em 1 item)
2. **URGENTE:** Aumentar timeout Gemini Vision para 120s
3. **URGENTE:** Limpar dados duplicados na tabela orcamentos
4. Deploy GTM no chat-admin (`python scripts/deploy/deploy_chat_admin.py`)
5. Testar mapa de quantidade end-to-end apos correcoes
6. Testar integracao WhatsApp
7. Planear canal Gmail/email
