import Stripe from "stripe";

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-01-27.acacia",
  typescript: true,
});

// Product catalog with pricing
export const PRODUCT_CATALOG = {
  "game-tile": {
    id: "game-tile",
    name: "Game Tile",
    description: "Premium interlocking tiles for multi-sport courts",
    pricePerSqFt: 8.99,
    colors: ["Royal Blue", "Court Red", "Forest Green", "Jet Black", "Arctic White", "Solar Orange"],
    features: ["UV Resistant", "10-Year Warranty", "Quick Install"],
    image: "/tiles/game-tile.jpg",
  },
  "speed-outdoor": {
    id: "speed-outdoor",
    name: "Speed Outdoor Tile",
    description: "Weather-resistant performance tiles for outdoor courts",
    pricePerSqFt: 10.99,
    colors: ["Ocean Blue", "Crimson Red", "Slate Gray", "Neon Green", "Amber Orange", "Midnight Black"],
    features: ["All-Weather", "Drainage System", "15-Year Warranty"],
    image: "/tiles/speed-outdoor.jpg",
  },
  "compete-tile": {
    id: "compete-tile",
    name: "Compete Tile",
    description: "Professional-grade tiles for competitive play",
    pricePerSqFt: 12.99,
    colors: ["Championship Blue", "Pro Red", "Graphite", "Lime Green", "Tangerine", "Pure White"],
    features: ["Tournament Grade", "Anti-Slip", "20-Year Warranty"],
    image: "/tiles/compete-tile.jpg",
  },
  "active-tile": {
    id: "active-tile",
    name: "Active Tile",
    description: "Versatile tiles for gyms and multi-purpose spaces",
    pricePerSqFt: 7.99,
    colors: ["Sky Blue", "Ruby Red", "Charcoal", "Mint Green", "Coral Orange", "Ivory"],
    features: ["Impact Resistant", "Easy Clean", "10-Year Warranty"],
    image: "/tiles/active-tile.jpg",
  },
  "boost-tile": {
    id: "boost-tile",
    name: "Boost Tile",
    description: "Energy-return tiles for high-performance training",
    pricePerSqFt: 11.99,
    colors: ["Electric Blue", "Fire Red", "Titanium", "Neon Yellow", "Sunset Orange", "Onyx"],
    features: ["Shock Absorption", "Energy Return", "12-Year Warranty"],
    image: "/tiles/boost-tile.jpg",
  },
  "pro-tile": {
    id: "pro-tile",
    name: "Pro Tile",
    description: "Elite tiles for professional installations",
    pricePerSqFt: 14.99,
    colors: ["Deep Blue", "Cardinal Red", "Carbon Fiber", "Emerald Green", "Copper Orange", "Platinum"],
    features: ["Premium Grade", "Custom Logos", "25-Year Warranty"],
    image: "/tiles/pro-tile.jpg",
  },
} as const;

export type ProductId = keyof typeof PRODUCT_CATALOG;

export interface CartItem {
  productId: ProductId;
  color: string;
  quantity: number; // square feet
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const product = PRODUCT_CATALOG[item.productId];
    return total + (product.pricePerSqFt * item.quantity);
  }, 0);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

