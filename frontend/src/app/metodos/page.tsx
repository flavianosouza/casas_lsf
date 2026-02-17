import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Hammer, Layers, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Método Construtivo LSF - Light Steel Framing",
  description:
    "Descubra o método construtivo LSF: paredes multicamada, resistência antissísmica, precisão milimétrica e construção 3x mais rápida que alvenaria. Casa pronta em 4-6 meses.",
  keywords: [
    "método construtivo LSF", "Light Steel Framing", "construção aço leve",
    "LSF Portugal", "paredes LSF", "construção a seco", "steel frame",
  ],
  openGraph: {
    title: "Método Construtivo LSF - Light Steel Framing",
    description:
      "Tecnologia aeronáutica aplicada à construção civil. Paredes multicamada, antissísmico e construção a seco.",
    url: "https://casaslsf.com/metodos",
  },
  alternates: {
    canonical: "https://casaslsf.com/metodos",
  },
};

export default function MetodosPage() {
  return (
    <main className="min-h-screen bg-[url('/bg-grid.svg')] bg-fixed bg-cover py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Método Construtivo LSF</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Light Steel Framing: A tecnologia aeronáutica aplicada à construção civil.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16 animate-fade-in">
          <div className="glass-card p-8 hover:border-blue-500/30 transition-colors">
            <Layers className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Multicamada</h3>
            <p className="text-gray-400">
              Paredes compostas por aço galvanizado, OSB, isolamento térmico (ETICS/Capoto), lã mineral e gesso cartonado.
            </p>
          </div>
          <div className="glass-card p-8 hover:border-purple-500/30 transition-colors">
            <Shield className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Antisísmico</h3>
            <p className="text-gray-400">
              A estrutura flexível de aço absorve energia sísmica melhor que o betão rígido, garantindo maior segurança.
            </p>
          </div>
          <div className="glass-card p-8 hover:border-pink-500/30 transition-colors">
            <Hammer className="w-10 h-10 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Precisão Milimétrica</h3>
            <p className="text-gray-400">
              Perfis cortados a laser em fábrica. Erro zero em obra, paredes perfeitamente direitas e esquadrias exatas.
            </p>
          </div>
          <div className="glass-card p-8 hover:border-green-500/30 transition-colors">
             <Zap className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Rapidez</h3>
            <p className="text-gray-400">
              Construção a seco (drywall) elimina tempos de secagem. A sua casa pronta em 4-6 meses.
            </p>
          </div>
        </div>

        <div className="text-center animate-fade-in">
           <Link href="/como-funciona" className="text-blue-400 hover:text-white transition-colors underline underline-offset-4 mr-8">
            Ver o Processo Passo-a-Passo
          </Link>
          <Link href="/simulador" className="btn-primary px-8 py-4 inline-flex items-center gap-2">
            Iniciar Projeto <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
