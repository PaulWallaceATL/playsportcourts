import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PlaySport Pro",
  description: "Professional portal for browsing products, placing custom orders, and managing your account. Access exclusive pro pricing and court builder tools.",
};

export default function DealerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

