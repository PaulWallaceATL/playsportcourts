"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaySportLogo } from "@/components/ui/PlaySportLogo";
import { siteContent } from "@/data/home";
import { getCurrentUser, isDealer } from "@/lib/mock-auth";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home", dropdown: undefined },
  { href: "/court-tiles", label: "Court Tiles", dropdown: undefined },
  { href: "/resurfacing", label: "Resurfacing", dropdown: undefined },
  { href: "/contact", label: "Contact", dropdown: undefined },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [dealer, setDealer] = React.useState(() => getCurrentUser());
  React.useEffect(() => {
    const listener = () => setDealer(getCurrentUser());
    window.addEventListener("mock-auth-change", listener);
    return () => window.removeEventListener("mock-auth-change", listener);
  }, []);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isDealerPortal = pathname?.startsWith("/dealer-portal");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-xl border-b",
        isDealerPortal 
          ? "bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-blue-900/95 border-purple-500/20" 
          : "bg-black/95 border-white/10",
        isScrolled && "shadow-lg"
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative">
                <PlaySportLogo size={40} className="text-black" />
              </div>
            </div>
            <span className="hidden font-bold text-lg sm:inline text-gradient-hero">
              PlaySport Courts
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.href}
                  className="relative z-50"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-semibold transition-all nav-underline relative",
                      pathname === item.href 
                        ? "text-[var(--brand-primary)]" 
                        : "text-white/90 hover:text-white"
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              
              {/* PlaySport+ link */}
                <li>
                  <Link
                    href="/dealer-portal"
                    className={cn(
                    "text-sm font-semibold transition-all nav-underline relative",
                    pathname === "/dealer-portal" 
                      ? "text-[var(--brand-primary)]" 
                      : "text-white/90 hover:text-white"
                  )}
                  aria-current={pathname === "/dealer-portal" ? "page" : undefined}
                  aria-label="Navigate to PlaySport Pro"
                >
                  PlaySport+
                  </Link>
                </li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex gap-2">
              <Link href="/dealer-portal" className="btn-premium-secondary px-5 py-2 text-sm rounded-lg">
                Court Builder
              </Link>
              {isDealer(dealer) ? (
                <Link href="/dealer-portal" className="btn-premium-primary px-5 py-2 text-sm rounded-lg">
                  Portal
                </Link>
              ) : (
                <Link href="/contact" className="btn-premium-primary px-5 py-2 text-sm rounded-lg">
                  Get Quote
                </Link>
              )}
            </div>
            <Button variant="glass" size="icon" className="md:hidden shadow-neon-blue" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile neon slide-in */}
      <div className={cn("panel-overlay md:hidden", open && "open")} onClick={() => setOpen(false)} />
      <aside className={cn("panel-neon md:hidden z-50", open && "open")}
        aria-hidden={!open}
      >
        <div className="inner glass-card glass-border shadow-neon-blue">
          <div className="grid gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Navigation</p>
              <ul className="grid gap-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm font-semibold glass-hover",
                        pathname === item.href ? "text-[var(--brand-primary)]" : "text-white/90"
                      )}
                      aria-current={pathname === item.href ? "page" : undefined}
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
              <Button variant="glass" className="shadow-neon-blue" asChild>
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
      </aside>
    </header>
  );
}


