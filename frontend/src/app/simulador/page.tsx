import type { Metadata } from "next";
import SimuladorClient from "./SimuladorClient";

export const metadata: Metadata = {
  title: "Simulador de Custos Casa LSF - Orçamento Grátis",
  description:
    "Simule o custo da sua casa LSF em menos de 2 minutos. Receba um relatório técnico de viabilidade gratuito com preços reais. Sem compromisso.",
  keywords: [
    "simulador construção LSF", "orçamento casa LSF", "quanto custa casa LSF",
    "simulador custos construção", "preço casa LSF", "calculadora construção",
  ],
  openGraph: {
    title: "Simulador de Custos Casa LSF - Orçamento Grátis",
    description:
      "Obtenha uma previsão de custos detalhada para o seu projeto LSF. 100% gratuito, sem compromisso.",
    url: "https://casaslsf.com/simulador",
  },
  alternates: {
    canonical: "https://casaslsf.com/simulador",
  },
};

export default function SimuladorPage() {
  return <SimuladorClient />;
}
