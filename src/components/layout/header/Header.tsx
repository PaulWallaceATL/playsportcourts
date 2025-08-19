"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/home";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/residential", label: "Residential" },
  { href: "/commercial", label: "Commercial" },
  { href: "/resurfacing", label: "Resurfacing" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/shop", label: "Shop" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const cartCount = 0; // TODO: wire to cart state

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors",
        isScrolled ? "bg-background/70 header-blur border-b" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-[var(--primary)]" />
            <span className="sr-only">PlaySport Atlanta</span>
            <span className="hidden font-semibold sm:inline">PlaySport Atlanta</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors nav-underline hover:text-[var(--primary)]",
                      pathname === item.href ? "text-[var(--primary)]" : "text-foreground/80"
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--accent-foreground)]">
                  {cartCount}
                </span>
              )}
            </Button>
            <div className="hidden sm:flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/residential">Residential Court</Link>
              </Button>
              <Button asChild>
                <Link href="/design">Design Your Own</Link>
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t",
          open ? "anim-slide-down" : "hidden"
        )}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Navigation</p>
              <ul className="grid gap-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted/50",
                        pathname === item.href ? "text-[var(--primary)]" : "text-foreground/90"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" asChild>
                <Link href="/residential">Residential Court</Link>
              </Button>
              <Button asChild>
                <Link href="/design">Design Your Own</Link>
              </Button>
            </div>
            <div className="border-t pt-3 text-sm text-muted-foreground flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{siteContent.brand.phone}</p>
                <p>{siteContent.brand.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link href="https://facebook.com" aria-label="Facebook" className="hover:text-[var(--primary)]">Fb</Link>
                <Link href="https://instagram.com" aria-label="Instagram" className="hover:text-[var(--primary)]">Ig</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


