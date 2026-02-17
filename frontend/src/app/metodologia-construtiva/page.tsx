import type { Metadata } from "next";
import Link from "next/link";
import { Layers, Shield, Thermometer, Clock, Recycle, Volume2, CheckCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import InlineCta from "@/components/InlineCta";
import WhatsAppCta from "@/components/WhatsAppCta";
import AuthorSection from "@/components/AuthorSection";
import AssistantLazy from "@/components/assistant/AssistantLazy";

export const metadata: Metadata = {
  title: "Metodologia Construtiva LSF | Light Steel Framing",
  description:
    "Conheça a metodologia de construção em LSF (Light Steel Framing): estrutura em aço galvanizado, isolamento térmico superior, rapidez de execução e sustentabilidade.",
  keywords: [
    "metodologia LSF", "Light Steel Framing", "construção aço leve",
    "método construtivo LSF", "como funciona LSF", "sistema construtivo LSF",
  ],
  alternates: { canonical: "https://casaslsf.com/metodologia-construtiva" },
  openGraph: {
    title: "Metodologia Construtiva LSF | Light Steel Framing",
    description: "Guia completo sobre a metodologia de construção em LSF: estrutura, isolamento, acabamentos e vantagens.",
    url: "https://casaslsf.com/metodologia-construtiva",
    type: "article",
  },
};

const faqs = [
  { pergunta: "O que é o sistema LSF?", resposta: "LSF (Light Steel Framing) é um sistema construtivo que utiliza perfis de aço galvanizado leve para formar a estrutura de paredes, pavimentos e coberturas. É o método mais utilizado na construção industrializada em países como EUA, Austrália e Japão." },
  { pergunta: "A estrutura de aço enferruja?", resposta: "Não. Os perfis utilizados são de aço galvanizado a quente (revestido com zinco), o que garante proteção contra a corrosão por mais de 50 anos, mesmo em ambientes costeiros." },
  { pergunta: "O LSF cumpre as normas portuguesas?", resposta: "Sim. A construção em LSF cumpre integralmente os regulamentos portugueses, incluindo o RGEU, Eurocódigos estruturais e regulamentos de eficiência energética (RECS/REH)." },
  { pergunta: "Qual é o isolamento térmico de uma casa LSF?", resposta: "Uma casa LSF típica atinge classe energética A ou A+, graças ao isolamento contínuo em lã de rocha (100-150mm) combinado com câmaras de ar e barreiras técnicas." },
  { pergunta: "É possível construir mais de 1 piso em LSF?", resposta: "Sim. O sistema LSF permite construções até 4-5 pisos. Para moradias, é comum a construção de 2 pisos com estrutura inteiramente em aço leve." },
];

const camadas = [
  { nome: "Revestimento Exterior", desc: "ETICS, fachada ventilada ou revestimento cerâmico. Protege contra intempéries.", icon: Shield },
  { nome: "Isolamento Térmico Exterior", desc: "EPS ou lã de rocha 40-60mm. Elimina pontes térmicas na envolvente.", icon: Thermometer },
  { nome: "Placa OSB / Cimentícia", desc: "Contraventamento estrutural e barreira de rigidez. OSB 12mm ou placa cimentícia.", icon: Layers },
  { nome: "Estrutura em Aço Galvanizado", desc: "Perfis C e U de aço galvanizado (1.0-1.5mm). O esqueleto da construção.", icon: Layers },
  { nome: "Isolamento Interior (Lã de Rocha)", desc: "100-150mm entre montantes. Isolamento térmico e acústico de alta performance.", icon: Volume2 },
  { nome: "Barreira de Vapor", desc: "Membrana que controla a migração de humidade e protege o isolamento.", icon: Shield },
  { nome: "Placa de Gesso (Pladur)", desc: "Acabamento interior liso, pronto para pintura. Resistente ao fogo (tipo F).", icon: Layers },
];

const breadcrumbs = [
  { label: "Início", href: "/" },
  { label: "Metodologia Construtiva" },
];

export default function MetodologiaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Metodologia Construtiva LSF - Light Steel Framing",
    description: "Guia técnico completo sobre a metodologia de construção em LSF.",
    url: "https://casaslsf.com/metodologia-construtiva",
    author: { "@type": "Organization", name: "OBRASNET UNIP LDA" },
    publisher: { "@type": "Organization", name: "Casas LSF", url: "https://casaslsf.com" },
    articleSection: "Construção LSF",
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
              Guia Técnico
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
              Metodologia Construtiva{" "}
              <span className="text-gradient">LSF</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              O Light Steel Framing é um sistema construtivo industrializado que utiliza
              perfis de aço galvanizado leve para criar estruturas residenciais e comerciais
              com superior desempenho térmico, acústico e sísmico.
            </p>
          </header>

          <AssistantLazy />

          {/* O que é */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              O Que É a Construção LSF?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              A construção em LSF (Light Steel Framing) é um sistema construtivo a seco que
              substitui a alvenaria tradicional por uma estrutura de perfis de aço galvanizado
              leve. Este método é o mais utilizado na construção residencial nos Estados Unidos,
              Austrália, Japão e Nova Zelândia, e tem crescido significativamente em Portugal
              nos últimos anos.
            </p>
            <p className="text-gray-400 leading-relaxed">
              A estrutura funciona como um &quot;esqueleto&quot; de aço sobre o qual se aplicam
              camadas de isolamento, barreiras técnicas e revestimentos, criando uma envolvente
              com desempenho térmico e acústico muito superior ao da construção convencional.
            </p>
          </section>

          <InlineCta searchIntent="informacional" />

          {/* Camadas da parede */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
              Anatomia da Parede LSF (7 Camadas)
            </h2>
            <div className="space-y-4">
              {camadas.map((camada, i) => (
                <div key={camada.nome} className="glass-card p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <span className="text-blue-400 font-black text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{camada.nome}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{camada.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Vantagens */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
              Vantagens do Sistema LSF
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Clock, title: "3x Mais Rápido", desc: "Construção em 4-6 meses vs 12-18 meses da alvenaria." },
                { icon: Thermometer, title: "Classe A+ Energética", desc: "Isolamento contínuo sem pontes térmicas." },
                { icon: Shield, title: "Resistente a Sismos", desc: "Estrutura flexível que absorve forças sísmicas." },
                { icon: Recycle, title: "Sustentável", desc: "Aço 100% reciclável, menos desperdício em obra." },
                { icon: Volume2, title: "Isolamento Acústico", desc: "Até 55dB de redução sonora entre divisões." },
                { icon: CheckCircle, title: "Durável", desc: "Aço galvanizado com vida útil superior a 50 anos." },
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

          {/* Normas */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Conformidade e Normas
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              A construção em LSF em Portugal está totalmente regulamentada e cumpre:
            </p>
            <ul className="space-y-3">
              {[
                "Eurocódigo 3 (EN 1993) — Projeto de estruturas de aço",
                "RGEU — Regulamento Geral de Edificações Urbanas",
                "REH/RECS — Regulamentos de desempenho energético",
                "EN 1090 — Execução de estruturas de aço e alumínio",
                "Norma NP EN 10346 — Produtos planos de aço revestidos",
              ].map((norma) => (
                <li key={norma} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                  <span className="text-gray-400 text-sm">{norma}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Links internos */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Artigos Relacionados</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { href: "/processo-construcao-lsf", label: "Processo de Construção LSF Passo a Passo" },
                { href: "/preco-construcao-lsf-por-m2", label: "Preço de Construção LSF por m²" },
                { href: "/blog/casas-lsf-portugal-guia-completo", label: "Guia Completo: Casas LSF em Portugal" },
                { href: "/blog/vantagens-desvantagens-casas-aco-leve", label: "Vantagens e Desvantagens do LSF" },
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
              Quer Construir em LSF?
            </h2>
            <p className="text-gray-400 mb-6">
              Obtenha uma estimativa de custos para o seu projeto em menos de 2 minutos.
            </p>
            <Link href="/simulador" className="btn-primary rounded-full px-10 py-4 font-bold inline-block">
              Simular Custos Grátis
            </Link>
          </div>

          <WhatsAppCta titulo="Metodologia Construtiva LSF" />
        </div>
      </main>
    </>
  );
}
