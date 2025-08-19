import { siteContent } from "@/data/home";

export function Benefits() {
	const b = siteContent.benefits;
	return (
		<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
			<h2 className="heading-2 mb-6">{b.title}</h2>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{b.items.map((item) => (
					<div key={item.title} className="surface-elevated rounded-lg p-5 anim-scale-in">
						<p className="font-semibold">{item.title}</p>
						<p className="text-sm text-muted-foreground mt-1">{item.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}


