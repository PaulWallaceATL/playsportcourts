"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = "md",
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const Spinner = (
    <div className="relative">
      <div
        className={`${sizes[size]} rounded-full border-3 border-transparent border-t-[var(--brand-primary)] border-r-[var(--brand-accent)] animate-spin`}
        style={{ borderWidth: "3px" }}
      />
      <div
        className={`absolute inset-0 ${sizes[size]} rounded-full border-3 border-transparent border-b-purple-500 opacity-30 animate-spin`}
        style={{
          borderWidth: "3px",
          animationDirection: "reverse",
          animationDuration: "1.5s",
        }}
      />
      {text && <p className="text-body text-muted-foreground mt-4">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div className="glass-dark rounded-xl p-8 flex flex-col items-center gap-4">
          {Spinner}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {Spinner}
    </div>
  );
}

