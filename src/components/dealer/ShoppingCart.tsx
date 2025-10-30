"use client";

import * as React from "react";
import { PRODUCT_CATALOG, CartItem, calculateCartTotal } from "@/lib/stripe";
import { getStripe } from "@/lib/stripe-client";
import { Trash2, ShoppingCart as CartIcon, CreditCard, Loader2 } from "lucide-react";

interface ShoppingCartProps {
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  dealerEmail: string;
  projectName: string;
}

export function ShoppingCart({
  items,
  onRemoveItem,
  onUpdateQuantity,
  dealerEmail,
  projectName,
}: ShoppingCartProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const total = calculateCartTotal(items);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create checkout session
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          dealerEmail,
          projectName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      if (!stripe) throw new Error("Stripe not loaded");

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        throw stripeError;
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err.message || "An error occurred during checkout");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="glass-dark rounded-xl p-12 text-center">
        <CartIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <p className="text-body-lg text-muted-foreground">Your cart is empty</p>
        <p className="text-caption mt-2">Add products from the catalog to get started</p>
      </div>
    );
  }

  return (
    <div className="glass-dark rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="heading-2 flex items-center gap-3">
          <CartIcon className="w-6 h-6" />
          Shopping Cart
        </h2>
        <span className="sport-badge">{items.length} items</span>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item, index) => {
          const product = PRODUCT_CATALOG[item.productId];
          const itemTotal = product.pricePerSqFt * item.quantity;

          return (
            <div
              key={index}
              className="glass-surface rounded-lg p-4 flex gap-4 items-center hover-lift transition-all"
            >
              {/* Product Image Placeholder */}
              <div className="w-20 h-20 rounded-lg bg-gradient-primary flex items-center justify-center text-white/20 font-bold text-2xl shrink-0">
                {product.name.charAt(0)}
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-1">{product.name}</h3>
                <p className="text-caption text-muted-foreground mb-2">
                  {item.color} • ${product.pricePerSqFt}/sq ft
                </p>
                
                {/* Quantity Control */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="10"
                    step="10"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(index, parseInt(e.target.value) || 10)}
                    className="field-input w-24 py-1"
                  />
                  <span className="text-caption">sq ft</span>
                </div>
              </div>

              {/* Price & Remove */}
              <div className="text-right">
                <p className="font-bold text-lg text-gradient-hero mb-2">
                  ${itemTotal.toFixed(2)}
                </p>
                <button
                  onClick={() => onRemoveItem(index)}
                  className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total & Checkout */}
      <div className="border-t border-border pt-6">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-body-lg text-muted-foreground">Subtotal</span>
          <span className="heading-2 text-gradient-hero">${total.toFixed(2)}</span>
        </div>
        
        <p className="text-caption text-muted-foreground mb-4">
          Shipping and taxes calculated at checkout
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={isLoading || items.length === 0}
          className="btn-neon glass-dark rounded-lg px-6 py-4 w-full text-base font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Proceed to Checkout
            </>
          )}
        </button>

        <div className="mt-4 flex items-center justify-center gap-2 text-caption text-muted-foreground">
          <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
            VISA
          </div>
          <div className="w-8 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
            MC
          </div>
          <div className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
            AMEX
          </div>
          <span>Secure checkout powered by Stripe</span>
        </div>
      </div>
    </div>
  );
}

