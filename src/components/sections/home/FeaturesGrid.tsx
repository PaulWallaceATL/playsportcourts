import { Zap, Shield, Wrench, Sparkles, Users, Award } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Design and visualize your court in real-time with our interactive 3D tools",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Weather Proof",
    description: "UV-resistant, all-weather tiles that perform in any condition year-round",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Wrench,
    title: "Easy Install",
    description: "Interlocking design for simple DIY or professional installation",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Custom Designs",
    description: "11 colors, custom logos, and 18 different sport configurations",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Professional guidance from design to installation and beyond",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Industry-leading warranties on Core (10yr), True (15yr), and X (Lifetime)",
    color: "from-cyan-500 to-blue-500",
  },
];

export function FeaturesGrid() {
  return (
    <section className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--brand-primary)]/5 to-transparent" />
      
      <ScrollReveal direction="fade">
        <div className="text-center mb-20 relative">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Everything You <span className="text-gradient-hero">Need</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
            Professional-grade features designed to bring your court vision to life.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {FEATURES.map((feature, idx) => (
          <ScrollReveal key={feature.title} direction="up" delay={idx * 100}>
            <div className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500`} />
              <div className="card-premium p-8 hover:scale-105 transition-all duration-500 relative">
                <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

