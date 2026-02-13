# 🚀 PROJETO PORTAL CONSTRUÇÃO --- LSF Intelligence AI

Data de Criação: 13/02/2026

---

# 🎯 OBJETIVO ESTRATÉGICO

Criar o maior portal de construção em Portugal focado em:

- Geração massiva de tráfego orgânico
- Captura de leads qualificados
- Monetização via SaaS (ferramentas IA)
- Autoridade no setor da construção
- Expansão futura para Espanha e Europa

Domínio principal: https://casaslsf.com/

---

# 🧠 POSICIONAMENTO ESTRATÉGICO

❌ Não ser apenas um site sobre LSF\
✅ Ser o maior portal de construção em Portugal

O LSF será promovido estrategicamente dentro do conteúdo comparativo.

---

# 🏗️ ESTRUTURA DO PORTAL

## 1️⃣ Pilar 1 --- Plantas de Casas (Máquina de Tráfego)

Objetivo: Rankear milhares de pesquisas mensais.

Exemplos de artigos: - Plantas de casas T3 com medidas - Plantas de
casas em L com 3 quartos - Plantas de casas térreas modernas - Casas até
150 mil euros - Casas pequenas 80m2 - Plantas de casas em U

Cada artigo deve conter: - 1200 a 2000 palavras - Planta gerada via IA -
Tabela de áreas - Simulação de custo - CTA para WhatsApp

---

## 2️⃣ Pilar 2 --- Custos e Orçamentos

Exemplos: - Quanto custa construir casa em 2026 - Custo por m2 em
Portugal - LSF vs Alvenaria - Construir ou Comprar?

Integração direta com: - Motor de Orçamento - Captura de lead

---

## 3️⃣ Pilar 3 --- Métodos Construtivos

Cobrir TODOS os métodos:

- LSF
- Alvenaria
- ICF
- Madeira
- Modular
- Betão

Estratégia: Comparativos técnicos neutros. LSF demonstrado como superior
em tempo, eficiência e precisão.

---

## 4️⃣ Pilar 4 --- Notícias e Tendências

Fontes: - Reddit construção - Sites internacionais - Notícias de
legislação portuguesa - ACT e leis trabalhistas - Atualizações de custos
de materiais

Automação via Firecrawl + reescrita adaptada para Portugal.

---

# 🔥 PRODUÇÃO DE CONTEÚDO

Meta: 10 artigos por dia

Estrutura SEO obrigatória: - H1 único - H2 estruturados - FAQ com schema
markup - Meta description otimizada - Interlinking interno - Sitemap
automático

---

# 🧲 FUNIL DE CONVERSÃO

1.  Usuário entra via Google
2.  Lê artigo
3.  Vê planta gerada
4.  Clica em "Simular Custo"
5.  Deixa WhatsApp
6.  Entra no funil automático

---

# 💰 MONETIZAÇÃO

- Ferramentas SaaS IA para construtores
- Simulador de orçamento premium
- Relatórios técnicos pagos
- Publicidade do setor
- Afiliados materiais construção

---

# 🌍 ESCALABILIDADE EUROPA

Estrutura futura:

/pt/ /es/ /fr/

Tradução adaptada culturalmente.

---

# 🛠️ STACK TECNOLÓGICA RECOMENDADA

Frontend: - Next.js

Backend: - FastAPI

Automação: - n8n

Base de Dados: - PostgreSQL

Scraping: - Firecrawl

Hospedagem: - VPS atual (avaliar escalabilidade futura)

---

# 📈 ESTRATÉGIA DE AUTORIDADE

- Guest posts
- Backlinks estratégicos
- Fóruns técnicos
- Medium
- Reddit
- YouTube técnico

---

# 🎯 RESULTADO ESPERADO

Em 6-12 meses: - Portal referência nacional - Máquina automática de
geração de leads - Autoridade no setor - Base pronta para expansão
europeia

---

# 🧠 FILOSOFIA DO PROJETO

Transformar a construção civil --- tradicionalmente lenta e opaca --- em
uma experiência tecnológica, ágil e transparente. CONFIGURA ESTE PROJETO PARA TRABALHAR EM CONMJUTO COM ESTE PROJETO # 📐 Sistema Inteligente LSF -- Escopo Técnico Completo

**Versão:** 1.0\
**Data:** 12/02/2026\
**Responsável Técnico:** Sistema Inteligente LSF

---

# 1. VISÃO GERAL DO PROJETO

Este projeto consiste na criação de um **sistema inteligente
automatizado** para:

- Geração de plantas 2D preliminares
- Extração automática de quantitativos via IA (Gemini Vision)
- Geração de mapa de quantidades técnico
- Criação automática de orçamento detalhado por categoria
- Gestão dinâmica de materiais com base de dados atualizável
- Integração com WhatsApp para atendimento automático

O sistema opera com arquitetura baseada em:

- Agente principal (ChatGPT-5 / Claude alternável)
- Subworkflows especializados
- Banco de dados PostgreSQL
- Integração Gemini Vision para análise de imagem
- Atualização automática de preços via api firecrawl scraping

---

# 2. ARQUITETURA DO SISTEMA

## 2.1 Agente Principal

Funções: - Qualificação do lead - Coleta de requisitos - Chamada de
tools - Tomada de decisão - Recomendações técnicas personalizadas

Capacidade prevista: - Até 20 ferramentas ativas simultaneamente

---

# 3. WORKFLOW -- GERAÇÃO DE PLANTA 2D

## Etapas

1.  Recebe pedido do lead
2.  Gera planta 2D preliminar
3.  Aplica regras técnicas:
    - 1 janela por ambiente (open-space → 2)
    - Portão garagem mínimo 3m (1 carro) ou 5--6m (2 carros)
    - WC: apenas sanita, lavatório e base de duche
    - Suíte identificada corretamente
    - Sem bidê
4.  Salva no banco de dados
5.  Envia imagem + link Google Drive ao cliente

---

# 4. EXTRAÇÃO DE QUANTITATIVOS (MAPA DE QUANTIDADE)

Após aprovação da planta:

## Dados extraídos automaticamente:

- Área total construída
- Perímetro paredes exteriores
- Perímetro paredes interiores
- Quantidade e dimensões de janelas
- Quantidade de portas interiores
- Portas exteriores / garagem
- Número de WCs
- Louças sanitárias
- Bases de duche
- Pé-direito estimado

## Regras padrão adotadas:

- Pé-direito recomendado: 2,80m limpo
- Altura parede exterior: 3,00m
- Platibanda: 0,60--0,70m
- Janelas com modulação 60cm
- Porta interior padrão: 0,80m

---

# 5. MAPA DE QUANTITAGEM -- ESTRUTURA POR CATEGORIA

## 5.1 Paredes Exteriores

- Estrutura LSF
- OSB ou MGO
- Barreira de vapor
- EPS / XPS
- Capoto
- Pintura exterior

## 5.2 Paredes Interiores

- Estrutura LSF leve
- Lã mineral 60mm
- Placa pladur simples/dupla/tripla
- Placa hidrófuga / antichama / Habito

## 5.3 Cobertura

- Painel sandwich 50/60/80mm
- Painel Isotec
- Termoacoustic
- Subestrutura metálica

## 5.4 Fundação

- Escavação
- Cofragem
- Ferro
- Betão C25/30
- Impermeabilização

## 5.5 Acabamentos

- Piso vinílico / cerâmico / porcelânico
- Rodapés
- Pintura interior
- Louças sanitárias
- Torneiras
- Armários cozinha
- Roupeiros

---

# 6. SISTEMA DE NÍVEL DE ACABAMENTO

## Gama Base

- OSB
- EPS normal
- Pladur simples
- Painel sandwich 50mm

## Gama Média

- Dupla placagem
- EPS grafite
- Painel 60mm

## Gama Premium

- MGO
- Habito
- Termochip
- Painel 80mm
- Isolamento reforçado

---

# 7. BANCO DE DADOS DE MATERIAIS

Tabela principal: `materiais_catalogo`

Campos: - id - sistema - código - descrição técnica - unidade - preço
unitário - fornecedor - tags

Atualização: - Scraping mensal automático - Atualização de preços -
Aplicação de margem 35--40%

---

# 8. GERAÇÃO DE ORÇAMENTO

Fluxo:

1.  Extrai quantitativos
2.  Seleciona materiais conforme nível escolhido
3.  Calcula quantidades x preço unitário
4.  Aplica margem
5.  Gera planilha orçamentária
6.  Envia PDF / Excel ao cliente

---

# 9. SISTEMA INDUSTRIAL (ARMAZÉNS / NAVES)

Categorias adicionais:

- Painéis térmicos lisos
- Fachadas metálicas
- MultiPainel
- Isotec Roof
- Estrutura metálica pesada

Aplicável para: - Armazéns - Naves industriais - Anexos - Pavilhões
térmicos

---

# 10. DIFERENCIAL DO SISTEMA

✔ Planta → Quantidade → Orçamento automático\
✔ IA especializada em LSF\
✔ Recomendação por zona climática\
✔ Banco de dados técnico\
✔ Atualização automática de preços\
✔ Atendimento WhatsApp integrado

---

# 11. PRÓXIMA ETAPA

- Implementação do subworkflow "Mapa de Quantidade"
- Integração Gemini Vision
- Teste piloto com planta aprovada
- Validação de orçamento técnico completo

---

**Documento gerado automaticamente pelo Sistema Inteligente LSF**
