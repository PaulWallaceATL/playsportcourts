"use client";

import * as React from "react";
import { ShoppingBag, Search, Filter, TrendingUp, Star, Package, Grid3x3 } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  category: "Court Tiles" | "Garage Tiles" | "Accessories";
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  image: string;
  description: string;
}

const products: Product[] = [
  // Court Tiles
  {
    id: "elite-pro",
    name: "Elite Pro Court Tile",
    price: 5.25,
    category: "Court Tiles",
    rating: 4.9,
    reviews: 127,
    inStock: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
    description: "Premium interlocking tiles for professional courts",
  },
  {
    id: "game-tile",
    name: "Game Tile",
    price: 4.75,
    category: "Court Tiles",
    rating: 4.8,
    reviews: 94,
    inStock: true,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop",
    description: "Versatile tiles for multi-sport applications",
  },
  {
    id: "compete-tile",
    name: "Compete Tile",
    price: 6.99,
    category: "Court Tiles",
    rating: 5.0,
    reviews: 156,
    inStock: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=800&auto=format&fit=crop",
    description: "Tournament-grade performance tiles",
  },
  // Garage Tiles
  {
    id: "ribtrax-pro",
    name: "Ribtrax Pro Garage Tile",
    price: 7.9,
    category: "Garage Tiles",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=800&auto=format&fit=crop",
    description: "Premium garage flooring with drainage",
  },
  {
    id: "vented-grid",
    name: "Vented Grid Tile",
    price: 5.9,
    category: "Garage Tiles",
    rating: 4.7,
    reviews: 88,
    inStock: true,
    image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?q=80&w=800&auto=format&fit=crop",
    description: "Airflow design for wet environments",
  },
  {
    id: "diamond-plate",
    name: "Diamond Plate Tile",
    price: 8.5,
    category: "Garage Tiles",
    rating: 4.8,
    reviews: 145,
    inStock: true,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    description: "Industrial strength with diamond pattern",
  },
  // Accessories
  {
    id: "edge-trim",
    name: "Edge Trim Kit",
    price: 2.5,
    category: "Accessories",
    rating: 4.6,
    reviews: 67,
    inStock: true,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
    description: "Finishing edges for professional look",
  },
  {
    id: "corner-pieces",
    name: "Corner Pieces",
    price: 3.25,
    category: "Accessories",
    rating: 4.7,
    reviews: 52,
    inStock: false,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=800&auto=format&fit=crop",
    description: "Corner transitions and finishing pieces",
  },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All Products");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState<"featured" | "price-low" | "price-high" | "rating">("featured");

  const categories = ["All Products", "Court Tiles", "Garage Tiles", "Accessories"];

  const filteredProducts = products
    .filter((p) => {
      const matchesCategory = selectedCategory === "All Products" || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary" />
        <div className="absolute inset-0 grid-pattern-premium opacity-30" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-[var(--brand-primary)]/15 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-tier-2 mb-6">
              <ShoppingBag className="w-4 h-4 text-[var(--brand-primary)]" />
              <span className="text-sm font-semibold">Premium Products</span>
            </div>

            <h1 className="heading-display text-gradient-hero mb-4">
              Shop Sport Court Tiles
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Browse our complete catalog of premium modular tiles, accessories, and installation supplies. All products backed by industry-leading warranties.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-400" />
                <span className="text-muted-foreground">
                  <span className="font-bold text-white">{products.length}</span> Products
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-muted-foreground">
                  <span className="font-bold text-white">4.8</span> Average Rating
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-muted-foreground">
                  <span className="font-bold text-white">Free</span> Shipping on Orders $500+
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search - Sticky */}
      <section className="sticky top-16 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="input-premium pl-11 h-12"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-gradient-primary text-black shadow-primary"
                      : "glass-tier-1 text-muted-foreground hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="input-premium h-12 min-w-[160px]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-bold text-white">{filteredProducts.length}</span> products
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg glass-tier-1 hover:border-[var(--brand-primary)] transition-all">
              <Grid3x3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card-premium hover:scale-105 transition-all duration-300 overflow-hidden p-0"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden img-overlay-premium">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.featured && (
                    <span className="badge-premium badge-primary text-xs">
                      ⭐ Featured
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="badge-premium badge-warning text-xs">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Quick View */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                  <button className="btn-premium btn-premium-primary text-sm">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Category */}
                <p className="text-xs text-[var(--brand-primary)] font-semibold uppercase tracking-wide mb-2">
                  {product.category}
                </p>

                {/* Name */}
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-2xl font-black text-gradient-hero">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">per sq ft</p>
                  </div>
                  <button
                    disabled={!product.inStock}
                    className="btn-premium btn-premium-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {product.inStock ? "Add to Cart" : "Notify Me"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="card-premium text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="heading-3 mb-2">No products found</h3>
            <p className="text-body text-muted-foreground mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Products");
              }}
              className="btn-premium btn-premium-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Trust Section */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="card-premium border-premium-animated">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-primary/20 mb-4 text-[var(--brand-primary)]">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="font-bold mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">
                On all orders over $500
              </p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-accent/20 mb-4 text-[var(--brand-accent)]">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="font-bold mb-2">15-Year Warranty</h3>
              <p className="text-sm text-muted-foreground">
                Industry-leading coverage
              </p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-secondary/20 mb-4 text-[var(--brand-secondary)]">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="font-bold mb-2">Price Match</h3>
              <p className="text-sm text-muted-foreground">
                Guaranteed best prices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="card-premium border-premium-animated text-center py-12">
          <h2 className="heading-2 text-gradient-hero mb-3">
            Need Help Choosing?
          </h2>
          <p className="text-body text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our experts are here to help you select the perfect tiles for your project. Get personalized recommendations and volume pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="btn-premium btn-premium-primary">
              Contact an Expert
            </a>
            <a href="/dealer-portal" className="btn-premium btn-premium-secondary">
              Dealer Login
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
