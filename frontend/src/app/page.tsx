import type { Metadata } from "next";
import HeroEngineering2030 from "@/components/home/HeroEngineering2030";
import AssistantLazy from "@/components/assistant/AssistantLazy";
import ComoFunciona from "@/components/home/ComoFunciona";
import LiveEngineeringMetrics from "@/components/home/LiveEngineeringMetrics";
import EngenhariaIA from "@/components/home/EngenhariaIA";
import ModoProfissional from "@/components/home/ModoProfissional";
import ProvaSocial from "@/components/home/ProvaSocial";
import CtaFinal from "@/components/home/CtaFinal";

export const metadata: Metadata = {
  title: "Casas LSF | Construção Chave na Mão em Portugal - OBRASNET",
  description:
    "Construa a sua casa em Light Steel Framing com a OBRASNET. Simulador de custos, plantas inteligentes, orçamentos detalhados e construção chave na mão em Portugal. Desde 1.100€/m².",
  keywords: [
    "casas LSF", "construção LSF Portugal", "casas pré-fabricadas",
    "construção modular", "casa chave na mão", "Light Steel Framing",
    "OBRASNET", "simulador construção", "orçamento casa LSF",
  ],
  openGraph: {
    title: "Casas LSF | Construção Chave na Mão em Portugal",
    description:
      "O maior portal de construção LSF de Portugal. Simule custos, veja plantas e peça orçamento gratuito.",
    url: "https://casaslsf.com",
    type: "website",
  },
  alternates: {
    canonical: "https://casaslsf.com",
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <HeroEngineering2030 />
      <AssistantLazy />
      <ComoFunciona />
      <LiveEngineeringMetrics />
      <EngenhariaIA />
      <ModoProfissional />
      <ProvaSocial />
      <CtaFinal />
    </main>
  );
}
