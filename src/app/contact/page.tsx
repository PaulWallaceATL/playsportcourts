"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm<FormValues>({ resolver: zodResolver(schema) });

	function onSubmit(_values: FormValues) {
		// TODO: wire to server action / API route
		return new Promise((resolve) => setTimeout(resolve, 600)).then(() => {
			reset();
		});
	}

	return (
		<section className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8 pad-section">
			<h1 className="heading-1">REQUEST QUOTE / DESIGN ASSISTANCE</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
				<div className="field">
					<Input id="fullName" placeholder=" " {...register("fullName")} />
					<Label htmlFor="fullName">Full Name</Label>
					{errors.fullName && <p className="text-xs text-red-600">{errors.fullName.message}</p>}
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="field">
						<Input id="phone" placeholder=" " {...register("phone")} />
						<Label htmlFor="phone">Phone</Label>
						{errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
					</div>
					<div className="field">
						<Input id="email" type="email" placeholder=" " {...register("email")} />
						<Label htmlFor="email">Email</Label>
						{errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="field">
						<Input id="address" placeholder=" " {...register("address")} />
						<Label htmlFor="address">Address</Label>
					</div>
					<div className="field">
						<Input id="city" placeholder=" " {...register("city")} />
						<Label htmlFor="city">City</Label>
					</div>
					<div className="field">
						<Input id="state" placeholder=" " {...register("state")} />
						<Label htmlFor="state">State</Label>
					</div>
					<div className="field">
						<Input id="zip" placeholder=" " {...register("zip")} />
						<Label htmlFor="zip">Zip Code</Label>
					</div>
				</div>

				<div className="grid gap-1">
					<Label htmlFor="projectType">What type of project? *</Label>
					<select id="projectType" className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" {...register("projectType")}>
						<option value="">Select</option>
						<option>Residential</option>
						<option>Commercial</option>
					</select>
					{errors.projectType && <p className="text-xs text-red-600">{errors.projectType.message}</p>}
				</div>

				<div className="field">
					<Input id="courtSize" placeholder=" " {...register("courtSize")} />
					<Label htmlFor="courtSize">What size court are you considering?</Label>
				</div>

				<div className="grid gap-1">
					<Label htmlFor="hasPad">Do you already have a concrete/asphalt pad? *</Label>
					<select id="hasPad" className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" {...register("hasPad")}>
						<option value="">Select</option>
						<option>No</option>
						<option>Yes</option>
					</select>
					{errors.hasPad && <p className="text-xs text-red-600">{errors.hasPad.message}</p>}
				</div>

				<div className="field">
					<Input id="padSize" placeholder=" " {...register("padSize")} />
					<Label htmlFor="padSize">If YES, exact pad size</Label>
				</div>

				<div className="field">
					<Textarea id="games" placeholder=" " {...register("games")} />
					<Label htmlFor="games">What games will you play on your court?</Label>
				</div>

				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Sending..." : "Send"}
				</Button>

				{isSubmitSuccessful && (
					<p className="text-sm text-[var(--secondary)]">Thanks for submitting!</p>
				)}
			</form>
		</section>
	);
}


