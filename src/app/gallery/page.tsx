export default function GalleryPage() {
	return (
		<section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
			<h1 className="heading-1 text-gradient-primary text-glow">Gallery</h1>
			<p className="mt-2 text-body text-muted-foreground">Projects coming soon.</p>

			<div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="placeholder-card aspect-16-9 placeholder-gradient pattern-court shadow-layered hover-lift" />
				))}
			</div>

			<div className="mt-10 grid gap-4 max-w-xl">
				<div className="skeleton-line lg skeleton" />
				<div className="skeleton-line skeleton" />
				<div className="skeleton-line xs skeleton" />
			</div>

			<div className="mt-10">
				<div className="chart-bars">
					{[70, 45, 90, 55].map((v, idx) => (
						<div key={idx} className="chart-bar"><span style={{ width: `${v}%` }} /></div>
					))}
				</div>
			</div>
		</section>
	);
}


