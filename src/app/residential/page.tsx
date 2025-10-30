import type { Metadata } from "next";
import { residentialContent as c } from "@/data/residential";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Residential Courts",
  description: "Premium sport court tiles for homes. Transform your backyard, garage, or basement into a professional-grade athletic space.",
};

export default function ResidentialPage() {
	return (
		<div>
			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<h1 className="heading-1 text-neon text-glow">{c.page.title}</h1>
				<p className="mt-2 text-body-lg text-muted-foreground">{c.page.subtitle}</p>
			</section>

			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<h2 className="heading-2 mb-6">{c.courtTiles.title}</h2>
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{c.courtTiles.items.map((i) => (
						<div key={i.title} className="glass-card gradient-border-anim p-6 anim-scale-in hover-lift">
							<h3 className="heading-3">{i.title}</h3>
							<p className="mt-2 text-body">{i.description}</p>
						</div>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<h2 className="heading-2 mb-6">{c.solutions.title}</h2>
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{c.solutions.items.map((i) => (
						<div key={i.title} className="glass-card gradient-border-anim p-6 hover-lift">
							<p className="font-semibold">{i.title}</p>
							{i.description && (
								<p className="mt-1 text-sm text-muted-foreground">{i.description}</p>
							)}
						</div>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<div className="glass-card gradient-border-anim p-6 md:p-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<div>
						<h3 className="heading-3">{c.designer.title}</h3>
						<p className="text-body mt-1">{c.designer.copy}</p>
					</div>
					<Button variant="glass" className="btn-neon" asChild>
						<Link href={c.designer.cta.href}>{c.designer.cta.label}</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}


