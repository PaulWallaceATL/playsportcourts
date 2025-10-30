"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart as CartIcon,
  Package,
  LogOut,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { getCurrentUser, login, logout, signup, isDealer } from "@/lib/mock-auth";
import { CartItem, ProductId } from "@/lib/stripe";
import { AuthUI } from "@/components/dealer/AuthUI";
import { DashboardMetrics } from "@/components/dealer/DashboardMetrics";
import { ProductCatalog } from "@/components/dealer/ProductCatalog";
import { ShoppingCart } from "@/components/dealer/ShoppingCart";
import { OrdersTable, Order } from "@/components/dealer/OrdersTable";

type TabType = "dashboard" | "catalog" | "cart" | "orders";

export default function DealerPortalPage() {
  const searchParams = useSearchParams();
  const [user, setUser] = React.useState(getCurrentUser());
  const [error, setError] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<TabType>("dashboard");
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showCancelled, setShowCancelled] = React.useState(false);

  // Check for Stripe redirect params
  React.useEffect(() => {
    const success = searchParams?.get("success");
    const cancelled = searchParams?.get("canceled");

    if (success === "true") {
      setShowSuccess(true);
      setCart([]); // Clear cart on success
      setTimeout(() => setShowSuccess(false), 5000);
    }

    if (cancelled === "true") {
      setShowCancelled(true);
      setTimeout(() => setShowCancelled(false), 5000);
    }
  }, [searchParams]);

  // Mock orders data (in production, fetch from API)
  React.useEffect(() => {
    if (isDealer(user)) {
      setOrders([
        {
          id: "ord_1",
          projectName: "Downtown Basketball Court",
          status: "completed",
          total: 4567.89,
          itemCount: 3,
          createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
          paymentStatus: "paid",
        },
        {
          id: "ord_2",
          projectName: "Community Center Renovation",
          status: "processing",
          total: 8923.45,
          itemCount: 5,
          createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
          paymentStatus: "paid",
        },
        {
          id: "ord_3",
          projectName: "Backyard Multi-Sport Court",
          status: "pending",
          total: 2156.78,
          itemCount: 2,
          createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
          paymentStatus: "pending",
        },
      ]);
    }
  }, [user]);

  const handleLogin = (email: string, password: string) => {
    const u = login(email, password);
    if (!u) {
      setError("Invalid credentials. Please try again.");
      return;
    }
    setUser(u);
    setError(null);
  };

  const handleSignup = (email: string, password: string) => {
    const u = signup(email, password);
    if (!u) {
      setError("Email already registered. Please sign in.");
      return;
    }
    setUser(u);
    setError(null);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setCart([]);
    setActiveTab("dashboard");
  };

  const handleAddToCart = (productId: ProductId, color: string, quantity: number) => {
    setCart((prev) => [...prev, { productId, color, quantity }]);
    // Auto-switch to cart tab to show the added item
    setTimeout(() => setActiveTab("cart"), 300);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  // If not logged in, show auth UI
  if (!isDealer(user)) {
    return (
      <AuthUI
        onLogin={handleLogin}
        onSignup={handleSignup}
        error={error}
      />
    );
  }

  const tabs = [
    { id: "dashboard" as TabType, label: "Dashboard", icon: LayoutDashboard },
    { id: "catalog" as TabType, label: "Product Catalog", icon: ShoppingBag },
    { id: "cart" as TabType, label: "Shopping Cart", icon: CartIcon, badge: cart.length },
    { id: "orders" as TabType, label: "Orders", icon: Package, badge: orders.length },
  ];

  return (
    <section className="min-h-screen bg-[var(--background)]">
      {/* Success/Cancel Notifications */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 glass-dark rounded-xl p-4 shadow-layered border-2 border-emerald-500/40 anim-slide-down max-w-md">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-300 mb-1">Payment Successful!</p>
              <p className="text-sm text-muted-foreground">
                Your order has been placed and payment processed. Check your email for confirmation.
              </p>
            </div>
          </div>
        </div>
      )}

      {showCancelled && (
        <div className="fixed top-4 right-4 z-50 glass-dark rounded-xl p-4 shadow-layered border-2 border-yellow-500/40 anim-slide-down max-w-md">
          <div className="flex items-start gap-3">
            <XCircle className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-300 mb-1">Checkout Cancelled</p>
              <p className="text-sm text-muted-foreground">
                Your cart items are still saved. Complete checkout when you&apos;re ready.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="glass-dark rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h1 className="heading-display text-gradient-hero mb-2">Dealer Portal</h1>
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
                  {tab.badge !== undefined && tab.badge > 0 && (
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
              <DashboardMetrics />
              
              {/* Quick Actions */}
              <div className="glass-dark rounded-xl p-6">
                <h2 className="heading-2 mb-4">Quick Actions</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  <button
                    onClick={() => setActiveTab("catalog")}
                    className="glass-surface rounded-xl p-6 text-left hover-lift transition-all group"
                  >
                    <ShoppingBag className="w-10 h-10 text-[var(--brand-primary)] mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-1">Browse Catalog</h3>
                    <p className="text-caption text-muted-foreground">
                      Explore our full range of premium tiles
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveTab("cart")}
                    className="glass-surface rounded-xl p-6 text-left hover-lift transition-all group"
                  >
                    <CartIcon className="w-10 h-10 text-[var(--brand-accent)] mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-1">View Cart</h3>
                    <p className="text-caption text-muted-foreground">
                      {cart.length} items ready for checkout
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveTab("orders")}
                    className="glass-surface rounded-xl p-6 text-left hover-lift transition-all group"
                  >
                    <Package className="w-10 h-10 text-[var(--brand-secondary)] mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-1">Order History</h3>
                    <p className="text-caption text-muted-foreground">
                      Track your {orders.length} orders
                    </p>
                  </button>
                </div>
              </div>

              {/* Recent Orders Preview */}
              {orders.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="heading-2">Recent Orders</h2>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-sm text-[var(--brand-primary)] hover:underline font-semibold"
                    >
                      View all →
                    </button>
                  </div>
                  <OrdersTable orders={orders.slice(0, 3)} />
                </div>
              )}
            </div>
          )}

          {activeTab === "catalog" && (
            <div>
              <div className="mb-6">
                <h2 className="heading-2 mb-2">Product Catalog</h2>
                <p className="text-body text-muted-foreground">
                  Select from our premium line of modular sport court tiles
                </p>
              </div>
              <ProductCatalog onAddToCart={handleAddToCart} />
            </div>
          )}

          {activeTab === "cart" && (
            <div>
              <ShoppingCart
                items={cart}
                onRemoveItem={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                dealerEmail={user?.email || ""}
                projectName="Dealer Order"
              />
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <div className="mb-6">
                <h2 className="heading-2 mb-2">Order Management</h2>
                <p className="text-body text-muted-foreground">
                  Track and manage all your orders in one place
                </p>
              </div>
              <OrdersTable orders={orders} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
