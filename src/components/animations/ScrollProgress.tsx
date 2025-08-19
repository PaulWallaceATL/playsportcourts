"use client";

import * as React from "react";

export function ScrollProgress() {
	const ref = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		const onScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
			if (ref.current) ref.current.style.setProperty("--progress", `${progress * 100}%`);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div aria-hidden className="fixed inset-x-0 top-0 h-0.5 z-[200]">
			<div ref={ref} className="h-full bg-gradient-accent" style={{ width: "var(--progress, 0%)" }} />
		</div>
	);
}


