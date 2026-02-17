import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Custos de Construção LSF em Portugal 2026",
  description:
    "Quanto custa construir uma casa LSF? Preços de estrutura desde 350€/m² e chave na mão desde 1.100€/m². Orçamento fechado, sem derrapagens. Simule grátis.",
  keywords: [
    "custo construção LSF", "preço LSF m2 2026", "construção LSF preço",
    "quanto custa construir casa LSF", "preço metro quadrado LSF",
  ],
  openGraph: {
    title: "Custos de Construção LSF em Portugal 2026",
    description:
      "Preços reais de construção LSF: estrutura desde 350€/m², chave na mão desde 1.100€/m². Sem surpresas.",
    url: "https://casaslsf.com/custos",
  },
  alternates: {
    canonical: "https://casaslsf.com/custos",
  },
};

export default function CustosPage() {
  return (
    <main className="min-h-screen bg-[url('/bg-grid.svg')] bg-fixed bg-cover py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Transparência nos Custos</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Entenda como funciona o orçamento de uma casa LSF e por que é mais económico a longo prazo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20 animate-fade-in">
           <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">Estimativa Média 2026</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center text-gray-300">
                  <span>Estrutura LSF (Aço Leve)</span>
                  <span className="font-bold text-white">350€ - 450€ /m²</span>
                </li>
                 <li className="flex justify-between items-center text-gray-300">
                  <span>Chave na Mão (Acabamento Médio)</span>
                  <span className="font-bold text-white">1.100€ - 1.300€ /m²</span>
                </li>
                 <li className="flex justify-between items-center text-gray-300">
                  <span>Chave na Mão (Acabamento Premium)</span>
                  <span className="font-bold text-white">1.400€ - 1.800€ /m²</span>
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-6">*Valores indicativos, não incluem terreno, licenças ou arranjos exteriores.</p>
           </div>
           
           <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Sem Derrapagens</h4>
                  <p className="text-gray-400">Ao contrário da alvenaria, o orçamento LSF é fechado. O que é orçamentado é o que paga.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Poupança Energética</h4>
                  <p className="text-gray-400">O isolamento superior reduz a fatura de luz e gás em até 60% todos os meses.</p>
                </div>
              </div>
           </div>
        </div>

        <div className="text-center animate-fade-in">
          <Link href="/simulador" className="btn-primary px-8 py-4 inline-flex items-center gap-2 text-lg">
            Simular o Meu Projeto <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
