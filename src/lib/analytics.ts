export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

type GtagFunction = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag: GtagFunction;
  }
}

export function gtag(...args: unknown[]): void {
  if (!GA_ID) return;
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

export function track(event: string, params?: Record<string, unknown>): void {
  if (!GA_ID) return;
  gtag("event", event, params);
}

// Common conversions
export function trackProductView(data: { slug: string; name: string; price: number }): void {
  track("product_view", data);
}

export function trackCustomizer(data: { product: string; primary: string; secondary: string }): void {
  track("customizer_change", data);
}

export function trackQuote(data: { product?: string }): void {
  track("quote_request_click", data);
}


