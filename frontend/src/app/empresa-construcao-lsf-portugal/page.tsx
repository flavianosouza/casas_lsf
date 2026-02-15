import type { Metadata } from "next";
import Link from "next/link";
import { Building, Award, Shield, MapPin, Phone, Mail, CheckCircle, ArrowRight, Star } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import InlineCta from "@/components/InlineCta";
import WhatsAppCta from "@/components/WhatsAppCta";
import AuthorSection from "@/components/AuthorSection";

export const metadata: Metadata = {
  title: "Empresa de Construção LSF em Portugal | OBRASNET",
  description:
    "Procura uma empresa de construção LSF em Portugal? A OBRASNET tem alvará IMPIC, projetos licenciados e equipa especializada. Orçamento grátis em 2 minutos.",
  keywords: [
    "empresa construção LSF Portugal", "construtor LSF", "empresa casas aço leve",
    "construtora LSF Portugal", "OBRASNET construção", "empresa construção chave na mão",
  ],
  alternates: { canonical: "https://casaslsf.com/empresa-construcao-lsf-portugal" },
  openGraph: {
    title: "Empresa de Construção LSF em Portugal | OBRASNET",
    description: "Empresa certificada com alvará IMPIC para construção em LSF. Projetos chave na mão em Portugal.",
    url: "https://casaslsf.com/empresa-construcao-lsf-portugal",
    type: "website",
  },
};

const faqs = [
  { pergunta: "A OBRASNET é uma empresa certificada?", resposta: "Sim. A OBRASNET UNIP LDA possui Alvará IMPIC n.º 94665, NIF 515 866 989, e está registada e ativa no Portal das Finanças. É uma empresa legalmente habilitada para executar obras de construção civil." },
  { pergunta: "Em que zonas de Portugal a OBRASNET trabalha?", resposta: "Executamos projetos em todo o território continental de Portugal, com maior concentração na região de Lisboa, Sintra, Cascais, Setúbal e Algarve." },
  { pergunta: "Quanto tempo demora a construção?", resposta: "Uma moradia T3 em LSF demora tipicamente entre 4 a 6 meses desde o início da obra. O licenciamento prévio pode demorar 3 a 12 meses adicionais." },
  { pergunta: "A OBRASNET trata do licenciamento?", resposta: "Sim. Oferecemos serviço de acompanhamento do processo de licenciamento, incluindo coordenação com arquitetos e engenheiros para submissão do projeto à câmara municipal." },
  { pergunta: "Como posso pedir um orçamento?", resposta: "Pode usar o simulador online em casaslsf.com/simulador para uma estimativa imediata, enviar email para orcamento@casaslsf.com, ou ligar para o 930 423 456." },
];

const diferenciais = [
  { icon: Award, titulo: "Alvará IMPIC 94665", desc: "Empresa certificada pelo Instituto dos Mercados Públicos do Imobiliário e da Construção." },
  { icon: Shield, titulo: "Garantia de Obra", desc: "Garantia contratual conforme legislação portuguesa. Dossier técnico completo na entrega." },
  { icon: Building, titulo: "Chave na Mão", desc: "Gerimos todo o processo: do projeto ao acabamento final, incluindo coordenação de especialidades." },
  { icon: Star, titulo: "Transparência Total", desc: "Simulador de custos online, orçamento detalhado e acompanhamento fotográfico da obra." },
];

const breadcrumbs = [
  { label: "Início", href: "/" },
  { label: "Empresa Construção LSF Portugal" },
];

export default function EmpresaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "OBRASNET UNIP LDA",
    alternateName: "Casas LSF",
    description: "Empresa de construção em LSF (Light Steel Framing) em Portugal. Projetos chave na mão.",
    url: "https://casaslsf.com",
    telephone: "+351930423456",
    email: "orcamento@casaslsf.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "R. Abade Faria 18, 1.o Dto",
      addressLocality: "Mem Martins",
      addressRegion: "Sintra",
      postalCode: "2725-475",
      addressCountry: "PT",
    },
    geo: { "@type": "GeoCoordinates", latitude: 38.7935, longitude: -9.3472 },
    taxID: "515866989",
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
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
              Construtora Certificada
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
              Empresa de Construção{" "}
              <span className="text-gradient">LSF em Portugal</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              A OBRASNET é uma empresa portuguesa especializada em construção LSF,
              com alvará IMPIC ativo e equipa técnica dedicada. Projetos chave na mão
              em todo o território nacional.
            </p>
          </header>

          {/* CTA destaque */}
          <section className="glass-card p-8 md:p-12 mb-12 border border-blue-500/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-black text-white mb-3">
                  Peça o Seu Orçamento Grátis
                </h2>
                <p className="text-gray-400 mb-4">
                  Obtenha uma estimativa de custos para o seu projeto em menos de 2 minutos,
                  sem compromisso.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/simulador" className="btn-primary rounded-full px-8 py-3 font-bold inline-flex items-center gap-2">
                    Simular Custos <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="tel:+351930423456" className="px-8 py-3 rounded-full border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-colors inline-flex items-center gap-2">
                    <Phone className="w-4 h-4" /> 930 423 456
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center shrink-0">
                {[
                  { label: "Alvará IMPIC", value: "94665" },
                  { label: "NIF", value: "515 866 989" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 rounded-xl p-4">
                    <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                    <div className="text-white font-black">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Diferenciais */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
              Porquê a OBRASNET?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {diferenciais.map((item) => (
                <div key={item.titulo} className="glass-card p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.titulo}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineCta searchIntent="transacional" />

          {/* Serviços */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Serviços de Construção
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { titulo: "Moradias LSF", desc: "Construção de moradias unifamiliares chave na mão, de T1 a T5, com acabamentos à medida." },
                { titulo: "Remodelações", desc: "Remodelação de imóveis existentes, incluindo ampliações com estrutura em aço leve." },
                { titulo: "Pavilhões e Garagens", desc: "Construção de pavilhões pré-fabricados, garagens e anexos em estrutura metálica." },
                { titulo: "Telhados e Coberturas", desc: "Substituição e reparação de telhados com estrutura em aço galvanizado." },
                { titulo: "Consultoria Técnica", desc: "Aconselhamento sobre métodos construtivos, materiais e viabilidade de projetos." },
                { titulo: "Projetos Especiais", desc: "Construção modular, casas passivas, projetos de turismo e alojamento local." },
              ].map((servico) => (
                <div key={servico.titulo} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">{servico.titulo}</h3>
                    <p className="text-gray-500 text-xs">{servico.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Processo */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Como Trabalhamos
            </h2>
            <div className="space-y-6">
              {[
                { passo: "1", titulo: "Simulação Online", desc: "Use o nosso simulador para obter uma estimativa de custos em 2 minutos." },
                { passo: "2", titulo: "Contacto e Visita", desc: "Agendamos reunião para conhecer o terreno e discutir o seu projeto em detalhe." },
                { passo: "3", titulo: "Orçamento Detalhado", desc: "Elaboramos proposta completa com cronograma, especificações e preço fixo." },
                { passo: "4", titulo: "Projeto e Licenciamento", desc: "Coordenamos o projeto de arquitetura e especialidades até à licença." },
                { passo: "5", titulo: "Construção", desc: "Executamos a obra com acompanhamento regular e relatórios fotográficos." },
                { passo: "6", titulo: "Entrega", desc: "Entregamos a casa pronta com dossier técnico, garantias e licença de habitação." },
              ].map((item) => (
                <div key={item.passo} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <span className="text-blue-400 font-black">{item.passo}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{item.titulo}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contacto */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Contactos
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="text-white font-bold text-lg">OBRASNET UNIP LDA</div>
                <a href="tel:+351930423456" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-blue-400" /> +351 930 423 456
                </a>
                <a href="mailto:orcamento@casaslsf.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" /> orcamento@casaslsf.com
                </a>
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span>R. Abade Faria 18, 1.º Dto<br />2725-475 Mem Martins, Sintra</span>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-500" /> Alvará IMPIC: 94665
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" /> NIF: 515 866 989
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-500" /> Seg-Sex: 09:00 - 18:00
                </div>
              </div>
            </div>
          </section>

          {/* Links internos */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Saiba Mais</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { href: "/sobre-obrasnet", label: "Sobre a OBRASNET - Quem Somos" },
                { href: "/processo-construcao-lsf", label: "Processo de Construção Passo a Passo" },
                { href: "/preco-construcao-lsf-por-m2", label: "Preço de Construção por m²" },
                { href: "/metodologia-construtiva", label: "Metodologia Construtiva LSF" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="glass-card p-4 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  {link.label} &rarr;
                </Link>
              ))}
            </div>
          </section>

          <FaqSection faqs={faqs} />
          <AuthorSection />
          <WhatsAppCta titulo="Empresa de Construção LSF" />
        </div>
      </main>
    </>
  );
}
