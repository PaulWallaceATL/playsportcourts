"use client";

import * as React from "react";

type SwipeDir = "left" | "right" | "up" | "down";

export function useSwipe<T extends HTMLElement>(onSwipe: (dir: SwipeDir) => void, threshold = 48) {
	const ref = React.useRef<T | null>(null);
	const start = React.useRef<{ x: number; y: number } | null>(null);

	React.useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const onTouchStart = (e: TouchEvent) => {
			const t = e.touches[0];
			start.current = { x: t.clientX, y: t.clientY };
		};
		const onTouchEnd = (e: TouchEvent) => {
			if (!start.current) return;
			const t = e.changedTouches[0];
			const dx = t.clientX - start.current.x;
			const dy = t.clientY - start.current.y;
			if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) onSwipe(dx > 0 ? "right" : "left");
			else if (Math.abs(dy) > threshold) onSwipe(dy > 0 ? "down" : "up");
			start.current = null;
		};
		el.addEventListener("touchstart", onTouchStart, { passive: true });
		el.addEventListener("touchend", onTouchEnd);
		return () => {
			el.removeEventListener("touchstart", onTouchStart);
			el.removeEventListener("touchend", onTouchEnd);
		};
	}, [onSwipe, threshold]);

	return { ref } as const;
}


