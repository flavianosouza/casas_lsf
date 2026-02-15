interface FaqItem {
  pergunta: string;
  resposta: string;
}

export default function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">
        Perguntas Frequentes
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group glass-card overflow-hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer p-5 text-white font-medium hover:text-blue-300 transition-colors list-none">
              <span className="pr-4">{faq.pergunta}</span>
              <span className="text-blue-500 text-xl shrink-0 group-open:rotate-45 transition-transform duration-200">
                +
              </span>
            </summary>
            <div className="px-5 pb-5 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
              {faq.resposta}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
