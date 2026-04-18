import Image from "next/image";

interface Props {
  planta2dUrls: string[];
  render3dUrls: string[];
  modeloTitulo: string;
  apiBase: string;
}

/**
 * Grid de imagens de um modelo.
 * - Plantas 2D em primeiro lugar (técnicas)
 * - Renders 3D abaixo (interior)
 */
export default function PlantaGallery({
  planta2dUrls,
  render3dUrls,
  modeloTitulo,
  apiBase,
}: Props) {
  const render3dLabels = ["Sala", "Cozinha", "Suite", "WC"];

  return (
    <div className="space-y-8 mb-12">
      {planta2dUrls.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Planta 2D Técnica
          </h2>
          <div
            className={
              planta2dUrls.length > 1
                ? "grid md:grid-cols-2 gap-4"
                : ""
            }
          >
            {planta2dUrls.map((path, i) => (
              <figure
                key={i}
                className="rounded-2xl overflow-hidden border border-white/10 bg-white"
              >
                <Image
                  src={`${apiBase}${path}`}
                  alt={`Planta 2D técnica — ${modeloTitulo}${planta2dUrls.length > 1 ? ` opção ${String.fromCharCode(65 + i)}` : ""}`}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
                  className="w-full h-auto"
                  unoptimized
                />
              </figure>
            ))}
          </div>
        </section>
      )}

      {render3dUrls.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Visualização 3D Interior
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {render3dUrls.map((path, i) => (
              <figure
                key={i}
                className="rounded-2xl overflow-hidden border border-white/10 bg-black"
              >
                <Image
                  src={`${apiBase}${path}`}
                  alt={`Render 3D — ${modeloTitulo} — ${render3dLabels[i] ?? `vista ${i + 1}`}`}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto"
                  unoptimized
                />
                <figcaption className="text-xs text-gray-400 p-2 text-center">
                  {render3dLabels[i] ?? `Vista ${i + 1}`}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
