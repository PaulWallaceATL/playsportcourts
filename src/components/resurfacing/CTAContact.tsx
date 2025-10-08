"use client";
import Link from "next/link";

export function CTAContact() {
  return (
    <div className="rounded-2xl glass-card gradient-border-anim p-6 flex items-center justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Ready to revitalize?</p>
        <h3 className="heading-3">Get a fast resurfacing quote</h3>
      </div>
      <Link href="/contact" className="btn-neon glass-dark rounded-md px-4 py-2 text-sm">Contact Us</Link>
    </div>
  );
}


