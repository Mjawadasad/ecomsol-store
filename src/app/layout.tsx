import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { organizationSchema } from "@/lib/schemas";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ECOMSOL - Quality Products from Trusted Marketplaces",
    template: "%s | ECOMSOL",
  },
  description:
    "Browse our curated catalog of quality products across multiple categories. Shop with confidence through trusted marketplaces like Etsy and Amazon.",
  keywords: [
    "online store",
    "e-commerce",
    "cosplay accessories",
    "faux fur ears",
    "handmade accessories",
    "costume accessories",
    "animal ears headband",
  ],
  authors: [{ name: "ECOMSOL" }],
  creator: "ECOMSOL",
  metadataBase: new URL("https://ecomsol.store"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ECOMSOL",
    title: "ECOMSOL - Quality Products from Trusted Marketplaces",
    description:
      "Browse our curated catalog of quality products. Shop with confidence through trusted marketplaces.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ECOMSOL - Quality Products from Trusted Marketplaces",
    description:
      "Browse our curated catalog of quality products. Shop with confidence through trusted marketplaces.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
