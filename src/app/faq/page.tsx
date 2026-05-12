import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { breadcrumbSchema, faqSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description:
    "Common questions about ECOMSOL — ordering, shipping, products, care instructions, returns, and more.",
};

const faqs = [
  {
    category: "Ordering",
    items: [
      {
        question: "How do I buy products from ECOMSOL?",
        answer:
          "Browse products here on ecomsol.store, add items to your cart, and checkout securely. We handle fulfillment and ship directly to you.",
      },
      {
        question: "Do you accept custom orders?",
        answer:
          "We offer custom options on select products. Check the product page for available customizations or contact us directly to discuss your needs.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major payment methods including credit/debit cards, PayPal, Apple Pay, Google Pay, and more.",
      },
    ],
  },
  {
    category: "Products",
    items: [
      {
        question: "What materials are your faux fur products made from?",
        answer:
          "We use premium faux fur, metal headbands, flexible wire cores (for poseable ears), and adjustable belt straps (for tails). All materials are 100% synthetic and cruelty-free.",
      },
      {
        question: "What size are the headbands?",
        answer:
          "Our headbands are one size fits most adults and work great over wigs too. They are designed to be comfortable for all-day wear at conventions.",
      },
      {
        question: "Are the ears heavy?",
        answer:
          "No. Our ears are designed to be lightweight specifically for long convention days. You will forget you are wearing them.",
      },
      {
        question: "How do poseable ears work?",
        answer:
          "Poseable ears have a flexible wire core inside each ear. You can bend them into any position - upright, floppy, asymmetric - and they will hold that shape.",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Orders typically ship within 3-5 business days. Domestic delivery is usually 5-10 business days, and international shipping varies by location but usually arrives within 2-4 weeks.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes! We ship worldwide. International shipping is available to most countries.",
      },
      {
        question: "How will my order be packaged?",
        answer:
          "Each item is carefully packaged to protect it during shipping. Products are packed to maintain their shape and prevent damage during transit.",
      },
    ],
  },
  {
    category: "Care & Maintenance",
    items: [
      {
        question: "How do I clean faux fur products?",
        answer:
          "Spot clean only with a damp cloth. Do not machine wash or submerge in water. You can gently brush faux fur or use a hair dryer on low/cool setting to restore fluffiness.",
      },
      {
        question: "How should I store my accessories?",
        answer:
          "Store flat in a cool, dry place. For poseable ears, reshape the wire before storing. Avoid crushing or folding, and keep away from direct heat or sunlight.",
      },
    ],
  },
  {
    category: "Returns & Issues",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We offer hassle-free returns and exchanges. If you have any issues with your order, contact us and we will make it right.",
      },
      {
        question: "My order arrived damaged. What do I do?",
        answer:
          "Contact us immediately with photos of the damage. We will arrange a replacement or refund as quickly as possible.",
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
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-fg-secondary mb-10">
          Everything you need to know about our products, ordering, and
          shipping.
        </p>

        {faqs.map((category) => (
          <div key={category.category} className="mb-10">
            <h2 className="text-xl font-bold mb-4 text-primary">
              {category.category}
            </h2>
            <div className="space-y-4">
              {category.items.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border p-5"
                >
                  <h3 className="text-sm font-semibold mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-fg-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-10 rounded-2xl bg-primary p-8 text-center text-white">
          <h2 className="text-xl font-bold">Still Have Questions?</h2>
          <p className="mt-2 text-white/80 text-sm">
            Drop us a message and we&apos;ll get back to you.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:hello@ecomsol.store"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-white/90 transition-colors"
            >
              Email Us
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Browse Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
