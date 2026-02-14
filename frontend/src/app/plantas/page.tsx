import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export default function PlantasPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-4">Plantas Inteligentes</h1>
            <p className="text-gray-400 max-w-xl">
              Explore nossa coleção de plantas otimizadas para construção LSF ou gere a sua própria com IA.
            </p>
          </div>
          <Link href="/simulador" className="btn-primary">
            Gerar Nova Planta IA
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="glass-card overflow-hidden group">
              <div className="h-48 bg-gray-800 relative">
                {/* Placeholder for Plan Image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono">
                  [Imagem da Planta T{item > 3 ? 3 : item}]
                </div>
                <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded text-xs text-white">
                  {80 + item * 20}m²
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition">
                  Modelo LSF-{202600 + item}
                </h3>
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>T{item > 3 ? 3 : item}</span>
                  <span>{item > 2 ? 2 : 1} Pisos</span>
                  <span>{new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format((80 + item * 20) * 1100)}</span>
                </div>
                <button className="w-full btn-secondary justify-center text-sm py-2">
                  <Download className="w-4 h-4 mr-2" /> Baixar PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
