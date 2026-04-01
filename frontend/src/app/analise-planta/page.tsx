import type { Metadata } from "next";
import AnalisePlantaClient from "./AnalisePlantaClient";

export const metadata: Metadata = {
  title: "Analise Minha Planta - Conversão Alvenaria para LSF Grátis",
  description:
    "Envie a sua planta e receba uma análise gratuita de conversão alvenaria para LSF. Compare custos, prazos e desempenho. Resposta em 24h por WhatsApp.",
  keywords: [
    "análise planta LSF",
    "converter alvenaria para LSF",
    "comparação alvenaria LSF",
    "orçamento LSF grátis",
    "casa LSF vs alvenaria",
    "construção LSF Portugal",
  ],
  openGraph: {
    title: "Analise Minha Planta - Conversão Alvenaria → LSF",
    description:
      "Envie a sua planta e receba uma análise gratuita. Compare custos, prazos e desempenho entre alvenaria e LSF.",
    url: "https://casaslsf.com/analise-planta",
  },
  alternates: {
    canonical: "https://casaslsf.com/analise-planta",
  },
};

export default function AnalisePlantaPage() {
  return <AnalisePlantaClient />;
}
