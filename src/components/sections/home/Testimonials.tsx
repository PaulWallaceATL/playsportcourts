import { Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Homeowner",
    text: "The PlaySport Pro builder made it so easy to design our backyard basketball court. We could see exactly how it would look before ordering!",
    rating: 5,
  },
  {
    name: "Mike R.",
    role: "School Athletic Director",
    text: "Installed 3 multi-sport courts. The 3D designer helped us maximize our space perfectly. Students love them!",
    rating: 5,
  },
  {
    name: "Jennifer K.",
    role: "Tennis Coach",
    text: "The quality of the tiles is outstanding. Weather-resistant and the colors haven't faded after 2 years of heavy use.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-32">
      <ScrollReveal direction="fade">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Customer <span className="text-gradient-hero">Stories</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
            See what our customers have to say about their PlaySport experience.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((testimonial, idx) => (
          <ScrollReveal key={testimonial.name} direction="up" delay={idx * 150}>
            <div className="card-premium p-8 relative hover:scale-105 transition-all duration-500">
              <Quote className="w-10 h-10 text-[var(--brand-primary)]/20 mb-4" />
              
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[var(--brand-accent)] fill-[var(--brand-accent)]" />
                ))}
              </div>

              <p className="text-base text-white/90 mb-6 leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="border-t border-white/10 pt-4">
                <div className="font-bold text-white">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

