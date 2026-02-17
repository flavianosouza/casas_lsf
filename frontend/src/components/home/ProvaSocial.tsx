import { Shield, Award, Building2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const credentials = [
  {
    icon: Shield,
    title: "Alvará IMPIC",
    value: "94665",
    desc: "Habilitação legal para execução de obras em Portugal",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Building2,
    title: "Empresa Registada",
    value: "NIF 515866989",
    desc: "OBRASNET UNIP LDA — Construção Civil e Engenharia",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Award,
    title: "Especialização",
    value: "LSF",
    desc: "Light Steel Frame — tecnologia de construção a seco premium",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
];

const stats = [
  { value: "200+", label: "Estudos Gerados" },
  { value: "50+", label: "Projetos Ativos" },
  { value: "6-10", label: "Meses de Obra" },
  { value: "50+", label: "Anos de Garantia" },
];

export default function ProvaSocial() {
  return (
    <section className="py-28 md:py-40 bg-black/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-4">
            Credibilidade
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Confiança <span className="text-gradient">Comprovada</span>
          </h2>
        </ScrollReveal>

        {/* Credential Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {credentials.map((cred, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className="glass-card p-8 text-center group h-full">
                <div className={`w-14 h-14 ${cred.bg} rounded-xl flex items-center justify-center mx-auto mb-5 ${cred.color} group-hover:scale-110 transition-transform duration-500`}>
                  <cred.icon className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  {cred.title}
                </div>
                <div className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
                  {cred.value}
                </div>
                <p className="text-gray-400 text-sm">{cred.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Stats Bar */}
        <ScrollReveal>
          <div className="glass-card p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                    {s.value}
                  </div>
                  <div className="text-[10px] font-bold text-blue-400/70 uppercase tracking-[0.2em] mt-2">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </section>
  );
}
