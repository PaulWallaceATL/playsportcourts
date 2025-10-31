import type { Metadata } from "next";
import { CheckCircle2, Sparkles, Clock, Shield, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Court Resurfacing",
  description: "Professional court resurfacing services. Repair, restore, and upgrade your existing sport courts with premium solutions.",
};

const features = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Fast Installation",
    description: "Most projects completed in 1-2 days with minimal disruption to your facility.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Warranty Backed",
    description: "Industry-leading warranty coverage on all resurfacing work and materials.",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Instant Upgrade",
    description: "Transform old, cracked courts into professional-grade playing surfaces.",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Like-New Appearance",
    description: "Fresh colors, crisp lines, and smooth surfaces that look brand new.",
  },
];

const process = [
  {
    step: "01",
    title: "Assessment",
    description: "We evaluate your existing surface, measure the court, and discuss your goals and sport requirements.",
  },
  {
    step: "02",
    title: "Preparation",
    description: "Minor leveling and cleaning of the existing slab. We prep the surface for optimal tile adhesion.",
  },
  {
    step: "03",
    title: "Installation",
    description: "Professional installation of premium modular tiles. Snap-together system installs quickly and precisely.",
  },
  {
    step: "04",
    title: "Finishing",
    description: "Game lines, logos, and accessories customized for your specific sport and aesthetic preferences.",
  },
];

const benefits = [
  "Save 60% vs. full court replacement",
  "No heavy equipment or demolition",
  "Play the same day installation completes",
  "Covers cracks and imperfections",
  "Customizable colors and designs",
  "UV resistant and weatherproof",
];

export default function ResurfacingPage() {
  return (
    <div className="relative">
      {/* Hero Section - Premium */}
      <section className="relative isolate overflow-hidden min-h-[70vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-primary" />
        <div className="absolute inset-0" style={{ background: "var(--mesh-premium)" }} />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-[var(--brand-primary)]/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-[var(--brand-accent)]/20 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-tier-2 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--brand-accent)]" />
              <span className="text-sm font-semibold">Professional Resurfacing Services</span>
            </div>
            
            <h1 className="heading-display text-gradient-hero mb-6">
              Transform Your Old Court Into a Premium Playing Surface
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Don&apos;t replace—resurface! Save thousands while getting a like-new court with our premium modular tile system.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="btn-premium btn-premium-primary inline-flex items-center gap-2"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/gallery"
                className="btn-premium btn-premium-secondary"
              >
                View Portfolio
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl">
              <div>
                <p className="text-4xl font-black text-gradient-hero">60%</p>
                <p className="text-sm text-muted-foreground">Cost Savings</p>
              </div>
              <div>
                <p className="text-4xl font-black text-gradient-hero">1-2</p>
                <p className="text-sm text-muted-foreground">Day Install</p>
              </div>
              <div>
                <p className="text-4xl font-black text-gradient-hero">15+</p>
                <p className="text-sm text-muted-foreground">Year Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After - Premium */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-gradient-hero mb-3">See the Transformation</h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from actual resurfacing projects. Swipe to compare before and after.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Before */}
          <div className="card-premium">
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full state-warning mb-3">
                <span className="text-sm font-semibold">Before</span>
              </div>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop"
                alt="Court before resurfacing"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-red-400 flex items-center gap-2">
                ✗ Cracked and worn surface
              </p>
              <p className="text-sm text-red-400 flex items-center gap-2">
                ✗ Faded lines and markings
              </p>
              <p className="text-sm text-red-400 flex items-center gap-2">
                ✗ Unsafe playing conditions
              </p>
            </div>
          </div>

          {/* After */}
          <div className="card-premium border-premium-animated">
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full state-success mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-semibold">After</span>
              </div>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600&auto=format&fit=crop"
                alt="Court after resurfacing"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Professional-grade surface
              </p>
              <p className="text-sm text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Crisp lines and vibrant colors
              </p>
              <p className="text-sm text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Like-new playing experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-gradient-hero mb-3">Why Choose Resurfacing?</h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Get all the benefits of a new court at a fraction of the cost
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="card-premium text-center"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary/20 mb-4 text-[var(--brand-primary)]">
                {feature.icon}
              </div>
              <h3 className="heading-3 mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Timeline */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-gradient-hero mb-3">Our Process</h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            From assessment to completion in 4 simple steps
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {process.map((item, idx) => (
            <div key={item.step} className="relative">
              {/* Connector Line */}
              {idx < process.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-[var(--brand-primary)] to-transparent opacity-30" />
              )}

              <div className="flex gap-6">
                {/* Step Number */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-black font-black text-xl shadow-neon-blue">
                    {item.step}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 card-premium">
                  <h3 className="heading-3 mb-2">{item.title}</h3>
                  <p className="text-body text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Checklist */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="card-premium border-premium-animated max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="heading-2 text-gradient-hero mb-3">Resurfacing Benefits</h2>
            <p className="text-body text-muted-foreground">
              Everything you need in one comprehensive solution
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-3 p-4 rounded-xl glass-tier-1 hover-lift transition-all"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative card-premium border-premium-animated overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 grid-pattern-dense opacity-20" />
          
          <div className="relative text-center py-12 px-6">
            <h2 className="heading-1 text-gradient-hero mb-4">
              Ready to Transform Your Court?
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a free consultation and quote. Our experts will assess your court and provide a detailed resurfacing plan.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="btn-premium btn-premium-primary inline-flex items-center gap-2"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="tel:7708842337" className="btn-premium btn-premium-secondary">
                Call (770) 884-2337
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>100% Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
