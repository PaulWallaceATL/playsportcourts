import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero/Hero";
import { Solutions } from "@/components/sections/sports/Solutions";
import { Resurfacing } from "@/components/sections/resurfacing/Resurfacing";
import { GarageSlideshow } from "@/components/sections/garage/GarageSlideshow";

export const metadata: Metadata = {
  title: "Home",
  description: "Premium modular sport court tiles and flooring. Custom designs, professional installation, superior quality for all athletic applications.",
};

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
