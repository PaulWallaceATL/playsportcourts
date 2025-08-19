import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/home";

export function Accessories() {
	const a = siteContent.accessories;
	return (
		<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
			<h2 className="heading-2 mb-6">{a.title}</h2>
			<p className="text-body max-w-3xl">{a.copy}</p>
			<div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{a.items.map((i) => (
					<div key={i} className="surface-elevated rounded-lg p-4">
						<p className="font-medium">{i}</p>
					</div>
				))}
			</div>
			<div className="mt-6">
				<Button asChild>
					<Link href={a.cta.href}>{a.cta.label}</Link>
				</Button>
			</div>
		</section>
	);
}


