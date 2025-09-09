"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/home";
import { cn } from "@/lib/utils";
import { courtTiles, garageTiles } from "@/data/products";
import Image from "next/image";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/court-tiles", label: "Court Tiles", dropdown: "court" as const },
  { href: "/garage-tiles", label: "Garage Tiles", dropdown: "garage" as const },
  { href: "/gallery", label: "Gallery" },
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
        isScrolled ? "glass-nav border-b" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 neon-logo">
            <span className="dot" aria-hidden />
            <span className="sr-only">PlaySport Atlanta</span>
            <span className="hidden font-semibold sm:inline">PlaySport Atlanta</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors nav-underline holo-link",
                      pathname === item.href ? "text-[var(--primary)]" : "text-foreground/80"
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onMouseMove={(e) => {
                      const t = e.currentTarget as HTMLElement;
                      const rect = t.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      t.style.setProperty("--mx", `${x}%`);
                    }}
                  >
                    {item.label}
                  </Link>

                  {item.dropdown === "court" && (
                    <div className="menu-panel absolute left-1/2 -translate-x-1/2 mt-3 w-[720px]">
                      <div className="rounded-xl border bg-white text-foreground shadow-layered p-4 grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">PlaySport Products</p>
                          <ul className="grid gap-2">
                            {courtTiles
                              .filter((p) => p.brand !== "Versa Court")
                              .map((p) => (
                                <li key={p.slug}>
                                  <Link href={`/court-tiles/${p.slug}`} className="menu-item flex items-center gap-3 rounded-md px-2 py-2">
                                    <span className="relative h-10 w-10 overflow-hidden rounded">
                                      <Image src={p.thumbnail} alt="" fill className="object-cover" />
                                    </span>
                                    <span className="text-sm font-medium">{p.name}</span>
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Versa Court</p>
                          <ul className="grid gap-2">
                            {courtTiles
                              .filter((p) => p.brand === "Versa Court")
                              .map((p) => (
                                <li key={p.slug}>
                                  <Link href={`/court-tiles/${p.slug}`} className="menu-item flex items-center gap-3 rounded-md px-2 py-2">
                                    <span className="relative h-10 w-10 overflow-hidden rounded">
                                      <Image src={p.thumbnail} alt="" fill className="object-cover" />
                                    </span>
                                    <span className="text-sm font-medium">{p.name}</span>
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {item.dropdown === "garage" && (
                    <div className="menu-panel absolute left-1/2 -translate-x-1/2 mt-3 w-[420px]">
                      <div className="rounded-xl border bg-white text-foreground shadow-layered p-4 grid gap-2">
                        <ul className="grid gap-2">
                          {garageTiles.map((p) => (
                            <li key={p.slug}>
                              <Link href={`/garage-tiles/${p.slug}`} className="menu-item flex items-center gap-3 rounded-md px-2 py-2">
                                <span className="relative h-10 w-10 overflow-hidden rounded">
                                  <Image src={p.thumbnail} alt="" fill className="object-cover" />
                                </span>
                                <span className="text-sm font-medium">{p.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
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
                <Link href="/resurfacing">Resurfacing</Link>
              </Button>
              <Button asChild>
                <Link href="/shop">Shop</Link>
              </Button>
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
                        "block rounded-md px-3 py-2 text-sm font-medium glass-hover",
                        pathname === item.href ? "text-[var(--primary)]" : "text-foreground/90"
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.dropdown === "court" && (
                      <ul className="mt-1 ml-3 grid gap-1">
                        {courtTiles.map((p) => (
                          <li key={p.slug}>
                            <Link href={`/court-tiles/${p.slug}`} className="flex items-center gap-2 rounded px-2 py-1 text-sm hover:bg-foreground/5">
                              <img src={p.thumbnail} alt="" className="h-6 w-6 rounded object-cover" />
                              <span>{p.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.dropdown === "garage" && (
                      <ul className="mt-1 ml-3 grid gap-1">
                        {garageTiles.map((p) => (
                          <li key={p.slug}>
                            <Link href={`/garage-tiles/${p.slug}`} className="flex items-center gap-2 rounded px-2 py-1 text-sm hover:bg-foreground/5">
                              <img src={p.thumbnail} alt="" className="h-6 w-6 rounded object-cover" />
                              <span>{p.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
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


