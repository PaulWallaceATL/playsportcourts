"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MultiStepContact } from "@/components/forms/contact/MultiStepContact";

const schema = z.object({
	fullName: z.string().min(1, "Required"),
	phone: z.string().min(7, "Enter a valid phone"),
	email: z.string().email("Enter a valid email"),
	address: z.string().optional().default(""),
	city: z.string().optional().default(""),
	state: z.string().optional().default(""),
	zip: z.string().optional().default(""),
	projectType: z.enum(["Residential", "Commercial"]),
	courtSize: z.string().optional().default(""),
	hasPad: z.enum(["Yes", "No"]),
	padSize: z.string().optional().default(""),
	games: z.string().optional().default(""),
});

export default function ContactPage() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm({ resolver: zodResolver(schema) });

	function onSubmit(_values: unknown) {
		// TODO: wire to server action / API route
		return new Promise((resolve) => setTimeout(resolve, 600)).then(() => {
			reset();
		});
	}

	return (
		<section className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8 pad-section">
			<h1 className="heading-1">REQUEST QUOTE / DESIGN ASSISTANCE</h1>
			<div className="mt-6 grid gap-6">
				<MultiStepContact />
			</div>

		</section>
	);
}


