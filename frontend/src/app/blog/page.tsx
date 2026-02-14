import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      title: "LSF vs Alvenaria: Qual o melhor para Portugal?",
      excerpt: "Uma comparação detalhada sobre custos, durabilidade e isolamento térmico nos dois métodos.",
      date: "12 Fev 2026",
      readTime: "5 min"
    },
    {
      title: "Como financiar a sua casa LSF",
      excerpt: "Guia completo sobre crédito habitação para construção em aço leve e o que os bancos exigem.",
      date: "10 Fev 2026",
      readTime: "7 min"
    },
    {
      title: "5 Mitos sobre casas pré-fabricadas",
      excerpt: "Desmistificamos as ideias erradas sobre durabilidade e valor de mercado das casas modulares.",
      date: "05 Fev 2026",
      readTime: "4 min"
    }
  ];

  return (
    <main className="min-h-screen bg-[url('/bg-grid.svg')] bg-fixed bg-cover py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" /> Blog & Notícias
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Conhecimento LSF</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Artigos técnicos, guias e novidades sobre o mundo da construção sustentável.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16 animate-fade-in">
          {posts.map((post, i) => (
            <div key={i} className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300 flex flex-col cursor-pointer group">
              <div className="text-xs text-blue-400 mb-4 font-mono">{post.date} • {post.readTime} leitura</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{post.title}</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">
                {post.excerpt}
              </p>
               <div className="text-white text-sm font-medium flex items-center gap-2 mt-auto">
                Ler Artigo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
