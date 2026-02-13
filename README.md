# 🏗️ Casas LSF Intelligence - Sistema Completo

Bem-vindo ao repositório central do projeto **Casas LSF Intelligence**. Este sistema integra um portal de captção de leads, um backend robusto em Python (FastAPI) e automações avançadas.

## 📂 Estrutura Padronizada

O projeto segue agora uma estrutura "monorepo" organizada:

- **`frontend/`**: Aplicação Web (Next.js 15) para clientes finais.
  - Onde os clientes visualizam plantas, simulam orçamentos e contactam.
- **`backend/`**: API Central (FastAPI).
  - Gere a lógica de negócio, base de dados e integrações.
- **`automation/`**: Workflows de Automação (n8n).
  - Processamento de leads, orçamentos automáticos e scraping.
- **`ai-config/`**: Configurações de IA.
  - Prompts do sistema (Gemini/GPT) e definições de visão.
- **`database/`**: Esquemas e Migrações (PostgreSQL).
- **`docs/`**: Documentação Técnica e Estratégica.

---

## 🚀 Como Executar o Projeto

### 1. Iniciar o Frontend (Portal)

1.  Abra um terminal na pasta `frontend`:
    ```bash
    cd frontend
    npm run dev
    ```
2.  Aceda a [http://localhost:3000](http://localhost:3000).

### 2. Iniciar o Backend (API)

1.  Abra um **novo** terminal na pasta `backend`:
    ```bash
    cd backend
    uvicorn app.main:app --reload
    ```
2.  Aceda a [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 📚 Documentação

- [Documentação do Frontend](frontend/README.md)
- [Project Charter](docs/PROJECT_CHARTER.md)
- [Relatório de Atividades](docs/RELATORIO_ATIVIDADES.md)

---

**Casas LSF Intelligence** - _Organização e Eficiência._
