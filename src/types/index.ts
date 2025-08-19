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
