"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function PageTransition({ children, className }: { children: React.ReactNode; className?: string }) {
	const pathname = usePathname();
	const [state, setState] = React.useState<"enter" | "exit">("enter");

	React.useEffect(() => {
		setState("enter");
		return () => setState("exit");
	}, [pathname]);

	return <div className={cn(state === "enter" ? "page-enter" : "page-exit", className)}>{children}</div>;
}


