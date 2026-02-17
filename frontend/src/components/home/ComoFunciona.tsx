import { MessageSquareText, Cpu, HardHat } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    icon: MessageSquareText,
    title: "Descreva o Seu Projeto",
    desc: "Diga-nos a tipologia, área e estilo da casa que imagina. No WhatsApp ou no simulador online — sem complicações.",
    color: "blue",
  },
  {
    num: "02",
    icon: Cpu,
    title: "Engenharia Automática",
    desc: "O sistema gera a planta 2D, mapa de quantidades com caderno de encargos, cronograma financeiro e cronograma executivo.",
    color: "cyan",
  },
  {
    num: "03",
    icon: HardHat,
    title: "Construção Real",
    desc: "Equipa OBRASNET com alvará IMPIC executa a obra completa em LSF. Do licenciamento à entrega de chaves em 6-10 meses.",
    color: "orange",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; num: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", num: "text-blue-500/20" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", num: "text-cyan-500/20" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20", num: "text-orange-500/20" },
};

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-28 md:py-40 relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4">
            Processo
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Como <span className="text-gradient">Funciona</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => {
            const c = colorMap[step.color];
            return (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="glass-card p-8 md:p-10 relative group h-full">
                  {/* Step number background */}
                  <div className={`absolute top-4 right-6 text-7xl font-black ${c.num} select-none pointer-events-none`}>
                    {step.num}
                  </div>

                  <div className={`w-14 h-14 ${c.bg} rounded-xl flex items-center justify-center mb-6 ${c.text} group-hover:scale-110 transition-transform duration-500`}>
                    <step.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-black mb-3 text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {step.desc}
                  </p>

                  {/* Connector line on desktop */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 w-8 lg:w-12 h-px bg-gradient-to-r from-white/10 to-transparent" />
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
