"use client";

import * as React from "react";

interface PremiumInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function PremiumInput({
  label,
  error,
  icon,
  fullWidth = true,
  className = "",
  ...props
}: PremiumInputProps) {
  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label className="text-caption block mb-2 font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          className={`input-premium ${icon ? "pl-11" : ""} ${
            error ? "border-red-500/50 focus:border-red-500" : ""
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
          <span>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}

interface PremiumTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export function PremiumTextarea({
  label,
  error,
  fullWidth = true,
  className = "",
  ...props
}: PremiumTextareaProps) {
  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label className="text-caption block mb-2 font-medium">
          {label}
        </label>
      )}
      <textarea
        className={`input-premium ${
          error ? "border-red-500/50 focus:border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
          <span>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}

