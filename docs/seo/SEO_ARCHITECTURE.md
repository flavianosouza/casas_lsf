# CASAS LSF - Arquitetura SEO Completa

> **IMPORTANTE**: Este ficheiro documenta toda a estrutura SEO do projeto casaslsf.com.
> Qualquer agente de IA que trabalhe neste projeto DEVE ler este ficheiro antes de
> fazer alteracoes que afetem SEO, routing, metadata, schema markup ou conteudo do blog.
> NAO quebrar o que ja esta implementado. Otimizar e expandir respeitando a arquitetura.

---

## 1. VISAO GERAL DO PROJETO

**Dominio:** https://casaslsf.com
**Empresa:** OBRASNET UNIP LDA (NIF: 515866989, Alvara IMPIC 94665)
**Nicho:** Construcao LSF (Light Steel Framing) em Portugal
**Objetivo:** Dominar o SEO nacional para construcao LSF, gerar trafego organico e converter leads via WhatsApp/Simulador

### Stack Tecnico
- **Frontend:** Next.js 16 (App Router) com Turbopack
- **Backend:** FastAPI + PostgreSQL
- **Automacao:** n8n (32 workflows)
- **Imagens:** Cloudflare R2
- **Deploy:** EasyPanel (standalone output)
- **CDN/DNS:** Cloudflare

### Metricas Atuais (Fev 2026 - Google Search Console)
- **Cliques:** 1.72 mil/28 dias (+24%)
- **Impressoes:** 94 mil/28 dias (+25%)
- **Cliques (6 meses):** 13,389
- **Impressoes (6 meses):** 833,135
- **CTR medio:** 1.61% (BAIXO - oportunidade de melhoria)
- **Paginas com dados:** 889
- **Queries com dados:** 1000+
- **Artigos migrados:** 222 (do WordPress antigo)
- **Paginas estaticas:** 14 paginas otimizadas

---

## 2. ESTRUTURA DE URLs

### Hierarquia de URLs

```
casaslsf.com/                              # Home (prioridade 1.0)
casaslsf.com/simulador                     # Simulador de custos - PAGINA DE CONVERSAO
casaslsf.com/plantas                       # Plantas de casas
casaslsf.com/custos                        # Transparencia nos custos
casaslsf.com/metodos                       # Metodo construtivo
casaslsf.com/como-funciona                 # Como funciona o LSF
casaslsf.com/blog                          # Listagem do blog
casaslsf.com/blog/{slug}                   # Artigo individual
casaslsf.com/sobre-obrasnet                # Sobre a empresa
casaslsf.com/metodologia-construtiva       # Guia tecnico metodologia
casaslsf.com/processo-construcao-lsf       # Processo de construcao
casaslsf.com/preco-construcao-lsf-por-m2   # Precos por m2 - PAGINA PILAR
casaslsf.com/quanto-custa-casa-lsf         # Quanto custa - PAGINA PILAR
casaslsf.com/casa-lsf-financiamento        # Financiamento
casaslsf.com/empresa-construcao-lsf-portugal # Pagina da empresa
casaslsf.com/privacidade                   # Privacidade
casaslsf.com/termos                        # Termos
```

### Top 15 URLs por Trafego (GSC - 6 meses, Ago 2025 - Fev 2026)

| # | URL | Cliques | Impressoes | CTR | Posicao |
|---|-----|---------|------------|-----|---------|
| 1 | `/` (home) | 2,191 | 49,218 | 4.45% | 7.87 |
| 2 | `/pavilhoes-pre-fabricados-preco-m2/` | 1,384 | 23,654 | 5.85% | 8.64 |
| 3 | `/precos-m2/` | 797 | 30,838 | 2.58% | 10.64 |
| 4 | `/telhados-e-coberturas-precos/` | 596 | 46,278 | 1.29% | 6.17 |
| 5 | `/portfolio/casas-modulares-t3-...75-m2/` | 594 | 37,523 | 1.58% | 9.47 |
| 6 | `/15-problemas-...-lsf/` | 475 | 6,946 | 6.84% | 6.80 |
| 7 | `/garagens-modulares-e-pre-fabricadas-precos/` | 376 | 9,044 | 4.16% | 7.41 |
| 8 | `/icf-preco-m2-...construir/` | 373 | 16,673 | 2.24% | 5.09 |
| 9 | `/tecto-falso-pladur-preco-m2/` | 362 | 49,745 | 0.73% | 8.98 |
| 10 | `/quanto-custa-um-telhado-de-100m2.../` | 343 | 34,085 | 1.01% | 7.09 |
| 11 | `/produto/moradia-t1-em-aco-leve-lisboa/` | 341 | 6,736 | 5.06% | 7.81 |
| 12 | `/diferenca-entre-moradia-geminada-e-em-banda/` | 329 | 12,189 | 2.70% | 5.18 |
| 13 | `/portfolio/vivenda-t4-em-lsf-com-170m2/` | 316 | 6,566 | 4.81% | 5.37 |
| 14 | `/casas-amoviveis-chave-na-mao/` | 270 | 9,529 | 2.83% | 7.79 |
| 15 | `/como-construir-um-anexo-no-seu-quintal/` | 262 | 8,653 | 3.03% | 5.18 |

### Top 20 Queries (GSC - 6 meses)

| # | Query | Cliques | Impressoes | CTR | Posicao |
|---|-------|---------|------------|-----|---------|
| 1 | casas lsf | 221 | 4,350 | 5.08% | 4.94 |
| 2 | casas lsf chave na mao preco | 220 | 2,809 | 7.83% | 4.30 |
| 3 | casas lsf precos t3 | 175 | 3,501 | 5.00% | 7.70 |
| 4 | casas aco leve precos chave na mao | 139 | 2,071 | 6.71% | 5.70 |
| 5 | icf preco m2 | 133 | 5,334 | 2.49% | 3.44 |
| 6 | casas lsf preco m2 | 128 | 3,088 | 4.15% | 8.18 |
| 7 | casas modulares t3 chave na mao | 121 | 1,792 | 6.75% | 1.77 |
| 8 | casas em aco leve preco m2 | 120 | 2,221 | 5.40% | 4.87 |
| 9 | melhores empresas lsf portugal | 114 | 1,374 | 8.30% | 6.47 |
| 10 | casas modulares ate 50000 euros | 109 | 3,029 | 3.60% | 8.41 |
| 11 | pavilhoes pre-fabricados preco | 106 | 762 | 13.91% | 2.06 |
| 12 | casas moveis isentas de licenciamento | 105 | 2,619 | 4.01% | 4.16 |
| 13 | lsf problemas | 99 | 387 | 25.58% | 1.19 |
| 14 | armazem pre-fabricado preco | 95 | 537 | 17.69% | 2.52 |
| 15 | obrasnet | 93 | 537 | 17.32% | 3.07 |
| 16 | casas modulares precos t3 | 92 | 6,836 | 1.35% | 4.51 |
| 17 | lsf preco m2 2025 | 92 | 398 | 23.12% | 2.78 |
| 18 | casas modulares t3 terreas | 88 | 1,573 | 5.59% | 1.31 |
| 19 | casas lsf desvantagens | 82 | 1,090 | 7.52% | 3.48 |
| 20 | preco m2 construcao pavilhao industrial | 80 | 861 | 9.29% | 4.59 |

### Queries ESTRELA (pos 1-3, CTR alto - DEFENDER)

| Query | Pos | CTR | Cliques |
|-------|-----|-----|---------|
| lsf problemas | 1.19 | 25.58% | 99 |
| casas modulares t3 terreas | 1.31 | 5.59% | 88 |
| casas modulares t3 chave na mao | 1.77 | 6.75% | 121 |
| pavilhoes pre-fabricados preco | 2.06 | 13.91% | 106 |
| armazem pre-fabricado preco | 2.52 | 17.69% | 95 |
| lsf preco m2 2025 | 2.78 | 23.12% | 92 |
| obrasnet | 3.07 | 17.32% | 93 |
| icf preco m2 | 3.44 | 2.49% | 133 |
| casas lsf desvantagens | 3.48 | 7.52% | 82 |

### QUICK WINS - Queries com impressoes altas, CTR baixo, pos 5-20 (OTIMIZAR)

| Query | Impressoes | Cliques | CTR | Pos | Acao |
|-------|------------|---------|-----|-----|------|
| pladur preco | 7,222 | 14 | 0.2% | 9.8 | Otimizar title/meta da pagina pladur |
| casas pre-fabricadas PT precos chave na mao | 4,631 | 58 | 1.2% | 10.9 | Melhorar pos + CTR |
| casas pre-fabricadas tudo incluido PT preco | 4,496 | 50 | 1.1% | 9.4 | Melhorar title/meta |
| casas pre-fabricadas betao chave mao preco | 3,060 | 32 | 1.1% | 8.1 | Criar/otimizar conteudo |
| casas modulares ate 50000 euros | 3,029 | 109 | 3.6% | 8.4 | Subir para top 5 |
| lsf preco m2 | 2,811 | 77 | 2.7% | 9.3 | Otimizar pagina pilar precos |
| preco pladur m2 instalado | 2,481 | 32 | 1.3% | 7.1 | Melhorar CTR |
| construcao aco leve preco m2 | 2,008 | 47 | 2.3% | 7.4 | Melhorar conteudo |
| casas modulares betao chave na mao | 1,785 | 28 | 1.6% | 8.0 | Criar conteudo dedicado |
| casas que nao precisam de licenca PT | 1,707 | 12 | 0.7% | 10.8 | Criar pagina dedicada |

### PAGINAS com Impressoes ALTAS mas CTR BAIXO (maior oportunidade)

| Pagina | Impressoes | Cliques | CTR | Pos | Diagnostico |
|--------|------------|---------|-----|-----|-------------|
| /tecto-falso-pladur-preco-m2/ | 49,745 | 362 | 0.73% | 9.0 | Title/meta fraco, pos ~9 |
| /telhados-e-coberturas-precos/ | 46,278 | 596 | 1.29% | 6.2 | Pos boa mas CTR mau - title! |
| /portfolio/casas-modulares-t3-...75-m2/ | 37,523 | 594 | 1.58% | 9.5 | Subir para top 5 |
| /quanto-custa-um-telhado-de-100m2.../ | 34,085 | 343 | 1.01% | 7.1 | Pos boa, CTR pessimo |
| /precos-m2/ | 30,838 | 797 | 2.58% | 10.6 | Subir posicao |
| /quanto-custa-pintar-um-apartamento.../ | 19,672 | 126 | 0.64% | 8.0 | Off-topic mas traz trafego |
| /preco-da-mao-de-obra-na-construcao.../ | 17,459 | 175 | 1.00% | 4.8 | Pos top 5! Melhorar CTR |
| /icf-preco-m2-...construir/ | 16,673 | 373 | 2.24% | 5.1 | Bom potencial |
| Anchor URLs (#Casas_lsf etc.) | 14,600+ | ~25 | ~0.1% | 7.1 | BUG: Google indexa anchors |

### Distribuicao por Dispositivo (6 meses)

| Dispositivo | Cliques | Impressoes | CTR | % Trafego |
|-------------|---------|------------|-----|-----------|
| Mobile | 9,028 | 382,134 | 2.36% | 67% |
| Desktop | 3,806 | 151,795 | 2.51% | 28% |
| Tablet | 279 | 7,911 | 3.53% | 2% |

### Distribuicao por Pais (6 meses)

| Pais | Cliques | Impressoes | CTR | Nota |
|------|---------|------------|-----|------|
| Portugal | 11,606 | 408,101 | 2.84% | Mercado principal |
| Suica | 359 | 7,929 | 4.53% | Emigrantes PT |
| Brasil | 341 | 72,722 | 0.47% | Volume alto, CTR baixissimo |
| Franca | 315 | 6,573 | 4.79% | Emigrantes PT |
| Alemanha | ~50 | ~1,500 | ~3% | Emigrantes PT |

> NOTA: As URLs do Google Search Console ainda mostram o formato antigo do WordPress
> (sem /blog/). O middleware faz redirect 301 automatico para /blog/{slug}.

### Detalhe das 3 Paginas TOP (12 meses)

**Pavilhoes Pre-fabricados** (`/pavilhoes-pre-fabricados-preco-m2/`)
- 12 meses: 2,670 cliques | 41,779 impressoes | 6.39% CTR | pos 9.46
- MELHOR pagina em CTR - domina o nicho de pavilhoes
- Top queries: "pavilhoes pre-fabricados preco" (pos 1.77!), "armazem pre-fabricado preco" (pos 2.33!)
- 69% trafego mobile

**Casas Modulares T3** (`/portfolio/casas-modulares-t3-preco-chave-na-mao-com-75-m2/`)
- 12 meses: 2,104 cliques | 94,077 impressoes | 2.24% CTR | pos 9.28
- MAIS impressoes de qualquer pagina! Mas CTR baixo
- "casas modulares t3 chave na mao" - pos 1.8 (ja #1!)
- "casas modulares precos t3" - 331 cliques, pos 4.3
- OPORTUNIDADE: subir CTR de 2.24% para 4%+ = duplicar cliques

**Telhados e Coberturas** (`/telhados-e-coberturas-precos/`)
- 12 meses: 1,115 cliques | 66,926 impressoes | 1.67% CTR | pos 9.28
- Volume ENORME de impressoes mas CTR muito baixo
- Top queries: "quanto custa um telhado de 100m2 portugal" (85 clicks)
- OPORTUNIDADE: melhorar title/meta para CTR pode triplicar cliques

---

## 3. SISTEMA DE REDIRECTS (301)

**Ficheiro:** `frontend/src/middleware.ts`

O middleware garante que TODAS as URLs antigas do WordPress continuam a funcionar:

```
REGRA GERAL (catch-all):
/{qualquer-slug}  -->  301  -->  /blog/{qualquer-slug}
  (com correcao automatica de slug antigo se mapeamento existir)

REGRAS ESPECIFICAS:
/portfolio/*      -->  301  -->  /plantas
/produto/*        -->  301  -->  /plantas
/precos-m2        -->  301  -->  /custos
/sobre            -->  301  -->  /
/contacto(s)      -->  301  -->  /simulador

BLOG SLUG REDIRECTS (slugs antigos WordPress → slugs correctos na BD):
/blog/telhados-e-coberturas-preco-m2-portugal  -->  301  -->  /blog/telhados-e-coberturas-precos
/blog/casas-modulares-t3-portugal-precos       -->  301  -->  /blog/casas-modulares-portugal-chave-na-mao
/blog/manta-termica-telhado-preco-m2           -->  301  -->  /blog/descubra-tudo-sobre-isolamento-termico-melhores-materiais-e-instalacao
```

> **NOTA (Fev 2026):** Os 3 blog slug redirects acima foram adicionados porque
> os URLs antigos tinham 200K+ impressoes combinadas no GSC mas retornavam 404
> (slugs nao existiam na BD com esses nomes).

### Rotas Protegidas (NAO sao redirecionadas)
```
APP_ROUTES: /, /simulador, /plantas, /custos, /metodos, /como-funciona,
            /blog, /privacidade, /termos, /sobre-obrasnet,
            /metodologia-construtiva, /processo-construcao-lsf,
            /preco-construcao-lsf-por-m2, /quanto-custa-casa-lsf,
            /casa-lsf-financiamento, /empresa-construcao-lsf-portugal

SKIP_PREFIXES: /_next, /api, /favicon, /robots, /sitemap, /blog/,
               /manifest, /sw., /bg-, /logo, /images, /icons
```

> **REGRA CRITICA:** Se criares uma nova pagina estatica (ex: /construcao-lsf-lisboa),
> DEVES adiciona-la ao APP_ROUTES no middleware.ts, senao sera redirecionada para /blog/!

---

## 4. METADATA E HEAD TAGS

### Layout Global (layout.tsx)
- `lang="pt-PT"` no HTML
- Title template: `%s | Casas LSF`
- Title default: `Casas LSF | Construcao em Aco Leve em Portugal`
- Meta description com keywords naturais
- Keywords array: casas LSF, Light Steel Framing, construcao aco leve, etc.
- Author/Creator: OBRASNET UNIP LDA
- Robots: index=true, follow=true
- Canonical: https://casaslsf.com

### Paginas COM Metadata Otimizado (TODAS - 100% cobertura)
- `/` (home) - title, description, keywords, OG, canonical ✅
- `/plantas` - title, description, keywords, OG, canonical ✅
- `/simulador` - title, description, keywords, OG, canonical ✅
- `/custos` - title, description, keywords, OG, canonical ✅
- `/metodos` - title, description, keywords, OG, canonical ✅
- `/como-funciona` - title, description, keywords, OG, canonical ✅
- `/blog` - Titulo e descricao dinamicos ✅
- `/blog/[slug]` - Metadata dinamico da BD (meta_title, meta_description) ✅
- `/sobre-obrasnet` - Metadata + keywords estatico ✅
- `/processo-construcao-lsf` - Metadata estatico ✅
- `/preco-construcao-lsf-por-m2` - Metadata + keywords estatico ✅
- `/quanto-custa-casa-lsf` - Metadata + keywords estatico ✅
- `/casa-lsf-financiamento` - Metadata + keywords estatico ✅
- `/empresa-construcao-lsf-portugal` - Metadata estatico ✅
- `/metodologia-construtiva` - Metadata estatico ✅

> **Corrigido na Fase 4 (Fev 2026):** As 6 paginas que nao tinham metadata
> (home, plantas, simulador, custos, metodos, como-funciona) agora tem
> title, description, keywords, OG e canonical. Keywords adicionadas a todas.

---

## 5. SCHEMA MARKUP (JSON-LD)

### Schema Global (em TODAS as paginas via layout.tsx)

**Organization:**
```json
{
  "@type": "Organization",
  "name": "OBRASNET UNIP LDA",
  "alternateName": "Casas LSF",
  "url": "https://casaslsf.com",
  "logo": "https://casaslsf.com/logo.png",
  "contactPoint": { "telephone": "+351930423456" },
  "address": { "streetAddress": "R. Abade Faria 18", "addressLocality": "Mem Martins, Sintra" },
  "taxID": "515866989"
}
```

**LocalBusiness:**
```json
{
  "@type": "LocalBusiness",
  "name": "OBRASNET UNIP LDA",
  "geo": { "latitude": 38.7935, "longitude": -9.3472 },
  "openingHours": "Mon-Fri 09:00-18:00",
  "priceRange": "$$",
  "email": "orcamento@casaslsf.com"
}
```

### Schema nos Artigos do Blog (blog/[slug]/page.tsx)

Cada artigo gera automaticamente:

1. **Article** - headline, description, wordCount, author, publisher, dates
2. **BreadcrumbList** - Home > Blog > Categoria > Artigo
3. **FAQPage** - Se o artigo tem faq_json (perguntas e respostas)

### Schema nas Paginas Estaticas

| Pagina | Schema |
|--------|--------|
| `/processo-construcao-lsf` | HowTo (6 passos, tempo: 6 meses) + FAQPage |
| `/sobre-obrasnet` | AboutPage + FAQPage |
| `/preco-construcao-lsf-por-m2` | FAQPage |
| `/quanto-custa-casa-lsf` | FAQPage |
| `/casa-lsf-financiamento` | FAQPage |
| `/empresa-construcao-lsf-portugal` | FAQPage |
| `/metodologia-construtiva` | FAQPage |

---

## 6. OPEN GRAPH E SOCIAL

### OG Global
- type: website
- locale: pt_PT
- siteName: Casas LSF
- Twitter card: summary_large_image

### OG Dinamico nos Artigos
**Ficheiro:** `blog/[slug]/opengraph-image.tsx`
- Imagem gerada dinamicamente (1200x630px)
- Inclui: titulo, resumo, categoria, tempo de leitura, branding CASAS LSF
- Renderizada no Edge Runtime

### PROBLEMA: Paginas sem OG image
- Home, Plantas, Simulador, Custos, Metodos, Como-funciona NAO tem og:image

---

## 7. SITEMAP

**Ficheiro:** `frontend/src/app/sitemap.ts`

### Prioridades

| Prioridade | Paginas |
|------------|---------|
| 1.0 | Home |
| 0.9 | Simulador, Preco por m2, Quanto Custa |
| 0.8 | Plantas, Custos, Blog, Sobre, Metodologia, Processo, Financiamento, Empresa |
| 0.7 | Metodos, Como Funciona |
| 0.6 | Todos os artigos do blog |

### Artigos Dinamicos
- Slugs carregados via API: `GET /api/artigos/slugs`
- Revalidacao: 1 hora
- lastModified usa published_at do artigo

---

## 8. ESTRUTURA DO BLOG

### Categorias (14 categorias)

| Slug | Label |
|------|-------|
| construcao-lsf | Construcao LSF |
| precos-construcao | Precos de Construcao |
| casas-modulares | Casas Modulares |
| credito-habitacao | Credito Habitacao |
| dicas-construcao | Dicas de Construcao |
| remodelacao | Remodelacao |
| terrenos-licencas | Terrenos e Licencas |
| icf-plastbau | Construcao ICF |
| acabamentos | Acabamentos |
| telhados-coberturas | Telhados e Coberturas |
| betao | Construcao em Betao |
| isolamento | Isolamento |
| pavilhoes-garagens | Pavilhoes e Garagens |
| casas-madeira | Casas de Madeira |

### Search Intent (classificacao de cada artigo)
- **transacional** (99 artigos) - Compra/contratacao. Mostra botao "Gerar Estudo Tecnico"
- **comercial** (57 artigos) - Comparacao de precos. CTA para simulador
- **informacional** (57 artigos) - Aprendizagem. CTA generico

### Campos SEO na Base de Dados (tabela artigos)

```
id, titulo, slug, resumo, conteudo_html, categoria, autor, tags[],
imagem_destaque_url, meta_title, meta_description, published_at,
status, faq_json[], search_intent, read_time_minutes,
internal_links_json (EXISTE MAS NAO POPULADO),
pillar_slug (EXISTE MAS NAO POPULADO),
updated_at
```

### Template do Artigo (blog/[slug]/page.tsx)

Ordem dos elementos:
1. Schema JSON-LD (Article + Breadcrumb + FAQ)
2. Breadcrumbs (Home > Blog > Categoria > Titulo)
3. Badge de categoria (link para filtro)
4. H1 com titulo
5. Resumo (se existir)
6. Metadata (autor, data, tempo leitura)
7. Imagem destaque
8. Conteudo Parte 1 (ate 2o paragrafo)
9. InlineCTA (baseado no search_intent)
10. Conteudo Parte 2 (resto)
11. Assistente IA (chat bot)
12. FAQ Section (se existir faq_json)
13. Tags
14. AuthorSection (E-E-A-T - Alvara IMPIC, NIF)
15. Artigos Relacionados (ate 4, por categoria)
16. GerarEstudoButton (so para transacional)
17. CTA principal (Simular Gratis -> /simulador)
18. WhatsApp CTA

### Artigos Relacionados
- **Algoritmo atual:** Mesmo categoria, mais recentes, limite 4
- **Endpoint:** `GET /api/artigos/related/{slug}`
- **LIMITACAO:** Apenas por categoria, sem matching por tags ou relevancia semantica

---

## 9. LINKAGEM INTERNA ATUAL

### Mapa de Links entre Paginas Estaticas

```
/processo-construcao-lsf
  -> /metodologia-construtiva
  -> /preco-construcao-lsf-por-m2
  -> artigos do blog

/preco-construcao-lsf-por-m2
  -> /quanto-custa-casa-lsf
  -> /casa-lsf-financiamento
  -> artigos do blog

/quanto-custa-casa-lsf
  -> /preco-construcao-lsf-por-m2
  -> /casa-lsf-financiamento
  -> /simulador
  -> artigos do blog

/casa-lsf-financiamento
  -> /quanto-custa-casa-lsf
  -> /preco-construcao-lsf-por-m2
  -> artigos do blog

/empresa-construcao-lsf-portugal
  -> /sobre-obrasnet
  -> /processo-construcao-lsf
  -> /preco-construcao-lsf-por-m2
  -> /metodologia-construtiva

/metodologia-construtiva
  -> /processo-construcao-lsf
  -> /preco-construcao-lsf-por-m2
  -> artigos do blog
```

### PROBLEMAS de Linkagem Interna
- **Home** - NAO tem links internos de texto
- **Plantas** - So linka para /simulador
- **Simulador** - So linka para /
- **Custos** - So linka para /simulador
- **Metodos** - So linka para /como-funciona e /simulador
- **Como-funciona** - So linka para /simulador e /
- **Blog artigos** - Os links internos no HTML do conteudo sao do WordPress antigo (alguns podem estar quebrados)
- **Artigos NAO linkam para paginas pilar** de forma sistematica

---

## 10. TOPICAL AUTHORITY - CLUSTERS DE CONTEUDO

### Estrategia de Pilares (A IMPLEMENTAR)

O campo `pillar_slug` existe na BD mas NAO esta populado.
O campo `internal_links_json` existe na BD mas NAO esta populado.

### Clusters Recomendados

**PILAR 1: Construcao LSF Portugal**
- Pagina pilar: `/preco-construcao-lsf-por-m2`
- Satelites: artigos sobre precos, vantagens, desvantagens, tempo, comparacoes

**PILAR 2: Casas Modulares**
- Pagina pilar: `/blog/casas-pre-fabricadas-precos`
- Satelites: modelos, materiais, licenciamento, financiamento

**PILAR 3: Quanto Custa Construir**
- Pagina pilar: `/quanto-custa-casa-lsf`
- Satelites: custos por regiao, financiamento, poupanca, terrenos

**PILAR 4: Processo Construtivo**
- Pagina pilar: `/processo-construcao-lsf`
- Satelites: fundacoes, estrutura, isolamento, acabamentos

### Regra para Novos Artigos
Cada novo artigo DEVE:
1. Pertencer a um cluster (categoria obrigatoria)
2. Linkar para a pagina pilar do cluster
3. Linkar para pelo menos 3 artigos existentes do mesmo cluster
4. Ser linkado de volta por pelo menos 1 artigo existente
5. Ter o campo `pillar_slug` preenchido na BD

---

## 11. ON-PAGE SEO - CHECKLIST PARA NOVOS CONTEUDOS

### Obrigatorio em CADA artigo novo:

- [ ] H1 unico com keyword principal
- [ ] Meta title <= 60 caracteres com keyword
- [ ] Meta description <= 155 caracteres com CTA
- [ ] Pelo menos 6 H2 com keywords secundarias
- [ ] Minimo 2000 palavras
- [ ] Imagem destaque com alt text descritivo
- [ ] Imagens no corpo com alt text (NAO usar img sem alt)
- [ ] Pelo menos 6 FAQs em faq_json
- [ ] Tags relevantes (5-10 tags)
- [ ] search_intent definido (transacional/comercial/informacional)
- [ ] pillar_slug apontando para pagina pilar
- [ ] internal_links_json com 3+ links internos
- [ ] CTA para WhatsApp ou Simulador
- [ ] Categoria atribuida
- [ ] Resumo de 1-2 frases

### Otimizacao de Imagens
- Usar Cloudflare R2 para hosting
- Formato WebP preferencialmente
- Alt text descritivo (NAO generico)
- Lazy loading para imagens abaixo do fold
- Imagem destaque: loading="eager"

---

## 12. CONTEUDO EXISTENTE - PROBLEMAS CONHECIDOS

### Artigos Finos (< 5000 caracteres)
Existem ~84 artigos com conteudo muito curto. Estes devem ser:
- Expandidos para 2000+ palavras
- Ou consolidados com artigos similares
- Ou redirecionados 301 para artigo mais forte

### Conteudo Off-Topic
Alguns artigos nao sao relevantes para LSF (ex: artigos sobre Qatar).
Devem ser avaliados para redirecionar ou remover.

### Links Internos no HTML
O conteudo HTML migrado do WordPress pode conter links para URLs antigas.
O middleware trata os redirects, mas idealmente os links no HTML devem apontar
diretamente para as URLs novas (/blog/{slug}).

---

## 13. PERFORMANCE E TECHNICAL SEO

### O que funciona
- Font Google (Inter) otimizada via next/font
- HTML lang="pt-PT"
- Robots.txt com sitemap
- Sitemap dinamico com artigos
- 301 redirects para URLs antigas
- Revalidacao ISR (300s artigos, 3600s slugs)
- Standalone output para deploy

### O que falta
- **next/image** NAO usado (usa <img> padrao) - CORRIGIR
- **Preconnect** para API externa - ADICIONAR
- **Core Web Vitals** - Monitorizar
- ~~**Metadata nas 6 paginas em falta**~~ - CORRIGIDO (Fase 4, Fev 2026)

---

## 14. CTA E CONVERSAO

### Pontos de Conversao
1. **Simulador** (`/simulador`) - Formulario de orcamento gratuito
2. **WhatsApp** - Botao em todos os artigos com contexto do titulo
3. **Gerar Estudo Tecnico** - Botao so em artigos transacionais
4. **Exit Intent** - Popup de captura via ExitIntentCapture component
5. **InlineCTA** - CTA contextual apos 2o paragrafo (muda por search_intent)

### Fluxo de Conversao
```
Trafego Organico -> Artigo Blog -> CTA inline -> Simulador -> WhatsApp
                                -> WhatsApp CTA -> WhatsApp direto
                                -> Gerar Estudo -> Lead capturado
```

---

## 15. API ENDPOINTS RELEVANTES

```
GET  /api/artigos/slugs              # Lista todos os slugs (para sitemap)
GET  /api/artigos/{slug}             # Artigo completo por slug
GET  /api/artigos/related/{slug}     # 4 artigos relacionados (por categoria)
GET  /api/artigos/?pagina=1&por_pagina=12&categoria=X  # Listagem paginada
POST /api/artigos/                   # Criar artigo (para automacao)
```

---

## 16. REGRAS PARA AGENTES DE IA

### NAO FAZER (pode destruir SEO)
1. NAO remover ou alterar Schema JSON-LD existente
2. NAO mudar slugs de artigos ja publicados (quebra URLs indexadas)
3. NAO remover redirects 301 do middleware
4. NAO alterar a estrutura de URLs (/blog/{slug})
5. NAO remover metadata das paginas que ja tem
6. NAO apagar artigos sem redirecionar
7. NAO mudar canonical URLs
8. NAO remover FAQs existentes
9. NAO alterar prioridades do sitemap sem justificacao
10. NAO fazer push de codigo sem testar que o build funciona

### FAZER (melhora SEO)
1. ~~Adicionar metadata as 6 paginas em falta~~ - FEITO (Fase 4)
2. Migrar <img> para next/image
3. Popular pillar_slug e internal_links_json na BD
4. Expandir artigos finos (< 2000 palavras)
5. Adicionar links internos nos artigos para paginas pilar
6. Adicionar alt text a todas as imagens
7. Criar tabela de conteudos (TOC) para artigos longos
8. Melhorar algoritmo de artigos relacionados (usar tags alem de categoria)
9. Adicionar breadcrumb schema nas paginas estaticas
10. Adicionar preconnect para o dominio da API

### AO CRIAR NOVOS ARTIGOS (automatizacao n8n)
1. Seguir o checklist do capitulo 11
2. Slug deve ser SEO-friendly (keywords, sem acentos, hifen como separador)
3. Meta title deve ter keyword no inicio
4. Primeiro paragrafo deve conter keyword principal
5. Imagem destaque obrigatoria (upload para R2)
6. Linkar para pagina pilar do cluster
7. Linkar para 3+ artigos existentes relacionados
8. Inserir FAQ com 6+ perguntas
9. Definir search_intent correto
10. Status "publicado" so quando tudo estiver preenchido

### AO CRIAR PAGINAS POR CIDADE (futuro)
1. Adicionar a rota ao APP_ROUTES no middleware.ts
2. Adicionar ao sitemap.ts
3. Criar metadata com keyword local (ex: "Construcao LSF em Lisboa")
4. Schema LocalBusiness com geo coordinates da cidade
5. Linkar para artigos relevantes da BD
6. Incluir dados reais de precos da BD
7. FAQ localizado
8. CTA com contexto da cidade

---

## 17. FICHEIROS CRITICOS (NAO ALTERAR SEM CUIDADO)

```
frontend/src/middleware.ts              # Redirects 301 - CRITICO para SEO
frontend/src/app/layout.tsx             # Schema global + metadata base
frontend/src/app/sitemap.ts             # Sitemap dinamico
frontend/src/app/robots.ts              # Robots.txt
frontend/src/app/blog/[slug]/page.tsx   # Template de artigos (SEO heavy)
frontend/src/app/blog/[slug]/opengraph-image.tsx  # OG image dinamico
```

---

## 18. PROXIMOS PASSOS PRIORITARIOS (baseado em dados GSC reais)

### ✅ IMPLEMENTADO - SEO Fase 4 (17 Fev 2026)

**O que foi feito:**

1. ✅ **301 Redirects para 3 slugs antigos com 200K+ impressoes que davam 404:**
   - `telhados-e-coberturas-preco-m2-portugal` → `telhados-e-coberturas-precos` (67K imp)
   - `casas-modulares-t3-portugal-precos` → `casas-modulares-portugal-chave-na-mao` (94K imp)
   - `manta-termica-telhado-preco-m2` → `descubra-tudo-sobre-isolamento-termico-...` (40K imp)

2. ✅ **Meta titles/descriptions otimizados para CTR (5 artigos top, via API BD):**
   - tecto-falso-pladur → "Teto Falso Pladur: Preco por m2 em 2026 [Tabela Atualizada]"
   - telhados-e-coberturas → "Telhados e Coberturas: Precos por m2 em 2026 [Guia Completo]"
   - pavilhoes-pre-fabricados → "Pavilhoes Pre-Fabricados: Preco m2 em 2026 [Tabela Completa]"
   - casas-modulares-portugal → "Casas Modulares T3 Portugal: Precos Chave na Mao 2026"
   - isolamento-termico → "Isolamento Termico: 10 Melhores Materiais e Precos 2026"

3. ✅ **Anchor URLs (#Casas_lsf etc.):** Canonicals ja estavam corretos (sem fragment).
   Google vai consolidar gradualmente. Sem accao adicional necessaria.

4. ✅ **Metadata adicionada a 6 paginas:** /, /plantas, /simulador, /custos, /metodos, /como-funciona
   Todas agora tem: title, description, keywords, OG, canonical

5. ✅ **Keywords meta adicionadas a TODAS as paginas estaticas**

6. ✅ **Referencias 2025→2026 atualizadas:**
   - /casa-lsf-financiamento (6 ocorrencias)
   - /quanto-custa-casa-lsf (2 ocorrencias)
   - /preco-construcao-lsf-por-m2 (4 ocorrencias)

7. ✅ **Credenciais Cloudflare R2 configuradas no .env**

**Impacto estimado:**
- 200K+ impressoes recuperadas (slugs que davam 404 agora resolvem)
- CTR esperado subir de 1.6% para 2.5-3% nos artigos otimizados
- Conteudo atualizado para 2026 em todas as paginas de precos

---

### PENDENTE - Proximas Prioridades

### P1 - ALTO - Defender posicoes #1-3

1. **Manter e reforcar conteudo das queries estrela:**
   - "lsf problemas" (pos 1.19) - atualizar artigo, manter fresh
   - "casas modulares t3 chave na mao" (pos 1.77) - expandir conteudo
   - "pavilhoes pre-fabricados preco" (pos 2.06) - adicionar FAQ, dados 2026

2. **Popular pillar_slug e internal_links_json na BD**

### P2 - MEDIO - Capturar trafego novo

3. **Criar conteudo para queries com impressoes altas sem pagina dedicada:**
   - "casas modulares ate 50000 euros" (3K imp) - pagina dedicada
   - "casas que nao precisam de licenca portugal" (1.7K imp) - artigo novo
   - "casas modulares betao chave na mao" (1.8K imp) - artigo dedicado
   - "casas pre-fabricadas portugal precos chave na mao" (4.6K imp) - otimizar pagina

4. **Expandir artigos finos (< 2000 palavras)** - priorizar os com mais impressoes
5. **Migrar imagens para next/image**
6. **Implementar motor de artigos automatico (n8n)**

### P3 - BAIXO - Crescimento sustentado

7. **Criar paginas por cidade** (/construcao-lsf-{cidade})
8. **Segmento emigrantes** - Suica/Franca tem CTR 4.5-4.8% (melhor que PT!)
9. **Adicionar TOC para artigos > 3000 palavras**
10. **Testes A/B nos titles** para as top 10 paginas
11. **Analytics por artigo (CTR, conversoes)**

---

## 19. DADOS GSC BRUTOS (ficheiros de referencia)

Os seguintes ficheiros na pasta `docs/` contem os exports completos do Google Search Console:

| Ficheiro | Conteudo | Periodo |
|----------|----------|---------|
| `gsc_pages.csv` | Todas as 889 paginas (global) | 6 meses |
| `gsc_queries.csv` | Top 1000 queries (global) | 6 meses |
| `gsc_pages_queries.csv` | Queries da homepage | 6 meses |
| `gsc_top_pages_detail.csv` | Detalhe: casas-modulares-t3 | 12 meses |
| `gsc_top_pages_1_detail.csv` | Detalhe: telhados-e-coberturas | 12 meses |
| `gsc_top_pages_2_detail.csv` | Detalhe: pavilhoes-pre-fabricados | 12 meses |

> NOTA: Os ficheiros estao em formato ZIP (export nativo do GSC), nao CSV puro.
> Para ler: `zipfile.ZipFile('ficheiro.csv')` -> extrair CSVs internos.

---

*Ultima atualizacao: 17 de fevereiro de 2026*
*Dados GSC: periodo Ago 2025 - Fev 2026 (6 meses) + detalhe 12 meses para top pages*
