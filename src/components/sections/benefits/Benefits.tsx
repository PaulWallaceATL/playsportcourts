import { siteContent } from "@/data/home";

export function Benefits() {
	const b = siteContent.benefits;
	return (
		<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
			<h2 className="heading-2 mb-6">{b.title}</h2>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{b.items.map((item) => (
					<div key={item.title} className="glass-card gradient-border-anim p-5 anim-scale-in hover-lift tilt-3d">
						<div className="flex items-start gap-3">
							<span className="h-3.5 w-3.5 rounded-full bg-[var(--primary)] shadow-neon-blue mt-1" aria-hidden />
							<div>
								<p className="font-semibold text-white">{item.title}</p>
								<p className="text-sm text-muted-foreground mt-1">{item.description}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}


