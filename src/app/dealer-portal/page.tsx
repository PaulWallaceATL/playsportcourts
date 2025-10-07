"use client";
import Link from "next/link";
import * as React from "react";
import { getCurrentUser, login, logout, signup, isDealer, saveOrder, type MockOrder } from "@/lib/mock-auth";

export default function DealerPortalPage() {
  const [user, setUser] = React.useState(getCurrentUser());
  const [error, setError] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({ dealerEmail: "", projectName: "", shipTo: "", city: "", state: "", zip: "", contact: "", phone: "", notes: "" });

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
    setForm({ dealerEmail: user!.email, projectName: "", shipTo: "", city: "", state: "", zip: "", contact: "", phone: "", notes: "" });
    alert("Order saved (local placeholder)");
  }

  return (
    <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
      <h1 className="heading-1 text-white">Swisstrax Dealer Portal</h1>
      <p className="mt-2 text-body text-muted-foreground">Resources, applications, and an order request form for certified dealers.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <article className="surface-elevated rounded-xl p-5">
          <h2 className="heading-2 mb-2">Introduction</h2>
          <p className="text-body">As a Certified Swisstrax Dealer, [Dealer Name] provides a variety of modular tile flooring options from Swisstrax. Known for premium garage flooring solutions, Swisstrax flooring can be used for both residential and commercial applications. <Link href="/garage-tiles" className="holo-link">Learn more about the tile options</Link>.</p>
          <div className="mt-4 grid gap-3">
            <div>
              <h3 className="heading-3">Residential Applications Include</h3>
              <ul className="list-disc pl-5 text-body">
                <li>Garage</li><li>Home Gym</li><li>Patio & Deck</li><li>Craft Areas</li><li>Unfinished Basement</li><li>Sheds</li><li>Home Office</li>
              </ul>
            </div>
            <div>
              <h3 className="heading-3">Commercial Applications Include</h3>
              <ul className="list-disc pl-5 text-body">
                <li>Retail stores</li><li>Offices</li><li>Showrooms</li><li>Car Dealership Showrooms</li><li>Outdoor Events</li><li>Dance Floors</li><li>Commercial Garages</li><li>Airplane Hangars</li><li>Corporate Events</li><li>Gym Flooring</li>
              </ul>
            </div>
            <div>
              <h3 className="heading-3">Benefits</h3>
              <ul className="list-disc pl-5 text-body">
                <li>Customize your floors with specific tiles & designs</li>
                <li>Protect floors from impact and chemicals</li>
                <li>Cover stained or cracked flooring</li>
                <li>Industry leading warranty</li>
                <li>No prep required; finish in hours, not days</li>
              </ul>
            </div>
          </div>
        </article>

        <article className="surface-elevated rounded-xl p-5">
          <h2 className="heading-2 mb-2">{isDealer(user) ? "Order Request" : "Dealer Access"}</h2>
          {error && <p className="text-sm text-red-400 mb-2">{error}</p>}
          {!user && (
            <div className="grid gap-6">
              <form onSubmit={handleLogin} className="grid gap-2">
                <p className="text-caption">Login (use dealer@gmail.com / password123)</p>
                <input name="email" className="control glass-dark p-2" placeholder="Email" />
                <input name="password" type="password" className="control glass-dark p-2" placeholder="Password" />
                <button className="btn-neon glass-dark rounded-md px-4 py-2 text-sm" type="submit">Login</button>
              </form>
              <form onSubmit={handleSignup} className="grid gap-2">
                <p className="text-caption">New dealer? Sign up</p>
                <input name="email" className="control glass-dark p-2" placeholder="Email" />
                <input name="password" type="password" className="control glass-dark p-2" placeholder="Password" />
                <button className="btn-neon glass-dark rounded-md px-4 py-2 text-sm" type="submit">Create Account</button>
              </form>
            </div>
          )}

          {isDealer(user) && (
            <form onSubmit={submitOrder} className="grid gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className="control glass-dark p-2" placeholder="Project Name" value={form.projectName} onChange={(e)=>setForm({...form, projectName:e.target.value})} />
                <input className="control glass-dark p-2" placeholder="Contact Name" value={form.contact} onChange={(e)=>setForm({...form, contact:e.target.value})} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input className="control glass-dark p-2" placeholder="Ship To Address" value={form.shipTo} onChange={(e)=>setForm({...form, shipTo:e.target.value})} />
                <input className="control glass-dark p-2" placeholder="City" value={form.city} onChange={(e)=>setForm({...form, city:e.target.value})} />
                <input className="control glass-dark p-2" placeholder="State" value={form.state} onChange={(e)=>setForm({...form, state:e.target.value})} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input className="control glass-dark p-2" placeholder="Zip Code" value={form.zip} onChange={(e)=>setForm({...form, zip:e.target.value})} />
                <input className="control glass-dark p-2" placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
              </div>
              <textarea className="control glass-dark p-2" placeholder="Notes" value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})}></textarea>
              <div className="flex items-center gap-2">
                <button className="btn-neon glass-dark rounded-md px-4 py-2 text-sm" type="submit">Submit Request</button>
                <button type="button" className="glass-dark rounded-md px-3 py-2 text-sm" onClick={handleLogout}>Logout</button>
              </div>
            </form>
          )}
        </article>
      </div>
    </section>
  );
}


