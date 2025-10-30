import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header/Header";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { PageTransition } from "@/components/animations/PageTransition";
import { LiveChat } from "@/components/advanced/LiveChat";
import { GA_ID } from "@/lib/analytics";
import { Footer } from "@/components/layout/footer/Footer";

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
  title: {
    default: "PlaySport Courts",
    template: "%s | PlaySport Courts",
  },
  description: "Premium modular sport court tiles and flooring solutions. Professional installation, custom designs, and superior quality for residential and commercial applications.",
  keywords: ["sport courts", "court tiles", "athletic flooring", "modular tiles", "basketball courts", "tennis courts", "pickleball courts", "game tiles"],
  authors: [{ name: "PlaySport Courts" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PlaySport Courts",
    title: "PlaySport Courts - Premium Sport Court Tiles",
    description: "Premium modular sport court tiles and flooring solutions for residential and commercial applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaySport Courts - Premium Sport Court Tiles",
    description: "Premium modular sport court tiles and flooring solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark theme-premium-dark">
      <body className={`${body.variable} ${display.variable} antialiased`}>
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_ID}', { anonymize_ip: true });`,
              }}
            />
          </>
        )}
        <ScrollProgress />
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <LiveChat />
      </body>
    </html>
  );
}
