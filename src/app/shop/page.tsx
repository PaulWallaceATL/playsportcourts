"use client";
import { shopContent as c } from "@/data/shop";
import * as React from "react";
import { courtTiles, garageTiles } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

export const metadata = {
  title: "Shop",
  description: "Browse our complete catalog of premium sport court tiles, garage tiles, and accessories. Shop online with secure checkout.",
};

export default function ShopPage() {
	const [filter, setFilter] = React.useState<string>(c.categories[0]);
	const items = [
		{ id: "elite-pro", name: "Elite Pro", price: 5.25, category: "Court Tiles" },
		{ id: "game-tile", name: "Game Tile", price: 4.75, category: "Court Tiles" },
		{ id: "ribtrax-pro", name: "Ribtrax Pro", price: 7.9, category: "Garage Tiles" },
		{ id: "vinyltrax-pro", name: "Vinyltrax Pro", price: 9.5, category: "Garage Tiles" },
		{ id: "pickleball-paddle", name: "Pickleball Paddle", price: 89, category: "Accessories" },
	];
	const filtered = items.filter((i) => filter === "All Products" || i.category === filter || c.categories.includes(filter));
	const [quick, setQuick] = React.useState<typeof items[number] | null>(null);

	return (
		<div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
			<h1 className="heading-1 text-white">{c.page.title}</h1>
			<p className="mt-2 text-body text-muted-foreground">{c.page.description}</p>

			<div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
				<aside className="glass-card p-4 h-fit">
					<p className="font-semibold mb-2">Categories</p>
					<ul className="grid gap-2 text-sm">
						{c.categories.map((cat) => (
							<li key={cat}>
								<button className={`hover:text-[var(--primary)] ${filter === cat ? "font-semibold" : ""}`} onClick={() => setFilter(cat)}>{cat}</button>
							</li>
						))}
					</ul>
				</aside>
				<section>
					<div className="mt-2 mb-4 flex flex-wrap gap-2">
						{c.categories.map((cat) => (
							<button key={cat} className={`sport-badge ${filter===cat? 'ring-1 ring-[var(--primary)]' : ''}`} onClick={()=>setFilter(cat)}>{cat}</button>
						))}
					</div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((p) => {
							const court = courtTiles.find(ct => ct.slug === p.id);
							const garage = garageTiles.find(gt => gt.slug === p.id);
							const product = court ?? garage;
							const image = product?.heroImage ?? "/file.svg";
							const priceLabel = product?.pricePerUnitLabel ? `${p.price.toFixed(2)} ${product.pricePerUnitLabel}` : p.price.toFixed(2);
							const href = p.category === "Court Tiles" ? `/court-tiles/${p.id}` : p.category === "Garage Tiles" ? `/garage-tiles/${p.id}` : "#";
							return (
								<div key={p.id} onClick={() => p.category==="Accessories" ? setQuick(p) : undefined}>
									<ProductCard href={href} name={p.name} price={`$${priceLabel}`} image={image} badge={p.category !== "Accessories" ? p.category : undefined} />
								</div>
							);
						})}
					</div>
				</section>
			</div>

			{quick && (
				<div className="fixed inset-0 z-50 bg-black/70 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={`${quick.name} quick view`} onClick={() => setQuick(null)}>
					<div className="glass-card p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
						<div className="relative aspect-[16/10] rounded-md bg-gradient-primary bg-mesh-soft" />
						<h3 className="heading-3 mt-3">{quick.name}</h3>
						<p className="mt-1">${quick.price.toFixed(2)}</p>
						<div className="mt-4 flex gap-2">
							<button className="btn btn-primary" autoFocus>Add to Cart</button>
							<a className="underline" href="#">View details</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}


