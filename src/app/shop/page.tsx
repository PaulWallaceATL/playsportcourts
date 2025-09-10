"use client";
import { shopContent as c } from "@/data/shop";
import * as React from "react";

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
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((p) => (
							<button key={p.id} className="glass-dark glass-border p-4 text-left hover-lift" onClick={() => setQuick(p)}>
								<div className="relative aspect-[16/10] rounded-md bg-gradient-primary bg-mesh-soft">
									<span className="absolute right-2 top-2 rounded-full bg-black/60 text-white text-xs px-2 py-0.5">${p.price.toFixed(2)}</span>
								</div>
								<div className="mt-3 flex items-center justify-between">
									<p className="font-semibold">{p.name}</p>
									<p className="text-sm text-muted-foreground">{p.category}</p>
								</div>
							</button>
						))}
					</div>
				</section>
			</div>

			{quick && (
				<div className="fixed inset-0 z-50 bg-black/70 grid place-items-center p-4" onClick={() => setQuick(null)}>
					<div className="glass-card p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
						<div className="relative aspect-[16/10] rounded-md bg-muted" />
						<h3 className="heading-3 mt-3">{quick.name}</h3>
						<p className="mt-1">${quick.price.toFixed(2)}</p>
						<div className="mt-4 flex gap-2">
							<button className="btn btn-primary">Add to Cart</button>
							<a className="underline" href="#">View details</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}


