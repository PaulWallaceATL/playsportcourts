"use client";

import * as React from "react";
import { X } from "lucide-react";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function PremiumModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "lg",
}: PremiumModalProps) {
  const maxWidths = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay-premium flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`modal-content-premium w-full ${maxWidths[maxWidth]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-start justify-between mb-6">
            <h2 className="heading-2 text-gradient-hero">{title}</h2>
            <button
              onClick={onClose}
              className="glass-surface rounded-lg p-2 hover:bg-red-500/10 hover:text-red-400 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}

