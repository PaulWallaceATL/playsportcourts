import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero/Hero";
import { TilesShowcase } from "@/components/sections/tiles/TilesShowcase";
import { Solutions } from "@/components/sections/sports/Solutions";
import { Resurfacing } from "@/components/sections/resurfacing/Resurfacing";

export const metadata: Metadata = {
  title: "Home",
  description: "Premium modular sport court tiles and flooring. Custom designs, professional installation, superior quality for all athletic applications.",
};

export default function Home() {
  return (
    <div>
      <Hero />
      
      {/* Our Tiles Section */}
      <TilesShowcase />

      {/* Sports Applications Grid */}
      <Solutions />

      {/* Resurfacing CTA */}
      <Resurfacing />
    </div>
  );
}
