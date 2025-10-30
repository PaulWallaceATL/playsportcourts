"use client";

import { MultiStepContact } from "@/components/forms/contact/MultiStepContact";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with PlaySport Courts for quotes, design assistance, and expert consultation on your sport court project.",
};

export default function ContactPage() {
	return (
		<section className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8 pad-section">
			<h1 className="heading-1 text-neon text-glow">REQUEST QUOTE / DESIGN ASSISTANCE</h1>
			<div className="mt-6 grid gap-6">
				<MultiStepContact />
			</div>
		</section>
	);
}


