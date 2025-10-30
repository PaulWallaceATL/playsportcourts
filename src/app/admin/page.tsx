"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  LogOut,
  Shield,
  Lock,
  Mail,
} from "lucide-react";
import { getCurrentUser, isAdmin, logout, login } from "@/lib/mock-auth";
import { PRODUCT_CATALOG } from "@/lib/stripe";
import { ProductManager, Product } from "@/components/admin/ProductManager";
import { UserManager, AppUser } from "@/components/admin/UserManager";
import { OrderManager, AdminOrder } from "@/components/admin/OrderManager";
import { AdminStats, RecentActivity } from "@/components/admin/AdminStats";

type TabType = "dashboard" | "products" | "users" | "orders";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = React.useState(getCurrentUser());
  const [activeTab, setActiveTab] = React.useState<TabType>("dashboard");

  // State for products
  const [products, setProducts] = React.useState<Product[]>(() => {
    // Initialize from catalog with mutable arrays
    return Object.values(PRODUCT_CATALOG).map((p) => ({
      ...p,
      colors: [...p.colors], // Convert readonly array to mutable
      features: [...p.features], // Convert readonly array to mutable
      active: true,
    }));
  });

  // State for users (mock data)
  const [users, setUsers] = React.useState<AppUser[]>([
    {
      email: "dealer@gmail.com",
      role: "dealer",
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
      lastLogin: Date.now() - 2 * 24 * 60 * 60 * 1000,
      orders: 5,
      totalSpent: 15678.45,
      status: "active",
    },
    {
      email: "admin@gmail.com",
      role: "admin",
      createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000,
      lastLogin: Date.now(),
      orders: 0,
      totalSpent: 0,
      status: "active",
    },
    {
      email: "dealer2@example.com",
      role: "dealer",
      createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
      lastLogin: Date.now() - 5 * 24 * 60 * 60 * 1000,
      orders: 3,
      totalSpent: 8234.12,
      status: "active",
    },
  ]);

  // State for orders (mock data)
  const [orders, setOrders] = React.useState<AdminOrder[]>([
    {
      id: "ord_1",
      dealerEmail: "dealer@gmail.com",
      projectName: "Downtown Basketball Court",
      status: "completed",
      paymentStatus: "paid",
      total: 4567.89,
      itemCount: 3,
      createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
      items: [
        { productName: "Game Tile", color: "Royal Blue", quantity: 200, price: 8.99 },
        { productName: "Pro Tile", color: "Championship Blue", quantity: 150, price: 14.99 },
      ],
      shipping: {
        address: "123 Court St",
        city: "Atlanta",
        state: "GA",
        zip: "30303",
      },
    },
    {
      id: "ord_2",
      dealerEmail: "dealer@gmail.com",
      projectName: "Community Center Renovation",
      status: "processing",
      paymentStatus: "paid",
      total: 8923.45,
      itemCount: 5,
      createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
      items: [
        { productName: "Compete Tile", color: "Pro Red", quantity: 300, price: 12.99 },
        { productName: "Active Tile", color: "Sky Blue", quantity: 200, price: 7.99 },
      ],
      shipping: {
        address: "456 Center Ave",
        city: "Decatur",
        state: "GA",
        zip: "30030",
      },
    },
    {
      id: "ord_3",
      dealerEmail: "dealer2@example.com",
      projectName: "Backyard Multi-Sport Court",
      status: "pending",
      paymentStatus: "pending",
      total: 2156.78,
      itemCount: 2,
      createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
      items: [
        { productName: "Speed Outdoor", color: "Ocean Blue", quantity: 150, price: 10.99 },
      ],
      shipping: {
        address: "789 Home Dr",
        city: "Marietta",
        state: "GA",
        zip: "30060",
      },
    },
    {
      id: "ord_4",
      dealerEmail: "dealer@gmail.com",
      projectName: "School Gymnasium Floor",
      status: "completed",
      paymentStatus: "paid",
      total: 12345.67,
      itemCount: 4,
      createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
    },
    {
      id: "ord_5",
      dealerEmail: "dealer2@example.com",
      projectName: "Tennis Court Resurfacing",
      status: "completed",
      paymentStatus: "paid",
      total: 5432.10,
      itemCount: 2,
      createdAt: Date.now() - 21 * 24 * 60 * 60 * 1000,
    },
  ]);

  // Show admin login if not logged in as admin
  if (!isAdmin(user)) {
    return <AdminLogin onLogin={handleLogin} error={error} />;
  }

  const handleLogin = (email: string, password: string) => {
    const u = login(email, password);
    if (!u || !isAdmin(u)) {
      setError("Admin credentials required");
      return;
    }
    setUser(u);
    setError(null);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  // Product handlers
  const handleSaveProduct = (product: Product) => {
    setProducts((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => (p.id === product.id ? product : p));
      }
      return [...prev, product];
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // User handlers
  const handleUpdateUser = (email: string, updates: Partial<AppUser>) => {
    setUsers((prev) =>
      prev.map((u) => (u.email === email ? { ...u, ...updates } : u))
    );
  };

  const handleDeleteUser = (email: string) => {
    setUsers((prev) => prev.filter((u) => u.email !== email));
  };

  // Order handlers
  const handleUpdateOrderStatus = (orderId: string, status: AdminOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleUpdatePaymentStatus = (
    orderId: string,
    paymentStatus: AdminOrder["paymentStatus"]
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, paymentStatus } : o))
    );
  };

  // Calculate stats
  const stats = {
    totalRevenue: orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + o.total, 0),
    totalOrders: orders.length,
    totalUsers: users.length,
    totalProducts: products.filter((p) => p.active).length,
    revenueChange: 23.5,
    ordersChange: 12.3,
    usersChange: 8.7,
  };

  // Recent activity
  const recentActivities = [
    {
      type: "order" as const,
      message: "New order placed: Backyard Multi-Sport Court",
      timestamp: Date.now() - 1 * 60 * 60 * 1000,
      user: "dealer2@example.com",
    },
    {
      type: "user" as const,
      message: "New dealer registered",
      timestamp: Date.now() - 3 * 60 * 60 * 1000,
      user: "dealer3@example.com",
    },
    {
      type: "order" as const,
      message: "Order completed: Community Center Renovation",
      timestamp: Date.now() - 5 * 60 * 60 * 1000,
      user: "dealer@gmail.com",
    },
    {
      type: "product" as const,
      message: "Product updated: Game Tile price changed",
      timestamp: Date.now() - 8 * 60 * 60 * 1000,
    },
  ];

  const tabs = [
    { id: "dashboard" as TabType, label: "Dashboard", icon: LayoutDashboard },
    { id: "products" as TabType, label: "Products", icon: Package, badge: products.length },
    { id: "users" as TabType, label: "Users & Dealers", icon: Users, badge: users.length },
    { id: "orders" as TabType, label: "Orders", icon: ShoppingCart, badge: orders.length },
  ];

  return (
    <section className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="glass-dark rounded-2xl p-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-10 h-10 text-[var(--brand-accent)]" />
                <h1 className="heading-display text-gradient-hero">Admin Dashboard</h1>
              </div>
              <p className="text-body text-muted-foreground">
                Welcome back, <span className="text-[var(--brand-primary)] font-semibold">{user?.email}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="glass-surface rounded-lg px-4 py-2 text-sm font-semibold hover-lift transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="glass-dark rounded-xl p-2 flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                    isActive
                      ? "bg-gradient-primary text-white shadow-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {tab.badge !== undefined && (
                    <span
                      className={`min-w-[20px] h-5 px-1.5 rounded-full text-xs flex items-center justify-center font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[var(--brand-primary)]/20 text-[var(--brand-primary)]"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="anim-fade-in">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <AdminStats stats={stats} />
              
              <div className="grid gap-6 lg:grid-cols-2">
                <RecentActivity activities={recentActivities} />
                
                {/* Quick Stats */}
                <div className="glass-dark rounded-xl p-6">
                  <h2 className="heading-2 mb-4">Quick Overview</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">Pending Orders</span>
                      <span className="font-bold text-yellow-400">
                        {orders.filter((o) => o.status === "pending").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">Processing Orders</span>
                      <span className="font-bold text-blue-400">
                        {orders.filter((o) => o.status === "processing").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">Active Dealers</span>
                      <span className="font-bold text-emerald-400">
                        {users.filter((u) => u.role === "dealer" && u.status === "active").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Products</span>
                      <span className="font-bold text-orange-400">
                        {products.filter((p) => p.active).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <ProductManager
              products={products}
              onSave={handleSaveProduct}
              onDelete={handleDeleteProduct}
            />
          )}

          {activeTab === "users" && (
            <UserManager
              users={users}
              onUpdateUser={handleUpdateUser}
              onDeleteUser={handleDeleteUser}
            />
          )}

          {activeTab === "orders" && (
            <OrderManager
              orders={orders}
              onUpdateStatus={handleUpdateOrderStatus}
              onUpdatePaymentStatus={handleUpdatePaymentStatus}
            />
          )}
        </div>
      </div>
    </section>
  );
}

// Admin Login Component
interface AdminLoginProps {
  onLogin: (email: string, password: string) => void;
  error: string | null;
}

function AdminLogin({ onLogin, error }: AdminLoginProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-4 shadow-neon-blue">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="heading-1 text-gradient-hero mb-2">Admin Dashboard</h1>
          <p className="text-body text-muted-foreground">
            Secure access for administrators only
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-dark rounded-2xl p-8 shadow-layered">
          <h2 className="heading-2 mb-6 text-center">Admin Sign In</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-2">
              <div className="mt-0.5">⚠️</div>
              <div>{error}</div>
            </div>
          )}

          {/* Demo Credentials */}
          <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm">
            <p className="font-semibold mb-1">Admin Credentials:</p>
            <p className="text-xs">Email: admin@gmail.com or admin2@playsport.com</p>
            <p className="text-xs">Password: password123 or admin2024!</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="text-caption block mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="field-input w-full pl-11"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-caption block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="field-input w-full pl-11"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-neon glass-dark rounded-lg px-6 py-3 w-full text-base font-bold hover-lift transition-all"
            >
              <Shield className="w-5 h-5 inline mr-2" />
              Access Dashboard
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-caption text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              Admin access only • Unauthorized access is prohibited
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-caption text-muted-foreground">
          <p>All admin actions are logged and monitored</p>
        </div>
      </div>
    </div>
  );
}
