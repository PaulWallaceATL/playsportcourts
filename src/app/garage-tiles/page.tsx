// removed unused imports
import { garageTiles } from "@/data/products";
// removed unused imports
import { ProductCard } from "@/components/ui/ProductCard";

export default function GarageTilesIndexPage() {
  return (
    <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
      <h1 className="heading-1 text-white">Garage Tiles</h1>
      <p className="mt-2 text-body text-muted-foreground">Premium Swisstrax-style tiles for garages and showrooms.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {garageTiles.map((p) => (
          <ProductCard key={p.slug} href={`/garage-tiles/${p.slug}`} name={p.name} price={`$${p.price.toFixed(2)} ${p.pricePerUnitLabel}`} image={p.heroImage} />
        ))}
      </div>
    </section>
  );
}


