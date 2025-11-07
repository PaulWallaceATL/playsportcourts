import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourtDesigner3D } from "@/components/design/CourtDesigner3D";

type Sport = "basketball" | "pickleball" | "tennis" | "multi-sport" | "shuffleboard" | "volleyball";

const SPORT_INFO: Record<Sport, { name: string; description: string }> = {
  "basketball": { name: "Basketball Court Designer", description: "Design your custom basketball court" },
  "pickleball": { name: "Pickleball Court Designer", description: "Design your custom pickleball court" },
  "tennis": { name: "Tennis Court Designer", description: "Design your custom tennis court" },
  "multi-sport": { name: "Multi-Sport Court Designer", description: "Design your custom multi-sport court" },
  "shuffleboard": { name: "Shuffleboard Court Designer", description: "Design your custom shuffleboard court" },
  "volleyball": { name: "Volleyball Court Designer", description: "Design your custom volleyball court" },
};

export async function generateStaticParams() {
  return Object.keys(SPORT_INFO).map((sport) => ({
    sport,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ sport: string }> }): Promise<Metadata> {
  const { sport } = await params;
  const info = SPORT_INFO[sport as Sport];
  
  if (!info) {
    return { title: "Court Designer" };
  }

  return {
    title: info.name,
    description: info.description,
  };
}

export default async function SportDesignerPage({ params }: { params: Promise<{ sport: string }> }) {
  const { sport } = await params;
  const info = SPORT_INFO[sport as Sport];

  if (!info) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-1 text-gradient-hero mb-2">{info.name}</h1>
              <p className="text-muted-foreground">{info.description}</p>
            </div>
            <a 
              href="/dealer-portal"
              className="btn-premium-secondary text-sm"
            >
              Advanced Builder →
            </a>
          </div>
        </div>

        {/* 3D Designer */}
        <CourtDesigner3D sport={sport as Sport} />
      </div>
    </div>
  );
}

