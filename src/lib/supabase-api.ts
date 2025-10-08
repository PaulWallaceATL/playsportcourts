"use client";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { getCurrentUser, listOrders, saveOrder, type MockOrder } from "@/lib/mock-auth";

export async function upsertDealerProfile() {
  const sb = getSupabaseBrowser();
  if (!sb) return;
  const user = (await sb.auth.getUser()).data.user;
  if (!user) return;
  await sb.from("dealers").upsert({ user_id: user.id, email: user.email }, { onConflict: "email" });
}

export async function createOrder(data: Omit<MockOrder, "id" | "createdAt">) {
  const sb = getSupabaseBrowser();
  if (!sb) {
    const order: MockOrder = { id: Math.random().toString(36).slice(2), createdAt: Date.now(), ...data };
    saveOrder(order); return { id: order.id };
  }
  const dealer = await sb.from("dealers").select("id").eq("email", data.dealerEmail).single();
  const dealerId = dealer.data?.id;
  if (!dealerId) throw new Error("Dealer profile missing");
  const res = await sb.from("orders").insert({
    dealer_id: dealerId,
    project_name: data.projectName,
    ship_to: data.shipTo,
    city: data.city,
    state: data.state,
    zip: data.zip,
    contact: data.contact,
    phone: data.phone,
    notes: data.notes,
  }).select("id").single();
  if (res.error) throw res.error;
  return { id: res.data!.id };
}

export async function fetchMyOrders() {
  const sb = getSupabaseBrowser();
  if (!sb) {
    const u = getCurrentUser();
    return listOrders().filter(o => o.dealerEmail === u?.email);
  }
  const { data: authUser } = await sb.auth.getUser();
  if (!authUser.user) return [];
  const d = await sb.from("dealers").select("id").eq("user_id", authUser.user.id).single();
  const did = d.data?.id;
  if (!did) return [];
  const res = await sb.from("orders").select("id, project_name, ship_to, city, state, zip, contact, phone, notes, created_at").eq("dealer_id", did).order("created_at", { ascending: false });
  if (res.error) throw res.error;
  return res.data?.map(r => ({ id: r.id, projectName: r.project_name, shipTo: r.ship_to, city: r.city, state: r.state, zip: r.zip, contact: r.contact, phone: r.phone, notes: r.notes, createdAt: new Date(r.created_at).getTime(), dealerEmail: authUser.user!.email! })) ?? [];
}

type SupabaseOrderRow = {
  id: string;
  project_name: string | null;
  ship_to: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  contact: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
  dealers?: { email: string | null } | null;
};

export async function adminFetchAllOrders() {
  const sb = getSupabaseBrowser();
  if (!sb) return listOrders();
  const res = await sb
    .from("orders")
    .select("id, project_name, ship_to, city, state, zip, contact, phone, notes, created_at, dealers(email)")
    .order("created_at", { ascending: false });
  if (res.error) throw res.error;
  const rows = (res.data ?? []) as SupabaseOrderRow[];
  return rows.map((r) => ({
    id: r.id,
    projectName: r.project_name ?? "",
    shipTo: r.ship_to ?? "",
    city: r.city ?? "",
    state: r.state ?? "",
    zip: r.zip ?? "",
    contact: r.contact ?? "",
    phone: r.phone ?? "",
    notes: r.notes ?? "",
    createdAt: new Date(r.created_at).getTime(),
    dealerEmail: r.dealers?.email ?? "",
  }));
}
