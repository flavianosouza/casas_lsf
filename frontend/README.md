# 🏗️ Portal Casas LSF Intelligence

Bem-vindo ao repositório oficial do **Portal Casas LSF Intelligence**, a plataforma líder em Portugal para construção em Light Steel Framing (LSF) impulsionada por Inteligência Artificial.

Este projeto visa revolucionar o setor da construção civil, oferecendo transparência total, orçamentação precisa e geração de plantas arquitetónicas instantâneas.

---

## 🚀 Sobre o Projeto

O **Portal Casas LSF** é uma aplicação web moderna desenvolvida para conectar clientes finais a soluções de engenharia de ponta. A plataforma utiliza algoritmos avançados e integração com IA para:

- **Gerar Plantas 2D/3D:** Criação de layouts personalizados adaptados ao terreno e orçamento do cliente.
- **Orçamentação Automática:** Cálculo detalhado de mapas de quantidades e custos de materiais (precisão de engenharia).
- **Simulação de Crédito:** Ferramentas financeiras para viabilidade de obra.
- **Gestão de Processos:** Acompanhamento desde o licenciamento até à chave na mão.

### 🌟 Destaques Técnicos

- **Performance:** Construído sobre Next.js 15+ para renderização híbrida e velocidade extrema.
- **Design:** Interface premium com TailwindCSS, Glassmorphism e animações fluidas.
- **Base de Dados:** PostgreSQL para gestão robusta de leads, materiais e projetos.
- **Integração AI:** Conexão com agentes de IA para análise de terrenos e geração de conteúdo.

---

## 🛠️ Stack Tecnológica

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + Lucide React (Ícones)
- **Base de Dados:** PostgreSQL (`pg`)
- **Gestor de Pacotes:** `npm`

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado na sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (ou acesso a uma instância remota/VPS)

---

## ⚙️ Instalação e Configuração

Siga os passos abaixo para configurar o ambiente de desenvolvimento localmente:

1.  **Clonar o Repositório**

    ```bash
    git clone https://github.com/seu-usuario/portal-lsf.git
    cd portal
    ```

2.  **Instalar Dependências**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configurar Variáveis de Ambiente**
    Crie um ficheiro `.env.local` na raiz do projeto (baseado no `.env.local.example`) e configure as credenciais da base de dados:

    ```env
    DB_USER=postgres
    DB_PASSWORD=sua_password_segura
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=lsf_intelligence
    ```

4.  **Iniciar o Servidor de Desenvolvimento**

    ```bash
    npm run dev
    ```

    O portal estará acessível em [http://localhost:3000](http://localhost:3000).

---

## 📂 Estrutura do Projeto

```
portal/
├── public/              # Arquivos estáticos (imagens, ícones)
├── src/
│   ├── app/             # Rotas e páginas (App Router)
│   ├── components/      # Componentes Reutilizáveis (UI)
│   ├── lib/             # Utilitários e configurações (DB, API clients)
│   └── styles/          # Estilos globais
├── .env.local           # Variáveis de ambiente (NÃO COMITE)
├── next.config.ts       # Configurações do Next.js
├── package.json         # Dependências e scripts
└── tsconfig.json        # Configurações TypeScript
```

---

## 🤝 Contribuição

Este é um projeto proprietário focado em engenharia de precisão. Todas as contribuições devem seguir as **Regras de Engenharia LSF** e o **Guia de Estilo** do projeto.

1.  Mantenha o código limpo e tipado (TypeScript estrito).
2.  Respeite a arquitetura de componentes do Next.js.
3.  Garanta que todas as funcionalidades de cálculo seguem as normas técnicas em vigor (Eurocódigos).

---

## 📞 Suporte

Para questões técnicas ou relacionadas com a engenharia do projeto, contacte a equipa de desenvolvimento ou consulte a documentação técnica interna na pasta `/intelligence`.

---

**Casas LSF Intelligence** - _Construindo o Futuro com Precisão._
