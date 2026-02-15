import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedArticle {
  slug: string;
  titulo: string;
  categoria: string;
  resumo?: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

const CATEGORIAS_LABELS: Record<string, string> = {
  "construcao-lsf": "Construção LSF",
  "precos-construcao": "Preços",
  "casas-modulares": "Casas Modulares",
  "credito-habitacao": "Crédito",
  "icf-plastbau": "ICF / Plastbau",
  "telhados-coberturas": "Telhados",
  "terrenos-licencas": "Terrenos",
  "remodelacao": "Remodelação",
  "pavilhoes-garagens": "Pavilhões",
  "dicas-construcao": "Dicas",
  "isolamento-energia": "Isolamento",
  "casas-madeira": "Casas Madeira",
  "betao": "Betão",
  "acabamentos": "Acabamentos",
};

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Artigos Relacionados</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {articles.slice(0, 4).map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="glass-card p-5 group hover:border-blue-500/20 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                {CATEGORIAS_LABELS[article.categoria] || article.categoria}
              </span>
            </div>
            <h3 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors mb-2 line-clamp-2">
              {article.titulo}
            </h3>
            {article.resumo && (
              <p className="text-xs text-gray-500 line-clamp-2 mb-2">{article.resumo}</p>
            )}
            <span className="text-xs text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-1">
              Ler artigo <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
