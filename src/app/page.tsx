import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Zap, Shield, Palette } from "lucide-react";
import { Hero } from "@/components/sections/hero/Hero";
import { TilesShowcase } from "@/components/sections/tiles/TilesShowcase";
import { Resurfacing } from "@/components/sections/resurfacing/Resurfacing";

export const metadata: Metadata = {
  title: "PlaySport Courts - Premium 12\" × 12\" Modular Court Tiles",
  description: "Design and build your dream court with our premium modular tiles. Interactive 3D designer, custom colors, and professional installation.",
};

const SPORTS = [
  { id: "basketball", name: "Basketball", emoji: "🏀", gradient: "from-blue-900 to-blue-600" },
  { id: "pickleball", name: "Pickleball", emoji: "🏓", gradient: "from-green-900 to-green-600" },
  { id: "tennis", name: "Tennis", emoji: "🎾", gradient: "from-emerald-900 to-emerald-600" },
  { id: "volleyball", name: "Volleyball", emoji: "🏐", gradient: "from-red-900 to-red-600" },
  { id: "shuffleboard", name: "Shuffleboard", emoji: "🎯", gradient: "from-gray-900 to-gray-600" },
  { id: "multi-sport", name: "Multi-Sport", emoji: "⚡", gradient: "from-purple-900 to-purple-600" },
];

const BENEFITS = [
  {
    icon: Zap,
    title: "Plays Fast. Feels Safe.",
    description: "High-traction surface with shock-absorbing support for joints and knees. Professional-grade performance.",
  },
  {
    icon: Shield,
    title: "Built for Weather.",
    description: "UV-stable pigments and open-grid drainage keep courts cooler and dry faster. All-weather durability.",
  },
  {
    icon: Palette,
    title: "Your Colors. Your Court.",
    description: "11 premium colors, custom logos, and game lines. Design it your way with our interactive builder.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <Hero />

      {/* Value Proposition */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="heading-display text-gradient-hero mb-4">
            Build Your Dream Court
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Premium 12&quot; × 12&quot; modular tiles. Design in 3D, customize every detail, 
            and get professional results built your way.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="card-premium text-center group hover:scale-105 transition-transform">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <benefit.icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="heading-3 mb-3">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/dealer-portal" className="btn-premium-primary text-lg px-8 py-4 flex items-center gap-2">
            Start Building
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/design" className="btn-premium-secondary text-lg px-8 py-4">
            View 3D Designers
          </Link>
        </div>
      </section>

      {/* Tiles Showcase */}
      <TilesShowcase />

      {/* Sports Grid - Redesigned */}
      <section id="sports" className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="heading-display text-gradient-hero mb-4">
            Any Sport. Any Size.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Design a court for your favorite sport with our interactive 3D designers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPORTS.map((sport) => (
            <Link
              key={sport.id}
              href={`/design/${sport.id}`}
              className="group"
            >
              <div className={`relative aspect-square rounded-2xl bg-gradient-to-br ${sport.gradient} p-6 flex flex-col items-center justify-center overflow-hidden transition-all hover:scale-105 hover:shadow-2xl`}>
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSAwIDAgTCA0MCAwIEwgNDAgNDAgTCAwIDQwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-20" />
                
                {/* Sport Emoji */}
                <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform">
                  {sport.emoji}
                </div>
                
                {/* Sport Name */}
                <div className="text-sm font-bold text-white text-center">
                  {sport.name}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Arrow on hover */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/design" className="text-[var(--brand-primary)] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
            View All Court Designers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Social Proof */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="card-premium">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-black text-gradient-hero mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Courts Built</div>
            </div>
            <div>
              <div className="text-5xl font-black text-gradient-hero mb-2">5.0</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-5xl font-black text-gradient-hero mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="heading-display text-gradient-hero mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From design to installation, we make it simple to get the court you want.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Design Your Court", description: "Use our 3D designer or interactive builder to visualize your perfect court" },
            { step: "2", title: "Choose Colors & Markings", description: "Select from 11 premium colors and customize game lines for your sport" },
            { step: "3", title: "Get Instant Quote", description: "Export your design and receive detailed pricing with tile breakdown" },
            { step: "4", title: "Professional Install", description: "Expert installation or DIY with our comprehensive guide" },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-neon-blue">
                  <span className="text-3xl font-black text-black">{item.step}</span>
                </div>
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              {item.step !== "4" && (
                <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-[var(--brand-primary)]/30" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/dealer-portal" className="btn-premium-primary text-lg px-10 py-4 inline-flex items-center gap-2">
            Start Your Design
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-2 text-gradient-hero mb-6">
              Why Choose PlaySport Courts?
            </h2>
            <ul className="space-y-4">
              {[
                "Premium 12&quot; × 12&quot; modular tiles",
                "11 professional color options",
                "18 sport configurations available",
                "Interactive 3D design tools",
                "Custom logos and markings",
                "Professional or DIY installation",
                "Industry-leading warranties",
                "Weather-resistant materials",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-4">
              <Link href="/court-tiles" className="btn-premium-secondary">
                View Tiles
              </Link>
              <Link href="/contact" className="btn-premium-primary">
                Get Quote
              </Link>
            </div>
          </div>

          <div className="card-premium p-8">
            <h3 className="heading-3 mb-4 text-center">Start Designing Now</h3>
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Choose from our powerful design tools
            </p>
            <div className="space-y-3">
              <Link
                href="/dealer-portal"
                className="block p-4 rounded-lg bg-gradient-primary text-black hover:shadow-neon-blue transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold mb-1">PlaySport Pro Builder</div>
                    <div className="text-sm opacity-80">Full interactive court builder with drag & drop</div>
                  </div>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              
              <Link
                href="/design"
                className="block p-4 rounded-lg border-2 border-white/10 hover:border-[var(--brand-primary)] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold mb-1">3D Court Designers</div>
                    <div className="text-sm text-muted-foreground">Sport-specific designers with 3D visualization</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-[var(--brand-primary)] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Resurfacing CTA */}
      <Resurfacing />

      {/* Final CTA */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="card-premium text-center p-16 border-premium-animated">
          <h2 className="heading-2 text-gradient-hero mb-4">
            Ready to Build Your Court?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start designing today with our interactive tools or speak with our team for personalized guidance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/dealer-portal" className="btn-premium-primary text-lg px-10 py-4 flex items-center gap-2">
              Launch Builder
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-premium-secondary text-lg px-10 py-4">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
