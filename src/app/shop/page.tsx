import { shopContent as c } from "@/data/shop";

export default function ShopPage() {
	return (
		<div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
			<h1 className="heading-1 text-neon text-glow">{c.page.title}</h1>
			<p className="mt-2 text-body text-muted-foreground">{c.page.description}</p>

			<div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
				<aside className="glass-card gradient-border-anim p-4 h-fit">
					<p className="font-semibold mb-2">Browse by</p>
					<ul className="grid gap-2 text-sm">
						{c.categories.map((cat) => (
							<li key={cat}>
								<a className="hover:text-[var(--primary)]" href="#">{cat}</a>
							</li>
						))}
					</ul>
					<div className="mt-6">
						<p className="font-semibold mb-2">Filter by</p>
						<div className="text-sm text-muted-foreground">
							<p>Price</p>
							<p>
								${c.filters.price.min.toLocaleString()}–${c.filters.price.max.toLocaleString()}
							</p>
							<p className="mt-2">Custom Colors and Logos</p>
							<p>{c.filters.customColorsNote}</p>
						</div>
					</div>
				</aside>
				<section className="min-h-[320px] glass-card gradient-border-anim p-6 flex items-center justify-center text-muted-foreground">
					Product listings coming soon.
				</section>
			</div>
		</div>
	);
}


