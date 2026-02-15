import type { Metadata } from "next";
import Link from "next/link";
import { Building, Award, Shield, Users, MapPin, Phone, Mail, CheckCircle, Clock, Wrench } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import WhatsAppCta from "@/components/WhatsAppCta";
import AuthorSection from "@/components/AuthorSection";

export const metadata: Metadata = {
  title: "Sobre a OBRASNET | Empresa Construção LSF Portugal",
  description:
    "Conheça a OBRASNET UNIP LDA, empresa especializada em construção LSF em Portugal. Alvará IMPIC 94665, projetos licenciados e equipa técnica com experiência comprovada.",
  keywords: [
    "OBRASNET", "empresa construção LSF", "construção aço leve Portugal",
    "Light Steel Framing Portugal", "alvará IMPIC", "construtor LSF",
  ],
  alternates: { canonical: "https://casaslsf.com/sobre-obrasnet" },
  openGraph: {
    title: "Sobre a OBRASNET | Empresa Construção LSF Portugal",
    description: "Empresa especializada em construção LSF com alvará IMPIC e projetos licenciados em todo o território nacional.",
    url: "https://casaslsf.com/sobre-obrasnet",
    type: "website",
  },
};

const faqs = [
  { pergunta: "A OBRASNET tem alvará de construção?", resposta: "Sim. A OBRASNET UNIP LDA possui o Alvará IMPIC n.º 94665, que certifica a empresa para execução de obras de construção civil em Portugal." },
  { pergunta: "Onde fica a sede da OBRASNET?", resposta: "A sede localiza-se na R. Abade Faria 18, 1.º Dto, 2725-475 Mem Martins, Sintra. Executamos projetos em todo o território nacional." },
  { pergunta: "A OBRASNET faz projetos chave na mão?", resposta: "Sim. Oferecemos o serviço completo desde o projeto de arquitetura, licenciamento, construção e acabamentos, entregando a casa pronta a habitar." },
  { pergunta: "Que tipo de construção a OBRASNET realiza?", resposta: "Somos especializados em construção LSF (Light Steel Framing), mas também executamos projetos em ICF, construção mista e remodelações." },
  { pergunta: "Como posso pedir um orçamento?", resposta: "Pode usar o nosso simulador online em casaslsf.com/simulador para uma estimativa imediata, ou contactar-nos pelo 930 423 456 para um orçamento personalizado." },
];

const breadcrumbs = [
  { label: "Início", href: "/" },
  { label: "Sobre a OBRASNET" },
];

export default function SobreObrasnetPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Sobre a OBRASNET",
    description: "Empresa especializada em construção LSF em Portugal.",
    url: "https://casaslsf.com/sobre-obrasnet",
    mainEntity: {
      "@type": "Organization",
      name: "OBRASNET UNIP LDA",
      url: "https://casaslsf.com",
      telephone: "+351930423456",
      email: "orcamento@casaslsf.com",
      taxID: "515866989",
      address: {
        "@type": "PostalAddress",
        streetAddress: "R. Abade Faria 18, 1.o Dto",
        addressLocality: "Mem Martins, Sintra",
        postalCode: "2725-475",
        addressCountry: "PT",
      },
    },
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
              Quem Somos
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
              Construção LSF com{" "}
              <span className="text-gradient">Experiência Comprovada</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              A OBRASNET UNIP LDA é uma empresa portuguesa especializada em construção
              em Light Steel Framing (LSF), com alvará IMPIC e projetos licenciados
              executados em todo o território nacional.
            </p>
          </header>

          {/* Credenciais */}
          <section className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Award, label: "Alvará IMPIC", value: "94665", desc: "Certificação para execução de obras" },
              { icon: Shield, label: "NIF", value: "515 866 989", desc: "Empresa registada e ativa" },
              { icon: MapPin, label: "Sede", value: "Sintra, Portugal", desc: "Projetos em todo o país" },
            ].map((item) => (
              <div key={item.label} className="glass-card p-6 text-center">
                <item.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</div>
                <div className="text-xl font-black text-white mb-1">{item.value}</div>
                <div className="text-sm text-gray-400">{item.desc}</div>
              </div>
            ))}
          </section>

          {/* Missão */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              A Nossa Missão
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Democratizar o acesso à construção de qualidade em Portugal através de métodos
              construtivos modernos, eficientes e sustentáveis. Acreditamos que construir uma
              casa não deveria ser um processo opaco, demorado ou financeiramente imprevisível.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Por isso, combinamos a tecnologia LSF com ferramentas digitais — como o nosso
              simulador de custos e estudos técnicos automáticos — para que cada cliente tenha
              total transparência desde o primeiro contacto até à entrega da chave.
            </p>
          </section>

          {/* O que fazemos */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
              O Que Fazemos
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Building, title: "Construção LSF Chave na Mão", desc: "Desde o projeto até à entrega, gerimos todo o processo de construção em aço leve galvanizado." },
                { icon: Wrench, title: "Remodelações e Ampliações", desc: "Remodelação de imóveis existentes, incluindo reforço estrutural e ampliação com LSF." },
                { icon: Users, title: "Consultoria Técnica", desc: "Aconselhamento sobre métodos construtivos, materiais e viabilidade de projetos." },
                { icon: Clock, title: "Prazos Reduzidos", desc: "Construção 3x mais rápida que o método tradicional, com controlo rigoroso de prazos." },
              ].map((item) => (
                <div key={item.title} className="glass-card p-6 flex gap-4">
                  <item.icon className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Porquê nós */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Porquê Escolher a OBRASNET?
            </h2>
            <ul className="space-y-4">
              {[
                "Alvará IMPIC ativo — empresa certificada para construção",
                "Equipa técnica especializada em LSF e ICF",
                "Projetos licenciados em câmaras municipais de todo o país",
                "Simulador de custos online para transparência imediata",
                "Garantia de obra conforme a legislação portuguesa",
                "Experiência comprovada com dezenas de projetos entregues",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Contacto */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Contacte-nos
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <a href="tel:+351930423456" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>+351 930 423 456</span>
                </a>
                <a href="mailto:orcamento@casaslsf.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>orcamento@casaslsf.com</span>
                </a>
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span>R. Abade Faria 18, 1.º Dto<br />2725-475 Mem Martins, Sintra</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Link href="/simulador" className="btn-primary rounded-xl px-8 py-4 text-center font-bold">
                  Simular Custos Grátis
                </Link>
                <Link href="/blog" className="text-center text-blue-400 hover:text-blue-300 text-sm transition-colors">
                  Ver artigos técnicos no blog
                </Link>
              </div>
            </div>
          </section>

          <FaqSection faqs={faqs} />
          <AuthorSection />
          <WhatsAppCta titulo="Sobre a OBRASNET" />
        </div>
      </main>
    </>
  );
}
