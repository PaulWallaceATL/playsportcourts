import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "View our portfolio of completed sport court installations. Browse basketball courts, tennis courts, multi-sport facilities, and more.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

