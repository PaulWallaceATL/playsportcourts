"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-95",
        secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:brightness-95",
        outline: "border border-border bg-transparent hover:bg-muted/40",
        ghost: "hover:bg-muted/40",
        link: "text-[var(--primary)] underline-offset-4 hover:underline",
        accent: "bg-[var(--accent)] text-[var(--accent-foreground)] hover:brightness-95",
        gradient: "bg-gradient-primary animate-gradient text-white shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-5 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = (asChild ? Slot : "button") as React.ElementType;
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), "interactive-press transition-color-transform", className)} {...props} />;
  }
);
Button.displayName = "Button";

export { buttonVariants };


