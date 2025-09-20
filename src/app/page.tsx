import { Hero } from "@/components/sections/hero/Hero";
import { Solutions } from "@/components/sections/sports/Solutions";
import { Resurfacing } from "@/components/sections/resurfacing/Resurfacing";
import { GarageSlideshow } from "@/components/sections/garage/GarageSlideshow";

export default function Home() {
  return (
    <div>
      <Hero />
      {/* Sports Applications Grid with expandable compatible tiles */}
      <Solutions />

      <GarageSlideshow />

      {/* Resurfacing CTA */}
      <Resurfacing />
    </div>
  );
}
