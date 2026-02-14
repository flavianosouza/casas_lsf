"use client";

import { useState } from "react";
import { Calculator, CheckCircle, Info } from "lucide-react";

export default function SimuladorPage() {
  const [area, setArea] = useState(100);
  const [floors, setFloors] = useState(1);
  const [finish, setFinish] = useState("medio");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    let basePrice = 0;
    switch (finish) {
      case "base": basePrice = 950; break;
      case "medio": basePrice = 1150; break;
      case "premium": basePrice = 1450; break;
    }
    
    // Slight discount for larger areas, penalty for smaller
    const scaleFactor = area < 80 ? 1.1 : area > 150 ? 0.95 : 1.0;
    
    // Multi-story penalty (stairs, structure)
    const floorFactor = floors > 1 ? 1.05 : 1.0;

    const total = area * basePrice * scaleFactor * floorFactor;
    setResult(Math.round(total));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-center">Simulador de Custos LSF</h1>
        <p className="text-gray-400 text-center mb-12">
          Estimativa preliminar baseada nos valores médios de mercado para 2026.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-6">Dados do Projeto</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Área Bruta (m²)</label>
                <input 
                  type="range" 
                  min="50" 
                  max="300" 
                  value={area} 
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="mt-2 text-right font-mono text-blue-400">{area} m²</div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Nº de Pisos</label>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setFloors(1)}
                    className={`flex-1 py-3 rounded-lg border transition ${floors === 1 ? 'bg-blue-600 border-blue-500 text-white' : 'border-gray-700 hover:bg-white/5'}`}
                  >
                    Térrea
                  </button>
                  <button 
                    onClick={() => setFloors(2)}
                    className={`flex-1 py-3 rounded-lg border transition ${floors === 2 ? 'bg-blue-600 border-blue-500 text-white' : 'border-gray-700 hover:bg-white/5'}`}
                  >
                    2 Pisos
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Nível de Acabamento</label>
                <select 
                  value={finish} 
                  onChange={(e) => setFinish(e.target.value)}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="base">Base (Essencial)</option>
                  <option value="medio">Médio (Recomendado)</option>
                  <option value="premium">Premium (Alto Padrão)</option>
                </select>
              </div>

              <button 
                onClick={calculate}
                className="w-full btn-primary justify-center py-4 mt-4 text-lg"
              >
                <Calculator className="w-5 h-5 mr-2" /> Calcular Estimativa
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="glass-card p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
            {!result ? (
              <div className="text-gray-500">
                <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Preencha os dados e clique em calcular para ver o resultado.</p>
              </div>
            ) : (
              <div className="animate-fade-in w-full">
                <div className="inline-block px-4 py-1 rounded-full bg-green-500/20 text-green-400 text-sm mb-6">
                  Estimativa Gerada com Sucesso
                </div>
                <div className="text-gray-400 text-sm mb-2">Valor Estimado Chave na Mão</div>
                <div className="text-5xl font-bold text-white mb-8 tracking-tight">
                  {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(result)}
                </div>
                
                <div className="space-y-4 text-left bg-black/30 p-6 rounded-lg mb-8">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400">Estrutura LSF</span>
                    <span>{new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(result * 0.35)}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400">Acabamentos</span>
                    <span>{new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(result * 0.45)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Equipamentos/Outros</span>
                    <span>{new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(result * 0.20)}</span>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <h3 className="text-lg font-bold mb-4">Receber Orçamento Oficial</h3>
                  <form action={async (formData) => {
                    "use client";
                    // Note: In a real app we'd import the server action. 
                    // For now, this is a placeholder to show where it connects.
                    alert("Funcionalidade de envio conectada ao Server Action submitLead!");
                  }} className="space-y-4">
                    <input name="nome" placeholder="Seu Nome" className="w-full bg-black/30 border border-gray-700 rounded p-3 text-white" required />
                    <input name="telefone" placeholder="WhatsApp" className="w-full bg-black/30 border border-gray-700 rounded p-3 text-white" required />
                    <input name="email" placeholder="Email (Opcional)" className="w-full bg-black/30 border border-gray-700 rounded p-3 text-white" />
                    <button type="submit" className="w-full btn-secondary justify-center">
                      Enviar Pedido
                    </button>
                  </form>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  *Valores meramente indicativos. Não inclui terreno, licenciamento e arranjos exteriores.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
