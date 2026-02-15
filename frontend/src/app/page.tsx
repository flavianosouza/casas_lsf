import Link from "next/link";
import { ArrowRight, Calculator, Home, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-64 md:pb-40 overflow-hidden flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-10 px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 animate-fade-in">
            A Revolução da Engenharia em Portugal
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter animate-fade-in leading-[0.9]" style={{ animationDelay: "0.1s" }}>
            Casas com <br />
            <span className="text-gradient">Inteligência</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-16 mx-auto max-w-3xl leading-relaxed animate-fade-in font-medium" style={{ animationDelay: "0.2s" }}>
            O seu projeto LSF, da planta ao orçamento detalhado, <br />
            gerado em minutos com precisão milimétrica.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link href="/plantas" className="btn-primary rounded-full px-12 py-5 text-lg font-bold flex items-center gap-3">
              Explorar Plantas <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/como-funciona" className="btn-secondary rounded-full px-12 py-5 text-lg font-bold">
              O Método
            </Link>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/10 rounded-full blur-[160px] -z-10 pointer-events-none"></div>
      </section>

      {/* Features Grid */}
      <section className="py-40 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="glass-card p-10 group">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 text-blue-400 group-hover:scale-110 transition-transform duration-500">
                <Home className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tight">Plantas IA</h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                Algoritmos avançados que adaptam cada m² ao seu terreno e orçamento.
              </p>
            </div>
            <div className="glass-card p-10 group">
              <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-8 text-pink-400 group-hover:scale-110 transition-transform duration-500">
                <Calculator className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tight">Orçamento Real</h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                Mapa de quantidades exato com preços de mercado atualizados semanalmente.
              </p>
            </div>
            <div className="glass-card p-10 group">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 text-purple-400 group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tight">Construção Ágil</h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                A precisão do aço galvanizado (LSF) para uma obra 3x mais rápida e sustentável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
            {[
              { val: "35%", label: "Mais Económico" },
              { val: "3x", label: "Mais Rápido" },
              { val: "A+", label: "Classe Energética" },
              { val: "2.80m", label: "Pé-Direito Padrão" }
            ].map((s, i) => (
              <div key={i}>
                <div className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">{s.val}</div>
                <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter text-white">
            Transforme a sua <br />
            <span className="text-gradient">Visão em Realidade</span>
          </h2>
          <p className="text-xl text-gray-500 mb-16 max-w-2xl mx-auto font-medium">
            O futuro da construção não é apenas sobre materiais, <br />
            é sobre inteligência e transparência.
          </p>
          <Link href="/simulador" className="btn-primary rounded-full px-16 py-6 text-xl font-black tracking-tight">
            Começar Simulação
          </Link>
        </div>
      </section>
    </main>
  );
}
