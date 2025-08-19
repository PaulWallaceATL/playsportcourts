"use client";

import * as React from "react";
import "./CourtBuilder.css";

const COLORS = ["#1E40AF", "#0EA5E9", "#059669", "#10B981", "#EA580C", "#F97316", "#6B7280", "#00D4FF", "#8B5CF6", "#FF0080"];

export function CourtBuilder() {
	const [color, setColor] = React.useState(COLORS[0]);
	const ref = React.useRef<HTMLDivElement | null>(null);

	function select(c: string, e?: React.MouseEvent) {
		setColor(c);
		const box = ref.current;
		if (!box) return;
		if (e) {
			const r = box.getBoundingClientRect();
			const rx = `${((e.clientX - r.left) / r.width) * 100}%`;
			const ry = `${((e.clientY - r.top) / r.height) * 100}%`;
			box.style.setProperty("--rx", rx);
			box.style.setProperty("--ry", ry);
			box.classList.add("rippling");
			setTimeout(() => box.classList.remove("rippling"), 500);
		}
	}

	return (
		<div className="cb">
			<div ref={ref} className="cb-preview aspect-16-9 glass-card glass-border">
				<div className="cb-stage" style={{ ['--sel' as unknown as string]: color, ['--ambient' as unknown as string]: `${parseInt(color.slice(1,3),16)},${parseInt(color.slice(3,5),16)},${parseInt(color.slice(5,7),16)}` }}>
					<div className="cb-court" />
					<div className="cb-lines" />
					<div className="cb-center" />
				</div>
			</div>
			<div className="palette mt-3">
				{COLORS.map((c) => (
					<button key={c} className={`swatch3d ${c===color? 'active':''}`} style={{ background: c }} aria-label={`Choose ${c}`} onClick={(e) => select(c, e)} />
				))}
				<span className="code-badge readout">{color.toUpperCase()}</span>
			</div>
		</div>
	);
}


