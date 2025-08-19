"use client";

import * as React from "react";
import "./CourtBuilder.css";

const COLORS = ["#1E40AF", "#0EA5E9", "#059669", "#10B981", "#EA580C", "#F97316", "#6B7280"];

export function CourtBuilder() {
	const [color, setColor] = React.useState(COLORS[0]);
	return (
		<div>
			<div className="placeholder-card aspect-16-9 shadow-layered hover-lift" style={{ backgroundColor: color }}>
				<div className="court">
					<div className="key" />
					<div className="arc" />
					<div className="center" />
				</div>
			</div>
			<div className="palette mt-3">
				{COLORS.map((c) => (
					<button key={c} className="swatch" style={{ background: c }} aria-label={`Choose ${c}`} onClick={() => setColor(c)} />
				))}
			</div>
		</div>
	);
}


