"use client";

import * as React from "react";

export function useReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
	const ref = React.useRef<T | null>(null);
	const [isVisible, setIsVisible] = React.useState(false);

	React.useEffect(() => {
		if (!ref.current || typeof IntersectionObserver === "undefined") return;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			});
		}, options ?? { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [options]);

	return { ref, isVisible } as const;
}


