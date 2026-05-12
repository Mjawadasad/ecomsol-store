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
    default: "ECOMSOL - Quality Products, Delivered Worldwide",
    template: "%s | ECOMSOL",
  },
  description:
    "Shop quality handcrafted products across multiple categories at ECOMSOL. Cosplay accessories, faux fur ears, and more — shipped directly to your door.",
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
    title: "ECOMSOL - Quality Products, Delivered Worldwide",
    description:
      "Shop quality handcrafted products at ECOMSOL. Secure checkout and worldwide shipping on every order.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ECOMSOL - Quality Products, Delivered Worldwide",
    description:
      "Shop quality handcrafted products at ECOMSOL. Secure checkout and worldwide shipping on every order.",
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
