import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ColorPreview } from "@/components/interactive/ColorPreview";
import { Check, Ruler, Boxes, Droplets } from "lucide-react";
import { notFound } from "next/navigation";
import { courtTiles } from "@/data/products";

export default async function CourtTilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = courtTiles.find((p) => p.slug === slug);
  if (!product) return notFound();

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full" style={{ background: "radial-gradient(1000px 600px at 20% 10%, rgba(255,255,255,0.06), transparent), linear-gradient(180deg, #0a0a0b, #0f172a)" }} />
        </div>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.brand ?? "PlaySport"}</p>
              <h1 className="heading-1 text-white">{product.name}</h1>
              <p className="mt-2 text-body text-muted-foreground max-w-prose">{product.description}</p>
              <div className="mt-5 flex items-center gap-3">
                <Button size="lg">From ${product.price.toFixed(2)} {product.pricePerUnitLabel}</Button>
                <Button variant="outline" size="lg">Get a Quote</Button>
              </div>
            </div>
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden surface-elevated">
              <Image src={product.heroImage} alt={product.name} fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Details + Customizer */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <div className="glass-card p-6">
            <h2 className="heading-3">Specifications</h2>
            <ul className="mt-4 grid gap-3 text-sm">
              <li className="flex items-center gap-2"><Ruler className="h-4 w-4" /><span className="text-muted-foreground">Dimensions:</span><span className="font-medium text-foreground">{product.specs.dimensions}</span></li>
              <li className="flex items-center gap-2"><Boxes className="h-4 w-4" /><span className="text-muted-foreground">Material:</span><span className="font-medium text-foreground">{product.specs.material}</span></li>
              {product.specs.thickness && <li className="flex items-center gap-2"><Droplets className="h-4 w-4" /><span className="text-muted-foreground">Thickness:</span><span className="font-medium text-foreground">{product.specs.thickness}</span></li>}
            </ul>
            <h3 className="mt-5 font-semibold">Features</h3>
            <ul className="mt-2 grid gap-2 text-sm">
              {product.specs.features.map((f) => (
                <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--primary)]" /><span>{f}</span></li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-6">
            <ColorPreview title="Color Customizer" baseImage={product.heroImage} colors={product.colors} />
          </div>
        </div>
      </section>

      {/* Sports suitability */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <h2 className="heading-2 mb-3">Best For</h2>
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


