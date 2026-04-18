/**
 * Portfolio slug → engineering DB projeto mapping.
 *
 * Each entry corresponds to a historical WordPress URL that had backlinks
 * and search authority before the /portfolio/* → /plantas redirect killed it.
 * We preserve the exact slug to inherit backlinks, and render real data from
 * the engineering DB (projetos + plantas_geradas + orcamentos).
 *
 * Area mismatch policy: when the URL advertises an area that differs from the
 * real planta in the DB (e.g. "75m²" URL but projeto 118 is 110m²), the page
 * displays the REAL area from the DB. The URL stays untouched.
 */

export interface PortfolioEntry {
  /** URL slug — exact match to old WP URL for backlink preservation */
  slug: string;
  /** Engineering DB projeto_id used as data source */
  projetoId: number;
  /** H1 shown on the page */
  h1: string;
  /** Tipologia as advertised in the URL (may differ from real data) */
  urlTipologia: string;
  /** Area as advertised in the URL (may differ from real data) */
  urlAreaM2: number | null;
  /** Meta title (<= 60 chars recommended) */
  metaTitle: string;
  /** Meta description (<= 160 chars recommended) */
  metaDescription: string;
  /** Subtitle under the H1 */
  heroSubtitle: string;
}

export const PORTFOLIO_ENTRIES: PortfolioEntry[] = [
  {
    slug: "casas-modulares-t3-preco-chave-na-mao-com-75-m2",
    projetoId: 118,
    h1: "Casa Modular T3 Chave na Mão",
    urlTipologia: "T3",
    urlAreaM2: 75,
    metaTitle: "Casa Modular T3 Chave na Mão | Preço m² 2026 | Casas LSF",
    metaDescription:
      "Casa modular T3 em LSF chave na mão. Planta 2D, especificações técnicas e preço real. Projectos de 75 a 150m². Orçamento grátis em 48h.",
    heroSubtitle:
      "Modelo refinado e aprovado pelo cliente. Construção LSF chave na mão em Portugal.",
  },
  {
    slug: "casas-modulares-t2-t3-preco-chave-na-mao-com-100-m2",
    projetoId: 118,
    h1: "Casa Modular T2/T3 com 100m² Chave na Mão",
    urlTipologia: "T3",
    urlAreaM2: 100,
    metaTitle: "Casa Modular T2/T3 100m² Chave na Mão | Preço 2026 | Casas LSF",
    metaDescription:
      "Moradia modular T2 ou T3 com cerca de 100m² em Light Steel Framing. Planta 2D, preço chave na mão e orçamento personalizado.",
    heroSubtitle:
      "Compacta e funcional. Ideal para casal com 1-2 filhos ou turismo local.",
  },
  {
    slug: "casas-pre-fabricadas-150m2",
    projetoId: 478,
    h1: "Casa Pré-fabricada T3 com 150m²",
    urlTipologia: "T3",
    urlAreaM2: 150,
    metaTitle: "Casa Pré-fabricada T3 150m² | Preço Chave na Mão 2026 | Casas LSF",
    metaDescription:
      "Casa pré-fabricada em LSF com 150m², tipologia T3, 1 piso. Planta 2D, preço chave na mão e especificações completas.",
    heroSubtitle:
      "Moradia T3 de 150m² aprovada e orçamentada. Gama Média.",
  },
  {
    slug: "moradias-t3-em-lsf-com-125m2",
    projetoId: 439,
    h1: "Moradia T3 em LSF — 125 a 178m²",
    urlTipologia: "T3",
    urlAreaM2: 125,
    metaTitle: "Moradia T3 em LSF 125-178m² | Chave na Mão 2026 | Casas LSF",
    metaDescription:
      "Moradia T3 em Light Steel Framing com áreas entre 125 e 178m². Planta 2D, especificações LSF e preço real.",
    heroSubtitle:
      "T3 versátil — adaptável em área e disposição interior.",
  },
  {
    slug: "moradia-t3-com-170m2-em-lsf-light-steel-framing",
    projetoId: 439,
    h1: "Moradia T3 170m² em LSF (Light Steel Framing)",
    urlTipologia: "T3",
    urlAreaM2: 170,
    metaTitle: "Moradia T3 170m² LSF Chave na Mão | Preço 2026 | Casas LSF",
    metaDescription:
      "Moradia T3 em LSF com cerca de 170m². Planta 2D, orçamento real, prazo de execução e todas as especificações.",
    heroSubtitle:
      "T3 espaçosa com áreas generosas. Construção LSF moderna e eficiente.",
  },
  {
    slug: "moradia-familiar-t3-em-aco-leve-chave-na-mao-100m2",
    projetoId: 453,
    h1: "Moradia Familiar T3 em Aço Leve 100m²",
    urlTipologia: "T3",
    urlAreaM2: 100,
    metaTitle: "Moradia T3 Aço Leve 100m² Chave na Mão | 2026 | Casas LSF",
    metaDescription:
      "Moradia familiar T3 em aço leve (LSF) com cerca de 100m². Planta 2D, preço chave na mão e especificações técnicas.",
    heroSubtitle:
      "Construção em aço leve: rápida, sísmica e eficiente termicamente.",
  },
  {
    slug: "vivenda-t4-em-lsf-com-170m2",
    projetoId: 6,
    h1: "Vivenda T4 em LSF 170m²",
    urlTipologia: "T4",
    urlAreaM2: 170,
    metaTitle: "Vivenda T4 LSF 170m² Chave na Mão | Preço 2026 | Casas LSF",
    metaDescription:
      "Vivenda T4 em LSF com cerca de 170m². Planta 2D, preço chave na mão, prazo de execução e especificações técnicas completas.",
    heroSubtitle:
      "Vivenda familiar T4 — 4 quartos, 2 WC, sala ampla. Construção LSF.",
  },
  {
    slug: "moradia-familiar-t4",
    projetoId: 6,
    h1: "Moradia Familiar T4 em LSF",
    urlTipologia: "T4",
    urlAreaM2: null,
    metaTitle: "Moradia Familiar T4 em LSF | Chave na Mão 2026 | Casas LSF",
    metaDescription:
      "Moradia familiar T4 em Light Steel Framing. Áreas entre 160 e 200m², planta 2D, preço chave na mão e especificações LSF.",
    heroSubtitle:
      "T4 para famílias numerosas — 4 quartos, espaços sociais amplos.",
  },
];

export const PORTFOLIO_BY_SLUG: Record<string, PortfolioEntry> =
  Object.fromEntries(PORTFOLIO_ENTRIES.map((e) => [e.slug, e]));

/** 5 FAQs shared across all portfolio pages (for FAQPage JSON-LD). */
export const COMMON_FAQS = [
  {
    pergunta: "Quanto tempo demora a construir uma casa LSF?",
    resposta:
      "Uma moradia T3 em LSF demora tipicamente 4 a 6 meses após obtenção do licenciamento camarário. A estrutura metálica propriamente dita leva 3 a 4 semanas; o restante tempo é alocado a fundações, acabamentos, instalações e controlo de qualidade.",
  },
  {
    pergunta: "O preço indicado já inclui tudo?",
    resposta:
      "O preço 'chave na mão' indicado inclui: estrutura LSF completa, isolamentos, canalizações, electricidade, revestimentos exterior e interior, loiças sanitárias e equipamento de cozinha base. Não inclui: terreno, projecto de arquitectura, licenças camarárias e arranjos exteriores.",
  },
  {
    pergunta: "Posso adaptar a planta às minhas necessidades?",
    resposta:
      "Sim. As plantas do portfolio são modelos base que servem de referência. Adaptamos à sua família, terreno e preferências — mantendo sempre a eficiência estrutural e térmica do sistema LSF.",
  },
  {
    pergunta: "Como é o processo de orçamento?",
    resposta:
      "Envie-nos o terreno e preferências pelo formulário do simulador. Em 24-48h devolvemos uma estimativa preliminar. Após confirmação do interesse, um técnico visita o terreno e produzimos o orçamento detalhado por categoria (13 categorias técnicas).",
  },
  {
    pergunta: "A OBRASNET tem alvará de construção?",
    resposta:
      "Sim. A OBRASNET UNIP LDA tem Alvará IMPIC nº 94665 e NIF 515 866 989, habilitada para construção nova, remodelação e obras estruturais em Portugal continental e ilhas.",
  },
];

/** 300-word E-E-A-T boilerplate shared across portfolio pages. */
export const COMMON_BOILERPLATE = `A construção em Light Steel Framing (LSF) utiliza perfis de aço galvanizado leve como estrutura principal, substituindo os pilares e vigas de betão armado ou paredes de tijolo da construção tradicional. É um sistema industrializado, modular e rigorosamente dimensionado — cada parede, cada vão de janela e cada pé direito é calculado em ambiente BIM antes da montagem em obra.

Em Portugal, o LSF tem ganho expressão desde 2020 por três razões principais. Primeiro, o preço por m² é 25 a 35% inferior à alvenaria tradicional para o mesmo nível de acabamento. Segundo, o prazo de execução é 3 a 4 vezes mais rápido — uma T3 de 150m² fica pronta em 4 a 6 meses versus 12 a 18 meses em alvenaria. Terceiro, o desempenho térmico e acústico é superior, resultando em facturas de climatização 40 a 60% mais baixas.

A OBRASNET UNIP LDA (Alvará IMPIC 94665, NIF 515 866 989) constrói moradias LSF chave na mão em Portugal continental e ilhas. Todos os projectos seguem o processo: briefing com o cliente, projecto de arquitectura, projectos de especialidades (estabilidade, térmico, acústico), licenciamento camarário, execução da obra e direcção técnica por engenheiro habilitado.

Cada modelo deste portfolio é baseado em projectos reais, refinados com o cliente até aprovação e posteriormente orçamentados com as 13 categorias técnicas necessárias (fundações, estrutura, cobertura, vãos, revestimentos, etc.). Os valores apresentados são referências reais de orçamentos concluídos — o seu projecto pode variar consoante terreno, acabamentos escolhidos, geometria e zona climática.

O sistema LSF é compatível com qualquer estilo arquitectónico: contemporâneo-minimalista, rústico-contemporâneo português, mediterrâneo moderno, industrial-loft, ou tradicional. A estrutura é invisível — o resultado final, visto de fora, é indistinguível de uma construção em alvenaria.`;
