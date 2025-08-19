import Link from "next/link";
import { siteContent } from "@/data/home";

const accentByIndex = ["#00D4FF", "#00FF88", "#FF6B35", "#8B5CF6", "#FF0080", "#00D4FF", "#00FF88", "#8B5CF6"];

export function Solutions() {
	const s = siteContent.solutions;
	return (
		<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
			<h2 className="heading-2 mb-6">{s.title}</h2>
			<div className="grid-scene grid-masonry">
				{s.items.map((item, idx) => (
					<Link key={item.title} href={item.href}
						className="card-item glass-card gradient-border-anim p-5 block transition-transform will-transform"
						style={{ breakInside: "avoid" }}
					>
						<div className="placeholder-card aspect-4-3 placeholder-gradient pattern-court-dense shadow-neon-blue" />
						<div className="mt-3 flex items-center justify-between">
							<p className="font-semibold text-white">{item.title}</p>
							<span className="sport-badge" style={{ boxShadow: `0 0 12px ${accentByIndex[idx % accentByIndex.length]}55`, borderColor: `${accentByIndex[idx % accentByIndex.length]}55` }}>
								<span className="h-2.5 w-2.5 rounded-full" style={{ background: accentByIndex[idx % accentByIndex.length], boxShadow: `0 0 8px ${accentByIndex[idx % accentByIndex.length]}` }} />
								<span>Explore</span>
							</span>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}


