import type { Metadata } from "next";
import Link from "next/link";
import { HeroVideo } from "@/components/sections/hero/HeroVideo";

export const metadata: Metadata = {
  title: "Court Designer",
  description: "Interactive court designer - create your dream court with our visualization tool.",
};

const COURT_TYPES = [
  {
    id: "basketball",
    name: "Basketball Courts",
    emoji: "🏀",
    description: "Design your full or half court with custom colors and markings",
    image: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
  },
  {
    id: "pickleball",
    name: "Pickleball Courts",
    emoji: "🏓",
    description: "Create regulation pickleball courts with kitchen zones",
    image: "linear-gradient(135deg, #10B981 0%, #84CC16 100%)",
  },
  {
    id: "tennis",
    name: "Tennis Courts",
    emoji: "🎾",
    description: "Design full or reduced tennis courts with service areas",
    image: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
  },
  {
    id: "multi-sport",
    name: "Multi-Sport Courts",
    emoji: "⚡",
    description: "Combine multiple game lines on one versatile court",
    image: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
  },
  {
    id: "shuffleboard",
    name: "Shuffleboard Courts",
    emoji: "🎯",
    description: "Design single or double shuffleboard courts",
    image: "linear-gradient(135deg, #000000 0%, #374151 100%)",
  },
  {
    id: "volleyball",
    name: "Volleyball Courts",
    emoji: "🏐",
    description: "Create regulation volleyball courts with attack lines",
    image: "linear-gradient(135deg, #EF4444 0%, #F97316 100%)",
  },
];

export default function DesignPage() {
	return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <HeroVideo />
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8" style={{ minHeight: "40vh" }}>
          <div className="flex flex-col items-center justify-center text-center pad-section">
            <div className="anim-slide-up max-w-3xl">
              <h1 className="heading-display text-gradient-hero text-glow-strong mb-4">
                Interactive Court Designer
              </h1>
              <p className="text-body-lg text-muted-foreground">
                Create the court of your dreams with our powerful visualization tool. 
                Choose your sport, customize colors, and see it come to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Court Designer Grid */}
		<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COURT_TYPES.map((court) => (
            <Link
              key={court.id}
              href={`/design/${court.id}`}
              className="group card-premium hover:scale-[1.02] transition-all"
            >
              {/* Court Preview */}
              <div 
                className="relative aspect-video rounded-lg overflow-hidden mb-6"
                style={{ background: court.image }}
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSAwIDAgTCA0MCAwIEwgNDAgNDAgTCAwIDQwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-30" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl">{court.emoji}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    Start Designing →
                  </div>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="heading-3 mb-2">{court.name}</h3>
                <p className="text-sm text-muted-foreground">{court.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-16 card-premium">
          <h2 className="heading-2 mb-6">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-black font-bold text-xl mb-3 mx-auto">
                1
              </div>
              <h3 className="font-bold mb-2">Choose Sport</h3>
              <p className="text-sm text-muted-foreground">
                Select from basketball, tennis, pickleball, and more
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-black font-bold text-xl mb-3 mx-auto">
                2
              </div>
              <h3 className="font-bold mb-2">Set Dimensions</h3>
              <p className="text-sm text-muted-foreground">
                Standard sizes or customize to your space
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-black font-bold text-xl mb-3 mx-auto">
                3
              </div>
              <h3 className="font-bold mb-2">Pick Colors</h3>
              <p className="text-sm text-muted-foreground">
                Choose from 11 premium tile colors
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-black font-bold text-xl mb-3 mx-auto">
                4
              </div>
              <h3 className="font-bold mb-2">Get Quote</h3>
              <p className="text-sm text-muted-foreground">
                Export design and request pricing
              </p>
            </div>
          </div>
			</div>
		</section>
    </div>
	);
}
