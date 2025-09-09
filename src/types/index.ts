export interface SportCourt {
  id: string
  name: string
  description: string
  image: string
  features: string[]
  category: 'residential' | 'commercial'
}

export interface Benefit {
  id: string
  title: string
  description: string
  icon: string
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  projectType: string
  message: string
}

export interface QuoteRequest extends ContactForm {
  courtType: string
  dimensions: string
  location: string
  timeline: string
}

// Product models for tiles
export type TileProductKind = 'court' | 'garage'

export interface TileColorOption {
  name: string
  hex: string
}

export interface TileSpec {
  material: string
  dimensions: string
  thickness?: string
  weight?: string
  features: string[]
}

export interface TileProduct {
  kind: TileProductKind
  slug: string
  name: string
  brand?: string
  heroImage: string
  thumbnail: string
  description: string
  specs: TileSpec
  bestFor: string[]
  compatibleSports: string[]
  colors: TileColorOption[]
  pricePerUnitLabel: string // e.g., "$/sq ft" or "$ per tile"
  price: number
  gallery: string[]
}
