import { Hero } from "@/components/sections/hero/Hero";
import { Benefits } from "@/components/sections/benefits/Benefits";
import { Solutions } from "@/components/sections/sports/Solutions";
import { Resurfacing } from "@/components/sections/resurfacing/Resurfacing";
import { Accessories } from "@/components/sections/accessories/Accessories";
import { CourtBuilder } from "@/components/interactive/CourtBuilder";
import { BeforeAfter } from "@/components/interactive/BeforeAfter";
import { Counters } from "@/components/interactive/Counters";

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <h2 className="heading-2 mb-4">Try the Court Colors</h2>
        <CourtBuilder />
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <h2 className="heading-2 mb-4">Before / After</h2>
        <BeforeAfter />
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <Counters />
      </section>
      <Benefits />
      <Solutions />
      <Resurfacing />
      <Accessories />
    </div>
  );
}
