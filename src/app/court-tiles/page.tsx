// removed unused imports
import { courtTiles } from "@/data/products";
// removed unused imports
import { ProductCard } from "@/components/ui/ProductCard";

export default function CourtTilesIndexPage() {
  return (
    <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
      <h1 className="heading-1 text-white">Court Tiles</h1>
      <p className="mt-2 text-body text-muted-foreground">Explore outdoor tiles for courts and multi-sport applications.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courtTiles.map((p) => (
          <ProductCard key={p.slug} href={`/court-tiles/${p.slug}`} name={p.name} price={`$${p.price.toFixed(2)} ${p.pricePerUnitLabel}`} image={p.heroImage} />
        ))}
      </div>
    </section>
  );
}


