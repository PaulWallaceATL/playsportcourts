export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

declare global { interface Window { gtag: (...args: any[]) => void } }

export function gtag(...args: any[]) {
  if (!GA_ID) return;
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...(args as [any]));
  }
}

export function track(event: string, params?: Record<string, unknown>) {
  if (!GA_ID) return;
  gtag("event", event, params);
}

// Common conversions
export function trackProductView(data: { slug: string; name: string; price: number }) {
  track("product_view", data);
}

export function trackCustomizer(data: { product: string; primary: string; secondary: string }) {
  track("customizer_change", data);
}

export function trackQuote(data: { product?: string }) {
  track("quote_request_click", data);
}


