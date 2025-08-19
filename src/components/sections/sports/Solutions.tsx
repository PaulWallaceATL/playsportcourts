import Link from "next/link";
import { siteContent } from "@/data/home";

export function Solutions() {
	const s = siteContent.solutions;
	return (
		<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
			<h2 className="heading-2 mb-6">{s.title}</h2>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{s.items.map((item) => (
					<Link
						key={item.title}
						href={item.href}
						className="group surface-elevated rounded-lg p-5 block hover:shadow-md transition-shadow"
					>
						<p className="font-semibold group-hover:text-[var(--primary)]">{item.title}</p>
						<p className="text-caption">Explore →</p>
					</Link>
				))}
			</div>
		</section>
	);
}


