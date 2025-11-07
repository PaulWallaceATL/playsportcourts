import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Zap, Shield, Palette, Sparkles, Layers, Box } from "lucide-react";
import { Hero } from "@/components/sections/hero/Hero";
import { TilesShowcase } from "@/components/sections/tiles/TilesShowcase";
import { Resurfacing } from "@/components/sections/resurfacing/Resurfacing";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CountUp } from "@/components/animations/CountUp";

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
    title: "Lightning-Fast Design",
    description: "Interactive 3D visualization with real-time updates. See your court come to life as you customize.",
  },
  {
    icon: Shield,
    title: "Premium Quality",
    description: "Industry-leading tiles with superior warranties. Built to withstand any weather, any sport.",
  },
  {
    icon: Palette,
    title: "Endless Customization",
    description: "11 professional colors, custom logos, and 18 sport configurations. Your vision, your way.",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <Hero />

      {/* Value Proposition - Redesigned */}
      <section className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-32 overflow-x-hidden overflow-y-visible">
        {/* Ambient orbs */}
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-gradient-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-[var(--brand-accent)]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        <ScrollReveal direction="fade">
          <div className="text-center mb-20 relative">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-sm border border-[var(--brand-primary)]/30 mb-8">
              <Sparkles className="w-4 h-4 text-[var(--brand-primary)] animate-pulse" />
              <span className="text-sm font-bold text-[var(--brand-primary)] tracking-wide">INTERACTIVE COURT DESIGN</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              Build Your <span className="text-gradient-hero">Dream Court</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Premium 12&quot; × 12&quot; modular tiles. Design in stunning 3D, 
              customize every detail, and bring your vision to life.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20 relative">
          {BENEFITS.map((benefit, idx) => (
            <ScrollReveal key={benefit.title} direction="up" delay={idx * 150}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="card-premium text-center relative hover:scale-105 transition-all duration-500">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-neon-blue group-hover:rotate-12 transition-transform duration-500">
                    <benefit.icon className="w-10 h-10 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Primary CTAs */}
        <ScrollReveal direction="up" delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/dealer-portal" className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-primary animate-pulse opacity-20" />
              <div className="btn-premium-primary text-xl px-12 py-5 flex items-center gap-3 relative">
                <Layers className="w-6 h-6" />
                Start Building
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
            <Link href="/design" className="btn-premium-secondary text-xl px-12 py-5 flex items-center gap-3">
              <Box className="w-6 h-6" />
              View 3D Designers
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Tiles Showcase */}
      <TilesShowcase />

      {/* Social Proof - Enhanced */}
      <section className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-32">
        <ScrollReveal direction="up">
          <div className="card-premium border-premium-animated p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/5 to-[var(--brand-accent)]/5" />
            <div className="grid md:grid-cols-3 gap-16 text-center relative">
              {[
                { value: 500, suffix: "+", label: "Courts Built Nationwide" },
                { value: 5, suffix: ".0", label: "Customer Satisfaction" },
                { value: 15, suffix: "+", label: "Years of Excellence" },
              ].map((stat, idx) => (
                <div key={stat.label} className="group">
                  <div className="text-7xl font-black text-gradient-hero mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-base text-muted-foreground font-medium">{stat.label}</div>
                  <div className="w-20 h-1 bg-gradient-primary mx-auto mt-4 rounded-full opacity-50" />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Sports Grid - Premium Design */}
      <section id="sports" className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-32 overflow-x-hidden overflow-y-visible">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[var(--brand-primary)] animate-ping opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full bg-[var(--brand-accent)] animate-ping opacity-10" style={{ animationDelay: "1s" }} />
        
        <ScrollReveal direction="fade">
          <div className="text-center mb-20 relative">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Any Sport. <span className="text-gradient-hero">Any Size.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Design courts for your favorite sports with our interactive 3D visualization tools.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {SPORTS.map((sport, idx) => (
            <ScrollReveal key={sport.id} direction="up" delay={idx * 100}>
              <Link href={`/design/${sport.id}`} className="group">
                <div className={`relative aspect-square rounded-2xl bg-gradient-to-br ${sport.gradient} p-8 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl`}>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSAwIDAgTCA0MCAwIEwgNDAgNDAgTCAwIDQwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-20" />
                  <div className="text-7xl mb-4 transform group-hover:scale-125 transition-transform duration-500">
                    {sport.emoji}
                  </div>
                  <div className="text-sm font-bold text-white text-center opacity-90">
                    {sport.name}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={600}>
          <div className="text-center">
            <Link href="/design" className="inline-flex items-center gap-3 text-lg font-bold text-[var(--brand-primary)] hover:gap-4 transition-all group">
              View All Court Designers
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* How It Works - Professional */}
      <section className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/3 via-transparent to-[var(--brand-accent)]/3" />
        
        <ScrollReveal direction="fade">
          <div className="text-center mb-20 relative">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Simple <span className="text-gradient-hero">Process</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              From concept to completion in four easy steps.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-4 gap-12 relative">
          {[
            { step: "01", title: "Design", description: "Visualize your court in stunning 3D with our interactive designer" },
            { step: "02", title: "Customize", description: "Choose from 11 premium colors and customize every game line" },
            { step: "03", title: "Quote", description: "Get instant pricing with detailed tile breakdown and export options" },
            { step: "04", title: "Install", description: "Professional installation or comprehensive DIY guide included" },
          ].map((item, idx) => (
            <ScrollReveal key={item.step} direction="up" delay={idx * 200}>
              <div className="relative group">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-24 h-24 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-2xl">
                      <span className="text-4xl font-black text-black">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-12 -right-6 w-12 h-12">
                    <ArrowRight className="w-full h-full text-[var(--brand-primary)]/20" />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={800}>
          <div className="text-center mt-20">
            <Link href="/dealer-portal" className="group relative inline-block">
              <div className="absolute inset-0 bg-gradient-primary blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="btn-premium-primary text-xl px-14 py-6 flex items-center gap-3 relative">
                Start Designing Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Why Choose - Redesigned */}
      <section className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal direction="left">
            <div>
              <h2 className="text-5xl font-black text-white mb-8 tracking-tight">
                Why <span className="text-gradient-hero">PlaySport</span>?
              </h2>
              <ul className="space-y-6">
                {[
                  "Premium 12&quot; × 12&quot; modular tiles",
                  "11 professional color options",
                  "18 sport configurations",
                  "Interactive 3D design tools",
                  "Custom logos and markings",
                  "Expert or DIY installation",
                  "Industry-leading warranties",
                  "All-weather performance",
                ].map((feature, idx) => (
                  <li key={feature} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <Check className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-lg text-white/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="card-premium p-10 border-premium-animated">
              <h3 className="text-3xl font-bold mb-6 text-center">Choose Your Path</h3>
              <div className="space-y-4">
                <Link
                  href="/dealer-portal"
                  className="group block p-6 rounded-xl bg-gradient-primary text-black hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-black">PlaySport Pro</div>
                    <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                  </div>
                  <div className="text-black/70 text-base">
                    Full interactive court builder with drag & drop, all sports, and export features
                  </div>
                </Link>
                
                <Link
                  href="/design"
                  className="group block p-6 rounded-xl border-2 border-white/10 hover:border-[var(--brand-primary)] hover:bg-white/5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-bold">3D Designers</div>
                    <ArrowRight className="w-7 h-7 text-[var(--brand-primary)] group-hover:translate-x-2 transition-transform" />
                  </div>
                  <div className="text-muted-foreground text-base">
                    Sport-specific designers with stunning 3D visualization and rotation
                  </div>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Social Proof */}
      <ScrollReveal direction="up">
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="card-premium border-premium-animated p-16 md:p-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/5 to-[var(--brand-accent)]/5" />
            <div className="grid md:grid-cols-3 gap-16 text-center relative">
              {[
                { value: 500, suffix: "+", label: "Courts Built" },
                { value: 5, suffix: ".0", label: "Avg Rating" },
                { value: 15, suffix: "+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label} className="group">
                  <div className="text-8xl font-black text-gradient-hero mb-5 group-hover:scale-110 transition-transform duration-500">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-lg text-white/80 font-semibold">{stat.label}</div>
                  <div className="w-24 h-1.5 bg-gradient-primary mx-auto mt-5 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Resurfacing */}
      <Resurfacing />

      {/* Final CTA - Powerful */}
      <section className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--brand-primary)]/10 to-transparent animate-pulse" />
        
        <ScrollReveal direction="up">
          <div className="card-premium text-center p-20 md:p-24 border-premium-animated relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern-premium opacity-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[var(--brand-primary)]/20 to-transparent" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)]/20 to-transparent" />
            
            <div className="relative">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                Ready to <span className="text-gradient-hero">Get Started</span>?
              </h2>
              <p className="text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join hundreds of satisfied customers who trusted PlaySport Courts 
                to build their dream playing surface.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/dealer-portal" className="group relative">
                  <div className="absolute inset-0 bg-gradient-primary blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="btn-premium-primary text-2xl px-14 py-6 flex items-center gap-3 relative">
                    Launch Builder
                    <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
                  </div>
                </Link>
                <Link href="/contact" className="btn-premium-secondary text-2xl px-14 py-6">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
