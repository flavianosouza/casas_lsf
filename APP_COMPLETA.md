# 📋 CASAS LSF — Documentação Completa da Aplicação

> Tudo o que precisa estar configurado para a app funcionar a 100%.

---

## 1. ESTRUTURA DO PROJETO

```
CASAS LSF/
├── frontend/                    ← Next.js 16 (React)
│   ├── Dockerfile               ← Build multi-stage para EasyPanel
│   ├── next.config.ts           ← output: "standalone"
│   ├── package.json
│   ├── tsconfig.json            ← paths: @/* → ./src/*
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx       ← Layout global (Navbar integrado)
│   │   │   ├── globals.css      ← Design system (glassmorphism, botões, animações)
│   │   │   ├── page.tsx         ← Homepage "/"
│   │   │   ├── simulador/page.tsx    ← "/simulador" (Formulário multi-step)
│   │   │   ├── plantas/page.tsx      ← "/plantas" (Catálogo de modelos)
│   │   │   ├── custos/page.tsx       ← "/custos" (Tabela de preços)
│   │   │   ├── metodos/page.tsx      ← "/metodos" (Método construtivo LSF)
│   │   │   ├── como-funciona/page.tsx ← "/como-funciona" (Processo)
│   │   │   └── blog/page.tsx         ← "/blog" (Artigos)
│   │   └── components/
│   │       └── Navbar.tsx       ← Navbar partilhado (todas as páginas)
│   └── public/
│       └── bg-grid.svg          ← Background pattern
│
├── backend/                     ← FastAPI (Python)
│   ├── Dockerfile               ← Build para EasyPanel
│   ├── requirements.txt         ← Dependências Python
│   ├── .env                     ← Variáveis locais (NÃO vai para produção)
│   └── app/
│       ├── __init__.py
│       ├── main.py              ← App FastAPI + CORS + lifespan
│       ├── database.py          ← Conexão async PostgreSQL
│       ├── models.py            ← Modelo SQLAlchemy (Lead)
│       ├── schemas.py           ← Schemas Pydantic (validação)
│       └── routers.py           ← Endpoints API (/api/leads/)
│
└── database/
    └── schema.sql               ← Schema SQL (referência)
```

---

## 2. EASYPANEL — CONFIGURAÇÃO DOS 3 SERVIÇOS

### 2.1 Serviço: `casas_lsf` (PostgreSQL)

| Campo             | Valor                 |
| ----------------- | --------------------- |
| **Tipo**          | Database (PostgreSQL) |
| **Porta interna** | 5432                  |
| **User**          | postgres              |
| **Password**      | 0f9bef7cf6128aa6952f  |
| **Database**      | postgres              |

---

### 2.2 Serviço: `backend` (FastAPI)

#### Fonte (Source)

| Campo               | Valor                     |
| ------------------- | ------------------------- |
| **Tipo**            | Github                    |
| **Repositório**     | `flavianosouza/casas_lsf` |
| **Branch**          | `main`                    |
| **Build Path**      | `/backend`                |
| **Dockerfile Path** | `Dockerfile`              |

#### Variáveis de Ambiente (OBRIGATÓRIAS)

```
DATABASE_URL=postgresql+asyncpg://postgres:0f9bef7cf6128aa6952f@casas_lsf:5432/postgres?sslmode=disable
SECRET_KEY=dev_secret_key_change_in_production
OPENAI_API_KEY=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
GEMINI_API_KEY=AIzaSyB62qzdI5NLkaSjyb1Y64d0qVPfG9HidKM
```

#### Porta

| Campo             | Valor                                   |
| ----------------- | --------------------------------------- |
| **Porta interna** | 8000                                    |
| **Domínio**       | casas-lsf-backend.dy3pb5.easypanel.host |

---

### 2.3 Serviço: `frontend` (Next.js)

#### Fonte (Source)

| Campo               | Valor                     |
| ------------------- | ------------------------- |
| **Tipo**            | Github                    |
| **Repositório**     | `flavianosouza/casas_lsf` |
| **Branch**          | `main`                    |
| **Build Path**      | `/frontend`               |
| **Dockerfile Path** | `Dockerfile`              |

#### Variáveis de Ambiente (OBRIGATÓRIAS)

```
NEXT_PUBLIC_API_URL=https://casas-lsf-backend.dy3pb5.easypanel.host
```

#### Porta

| Campo             | Valor                                    |
| ----------------- | ---------------------------------------- |
| **Porta interna** | 3000                                     |
| **Domínio**       | casas-lsf-frontend.dy3pb5.easypanel.host |

---

## 3. FRONTEND — 7 PÁGINAS

| Rota             | Ficheiro                 | Descrição                                            | Estado |
| ---------------- | ------------------------ | ---------------------------------------------------- | ------ |
| `/`              | `page.tsx`               | Homepage com hero, features, stats, CTA              | ✅     |
| `/simulador`     | `simulador/page.tsx`     | Formulário multi-step (wizard) para captura de leads | ✅     |
| `/plantas`       | `plantas/page.tsx`       | Catálogo de 6 modelos de casas LSF                   | ✅     |
| `/custos`        | `custos/page.tsx`        | Tabela de preços estimativos por m²                  | ✅     |
| `/metodos`       | `metodos/page.tsx`       | Explicação do método construtivo LSF                 | ✅     |
| `/como-funciona` | `como-funciona/page.tsx` | 4 passos do processo (simulação → entrega)           | ✅     |
| `/blog`          | `blog/page.tsx`          | Lista de artigos sobre construção LSF                | ✅     |

### Componentes Partilhados

| Componente | Ficheiro                | Descrição                                                              |
| ---------- | ----------------------- | ---------------------------------------------------------------------- |
| **Navbar** | `components/Navbar.tsx` | Menu topo com logo, links, CTA "Simular Grátis", menu hamburger mobile |

### Design System (globals.css)

| Classe             | Descrição                                      |
| ------------------ | ---------------------------------------------- |
| `.glass`           | Fundo transparente com blur (glassmorphism)    |
| `.glass-card`      | Card com gradiente escuro, borda, hover lift   |
| `.btn-primary`     | Botão gradiente azul→violeta, pill shape, glow |
| `.btn-secondary`   | Botão transparente com borda                   |
| `.animate-fade-in` | Animação fadeIn + translateY                   |
| `.text-gradient`   | Texto com gradiente azul→rosa                  |

---

## 4. BACKEND — ENDPOINTS API

| Método | Rota          | Descrição                 | Auth |
| ------ | ------------- | ------------------------- | ---- |
| `GET`  | `/`           | Status da API             | Não  |
| `GET`  | `/health`     | Health check              | Não  |
| `GET`  | `/docs`       | Swagger UI (documentação) | Não  |
| `POST` | `/api/leads/` | Criar novo lead           | Não  |
| `GET`  | `/api/leads/` | Listar leads              | Não  |

### Modelo de Dados — Lead

```python
id              UUID      (PK, auto-gerado)
created_at      DateTime  (auto, timezone)
nome            String    (obrigatório)
email           String    (opcional)
telefone        String    (obrigatório)
origem          String    (default: "portal_organico")
status          String    (default: "novo")
interesse_tipo  String    (T1, T2, T3, T4, etc.)
mensagem        Text      (opcional)
metadata_info   JSON      (dados extra do formulário)
```

---

## 5. DEPENDÊNCIAS

### Frontend (package.json)

| Pacote         | Versão  | Uso                 |
| -------------- | ------- | ------------------- |
| `next`         | 16.1.6  | Framework React SSR |
| `react`        | 19.2.3  | UI Library          |
| `lucide-react` | 0.563.0 | Ícones SVG          |
| `tailwindcss`  | 4.1.18  | CSS Utilities       |
| `clsx`         | 2.1.1   | Class names helper  |

### Backend (requirements.txt)

| Pacote                     | Uso                           |
| -------------------------- | ----------------------------- |
| `fastapi>=0.110.0`         | Framework API                 |
| `uvicorn>=0.29.0`          | ASGI Server                   |
| `sqlalchemy>=2.0.29`       | ORM (async)                   |
| `asyncpg>=0.29.0`          | PostgreSQL async driver       |
| `pydantic[email]>=2.7.0`   | Validação de dados + EmailStr |
| `pydantic-settings>=2.2.0` | Settings management           |
| `python-dotenv>=1.0.1`     | .env file loader              |
| `alembic>=1.13.1`          | Database migrations           |
| `psycopg2-binary>=2.9.9`   | PostgreSQL sync driver        |
| `httpx>=0.27.0`            | HTTP client async             |

---

## 6. CORS — ORIGENS PERMITIDAS (backend/main.py)

```python
origins = [
    "http://localhost:3000",
    "https://casaslsf.com",
    "https://n8n.lsfbuilderpro.com",
    "https://casas-lsf-frontend.dy3pb5.easypanel.host"
]
```

---

## 7. CHECKLIST DE DEPLOY

### Backend

- [ ] Ir ao EasyPanel → backend → Fonte
- [ ] Seleccionar **Github** → Repo: `flavianosouza/casas_lsf` → Branch: `main` → Build Path: `/backend`
- [ ] Ir a **Ambiente** → Colar as 4 variáveis (DATABASE_URL, SECRET_KEY, OPENAI_API_KEY, GEMINI_API_KEY)
- [ ] Salvar e Implantar
- [ ] Verificar: `https://casas-lsf-backend.dy3pb5.easypanel.host/health` → `{"status":"ok"}`
- [ ] Verificar logs: `✅ Database connected and tables created.`

### Frontend

- [ ] Ir ao EasyPanel → frontend → Fonte
- [ ] Seleccionar **Github** → Repo: `flavianosouza/casas_lsf` → Branch: `main` → Build Path: `/frontend`
- [ ] Ir a **Ambiente** → Colar: `NEXT_PUBLIC_API_URL=https://casas-lsf-backend.dy3pb5.easypanel.host`
- [ ] Salvar e Implantar (demora ~3-5 min)
- [ ] Verificar: `https://casas-lsf-frontend.dy3pb5.easypanel.host/`
- [ ] Verificar: Navbar aparece em todas as páginas
- [ ] Verificar: Todos os 7 links funcionam sem 404

---

## 8. REPOSITÓRIO GIT

| Campo             | Valor                                                              |
| ----------------- | ------------------------------------------------------------------ |
| **URL**           | `https://github.com/flavianosouza/casas_lsf`                       |
| **Branch**        | `main`                                                             |
| **Último commit** | `Feat: Shared Navbar component + layout integration + mobile menu` |

---

## 9. URLs DE PRODUÇÃO

| Serviço          | URL                                                    |
| ---------------- | ------------------------------------------------------ |
| **Frontend**     | https://casas-lsf-frontend.dy3pb5.easypanel.host       |
| **Backend API**  | https://casas-lsf-backend.dy3pb5.easypanel.host        |
| **API Docs**     | https://casas-lsf-backend.dy3pb5.easypanel.host/docs   |
| **Health Check** | https://casas-lsf-backend.dy3pb5.easypanel.host/health |
