# PLANO DE EXECUCAO - Sistema Orcamentista LSF

**Data:** 2026-02-13
**Objetivo:** Implementar o pipeline completo: Planta 2D aprovada -> Mapa de Quantidades -> Orcamento -> PDF -> WhatsApp

---

# ESTADO ATUAL (O que ja temos)

## Banco de Dados PostgreSQL (15 tabelas)

| Tabela | Registros | Status |
|--------|-----------|--------|
| precos_materiais | 205 | POPULADA - 31 categorias de materiais LSF |
| orcamentos_base | 107 | POPULADA - 27 categorias de referencia |
| custos_base | 12 | POPULADA - Custos por m2 (basico/medio/premium) |
| orcamentos | 0 | CRIADA - Pronta para receber dados |
| composicoes | 0 | CRIADA - Pronta para composicoes unitarias |
| composicao_itens | 0 | CRIADA - Pronta para itens de composicao |
| historico_precos | 0 | CRIADA - Pronta para tracking de variacao |
| terrenos | 68 | POPULADA - Terrenos Idealista |
| terrenos_projeto_aprovado | 5 | POPULADA |
| leads | 49 | POPULADA - 32 novos, 16 sem status |
| conversas | 2746 | POPULADA - Historico de mensagens |
| plantas_geradas | 7 | POPULADA - Plantas com links Drive |
| n8n_chat_memory | 534 | POPULADA - Memoria do agente |
| stats_diarias | 7 | POPULADA |
| leads_quentes | 0 | View vazia |

## Workflows n8n

| Workflow | ID | Status |
|----------|----|--------|
| Qualificador WhatsApp (MESTRE) | GcLmgtWBpqtApjR7 | ATIVO |
| Gerar Planta LSF (Sub-workflow) | LZVsCIDeMAHXxFke | ATIVO - 18 nodes |
| LSF Orcamentista AI | KSzIYbis18Pbc64d | CRIADO - Em construcao |
| LSF Orcamentista Native | eV1txGMzmqOnuWyO | CRIADO - Em construcao |
| LSF Intelligence - Update Prices | Xp25ExS55ALZLx3S | CRIADO - Em construcao |

## Integracao

- Evolution API (WhatsApp): FUNCIONANDO
- Google Drive API: FUNCIONANDO
- Gemini 2.5 Flash (Imagens): FUNCIONANDO
- PostgreSQL: FUNCIONANDO
- Firecrawl SDK: FUNCIONANDO

---

# PIPELINE DO ORCAMENTISTA

```
Cliente aprova planta 2D
        |
        v
[FASE 1] Agente detecta aprovacao e chama Tool "gerar_orcamento"
        |
        v
[FASE 2] Gemini Vision analisa a imagem da planta aprovada
        |  Extrai: area, perimetros, janelas, portas, WCs, pe-direito
        |
        v
[FASE 3] Gera Mapa de Quantidades estruturado (JSON)
        |  Categorias: Estrutura, Revestimentos, Isolamentos,
        |  Fundacoes, Cobertura, Caixilharias, Acabamentos, etc.
        |  Aplica regras de engenharia (desperdicio 10%, alturas, etc.)
        |
        v
[FASE 4] Cruza quantidades com precos_materiais (205 itens no BD)
        |  Seleciona materiais conforme nivel de acabamento
        |  (Base / Media / Premium)
        |
        v
[FASE 5] Calcula orcamento detalhado
        |  Materiais + Mao de obra + Margem (35-40%)
        |  Grava na tabela "orcamentos"
        |
        v
[FASE 6] Gera PDF profissional
        |  Com logotipo, categorias, subtotais, total
        |
        v
[FASE 7] Upload PDF para Google Drive + Envio WhatsApp
```

---

# FASES DE IMPLEMENTACAO

## FASE 1 - Preparacao da Base de Dados
**Estimativa:** Rapido
**Dependencias:** Nenhuma

### 1.1 Limpar categorias duplicadas em precos_materiais

Problema atual: Existem categorias duplicadas com nomes diferentes
- "Isolamento" (11) vs "ISOLAMENTOS" (3)
- "Revestimentos" (8) vs "REVESTIMENTOS" (8)
- "Cobertura" (6) vs "COBERTURA" (5)
- "Fundacoes" (7) vs "FUNDACOES" (3)
- "Geral" (34) precisa ser redistribuido por categorias proprias

**Acao:** Normalizar todas as categorias para MAIUSCULAS e redistribuir "Geral"

### 1.2 Popular tabela composicoes

A tabela existe mas esta vazia. Composicoes sao essenciais para o orcamento.
Exemplo: "Parede Exterior LSF Completa" = perfis + OSB + barreira vapor + isolamento + ETICS

**Acao:** Criar composicoes tipo:
- Parede exterior LSF (Base / Media / Premium)
- Parede interior LSF (Base / Media / Premium)
- Cobertura (Base / Media / Premium)
- Fundacao tipo
- WC completo (Base / Media / Premium)
- Cozinha (Base / Media / Premium)

### 1.3 Validar precos e unidades

**Acao:** Verificar que todos os 205 materiais tem unidades e precos coerentes

---

## FASE 2 - Workflow Orcamentista (n8n)
**Dependencias:** Fase 1

### 2.1 Estrutura do Sub-workflow "Gerar Orcamento LSF"

```
Execute Workflow Trigger
    |  Input: { planta_image_url, lead_id, nivel_acabamento }
    |
    v
Buscar Planta (Postgres)
    |  Busca imagem base64 / link Drive da planta aprovada
    |
    v
Chamar Gemini Vision API
    |  Prompt de extracao de quantitativos
    |  Input: imagem da planta
    |  Output: JSON com area, perimetros, janelas, portas, WCs
    |
    v
Validar Extracao (Code Node)
    |  Verifica se dados extraidos fazem sentido
    |  area_bruta > 30m2, perimetros > 0, etc.
    |
    v
Gerar Mapa de Quantidades (Code Node)
    |  Aplica regras de engenharia LSF:
    |  - Altura parede ext = pe_direito + 0.20 + 0.70 = ~3.70m
    |  - Altura parede int = pe_direito + 0.20 = ~3.00m
    |  - Desperdicio LSF = 10%
    |  - Calcula kg de aco, m2 de placas, ml de perfis, etc.
    |
    v
Consultar Precos (Postgres)
    |  SELECT de precos_materiais por codigo
    |  Filtra por nivel de acabamento (Base/Media/Premium)
    |
    v
Calcular Orcamento (Code Node)
    |  quantidade * preco_unitario = subtotal por item
    |  Subtotais por categoria
    |  Margem (35-40%)
    |  Total geral
    |
    v
Gravar Orcamento (Postgres)
    |  INSERT na tabela "orcamentos"
    |  Guarda JSON completo dos quantitativos e valores
    |
    v
Gerar PDF (Code Node ou HTTP Request)
    |  Template profissional com:
    |  - Logo ObrasNet
    |  - Dados do cliente
    |  - Tabela por categorias
    |  - Subtotais e total
    |
    v
Upload PDF (Google Drive)
    |
    v
Enviar WhatsApp (Evolution API)
    |  Envia PDF + mensagem ao cliente
    |
    v
Retornar Resultado ao Agente
```

### 2.2 Prompt Gemini Vision (Extracao de Quantitativos)

Deve instruir o Gemini a:
- Analisar a planta 2D
- Identificar todas as divisoes
- Medir/estimar areas e perimetros
- Contar janelas, portas, WCs
- Retornar JSON estruturado

### 2.3 Logica de Calculo (Code Node)

Baseado no `mapa_quantidades.js` existente + regras do `Mapa_de_quantidade.md`:

```
Categorias de calculo:
1. ESTRUTURA LSF
   - Aco ext: perimetro_ext * altura_ext * 25kg/m2 * 1.10
   - Aco int: perimetro_int * altura_int * 18kg/m2 * 1.10

2. REVESTIMENTOS
   - OSB exterior: perimetro_ext * altura_ext * 1.10
   - Gesso cartonado: (perimetro_ext + perimetro_int*2) * altura_int * 1.10
   - Placas WC: hidrófugas

3. ISOLAMENTOS
   - Exterior ETICS: perimetro_ext * altura_ext
   - Interior la mineral: perimetro_ext * altura_int
   - Cobertura: area_bruta

4. FUNDACOES
   - Escavacao: perimetro_ext * 0.60 * 0.80
   - Betao: perimetro_ext * 0.40 * 0.60
   - Ferro: ~80kg/m3 betao

5. COBERTURA
   - Painel sandwich: area_bruta * 1.05
   - Subestrutura: area_bruta

6. CAIXILHARIAS
   - Janelas: conforme lista extraida
   - Portas interiores: quantidade
   - Porta exterior: quantidade

7. ACABAMENTOS
   - Pavimento: area_bruta
   - Pintura int: area total paredes
   - Pintura ext: perimetro_ext * altura_ext
   - Loucas sanitarias: por WC
```

---

## FASE 3 - Geracao de PDF
**Dependencias:** Fase 2

### 3.1 Opcoes de geracao de PDF no n8n

**Opcao A - HTML to PDF (recomendada)**
- Criar template HTML com CSS profissional
- Usar servico externo (ex: html-pdf-service) ou n8n community node
- Vantagem: controlo total do layout

**Opcao B - Google Docs Template**
- Criar template no Google Docs
- Preencher via API
- Exportar como PDF
- Vantagem: facil de editar o template depois

**Opcao C - Code Node com biblioteca**
- Usar PDFKit ou similar (se disponivel no n8n sandbox)
- Pode ter mesma limitacao que o sharp

### 3.2 Estrutura do PDF

```
+------------------------------------------+
|  [LOGO OBRASNET]                         |
|  ORCAMENTO DE CONSTRUCAO LSF             |
|  Data: DD/MM/AAAA | Ref: ORC-XXXX       |
+------------------------------------------+
|  Cliente: [Nome]                         |
|  Tipologia: T3 | Area: 150 m2           |
|  Nivel: Gama Media                       |
+------------------------------------------+
|                                          |
|  1. FUNDACOES                            |
|  +---------+--------+------+-----------+ |
|  | Item    | Qtd    | P.Un | Subtotal  | |
|  +---------+--------+------+-----------+ |
|  | Betao   | 12 m3  | 95   | 1.140,00  | |
|  | Ferro   | 960 kg | 1.15 | 1.104,00  | |
|  +---------+--------+------+-----------+ |
|  Subtotal Fundacoes:        2.244,00 EUR |
|                                          |
|  2. ESTRUTURA LSF                        |
|  ...                                     |
|                                          |
|  3. REVESTIMENTOS                        |
|  ...                                     |
|                                          |
+------------------------------------------+
|  RESUMO                                  |
|  Materiais:              XX.XXX,XX EUR   |
|  Mao de Obra:            XX.XXX,XX EUR   |
|  Margem (35%):           XX.XXX,XX EUR   |
|  ----------------------------------------|
|  TOTAL:                  XX.XXX,XX EUR   |
+------------------------------------------+
|  Validade: 30 dias                       |
|  Condicoes: [texto]                      |
+------------------------------------------+
```

---

## FASE 4 - Integracao com Agente Principal
**Dependencias:** Fase 2 e 3

### 4.1 Registar nova Tool no Agente

No workflow Qualificador WhatsApp (GcLmgtWBpqtApjR7):
- Adicionar Tool "gerar_orcamento_lsf" (tipo toolWorkflow)
- Conectar ao sub-workflow Orcamentista
- Parametros: lead_id, nivel_acabamento (base/medio/premium)

### 4.2 Atualizar System Prompt do Agente

Adicionar instrucoes para:
- Quando o cliente aprovar a planta, perguntar o nivel de acabamento
- Explicar as 3 gamas (Base, Media, Premium)
- Chamar a tool gerar_orcamento_lsf com os parametros corretos
- Apresentar o resultado ao cliente

### 4.3 Fluxo da conversa esperado

```
Cliente: "Gostei da planta, pode avancar"
Agente:  "Otimo! Para preparar o orcamento, que nivel de acabamento prefere?
          - Gama Base (materiais standard)
          - Gama Media (melhor relacao qualidade/preco)
          - Gama Premium (topo de gama)"
Cliente: "Gama media"
Agente:  [chama gerar_orcamento_lsf(lead_id, "media")]
         "Aqui esta o seu orcamento detalhado: [link PDF]
          Resumo: Area 150m2 | Total: 127.500 EUR
          O orcamento tem validade de 30 dias."
```

---

## FASE 5 - Atualizacao Automatica de Precos
**Dependencias:** Fase 1

### 5.1 Workflow "Update Prices Weekly" (Xp25ExS55ALZLx3S)

Ja existe no n8n. Configurar:
- Schedule Trigger: Semanal (domingo 03:00)
- Fontes: Leroy Merlin, Obras360 (via Firecrawl)
- Logica: Comparar preco novo vs atual
- Se variacao > 5%: atualizar e registar no historico_precos
- Notificacao Telegram se variacao > 15%

### 5.2 Fontes prioritarias para scraping

1. Leroy Merlin (acabamentos, tintas, sanitarios)
2. Obras360 (material geral LSF)
3. CYPE Gerador de Precos (referencia profissional)

---

# ORDEM DE EXECUCAO

```
FASE 1 - Base de Dados: CONCLUIDA (13/02/2026)
  [x] Fase 1.1 - Normalizar categorias precos_materiais (31 -> 16 categorias)
  [x] Fase 1.2 - Popular composicoes (26 composicoes, 139 itens)
  [x] Fase 1.3 - Validar precos (205 materiais OK, preco_total auto-gerado)

FASE 2 - Workflow Orcamentista: CONCLUIDA (13/02/2026)
  [x] Fase 2.1 - Sub-workflow Orcamentista Native (eV1txGMzmqOnuWyO) - 11 nodes
  [x] Fase 2.2 - Prompt Gemini Vision para extracao de quantitativos
  [x] Fase 2.3 - Logica de calculo com composicoes (3 niveis acabamento)

FASE 3 - PDF e Entrega: CONCLUIDA (13/02/2026)
  [x] Fase 3.1 - Template HTML profissional (CSS integrado)
  [x] Fase 3.2 - Conversao HTML->PDF via html2pdf.app API
  [x] Fase 3.3 - Upload Google Drive + retorno ao agente

FASE 4 - Integracao Agente: CONCLUIDA (13/02/2026)
  [x] Fase 4.1 - Tool "gerar_orcamento_detalhado" adicionada ao agente
  [x] Fase 4.2 - System Prompt atualizado com instrucoes da nova tool
  [x] Agente agora tem 4 ferramentas ativas

FASE 4.5 - Testes e Correcoes: CONCLUIDA (13/02/2026)
  [x] Teste BD: 205 materiais, 26 composicoes, 16 categorias - OK
  [x] Teste Gemini Vision API - OK
  [x] Teste HTML2PDF API - OK (conta ativada)
  [x] Teste Google Drive - OK (credenciais identicas ao Gerar Planta)
  [x] Teste Agente 4 tools conectadas - OK
  [x] Teste WhatsApp Evolution API - OK (instancia OPEN)
  [x] Corrigido: Registo corrompido plantas_geradas ID=35 (apagado)
  [x] Corrigido: Filtro mensagens nao-texto adicionado (fix_whatsapp_filter.py)
  [x] Verificar API key html2pdf.app - OK (funcional)
  [x] Google Drive credentials - OK (8oMgulYphwSk79Zb, iguais ao workflow funcional)

PENDENTE:
  [ ] Fase 4.3 - Teste end-to-end completo com lead real (via WhatsApp)
  [ ] Fase 5.1 - Configurar Update Prices Weekly
```

---

# RISCOS E MITIGACOES

| Risco | Impacto | Mitigacao |
|-------|---------|-----------|
| Gemini Vision nao extrai dados corretos da planta | Alto | Prompt iterativo + validacao de sanidade dos dados |
| Precos desatualizados | Medio | Workflow semanal de atualizacao + campo valido_ate |
| PDF nao funciona no n8n (como sharp) | Medio | Usar Google Docs API como fallback |
| Orcamento com valores irrealistas | Alto | Comparar com custos_base (EUR/m2) como sanity check |
| Cliente pede alteracao ao orcamento | Baixo | Campo versao na tabela orcamentos + historico_revisoes |

---

# METRICAS DE SUCESSO

1. Orcamento gerado em < 60 segundos apos aprovacao
2. Erro maximo de 15% vs orcamento manual de referencia
3. PDF profissional com todas as categorias
4. Cliente recebe PDF no WhatsApp automaticamente
5. Precos atualizados semanalmente sem intervencao manual

---

**Documento:** PLANO_EXECUCAO.md
**Criado:** 2026-02-13
**Responsavel:** LSF Intelligence AI
