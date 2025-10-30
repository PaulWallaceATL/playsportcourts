import type { Metadata } from "next";
import { resurfacingContent as c } from "@/data/resurfacing";
import { BeforeAfter } from "@/components/resurfacing/BeforeAfter";
import { ProcessSteps } from "@/components/resurfacing/ProcessSteps";
import { CTAContact } from "@/components/resurfacing/CTAContact";

export const metadata: Metadata = {
  title: "Court Resurfacing",
  description: "Professional court resurfacing services. Repair, restore, and upgrade your existing sport courts with premium solutions.",
};

export default function ResurfacingPage() {
	return (
		<div>
			{/* Hero */}
			<section className="section-bleed">
				<div className="full-bleed bg-gradient-primary bg-mesh-soft">
					<div className="container pad-section">
						<h1 className="heading-display text-gradient-hero text-glow-strong">{c.page.title}</h1>
						<p className="mt-2 text-body-lg text-muted-foreground max-w-prose">{c.page.subtitle}</p>
					</div>
				</div>
			</section>

			{/* Before / After */}
			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<BeforeAfter before="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop" after="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600&auto=format&fit=crop" />
			</section>

			{/* Copy + highlights */}
			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<p className="text-caption uppercase tracking-wide text-[var(--primary)]">{c.highlight.overline}</p>
				<h2 className="heading-2 mt-1">{c.highlight.title}</h2>
				<div className="mt-3 grid gap-3 max-w-3xl">
					{c.highlight.copy.map((p) => (
						<p key={p} className="text-body">{p}</p>
					))}
				</div>
			</section>

			{/* Features */}
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

			{/* Process Steps */}
			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<h2 className="heading-2 mb-4">How Resurfacing Works</h2>
				<ProcessSteps steps={[
					{ title: "Assess", description: "We evaluate your existing surface and goals." },
					{ title: "Prepare", description: "Minor leveling and cleaning as needed." },
					{ title: "Install", description: "Snap-in tiles over your existing slab." },
					{ title: "Finish", description: "Game lines & accessories dialed to your use." },
				]} />
			</section>

			{/* CTA */}
			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<CTAContact />
			</section>
		</div>
	);
}


