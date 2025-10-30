import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop premium sport court tiles, garage tiles, and accessories. Browse our complete product catalog with secure online ordering.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

