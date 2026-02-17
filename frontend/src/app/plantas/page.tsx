import type { Metadata } from "next";
import PlantasClient from "./PlantasClient";

export const metadata: Metadata = {
  title: "Plantas de Casas LSF - Modelos T1 a T4+ Chave na Mão",
  description:
    "Veja plantas de casas LSF pré-desenhadas de T1 a T4+, desde 100m² a 200m². Preços chave na mão desde 110.000€. Gere a sua planta personalizada com IA.",
  keywords: [
    "plantas casas LSF", "planta casa T3", "planta casa modular",
    "modelos casas LSF", "plantas casas pré-fabricadas", "casa T2 LSF",
  ],
  openGraph: {
    title: "Plantas de Casas LSF - Modelos T1 a T4+",
    description:
      "Modelos otimizados para construção LSF. De T1 (100m²) a T4+ (200m²), com preços chave na mão.",
    url: "https://casaslsf.com/plantas",
  },
  alternates: {
    canonical: "https://casaslsf.com/plantas",
  },
};

export default function PlantasPage() {
  return <PlantasClient />;
}
