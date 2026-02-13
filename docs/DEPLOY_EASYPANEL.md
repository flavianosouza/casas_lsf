# 🚀 Guia de Deploy no EasyPanel (VPS Hostinger)

Este guia explica passo a passo como colocar o **Portal Casas LSF** online usando o EasyPanel que já tens instalado na tua VPS.

---

## 🏗️ 1. Preparação (Já feita!)

Eu já criei os ficheiros necessários para o deploy funcionar:

- `frontend/Dockerfile`: Para o Next.js.
- `backend/Dockerfile`: Para o FastAPI.
- `frontend/next.config.ts`: Configurado para modo "standalone" (mais leve).

---

## 🛠️ 2. Configurar o EasyPanel

Acede ao teu EasyPanel (o link na imagem que mandaste, geralmente `http://IP_DA_VPS:3000` ou `https://easypanel.teudominio.com`).

### Passo 2.1: Criar um Projeto

1.  Clica em **"New Project"**.
2.  Dá o nome: `casas-lsf`.
3.  Clica em **"Create"**.

### Passo 2.2: Criar a Base de Dados (PostgreSQL)

1.  Dentro do projeto `casas-lsf`, clica em **"Add Service"**.
2.  Escolhe **"PostgreSQL"** (está na lista de Templates ou Databases).
3.  Nome do serviço: `database` (ou `postgres`).
4.  Clica em **"Create"**.
5.  **IMPORTANTE:** Depois de criado, clica no serviço `database` e copia a **"Internal Connection URL"** (Começa com `postgres://...`). Vais precisar disto!

### Passo 2.3: Deploy do Backend (API)

1.  Clica em **"Add Service"** > **"App"**.
2.  Nome: `backend`.
3.  **Source (Origem):**
    - Se tiveres o código no GitHub: Conecta o GitHub e escolhe o repositório.
    - **Path (Caminho):** `./backend` (Muito importante! Diz onde está o Dockerfile).
4.  **Environment Variables (Variáveis de Ambiente):**
    - Adiciona `DATABASE_URL` e cola a URL interna do PostgreSQL que copiaste no passo anterior.
5.  **Build & Deploy:** Clica em "Deploy".

### Passo 2.4: Deploy do Frontend (Portal)

1.  Clica em **"Add Service"** > **"App"**.
2.  Nome: `frontend` (ou `portal`).
3.  **Source (Origem):**
    - Mesmo repositório do GitHub.
    - **Path (Caminho):** `./frontend` (Onde está o Dockerfile do Next.js).
4.  **Environment Variables:**
    - Se o frontend precisar falar com o backend (no futuro), terás de adicionar aqui. Por enquanto, só se precisares de chaves de API públicas.
5.  **Build & Deploy:** Clica em "Deploy".

---

## 🌐 3. Configurar Domínios

Para o site ficar acessível ao público (ex: `casaslsf.com`):

1.  Vai ao serviço `frontend` no EasyPanel.
2.  Clica na aba **"Domains"**.
3.  Adiciona o teu domínio (ex: `casaslsf.com` e `www.casaslsf.com`).
4.  O EasyPanel configura o SSL (HTTPS) automaticamente! 🎉

---

## 🤖 4. Automação (n8n)

Se quiseres rodar o n8n na mesma VPS:

1.  **Add Service** > **Templates** > Procura por "n8n".
2.  Clica em Create.
3.  Configura o domínio para o n8n (ex: `n8n.casaslsf.com`).

---

## 🆘 Problemas Comuns

- **Erro de Build:** Verifica se o caminho (`./backend` ou `./frontend`) está correto nas configurações do serviço.
- **Erro de Conexão DB:** Verifica se a variável `DATABASE_URL` no backend está igual à "Internal URL" do serviço PostgreSQL.

---

**Sucesso!** O teu portal deve estar online em poucos minutos. 🚀
