"use client";

import * as React from "react";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "cyan" | "orange" | "purple" | "none";
  border?: boolean;
  onClick?: () => void;
}

export function PremiumCard({
  children,
  className = "",
  hover = true,
  glow = "none",
  border = false,
  onClick,
}: PremiumCardProps) {
  const glowClass = {
    cyan: "glow-cyan",
    orange: "glow-orange",
    purple: "glow-purple",
    none: "",
  };

  return (
    <div
      className={`card-premium ${hover ? "cursor-pointer" : ""} ${
        border ? "border-premium" : ""
      } ${glowClass[glow]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function PremiumCardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-b border-white/10 pb-4 mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function PremiumCardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function PremiumCardFooter({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-t border-white/10 pt-4 mt-4 ${className}`}>
      {children}
    </div>
  );
}

