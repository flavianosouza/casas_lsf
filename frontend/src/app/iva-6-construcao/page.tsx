import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  CheckCircle,
  XCircle,
  ArrowRight,
  Scale,
  FileText,
  Receipt,
  Clock,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import InlineCta from "@/components/InlineCta";
import WhatsAppCta from "@/components/WhatsAppCta";
import AuthorSection from "@/components/AuthorSection";
import AssistantLazy from "@/components/assistant/AssistantLazy";

const SITE_URL = "https://casaslsf.com";

export const metadata: Metadata = {
  title: "IVA 6% na Construção LSF — Como Recuperar 17% em Portugal (2026)",
  description:
    "Guia completo sobre o IVA a 6% na construção nova em LSF. Como funciona o reembolso de 17% da Autoridade Tributária ao abrigo da Lei n.º 9-A/2026. Exemplo real e condições.",
  keywords: [
    "IVA 6 construção",
    "IVA 6% habitação própria permanente",
    "reembolso IVA autoconstrução",
    "IVA construção casa nova",
    "Lei 9-A/2026 IVA",
    "empreitada IVA 6%",
    "como recuperar IVA construção",
    "IVA empreitada habitação",
  ],
  alternates: { canonical: `${SITE_URL}/iva-6-construcao` },
  openGraph: {
    title: "IVA 6% na Construção LSF — Como Recuperar 17% em Portugal",
    description:
      "Mecanismo oficial de reembolso da Autoridade Tributária: empreitada a 23%, cliente recupera 17% em 150 dias. Lei 9-A/2026 explicada.",
    url: `${SITE_URL}/iva-6-construcao`,
    type: "article",
  },
};

const faqs = [
  {
    pergunta: "Posso ter IVA a 6% directo na factura da empreitada?",
    resposta:
      "Não, para construção nova em terreno próprio (autoconstrução via empreitada directa). A Lei n.º 9-A/2026 estabelece que o empreiteiro factura à taxa normal de 23% e é o cliente que requer o reembolso de 17% à Autoridade Tributária após a licença de utilização. Qualquer empreiteiro que facture directamente a 6% nestes casos está em incumprimento — o risco fiscal é transferido para o cliente numa inspecção.",
  },
  {
    pergunta: "Quanto tempo demora o reembolso de 17% pela AT?",
    resposta:
      "Até 150 dias após a entrega do pedido à Autoridade Tributária. O pedido deve ser apresentado no prazo máximo de 12 meses após a emissão da licença de utilização do imóvel.",
  },
  {
    pergunta: "Qual é o valor máximo do imóvel para beneficiar do regime?",
    resposta:
      "€660.982, correspondente ao 2.º escalão do IMT Jovem em 2026. Este limite aplica-se ao valor total da empreitada, não ao valor patrimonial.",
  },
  {
    pergunta: "E se vender a casa antes de 12 meses de habitação?",
    resposta:
      "A lei obriga o beneficiário a afectar o imóvel a habitação própria e permanente por um período mínimo de 12 meses. Quem vender antes disso (ou nunca vier a habitar como residência permanente) sofre um agravamento de 10 pontos percentuais no IMT da operação.",
  },
  {
    pergunta: "O reembolso aplica-se a renovações e reabilitações?",
    resposta:
      "Sim, mas por um mecanismo diferente. Reabilitação em Áreas de Reabilitação Urbana (ARU) já tinha taxa reduzida de 6% directa na factura (verba 2.23 do Código do IVA). Reabilitação fora de ARU de habitação própria permanente pode beneficiar do novo regime de reembolso da Lei 9-A/2026, com requisitos similares aos da construção nova.",
  },
  {
    pergunta: "Que documentos tenho que apresentar à AT para pedir o reembolso?",
    resposta:
      "Facturas da empreitada com NIF do cliente, descrição rigorosa do serviço (\"empreitada de construção\") e identificação do imóvel (artigo matricial, morada). Licença de utilização emitida pela Câmara Municipal. Comprovativo de afectação a habitação própria e permanente (alteração de morada fiscal ou contrato de fornecimento de electricidade/água).",
  },
  {
    pergunta: "A empreitada pode ser em fases? Cada factura conta?",
    resposta:
      "Sim. Contratar por fases (fundação, estrutura, acabamentos, etc.) continua a dar direito ao reembolso. Cada factura tem que cumprir os requisitos individualmente: NIF do cliente, descrição da empreitada e identificação do imóvel. O pedido à AT é agregado após o fim da obra.",
  },
  {
    pergunta: "O regime aplica-se a casas de férias ou 2.ª habitação?",
    resposta:
      "Não. Só imóveis destinados a habitação própria e permanente. 2.ª habitação, casa de férias, alojamento local ou imóveis para arrendamento (excepto com renda mensal ≤ €2.300) não qualificam.",
  },
  {
    pergunta: "Qual é o prazo de validade deste regime?",
    resposta:
      "Empreitadas iniciadas entre 25 de Setembro de 2025 e 31 de Dezembro de 2029, com IVA exigível até 31 de Dezembro de 2032. Quem iniciar a construção durante este período tem direito ao regime mesmo que conclua a obra depois.",
  },
  {
    pergunta:
      "Porque é que alguns empreiteiros oferecem facturar directamente a 6%?",
    resposta:
      "Existem duas possibilidades: (1) o projecto está em ARU e a verba 2.23 do CIVA aplica-se directamente — neste caso é legal; (2) fora de ARU, qualquer factura directa a 6% em construção nova é incumprimento fiscal. O empreiteiro não pode deduzir o IVA a 23% pago nos materiais e terá crédito contra o Estado — a única forma de absorver o custo é não declarar material formalmente, o que é fraude. Numa inspecção da AT, a factura pode ser desconsiderada e o cliente é obrigado a regularizar o IVA em falta.",
  },
];

const breadcrumbs = [
  { label: "Início", href: "/" },
  { label: "IVA 6% na Construção" },
];

function formatEur(v: number): string {
  return v.toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

export default function Iva6ConstrucaoPage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "IVA 6% na Construção LSF — Como Recuperar 17% em Portugal (Lei 9-A/2026)",
    description:
      "Guia técnico e legal sobre o mecanismo de reembolso de 17% do IVA em empreitadas de construção de habitação própria permanente, ao abrigo da Lei n.º 9-A/2026.",
    datePublished: "2026-04-18",
    dateModified: "2026-04-18",
    author: { "@type": "Organization", name: "OBRASNET UNIP LDA" },
    publisher: {
      "@type": "Organization",
      name: "Casas LSF",
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/iva-6-construcao` },
    articleSection: "Fiscalidade da Construção",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.pergunta,
      acceptedAnswer: { "@type": "Answer", text: f.resposta },
    })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Como recuperar 17% do IVA na construção LSF",
    description:
      "Passo a passo para obter o reembolso da diferença entre IVA 23% e IVA 6% na construção de habitação própria permanente.",
    step: [
      {
        "@type": "HowToStep",
        name: "Contratar empreitada com empresa fiscalmente registada",
        text: "O cliente contrata uma empresa de construção (OBRASNET UNIP LDA) para construir em terreno próprio. O contrato identifica o imóvel e o âmbito da empreitada.",
      },
      {
        "@type": "HowToStep",
        name: "Receber facturas com NIF e descrição rigorosa",
        text: "Cada factura emitida pelo empreiteiro deve conter o NIF do cliente, descrição como \"empreitada de construção\" e identificação do imóvel (morada e artigo matricial).",
      },
      {
        "@type": "HowToStep",
        name: "Obter licença de utilização",
        text: "Após conclusão da obra, o cliente obtém a licença de utilização junto da Câmara Municipal.",
      },
      {
        "@type": "HowToStep",
        name: "Submeter pedido de reembolso à AT",
        text: "No prazo máximo de 12 meses após a licença, o cliente submete o pedido à Autoridade Tributária com as facturas e documentação de suporte.",
      },
      {
        "@type": "HowToStep",
        name: "Receber reembolso de 17% em 150 dias",
        text: "A AT processa o pedido e efectua o reembolso da diferença entre os 23% facturados e os 6% devidos em 150 dias.",
      },
    ],
  };

  // Exemplo real — modelo T3 150m² do catálogo
  const exemploSemIva = 225959;
  const exemploIva23 = Math.round(exemploSemIva * 0.23);
  const exemploIva6 = Math.round(exemploSemIva * 0.06);
  const exemploReembolso = exemploIva23 - exemploIva6;
  const exemploTotal = exemploSemIva + exemploIva23;
  const exemploCustoEfectivo = exemploTotal - exemploReembolso;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <main className="min-h-screen bg-transparent py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} />

          <header className="mb-12 animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              Fiscalidade · Lei n.º 9-A/2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
              IVA 6% na Construção LSF —{" "}
              <span className="text-gradient">Como Recuperar 17%</span> em
              Portugal
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              Mecanismo oficial da Autoridade Tributária para construção de
              habitação própria permanente: empreitada facturada a 23% e
              reembolso de 17% ao cliente em 150 dias. Actualizado Abril 2026
              conforme Lei n.º 9-A/2026.
            </p>
          </header>

          <AssistantLazy />

          {/* TL;DR */}
          <section className="glass-card p-8 md:p-10 mb-12 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-black text-white">
                Resumo em 30 segundos
              </h2>
            </div>
            <ul className="space-y-3 text-gray-300 leading-relaxed">
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  OBRASNET factura a <strong>empreitada a 23%</strong>{" "}
                  (taxa normal obrigatória em construção nova).
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  Após a <strong>licença de utilização</strong>, o cliente
                  submete à AT as facturas + documentação.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  A AT devolve a <strong>diferença de 17%</strong> (23% − 6%)
                  em 150 dias.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  Obrigação: usar o imóvel como{" "}
                  <strong>habitação própria permanente ≥ 12 meses</strong>.
                </span>
              </li>
            </ul>
          </section>

          {/* Exemplo numérico */}
          <section className="glass-card p-8 md:p-10 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Exemplo real — casa T3 150m²
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Cálculo com base num{" "}
              <Link
                href="/plantas/tipologia/t3"
                className="text-blue-400 hover:underline"
              >
                modelo real T3 150m²
              </Link>{" "}
              do nosso catálogo, em acabamento standard.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <span className="text-gray-300">
                  Valor da empreitada (sem IVA)
                </span>
                <span className="text-white font-bold">
                  {formatEur(exemploSemIva)}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <span className="text-gray-300">
                  IVA facturado pela OBRASNET (23%)
                </span>
                <span className="text-white font-bold">
                  + {formatEur(exemploIva23)}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/10 border border-white/10">
                <span className="text-gray-200 font-semibold">
                  Total pago pelo cliente na obra
                </span>
                <span className="text-white font-bold">
                  {formatEur(exemploTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <span className="text-green-300 font-semibold">
                  − Reembolso da AT em 150 dias (17%)
                </span>
                <span className="text-green-300 font-black">
                  − {formatEur(exemploReembolso)}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <span className="text-white font-bold">
                  Custo efectivo final (equivalente a IVA 6%)
                </span>
                <span className="text-white font-black text-lg">
                  {formatEur(exemploCustoEfectivo)}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Valor do reembolso calculado como 17% × valor da empreitada sem
              IVA. Exige cumprimento dos requisitos da Lei 9-A/2026 (habitação
              própria permanente, facturas conformes, prazos).
            </p>
          </section>

          <InlineCta searchIntent="comercial" />

          {/* Passo a passo */}
          <section className="glass-card p-8 md:p-10 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
              Passo a passo do reembolso
            </h2>
            <ol className="space-y-6">
              {[
                {
                  icon: FileText,
                  titulo: "Contratar empreitada com NIF e imóvel identificados",
                  texto:
                    "O contrato com a OBRASNET identifica explicitamente o imóvel (morada, artigo matricial) e o âmbito dos trabalhos como empreitada de construção.",
                },
                {
                  icon: Receipt,
                  titulo: "Receber facturas conformes",
                  texto:
                    "Cada factura emitida durante a obra contém: NIF do cliente, descrição \"empreitada de construção\", identificação do imóvel e IVA a 23%. Pode ser factura única ou múltiplas faseadas.",
                },
                {
                  icon: CheckCircle,
                  titulo: "Obter licença de utilização",
                  texto:
                    "No final da obra, a Câmara emite a licença de utilização. É o documento que abre a janela de 12 meses para pedir o reembolso.",
                },
                {
                  icon: Scale,
                  titulo: "Submeter pedido à Autoridade Tributária",
                  texto:
                    "Dentro de 12 meses após a licença, o cliente submete o pedido à AT (via Portal das Finanças) com facturas + licença + comprovativo de afectação a habitação própria permanente.",
                },
                {
                  icon: Clock,
                  titulo: "Receber reembolso em 150 dias",
                  texto:
                    "A AT analisa e devolve a diferença de 17% no prazo máximo de 150 dias a contar da recepção do pedido.",
                },
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black">
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <step.icon className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-bold text-white">
                        {step.titulo}
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      {step.texto}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Quem qualifica */}
          <section className="glass-card p-8 md:p-10 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
              Quem qualifica — e quem não qualifica
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-lg font-black text-green-300">
                    Qualifica
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm leading-relaxed">
                  <li>
                    ✓ Construção nova de <strong>habitação própria e permanente</strong>
                  </li>
                  <li>✓ Cliente é proprietário do terreno</li>
                  <li>
                    ✓ Empreitada contratada directamente a empresa registada
                  </li>
                  <li>
                    ✓ Valor da obra ≤ <strong>€660.982</strong> (2.º escalão IMT Jovem)
                  </li>
                  <li>
                    ✓ Empreitada iniciada entre 25-Set-2025 e 31-Dez-2029
                  </li>
                  <li>
                    ✓ Imóvel afecto a HPP por período ≥ 12 meses após conclusão
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-red-400" />
                  <h3 className="text-lg font-black text-red-300">
                    Não qualifica
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm leading-relaxed">
                  <li>✗ Casa de férias ou 2.ª habitação</li>
                  <li>✗ Alojamento local (AL)</li>
                  <li>
                    ✗ Arrendamento com rendas &gt; €2.300/mês
                  </li>
                  <li>
                    ✗ Venda da casa antes de 12 meses (+10pp IMT)
                  </li>
                  <li>
                    ✗ Compra de kit / materiais em loja sem empreitada
                  </li>
                  <li>✗ Obras acima de €660.982</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Transparência — porque OBRASNET factura 23% */}
          <section className="glass-card p-8 md:p-10 mb-12 border border-amber-500/20">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Porque a OBRASNET factura a 23% e não a 6%?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Porque é o único caminho sustentável e legal para construção nova
              em terreno próprio. Empreiteiros que facturam directamente a 6%
              fora de ARU estão num de dois cenários:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-5 rounded-xl bg-white/5">
                <h3 className="text-white font-bold mb-2">
                  (a) Fraude fiscal
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Não declaram o material comprado a 23% e absorvem o risco.
                  Numa inspecção, a AT pode desconsiderar a factura e{" "}
                  <strong className="text-white">
                    exigir ao cliente a regularização da diferença
                  </strong>{" "}
                  — o cliente herda o risco do empreiteiro.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5">
                <h3 className="text-white font-bold mb-2">
                  (b) Cash flow insustentável
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Declaram correctamente mas ficam com crédito de IVA de 17%
                  do material contra o Estado. Esperam 6-12 meses por
                  reembolso à empresa — o que, com volume, pressiona margens
                  e leva à redução da qualidade dos materiais ou ao
                  incumprimento de prazos.
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              A <strong>Lei n.º 9-A/2026</strong> resolveu este problema ao
              mover o reembolso para o cliente final: o empreiteiro mantém
              cash flow saudável (23% IVA no material, 23% IVA na factura) e o
              cliente recebe os 17% directamente da AT. Ninguém financia
              ninguém — o mecanismo é neutro e protege todas as partes.
            </p>
          </section>

          {/* Fontes oficiais */}
          <section className="glass-card p-8 md:p-10 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Fontes oficiais e informação legal
            </h2>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                •{" "}
                <a
                  href="https://dre.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Diário da República — Lei n.º 9-A/2026 (6 de Março de 2026)
                </a>
                : autorização legislativa do pacote fiscal da habitação.
              </li>
              <li>
                •{" "}
                <a
                  href="https://www.portaldasfinancas.gov.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Portal das Finanças
                </a>
                : submissão do pedido de reembolso e consulta de situação
                fiscal.
              </li>
              <li>
                •{" "}
                <a
                  href="https://www.occ.pt/pt-pt/noticias/autoconstrucao-paga-iva-23-fisco-acerta-para-os-6-150-dias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Ordem dos Contabilistas Certificados — Autoconstrução paga
                  IVA 23%
                </a>
                : enquadramento técnico do mecanismo.
              </li>
              <li>
                •{" "}
                <a
                  href="https://www.idealista.pt/news/imobiliario/habitacao/2026/04/08/74807-autoconstrucao-como-recuperar-o-iva-de-17-na-obra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  idealista — Como recuperar o IVA de 17% na obra
                </a>
                : guia prático do processo.
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-6 leading-relaxed">
              Esta página tem valor informativo. Cada caso concreto deve ser
              validado com contabilista certificado, dada a complexidade
              fiscal da matéria e a possibilidade de regulamentação
              complementar. Não substitui aconselhamento fiscal
              individualizado.
            </p>
          </section>

          <FaqSection faqs={faqs} />
          <AuthorSection />

          <div className="glass-card p-8 text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-3">
              Quer saber quanto recupera na sua casa?
            </h2>
            <p className="text-gray-400 mb-6">
              Calcule o custo total da sua casa LSF e o reembolso estimado em
              menos de 2 minutos.
            </p>
            <Link
              href="/simulador"
              className="btn-primary rounded-full px-10 py-4 font-bold inline-flex items-center gap-2"
            >
              <Calculator className="w-5 h-5" /> Simular Custos Grátis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <WhatsAppCta titulo="IVA 6% na Construção LSF" />
        </div>
      </main>
    </>
  );
}
