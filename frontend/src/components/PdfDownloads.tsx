import { FileText, Download } from "lucide-react";

interface PdfItem {
  titulo: string;
  url: string;
  index: number;
}

interface Props {
  pdfs: PdfItem[];
  apiBase: string;
  modeloTitulo: string;
}

export default function PdfDownloads({ pdfs, apiBase, modeloTitulo }: Props) {
  if (!pdfs || pdfs.length === 0) return null;

  return (
    <section className="glass-card p-8 md:p-10 mb-12">
      <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
        Documentação Técnica
      </h2>
      <p className="text-gray-400 mb-6 text-sm">
        Descarregue os documentos oficiais deste modelo
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {pdfs.map((pdf) => (
          <a
            key={pdf.index}
            href={`${apiBase}${pdf.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
            aria-label={`Descarregar ${pdf.titulo} de ${modeloTitulo}`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-white font-medium text-sm">
                {pdf.titulo}
              </span>
            </div>
            <Download className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
          </a>
        ))}
      </div>
    </section>
  );
}
