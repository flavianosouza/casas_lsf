"""
Script para inserir os 10 artigos SEO iniciais na base de dados.
Executar: python seed_artigos.py

Requer DATABASE_URL no ambiente ou no .env
"""

import asyncio
import os
import sys
from datetime import datetime, timezone

# Adicionar o directorio pai ao path
sys.path.insert(0, os.path.dirname(__file__))

from dotenv import load_dotenv

load_dotenv()

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://postgres:0f9bef7cf6128aa6952f@casas_lsf:5432/postgres?sslmode=disable",
)

parsed = urlparse(DATABASE_URL)
query_params = parse_qs(parsed.query)
ssl_mode = query_params.pop("sslmode", [None])[0]
clean_query = urlencode({k: v[0] for k, v in query_params.items()})
CLEAN_URL = urlunparse(parsed._replace(query=clean_query))

connect_args = {}
if ssl_mode == "disable":
    connect_args["ssl"] = False

engine = create_async_engine(CLEAN_URL, connect_args=connect_args)
AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

from app.models import Artigo, Base

ARTIGOS = [
    {
        "titulo": "Casas LSF em Portugal: Guia Completo 2026",
        "slug": "casas-lsf-portugal-guia-completo",
        "categoria": "construcao",
        "tags": ["LSF", "Portugal", "guia", "construcao"],
        "meta_title": "Casas LSF em Portugal: Guia Completo 2026 | Casas LSF",
        "meta_description": "Tudo sobre construcao em Light Steel Framing em Portugal. Custos, prazos, vantagens, legislacao e como comecar o seu projecto LSF em 2026.",
        "resumo": "Descubra tudo sobre a construcao em Light Steel Framing em Portugal: custos por metro quadrado, prazos de obra, vantagens face a alvenaria, legislacao aplicavel e como iniciar o seu projecto.",
        "conteudo_html": """<h2>O que e o Light Steel Framing (LSF)?</h2>
<p>O Light Steel Framing (LSF) e um sistema construtivo que utiliza perfis de aco galvanizado leve como estrutura principal da edificacao. Originario da America do Norte, este metodo tem vindo a ganhar cada vez mais expressao em Portugal, sobretudo desde 2020.</p>
<p>A estrutura e composta por perfis em forma de C e U, com espessuras entre 0,8mm e 2,5mm, que substituem os tradicionais pilares e vigas de betao armado. O resultado e uma construcao mais leve, mais rapida e com excelente desempenho termico e acustico.</p>

<h2>Porque escolher LSF em Portugal?</h2>
<p>Portugal apresenta condicoes ideais para a adopcao do LSF:</p>
<ul>
<li><strong>Clima temperado</strong> — O isolamento termico superior do LSF reduz drasticamente os custos com climatizacao</li>
<li><strong>Risco sismico</strong> — A estrutura em aco leve oferece excelente comportamento anti-sismico</li>
<li><strong>Custos de construcao elevados</strong> — O LSF pode ser 25% a 35% mais economico que a alvenaria tradicional</li>
<li><strong>Falta de mao de obra</strong> — A montagem e mais rapida e requer menos trabalhadores especializados em alvenaria</li>
</ul>

<h2>Custos de construcao LSF em 2026</h2>
<p>Os custos de construcao em LSF em Portugal variam conforme o nivel de acabamento:</p>
<ul>
<li><strong>Acabamento basico</strong>: 750 a 900 euros/m2</li>
<li><strong>Acabamento medio</strong>: 900 a 1.150 euros/m2</li>
<li><strong>Acabamento premium</strong>: 1.150 a 1.500 euros/m2</li>
</ul>
<p>Estes valores incluem estrutura, isolamentos, revestimentos, instalacoes electricas e de canalizacao, e acabamentos interiores. Nao incluem terreno, projecto de arquitectura nem licenciamento.</p>

<h2>Prazos de construcao</h2>
<p>Uma das maiores vantagens do LSF e a velocidade de construcao:</p>
<ul>
<li><strong>T2 (80-100m2)</strong>: 3 a 4 meses</li>
<li><strong>T3 (120-150m2)</strong>: 4 a 5 meses</li>
<li><strong>T4 (160-200m2)</strong>: 5 a 7 meses</li>
</ul>
<p>Comparativamente, a mesma moradia em alvenaria demoraria entre 10 a 18 meses.</p>

<h2>Legislacao e licenciamento</h2>
<p>Em Portugal, as casas em LSF seguem o mesmo processo de licenciamento que qualquer outra construcao. E necessario:</p>
<ol>
<li>Projecto de arquitectura aprovado pela camara municipal</li>
<li>Projectos de especialidades (estabilidade, termico, acustico, etc.)</li>
<li>Alvara de construcao</li>
<li>Direccao tecnica de obra por tecnico habilitado</li>
</ol>
<p>A OBRASNET possui o Alvara IMPIC n.o 94665, que garante a capacidade legal para executar obras de construcao em Portugal.</p>

<h2>Como comecar o seu projecto LSF</h2>
<p>O processo para iniciar a construcao da sua casa em LSF e simples:</p>
<ol>
<li><strong>Simulacao online</strong> — Use o nosso simulador gratuito para ter uma estimativa de custos</li>
<li><strong>Consulta tecnica</strong> — A nossa equipa analisa o seu terreno e necessidades</li>
<li><strong>Projecto</strong> — Desenvolvemos o projecto de arquitectura e especialidades</li>
<li><strong>Construcao</strong> — Executamos a obra com acompanhamento permanente</li>
</ol>""",
    },
    {
        "titulo": "Quanto custa construir uma casa LSF em Portugal",
        "slug": "quanto-custa-casa-lsf-portugal",
        "categoria": "construcao",
        "tags": ["custos", "precos", "orcamento", "LSF", "Portugal"],
        "meta_title": "Quanto Custa uma Casa LSF em Portugal em 2026? Precos Reais",
        "meta_description": "Precos actualizados de construcao LSF em Portugal: 750 a 1500 euros/m2. Veja custos por tipologia T1 a T4, o que esta incluido e como poupar.",
        "resumo": "Precos actualizados de construcao em Light Steel Framing em Portugal para 2026. Custos por metro quadrado, por tipologia, o que esta incluido no orcamento e estrategias para optimizar o investimento.",
        "conteudo_html": """<h2>Precos de construcao LSF em 2026</h2>
<p>O custo de construcao de uma casa em LSF em Portugal depende de varios factores: area, tipologia, nivel de acabamento, localizacao e complexidade do projecto. Apresentamos valores medios actualizados para 2026.</p>

<h2>Custo por metro quadrado</h2>
<p>Os precos praticados no mercado portugues para construcao LSF chave-na-mao:</p>
<ul>
<li><strong>Nivel Economico</strong>: 750 a 900 euros/m2 — Acabamentos funcionais, materiais standard</li>
<li><strong>Nivel Medio</strong>: 900 a 1.150 euros/m2 — Bons acabamentos, materiais de qualidade media-alta</li>
<li><strong>Nivel Premium</strong>: 1.150 a 1.500 euros/m2 — Acabamentos de luxo, domomotica, eficiencia energetica A+</li>
</ul>

<h2>Custo por tipologia (valores medios)</h2>
<p>Para um acabamento de nivel medio, os custos totais aproximados sao:</p>
<ul>
<li><strong>T1 (50-65m2)</strong>: 50.000 a 75.000 euros</li>
<li><strong>T2 (80-100m2)</strong>: 80.000 a 115.000 euros</li>
<li><strong>T3 (120-150m2)</strong>: 120.000 a 170.000 euros</li>
<li><strong>T4 (160-200m2)</strong>: 160.000 a 230.000 euros</li>
</ul>

<h2>O que esta incluido no preco</h2>
<p>Um orcamento LSF chave-na-mao inclui tipicamente:</p>
<ul>
<li>Fundacoes (sapatas ou ensoleiramento geral)</li>
<li>Estrutura em perfis de aco galvanizado</li>
<li>Isolamento termico e acustico (la mineral + XPS)</li>
<li>Revestimentos exteriores (ETICS, fachada ventilada ou painel sandwich)</li>
<li>Revestimentos interiores (gesso cartonado, pintura)</li>
<li>Instalacoes electricas e de canalizacao completas</li>
<li>Louca sanitaria e torneiras</li>
<li>Caixilharia em aluminio com corte termico e vidro duplo</li>
<li>Pavimentos (ceramico ou flutuante)</li>
</ul>

<h2>O que NAO esta incluido</h2>
<ul>
<li>Terreno</li>
<li>Projecto de arquitectura (3.000 a 8.000 euros)</li>
<li>Projectos de especialidades (2.000 a 5.000 euros)</li>
<li>Licenciamento camarario (taxas variaveis por municipio)</li>
<li>Arranjos exteriores, piscina, garagem independente</li>
</ul>

<h2>LSF vs Alvenaria: comparacao de custos</h2>
<p>Em media, construir em LSF e 25% a 35% mais barato do que em alvenaria tradicional para a mesma area e nivel de acabamento. A poupanca deve-se a:</p>
<ul>
<li>Menos mao de obra necessaria</li>
<li>Prazo de obra 3x inferior (menos custos indirectos)</li>
<li>Menor desperdicio de materiais</li>
<li>Fundacoes mais leves e economicas</li>
</ul>

<h2>Como obter um orcamento personalizado</h2>
<p>Utilize o nosso simulador online para obter uma estimativa em menos de 2 minutos. Basta indicar a tipologia desejada, area aproximada e localizacao do terreno.</p>""",
    },
    {
        "titulo": "LSF vs Alvenaria: Qual escolher em Portugal",
        "slug": "lsf-vs-alvenaria-portugal",
        "categoria": "construcao",
        "tags": ["LSF", "alvenaria", "comparacao", "Portugal"],
        "meta_title": "LSF vs Alvenaria em Portugal: Comparacao Completa 2026",
        "meta_description": "Comparacao detalhada entre construcao LSF e alvenaria em Portugal. Custos, prazos, isolamento, durabilidade e qual o melhor metodo para si.",
        "resumo": "Comparacao detalhada entre construcao em Light Steel Framing e alvenaria tradicional em Portugal. Analisamos custos, prazos, isolamento termico, durabilidade, resistencia sismica e valor de revenda.",
        "conteudo_html": """<h2>Dois metodos, duas filosofias</h2>
<p>A construcao em Portugal tem sido dominada pela alvenaria de tijolo e betao armado durante decadas. No entanto, o Light Steel Framing (LSF) tem ganhado expressao significativa, especialmente apos a pandemia de 2020. Mas qual e realmente melhor para o contexto portugues?</p>

<h2>Custo de construcao</h2>
<p><strong>LSF: 750-1.150 euros/m2</strong> (medio)<br/>
<strong>Alvenaria: 1.100-1.600 euros/m2</strong> (medio)</p>
<p>O LSF apresenta uma vantagem de custo de 25% a 35% face a alvenaria, principalmente devido a menor necessidade de mao de obra e prazos de obra muito inferiores.</p>

<h2>Prazo de construcao</h2>
<p><strong>LSF: 3-6 meses</strong> (T2 a T4)<br/>
<strong>Alvenaria: 10-18 meses</strong> (T2 a T4)</p>
<p>O LSF e aproximadamente 3 vezes mais rapido. Isto deve-se ao facto de ser um sistema de construcao a seco, sem tempos de cura de betao, e com grande parte dos elementos pre-fabricados.</p>

<h2>Isolamento termico</h2>
<p><strong>LSF: Superior</strong> — A parede tipica LSF (15cm de la mineral + XPS exterior) atinge coeficientes de transmissao termica (U) de 0,25 a 0,30 W/m2K.</p>
<p><strong>Alvenaria: Bom</strong> — A parede dupla de tijolo com isolamento na caixa de ar atinge U de 0,45 a 0,55 W/m2K.</p>
<p>O LSF oferece isolamento termico 40% a 50% superior, traduzindo-se em poupanca significativa em aquecimento e arrefecimento.</p>

<h2>Resistencia sismica</h2>
<p><strong>LSF: Excelente</strong> — A estrutura em aco leve e flexivel e distribui as cargas sismicas de forma eficiente.</p>
<p><strong>Alvenaria: Boa</strong> — Com estrutura de betao armado bem calculada, resiste adequadamente, mas e mais pesada e rigida.</p>

<h2>Durabilidade</h2>
<p>Ambos os sistemas, quando bem executados, tem durabilidade superior a 50 anos. O aco galvanizado do LSF tem proteccao anti-corrosao garantida para mais de 100 anos em condicoes normais.</p>

<h2>Valor de revenda</h2>
<p>Em Portugal, o mercado ja aceita casas em LSF sem penalizacao no valor de revenda. Os bancos concedem credito habitacao para casas LSF nas mesmas condicoes que para alvenaria.</p>

<h2>Veredicto</h2>
<p>Para a maioria dos projectos residenciais em Portugal, o LSF oferece vantagens claras em custo, prazo e eficiencia energetica. A alvenaria continua a ser uma boa opcao para quem prefere o metodo tradicional ou para projectos com requisitos estruturais muito especificos.</p>""",
    },
    {
        "titulo": "Como financiar a construcao da sua casa LSF",
        "slug": "financiar-construcao-casa-lsf",
        "categoria": "financiamento",
        "tags": ["financiamento", "credito", "banco", "construcao"],
        "meta_title": "Financiar Casa LSF: Credito Habitacao para Construcao 2026",
        "meta_description": "Como obter credito habitacao para construir casa LSF em Portugal. Bancos que financiam, documentos necessarios, taxas de juro e dicas praticas.",
        "resumo": "Guia completo sobre financiamento de casas em Light Steel Framing em Portugal. Quais bancos financiam, que documentos precisa, como funciona o credito para construcao e dicas para obter melhores condicoes.",
        "conteudo_html": """<h2>Os bancos financiam casas LSF?</h2>
<p>Sim. Em 2026, a grande maioria dos bancos portugueses ja financia construcao em LSF nas mesmas condicoes que a alvenaria. Isto inclui o CGD, Millennium BCP, Santander, Novo Banco, BPI e Bankinter, entre outros.</p>
<p>A unica exigencia adicional e que o construtor tenha alvara IMPIC adequado e que os projectos de especialidades estejam aprovados.</p>

<h2>Tipos de credito para construcao</h2>
<p>Existem duas modalidades principais:</p>
<ul>
<li><strong>Credito para construcao</strong> — Financiamento libertado por tranches conforme o avanco da obra. Ideal para quem ja tem terreno.</li>
<li><strong>Credito para aquisicao de terreno + construcao</strong> — Financiamento que cobre a compra do terreno e a construcao da casa num unico emprestimo.</li>
</ul>

<h2>Documentos necessarios</h2>
<p>Para solicitar credito para construcao LSF, necessita de:</p>
<ul>
<li>Escritura ou contrato de compra do terreno</li>
<li>Caderneta predial do terreno</li>
<li>Projecto de arquitectura aprovado pela camara</li>
<li>Orcamento detalhado do construtor (com alvara IMPIC)</li>
<li>Cronograma de obra</li>
<li>Documentos pessoais (IRS, recibos de vencimento, declaracao da entidade patronal)</li>
</ul>

<h2>Condicoes tipicas em 2026</h2>
<ul>
<li><strong>Financiamento maximo</strong>: 80% a 90% do valor da avaliacao</li>
<li><strong>Prazo maximo</strong>: 30 a 40 anos</li>
<li><strong>Taxa de juro</strong>: Euribor + spread de 0,9% a 1,5%</li>
<li><strong>Seguro multiriscos</strong>: Obrigatorio</li>
</ul>

<h2>Vantagem do LSF no financiamento</h2>
<p>Como o custo total de construcao em LSF e inferior ao da alvenaria, o montante a financiar e menor, o que resulta em:</p>
<ul>
<li>Prestacoes mensais mais baixas</li>
<li>Maior facilidade na aprovacao do credito</li>
<li>Menor racio de esforco financeiro</li>
</ul>

<h2>Dicas praticas</h2>
<ol>
<li>Compare propostas de pelo menos 3 bancos</li>
<li>Negocie o spread — nao aceite a primeira proposta</li>
<li>Considere taxas mistas (fixa nos primeiros 5 anos + variavel depois)</li>
<li>Certifique-se que o construtor tem alvara IMPIC activo</li>
<li>Peca uma pre-aprovacao antes de comprar o terreno</li>
</ol>""",
    },
    {
        "titulo": "Vantagens e desvantagens de casas em aco leve",
        "slug": "vantagens-desvantagens-casas-aco-leve",
        "categoria": "construcao",
        "tags": ["vantagens", "desvantagens", "LSF", "aco leve"],
        "meta_title": "Vantagens e Desvantagens de Casas LSF em Aco Leve",
        "meta_description": "As 10 principais vantagens e 5 desvantagens de casas em aco leve (LSF). Analise honesta para ajudar na sua decisao de construcao em Portugal.",
        "resumo": "Analise honesta e completa das vantagens e desvantagens da construcao em Light Steel Framing. O que deve saber antes de decidir construir a sua casa em aco leve em Portugal.",
        "conteudo_html": """<h2>10 Vantagens do LSF</h2>

<h3>1. Custo inferior</h3>
<p>Construir em LSF custa entre 25% a 35% menos do que em alvenaria tradicional, para o mesmo nivel de acabamento e area.</p>

<h3>2. Construcao rapida</h3>
<p>Uma casa T3 fica pronta em 4 a 5 meses, contra 12 a 18 meses em alvenaria. Menos tempo de obra significa menos custos indirectos.</p>

<h3>3. Excelente isolamento termico</h3>
<p>As paredes LSF atingem coeficientes de transmissao termica (U) muito inferiores ao exigido pela regulamentacao portuguesa, garantindo conforto e poupanca energetica.</p>

<h3>4. Resistencia sismica</h3>
<p>A estrutura em aco leve e flexivel e distribui as forcas sismicas de forma eficiente, sendo ideal para zonas de risco sismico como o centro e sul de Portugal.</p>

<h3>5. Leveza da estrutura</h3>
<p>Uma casa LSF pesa cerca de 1/3 de uma casa em alvenaria, permitindo fundacoes mais leves e economicas.</p>

<h3>6. Precisao dimensional</h3>
<p>Os perfis de aco sao fabricados com tolerancias milimetricas, garantindo esquadrias perfeitas e menos desperdicio.</p>

<h3>7. Sustentabilidade</h3>
<p>O aco e 100% reciclavel e a construcao a seco gera ate 80% menos residuos em obra.</p>

<h3>8. Sem problemas de humidade</h3>
<p>A construcao a seco elimina os problemas de humidade de construcao tipicos da alvenaria, que podem demorar meses a secar.</p>

<h3>9. Facilidade de ampliacao</h3>
<p>Ampliar uma casa LSF e mais simples e menos invasivo do que em alvenaria. A estrutura modular facilita a adicao de divisoes ou pisos.</p>

<h3>10. Classe energetica elevada</h3>
<p>E relativamente facil atingir classe energetica A ou A+ com LSF, sem custos adicionais significativos.</p>

<h2>5 Desvantagens a considerar</h2>

<h3>1. Percepcao do mercado</h3>
<p>Ainda existe algum preconceito em Portugal contra casas que nao sejam em tijolo e betao. Esta percepcao esta a mudar rapidamente, mas convem estar ciente.</p>

<h3>2. Isolamento acustico requer atencao</h3>
<p>Se nao for bem projectado, o LSF pode transmitir mais ruido de impacto. Com os materiais correctos (la mineral densa, placas acusticas), o problema e facilmente resolvido.</p>

<h3>3. Limitacoes em paredes para cargas pesadas</h3>
<p>Pendurar objectos muito pesados (moveis de cozinha, televisores grandes) requer reforcos localizados na estrutura. Isto deve ser planeado na fase de projecto.</p>

<h3>4. Menos construtores especializados</h3>
<p>Em Portugal, o numero de construtores com experiencia real em LSF ainda e inferior ao da alvenaria. Escolha uma empresa com alvara IMPIC e portfolio comprovado.</p>

<h3>5. Necessidade de projecto adequado</h3>
<p>O LSF exige projectos de especialidades especificos. Nao e possivel adaptar directamente um projecto de alvenaria para LSF sem revisao tecnica.</p>""",
    },
    {
        "titulo": "Tempo de construcao de uma casa LSF",
        "slug": "tempo-construcao-casa-lsf",
        "categoria": "construcao",
        "tags": ["prazo", "tempo", "construcao", "cronograma"],
        "meta_title": "Tempo de Construcao de uma Casa LSF: Cronograma Real",
        "meta_description": "Quanto tempo demora a construir uma casa LSF em Portugal? Cronograma detalhado por fase: fundacoes, estrutura, isolamento e acabamentos.",
        "resumo": "Cronograma detalhado de construcao de uma casa em Light Steel Framing em Portugal. Quanto tempo demora cada fase, do terreno a chave na mao, e factores que influenciam o prazo.",
        "conteudo_html": """<h2>Prazos reais de construcao LSF</h2>
<p>Uma das principais vantagens do Light Steel Framing e a velocidade de construcao. Enquanto uma casa em alvenaria demora tipicamente 12 a 18 meses, uma casa LSF pode ficar pronta em 3 a 6 meses apos o inicio da obra.</p>

<h2>Cronograma por fase</h2>

<h3>Fase 1: Fundacoes (2-3 semanas)</h3>
<p>As fundacoes de uma casa LSF sao mais leves que as de alvenaria, tipicamente uma laje de ensoleiramento geral com 15-20cm de espessura. A escavacao, armacao, betonagem e cura demoram entre 2 a 3 semanas.</p>

<h3>Fase 2: Montagem da estrutura (1-2 semanas)</h3>
<p>Esta e a fase mais impressionante. A estrutura completa de uma casa T3 e montada em apenas 5 a 10 dias. Os perfis de aco chegam a obra ja cortados e identificados, prontos para montagem.</p>

<h3>Fase 3: Cobertura (1 semana)</h3>
<p>A colocacao da estrutura de cobertura, impermeabilizacao e telha ou painel sandwich demora cerca de 1 semana. A partir deste momento, a construcao esta protegida das intemperies.</p>

<h3>Fase 4: Isolamento e revestimentos exteriores (2-3 semanas)</h3>
<p>Colocacao do isolamento termico (la mineral, XPS), barreiras de vapor, OSB e revestimento exterior (ETICS ou fachada ventilada).</p>

<h3>Fase 5: Instalacoes tecnicas (2-3 semanas)</h3>
<p>Passagem de tubagens e cablagem para electricidade, canalizacao de agua e esgotos, AVAC, telecomunicacoes e gas. No LSF, esta fase e mais rapida porque as tubagens passam pelo interior dos perfis.</p>

<h3>Fase 6: Revestimentos interiores (2-3 semanas)</h3>
<p>Colocacao das placas de gesso cartonado, tratamento de juntas, pavimentos e revestimentos ceramicos nas casas de banho e cozinha.</p>

<h3>Fase 7: Acabamentos finais (2-3 semanas)</h3>
<p>Pintura, colocacao de louca sanitaria, caixilharia, portas interiores, moveis de cozinha e ligacoes finais de electricidade e canalizacao.</p>

<h2>Prazos totais por tipologia</h2>
<ul>
<li><strong>T1 (50-65m2)</strong>: 2,5 a 3,5 meses</li>
<li><strong>T2 (80-100m2)</strong>: 3 a 4 meses</li>
<li><strong>T3 (120-150m2)</strong>: 4 a 5 meses</li>
<li><strong>T4 (160-200m2)</strong>: 5 a 7 meses</li>
</ul>

<h2>Factores que influenciam o prazo</h2>
<ul>
<li>Complexidade arquitectonica do projecto</li>
<li>Condicoes do terreno (acessos, topografia)</li>
<li>Condicoes meteorologicas (fase de fundacoes)</li>
<li>Disponibilidade de materiais</li>
<li>Alteracoes ao projecto durante a obra</li>
</ul>""",
    },
    {
        "titulo": "Casas LSF sao seguras? Sismos, vento e fogo",
        "slug": "casas-lsf-seguras-sismos-vento-fogo",
        "categoria": "construcao",
        "tags": ["seguranca", "sismos", "fogo", "resistencia"],
        "meta_title": "Casas LSF sao Seguras? Resistencia a Sismos, Vento e Fogo",
        "meta_description": "As casas LSF sao seguras em Portugal? Analise tecnica da resistencia sismica, ao vento e ao fogo das casas em aco leve. Dados e normas europeias.",
        "resumo": "Analise tecnica da seguranca das casas em Light Steel Framing em Portugal. Resistencia sismica, comportamento ao vento, proteccao contra incendio e o que dizem as normas europeias.",
        "conteudo_html": """<h2>A questao da seguranca</h2>
<p>Uma das preocupacoes mais frequentes de quem considera construir em LSF e a seguranca. Sera que uma casa em aco leve resiste a sismos? E ao vento? E ao fogo? Vamos analisar cada aspecto com base em dados tecnicos e normas europeias.</p>

<h2>Resistencia sismica</h2>
<p>Portugal esta numa zona de risco sismico moderado a elevado, especialmente no centro e sul do pais. A boa noticia e que o LSF tem um comportamento sismico excelente.</p>
<p>Porquefunciona bem:</p>
<ul>
<li><strong>Leveza</strong> — Uma casa LSF pesa cerca de 1/3 de uma casa em alvenaria. Menor massa significa menores forcas sismicas.</li>
<li><strong>Ductilidade</strong> — O aco e um material ductil que se deforma antes de romper, absorvendo energia sismica.</li>
<li><strong>Distribuicao de cargas</strong> — A estrutura em paineis distribui as forcas por toda a superficie, em vez de as concentrar em pontos especificos.</li>
<li><strong>Ligacoes aparafusadas</strong> — Permitem micro-movimentos que dissipam energia sismica.</li>
</ul>
<p>O LSF cumpre integralmente os Eurocodigos (EC8 — Projecto de estruturas para resistencia aos sismos) e e usado extensivamente em zonas de alta sismicidade como o Japao, Chile e Nova Zelandia.</p>

<h2>Resistencia ao vento</h2>
<p>As casas LSF sao projectadas para resistir a ventos conforme o Eurocodigo 1, incluindo rajadas fortes tipicas de zonas costeiras portuguesas. A estrutura e calculada para:</p>
<ul>
<li>Pressao do vento sobre fachadas e cobertura</li>
<li>Succao do vento (forca que puxa a cobertura para cima)</li>
<li>Ancoragens adequadas a fundacao</li>
</ul>

<h2>Resistencia ao fogo</h2>
<p>O aco nao arde. Ao contrario do que muitos pensam, as casas LSF oferecem excelente resistencia ao fogo:</p>
<ul>
<li><strong>Placas de gesso cartonado</strong> — O revestimento standard (2 placas de 12,5mm) oferece resistencia ao fogo de 60 minutos (EI60).</li>
<li><strong>La mineral</strong> — O isolamento em la de rocha e incombustivel e resiste a temperaturas superiores a 1.000 graus Celsius.</li>
<li><strong>Sem propagacao</strong> — Ao contrario da madeira, o aco nao alimenta o fogo nem contribui para a sua propagacao.</li>
</ul>
<p>Com as solucoes adequadas, uma parede LSF pode atingir classificacao REI120 (2 horas de resistencia ao fogo), superando os requisitos minimos da regulamentacao portuguesa.</p>

<h2>Conclusao</h2>
<p>As casas LSF sao tao seguras ou mais seguras que as casas em alvenaria, desde que sejam projectadas e construidas por profissionais qualificados e seguindo as normas europeias aplicaveis.</p>""",
    },
    {
        "titulo": "Terrenos para construcao em Lisboa e Sintra",
        "slug": "terrenos-construcao-lisboa-sintra",
        "categoria": "terrenos",
        "tags": ["terrenos", "Lisboa", "Sintra", "compra"],
        "meta_title": "Terrenos para Construcao em Lisboa e Sintra: Guia 2026",
        "meta_description": "Guia para comprar terreno para construcao em Lisboa e Sintra. Precos, zonas, PDM, viabilidade de construcao e o que verificar antes de comprar.",
        "resumo": "Guia pratico para encontrar e comprar terrenos para construcao na regiao de Lisboa e Sintra. Precos por zona, verificacoes obrigatorias, PDM e viabilidade de construcao.",
        "conteudo_html": """<h2>O mercado de terrenos em Lisboa e Sintra</h2>
<p>A procura de terrenos para construcao na regiao de Lisboa e Sintra tem crescido significativamente, impulsionada pelo custo elevado da habitacao existente e pela opcao cada vez mais popular de construir de raiz em LSF.</p>

<h2>Precos medios por zona (2026)</h2>
<ul>
<li><strong>Sintra (interior)</strong>: 30 a 80 euros/m2</li>
<li><strong>Sintra (litoral/Colares)</strong>: 80 a 200 euros/m2</li>
<li><strong>Cascais/Estoril</strong>: 200 a 500 euros/m2</li>
<li><strong>Mafra/Ericeira</strong>: 40 a 120 euros/m2</li>
<li><strong>Loures/Odivelas</strong>: 80 a 200 euros/m2</li>
<li><strong>Almada/Seixal</strong>: 60 a 150 euros/m2</li>
<li><strong>Setubal/Palmela</strong>: 30 a 80 euros/m2</li>
</ul>

<h2>O que verificar antes de comprar</h2>

<h3>1. PDM (Plano Director Municipal)</h3>
<p>Verifique se o terreno esta classificado como solo urbano e se permite construcao residencial. Consulte o PDM do municipio respectivo na camara municipal ou online.</p>

<h3>2. Viabilidade de construcao</h3>
<p>Solicite um pedido de informacao previa (PIP) a camara municipal. Este documento confirma se e possivel construir no terreno e quais os parametros urbanisticos aplicaveis (area de implantacao, cercea, numero de pisos).</p>

<h3>3. Infraestruturas</h3>
<p>Verifique se o terreno tem acesso a:</p>
<ul>
<li>Rede publica de agua</li>
<li>Rede publica de esgotos</li>
<li>Rede electrica</li>
<li>Acessos viarios</li>
</ul>

<h3>4. Topografia e geologia</h3>
<p>Terrenos muito inclinados ou com solo rochoso podem encarecer significativamente as fundacoes. Um estudo geologico-geotecnico (500 a 1.500 euros) pode evitar surpresas.</p>

<h3>5. Onus e encargos</h3>
<p>Verifique na certidao predial se existem hipotecas, penhoras, servidoes ou outros onus sobre o terreno.</p>

<h2>Dimensao ideal do terreno para LSF</h2>
<p>Para uma moradia unifamiliar confortavel, recomendamos:</p>
<ul>
<li><strong>T2</strong>: terreno minimo de 250-350m2</li>
<li><strong>T3</strong>: terreno minimo de 350-500m2</li>
<li><strong>T4</strong>: terreno minimo de 500-700m2</li>
</ul>
<p>Estes valores consideram a area de implantacao da casa, estacionamento, jardim e distancias obrigatorias aos limites do terreno.</p>

<h2>Onde procurar terrenos</h2>
<ul>
<li>Idealista, Imovirtual, Supercasa</li>
<li>Juntas de freguesia e camaras municipais (hasta publica)</li>
<li>Imobiliarias locais especializadas em terrenos</li>
<li>Contactar directamente proprietarios em zonas de interesse</li>
</ul>""",
    },
    {
        "titulo": "Projecto de arquitectura para casa LSF: o que precisa",
        "slug": "projecto-arquitectura-casa-lsf",
        "categoria": "construcao",
        "tags": ["projecto", "arquitectura", "licenciamento", "especialidades"],
        "meta_title": "Projecto de Arquitectura para Casa LSF: Guia Completo",
        "meta_description": "O que precisa para o projecto de arquitectura de uma casa LSF em Portugal. Especialidades, custos, prazos de aprovacao e como escolher o arquitecto.",
        "resumo": "Tudo sobre o projecto de arquitectura para casas LSF em Portugal. Quais as especialidades necessarias, custos envolvidos, prazos de aprovacao camararia e como escolher o arquitecto certo.",
        "conteudo_html": """<h2>O projecto de arquitectura para LSF</h2>
<p>Construir uma casa em LSF em Portugal requer os mesmos projectos e aprovacoes que qualquer outra construcao. O processo e regulado pelo RJUE (Regime Juridico da Urbanizacao e Edificacao) e exige a intervencao de tecnicos habilitados.</p>

<h2>Projectos necessarios</h2>

<h3>Projecto de arquitectura</h3>
<p>Elaborado por arquitecto inscrito na Ordem dos Arquitectos. Define a organizacao espacial, fachadas, materiais e integracao urbanistica. E o projecto principal para submissao a camara municipal.</p>

<h3>Projecto de estabilidade</h3>
<p>Elaborado por engenheiro civil ou de estruturas. No caso do LSF, define o dimensionamento de todos os perfis de aco, ligacoes, ancoragens e fundacoes. Este projecto deve ser especifico para LSF — nao pode ser uma adaptacao de um projecto de alvenaria.</p>

<h3>Projecto termico (RCCTE/REH)</h3>
<p>Define as solucoes de isolamento termico para garantir o cumprimento do Regulamento de Desempenho Energetico dos Edificios de Habitacao. No LSF, e relativamente facil atingir classes energeticas A e A+.</p>

<h3>Projecto acustico (RRAE)</h3>
<p>Define as solucoes construtivas para garantir isolamento acustico conforme o Regulamento dos Requisitos Acusticos dos Edificios.</p>

<h3>Outras especialidades</h3>
<ul>
<li>Projecto de aguas e esgotos</li>
<li>Projecto de electricidade e telecomunicacoes</li>
<li>Projecto de gas (se aplicavel)</li>
<li>Projecto de AVAC (aquecimento, ventilacao e ar condicionado)</li>
<li>Projecto de seguranca contra incendio</li>
</ul>

<h2>Custos dos projectos</h2>
<ul>
<li><strong>Projecto de arquitectura</strong>: 3.000 a 8.000 euros (varia com a complexidade e area)</li>
<li><strong>Projectos de especialidades (pacote completo)</strong>: 2.000 a 5.000 euros</li>
<li><strong>Total estimado</strong>: 5.000 a 13.000 euros</li>
</ul>

<h2>Prazos de aprovacao</h2>
<p>Apos submissao do projecto a camara municipal:</p>
<ul>
<li><strong>Informacao previa (PIP)</strong>: 20 a 30 dias uteis</li>
<li><strong>Licenciamento</strong>: 30 a 60 dias uteis (pode variar por municipio)</li>
<li><strong>Alvara de construcao</strong>: 15 a 30 dias uteis apos pagamento das taxas</li>
</ul>
<p>Na pratica, o processo completo de licenciamento demora entre 3 a 6 meses, dependendo do municipio e da complexidade do projecto.</p>

<h2>Como escolher o arquitecto</h2>
<ul>
<li>Verifique se tem experiencia com projectos LSF</li>
<li>Peca para ver portfolio de obras concluidas</li>
<li>Confirme que esta inscrito na Ordem dos Arquitectos</li>
<li>Solicite orcamento detalhado incluindo todas as especialidades</li>
<li>Defina claramente o ambito do trabalho num contrato escrito</li>
</ul>""",
    },
    {
        "titulo": "Licenciamento de construcao em Portugal: passo a passo",
        "slug": "licenciamento-construcao-portugal",
        "categoria": "construcao",
        "tags": ["licenciamento", "camara", "construcao", "legislacao"],
        "meta_title": "Licenciamento de Construcao em Portugal: Guia Passo a Passo",
        "meta_description": "Guia completo sobre o processo de licenciamento de construcao em Portugal. Da informacao previa ao alvara, taxas, prazos e documentos necessarios.",
        "resumo": "Guia passo a passo do processo de licenciamento de construcao em Portugal. Informacao previa, projecto, aprovacao camararia, alvara, taxas, prazos e documentos necessarios para construir legalmente.",
        "conteudo_html": """<h2>O processo de licenciamento</h2>
<p>Construir em Portugal — seja em alvenaria, LSF ou qualquer outro sistema — exige licenciamento camarario. O processo e regulado pelo RJUE (Decreto-Lei 555/99, alterado pelo DL 10/2024) e envolve varias etapas. Apresentamos um guia simplificado.</p>

<h2>Passo 1: Informacao Previa (PIP)</h2>
<p>Antes de comprar o terreno ou iniciar o projecto, pode solicitar uma informacao previa a camara municipal. Este documento confirma:</p>
<ul>
<li>Se o terreno permite construcao</li>
<li>Qual a area maxima de implantacao e construcao</li>
<li>Numero maximo de pisos</li>
<li>Afastamentos obrigatorios aos limites</li>
</ul>
<p><strong>Prazo</strong>: 20 a 30 dias uteis | <strong>Custo</strong>: 50 a 200 euros</p>

<h2>Passo 2: Elaboracao dos projectos</h2>
<p>Contrate um arquitecto para elaborar o projecto de arquitectura e um engenheiro para as especialidades (estrutura, termico, acustico, aguas, electricidade, gas, AVAC, incendio).</p>
<p><strong>Prazo</strong>: 1 a 3 meses | <strong>Custo</strong>: 5.000 a 13.000 euros</p>

<h2>Passo 3: Submissao do pedido de licenciamento</h2>
<p>O arquitecto submete o projecto de arquitectura na camara municipal (habitualmente online pelo portal do municipio). A camara analisa o projecto e pode:</p>
<ul>
<li><strong>Aprovar</strong> — O projecto cumpre todos os requisitos</li>
<li><strong>Pedir alteracoes</strong> — Necessidade de corrigir aspectos especificos</li>
<li><strong>Indeferir</strong> — O projecto nao cumpre os requisitos urbanisticos</li>
</ul>
<p><strong>Prazo</strong>: 30 a 60 dias uteis</p>

<h2>Passo 4: Submissao das especialidades</h2>
<p>Apos aprovacao do projecto de arquitectura, sao submetidos os projectos de especialidades. Estes sao analisados pelas entidades competentes (DGEG, ERSE, Proteccao Civil, etc.).</p>
<p><strong>Prazo</strong>: 15 a 45 dias uteis</p>

<h2>Passo 5: Emissao do alvara de construcao</h2>
<p>Com todos os projectos aprovados, e emitido o alvara de construcao apos pagamento das taxas municipais. Estas taxas variam significativamente entre municipios.</p>
<p><strong>Taxas tipicas</strong>: 1.000 a 5.000 euros (dependendo da area e municipio)</p>

<h2>Passo 6: Inicio e acompanhamento da obra</h2>
<p>Com o alvara emitido, pode iniciar a obra. Durante a construcao:</p>
<ul>
<li>A obra deve ter um director tecnico (engenheiro civil)</li>
<li>O construtor deve ter alvara IMPIC adequado</li>
<li>Deve comunicar o inicio da obra a ACT (Autoridade para as Condicoes do Trabalho)</li>
<li>A camara pode fazer vistorias durante a obra</li>
</ul>

<h2>Passo 7: Licenca de utilizacao</h2>
<p>Apos conclusao da obra, solicite a licenca de utilizacao. A camara faz uma vistoria final para verificar se a obra foi executada conforme os projectos aprovados.</p>
<p><strong>Prazo</strong>: 15 a 30 dias uteis</p>

<h2>Resumo de prazos e custos</h2>
<p>O processo completo de licenciamento, da informacao previa a licenca de utilizacao, demora tipicamente 4 a 8 meses e custa entre 6.000 a 18.000 euros (incluindo projectos e taxas).</p>""",
    },
]


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        for artigo_data in ARTIGOS:
            # Verificar se ja existe
            result = await session.execute(
                select(Artigo).where(Artigo.slug == artigo_data["slug"])
            )
            existing = result.scalar_one_or_none()
            if existing:
                print(f"  Ja existe: {artigo_data['slug']}")
                continue

            artigo = Artigo(
                **artigo_data,
                status="publicado",
                published_at=datetime.now(timezone.utc),
            )
            session.add(artigo)
            print(f"  Inserido: {artigo_data['slug']}")

        await session.commit()
        print("\nSeed concluido com sucesso!")


if __name__ == "__main__":
    asyncio.run(seed())
