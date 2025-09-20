"use client";
import * as React from "react";
import Link from "next/link";
import { siteContent } from "@/data/home";
import { courtTiles } from "@/data/products";
import Image from "next/image";
import { RotatingTile } from "@/components/interactive/RotatingTile";

const accentByIndex = ["#00D4FF", "#00FF88", "#FF6B35", "#8B5CF6", "#FF0080", "#00D4FF", "#00FF88", "#8B5CF6"];

export function Solutions() {
	const s = siteContent.solutions;
	const [openIndex, setOpenIndex] = React.useState<number | null>(null);
	const compatibleBySport: Record<string, string[]> = {
		Basketball: ["Elite Pro", "True Tile", "X Court", "Game Tile"],
		Pickleball: ["Elite Pro", "True Tile", "Game Tile"],
		Shuffleboard: ["True Tile", "Game Tile"],
		Tennis: ["Game Tile"],
		"Multi-Sport Game Courts": ["Elite Pro", "True Tile", "X Court", "Game Tile"],
		"Hockey/Skate Rinks": ["X Court"],
	};

    return (
        <section id="sports" className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
			<h2 className="heading-2 mb-6">{s.title}</h2>
			<div className="grid-scene grid-masonry">
				{s.items.map((item, idx) => {
					const compat = compatibleBySport[item.title] ?? [];
					const products = courtTiles.filter((p) => compat.includes(p.name));
					const isOpen = openIndex === idx;
					return (
						<div key={item.title} className="card-item glass-dark glass-border gradient-border-anim p-5 block" style={{ breakInside: "avoid" }}>
							<Link href={item.href} className="block">
								<div className="placeholder-card aspect-4-3 bg-gradient-primary pattern-court-dense shadow-neon-blue grid place-items-center">
									<RotatingTile size={120} />
								</div>
								<div className="mt-3 flex items-center justify-between">
									<p className="font-semibold text-white">{item.title}</p>
									<button type="button" className="sport-badge" onClick={(e) => { e.preventDefault(); setOpenIndex(isOpen ? null : idx); }} style={{ boxShadow: `0 0 12px ${accentByIndex[idx % accentByIndex.length]}55`, borderColor: `${accentByIndex[idx % accentByIndex.length]}55` }}>
										<span className="h-2.5 w-2.5 rounded-full" style={{ background: accentByIndex[idx % accentByIndex.length], boxShadow: `0 0 8px ${accentByIndex[idx % accentByIndex.length]}` }} />
										<span>{isOpen ? "Hide tiles" : "Show tiles"}</span>
									</button>
								</div>
							</Link>
							{isOpen && (
								<div className="mt-3 grid gap-2">
									{products.map((p) => {
										const ph = p.thumbnail.endsWith("/file.svg") || p.thumbnail.endsWith("/window.svg") || p.thumbnail.endsWith("/globe.svg") || p.thumbnail.endsWith("/next.svg");
										return (
											<Link key={p.slug} href={`/court-tiles/${p.slug}`} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-foreground/5">
												<span className="relative h-8 w-8 overflow-hidden rounded bg-gradient-primary">
													{ph ? (
														<div className="absolute inset-0 grid place-items-center scale-90">
															<RotatingTile size={28} />
														</div>
													) : (
														<Image src={p.thumbnail} alt="" fill className="object-contain p-1" />
													)}
												</span>
												<span className="text-sm">{p.name}</span>
											</Link>
										);
									})}
									{products.length === 0 && (
										<p className="text-sm text-muted-foreground">No compatible tiles listed.</p>
									)}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
}


