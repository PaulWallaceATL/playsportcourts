import Image from "next/image";
import { notFound } from "next/navigation";
import { garageTiles } from "@/data/products";
import { ColorPreview } from "@/components/interactive/ColorPreview";
import { Button } from "@/components/ui/button";
import { Check, Boxes, Ruler } from "lucide-react";
import { Recommendations } from "@/components/advanced/Recommendations";
import { CostCalculator } from "@/components/advanced/CostCalculator";
import { ShareButtons } from "@/components/advanced/ShareButtons";
import { ARButton, VRButton } from "@/components/advanced/ARVR";
import { QuoteButton } from "@/components/advanced/QuoteButton";

export default async function GarageTilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = garageTiles.find((p) => p.slug === slug);
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
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.brand ?? "Swisstrax"}</p>
              <h1 className="heading-1 text-white">{product.name}</h1>
              <p className="mt-2 text-body text-muted-foreground max-w-prose">{product.description}</p>
              <div className="mt-5 flex items-center gap-3">
                <Button size="lg">From ${product.price.toFixed(2)} {product.pricePerUnitLabel}</Button>
                <QuoteButton productName={product.name} />
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
            <div className="mt-4 flex items-center gap-3">
              <ShareButtons title={`Check out the ${product.name} tile`} />
              <ARButton />
              <VRButton />
            </div>
          </div>
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

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <div className="grid gap-6 md:grid-cols-2">
          <Recommendations products={[product]} input={{ primarySport: "Garages", surface: "indoors", budget: "balanced" }} />
          <CostCalculator basePrice={product.price} />
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return garageTiles.map((p) => ({ slug: p.slug }));
}


