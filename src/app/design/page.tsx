import { CourtBuilder } from "@/components/interactive/CourtBuilder";

export default function DesignPage() {
	return (
		<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
			<h1 className="heading-1 text-neon text-glow">Design Your Own Court</h1>
			<p className="mt-2 text-body text-muted-foreground max-w-2xl">Choose your surface color and key accents. This interactive preview uses CSS 3D transforms, lighting and glass morphism for a premium experience.</p>
			<div className="mt-6">
				<CourtBuilder />
			</div>
		</section>
	);
}


