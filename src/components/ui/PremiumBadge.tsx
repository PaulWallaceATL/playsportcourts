"use client";

import * as React from "react";

interface PremiumBadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "default";
  pulse?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function PremiumBadge({
  children,
  variant = "default",
  pulse = false,
  icon,
  className = "",
}: PremiumBadgeProps) {
  const variants = {
    primary: "badge-premium badge-primary",
    success: "badge-premium badge-success",
    warning: "badge-premium badge-warning",
    danger: "badge-premium badge-danger",
    default: "sport-badge",
  };

  return (
    <span
      className={`${variants[variant]} ${pulse ? "status-pulse" : ""} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}

