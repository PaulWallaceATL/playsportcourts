import { cn } from "@/lib/utils";

interface PlaceholderProps {
  className?: string;
  aspect?: string; // e.g., "aspect-[16/10]"
  label?: string;
}

export function Placeholder({ className, aspect = "aspect-[16/10]", label }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border",
        aspect,
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/25 via-foreground/5 to-transparent" />
      <div className="absolute inset-0 pattern-court-dense opacity-30" />
      <div className="absolute inset-0 animate-pulse bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)] [mask-image:linear-gradient(#000,transparent_30%,transparent_70%,#000)]" />
      {label && (
        <div className="absolute inset-x-0 bottom-0 p-2 text-center text-xs text-muted-foreground bg-gradient-to-t from-background/80 to-transparent">
          {label}
        </div>
      )}
    </div>
  );
}


