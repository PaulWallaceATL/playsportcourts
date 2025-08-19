import { aboutContent as c } from "@/data/about";
import { siteContent } from "@/data/home";

export default function AboutPage() {
	return (
		<div>
			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<h1 className="heading-1">{c.page.title}</h1>
				<div className="mt-4 grid gap-3 max-w-3xl">
					{c.page.paragraphs.map((p) => (
						<p key={p} className="text-body text-muted-foreground">{p}</p>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<h2 className="heading-2 mb-4">Why VersaCourt</h2>
				<ul className="grid gap-2 max-w-2xl list-disc pl-5 text-sm text-muted-foreground">
					{c.page.points.map((pt) => (
						<li key={pt}>{pt}</li>
					))}
				</ul>
			</section>

			<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
				<div className="surface-elevated rounded-lg p-6 md:p-8">
					<p className="text-caption uppercase tracking-wide text-[var(--primary)]">Contact</p>
					<p className="mt-1 text-body">{siteContent.brand.phone} • {siteContent.brand.email} • {siteContent.brand.location}</p>
				</div>
			</section>
		</div>
	);
}


