"use client";

import * as React from "react";
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
  projectType: z.enum(["Residential", "Commercial"]),
  hasPad: z.enum(["Yes", "No"]),
  address: z.string().optional().default(""),
  city: z.string().optional().default(""),
  state: z.string().optional().default(""),
  zip: z.string().optional().default(""),
  courtSize: z.string().optional().default(""),
  padSize: z.string().optional().default(""),
  games: z.string().optional().default("")
});

type Values = z.infer<typeof schema>;

export function MultiStepContact() {
  const [step, setStep] = React.useState(0);
  const [celebrate, setCelebrate] = React.useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset
  } = useForm<Values>({ resolver: zodResolver(schema), mode: "onChange" });

  async function next() {
    const fieldsByStep = [
      ["fullName", "phone", "email"] as const,
      ["projectType", "hasPad", "courtSize", "padSize"] as const,
      ["address", "city", "state", "zip", "games"] as const
    ];
    const valid = await trigger(fieldsByStep[step] as any, { shouldFocus: true });
    if (valid) setStep((s) => Math.min(2, s + 1));
  }

  function prev() { setStep((s) => Math.max(0, s - 1)); }

  function onSubmit() {
    return new Promise((r) => setTimeout(r, 800)).then(() => {
      setCelebrate(true);
      setTimeout(() => { setCelebrate(false); reset(); setStep(0); }, 1800);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div className="steps">
        {[0,1,2].map((i) => (
          <div key={i} className={`step ${i <= step ? 'active' : ''}`}>
            <span className="neon-progress" />
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="grid gap-4 anim-rotate-in">
          <div className="field">
            <Input placeholder=" " {...register("fullName")} />
            <Label>Full Name</Label>
            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="field">
              <Input placeholder=" " {...register("phone")} />
              <Label>Phone</Label>
              {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
            </div>
            <div className="field">
              <Input type="email" placeholder=" " {...register("email")} />
              <Label>Email</Label>
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-4 anim-rotate-in">
          <div className="grid gap-1">
            <Label>What type of project?</Label>
            <select className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-animated" {...register("projectType")}>
              <option>Residential</option>
              <option>Commercial</option>
            </select>
          </div>
          <div className="field">
            <Input placeholder=" " {...register("courtSize")} />
            <Label>What size court are you considering?</Label>
          </div>
          <div className="grid gap-1">
            <Label>Do you already have a concrete/asphalt pad?</Label>
            <select className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-animated" {...register("hasPad")}>
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div className="field">
            <Input placeholder=" " {...register("padSize")} />
            <Label>If YES, exact pad size</Label>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 anim-rotate-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="field"><Input placeholder=" " {...register("address")} /><Label>Address</Label></div>
            <div className="field"><Input placeholder=" " {...register("city")} /><Label>City</Label></div>
            <div className="field"><Input placeholder=" " {...register("state")} /><Label>State</Label></div>
            <div className="field"><Input placeholder=" " {...register("zip")} /><Label>Zip Code</Label></div>
          </div>
          <div className="field">
            <Textarea placeholder=" " {...register("games")} />
            <Label>What games will you play on your court?</Label>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={prev} disabled={step===0}>Back</Button>
        {step < 2 ? (
          <Button type="button" variant="glass" className="btn-neon" onMouseMove={(e)=>{
            const t=e.currentTarget as HTMLElement; const r=t.getBoundingClientRect();
            t.style.setProperty('--mx', `${((e.clientX-r.left)/r.width)*100}%`);
            t.style.setProperty('--my', `${((e.clientY-r.top)/r.height)*100}%`);
          }} onClick={next}>Next</Button>
        ) : (
          <Button type="submit" disabled={isSubmitting} variant="glass" className="btn-neon">{isSubmitting? 'Sending...' : 'Send'}</Button>
        )}
      </div>

      {isSubmitSuccessful && (
        <div className="relative h-8">
          {celebrate && Array.from({length:16}).map((_,i)=> (
            <span key={i} className="particle" style={{ left: '50%', top: '0', color: i%2? '#00d4ff':'#8b5cf6', ['--dx' as any]: `${(Math.cos(i)*40)}px`, ['--dy' as any]: `${(-20-Math.sin(i)*30)}px` }} />
          ))}
          <p className="text-sm text-[var(--secondary)] mt-2">Thanks for submitting!</p>
        </div>
      )}
    </form>
  );
}


