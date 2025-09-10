"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { garageTiles } from "@/data/products";
import { RotatingTile } from "@/components/interactive/RotatingTile";

export function GarageSlideshow() {
	const [index, setIndex] = React.useState(0);
	const total = garageTiles.length;

	React.useEffect(() => {
		const id = setInterval(() => setIndex((i) => (i + 1) % total), 3500);
		return () => clearInterval(id);
	}, [total]);

	const go = (dir: -1 | 1) => setIndex((i) => (i + dir + total) % total);

	const current = garageTiles[index];

	// Detect if the product is still using a placeholder SVG
	const isPlaceholder = React.useMemo(() => {
		const src = current?.heroImage || "";
		return src.endsWith("/file.svg") || src.endsWith("/window.svg") || src.endsWith("/globe.svg") || src.endsWith("/next.svg");
	}, [current]);

	return (
		<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
			<div className="flex items-end justify-between gap-4 mb-4">
				<h2 className="heading-2">Garage Tiles</h2>
				<Link href="/garage-tiles" className="text-sm underline holo-link">Shop all</Link>
			</div>
			<div className="relative rounded-xl overflow-hidden surface-elevated gradient-border-anim">
				<Link href={`/garage-tiles/${current.slug}`} className="block">
					<div className="relative h-64 md:h-72 w-full bg-gradient-primary bg-mesh-soft">
						{isPlaceholder ? (
							<div className="absolute inset-0 grid place-items-center">
								<RotatingTile size={220} />
							</div>
						) : (
							<Image src={current.heroImage} alt={current.name} fill sizes="(max-width:768px) 100vw, (max-width:1280px) 70vw, 50vw" className="object-contain p-6" />
						)}
						{/* Product info overlay */}
						<div className="absolute inset-x-0 bottom-0 p-4 backdrop-tint">
							<p className="font-semibold">{current.name}</p>
							<p className="text-sm text-muted-foreground">From ${current.price.toFixed(2)} {current.pricePerUnitLabel}</p>
						</div>
					</div>
				</Link>
				{/* Controls */}
				<div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
					<button type="button" onClick={() => go(-1)} aria-label="Previous" className="pointer-events-auto fab text-white px-3 py-2">‹</button>
					<button type="button" onClick={() => go(1)} aria-label="Next" className="pointer-events-auto fab text-white px-3 py-2">›</button>
				</div>
				{/* Dots */}
				<div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1.5">
					{garageTiles.map((_, i) => (
						<button key={i} aria-label={`Go to ${i+1}`} onClick={() => setIndex(i)} className={i === index ? "h-1.5 w-6 rounded-full bg-white/70" : "h-1.5 w-1.5 rounded-full bg-white/30"} />
					))}
				</div>
			</div>
		</section>
	);
}


