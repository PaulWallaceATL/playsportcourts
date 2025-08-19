import { commercialContent as c } from "@/data/commercial";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CommercialPage() {
	return (
		<div>
			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<h1 className="heading-1">{c.page.title}</h1>
				<p className="mt-2 text-body-lg">{c.page.subtitle}</p>
				<p className="mt-2 text-body text-muted-foreground max-w-3xl">{c.page.intro}</p>
			</section>

			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<h2 className="heading-2 mb-6">Tile Systems</h2>
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{c.tiles.map((t) => (
						<div key={t.title} className="surface-elevated rounded-lg p-6">
							<h3 className="heading-3">{t.title}</h3>
							<ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
								{t.features.map((f) => (
									<li key={f}>{f}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<h2 className="heading-2 mb-6">{c.solutionsBySpace.title}</h2>
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{c.solutionsBySpace.items.map((i) => (
						<div key={i.title} className="surface-elevated rounded-lg p-6">
							<p className="font-semibold">{i.title}</p>
							<p className="mt-1 text-sm text-muted-foreground">{i.description}</p>
						</div>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<h2 className="heading-2 mb-6">{c.solutionsBySport.title}</h2>
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{c.solutionsBySport.items.map((i) => (
						<div key={i.title} className="surface-elevated rounded-lg p-6">
							<p className="font-semibold">{i.title}</p>
							<p className="mt-1 text-sm text-muted-foreground">{i.description}</p>
						</div>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<div className="surface-elevated rounded-lg p-6 md:p-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<div>
						<h3 className="heading-3">{c.designer.title}</h3>
						<p className="text-body mt-1">{c.designer.copy}</p>
					</div>
					<Button asChild>
						<Link href={c.designer.cta.href}>{c.designer.cta.label}</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}


