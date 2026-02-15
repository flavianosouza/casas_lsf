import { Award, Building, Shield } from "lucide-react";

export default function AuthorSection() {
  return (
    <section className="glass-card p-8 mb-8">
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
          <Building className="w-7 h-7 text-blue-400" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-1">
            Equipa Técnica OBRASNET
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Este artigo foi elaborado pela equipa técnica especializada em
            construção LSF da OBRASNET UNIP LDA, com obras executadas em
            Portugal e experiência comprovada em projetos licenciados de
            construção em aço leve.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-500" />
              Alvará IMPIC 94665
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-500" />
              NIF 515 866 989
            </span>
            <span className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-500" />
              Sintra, Portugal
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
