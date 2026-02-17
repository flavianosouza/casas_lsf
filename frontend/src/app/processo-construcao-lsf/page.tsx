import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, Ruler, HardHat, Layers, Paintbrush, Key, CheckCircle, Clock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import InlineCta from "@/components/InlineCta";
import WhatsAppCta from "@/components/WhatsAppCta";
import AuthorSection from "@/components/AuthorSection";
import AssistantLazy from "@/components/assistant/AssistantLazy";

export const metadata: Metadata = {
  title: "Processo de Construção LSF Passo a Passo | 6 Fases",
  description:
    "Descubra as 6 fases da construção em LSF: licenciamento, fundações, estrutura, isolamento, acabamentos e entrega. Guia completo com prazos e custos.",
  keywords: [
    "processo construção LSF", "fases construção casa", "etapas construção LSF",
    "como construir em LSF", "construção passo a passo", "obra LSF",
  ],
  alternates: { canonical: "https://casaslsf.com/processo-construcao-lsf" },
  openGraph: {
    title: "Processo de Construção LSF Passo a Passo",
    description: "As 6 fases da construção em LSF: do licenciamento à entrega da chave.",
    url: "https://casaslsf.com/processo-construcao-lsf",
    type: "article",
  },
};

const faqs = [
  { pergunta: "Quanto tempo demora a construir uma casa em LSF?", resposta: "Uma moradia T3 em LSF demora tipicamente entre 4 a 6 meses desde o início da obra até à entrega. Este prazo não inclui o licenciamento, que pode demorar 3 a 12 meses adicionais." },
  { pergunta: "Preciso de arquiteto para construir em LSF?", resposta: "Sim. Tal como na construção tradicional, é necessário um projeto de arquitetura assinado por arquiteto e projetos de especialidades (estabilidade, térmica, acústica, etc.) para obter licença de construção." },
  { pergunta: "A fundação de uma casa LSF é diferente?", resposta: "A fundação é tipicamente uma laje de betão armado ou ensoleiramento geral, mas mais leve que na construção tradicional, já que a estrutura LSF pesa cerca de 1/3 da alvenaria." },
  { pergunta: "Posso acompanhar a obra?", resposta: "Sim. Na OBRASNET proporcionamos acompanhamento regular com relatórios fotográficos e visitas à obra, para total transparência em cada fase." },
  { pergunta: "Quais são os acabamentos possíveis em LSF?", resposta: "Os acabamentos são idênticos aos da construção tradicional: pintura, cerâmicos, madeira, microcimento, fachada ETICS, fachada ventilada, etc. Visualmente, é indistinguível de uma casa convencional." },
];

const fases = [
  {
    icon: ClipboardList,
    titulo: "Fase 1: Projeto e Licenciamento",
    duracao: "3-12 meses",
    desc: "Elaboração do projeto de arquitetura e especialidades. Submissão à câmara municipal para obtenção da licença de construção. Inclui projeto de estabilidade específico para LSF.",
    items: ["Projeto de arquitetura", "Projetos de especialidades", "Submissão à câmara", "Licença de construção"],
  },
  {
    icon: Ruler,
    titulo: "Fase 2: Preparação e Fundações",
    duracao: "2-4 semanas",
    desc: "Preparação do terreno, movimentação de terras e execução da laje de fundação em betão armado. Instalação de infraestruturas enterradas (saneamento, águas, eletricidade).",
    items: ["Limpeza do terreno", "Movimentação de terras", "Laje de fundação", "Infraestruturas enterradas"],
  },
  {
    icon: HardHat,
    titulo: "Fase 3: Estrutura em Aço",
    duracao: "2-3 semanas",
    desc: "Montagem da estrutura de perfis de aço galvanizado: montantes, vigas, lajes de piso e estrutura de cobertura. Esta é a fase mais rápida e visual da obra.",
    items: ["Montantes e travessas", "Estrutura de pavimentos", "Estrutura de cobertura", "Contraventamento OSB"],
  },
  {
    icon: Layers,
    titulo: "Fase 4: Isolamento e Instalações",
    duracao: "3-4 semanas",
    desc: "Aplicação de isolamento térmico e acústico (lã de rocha), barreiras de vapor, passagem de canalizações, eletricidade, AVAC e telecomunicações.",
    items: ["Lã de rocha 100-150mm", "Barreira de vapor", "Canalização e eletricidade", "Pré-instalação AVAC"],
  },
  {
    icon: Paintbrush,
    titulo: "Fase 5: Revestimentos e Acabamentos",
    duracao: "6-8 semanas",
    desc: "Fecho de paredes com gesso cartonado, aplicação de fachada exterior (ETICS), cerâmicos, pavimentos, carpintarias, cozinha, sanitários e pintura.",
    items: ["Gesso cartonado interior", "Fachada ETICS exterior", "Pavimentos e cerâmicos", "Carpintarias e pintura"],
  },
  {
    icon: Key,
    titulo: "Fase 6: Entrega e Licença de Habitação",
    duracao: "1-2 semanas",
    desc: "Limpeza final, vistorias técnicas, obtenção da licença de utilização e entrega da chave. Inclui dossier técnico com todos os certificados e garantias.",
    items: ["Vistorias e testes", "Licença de utilização", "Dossier técnico", "Entrega da chave"],
  },
];

const breadcrumbs = [
  { label: "Início", href: "/" },
  { label: "Processo de Construção LSF" },
];

export default function ProcessoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Como Construir uma Casa em LSF",
    description: "As 6 fases do processo de construção em Light Steel Framing, do licenciamento à entrega.",
    url: "https://casaslsf.com/processo-construcao-lsf",
    totalTime: "P6M",
    step: fases.map((fase, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: fase.titulo,
      text: fase.desc,
    })),
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
              Guia Passo a Passo
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
              Processo de Construção{" "}
              <span className="text-gradient">LSF</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              Da ideia à casa pronta em 6 fases. Conheça cada etapa do processo de
              construção em Light Steel Framing, com prazos reais e o que esperar em cada momento.
            </p>
          </header>

          <AssistantLazy />

          {/* Timeline */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Prazo total estimado: <strong className="text-white">4 a 6 meses</strong> (excluindo licenciamento)</span>
            </div>

            <div className="space-y-6">
              {fases.map((fase, i) => (
                <div key={fase.titulo} className="glass-card p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <fase.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h2 className="text-xl font-black text-white">{fase.titulo}</h2>
                        <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full font-bold">
                          {fase.duracao}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{fase.desc}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {fase.items.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-xs text-gray-500">
                            <CheckCircle className="w-3.5 h-3.5 text-blue-500/60" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {i === 1 && <InlineCta searchIntent="informacional" />}
                </div>
              ))}
            </div>
          </section>

          {/* Links internos */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Saiba Mais</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { href: "/metodologia-construtiva", label: "Metodologia Construtiva LSF em Detalhe" },
                { href: "/preco-construcao-lsf-por-m2", label: "Preço de Construção LSF por m²" },
                { href: "/blog/construcao-de-casas-passo-a-passo", label: "Construção de Casas: Dicas Práticas" },
                { href: "/blog/casas-lsf-seguras-sismos-vento-fogo", label: "Segurança das Casas LSF" },
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
              Pronto para Começar o Seu Projeto?
            </h2>
            <p className="text-gray-400 mb-6">
              Simule os custos da sua casa em LSF em menos de 2 minutos.
            </p>
            <Link href="/simulador" className="btn-primary rounded-full px-10 py-4 font-bold inline-block">
              Simular Custos Grátis
            </Link>
          </div>

          <WhatsAppCta titulo="Processo de Construção LSF" />
        </div>
      </main>
    </>
  );
}
