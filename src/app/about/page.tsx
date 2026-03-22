import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Palette, Award } from "lucide-react";
import { breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "EcomSol Store creates original handcrafted cosplay accessories. Learn about our designs, materials, and what drives us to make convention-ready ears, tails, and sets.",
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
        <h1 className="text-3xl sm:text-4xl font-bold font-sans mb-8">About EcomSol Store</h1>

        {/* Story */}
        <div className="prose-like space-y-6 text-foreground-muted leading-relaxed">
          <p className="text-lg">
            We make cosplay accessories that actually hold up at cons. That&apos;s it. That&apos;s the whole thing.
          </p>
          <p>
            Every pair of ears, every tail, every set we sell is an original design. We work directly with skilled craftspeople to bring our designs to life using premium faux fur and quality materials. No mass-produced costume shop stuff - these are made for people who care about their look.
          </p>
          <p>
            We know what it&apos;s like to spend hours on a cosplay only to have the accessories fall apart halfway through day one of a convention. That&apos;s why durability matters as much as aesthetics to us. Our headbands stay put. Our tails don&apos;t slip. Our ears keep their shape through photo ops, panels, and yes, even dance battles.
          </p>
          <p>
            Whether you&apos;re building a specific character, putting together a therian look, or just need the perfect finishing touch for a festival fit, we&apos;ve got something that&apos;ll work. And if you&apos;re buying a gift for someone who&apos;s into this stuff, you really can&apos;t go wrong with a good pair of ears.
          </p>
        </div>

        {/* Values */}
        <div className="mt-14 grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: Palette,
              title: "Original Designs",
              text: "Every product starts as our own design. We create unique colorways, textures, and styles you won't find from other sellers.",
            },
            {
              icon: Heart,
              title: "Cruelty-Free",
              text: "100% synthetic materials in everything we make. Premium faux fur that looks and feels incredible without any animal products.",
            },
            {
              icon: Award,
              title: "Con-Tested Quality",
              text: "Built to survive full convention days. Lightweight, durable, and designed to photograph beautifully under any lighting.",
            },
          ].map((v) => (
            <div key={v.title} className="rounded-xl border border-border bg-background-card p-6">
              <v.icon className="h-8 w-8 text-accent mb-3" />
              <h2 className="text-base font-semibold font-sans mb-2">{v.title}</h2>
              <p className="text-sm text-foreground-muted leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold font-sans mb-6">How It Works</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Browse here", desc: "Explore our full collection right on this site. Check out photos, details, and find what fits your vibe." },
              { step: "2", title: "Buy on Etsy", desc: "When you're ready, the \"Buy on Etsy\" button takes you to our Etsy shop for secure checkout with full buyer protection." },
              { step: "3", title: "We ship it", desc: "Orders ship within 3-5 business days. International shipping available worldwide." },
              { step: "4", title: "Hit the con floor", desc: "Show up with accessories that actually look good. Get compliments. Win best cosplay. The usual." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 items-start">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white font-sans">
                  {s.step}
                </span>
                <div>
                  <h3 className="text-sm font-semibold font-sans">{s.title}</h3>
                  <p className="text-sm text-foreground-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 to-background-card p-8 text-center">
          <Sparkles className="h-8 w-8 text-accent mx-auto mb-3" />
          <h2 className="text-xl font-bold font-sans">Ready to Level Up Your Look?</h2>
          <p className="mt-2 text-foreground-muted text-sm">
            Check out the full collection and find your next con accessory.
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-semibold text-white hover:bg-cta-hover transition-colors"
          >
            Browse All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
