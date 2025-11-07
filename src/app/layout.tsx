import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header/Header";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { PageTransition } from "@/components/animations/PageTransition";
import { TileLoadingAnimation } from "@/components/animations/TileLoadingAnimation";
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
    default: "PlaySport Courts - Premium 12\" × 12\" Modular Court Tiles",
    template: "%s | PlaySport Courts",
  },
  description: "Design and build your dream court with premium 12\" × 12\" modular tiles. Interactive 3D designers, custom colors, and professional installation. 11 colors, 18 sports supported.",
  keywords: ["sport courts", "court tiles", "modular tiles", "basketball courts", "tennis courts", "pickleball courts", "court builder", "3D court designer", "custom court tiles"],
  authors: [{ name: "PlaySport Courts" }],
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://playsportcourts.com",
    siteName: "PlaySport Courts",
    title: "PlaySport Courts - Interactive 3D Court Designer",
    description: "Design your dream court with our interactive 3D tools. Premium 12\" × 12\" modular tiles in 11 colors. Professional installation available.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "PlaySport Courts - Premium Modular Court Tiles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaySport Courts - Interactive 3D Court Designer",
    description: "Design your dream court with premium 12\" × 12\" modular tiles. 11 colors, 18 sports, interactive 3D visualization.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark theme-premium-dark overflow-x-hidden">
      <body className={`${body.variable} ${display.variable} antialiased overflow-x-hidden`}>
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
        <TileLoadingAnimation />
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
