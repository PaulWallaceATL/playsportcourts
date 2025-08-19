"use client";

import * as React from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
	staggerChildren?: boolean;
}

export function Reveal({ className, children, staggerChildren = false, ...props }: RevealProps) {
	const { ref, isVisible } = useReveal<HTMLDivElement>();
	return (
		<div
			ref={ref}
			className={cn(isVisible ? (staggerChildren ? "reveal-stagger" : "reveal-up") : "opacity-0", className)}
			{...props}
		>
			{children}
		</div>
	);
}


