import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dealer Portal",
  description: "Secure dealer portal for browsing products, placing orders, and managing your account. Access exclusive dealer pricing and resources.",
};

export default function DealerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

