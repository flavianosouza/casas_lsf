"use client";

import { ArrowRight, Download, Home, Maximize, Ruler, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PlantasPage() {
  const models = [
    {
      id: "LSF-202601",
      name: "Modelo Eco T1",
      area: "100",
      type: "T1",
      floors: 1,
      price: "110.000,00 €",
      description: "Ideal para primeira habitação ou turismo. Compacta e eficiente.",
    },
    {
      id: "LSF-202602",
      name: "Modelo Family T2",
      area: "120",
      type: "T2",
      floors: 1,
      price: "132.000,00 €",
      description: "Espaço perfeito para pequenas famílias. Dois quartos espaçosos.",
    },
    {
      id: "LSF-202603",
      name: "Modelo Modern T3",
      area: "140",
      type: "T3",
      floors: 2,
      price: "154.000,00 €",
      description: "Nossa best-seller. Design A+ com suíte master e escritório.",
    },
    {
      id: "LSF-202604",
      name: "Modelo Luxury T3",
      area: "160",
      type: "T3",
      floors: 2,
      price: "176.000,00 €",
      description: "Acabamentos premium e áreas sociais em plano aberto.",
    },
    {
      id: "LSF-202605",
      name: "Modelo Villa T4",
      area: "180",
      type: "T4",
      floors: 2,
      price: "198.000,00 €",
      description: "Para quem não dispensa espaço. Garagem dupla incluída.",
    },
    {
      id: "LSF-202606",
      name: "Modelo Grand T4+",
      area: "200",
      type: "T4",
      floors: 2,
      price: "220.000,00 €",
      description: "A joia da coroa. Piscina integrada no conceito (opcional).",
    },
  ];

  return (
    <main className="min-h-screen bg-[url('/bg-grid.svg')] bg-fixed bg-cover py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Catálogo de Plantas</h1>
            <p className="text-gray-400 max-w-xl">
              Modelos pré-desenhados otimizados para construção LSF. 
              Escolha um modelo base ou personalize tudo com a nossa IA.
            </p>
          </div>
          <Link 
            href="/simulador" 
            className="btn-primary px-6 py-3 flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            <Sparkles className="w-5 h-5" /> Gerar Nova Planta IA
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <div 
              key={model.id} 
              className="glass-card group hover:border-blue-500/40 transition-all duration-300 flex flex-col h-full animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Placeholder Image Area */}
              <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-xl flex items-center justify-center relative overflow-hidden group-hover:from-gray-800 group-hover:to-blue-900/20 transition-all">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
                <Home className="w-16 h-16 text-gray-700 group-hover:text-blue-500/50 transition-colors duration-500" />
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-mono text-white border border-white/10">
                  {model.id}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{model.name}</h3>
                    <div className="text-sm text-gray-400 mt-1">{model.type} • {model.floors} Piso(s)</div>
                  </div>
                  <div className="flex items-center gap-1 text-blue-300 bg-blue-500/10 px-2 py-1 rounded text-sm font-medium border border-blue-500/20">
                    <Maximize className="w-3 h-3" />
                    {model.area}m²
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-6 flex-1 border-t border-white/5 pt-4">
                  {model.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="text-white font-bold text-lg">
                        {model.price}
                        <span className="text-xs text-gray-500 block font-normal">Estimativa Chave na Mão</span>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <Download className="w-5 h-5" />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
