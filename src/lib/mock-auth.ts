"use client";

export type UserRole = "dealer" | "admin";
export interface MockUser { email: string; role: UserRole; }

const SEED_USERS: Array<{ email: string; password: string; role: UserRole }> = [
  { email: "dealer@gmail.com", password: "password123", role: "dealer" },
  { email: "admin@gmail.com", password: "password123", role: "admin" },
  // New test users
  { email: "admin2@playsport.com", password: "admin2024!", role: "admin" },
  { email: "dealer-test@playsport.com", password: "dealer2024!", role: "dealer" },
];

const STORAGE_KEYS = {
  currentUser: "mock_auth_user",
  users: "mock_auth_users",
  orders: "mock_orders",
} as const;

function loadUsers(): Array<{ email: string; password: string; role: UserRole }> {
  if (typeof window === "undefined") return SEED_USERS.slice();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.users);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(SEED_USERS));
      return SEED_USERS.slice();
    }
    return JSON.parse(raw);
  } catch {
    return SEED_USERS.slice();
  }
}

function saveUsers(users: Array<{ email: string; password: string; role: UserRole }>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

export function signup(email: string, password: string): MockUser | null {
  const users = loadUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) return null;
  users.push({ email, password, role: "dealer" });
  saveUsers(users);
  const user: MockUser = { email, role: "dealer" };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
    window.dispatchEvent(new Event("mock-auth-change"));
  }
  return user;
}

export function login(email: string, password: string): MockUser | null {
  const users = loadUsers();
  const hit = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!hit) return null;
  const user: MockUser = { email: hit.email, role: hit.role };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
    window.dispatchEvent(new Event("mock-auth-change"));
  }
  return user;
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.currentUser);
  window.dispatchEvent(new Event("mock-auth-change"));
}

export function getCurrentUser(): MockUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEYS.currentUser);
  return raw ? (JSON.parse(raw) as MockUser) : null;
}

export function isDealer(user: MockUser | null) { return user?.role === "dealer"; }
export function isAdmin(user: MockUser | null) { return user?.role === "admin"; }

export interface MockOrder {
  id: string;
  dealerEmail: string;
  projectName: string;
  shipTo: string;
  city: string;
  state: string;
  zip: string;
  contact: string;
  phone: string;
  notes?: string;
  createdAt: number;
}

export function saveOrder(order: MockOrder) {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem(STORAGE_KEYS.orders);
  const list: MockOrder[] = raw ? JSON.parse(raw) : [];
  list.push(order);
  localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(list));
}

export function listOrders(): MockOrder[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEYS.orders);
  return raw ? (JSON.parse(raw) as MockOrder[]) : [];
}


