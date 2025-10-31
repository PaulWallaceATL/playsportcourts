"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  LogOut,
  Shield,
  Lock,
  Mail,
  Activity,
  TrendingUp,
} from "lucide-react";
import { getCurrentUser, isAdmin, logout, login } from "@/lib/mock-auth";
import { PRODUCT_CATALOG } from "@/lib/stripe";
import { ProductManager, Product } from "@/components/admin/ProductManager";
import { UserManager, AppUser } from "@/components/admin/UserManager";
import { OrderManager, AdminOrder } from "@/components/admin/OrderManager";
import { AdminStats, RecentActivity } from "@/components/admin/AdminStats";

type TabType = "dashboard" | "products" | "users" | "orders";

export default function AdminPage() {
  const [user, setUser] = React.useState(getCurrentUser());
  const [activeTab, setActiveTab] = React.useState<TabType>("dashboard");
  const [error, setError] = React.useState<string | null>(null);

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

  // Handler functions
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

  // Show admin login if not logged in as admin
  if (!isAdmin(user)) {
    return <AdminLogin onLogin={handleLogin} error={error} />;
  }

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
        {/* Premium Header with Shield */}
        <div className="mb-8">
          <div className="card-premium border-premium-animated">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[var(--brand-accent)] blur-xl opacity-50" />
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-accent flex items-center justify-center shadow-glow-orange">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="heading-display text-gradient-hero">Admin Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                      Full platform oversight • <span className="text-[var(--brand-accent)] font-semibold">{user?.email}</span>
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn-premium-secondary flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Premium Tab Navigation */}
        <div className="mb-8">
          <div className="card-premium p-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold text-sm transition-all ${
                      isActive
                        ? "bg-gradient-accent text-white shadow-glow-orange"
                        : "text-muted-foreground hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                    {tab.badge !== undefined && (
                      <span
                        className={`absolute -top-1 -right-1 min-w-[22px] h-5 px-1.5 rounded-full text-xs flex items-center justify-center font-bold ${
                          isActive
                            ? "bg-white/30 text-white"
                            : "bg-[var(--brand-accent)]/30 text-[var(--brand-accent)]"
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
        </div>

        {/* Tab Content */}
        <div className="anim-fade-in">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="card-premium border-premium-animated text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-accent/20 mb-6 text-[var(--brand-accent)]">
                  <Activity className="w-10 h-10" />
                </div>
                <h2 className="heading-2 text-gradient-hero mb-3">
                  Platform Overview & Analytics
                </h2>
                <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                  Complete visibility into orders, revenue, users, and products across your entire platform
                </p>
              </div>

              <AdminStats stats={stats} />
              
              <div className="grid gap-8 lg:grid-cols-2">
                <RecentActivity activities={recentActivities} />
                
                {/* Quick Overview */}
                <div className="card-premium">
                  <h2 className="heading-2 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-[var(--brand-primary)]" />
                    Quick Overview
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl glass-tier-1 hover-lift transition-all">
                      <span className="text-sm text-muted-foreground">Pending Orders</span>
                      <span className="font-bold text-2xl text-yellow-400">
                        {orders.filter((o) => o.status === "pending").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl glass-tier-1 hover-lift transition-all">
                      <span className="text-sm text-muted-foreground">Processing Orders</span>
                      <span className="font-bold text-2xl text-blue-400">
                        {orders.filter((o) => o.status === "processing").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl glass-tier-1 hover-lift transition-all">
                      <span className="text-sm text-muted-foreground">Active Dealers</span>
                      <span className="font-bold text-2xl text-emerald-400">
                        {users.filter((u) => u.role === "dealer" && u.status === "active").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl glass-tier-1 hover-lift transition-all">
                      <span className="text-sm text-muted-foreground">Active Products</span>
                      <span className="font-bold text-2xl text-orange-400">
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

// Admin Login Component - Enhanced
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
      <div className="absolute inset-0 grid-pattern-premium opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-[var(--brand-accent)]/10 to-transparent blur-3xl" />
      
      <div className="relative w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-[var(--brand-accent)] blur-2xl opacity-50" />
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-accent flex items-center justify-center shadow-glow-orange">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="heading-1 text-gradient-hero mb-3">Admin Dashboard</h1>
          <p className="text-body text-muted-foreground">
            Secure access for authorized administrators
          </p>
        </div>

        {/* Login Card */}
        <div className="card-premium border-premium-animated">
          <h2 className="heading-3 mb-6 text-center">Administrator Sign In</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg state-error flex items-start gap-2">
              <div className="mt-0.5">⚠️</div>
              <div className="text-sm">{error}</div>
            </div>
          )}

          {/* Demo Credentials */}
          <div className="mb-6 p-4 rounded-lg state-info">
            <p className="font-semibold mb-2 text-sm">Admin Test Credentials:</p>
            <div className="space-y-1 text-xs font-mono">
              <p>admin@gmail.com / password123</p>
              <p>admin2@playsport.com / admin2024!</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="text-caption block mb-2 font-semibold">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@playsport.com"
                  required
                  className="input-premium pl-11"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-caption block mb-2 font-semibold">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-premium pl-11"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-premium btn-premium-primary w-full flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Access Dashboard
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              Admin access only • All actions are logged
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Unauthorized access attempts will be monitored and reported
          </p>
        </div>
      </div>
    </div>
  );
}
