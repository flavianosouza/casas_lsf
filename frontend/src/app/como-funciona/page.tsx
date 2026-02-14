import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ClipboardList,
  HardHat,
  PenTool,
} from "lucide-react";

export default function ComoFuncionaPage() {
  const steps = [
    {
      icon: <PenTool className="w-8 h-8 text-blue-400" />,
      title: "1. Simulação & Design",
      description:
        "Comece pelo nosso simulador online. Escolha a tipologia, área e acabamentos. A nossa IA gera uma estimativa preliminar e sugere plantas adaptadas ao seu terreno.",
    },
    {
      icon: <ClipboardList className="w-8 h-8 text-purple-400" />,
      title: "2. Orçamento Detalhado",
      description:
        "Após a simulação, receba um contacto da nossa equipa técnica. Validamos os requisitos e apresentamos um mapa de quantidades exato (estrutura, isolamentos, revestimentos).",
    },
    {
      icon: <HardHat className="w-8 h-8 text-pink-400" />,
      title: "3. Produção & Construção",
      description:
        "A estrutura LSF é fabricada em fábrica com precisão milimétrica. A montagem em obra é 3x mais rápida que a alvenaria, sem desperdícios e com chaves na mão.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-400" />,
      title: "4. Entrega",
      description:
        "Receba a sua casa pronta a habitar, com eficiência energética Classe A+ e garantia estrutural. O futuro da sua família começa aqui.",
    },
  ];

  return (
    <main className="min-h-screen bg-[url('/bg-grid.svg')] bg-fixed bg-cover py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium">
            O Processo Simplificado
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Como funciona o{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Sistema LSF
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Da sua ideia à chave na mão. Eliminamos a complexidade da construção
            tradicional com tecnologia e transparência.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full"></div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}
              >
                {/* Icon Marker */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-900 border border-white/20 rounded-full items-center justify-center z-10">
                  <div className="text-sm font-bold text-gray-500">
                    {index + 1}
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1 w-full">
                  <div className="glass-card p-8 md:p-10 hover:border-blue-500/30 transition-all duration-300 group">
                    <div className="mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Empty Space for Grid alignment */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="glass-card p-12 inline-block max-w-3xl">
            <h3 className="text-3xl font-bold mb-6 text-white">
              Pronto para dar o primeiro passo?
            </h3>
            <p className="text-gray-400 mb-8">
              Não precisa de ter terreno ou projeto aprovado para começar a
              planear. Descubra quanto custa a sua ideia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/simulador"
                className="btn-primary px-8 py-4 flex items-center justify-center gap-2 text-lg"
              >
                Fazer Simulação Grátis <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="px-8 py-4 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all font-medium border border-white/10 hover:border-white/20"
              >
                Voltar à Página Inicial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
