import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Home, Layers, Wrench, TreePine, CheckCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import InlineCta from "@/components/InlineCta";
import WhatsAppCta from "@/components/WhatsAppCta";
import AuthorSection from "@/components/AuthorSection";

export const metadata: Metadata = {
  title: "Quanto Custa uma Casa LSF em Portugal? | Guia 2025",
  description:
    "Quanto custa construir uma casa em LSF? De 88.000€ (T1) a 360.000€ (T4 premium). Custos detalhados de terreno, projeto, obra e extras. Simulador grátis.",
  keywords: [
    "quanto custa casa LSF", "preço casa LSF Portugal", "custo construir casa",
    "casa LSF preço total", "orçamento casa LSF", "custo total casa LSF",
  ],
  alternates: { canonical: "https://casaslsf.com/quanto-custa-casa-lsf" },
  openGraph: {
    title: "Quanto Custa uma Casa LSF em Portugal?",
    description: "Guia completo de custos para construir uma casa em LSF. Terreno, projeto, obra e extras.",
    url: "https://casaslsf.com/quanto-custa-casa-lsf",
    type: "article",
  },
};

const faqs = [
  { pergunta: "Quanto custa uma casa LSF T3 em Portugal?", resposta: "Uma casa LSF T3 com 140m² custa entre 154.000€ (acabamentos standard) e 252.000€ (acabamentos premium), apenas na construção. Incluindo terreno, projeto e licenças, o investimento total pode variar entre 220.000€ e 380.000€." },
  { pergunta: "O terreno está incluído no preço da casa?", resposta: "Não. O preço da construção por m² refere-se apenas à obra. O terreno é um custo separado que varia enormemente conforme a localização: de 30€/m² em zonas rurais a 500+€/m² em Lisboa." },
  { pergunta: "Quanto custa o projeto de arquitetura?", resposta: "O projeto de arquitetura e especialidades custa tipicamente entre 5.000€ e 15.000€ para uma moradia unifamiliar, dependendo da complexidade e da dimensão." },
  { pergunta: "Existem custos escondidos na construção LSF?", resposta: "Num contrato chave na mão transparente, não deverão existir custos escondidos. Certifique-se de que o orçamento inclui: ligações às redes (água, eletricidade, saneamento), taxas camarárias e certificações obrigatórias." },
  { pergunta: "Posso construir uma casa LSF por menos de 100.000€?", resposta: "Sim, é possível com um T1 de 80-90m² em acabamentos standard (1.100€/m²). O custo da construção ficaria entre 88.000-99.000€, a que se soma o terreno e o projeto." },
];

const custosDetalhados = [
  { categoria: "Terreno", desc: "Depende da localização. Média em Portugal continental.", range: "20.000 - 100.000€", icon: TreePine },
  { categoria: "Projeto + Licenças", desc: "Arquitetura, especialidades e taxas camarárias.", range: "8.000 - 20.000€", icon: Layers },
  { categoria: "Construção (T3 140m²)", desc: "Obra chave na mão com acabamentos médios.", range: "182.000 - 210.000€", icon: Home },
  { categoria: "Arranjos Exteriores", desc: "Muros, portões, jardim e acessos.", range: "5.000 - 25.000€", icon: Wrench },
];

const breadcrumbs = [
  { label: "Início", href: "/" },
  { label: "Quanto Custa Casa LSF" },
];

export default function QuantoCustaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Quanto Custa uma Casa LSF em Portugal? Guia Completo",
    description: "Custos detalhados para construir uma casa em LSF: terreno, projeto, obra e extras.",
    url: "https://casaslsf.com/quanto-custa-casa-lsf",
    author: { "@type": "Organization", name: "OBRASNET UNIP LDA" },
    publisher: { "@type": "Organization", name: "Casas LSF", url: "https://casaslsf.com" },
    articleSection: "Preços Construção",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.pergunta,
      acceptedAnswer: { "@type": "Answer", text: f.resposta },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen bg-transparent py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} />

          <header className="mb-16 animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              Guia de Custos 2025
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
              Quanto Custa uma{" "}
              <span className="text-gradient">Casa LSF?</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              O custo total para construir uma casa em LSF em Portugal depende do terreno,
              projeto, dimensão e acabamentos. Aqui explicamos cada parcela para que
              possa planear o seu investimento sem surpresas.
            </p>
          </header>

          {/* Resumo rápido */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Resumo de Custos: Casa T3 (140m²)
            </h2>
            <div className="space-y-4 mb-6">
              {custosDetalhados.map((item) => (
                <div key={item.categoria} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-blue-400" />
                    <div>
                      <span className="text-white font-bold text-sm">{item.categoria}</span>
                      <p className="text-gray-500 text-xs">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-blue-400 font-bold text-sm whitespace-nowrap">{item.range}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <span className="text-white font-black">TOTAL ESTIMADO</span>
              <span className="text-blue-400 font-black text-xl">215.000 - 355.000€</span>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              * Valores indicativos para Portugal continental. Varia conforme localização e acabamentos.
            </p>
          </section>

          <InlineCta searchIntent="comercial" />

          {/* Custo do terreno */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Custo do Terreno por Região
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              O terreno é frequentemente a maior variável no custo total. Um lote de 500m²
              pode custar 15.000€ no interior ou 250.000€ na Grande Lisboa.
            </p>
            <div className="space-y-3">
              {[
                { regiao: "Interior Norte e Centro", preco: "20 - 50€/m²", exemplo: "10.000 - 25.000€ (500m²)" },
                { regiao: "Alentejo e Interior Sul", preco: "15 - 40€/m²", exemplo: "7.500 - 20.000€ (500m²)" },
                { regiao: "Litoral Norte (Porto)", preco: "80 - 200€/m²", exemplo: "40.000 - 100.000€ (500m²)" },
                { regiao: "Sintra / Cascais", preco: "100 - 300€/m²", exemplo: "50.000 - 150.000€ (500m²)" },
                { regiao: "Grande Lisboa", preco: "200 - 500+€/m²", exemplo: "100.000 - 250.000€ (500m²)" },
                { regiao: "Algarve", preco: "100 - 350€/m²", exemplo: "50.000 - 175.000€ (500m²)" },
              ].map((item) => (
                <div key={item.regiao} className="flex flex-wrap items-center justify-between p-3 bg-white/5 rounded-lg text-sm">
                  <span className="text-gray-300 font-bold">{item.regiao}</span>
                  <div className="flex gap-4">
                    <span className="text-gray-400">{item.preco}</span>
                    <span className="text-gray-500 hidden md:inline">{item.exemplo}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Como poupar */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Como Poupar na Construção LSF
            </h2>
            <ul className="space-y-4">
              {[
                { tip: "Escolha terreno no interior ou periferias", desc: "A diferença de preço pode financiar toda a construção." },
                { tip: "Opte por geometria simples", desc: "Plantas retangulares são mais económicas que formas complexas." },
                { tip: "Comece com acabamentos standard", desc: "Pode sempre fazer upgrades depois, quando o orçamento permitir." },
                { tip: "Peça vários orçamentos", desc: "Compare pelo menos 3 propostas de construtores certificados." },
                { tip: "Use o simulador online", desc: "Obtenha uma estimativa antes de contactar construtores para ter base de comparação." },
              ].map((item) => (
                <li key={item.tip} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold text-sm">{item.tip}</span>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Links internos */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Artigos Relacionados</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { href: "/preco-construcao-lsf-por-m2", label: "Tabela de Preços por m² Atualizada" },
                { href: "/casa-lsf-financiamento", label: "Financiamento para Casas LSF" },
                { href: "/simulador", label: "Simulador de Custos Online" },
                { href: "/blog/construcao-de-casas-preco-por-metro-quadrado-em-portugal", label: "Preço por m² em Portugal" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="glass-card p-4 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  {link.label} &rarr;
                </Link>
              ))}
            </div>
          </section>

          <FaqSection faqs={faqs} />
          <AuthorSection />

          <div className="glass-card p-8 text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-3">
              Descubra o Custo Exato do Seu Projeto
            </h2>
            <p className="text-gray-400 mb-6">
              Introduza as suas preferências e obtenha uma estimativa personalizada em 2 minutos.
            </p>
            <Link href="/simulador" className="btn-primary rounded-full px-10 py-4 font-bold inline-flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Simular Custos Grátis
            </Link>
          </div>

          <WhatsAppCta titulo="Quanto Custa Casa LSF" />
        </div>
      </main>
    </>
  );
}
