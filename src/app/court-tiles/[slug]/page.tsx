import Image from "next/image";
import { notFound } from "next/navigation";
import { courtTiles } from "@/data/products";
import { ColorPreview } from "@/components/interactive/ColorPreview";

interface Props {
  params: { slug: string }
}

export default function CourtTilePage({ params }: Props) {
  const product = courtTiles.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <div>
      <section className="relative isolate">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <h1 className="heading-1 text-gradient-primary text-glow">{product.name}</h1>
              <p className="mt-2 text-body text-muted-foreground">{product.description}</p>
              <div className="mt-3 text-sm text-muted-foreground">
                <p><span className="font-semibold">Brand:</span> {product.brand ?? "PlaySport"}</p>
                <p><span className="font-semibold">Best for:</span> {product.bestFor.join(", ")}</p>
                <p><span className="font-semibold">Price:</span> ${product.price.toFixed(2)} {product.pricePerUnitLabel}</p>
              </div>
            </div>
            <div className="relative aspect-[16/10] rounded-md overflow-hidden glass-card">
              <Image src={product.heroImage} alt={product.name} fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-card gradient-border-anim p-6">
            <h2 className="heading-3">Specifications</h2>
            <ul className="mt-3 grid gap-1 text-sm text-muted-foreground">
              <li><span className="font-medium text-foreground">Material:</span> {product.specs.material}</li>
              <li><span className="font-medium text-foreground">Dimensions:</span> {product.specs.dimensions}</li>
              {product.specs.thickness && <li><span className="font-medium text-foreground">Thickness:</span> {product.specs.thickness}</li>}
              {product.specs.weight && <li><span className="font-medium text-foreground">Weight:</span> {product.specs.weight}</li>}
            </ul>
            <h3 className="mt-4 font-semibold">Features</h3>
            <ul className="mt-2 grid gap-1 text-sm list-disc list-inside">
              {product.specs.features.map((f) => (<li key={f}>{f}</li>))}
            </ul>
          </div>
          <div className="glass-card gradient-border-anim p-6">
            <ColorPreview title="Color Preview" baseImage={product.heroImage} colors={product.colors} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <h2 className="heading-2 mb-3">Compatible Sports</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {product.compatibleSports.map((s) => (
            <span key={s} className="rounded-full px-3 py-1 bg-foreground/5 border">{s}</span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <h2 className="heading-2 mb-3">Gallery</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {product.gallery.map((src, i) => (
            <div key={i} className="relative aspect-[16/10] overflow-hidden rounded-md glass-card">
              <Image src={src} alt={`${product.name} ${i+1}`} fill className="object-contain" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


