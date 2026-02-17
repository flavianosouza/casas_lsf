import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, TrendingUp, Home, ArrowRight, CheckCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import InlineCta from "@/components/InlineCta";
import WhatsAppCta from "@/components/WhatsAppCta";
import AuthorSection from "@/components/AuthorSection";
import AssistantLazy from "@/components/assistant/AssistantLazy";

export const metadata: Metadata = {
  title: "Preço Construção LSF por m² em 2026 | Tabela Atualizada",
  description:
    "Preço de construção em LSF por m² em Portugal: de 1.100€ a 1.800€/m². Tabela atualizada com custos por tipologia, acabamento e região. Simulador grátis.",
  keywords: [
    "preço construção LSF m2", "custo construção LSF", "preço metro quadrado LSF",
    "quanto custa construir LSF", "tabela preços construção", "construção LSF preço",
  ],
  alternates: { canonical: "https://casaslsf.com/preco-construcao-lsf-por-m2" },
  openGraph: {
    title: "Preço Construção LSF por m² em Portugal | Tabela 2026",
    description: "Tabela atualizada de preços de construção em LSF por m². De 1.100€ a 1.800€ conforme acabamentos.",
    url: "https://casaslsf.com/preco-construcao-lsf-por-m2",
    type: "article",
  },
};

const faqs = [
  { pergunta: "Quanto custa construir em LSF por m² em Portugal?", resposta: "O preço médio de construção em LSF situa-se entre 1.100€ e 1.800€ por m², dependendo dos acabamentos, localização e complexidade do projeto. Acabamentos standard ficam entre 1.100-1.300€/m², médios entre 1.300-1.500€/m² e premium entre 1.500-1.800€/m²." },
  { pergunta: "O preço por m² inclui tudo?", resposta: "Num projeto chave na mão, o preço por m² inclui: estrutura LSF, isolamento, canalizações, eletricidade, acabamentos interiores e exteriores. Não inclui tipicamente: terreno, projeto de arquitetura, licenças camarárias e arranjos exteriores." },
  { pergunta: "A construção LSF é mais barata que a tradicional?", resposta: "Sim. A construção em LSF pode ser até 35% mais económica que a alvenaria tradicional, quando se considera o custo total: material, mão de obra, prazo (3x mais rápido) e menor desperdício." },
  { pergunta: "Porque varia tanto o preço por m²?", resposta: "O preço varia conforme: qualidade dos acabamentos (standard vs premium), número de pisos, complexidade arquitetónica, localização geográfica, tipo de fundação necessária e instalações especiais (piscina, AVAC, domótica)." },
  { pergunta: "Como posso ter um orçamento personalizado?", resposta: "Use o nosso simulador online em casaslsf.com/simulador para obter uma estimativa em menos de 2 minutos, ou contacte-nos para um estudo técnico detalhado gratuito." },
];

const tabelaPrecos = [
  { tipo: "T1 (80-100m²)", standard: "88.000 - 130.000€", medio: "104.000 - 150.000€", premium: "120.000 - 180.000€" },
  { tipo: "T2 (100-130m²)", standard: "110.000 - 169.000€", medio: "130.000 - 195.000€", premium: "150.000 - 234.000€" },
  { tipo: "T3 (130-160m²)", standard: "143.000 - 208.000€", medio: "169.000 - 240.000€", premium: "195.000 - 288.000€" },
  { tipo: "T4 (160-200m²)", standard: "176.000 - 260.000€", medio: "208.000 - 300.000€", premium: "240.000 - 360.000€" },
];

const breadcrumbs = [
  { label: "Início", href: "/" },
  { label: "Preço Construção LSF por m²" },
];

export default function PrecoM2Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Preço de Construção LSF por m² em Portugal - Tabela Atualizada",
    description: "Tabela completa de preços de construção em LSF por metro quadrado em Portugal.",
    url: "https://casaslsf.com/preco-construcao-lsf-por-m2",
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
              Tabela de Preços 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
              Preço Construção LSF{" "}
              <span className="text-gradient">por m²</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              Tabela atualizada com os preços de construção em Light Steel Framing
              por metro quadrado em Portugal. De 1.100€ a 1.800€/m² conforme
              acabamentos e tipologia.
            </p>
          </header>

          <AssistantLazy />

          {/* Resumo preços */}
          <section className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { label: "Standard", range: "1.100 - 1.300€", desc: "Acabamentos básicos de qualidade" },
              { label: "Médio", range: "1.300 - 1.500€", desc: "Acabamentos de gama média" },
              { label: "Premium", range: "1.500 - 1.800€", desc: "Acabamentos topo de gama" },
            ].map((item) => (
              <div key={item.label} className="glass-card p-6 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{item.label}</div>
                <div className="text-2xl font-black text-white mb-1">{item.range}</div>
                <div className="text-xs text-gray-400">por m²</div>
                <div className="text-sm text-gray-500 mt-2">{item.desc}</div>
              </div>
            ))}
          </section>

          {/* Explicação */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Como São Calculados os Preços?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              O preço por metro quadrado na construção LSF depende de vários fatores.
              Num projeto chave na mão, o valor inclui toda a construção desde as fundações
              até à entrega da casa pronta a habitar.
            </p>
            <h3 className="text-lg font-bold text-white mb-3 mt-6">O que está incluído no preço/m²:</h3>
            <ul className="space-y-2 mb-6">
              {[
                "Fundações em laje de betão armado",
                "Estrutura completa em aço galvanizado",
                "Isolamento térmico e acústico (lã de rocha 100-150mm)",
                "Canalizações de água e saneamento",
                "Instalação elétrica completa",
                "Revestimento exterior (ETICS)",
                "Acabamentos interiores (gesso cartonado, pintura)",
                "Pavimentos, cerâmicos e carpintarias",
                "Loiças sanitárias e equipamento de cozinha base",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-400 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-bold text-white mb-3">O que NÃO está incluído:</h3>
            <ul className="space-y-2">
              {[
                "Terreno", "Projeto de arquitetura e especialidades",
                "Licenças e taxas camarárias", "Arranjos exteriores e paisagismo",
                "Piscina, garagem destacada ou extras",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-500 text-sm">
                  <span className="text-red-400 shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <InlineCta searchIntent="comercial" />

          {/* Tabela por tipologia */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
              Tabela de Preços por Tipologia
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-400 font-bold">Tipologia</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-bold">Standard</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-bold">Médio</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-bold">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {tabelaPrecos.map((row) => (
                    <tr key={row.tipo} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-white font-bold">{row.tipo}</td>
                      <td className="py-4 px-4 text-center text-gray-300">{row.standard}</td>
                      <td className="py-4 px-4 text-center text-gray-300">{row.medio}</td>
                      <td className="py-4 px-4 text-center text-blue-400 font-bold">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-600 mt-4">
              * Valores indicativos para projetos chave na mão em Portugal continental (2026). Consulte-nos para orçamento personalizado.
            </p>
          </section>

          {/* Comparação métodos */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              LSF vs Outros Métodos: Comparação de Preços
            </h2>
            <div className="space-y-4">
              {[
                { metodo: "LSF (Light Steel Framing)", preco: "1.100 - 1.800€/m²", prazo: "4-6 meses", destaque: true },
                { metodo: "Alvenaria Tradicional", preco: "1.300 - 2.200€/m²", prazo: "12-18 meses", destaque: false },
                { metodo: "ICF (Plastbau)", preco: "1.200 - 2.000€/m²", prazo: "6-9 meses", destaque: false },
                { metodo: "Madeira CLT", preco: "1.400 - 2.500€/m²", prazo: "4-8 meses", destaque: false },
              ].map((item) => (
                <div key={item.metodo} className={`flex flex-wrap items-center justify-between p-4 rounded-xl ${item.destaque ? "bg-blue-500/10 border border-blue-500/20" : "bg-white/5"}`}>
                  <span className={`font-bold ${item.destaque ? "text-blue-400" : "text-gray-300"}`}>{item.metodo}</span>
                  <div className="flex gap-6 text-sm">
                    <span className="text-gray-400">{item.preco}</span>
                    <span className="text-gray-500">{item.prazo}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* O que influencia */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Fatores Que Influenciam o Preço
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Home, title: "Área e Tipologia", desc: "Casas maiores têm custo/m² ligeiramente inferior. T1 custa mais por m² que T4." },
                { icon: TrendingUp, title: "Nível de Acabamentos", desc: "A diferença entre standard e premium pode ser de 40-50% no valor final." },
                { icon: Calculator, title: "Complexidade Arquitetónica", desc: "Geometrias complexas, varandas em balanço e fachadas curvas aumentam o custo." },
                { icon: CheckCircle, title: "Localização", desc: "Custos de transporte e mão de obra variam por região. Lisboa e Algarve são mais caros." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <item.icon className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Links internos */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Artigos Relacionados</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { href: "/quanto-custa-casa-lsf", label: "Quanto Custa uma Casa LSF? Guia Completo" },
                { href: "/casa-lsf-financiamento", label: "Financiamento para Casas LSF" },
                { href: "/blog/quanto-custa-casa-lsf-portugal", label: "Custos de Construção LSF em Portugal" },
                { href: "/blog/lsf-vs-alvenaria-portugal", label: "LSF vs Alvenaria: Qual Compensa?" },
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
              Quer Saber o Preço Exato para o Seu Projeto?
            </h2>
            <p className="text-gray-400 mb-6">
              Obtenha uma estimativa personalizada em menos de 2 minutos.
            </p>
            <Link href="/simulador" className="btn-primary rounded-full px-10 py-4 font-bold inline-flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Simular Custos Grátis
            </Link>
          </div>

          <WhatsAppCta titulo="Preço Construção LSF por m²" />
        </div>
      </main>
    </>
  );
}
