"use client";

import * as React from "react";

export function BeforeAfter({ before, after }: { before?: React.ReactNode; after?: React.ReactNode }) {
	const [pos, setPos] = React.useState(50);
	return (
		<div className="relative placeholder-card aspect-16-9 bg-gradient-neutral">
			<div className="absolute inset-0" aria-hidden>
				{before ?? <div className="placeholder-gradient pattern-court w-full h-full" />}
			</div>
			<div className="absolute inset-0 clip" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
				{after ?? <div className="placeholder-gradient pattern-court-dense w-full h-full" />}
			</div>
			<input
				type="range"
				min={0}
				max={100}
				value={pos}
				onChange={(e) => setPos(parseInt(e.target.value))}
				className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 [writing-mode:bt-lr] rotate-90 opacity-0 w-full h-full"
				aria-label="Before after slider"
			/>
			<div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-[var(--brand-primary)]/70" />
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[var(--brand-primary)]/90 shadow-neon-blue" />
		</div>
	);
}


