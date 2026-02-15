# CASAS LSF - Plano de Evolucao

## Visao Geral

Transformar o portal CASAS LSF numa maquina de captacao de leads organicos,
integrada com o sistema LSF Intelligence (WhatsApp/n8n) para tratamento automatico.

**Objectivo**: Lead chega pelo Google -> Le artigo no blog -> Simula no portal ->
Recebe contacto automatico por WhatsApp pelo agente Felipe Cardoso.

---

## Estado Actual

### O que existe:
- Frontend Next.js com 7 paginas (homepage, simulador, plantas, custos, metodos, como-funciona, blog)
- Backend FastAPI com 2 endpoints (POST/GET leads)
- Simulador multi-step funcional (captura nome, email, telefone, tipologia, area)
- Deploy via EasyPanel + Docker + GitHub (flavianosouza/casas_lsf)
- Schema SQL com tabelas: leads, materiais_catalogo, plantas, orcamentos, artigos

### O que falta:
- Blog e ESTATICO (3 artigos hardcoded, sem CMS, sem paginas individuais)
- Sem SEO (sem meta tags dinamicos, sem sitemap, sem schema markup)
- Sem integracao portal <-> WhatsApp (leads ficam na BD do portal e ninguem os contacta)
- Sem dashboard admin (nao ha forma de gerir leads, artigos ou ver estatisticas)
- Sem footer profissional nem paginas legais

---

## Fases de Implementacao

### FASE 1 - Blog Dinamico + SEO (Prioridade Maxima)
**Objectivo**: Gerar trafego organico no Google

#### 1.1 Backend - API de Artigos
- Criar modelo `Artigo` no SQLAlchemy (tabela `artigos` ja existe no schema)
- Endpoints:
  - `GET /api/artigos/` - listar artigos publicados (paginado)
  - `GET /api/artigos/{slug}` - artigo individual por slug
  - `POST /api/artigos/` - criar artigo (admin)
  - `PUT /api/artigos/{id}` - editar artigo (admin)
- Campos: titulo, slug, conteudo_html, resumo, categoria, tags, imagem_destaque_url, status, published_at

#### 1.2 Frontend - Paginas de Blog
- `/blog` - lista de artigos com paginacao, filtro por categoria
- `/blog/[slug]` - pagina individual do artigo (SSR para SEO)
- Categorias: Construcao LSF, Financiamento, Terrenos, Dicas, Noticias
- Componente de artigos relacionados
- CTA no final de cada artigo ("Simule a sua casa gratuitamente")

#### 1.3 SEO Tecnico
- Meta tags dinamicos por pagina (title, description, og:image)
- `sitemap.xml` automatico (todas as paginas + artigos)
- `robots.txt` configurado
- Schema markup JSON-LD (Organization, Article, FAQPage)
- URLs amigaveis (`/blog/lsf-vs-alvenaria-portugal`)
- Canonical URLs

#### 1.4 Conteudo Inicial - 10 Artigos SEO
Artigos optimizados para keywords com volume de pesquisa em Portugal:
1. "Casas LSF em Portugal: Guia Completo 2026"
2. "Quanto custa construir uma casa LSF em Portugal"
3. "LSF vs Alvenaria: Qual escolher em Portugal"
4. "Como financiar construcao de casa LSF"
5. "Vantagens e desvantagens de casas em aco leve"
6. "Tempo de construcao de uma casa LSF"
7. "Casas LSF sao seguras? Sismos, vento e fogo"
8. "Terrenos para construcao em Lisboa e Sintra"
9. "Projecto de arquitectura para casa LSF: o que precisa"
10. "Licenciamento de construcao em Portugal: passo a passo"

---

### FASE 2 - Integracao Portal <-> WhatsApp
**Objectivo**: Lead do portal e contactado automaticamente pelo agente

#### 2.1 Webhook no Backend
- Quando um lead e criado via `/api/leads/`, disparar webhook para n8n
- Webhook envia: nome, telefone, tipologia, area, localizacao
- n8n recebe e acciona o agente Felipe Cardoso por WhatsApp
- Mensagem inicial: "Ola [nome]! Vi que fez uma simulacao no nosso site para uma [tipologia] de [area]m2. Sou o Felipe, consultor da OBRASNET. Posso ajuda-lo com o projecto?"

#### 2.2 Workflow n8n - Receptor Portal
- Novo workflow: "LSF - Lead Portal Web"
- Webhook trigger (POST)
- Envia mensagem WhatsApp via Evolution API
- Insere/actualiza lead na BD principal (76.13.15.128)
- Marca origem como "portal_organico"

#### 2.3 Sync de Leads
- Opcao A: Portal envia leads para a BD principal (recomendado)
- Opcao B: Ambas as BDs, com sync periodico
- Campo `origem` distingue: "portal_organico" vs "whatsapp_directo"

---

### FASE 3 - Dashboard Admin
**Objectivo**: Gerir leads, artigos e ver estatisticas

#### 3.1 Backend - Endpoints Admin
- `GET /api/admin/stats` - estatisticas (total leads, por status, por origem, conversao)
- `GET /api/admin/leads` - lista completa com filtros
- `PUT /api/admin/leads/{id}` - actualizar status do lead
- Auth basica com token/password

#### 3.2 Frontend - Area Admin
- `/admin` - dashboard com cards (total leads, frios/mornos/quentes, conversao, trafego)
- `/admin/leads` - tabela de leads com filtros e accoes
- `/admin/artigos` - lista de artigos, criar/editar com editor rich text
- `/admin/artigos/novo` - formulario de criacao de artigo
- Protegido com login simples

#### 3.3 Editor de Artigos
- Editor rich text (TipTap ou similar) para escrever artigos
- Preview em tempo real
- Upload de imagens
- Campos SEO (meta title, meta description, slug)
- Publicar/despublicar

---

### FASE 4 - Optimizacoes
**Objectivo**: Melhorar performance e conversao

#### 4.1 Footer Profissional
- Dados da empresa (OBRASNET UNIP LDA, NIF, contactos)
- Links rapidos (Simulador, Blog, Custos, Contacto)
- Redes sociais
- Legal (Politica de Privacidade, Termos de Uso)

#### 4.2 Paginas Legais
- `/privacidade` - Politica de Privacidade (RGPD)
- `/termos` - Termos e Condicoes
- Cookie banner (RGPD obrigatorio)

#### 4.3 Performance
- Optimizacao de imagens (next/image, WebP)
- Core Web Vitals (LCP, FID, CLS)
- Lazy loading de componentes

#### 4.4 Analytics
- Google Analytics 4
- Google Search Console
- Eventos de conversao (simulacao, contacto)

---

## Arquitectura Final

```
                    Google (SEO)
                        |
                   [Portal Web]
                  casaslsf.com
                   Next.js 16
                  /            \
          [Blog SSR]        [Simulador]
          /artigos             |
              |            POST /api/leads
              |                |
          [FastAPI Backend]----+
          /api/artigos      /api/leads
              |                |
         [PostgreSQL]     [Webhook n8n]
         (EasyPanel)           |
              |          [n8n Workflow]
              |           "Lead Portal"
              |                |
              |        [Evolution API]
              |                |
              |          [WhatsApp]
              |           Agente Felipe
              |                |
              +-------[BD Principal]-------+
                     (76.13.15.128)
                    leads unificados
```

---

## Ordem de Execucao

| # | Tarefa | Tempo Est. | Impacto |
|---|--------|-----------|---------|
| 1 | API artigos (backend) | 1 sessao | Base para blog |
| 2 | Blog dinamico (frontend SSR) | 1 sessao | SEO + trafego |
| 3 | SEO tecnico (sitemap, meta, schema) | 1 sessao | Ranking Google |
| 4 | 10 artigos iniciais | 1 sessao | Conteudo SEO |
| 5 | Webhook lead -> n8n -> WhatsApp | 1 sessao | Conversao |
| 6 | Dashboard admin basico | 1-2 sessoes | Gestao |
| 7 | Editor artigos (CMS) | 1 sessao | Autonomia |
| 8 | Footer + paginas legais + RGPD | 1 sessao | Compliance |
| 9 | Analytics (GA4 + Search Console) | 1 sessao | Metricas |

---

## Stack Tecnologico

| Componente | Tecnologia | Justificacao |
|-----------|-----------|-------------|
| Frontend | Next.js 16 + Tailwind | SSR para SEO, ja em uso |
| Backend | FastAPI (Python) | Async, rapido, ja em uso |
| BD Portal | PostgreSQL (EasyPanel) | Ja configurado |
| BD Principal | PostgreSQL (76.13.15.128) | Leads + composicoes + materiais |
| Automacao | n8n | Workflows ja funcionais |
| WhatsApp | Evolution API | Ja integrado |
| Deploy | EasyPanel + Docker | Ja configurado |
| Repo | GitHub (flavianosouza/casas_lsf) | Ja configurado |
| SEO | Next.js SSR + metadata API | Nativo do framework |

---

## Metricas de Sucesso

| Metrica | Actual | Meta 3 meses |
|---------|--------|-------------|
| Artigos publicados | 0 (estaticos) | 20+ |
| Trafego organico/mes | 0 | 500+ visitas |
| Leads portal/mes | 0 | 30+ |
| Leads contactados auto | 0% | 100% |
| Taxa conversao simulador | N/A | 15%+ |
| Posicoes Google top 10 | 0 | 5+ keywords |
