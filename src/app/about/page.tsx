import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Palette, Award, Globe } from "lucide-react";
import { breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ECOMSOL is a multi-category e-commerce platform curating quality products from trusted marketplaces. Learn about our mission and vision.",
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "About", url: "/about" },
            ])
          ),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">About ECOMSOL</h1>

        <div className="space-y-6 text-fg-secondary leading-relaxed">
          <p className="text-lg">
            ECOMSOL is a multi-category e-commerce platform that curates
            quality products and connects you with trusted marketplaces for
            secure purchasing.
          </p>
          <p>
            We believe shopping online should be simple and trustworthy. We
            carefully select products across different categories, provide
            detailed information and images, and then connect you to
            established marketplaces like Etsy where you can buy with full
            buyer protection.
          </p>
          <p>
            Our first category is handcrafted faux fur accessories - cosplay
            ears, tails, costume sets, and more. Every product in this
            collection is an original design, made with premium materials by
            skilled artisans. But this is just the beginning.
          </p>
          <p>
            We&apos;re building ECOMSOL to grow into a multi-category
            destination where you can discover quality products across many
            different verticals - from home goods to fashion accessories to
            tech gadgets. Our mission is to be the catalog you trust, backed
            by marketplaces you already know.
          </p>
        </div>

        {/* Values */}
        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {[
            {
              icon: Palette,
              title: "Curated Quality",
              text: "We don't list everything - we select products that meet our standards for quality, design, and value.",
            },
            {
              icon: Heart,
              title: "Ethical Sourcing",
              text: "We prioritize cruelty-free materials and work with artisans who care about their craft.",
            },
            {
              icon: Award,
              title: "Marketplace Trust",
              text: "Every purchase goes through established marketplaces with buyer protection - never through unverified channels.",
            },
            {
              icon: Globe,
              title: "Multi-Category Vision",
              text: "Starting with faux fur accessories, expanding to many more product categories over time.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-border p-6"
            >
              <v.icon className="h-8 w-8 text-primary mb-3" />
              <h2 className="text-base font-semibold mb-2">{v.title}</h2>
              <p className="text-sm text-fg-secondary leading-relaxed">
                {v.text}
              </p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Browse our catalog",
                desc: "Explore products right here on ecomsol.store. Check out photos, details, and specifications.",
              },
              {
                step: "2",
                title: "Choose your marketplace",
                desc: "Each product links to a trusted marketplace (Etsy, Amazon, etc.) where you can make your purchase securely.",
              },
              {
                step: "3",
                title: "Buy with confidence",
                desc: "Checkout through the marketplace with their full buyer protection, secure payments, and customer support.",
              },
              {
                step: "4",
                title: "Enjoy your purchase",
                desc: "Your order ships directly from the seller. We're here to help if you need anything.",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 items-start">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {s.step}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{s.title}</h3>
                  <p className="text-sm text-fg-secondary">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-primary p-8 text-center text-white">
          <h2 className="text-xl font-bold">Ready to Explore?</h2>
          <p className="mt-2 text-white/80 text-sm">
            Check out our catalog and find something you love.
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-white/90 transition-colors"
          >
            Browse All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
