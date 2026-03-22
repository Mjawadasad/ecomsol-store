import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { breadcrumbSchema, faqSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description:
    "Common questions about EcomSol Store cosplay accessories - ordering, shipping, sizing, care instructions, returns, and more.",
};

const faqs = [
  {
    category: "Ordering",
    items: [
      {
        question: "How do I buy products from EcomSol Store?",
        answer:
          "All purchases are made through our Etsy shop. Browse products here on ecomsol.store, then click the \"Buy on Etsy\" button on any product page. You'll be taken to our Etsy listing where you can securely checkout with Etsy's buyer protection.",
      },
      {
        question: "Do you accept custom orders?",
        answer:
          "We're not currently taking custom orders, but we regularly release new designs. Follow our Etsy shop to get notified when new products drop.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "Since all purchases go through Etsy, you can use any payment method Etsy accepts - credit/debit cards, PayPal, Apple Pay, Google Pay, Etsy gift cards, and more.",
      },
    ],
  },
  {
    category: "Products",
    items: [
      {
        question: "What materials are your products made from?",
        answer:
          "We use premium faux fur, metal headbands, flexible wire cores (for poseable ears), and adjustable belt straps (for tails). All materials are 100% synthetic and cruelty-free.",
      },
      {
        question: "What size are the headbands?",
        answer:
          "Our headbands are one size fits most adults and work great over wigs too. They're designed to be comfortable for all-day wear at conventions.",
      },
      {
        question: "Are the ears heavy? Will they give me a headache?",
        answer:
          "Nope! Our ears are designed to be super lightweight specifically for long convention days. You'll forget you're wearing them - until someone compliments you.",
      },
      {
        question: "How do poseable ears work?",
        answer:
          "Poseable ears have a flexible wire core inside each ear. You can bend them into any position - upright, floppy, asymmetric - and they'll hold that shape until you change it.",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "We ship within 3-5 business days of your order. Domestic delivery is typically 5-10 business days, and international shipping varies by location but usually arrives within 2-4 weeks.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes! We ship worldwide. International shipping is available to most countries through our Etsy shop.",
      },
      {
        question: "How will my order be packaged?",
        answer:
          "Each item is carefully packaged to protect it during shipping. Ears are packed to maintain their shape, and tails are wrapped to prevent any damage to the fur.",
      },
    ],
  },
  {
    category: "Care & Maintenance",
    items: [
      {
        question: "How do I clean my ears/tail?",
        answer:
          "Spot clean only with a damp cloth. Do not machine wash or submerge in water. For faux fur, you can gently brush it or use a hair dryer on low/cool setting to restore fluffiness.",
      },
      {
        question: "How should I store my accessories?",
        answer:
          "Store flat in a cool, dry place. For poseable ears, reshape the wire before storing. Avoid crushing or folding, and keep away from direct heat or sunlight.",
      },
      {
        question: "The fur looks flat after wearing. How do I fix it?",
        answer:
          "Gently brush the fur with a soft comb or use a hair dryer on low/cool to refluff. This is totally normal after a long con day - they bounce right back.",
      },
    ],
  },
  {
    category: "Returns & Issues",
    items: [
      {
        question: "What's your return policy?",
        answer:
          "Returns and exchanges are handled through Etsy's policies. If you have any issues with your order, reach out through Etsy messages and we'll work with you to make it right.",
      },
      {
        question: "My order arrived damaged. What do I do?",
        answer:
          "Contact us immediately through Etsy messages with photos of the damage. We take packaging seriously, but if something gets damaged in transit, we'll sort it out.",
      },
    ],
  },
];

const allFaqItems = faqs.flatMap((cat) => cat.items);

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "FAQ", url: "/faq" },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(allFaqItems)),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-sans mb-3">Frequently Asked Questions</h1>
        <p className="text-foreground-muted mb-10">
          Everything you need to know about our cosplay accessories, ordering, and shipping.
        </p>

        {faqs.map((category) => (
          <div key={category.category} className="mb-10">
            <h2 className="text-xl font-bold font-sans mb-4 text-accent">{category.category}</h2>
            <div className="space-y-4">
              {category.items.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border bg-background-card p-5">
                  <h3 className="text-sm font-semibold font-sans mb-2">{faq.question}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Still have questions */}
        <div className="mt-10 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 to-background-card p-8 text-center">
          <h2 className="text-xl font-bold font-sans">Still Have Questions?</h2>
          <p className="mt-2 text-foreground-muted text-sm">
            Reach out through our Etsy shop and we&apos;ll get back to you as soon as we can.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://www.etsy.com/shop/ecomsolstore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cta px-5 py-2.5 text-sm font-semibold text-white hover:bg-cta-hover transition-colors"
            >
              Contact on Etsy
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-accent hover:text-accent transition-colors"
            >
              Browse Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
