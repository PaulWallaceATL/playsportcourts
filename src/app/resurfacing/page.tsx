import { resurfacingContent as c } from "@/data/resurfacing";

export default function ResurfacingPage() {
	return (
		<div>
			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<h1 className="heading-1 text-neon text-glow">{c.page.title}</h1>
				<p className="mt-2 heading-3">{c.page.subtitle}</p>
				<div className="mt-4 grid gap-3 max-w-3xl">
					{c.page.intro.map((p) => (
						<p key={p} className="text-body text-muted-foreground">{p}</p>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<p className="text-caption uppercase tracking-wide text-[var(--primary)]">{c.highlight.overline}</p>
				<h2 className="heading-2 mt-1">{c.highlight.title}</h2>
				<div className="mt-3 grid gap-3 max-w-3xl">
					{c.highlight.copy.map((p) => (
						<p key={p} className="text-body">{p}</p>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{c.features.map((f) => (
						<div key={f.title} className="glass-card gradient-border-anim p-6">
							<h3 className="heading-3">{f.title}</h3>
							<p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}


