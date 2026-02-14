import Link from "next/link";
import { ArrowRight, Calculator, FileText, Home, ShieldCheck, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[url('/bg-grid.svg')] bg-fixed bg-cover">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-500 tracking-tighter hover:scale-105 transition-transform cursor-pointer">
            CASAS<span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">LSF</span>
          </div>
          <div className="hidden md:flex gap-10 text-sm font-medium text-gray-300">
            <Link href="/plantas" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300">Plantas</Link>
            <Link href="/custos" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300">Custos</Link>
            <Link href="/metodos" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300">Métodos</Link>
            <Link href="/blog" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300">Blog</Link>
          </div>
          <Link href="/simulador" className="btn-primary text-sm px-6 py-2.5 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all">
            Simular Grátis
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-6 px-6 py-2 rounded-full glass text-sm font-semibold text-blue-400 animate-fade-in border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            🚀 O Futuro da Construção em Portugal
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tight animate-fade-in drop-shadow-2xl" style={{ animationDelay: "0.1s" }}>
            Construa a sua casa de sonho <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">com Inteligência Artificial</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 mx-auto max-w-4xl leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Da planta ao orçamento em minutos. Transparência total, precisão de engenharia e a rapidez do Light Steel Framing.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link href="/plantas" className="btn-primary text-lg px-8 py-4">
              Ver Plantas IA <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/como-funciona" className="btn-secondary text-lg px-8 py-4">
              Como Funciona
            </Link>
          </div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 text-blue-400">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Plantas Inteligentes</h3>
              <p className="text-gray-400">
                Gere e customize plantas adaptadas ao seu terreno e orçamento usando nossa IA generativa exclusiva.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6 text-pink-400">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Orçamento Preciso</h3>
              <p className="text-gray-400">
                Adeus estimativas vagas. Obtenha um mapa de quantidades detalhado e custos reais de materiais em segundos.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Rapidez LSF</h3>
              <p className="text-gray-400">
                Saiba por que o Light Steel Framing é 3x mais rápido que a alvenaria tradicional e mais eficiente energeticamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-16">Porquê escolher o Portal Casas LSF?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-white mb-2">35%</div>
              <div className="text-blue-400 text-sm uppercase tracking-wider">Mais Barato</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">3x</div>
              <div className="text-blue-400 text-sm uppercase tracking-wider">Mais Rápido</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">A+</div>
              <div className="text-blue-400 text-sm uppercase tracking-wider">Eficiência Energética</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-blue-400 text-sm uppercase tracking-wider">Plantas Grátis</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de portugueses que estão a revolucionar a forma como constroem.
          </p>
          <Link href="/simulador" className="btn-primary text-lg px-10 py-5">
            Começar Agora Grátis
          </Link>
          <div className="mt-12 text-sm text-gray-500">
            © 2026 Casas LSF Intelligence. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}
