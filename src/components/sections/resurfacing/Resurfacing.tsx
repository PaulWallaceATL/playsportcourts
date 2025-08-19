import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/data/home";

export function Resurfacing() {
	const r = siteContent.resurfacing;
	return (
		<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
			<div className="surface-elevated rounded-lg p-6 md:p-8">
				<h3 className="heading-3">{r.title}</h3>
				<p className="mt-2 text-body">{r.subtitle}</p>
				<div className="mt-4">
					<Button asChild>
						<Link href={r.cta.href}>{r.cta.label}</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}


