import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero/Hero";
import { TilesShowcase } from "@/components/sections/tiles/TilesShowcase";
import { Resurfacing } from "@/components/sections/resurfacing/Resurfacing";

export const metadata: Metadata = {
  title: "Home",
  description: "Premium modular sport court tiles and flooring. Custom designs, professional installation, superior quality for all athletic applications.",
};

const SPORTS = [
  {
    id: "basketball",
    name: "Basketball",
    emoji: "🏀",
    description: "Full and half court designs",
    gradient: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
  },
  {
    id: "pickleball",
    name: "Pickleball",
    emoji: "🏓",
    description: "Regulation courts with kitchens",
    gradient: "linear-gradient(135deg, #10B981 0%, #84CC16 100%)",
  },
  {
    id: "tennis",
    name: "Tennis",
    emoji: "🎾",
    description: "Full and reduced court options",
    gradient: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
  },
  {
    id: "multi-sport",
    name: "Multi-Sport",
    emoji: "⚡",
    description: "Combine multiple game lines",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
  },
  {
    id: "shuffleboard",
    name: "Shuffleboard",
    emoji: "🎯",
    description: "Single and double layouts",
    gradient: "linear-gradient(135deg, #000000 0%, #374151 100%)",
  },
  {
    id: "volleyball",
    name: "Volleyball",
    emoji: "🏐",
    description: "Regulation with attack lines",
    gradient: "linear-gradient(135deg, #EF4444 0%, #F97316 100%)",
  },
];

export default function Home() {
  return (
    <div>
      <Hero />
      
      {/* Our Tiles Section */}
      <TilesShowcase />

      {/* Sports Applications */}
      <section id="sports" className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-gradient-hero mb-3">Sports Applications</h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Design a court for your favorite sport. Each designer includes accurate markings and customization options.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SPORTS.map((sport) => (
            <Link
              key={sport.id}
              href={`/design/${sport.id}`}
              className="group card-premium hover:scale-[1.02] transition-all"
            >
              {/* Sport Icon */}
              <div 
                className="relative aspect-video rounded-lg overflow-hidden mb-6"
                style={{ background: sport.gradient }}
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSAwIDAgTCA0MCAwIEwgNDAgNDAgTCAwIDQwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-30" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl transform group-hover:scale-110 transition-transform">{sport.emoji}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Info */}
              <div>
                <h3 className="heading-3 mb-2">{sport.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{sport.description}</p>
                
                <div className="text-sm text-[var(--brand-primary)] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Design Court →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Resurfacing CTA */}
      <Resurfacing />
    </div>
  );
}
