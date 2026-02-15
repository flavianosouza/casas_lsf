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
    <main className="min-h-screen bg-transparent py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 animate-fade-in">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              Escolha o seu Modelo
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-white">
              Plantas <span className="text-gradient">Inteligentes</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Modelos pré-desenhados otimizados para construção LSF. <br />
              Escolha um modelo base ou gere um projeto único com IA.
            </p>
                  <p className="text-sm text-blue-300 leading-relaxed italic">
                    &quot;Ao clicar em submeter, a nossa equipa de engenharia irá processar os seus dados e gerar um relatório técnico de viabilidade preliminar gratuito.&quot;
                  </p>
          </div>
          <Link 
            href="/simulador" 
            className="btn-primary rounded-full px-10 py-5 text-lg font-bold flex items-center gap-3"
          >
            <Sparkles className="w-6 h-6" /> Gerar Nova Planta IA
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {models.map((model, index) => (
            <div 
              key={model.id} 
              className="glass-card flex flex-col h-full animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-64 bg-gray-900/50 rounded-t-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5 hover:bg-blue-500/10 transition-colors"></div>
                <Home className="w-20 h-20 text-white/10 group-hover:text-blue-500/20 transition-all duration-500" />
                <div className="absolute top-4 left-4 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  LSF Premium
                </div>
                <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-gray-300 border border-white/5">
                  ID: {model.id}
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">{model.name}</h3>
                    <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      <span>{model.type}</span>
                      <span>•</span>
                      <span>{model.floors} PISO{model.floors > 1 ? "S" : ""}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-400 bg-blue-500/5 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-500/10">
                    <Maximize className="w-3.5 h-3.5" />
                    {model.area}m²
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1 italic">
                  &quot;{model.description}&quot;
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div>
                        <div className="text-2xl font-black text-white leading-none mb-1">
                            {model.price}
                        </div>
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Preço Chave na Mão</span>
                    </div>
                    <button className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-blue-500 hover:text-white rounded-full text-gray-400 transition-all duration-300">
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
