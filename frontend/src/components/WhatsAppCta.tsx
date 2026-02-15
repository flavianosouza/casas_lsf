import { MessageCircle } from "lucide-react";

interface WhatsAppCtaProps {
  articleTitle?: string;
  titulo?: string;
}

export default function WhatsAppCta({ articleTitle, titulo }: WhatsAppCtaProps) {
  const title = articleTitle || titulo;
  const phone = "351930423456";
  const message = title
    ? `Olá! Li o artigo "${title}" e gostaria de saber mais sobre construção LSF.`
    : "Olá! Gostaria de saber mais sobre construção LSF.";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="glass-card p-8 text-center mt-8">
      <p className="text-white font-bold text-lg mb-2">
        Prefere falar diretamente com um especialista?
      </p>
      <p className="text-gray-400 text-sm mb-6">
        A nossa equipa técnica está disponível para esclarecer todas as suas
        dúvidas sobre construção LSF.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-green-600 text-white font-bold hover:bg-green-500 transition-colors"
      >
        <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
      </a>
    </div>
  );
}
