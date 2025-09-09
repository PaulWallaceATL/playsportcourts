import { Hero } from "@/components/sections/hero/Hero";
import { Solutions } from "@/components/sections/sports/Solutions";
import { Resurfacing } from "@/components/sections/resurfacing/Resurfacing";
import { GarageSlideshow } from "@/components/sections/garage/GarageSlideshow";
import { Counters } from "@/components/interactive/Counters";

export default function Home() {
  return (
    <div>
      <Hero />
      <GarageSlideshow />

      {/* Sports Applications Grid with expandable compatible tiles */}
      <Solutions />

      {/* Resurfacing CTA */}
      <Resurfacing />
    </div>
  );
}
