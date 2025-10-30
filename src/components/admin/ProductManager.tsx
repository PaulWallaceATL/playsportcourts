"use client";

import * as React from "react";
import { Plus, Edit2, Trash2, Save, X, DollarSign, Package } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  pricePerSqFt: number;
  colors: string[];
  features: string[];
  image?: string;
  stock?: number;
  active: boolean;
}

interface ProductManagerProps {
  products: Product[];
  onSave: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductManager({ products, onSave, onDelete }: ProductManagerProps) {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editForm, setEditForm] = React.useState<Partial<Product>>({});
  const [isCreating, setIsCreating] = React.useState(false);

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setEditForm({
      id: `product-${Date.now()}`,
      name: "",
      description: "",
      pricePerSqFt: 0,
      colors: [],
      features: [],
      active: true,
    });
  };

  const handleSave = () => {
    if (editForm.name && editForm.pricePerSqFt) {
      onSave(editForm as Product);
      setEditingId(null);
      setIsCreating(false);
      setEditForm({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      onDelete(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="heading-2 mb-1">Product Management</h2>
          <p className="text-body text-muted-foreground">
            Manage your product catalog, pricing, and inventory
          </p>
        </div>
        <button
          onClick={startCreate}
          className="btn-neon glass-dark rounded-lg px-4 py-3 text-sm font-semibold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="glass-dark rounded-xl p-6 border-2 border-[var(--brand-primary)]/40">
          <h3 className="heading-3 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Product
          </h3>
          <ProductForm
            product={editForm}
            onChange={setEditForm}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Product Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const isEditing = editingId === product.id;

          if (isEditing) {
            return (
              <div
                key={product.id}
                className="glass-dark rounded-xl p-6 border-2 border-[var(--brand-primary)]/40"
              >
                <h3 className="heading-3 mb-4 flex items-center gap-2">
                  <Edit2 className="w-5 h-5" />
                  Edit Product
                </h3>
                <ProductForm
                  product={editForm}
                  onChange={setEditForm}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </div>
            );
          }

          return (
            <div
              key={product.id}
              className="glass-dark rounded-xl overflow-hidden hover-lift transition-all"
            >
              {/* Product Image Placeholder */}
              <div className="relative aspect-video bg-gradient-primary flex items-center justify-center">
                <Package className="w-16 h-16 text-white/20" />
                {!product.active && (
                  <div className="absolute top-3 left-3">
                    <span className="sport-badge bg-red-500/20 border-red-500/40 text-red-300 border">
                      Inactive
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="heading-3 mb-2">{product.name}</h3>
                <p className="text-caption text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-bold text-gradient-hero">
                    ${product.pricePerSqFt.toFixed(2)}
                  </span>
                  <span className="text-caption">per sq ft</span>
                </div>

                {/* Colors */}
                <div className="mb-3">
                  <p className="text-caption mb-2">{product.colors.length} colors</p>
                  <div className="flex flex-wrap gap-1">
                    {product.colors.slice(0, 6).map((color, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded border border-border"
                        style={{
                          background: `hsl(${(idx * 60) % 360}, 70%, 50%)`,
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {product.features.slice(0, 3).map((feature) => (
                    <span key={feature} className="sport-badge text-xs">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(product)}
                    className="flex-1 glass-surface rounded-lg px-3 py-2 text-sm font-semibold hover-lift transition-all flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="glass-surface rounded-lg px-3 py-2 text-sm font-semibold hover:bg-red-500/10 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {products.length === 0 && !isCreating && (
        <div className="glass-dark rounded-xl p-12 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-body-lg text-muted-foreground mb-2">No products yet</p>
          <p className="text-caption mb-4">Create your first product to get started</p>
          <button
            onClick={startCreate}
            className="btn-neon glass-dark rounded-lg px-4 py-2 text-sm font-semibold"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Product
          </button>
        </div>
      )}
    </div>
  );
}

interface ProductFormProps {
  product: Partial<Product>;
  onChange: (product: Partial<Product>) => void;
  onSave: () => void;
  onCancel: () => void;
}

function ProductForm({ product, onChange, onSave, onCancel }: ProductFormProps) {
  const addColor = () => {
    const newColor = prompt("Enter color name:");
    if (newColor) {
      onChange({ ...product, colors: [...(product.colors || []), newColor] });
    }
  };

  const removeColor = (index: number) => {
    onChange({
      ...product,
      colors: product.colors?.filter((_, i) => i !== index) || [],
    });
  };

  const addFeature = () => {
    const newFeature = prompt("Enter feature:");
    if (newFeature) {
      onChange({ ...product, features: [...(product.features || []), newFeature] });
    }
  };

  const removeFeature = (index: number) => {
    onChange({
      ...product,
      features: product.features?.filter((_, i) => i !== index) || [],
    });
  };

  return (
    <div className="space-y-4">
      {/* Name */}
      <div>
        <label className="text-caption block mb-2">Product Name *</label>
        <input
          type="text"
          value={product.name || ""}
          onChange={(e) => onChange({ ...product, name: e.target.value })}
          className="field-input w-full"
          placeholder="Game Tile"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-caption block mb-2">Description *</label>
        <textarea
          value={product.description || ""}
          onChange={(e) => onChange({ ...product, description: e.target.value })}
          className="field-input w-full"
          rows={3}
          placeholder="Premium interlocking tiles for multi-sport courts"
        />
      </div>

      {/* Price */}
      <div>
        <label className="text-caption block mb-2">Price per Sq Ft *</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="number"
            step="0.01"
            min="0"
            value={product.pricePerSqFt || 0}
            onChange={(e) =>
              onChange({ ...product, pricePerSqFt: parseFloat(e.target.value) || 0 })
            }
            className="field-input w-full pl-11"
            placeholder="8.99"
          />
        </div>
      </div>

      {/* Colors */}
      <div>
        <label className="text-caption block mb-2">Colors</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {product.colors?.map((color, idx) => (
            <span
              key={idx}
              className="sport-badge flex items-center gap-1 cursor-pointer hover:bg-red-500/20"
              onClick={() => removeColor(idx)}
            >
              {color}
              <X className="w-3 h-3" />
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={addColor}
          className="glass-surface rounded px-3 py-1 text-xs"
        >
          + Add Color
        </button>
      </div>

      {/* Features */}
      <div>
        <label className="text-caption block mb-2">Features</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {product.features?.map((feature, idx) => (
            <span
              key={idx}
              className="sport-badge flex items-center gap-1 cursor-pointer hover:bg-red-500/20"
              onClick={() => removeFeature(idx)}
            >
              {feature}
              <X className="w-3 h-3" />
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={addFeature}
          className="glass-surface rounded px-3 py-1 text-xs"
        >
          + Add Feature
        </button>
      </div>

      {/* Active Status */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="active"
          checked={product.active ?? true}
          onChange={(e) => onChange({ ...product, active: e.target.checked })}
          className="w-4 h-4 rounded"
        />
        <label htmlFor="active" className="text-sm">
          Active (visible to dealers)
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <button
          onClick={onSave}
          className="flex-1 btn-neon glass-dark rounded-lg px-4 py-2 text-sm font-semibold flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Product
        </button>
        <button
          onClick={onCancel}
          className="glass-surface rounded-lg px-4 py-2 text-sm font-semibold hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

