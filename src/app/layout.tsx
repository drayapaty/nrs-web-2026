import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "H.H. Niranjana Swami — Official Website",
  description:
    "Lectures, kirtans, blog posts, and spiritual guidance from His Holiness Niranjana Swami, a senior disciple of Srila Prabhupada and ISKCON spiritual leader.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-cream-50">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-ink-950 focus:text-cream-50 focus:text-sm focus:rounded"
        >
          Skip to content
        </a>
        <Providers>
          <div id="main-content">{children}</div>
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
