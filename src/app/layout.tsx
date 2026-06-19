import type { Metadata, Viewport } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const title = `${siteConfig.name} | ${siteConfig.nameEn}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: title,
    template: `%s | ${siteConfig.nameEn}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.nameEn,
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: siteConfig.siteUrl,
    siteName: siteConfig.nameEn,
    title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.nameEn,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#065f46",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-stone-800">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
