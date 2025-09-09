import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header/Header";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { PageTransition } from "@/components/animations/PageTransition";
import { LiveChat } from "@/components/advanced/LiveChat";

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "PlaySport Atlanta — Premium Residential & Commercial Courts",
  description: "Design, installation, and supply of premium athletic court systems across Greater Atlanta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark theme-premium-dark">
      <body className={`${body.variable} ${display.variable} antialiased`}>
        <ScrollProgress />
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <LiveChat />
      </body>
    </html>
  );
}
