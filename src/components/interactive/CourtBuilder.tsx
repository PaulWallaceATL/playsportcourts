"use client";

import * as React from "react";
import "./CourtBuilder.css";

const COLORS = ["#1E40AF", "#0EA5E9", "#059669", "#10B981", "#EA580C", "#F97316", "#6B7280", "#00D4FF", "#8B5CF6", "#FF0080"] as const;

export function CourtBuilder() {
	const [color, setColor] = React.useState<string>(COLORS[0]);
	const [keyColor, setKeyColor] = React.useState<string>("rgba(255,255,255,0.12)");
	const [sport, setSport] = React.useState<"basketball" | "pickleball" | "hockey">("basketball");
	const [items, setItems] = React.useState<{ id: string; x: number; y: number; type: "hoop" | "net" | "goal" }[]>([
		{ id: "left-hoop", x: 4, y: 50, type: "hoop" },
		{ id: "right-hoop", x: 96, y: 50, type: "hoop" },
	]);
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

	function onDragStart(e: React.MouseEvent, id: string) {
		const target = e.currentTarget as HTMLElement;
		target.dataset.dragging = "true";
		const onMove = (ev: MouseEvent) => {
			setItems((prev) => prev.map((it) => it.id === id ? { ...it, x: Math.min(98, Math.max(2, ((ev as MouseEvent).offsetX / (target.parentElement?.clientWidth || 1)) * 100)), y: Math.min(98, Math.max(2, ((ev as MouseEvent).offsetY / (target.parentElement?.clientHeight || 1)) * 100)) } : it));
		};
		const onUp = () => {
			document.removeEventListener("mousemove", onMove);
			document.removeEventListener("mouseup", onUp);
		};
		document.addEventListener("mousemove", onMove);
		document.addEventListener("mouseup", onUp);
	}

	return (
		<div className="cb">
			<div ref={ref} className="cb-preview aspect-16-9 glass-card glass-border">
				<div className="cb-stage" style={{ ['--sel' as unknown as string]: color, ['--ambient' as unknown as string]: `${parseInt(color.slice(1,3),16)},${parseInt(color.slice(3,5),16)},${parseInt(color.slice(5,7),16)}`, ['--key' as unknown as string]: keyColor }}>
					<div className="cb-court" />
					<div className="cb-key" />
					<div className="cb-key right" />
					<div className="cb-lines" />
					<div className="cb-center" />
					{/* Sport overlays */}
					<div className="overlay">
						{sport === "basketball" && <div className="circle bb-center" />}
						{sport === "pickleball" && <>
							<div className="pb-rect" />
							<div className="line pb-center" />
						</>}
						{sport === "hockey" && <>
							<div className="line hk-center" />
							<div className="hk-crease left" />
							<div className="hk-crease right" />
						</>}
					</div>
					{/* Draggable items */}
					{items.map((it) => (
						<div key={it.id} className={`drag-item ${it.type === 'hoop' ? 'drag-hoop' : it.type === 'net' ? 'drag-net' : 'drag-goal'}`}
							style={{ left: `${it.x}%`, top: `${it.y}%` }} onMouseDown={(e) => onDragStart(e, it.id)} />
					))}
				</div>
			</div>
			<div className="palette mt-3">
				{COLORS.map((c) => (
					<button key={c} className={`swatch3d ${c===color? 'active':''}`} style={{ background: c }} aria-label={`Choose ${c}`} onClick={(e) => select(c, e)} />
				))}
				<span className="code-badge readout">{color.toUpperCase()}</span>
			</div>
			<div className="mt-4 grid gap-2">
				<p className="text-caption">Sport Lines</p>
				<div className="flex gap-2">
					<button onClick={()=>setSport("basketball")} className={`swatch3d ${sport==='basketball'?'active':''}`} style={{ background: '#00D4FF' }} aria-label="Basketball" />
					<button onClick={()=>setSport("pickleball")} className={`swatch3d ${sport==='pickleball'?'active':''}`} style={{ background: '#00FF88' }} aria-label="Pickleball" />
					<button onClick={()=>setSport("hockey")} className={`swatch3d ${sport==='hockey'?'active':''}`} style={{ background: '#8B5CF6' }} aria-label="Hockey" />
				</div>
				<p className="text-caption">Drag goals/hoops/nets on the court</p>
			</div>
			<div className="mt-3">
				<p className="text-caption mb-2">Key/Restricted Area</p>
				<div className="palette">
					{COLORS.map((c) => (
						<button key={c} className={`swatch3d ${c===keyColor? 'active':''}`} style={{ background: c }} aria-label={`Choose ${c} for key`} onClick={() => setKeyColor(c)} />
					))}
					<span className="code-badge readout">{(keyColor || '').toUpperCase()}</span>
				</div>
			</div>
		</div>
	);
}


