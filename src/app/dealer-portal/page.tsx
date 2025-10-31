"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart as CartIcon,
  Package,
  LogOut,
  CheckCircle,
  XCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { getCurrentUser, login, logout, signup, isDealer } from "@/lib/mock-auth";
import { CartItem, ProductId } from "@/lib/stripe";
import { AuthUI } from "@/components/dealer/AuthUI";
import { DashboardMetrics } from "@/components/dealer/DashboardMetrics";
import { ProductCatalog } from "@/components/dealer/ProductCatalog";
import { ShoppingCart } from "@/components/dealer/ShoppingCart";
import { OrdersTable, Order } from "@/components/dealer/OrdersTable";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

type TabType = "dashboard" | "catalog" | "cart" | "orders";

function DealerPortalContent() {
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

  // Mock orders data
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
      {/* Success/Cancel Notifications - Enhanced */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 card-premium border-premium-animated max-w-md anim-slide-down shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-emerald-300 mb-1">Payment Successful!</p>
              <p className="text-sm text-muted-foreground">
                Your order has been placed and payment processed. Check your email for confirmation.
              </p>
            </div>
          </div>
        </div>
      )}

      {showCancelled && (
        <div className="fixed top-6 right-6 z-50 card-premium max-w-md anim-slide-down shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
              <XCircle className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-yellow-300 mb-1">Checkout Cancelled</p>
              <p className="text-sm text-muted-foreground">
                Your cart items are still saved. Complete checkout when you&apos;re ready.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Header */}
        <div className="mb-8">
          <div className="card-premium border-premium-animated">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-black">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="heading-1 text-gradient-hero">Dealer Portal</h1>
                    <p className="text-sm text-muted-foreground">
                      Welcome back, <span className="text-[var(--brand-primary)] font-semibold">{user?.email}</span>
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
                        ? "bg-gradient-primary text-black shadow-primary"
                        : "text-muted-foreground hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span
                        className={`absolute -top-1 -right-1 min-w-[22px] h-5 px-1.5 rounded-full text-xs flex items-center justify-center font-bold ${
                          isActive
                            ? "bg-black/30 text-white"
                            : "bg-[var(--brand-primary)]/30 text-[var(--brand-primary)]"
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

        {/* Tab Content with Enhanced Animations */}
        <div className="anim-fade-in">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Welcome Banner */}
              <div className="card-premium border-premium-animated text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary/20 mb-6 text-[var(--brand-primary)]">
                  <TrendingUp className="w-10 h-10" />
                </div>
                <h2 className="heading-2 text-gradient-hero mb-3">
                  Your Performance Dashboard
                </h2>
                <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                  Track your orders, revenue, and business growth all in one place
                </p>
              </div>

              <DashboardMetrics />
              
              {/* Quick Actions - Enhanced */}
              <div className="card-premium">
                <h2 className="heading-2 mb-6">Quick Actions</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <button
                    onClick={() => setActiveTab("catalog")}
                    className="card-premium border-premium text-left hover:scale-105 transition-transform"
                  >
                    <ShoppingBag className="w-12 h-12 text-[var(--brand-primary)] mb-4" />
                    <h3 className="font-bold text-lg mb-2">Browse Catalog</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore our full range of premium tiles
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveTab("cart")}
                    className="card-premium border-premium text-left hover:scale-105 transition-transform"
                  >
                    <div className="relative inline-block">
                      <CartIcon className="w-12 h-12 text-[var(--brand-accent)] mb-4" />
                      {cart.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-6 h-6 bg-[var(--brand-accent)] rounded-full flex items-center justify-center text-xs font-bold text-black">
                          {cart.length}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-2">View Cart</h3>
                    <p className="text-sm text-muted-foreground">
                      {cart.length} items ready for checkout
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveTab("orders")}
                    className="card-premium border-premium text-left hover:scale-105 transition-transform"
                  >
                    <Package className="w-12 h-12 text-[var(--brand-secondary)] mb-4" />
                    <h3 className="font-bold text-lg mb-2">Order History</h3>
                    <p className="text-sm text-muted-foreground">
                      Track your {orders.length} orders
                    </p>
                  </button>
                </div>
              </div>

              {/* Recent Orders Preview */}
              {orders.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="heading-2">Recent Orders</h2>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-sm text-[var(--brand-primary)] hover:text-[var(--brand-accent)] font-semibold transition-colors flex items-center gap-1"
                    >
                      View all
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                  <OrdersTable orders={orders.slice(0, 3)} />
                </div>
              )}
            </div>
          )}

          {activeTab === "catalog" && (
            <div>
              <div className="mb-8 card-premium">
                <h2 className="heading-2 mb-2">Product Catalog</h2>
                <p className="text-body text-muted-foreground">
                  Select from our premium line of modular sport court tiles. All products backed by industry-leading warranties.
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
              <div className="mb-8 card-premium">
                <h2 className="heading-2 mb-2">Order Management</h2>
                <p className="text-body text-muted-foreground">
                  Track and manage all your orders in one place. Real-time status updates and payment tracking.
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

export default function DealerPortalPage() {
  return (
    <Suspense fallback={
      <LoadingSpinner size="lg" text="Loading dealer portal..." fullScreen />
    }>
      <DealerPortalContent />
    </Suspense>
  );
}
