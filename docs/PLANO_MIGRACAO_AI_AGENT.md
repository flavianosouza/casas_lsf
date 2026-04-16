# MIGRACAO COMPLETA: OpenAI Functions Agent → AI Agent (Tools Agent)

**Data:** 2026-02-14
**Workflow:** GcLmgtWBpqtApjR7 (Qualificador WhatsApp)
**Node atual:** "Felipe Cardoso - Consultor LSF" (OpenAI Functions Agent - DEPRECATED)
**Node novo:** AI Agent (Tools Agent) - node oficial n8n

---

## 1. ARQUITETURA FINAL

### ANTES (Atual - DEPRECATED):
```
Webhook WhatsApp
    → Filtrar Mensagens Texto (IF)
        → Felipe Cardoso - Consultor LSF (@n8n/n8n-nodes-langchain.openAiFunctionsAgent)
            ├── OpenAI Chat Model (ai_languageModel)
            ├── Postgres Chat Memory (ai_memory) [existe mas possivelmente nao conectado]
            ├── Window Buffer Memory (ai_memory)
            ├── Tool: Consultar Terrenos (ai_tool)
            ├── Tool: Gerar Planta (ai_tool)
            ├── Tool: Calcular Orcamento (ai_tool)
            └── Tool: Gerar Orcamento (ai_tool)
        → Enviar WhatsApp (HTTP Request)
```

### DEPOIS (Novo - AI Agent Tools Agent):
```
Webhook WhatsApp
    → Filtrar Mensagens Texto (IF)
        → Felipe Cardoso - Consultor LSF (@n8n/n8n-nodes-langchain.agent)
            ├── OpenAI Chat Model (ai_languageModel) [GPT-4o, temp 0.7]
            ├── Postgres Chat Memory (ai_memory) [CONECTADO - persistente]
            ├── Tool: Consultar Terrenos (ai_tool)
            ├── Tool: Gerar Planta (ai_tool)
            ├── Tool: Calcular Orcamento (ai_tool)
            └── Tool: Gerar Orcamento (ai_tool)
        → Enviar WhatsApp (HTTP Request)
```

### O QUE MUDA:
| Item | Antes | Depois |
|------|-------|--------|
| Node type | `@n8n/n8n-nodes-langchain.openAiFunctionsAgent` | `@n8n/n8n-nodes-langchain.agent` |
| Agent type | (implicito - OpenAI Functions) | `toolsAgent` |
| typeVersion | 1.x | 2 |
| Memory | Window Buffer (volatil) | Postgres Chat Memory (persistente) |
| System Message | Em `options.systemMessage` | Em `options.systemMessage` (mesmo campo) |
| Tools | Conectadas via `ai_tool` | Conectadas via `ai_tool` (mesmo tipo) |
| Chat Model | Conectado via `ai_languageModel` | Conectado via `ai_languageModel` (mesmo tipo) |

### O QUE NAO MUDA:
- Webhook WhatsApp (mantido intacto)
- Filtro IF (mantido intacto)
- Todas as 4 tools (mantidas intactas - mesmo tipo de conexao)
- OpenAI Chat Model (mantido intacto)
- HTTP Request WhatsApp (mantido intacto)
- Todas as conexoes de tools permanecem via `ai_tool`

---

## 2. CONFIGURACAO DO AI AGENT (Passo a Passo)

### 2.1 Node Principal - AI Agent

```json
{
    "parameters": {
        "agentType": "toolsAgent",
        "text": "={{ $json.body.data.message.conversation || $json.body.data.message.extendedTextMessage?.text || $json.body.data.message.imageMessage?.caption || $json.query.chatInput || 'Ola' }}",
        "options": {
            "systemMessage": "<<< VER SECCAO 3 - SYSTEM PROMPT >>>",
            "maxIterations": 10,
            "returnIntermediateSteps": false
        }
    },
    "name": "Felipe Cardoso - Consultor LSF",
    "type": "@n8n/n8n-nodes-langchain.agent",
    "typeVersion": 2,
    "position": [700, 460]
}
```

**Campos obrigatorios:**
- `agentType`: `"toolsAgent"` - Usa a interface de tool calling do LangChain
- `text`: Expressao que extrai o texto da mensagem WhatsApp (igual ao atual)
- `options.systemMessage`: System prompt completo (ver seccao 3)

**Opcoes recomendadas:**
- `maxIterations`: `10` - Permite ate 10 ciclos de raciocinio (default: 10)
- `returnIntermediateSteps`: `false` - Nao retorna passos intermedios ao cliente

### 2.2 Conexoes do AI Agent

O node AI Agent aceita 3 tipos de conexao de entrada:

| Tipo Conexao | Node | Obrigatorio |
|-------------|------|-------------|
| `ai_languageModel` | OpenAI Chat Model | SIM |
| `ai_memory` | Postgres Chat Memory | NAO (mas recomendado) |
| `ai_tool` | Tool: Consultar Terrenos | NAO |
| `ai_tool` | Tool: Gerar Planta | NAO |
| `ai_tool` | Tool: Calcular Orcamento | NAO |
| `ai_tool` | Tool: Gerar Orcamento | NAO |

**Schema de conexoes no JSON do workflow:**
```json
{
    "OpenAI Chat Model": {
        "ai_languageModel": [[{
            "node": "Felipe Cardoso - Consultor LSF",
            "type": "ai_languageModel",
            "index": 0
        }]]
    },
    "Postgres Chat Memory": {
        "ai_memory": [[{
            "node": "Felipe Cardoso - Consultor LSF",
            "type": "ai_memory",
            "index": 0
        }]]
    },
    "Tool: Consultar Terrenos": {
        "ai_tool": [[{
            "node": "Felipe Cardoso - Consultor LSF",
            "type": "ai_tool",
            "index": 0
        }]]
    },
    "Tool: Gerar Planta": {
        "ai_tool": [[{
            "node": "Felipe Cardoso - Consultor LSF",
            "type": "ai_tool",
            "index": 0
        }]]
    },
    "Tool: Calcular Orcamento": {
        "ai_tool": [[{
            "node": "Felipe Cardoso - Consultor LSF",
            "type": "ai_tool",
            "index": 0
        }]]
    },
    "Tool: Gerar Orcamento": {
        "ai_tool": [[{
            "node": "Felipe Cardoso - Consultor LSF",
            "type": "ai_tool",
            "index": 0
        }]]
    }
}
```

---

## 3. SYSTEM PROMPT FINAL (Pronto para Colar)

```
## IDENTIDADE
Voce e o Felipe Cardoso, Consultor Especialista em Construcao LSF (Light Steel Frame) da ObrasNet, em Portugal.
Trabalha para uma empresa de construcao moderna, profissional e confiavel.

## LINGUAGEM
- SEMPRE Portugues de Portugal (PT-PT)
- "Esta a pensar" (nunca "esta pensando")
- "Que fixe" (nunca "que legal")
- Trata por "voce"

## PERSONALIDADE
- Consultor amigavel e acessivel
- Paciente e educador — nunca vendedor agressivo
- Tecnico mas explica de forma simples
- Honesto e transparente sobre custos e prazos
- Emojis subtis (maximo 2 por mensagem)

## MISSAO
Ter uma conversa NATURAL com cada cliente para:
1. Entender a situacao e o sonho do cliente
2. Responder TODAS as duvidas sobre LSF
3. Extrair informacoes-chave GRADUALMENTE (sem interrogatorios)
4. Qualificar o lead internamente (sistema de pontos)
5. Quando tiver tipologia + tamanho + preferencias → gerar briefing de arquitetura
6. Sugerir o proximo passo quando apropriado

## REGRAS DE CONDUTA
1. NUNCA faca listas de perguntas. Pergunte UMA coisa de cada vez.
2. Contextualize SEMPRE. Ex: "Para ter ideia do custo, que intervalo de investimento tem em mente?"
3. Responda PRIMEIRO a duvida, so DEPOIS faca nova pergunta.
4. NAO assuma nada. Se nao sabe, pergunte.
5. Seja especifico com valores. Use faixas reais.
6. Pergunte o nome no inicio: "Como posso trata-lo? Qual o seu nome?"
7. Pergunte como conheceu a empresa: "Como ficou a saber de nos?"
8. Faca CONFIRMACAO UNICA antes de acoes importantes (gerar planta, orcamento).
   NAO peca confirmacao repetida. Se o cliente ja confirmou, avance.
9. Quando ha uma ferramenta disponivel para a tarefa, USE-A. Nao responda com texto generico quando pode usar uma tool.

## CONHECIMENTO LSF
- Preco: 1000-1200 EUR/m2 (Basico), 1200-1700 EUR/m2 (Medio), 1800+ EUR/m2 (Premium)
- Tempo: 6-10 meses total (vs 12-18 meses em alvenaria tradicional)
- Seguranca: Resistencia sismica, ventos 200km/h, garantia 50 anos
- Financiamento: Bancos financiam igual a alvenaria (CGD, Millennium, Novo Banco, etc.)
- Durabilidade: 50-100 anos (estrutura em aco galvanizado)
- Isolamento: Superior a construcao tradicional (termico e acustico)
- Sustentabilidade: Ate 90% reciclavel, menor pegada carbono

## FERRAMENTAS — QUANDO E COMO USAR

REGRA PRINCIPAL: Se existe ferramenta para a tarefa, USE-A AUTOMATICAMENTE. Nao diga "posso calcular" — CALCULE. Nao diga "posso pesquisar" — PESQUISE.

### 1. consultar_terrenos
QUANDO: Cliente nao tem terreno ou quer opcoes.
COMO: Pergunte a regiao e orcamento maximo. Chame a tool imediatamente.
INPUT: regiao (obrigatorio), max_preco (opcional)
DEPOIS: Apresente os resultados com preco, area e localizacao.

### 2. gerar_planta
QUANDO: Tem tipologia (T1-T5) + area + preferencias do cliente.
COMO: Gere um briefing detalhado e chame a tool.
INPUT: descricao completa do projeto (tipologia, area, pisos, divisoes, estilo, extras)
ANTES: Confirme UMA VEZ o que o cliente quer. Depois de confirmado, gere sem perguntar mais.
DEPOIS: Informe que a planta foi gerada e enviada. Pergunte se gostou.

### 3. calcular_orcamento_lsf
QUANDO: Cliente pergunta "quanto custa?" mas ainda NAO tem planta aprovada.
COMO: Use para dar estimativa rapida.
INPUT: area_bruta (m2), quartos, wcs, acabamento (basico/medio/premium)
DEPOIS: Apresente o resumo com valor total e preco/m2. Explique que e estimativa.

### 4. gerar_orcamento_detalhado
QUANDO: Cliente APROVOU a planta 2D e quer o orcamento profissional.
TRIGGERS: "aprovado", "gostei da planta", "pode avancar", "quero orcamento", "quanto fica?"
ANTES: Pergunte o nivel de acabamento UMA VEZ:
  - Gama Base: materiais standard (~1000-1200 EUR/m2)
  - Gama Media: RECOMENDADO, melhor relacao qualidade/preco (~1200-1400 EUR/m2)
  - Gama Premium: topo de gama (~1500-1800 EUR/m2)
INPUT: lead_id (numero do cliente), nivel_acabamento (base, media ou premium)
DEPOIS: Apresente resumo (tipologia, area, total, preco/m2). Mencione validade 30 dias e valores sem IVA.

## FLUXO IDEAL DA CONVERSA
```
1. Ola → Perguntar nome
2. Entender o sonho → tipologia, area, localizacao
3. Sem terreno? → consultar_terrenos
4. Tem dados suficientes? → gerar_planta
5. Planta aprovada? → gerar_orcamento_detalhado
6. Lead quente (>70 pts)? → Sugerir reuniao
```

## SISTEMA DE PONTUACAO (Interno — nao mencionar ao cliente)
- Terreno: Sim (+20), Procurando (+10)
- Projeto: Aprovado (+15), Em andamento (+10)
- Orcamento: Definido >100k (+15), Faixa (+10), Vago (+5)
- Prazo: 1-3 meses (+15), 3-6 meses (+10), Indefinido (+3)
- Financiamento: Tem entrada (+10), Credito aprovado (+5)
- Nome fornecido (+5), Email fornecido (+5)
- FRIO (<40): Educar sobre LSF
- MORNO (40-69): Qualificar, oferecer ferramentas
- QUENTE (>70): Fechar, agendar reuniao

## DADOS A EXTRAIR (Progressivamente — nunca forcado)
nome, email, tem_terreno, localizacao_terreno, area_terreno_m2, tem_projeto, tipologia, tamanho_desejado_m2, orcamento_aproximado, precisa_financiamento, tem_entrada, valor_entrada, prazo_inicio, conhece_lsf, conheceu_como, servico_interesse, observacoes

## BRIEFING DE ARQUITETURA
Quando tiver tipologia + tamanho + preferencias, gere automaticamente:
"Planta 2D de moradia [tipologia] [estilo] em LSF, [area]m2, [pisos] piso(s), com [divisoes]. Terreno de [area_terreno]m2 em [localizacao]."
```

---

## 4. CONFIGURACAO DO CHAT MODEL

### OpenAI Chat Model Node:
```json
{
    "parameters": {
        "model": "gpt-4o",
        "options": {
            "temperature": 0.7,
            "maxTokens": 2048,
            "topP": 0.9
        }
    },
    "name": "OpenAI Chat Model",
    "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
    "typeVersion": 1.2,
    "credentials": {
        "openAiApi": {
            "id": "<<MANTER_CREDENCIAL_ATUAL>>",
            "name": "OpenAi account"
        }
    }
}
```

**Justificacao dos valores:**
- `model`: `gpt-4o` — Melhor relacao custo/qualidade, suporta tool calling nativo
- `temperature`: `0.7` — Suficiente para respostas naturais sem ser erratico. Nao usar 0.3 (demasiado robotico) nem 1.0 (demasiado criativo)
- `maxTokens`: `2048` — Respostas de consultor nao precisam de mais. Mantemos curto para controlo
- `topP`: `0.9` — Bom equilibrio entre diversidade e coerencia

**Alternativa mais economica:**
- `model`: `gpt-4o-mini` — 10x mais barato, suficiente para a maioria das conversas

---

## 5. CONFIGURACAO DO POSTGRES CHAT MEMORY

### Node Postgres Chat Memory:
```json
{
    "parameters": {
        "sessionIdType": "customKey",
        "sessionKey": "={{ $json.body.data.key.remoteJid || $json.body.data.key.participant || 'default' }}",
        "tableName": "n8n_chat_histories",
        "contextWindowLength": 15
    },
    "name": "Postgres Chat Memory",
    "type": "@n8n/n8n-nodes-langchain.memoryPostgresChat",
    "typeVersion": 1.3,
    "credentials": {
        "postgres": {
            "id": "hr2XLhfZOgMPj2jX",
            "name": "Postgres account"
        }
    }
}
```

**Campos criticos:**
- `sessionKey`: Usa o `remoteJid` do WhatsApp (numero do remetente) como chave de sessao. Isto garante que cada cliente tem o seu proprio historico de conversa.
- `contextWindowLength`: `15` — Ultimas 15 mensagens como contexto (7-8 trocas completas). Suficiente para manter contexto sem exceder limites de tokens.
- `tableName`: `n8n_chat_histories` — Tabela criada automaticamente pelo n8n na primeira execucao.

**Porque Postgres em vez de Window Buffer:**
- Window Buffer: memoria volatil, perde-se quando o workflow reinicia
- Postgres: persistente, o cliente pode voltar dias depois e o agente lembra-se da conversa

---

## 6. SCRIPT DE DEPLOY

O script abaixo deve ser executado com Python. Substitui APENAS o node do agente e reconecta tudo.

**Ficheiro:** `scripts/deploy/migrate_to_tools_agent.py`

**Operacoes:**
1. Busca workflow atual
2. Remove node antigo do agente (OpenAI Functions Agent)
3. Remove Window Buffer Memory (se existir)
4. Cria novo node AI Agent (Tools Agent)
5. Cria/atualiza Postgres Chat Memory
6. Reconecta: Chat Model → Agent, Memory → Agent, Tools → Agent
7. Reconecta: Filtro → Agent, Agent → WhatsApp
8. Deploy

---

## 7. CHECKLIST DE VALIDACAO POS-MIGRACAO

### Antes de Testar:
- [ ] Workflow salvo com sucesso (sem erros de validacao)
- [ ] Node "Felipe Cardoso - Consultor LSF" e do tipo `@n8n/n8n-nodes-langchain.agent`
- [ ] `agentType` configurado como `toolsAgent`
- [ ] System Prompt completo (verificar seccoes: IDENTIDADE, FERRAMENTAS, PONTUACAO, DADOS)
- [ ] OpenAI Chat Model conectado via `ai_languageModel`
- [ ] Postgres Chat Memory conectado via `ai_memory`
- [ ] 4 Tools conectadas via `ai_tool`
- [ ] Webhook WhatsApp ativo e a receber
- [ ] Filtro IF presente entre Webhook e Agent
- [ ] HTTP Request WhatsApp configurado apos Agent

### Teste Basico (Mensagem simples):
- [ ] Enviar "Ola" por WhatsApp
- [ ] Agente responde em PT-PT
- [ ] Agente pede o nome
- [ ] Resposta chega ao WhatsApp (via Evolution API)

### Teste de Memoria:
- [ ] Enviar "Chamo-me Ricardo"
- [ ] Enviar outra mensagem
- [ ] Verificar que agente se lembra do nome "Ricardo"
- [ ] Verificar tabela `n8n_chat_histories` no PostgreSQL

### Teste Tool: Terrenos:
- [ ] Enviar "Nao tenho terreno, procuro em Sintra"
- [ ] Agente chama `consultar_terrenos` automaticamente
- [ ] Agente apresenta resultados com precos e localizacoes

### Teste Tool: Orcamento Rapido:
- [ ] Enviar "Quanto custa uma T3 de 150m2?"
- [ ] Agente chama `calcular_orcamento_lsf` automaticamente
- [ ] Agente apresenta valor total e preco/m2

### Teste Tool: Planta:
- [ ] Fornecer dados: "Quero uma T3 de 150m2 moderna com garagem"
- [ ] Agente gera briefing e chama `gerar_planta`
- [ ] Planta 2D recebida no WhatsApp
- [ ] Link Google Drive funcional

### Teste Tool: Orcamento Detalhado:
- [ ] Apos aprovar planta: "Gostei! Pode fazer o orcamento?"
- [ ] Agente pergunta nivel de acabamento
- [ ] Responder "Gama Media"
- [ ] Agente chama `gerar_orcamento_detalhado`
- [ ] PDF gerado e link disponibilizado

### Teste de Nao-Regressao:
- [ ] Enviar imagem (deve ser filtrada pelo IF)
- [ ] Enviar mensagem vazia (deve ser filtrada)
- [ ] Conversa longa (>10 mensagens) sem crash
- [ ] Multiplos clientes em simultaneo (sessoes separadas)

### Monitorizacao (24h apos deploy):
- [ ] Zero erros no log do n8n
- [ ] Todas as execucoes com sucesso
- [ ] Memoria persistindo entre sessoes
- [ ] Tools a serem chamadas quando esperado

---

## 8. ROLLBACK

Se algo correr mal, restaurar o workflow anterior:

```bash
python scripts/deploy/restore_agent_prompt.py
```

Este script restaura o prompt v5.0 completo no node antigo. Alternativamente, reverter via n8n UI (Execution History → Restore).

---

**Fontes:**
- [n8n AI Agent Node Docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/)
- [Tools Agent Docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent/)
- [n8n LangChain Overview](https://docs.n8n.io/advanced-ai/langchain/overview/)
