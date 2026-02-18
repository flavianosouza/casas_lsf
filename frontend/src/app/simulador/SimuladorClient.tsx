"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Home, MapPin, Ruler, User } from "lucide-react";
import Link from "next/link";

export default function SimuladorClient() {
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
        // Email notification via Resend
        fetch("/api/notify-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone,
            interesse_tipo: formData.interesse_tipo,
            mensagem: formData.mensagem,
            origem: "simulador",
          }),
        }).catch(() => {});
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
    const whatsappMsg = encodeURIComponent(
      `Olá! Sou ${formData.nome}, preenchi o simulador no site e gostaria de avançar com o meu projeto:\n` +
      `- Tipologia: ${formData.interesse_tipo}\n` +
      `- Área: ${formData.area || "A definir"} m²\n` +
      `- Localização: ${formData.localizacao || "A definir"}\n` +
      (formData.mensagem ? `- Notas: ${formData.mensagem}\n` : "")
    );
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=351930423456&text=${whatsappMsg}&type=phone_number&app_absent=0`;

    return (
      <main className="min-h-screen bg-[url('/bg-grid.svg')] bg-fixed bg-cover flex items-center justify-center p-6">
        <div className="glass-card max-w-lg w-full p-10 text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">Pedido Recebido!</h2>
          <p className="text-gray-300 mb-6">
            A sua simulação foi registada com sucesso. Para receber o seu estudo técnico personalizado, fale diretamente com o nosso consultor:
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full py-4 rounded-full text-white font-bold text-lg transition-all hover:brightness-110"
            style={{ backgroundColor: "#25D366" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Falar com Consultor LSF
          </a>
          <Link href="/" className="block mt-4 text-gray-500 text-sm hover:text-white transition-colors">
            Voltar à Página Inicial
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent py-40 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            Estimativa em Tempo Real
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
            Simulador <span className="text-gradient">Inteligente</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Obtenha uma previsão de custos detalhada para o seu projeto LSF <br />
            em menos de 2 minutos.
          </p>
        </div>

        <div className="glass-card p-8 md:p-16">
          {/* Progress Bar */}
          <div className="flex justify-between mb-20 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -z-10 -translate-y-1/2 rounded-full"></div>
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>

            {[1, 2, 3].map((s) => (
              <div key={s} className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black transition-all duration-500 border-2 ${step >= s ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]" : "bg-gray-900 border-white/10 text-gray-600"}`}>
                  {s}
                </div>
                <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-colors duration-300 ${step === s ? "text-blue-400" : "text-gray-600"}`}>
                  {s === 1 ? "Projeto" : s === 2 ? "Contacto" : "Finalizar"}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {step === 1 && (
              <div className="animate-fade-in space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Tipologia Desejada</label>
                    <select
                      name="interesse_tipo"
                      value={formData.interesse_tipo}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all appearance-none cursor-pointer"
                      style={{ colorScheme: "dark" }}
                    >
                      <option value="T1">T1 (50-70 m²)</option>
                      <option value="T2">T2 (80-110 m²)</option>
                      <option value="T3">T3 (120-160 m²)</option>
                      <option value="T4">T4+ (170+ m²)</option>
                      <option value="Outro">Outro / Personalizado</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Área de Implantação (m²)</label>
                    <div className="relative">
                      <Ruler className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                      <input
                        type="number"
                        name="area"
                        placeholder="Ex: 150"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                   <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Localização do Terreno</label>
                   <div className="relative">
                      <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                      <input
                        type="text"
                        name="localizacao"
                        placeholder="Concelho ou Distrito"
                        value={formData.localizacao}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all"
                      />
                   </div>
                </div>

                <div className="flex justify-end pt-8">
                  <button type="button" onClick={nextStep} className="btn-primary rounded-full px-12 py-4 flex items-center gap-3 font-bold">
                    Seguinte <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in space-y-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Nome Completo</label>
                    <input
                      type="text"
                      name="nome"
                      required
                      placeholder="Como podemos chamá-lo?"
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="email@exemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">WhatsApp</label>
                      <input
                        type="tel"
                        name="telefone"
                        required
                        placeholder="+351 9xx xxx xxx"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-8">
                   <button type="button" onClick={prevStep} className="text-gray-500 hover:text-white font-bold uppercase tracking-widest text-xs px-6 py-4 transition-colors">
                    Voltar
                  </button>
                  <button type="button" onClick={nextStep} className="btn-primary rounded-full px-12 py-4 flex items-center gap-3 font-bold">
                    Seguinte <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Notas Adicionais</label>
                  <textarea
                    name="mensagem"
                    rows={5}
                    value={formData.mensagem}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all resize-none"
                    placeholder="Conte-nos um pouco mais sobre o terreno, prazos ou pedidos especiais..."
                  ></textarea>
                </div>

                <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-6">
                  <p className="text-sm text-blue-300 leading-relaxed italic">
                    &quot;Ao clicar em submeter, a nossa equipa de engenharia irá processar os seus dados e gerar um relatório técnico de viabilidade preliminar gratuito.&quot;
                  </p>
                </div>

                <div className="flex justify-between pt-8">
                   <button type="button" onClick={prevStep} className="text-gray-500 hover:text-white font-bold uppercase tracking-widest text-xs px-6 py-4 transition-colors">
                    Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary rounded-full px-16 py-5 flex justify-center items-center gap-4 text-lg font-black"
                  >
                    {isSubmitting ? "A Processar..." : "Gerar Relatório Agora"}
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
