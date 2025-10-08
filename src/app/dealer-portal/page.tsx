"use client";
import Link from "next/link";
import * as React from "react";
import { getCurrentUser, login, logout, signup, isDealer, saveOrder, listOrders, type MockOrder } from "@/lib/mock-auth";
import { FeatureCard } from "@/components/dealer/FeatureCard";
import { ApplicationsGrid } from "@/components/dealer/ApplicationsGrid";
import { BenefitsGrid } from "@/components/dealer/BenefitsGrid";
import { SectionHeader } from "@/components/dealer/SectionHeader";
import { StatBar } from "@/components/dealer/StatBar";
import { Stepper } from "@/components/dealer/Stepper";
import { ColorPalettePreview } from "@/components/dealer/ColorPalettePreview";

function MarketingHero({ onLogout, showLogout }: { onLogout: () => void; showLogout: boolean }) {
  return (
    <div className="surface-elevated rounded-2xl p-6 bg-gradient-primary bg-mesh-soft anim-slide-up">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="heading-display text-gradient-hero text-glow-strong">Dealer Portal</h1>
          <p className="mt-2 text-body-lg text-muted-foreground max-w-prose">Resources, applications, and a streamlined order workflow for certified dealers.</p>
        </div>
        {showLogout && (
          <button onClick={onLogout} className="glass-dark rounded-md px-4 py-2 text-sm">Logout</button>
        )}
      </div>
    </div>
  );
}

function IntroSection() {
  return (
    <section className="surface-elevated rounded-xl p-5 anim-slide-up">
      <h2 className="heading-2 mb-2">Introduction</h2>
      <p className="text-body">As a certified dealer, you provide a variety of modular tile flooring options suitable for both residential and commercial applications. Explore tile options and configure orders below.</p>
    </section>
  );
}

function ApplicationsSection() {
  return (
    <section className="surface-elevated rounded-xl p-5 anim-slide-up">
      <h2 className="heading-2 mb-4">Applications</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="heading-3">Residential</h3>
          <ul className="list-disc pl-5 text-body mt-2">
            <li>Garage</li>
            <li>Home Gym</li>
            <li>Patio & Deck</li>
            <li>Craft Areas</li>
            <li>Unfinished Basement</li>
            <li>Sheds</li>
            <li>Home Office</li>
          </ul>
        </div>
        <div>
          <h3 className="heading-3">Commercial</h3>
          <ul className="list-disc pl-5 text-body mt-2">
            <li>Retail stores</li>
            <li>Offices</li>
            <li>Showrooms</li>
            <li>Car Dealership Showrooms</li>
            <li>Outdoor Events</li>
            <li>Dance Floors</li>
            <li>Commercial Garages</li>
            <li>Airplane Hangars</li>
            <li>Corporate Events</li>
            <li>Gym Flooring</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const items = [
    { t: "Customizable", d: "Pick tiles, colors, and layouts tailored to the space." },
    { t: "Durable", d: "Protects against impact and chemicals for years." },
    { t: "Covers Imperfections", d: "Hide stained or cracked floors quickly." },
    { t: "Warranty-Backed", d: "Industry-leading coverage for peace of mind." },
    { t: "Fast Install", d: "Finish in hours—not days—with minimal prep." },
  ];
  return (
    <section className="surface-elevated rounded-xl p-5 anim-slide-up">
      <h2 className="heading-2 mb-4">Benefits</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ t, d }) => (
          <div key={t} className="rounded-lg border border-border p-4">
            <p className="font-semibold">{t}</p>
            <p className="text-body mt-1 text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function DealerPortalPage() {
  const [user, setUser] = React.useState(getCurrentUser());
  const [error, setError] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({ dealerEmail: "", projectName: "", shipTo: "", city: "", state: "", zip: "", contact: "", phone: "", notes: "" });
  const [savedMsg, setSavedMsg] = React.useState<string | null>(null);
  const [orders, setOrders] = React.useState<MockOrder[]>([]);

  React.useEffect(() => {
    if (isDealer(user)) {
      const all = listOrders();
      setOrders(all.filter(o => o.dealerEmail === user!.email).sort((a,b)=>b.createdAt-a.createdAt));
    }
  }, [user]);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    const u = login(email, password);
    if (!u) return setError("Invalid credentials");
    setUser(u); setError(null);
  }

  function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    const u = signup(email, password);
    if (!u) return setError("Email already registered");
    setUser(u); setError(null);
  }

  function handleLogout() { logout(); setUser(null); }

  function submitOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isDealer(user)) { setError("Dealer login required"); return; }
    const order: MockOrder = {
      id: Math.random().toString(36).slice(2),
      dealerEmail: user!.email,
      projectName: form.projectName,
      shipTo: form.shipTo,
      city: form.city,
      state: form.state,
      zip: form.zip,
      contact: form.contact,
      phone: form.phone,
      notes: form.notes,
      createdAt: Date.now(),
    };
    saveOrder(order);
    setOrders(prev => [order, ...prev]);
    setForm({ dealerEmail: user!.email, projectName: "", shipTo: "", city: "", state: "", zip: "", contact: "", phone: "", notes: "" });
    setSavedMsg("Order saved. Admin can view it in /admin (placeholder storage).");
    setTimeout(() => setSavedMsg(null), 2600);
  }

  return (
    <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
      <MarketingHero onLogout={handleLogout} showLogout={!!user} />
      <div className="mt-6"><StatBar /></div>

      <div className="mt-6 grid gap-6">
        <FeatureCard title="Introduction" description="As a certified dealer, you provide a variety of modular tile flooring options suitable for both residential and commercial applications. Explore tile options and configure orders below." />
        <FeatureCard title="Applications">
          <ApplicationsGrid />
        </FeatureCard>
        <FeatureCard title="Benefits">
          <BenefitsGrid />
        </FeatureCard>

        <article className="surface-elevated rounded-xl p-5 anim-slide-up">
          <SectionHeader overline="Start an Order" title={isDealer(user) ? "Order Request" : "Dealer Access"} right={<Stepper steps={["Details","Shipping","Items","Review"]} active={0} />} />
          {error && <p className="text-sm text-red-400 mb-2">{error}</p>}
          {!user && (
            <div className="grid gap-6">
              <form onSubmit={handleLogin} className="grid gap-2">
                <p className="text-caption">Login (use dealer@gmail.com / password123)</p>
                <input name="email" className="field-input" placeholder="Email" />
                <input name="password" type="password" className="field-input" placeholder="Password" />
                <button className="btn-neon glass-dark rounded-md px-4 py-2 text-sm" type="submit">Login</button>
              </form>
              <form onSubmit={handleSignup} className="grid gap-2">
                <p className="text-caption">New dealer? Sign up</p>
                <input name="email" className="field-input" placeholder="Email" />
                <input name="password" type="password" className="field-input" placeholder="Password" />
                <button className="btn-neon glass-dark rounded-md px-4 py-2 text-sm" type="submit">Create Account</button>
              </form>
            </div>
          )}

          {isDealer(user) && (
            <form onSubmit={submitOrder} className="grid gap-3">
              {savedMsg && <div className="rounded-lg border border-[var(--border)] bg-emerald-500/10 text-emerald-300 px-3 py-2 text-sm">{savedMsg}</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-caption">Project Name</label>
                  <input className="field-input" placeholder="Backyard Multi-Sport" value={form.projectName} onChange={(e)=>setForm({...form, projectName:e.target.value})} />
                </div>
                <div>
                  <label className="text-caption">Contact Name</label>
                  <input className="field-input" placeholder="First Last" value={form.contact} onChange={(e)=>setForm({...form, contact:e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-caption">Ship To Address</label>
                  <input className="field-input" placeholder="123 Court St" value={form.shipTo} onChange={(e)=>setForm({...form, shipTo:e.target.value})} />
                </div>
                <div>
                  <label className="text-caption">City</label>
                  <input className="field-input" placeholder="City" value={form.city} onChange={(e)=>setForm({...form, city:e.target.value})} />
                </div>
                <div>
                  <label className="text-caption">State</label>
                  <input className="field-input" placeholder="GA" value={form.state} onChange={(e)=>setForm({...form, state:e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-caption">Zip Code</label>
                  <input className="field-input" placeholder="30004" value={form.zip} onChange={(e)=>setForm({...form, zip:e.target.value})} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-caption">Phone</label>
                  <input className="field-input" placeholder="(770) 555-0101" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
                </div>
              </div>
              <div>
                <label className="text-caption">Notes</label>
                <textarea className="field-input" placeholder="Line colors, logo placement, delivery constraints..." value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})} rows={4}></textarea>
              </div>

              {/* Options & Colors (admin-managed placeholder) */}
              <div className="surface-elevated rounded-lg p-4">
                <SectionHeader title="Options & Colors" caption="Admin-managed catalog and color palettes will appear here." />
                <div className="mt-3"><ColorPalettePreview /></div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {["Game Tile", "Speed Outdoor Tile", "Compete Tile", "Active Tile", "Boost Tile", "Pro Tile"].map((n) => (
                    <div key={n} className="rounded-md border border-border p-3">
                      <p className="text-sm font-medium">{n}</p>
                      <div className="mt-2 grid grid-cols-6 gap-1">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <span key={i} className="h-5 w-5 rounded-full" style={{ background: `hsl(${(i*60)%360} 80% 50%)` }} />
                        ))}
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <input type="number" min={0} className="field-input" placeholder="Qty" />
                        <button type="button" className="glass-dark rounded px-2 py-1 text-xs">Add to order</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-neon glass-dark rounded-md px-4 py-2 text-sm" type="submit">Submit Request</button>
                <button type="button" className="glass-dark rounded-md px-3 py-2 text-sm" onClick={handleLogout}>Logout</button>
              </div>
            </form>
          )}
        </article>

        {isDealer(user) && (
          <article className="surface-elevated rounded-xl p-5 md:col-span-2 anim-slide-up">
            <div className="flex items-center justify-between mb-3">
              <h3 className="heading-3">Your Recent Orders</h3>
              <span className="sport-badge">{orders.length} total</span>
            </div>
            <div className="grid gap-3">
              {orders.map(o => (
                <div key={o.id} className="rounded-lg border border-border p-3 grid gap-1 md:grid-cols-5">
                  <p className="text-sm"><span className="text-muted-foreground">Project:</span> {o.projectName || "Untitled"}</p>
                  <p className="text-sm"><span className="text-muted-foreground">Ship To:</span> {o.shipTo}</p>
                  <p className="text-sm"><span className="text-muted-foreground">City:</span> {o.city}</p>
                  <p className="text-sm"><span className="text-muted-foreground">Contact:</span> {o.contact}</p>
                  <p className="text-sm"><span className="text-muted-foreground">Created:</span> {new Date(o.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
              {orders.length === 0 && (
                <p className="text-sm text-muted-foreground">No orders yet. Submit your first order above.</p>
              )}
            </div>
          </article>
        )}
      </div>
    </section>
  );
}


