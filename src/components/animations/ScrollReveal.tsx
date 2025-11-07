"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  className?: string;
}

export function ScrollReveal({ 
  children, 
  direction = "up", 
  delay = 0,
  className = "" 
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animations = {
    up: "translate-y-20 opacity-0",
    down: "-translate-y-20 opacity-0",
    left: "translate-x-20 opacity-0",
    right: "-translate-x-20 opacity-0",
    fade: "opacity-0",
  };

  const initial = animations[direction];

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        inView ? "translate-y-0 translate-x-0 opacity-100" : initial
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

