"use client";

import * as React from "react";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="glass-dark rounded-xl p-12 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary/20 mb-6 text-[var(--brand-primary)]">
        {icon}
      </div>
      <h3 className="heading-3 mb-2">{title}</h3>
      {description && (
        <p className="text-body text-muted-foreground mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="btn-premium btn-premium-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

