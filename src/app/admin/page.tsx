"use client";
import * as React from "react";
import { getCurrentUser, isAdmin, listOrders, login, logout } from "@/lib/mock-auth";

export default function AdminPage() {
  const [user, setUser] = React.useState(getCurrentUser());
  const [error, setError] = React.useState<string | null>(null);
  const [orders, setOrders] = React.useState(listOrders());

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    const u = login(email, password);
    if (!u || !isAdmin(u)) { setError("Admin credentials required (admin@gmail.com / password123)"); return; }
    setUser(u); setError(null); setOrders(listOrders());
  }

  function handleLogout() { logout(); setUser(null); }

  return (
    <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
      <h1 className="heading-1 text-white">Admin</h1>
      {!isAdmin(user) ? (
        <div className="mt-6 surface-elevated rounded-xl p-5 max-w-md">
          <p className="text-caption mb-2">Login as admin (admin@gmail.com / password123)</p>
          {error && <p className="text-sm text-red-400 mb-2">{error}</p>}
          <form onSubmit={handleLogin} className="grid gap-2">
            <input name="email" className="control glass-dark p-2" placeholder="Email" />
            <input name="password" type="password" className="control glass-dark p-2" placeholder="Password" />
            <button className="btn-neon glass-dark rounded-md px-4 py-2 text-sm" type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div className="mt-6 grid gap-6">
          <div className="flex items-center justify-between">
            <p className="text-caption">Signed in as {user?.email}</p>
            <button className="glass-dark rounded-md px-3 py-2 text-sm" onClick={handleLogout}>Logout</button>
          </div>
          <div className="surface-elevated rounded-xl p-5">
            <h2 className="heading-2 mb-4">Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b">
                    <th className="py-2 pr-3">ID</th>
                    <th className="py-2 pr-3">Dealer</th>
                    <th className="py-2 pr-3">Project</th>
                    <th className="py-2 pr-3">Ship To</th>
                    <th className="py-2 pr-3">City</th>
                    <th className="py-2 pr-3">State</th>
                    <th className="py-2 pr-3">Zip</th>
                    <th className="py-2 pr-3">Contact</th>
                    <th className="py-2 pr-3">Phone</th>
                    <th className="py-2 pr-3">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} className="border-b border-border/60">
                      <td className="py-2 pr-3">{o.id}</td>
                      <td className="py-2 pr-3">{o.dealerEmail}</td>
                      <td className="py-2 pr-3">{o.projectName}</td>
                      <td className="py-2 pr-3">{o.shipTo}</td>
                      <td className="py-2 pr-3">{o.city}</td>
                      <td className="py-2 pr-3">{o.state}</td>
                      <td className="py-2 pr-3">{o.zip}</td>
                      <td className="py-2 pr-3">{o.contact}</td>
                      <td className="py-2 pr-3">{o.phone}</td>
                      <td className="py-2 pr-3">{new Date(o.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={10} className="py-4 text-center text-muted-foreground">No orders yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


