"use client";

import * as React from "react";
import { useReveal } from "@/hooks/use-reveal";

function useCount(to: number, duration = 1200) {
	const [value, setValue] = React.useState(0);
	const start = React.useRef<number | null>(null);
	const raf = React.useRef<number | null>(null);
	const startAnim = React.useCallback(() => {
		if (raf.current) cancelAnimationFrame(raf.current);
		start.current = null;
		const step = (ts: number) => {
			if (!start.current) start.current = ts;
			const p = Math.min(1, (ts - start.current) / duration);
			setValue(Math.floor(p * to));
			if (p < 1) raf.current = requestAnimationFrame(step);
		};
		raf.current = requestAnimationFrame(step);
	}, [to, duration]);
	return { value, startAnim } as const;
}

export function Counters() {
	const { ref, isVisible } = useReveal<HTMLDivElement>();
	const a = useCount(10);
	const b = useCount(500);
	const c = useCount(100);
	const d = useCount(5);

	React.useEffect(() => {
		if (isVisible) {
			a.startAnim(); b.startAnim(); c.startAnim(); d.startAnim();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible]);

	return (
		<div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
			<div>
				<p className="text-3xl font-bold">{a.value}+</p>
				<p className="text-caption">Years in Business</p>
			</div>
			<div>
				<p className="text-3xl font-bold">{b.value}+</p>
				<p className="text-caption">Projects Completed</p>
			</div>
			<div>
				<p className="text-3xl font-bold">Certified</p>
				<p className="text-caption">VersaCourt Dealer</p>
			</div>
			<div>
				<p className="text-3xl font-bold">{d.value}.0</p>
				<p className="text-caption">Customer Reviews</p>
			</div>
		</div>
	);
}


