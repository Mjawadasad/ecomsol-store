import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { organizationSchema } from "@/lib/schemas";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EcomSol Store - Handcrafted Cosplay Ears, Tails & Sets",
    template: "%s | EcomSol Store",
  },
  description:
    "Handcrafted cosplay accessories - premium faux fur animal ears, tails, and sets. Original designs, convention-ready quality. Cat ears, bunny ears, fox ears and more.",
  keywords: [
    "cosplay ears",
    "cat ears headband",
    "bunny ears cosplay",
    "fox ears and tail",
    "anime cosplay accessories",
    "convention accessories",
    "faux fur ears",
    "therian ears",
    "cosplay costume",
    "animal ears headband",
  ],
  authors: [{ name: "EcomSol Store" }],
  creator: "EcomSol Store",
  metadataBase: new URL("https://ecomsol.store"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "EcomSol Store",
    title: "EcomSol Store - Handcrafted Cosplay Ears, Tails & Sets",
    description:
      "Handcrafted cosplay accessories - premium faux fur animal ears, tails, and sets. Original designs, convention-ready quality.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcomSol Store - Handcrafted Cosplay Ears, Tails & Sets",
    description:
      "Handcrafted cosplay accessories - premium faux fur animal ears, tails, and sets.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
