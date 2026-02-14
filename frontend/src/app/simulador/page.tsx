"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Home, MapPin, Ruler, User } from "lucide-react";
import Link from "next/link";

export default function SimuladorPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    interesse_tipo: "T3",
    mensagem: "",
    localizacao: "",
    area: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          interesse_tipo: formData.interesse_tipo,
          mensagem: formData.mensagem,
          metadata_info: {
            localizacao: formData.localizacao,
            area: formData.area,
          },
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Ocorreu um erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[url('/bg-grid.svg')] bg-fixed bg-cover flex items-center justify-center p-6">
        <div className="glass-card max-w-lg w-full p-10 text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">Pedido Recebido!</h2>
          <p className="text-gray-300 mb-8">
            A sua simulação foi enviada com sucesso. A nossa equipa de engenharia irá analisar e entrará em contacto brevemente.
          </p>
          <Link href="/" className="btn-primary inline-block w-full py-3">
            Voltar à Página Inicial
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[url('/bg-grid.svg')] bg-fixed bg-cover py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Simulador de Orçamento</h1>
          <p className="text-gray-400 text-lg">
            Receba uma estimativa preliminar para a sua casa LSF em minutos.
          </p>
        </div>

        <div className="glass-card p-8 md:p-12">
          {/* Progress Bar */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 -translate-y-1/2 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-blue-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
            
            {[1, 2, 3].map((s) => (
              <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= s ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-gray-800 text-gray-500"}`}>
                {s}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                  <Home className="w-6 h-6 text-blue-400" /> Detalhes do Projeto
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Tipologia</label>
                    <select 
                      name="interesse_tipo" 
                      value={formData.interesse_tipo}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
                    >
                      <option value="T1">T1 (50-70 m²)</option>
                      <option value="T2">T2 (80-110 m²)</option>
                      <option value="T3">T3 (120-160 m²)</option>
                      <option value="T4">T4+ (170+ m²)</option>
                      <option value="Outro">Outro / Personalizado</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Área Estimada (m²)</label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input 
                        type="number" 
                        name="area"
                        placeholder="Ex: 150"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-400 mb-2">Localização do Terreno</label>
                   <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input 
                        type="text" 
                        name="localizacao"
                        placeholder="Concelho ou Distrito"
                        value={formData.localizacao}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-blue-500 outline-none transition-colors"
                      />
                   </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button type="button" onClick={nextStep} className="btn-primary px-8 py-3 flex items-center gap-2">
                    Continuar <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in space-y-6">
                 <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                  <User className="w-6 h-6 text-blue-400" /> Os Seus Dados
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Nome Completo</label>
                    <input 
                      type="text" 
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Telefone</label>
                      <input 
                        type="tel" 
                        name="telefone"
                        required
                        value={formData.telefone}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                   <button type="button" onClick={prevStep} className="text-gray-400 hover:text-white transition-colors px-4">
                    Voltar
                  </button>
                  <button type="button" onClick={nextStep} className="btn-primary px-8 py-3 flex items-center gap-2">
                    Continuar <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-blue-400" /> Confirmação e Notas
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Mensagem ou Pedidos Especiais (Opcional)</label>
                  <textarea 
                    name="mensagem"
                    rows={4}
                    value={formData.mensagem}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors resize-none"
                    placeholder="Ex: Tenho um terreno inclinado, gostaria de incluir garagem na cave..."
                  ></textarea>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-sm text-blue-200">
                  <p>
                    Ao submeter, irá receber um contacto da nossa equipa especializada para validar a viabilidade técnica do seu projeto LSF.
                  </p>
                </div>

                <div className="flex justify-between pt-4">
                   <button type="button" onClick={prevStep} className="text-gray-400 hover:text-white transition-colors px-4">
                    Voltar
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary px-8 py-3 w-full md:w-auto flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? "A Enviar..." : "Pedir Simulação Grátis"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
