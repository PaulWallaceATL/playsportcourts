import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ColorPreview } from "@/components/interactive/ColorPreview";
import { Check, Ruler, Boxes, Droplets } from "lucide-react";
import { Recommendations } from "@/components/advanced/Recommendations";
import { CostCalculator } from "@/components/advanced/CostCalculator";
import { ShareButtons } from "@/components/advanced/ShareButtons";
import { ARButton, VRButton } from "@/components/advanced/ARVR";
import { TileCourt, Basketball, Pickleball, Tennis, MultiSport } from "@/components/icons";
import { notFound } from "next/navigation";
import { QuoteButton } from "@/components/advanced/QuoteButton";
import { courtTiles } from "@/data/products";
import { RotatingTile } from "@/components/interactive/RotatingTile";

export default async function CourtTilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = courtTiles.find((p) => p.slug === slug);
  if (!product) return notFound();

  // Inline tracking for page view (executed client side after hydration via script)
  const tracker = `window && window.gtag && window.gtag('event','product_view', ${JSON.stringify({ slug: "${slug}", name: "${product?.name}", price: product?.price })});`;

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-primary animate-gradient" />
        </div>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.brand ?? "PlaySport"}</p>
              <h1 className="heading-1 text-white">{product.name}</h1>
              <p className="mt-2 text-body text-muted-foreground max-w-prose">{product.description}</p>
              <div className="mt-5 flex items-center gap-3">
                <Button size="lg">From ${product.price.toFixed(2)} {product.pricePerUnitLabel}</Button>
                <QuoteButton productName={product.name} />
              </div>
            </div>
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden surface-elevated anim-scale-in bg-gradient-primary bg-mesh-soft">
              {(product.heroImage.endsWith("/file.svg") || product.heroImage.endsWith("/window.svg") || product.heroImage.endsWith("/globe.svg") || product.heroImage.endsWith("/next.svg")) ? (
                <div className="absolute inset-0 grid place-items-center">
                  <RotatingTile size={240} />
                </div>
              ) : (
                <Image src={product.heroImage} alt={product.name} fill className="object-contain p-4" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Details + Customizer */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <div className="glass-dark glass-border p-6">
            <h2 className="heading-3">Specifications</h2>
            <ul className="mt-4 grid gap-3 text-sm">
              <li className="flex items-center gap-2"><TileCourt size={20} /><span className="text-muted-foreground">Dimensions:</span><span className="font-medium text-foreground">{product.specs.dimensions}</span></li>
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
          <div className="glass-dark glass-border p-6">
            <ColorPreview title="Color Customizer" baseImage={product.heroImage} colors={product.colors} />
            <div className="mt-4 flex items-center gap-3">
              <ShareButtons title={`Check out the ${product.name} tile`} />
              <ARButton />
              <VRButton />
            </div>
          </div>
        </div>
      </section>

      {/* Sports suitability */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <h2 className="heading-2 mb-3">Best For</h2>
        <div className="flex flex-wrap gap-2 text-sm items-center">
          {product.compatibleSports.map((s) => {
            const Icon = s.includes("Basketball") ? Basketball : s.includes("Pickleball") ? Pickleball : s.includes("Tennis") ? Tennis : MultiSport;
            return (
              <span key={s} className="inline-flex items-center gap-1 rounded-full px-3 py-1 bg-foreground/5 border">
                <Icon size={16} /> {s}
              </span>
            );
          })}
        </div>
      </section>

      {/* Recommendations & Calculator */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <div className="grid gap-6 md:grid-cols-2">
          <Recommendations products={[product]} input={{ primarySport: product.bestFor[0] ?? "Basketball", surface: "concrete", budget: "balanced" }} />
          <CostCalculator basePrice={product.price} />
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <h2 className="heading-2 mb-3">Gallery</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {product.gallery.map((src, i) => (
            <div key={i} className="relative aspect-[16/10] overflow-hidden rounded-md glass-card bg-gradient-primary">
              {(src.endsWith("/file.svg") || src.endsWith("/window.svg") || src.endsWith("/globe.svg") || src.endsWith("/next.svg")) ? (
                <div className="absolute inset-0 grid place-items-center">
                  <RotatingTile size={180} />
                </div>
              ) : (
                <Image src={src} alt={`${product.name} ${i+1}`} fill className="object-contain p-4" />
              )}
            </div>
          ))}
        </div>
      </section>
      <script dangerouslySetInnerHTML={{ __html: tracker }} />
    </div>
  );
}


export async function generateStaticParams() {
  return courtTiles.map((p) => ({ slug: p.slug }));
}


