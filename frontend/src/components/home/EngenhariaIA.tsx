import { FileText, BarChart3, CalendarClock, ClipboardList } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const outputs = [
  {
    icon: FileText,
    title: "Planta 2D Personalizada",
    desc: "Layout otimizado para o seu terreno, tipologia e preferências. Gerada por algoritmos de arquitetura.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: ClipboardList,
    title: "Mapa de Quantidades",
    desc: "Orçamento detalhado com caderno de encargos, 13 categorias e preços reais de mercado.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: BarChart3,
    title: "Cronograma Financeiro",
    desc: "Planeamento de desembolsos mensais com Curva S. Saiba exatamente quando investir cada parcela.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: CalendarClock,
    title: "Cronograma Executivo",
    desc: "Fases de execução da obra com diagrama de Gantt. Prazos reais para cada etapa da construção.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export default function EngenhariaIA() {
  return (
    <section className="py-28 md:py-40 bg-black/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <ScrollReveal>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-4">
              Tecnologia
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
              Engenharia Assistida
              <br />
              por <span className="text-gradient">Inteligência Artificial</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              O nosso sistema de engenharia gera 4 documentos profissionais
              a partir da descrição do seu projeto. Não é uma ferramenta genérica
              — é um motor de engenharia calibrado para construção LSF em Portugal.
            </p>
            <div className="flex flex-wrap gap-3">
              {["13 Categorias", "Preços Reais", "Caderno de Encargos", "PDF Profissional"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-gray-300 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Right - Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {outputs.map((out, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="glass-card p-6 group h-full">
                  <div className={`w-11 h-11 ${out.bg} rounded-lg flex items-center justify-center mb-4 ${out.color} group-hover:scale-110 transition-transform duration-500`}>
                    <out.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{out.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{out.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
    </section>
  );
}
