"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { garageTiles } from "@/data/products";

export function GarageSlideshow() {
	const [index, setIndex] = React.useState(0);
	const total = garageTiles.length;

	React.useEffect(() => {
		const id = setInterval(() => setIndex((i) => (i + 1) % total), 3500);
		return () => clearInterval(id);
	}, [total]);

	const go = (dir: -1 | 1) => setIndex((i) => (i + dir + total) % total);

	const current = garageTiles[index];

	return (
		<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
			<h2 className="heading-2 mb-4">Garage Tiles</h2>
			<div className="relative surface-elevated rounded-xl p-3 overflow-hidden">
				<Link href={`/garage-tiles/${current.slug}`} className="block">
					<div className="relative h-56 md:h-64 w-full">
						<Image src={current.heroImage} alt={current.name} fill className="object-contain p-4" />
					</div>
					<p className="mt-3 font-semibold">{current.name}</p>
					<p className="text-sm text-muted-foreground">From ${current.price.toFixed(2)} {current.pricePerUnitLabel}</p>
				</Link>
				<div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
					<button type="button" className="rounded-full bg-black/30 text-white px-2 py-1" onClick={() => go(-1)} aria-label="Previous">‹</button>
					<button type="button" className="rounded-full bg-black/30 text-white px-2 py-1" onClick={() => go(1)} aria-label="Next">›</button>
				</div>
				<div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1.5">
					{garageTiles.map((_, i) => (
						<button key={i} aria-label={`Go to ${i+1}`} onClick={() => setIndex(i)} className={i === index ? "h-2 w-4 rounded-full bg-black/60" : "h-2 w-2 rounded-full bg-black/30"} />
					))}
				</div>
			</div>
		</section>
	);
}


