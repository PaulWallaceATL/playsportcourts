import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header/Header";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { PageTransition } from "@/components/animations/PageTransition";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
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
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ScrollProgress />
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
