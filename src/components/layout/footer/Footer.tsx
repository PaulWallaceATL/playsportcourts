import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px divider-premium" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern-dense opacity-30 pointer-events-none" />
      
      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary blur-md opacity-50" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center font-bold text-black text-lg shadow-neon-blue">
                  PS
                </div>
              </div>
              <span className="font-bold text-xl text-gradient-hero">
                PlaySport Courts
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Premium modular sport court tiles and professional installation services.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-surface flex items-center justify-center hover-lift transition-all hover:border-[var(--brand-primary)]"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-surface flex items-center justify-center hover-lift transition-all hover:border-[var(--brand-primary)]"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-surface flex items-center justify-center hover-lift transition-all hover:border-[var(--brand-primary)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-4 text-[var(--brand-primary)]">
              Products
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/court-tiles", label: "Court Tiles" },
                { href: "/garage-tiles", label: "Garage Tiles" },
                { href: "/shop", label: "Shop All" },
                { href: "/design", label: "Design Tool" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[var(--brand-primary)] transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--brand-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-4 text-[var(--brand-accent)]">
              Services
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/residential", label: "Residential" },
                { href: "/commercial", label: "Commercial" },
                { href: "/resurfacing", label: "Resurfacing" },
                { href: "/gallery", label: "Portfolio" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[var(--brand-accent)] transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--brand-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-4 text-[var(--brand-secondary)]">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-[var(--brand-secondary)] shrink-0 mt-0.5" />
                <span>Milton, GA</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone className="w-5 h-5 text-[var(--brand-secondary)] shrink-0 mt-0.5" />
                <a
                  href="tel:7708842337"
                  className="text-muted-foreground hover:text-[var(--brand-secondary)] transition-colors"
                >
                  (770) 884-2337
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="w-5 h-5 text-[var(--brand-secondary)] shrink-0 mt-0.5" />
                <a
                  href="mailto:info@playsportatlanta.com"
                  className="text-muted-foreground hover:text-[var(--brand-secondary)] transition-colors"
                >
                  info@playsportatlanta.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/contact"
                className="btn-premium btn-premium-primary text-sm"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {year} PlaySport Courts. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/dealer-portal" className="hover:text-[var(--brand-primary)] transition-colors">
                Dealer Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)]/30 to-transparent" />
    </footer>
  );
}


