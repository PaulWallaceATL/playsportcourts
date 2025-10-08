"use client";
import * as React from "react";

interface FeatureCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function FeatureCard({ title, description, icon, children }: FeatureCardProps) {
  return (
    <div className="rounded-xl surface-elevated p-5 anim-slide-up">
      <div className="flex items-start gap-3">
        {icon && <div className="text-[var(--primary)] mt-1">{icon}</div>}
        <div>
          <h3 className="heading-3">{title}</h3>
          {description && <p className="text-body mt-1 text-muted-foreground">{description}</p>}
        </div>
      </div>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
