/**
 * Build Catalog — Parses Etsy listing data and generates TypeScript data files.
 *
 * Usage: node scripts/build-catalog.mjs
 *
 * Reads from: E:\Etsy\Data\listings\*.json
 * Cross-refs:  E:\Etsy\Analytics\image-backups\2026-04-11-critical-alt-text\
 * Outputs:     src/data/categories/faux-fur-accessories.ts
 * Copies:      images to public/images/products/{slug}/
 */

import fs from "fs";
import path from "path";

const LISTINGS_DIR = "E:/Etsy/Data/listings";
const ALT_TEXT_DIR = "E:/Etsy/Analytics/image-backups/2026-04-11-critical-alt-text";
const OUTPUT_DATA = "src/data/categories/faux-fur-accessories.ts";
const OUTPUT_IMAGES = "public/images/products";

// ── Subcategory definitions ──────────────────────────────────────────
const SUBCATEGORIES = [
  {
    slug: "ears",
    name: "Ears",
    description: "Animal ear headbands — cat, fox, wolf, and bunny styles in premium faux fur.",
  },
  {
    slug: "ears-tail-sets",
    name: "Ears & Tail Sets",
    description: "Matching ear headband and tail bundles for a complete animal look.",
  },
  {
    slug: "costume-sets",
    name: "Costume Sets",
    description: "Multi-piece costume accessories including ears, paws, masks, and tails.",
  },
  {
    slug: "paws-gloves",
    name: "Paws & Gloves",
    description: "Furry handpaws and gloves with claws for cosplay and fursuit builds.",
  },
  {
    slug: "tails",
    name: "Tails",
    description: "Individual tail attachments in various animal styles.",
  },
  {
    slug: "masks",
    name: "Masks",
    description: "Animal face masks for costumes and cosplay.",
  },
];

// ── Helper functions ─────────────────────────────────────────────────

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 80);
}

function classifySubcategory(listing) {
  const title = listing.title.toLowerCase();
  const sectionId = listing.shop_section_id;

  // Standalone paws/handpaws
  if (sectionId === 56884511) return "paws-gloves";
  if (title.includes("handpaw") || (title.includes("paws") && !title.includes("ears") && !title.includes("mask"))) {
    return "paws-gloves";
  }

  // Costume sets: have paws AND/OR mask in title
  if ((title.includes("paws") || title.includes("mask")) && (title.includes("set") || title.includes("ears"))) {
    return "costume-sets";
  }

  // Ears + tail sets
  if (title.includes("and tail") || title.includes("& tail") || title.includes("headband and tail")) {
    return "ears-tail-sets";
  }

  // Default: ears
  return "ears";
}

function extractShortName(title) {
  // Remove common suffixes
  return title
    .replace(/:\s*Cosplay.*$/i, "")
    .replace(/:\s*Handmade.*$/i, "")
    .replace(/\s*-\s*Cosplay.*$/i, "")
    .replace(/\s*–\s*Cosplay.*$/i, "")
    .replace(/\s*Cosplay\s*(Furry\s*)?Headband.*$/i, "")
    .replace(/\s*Cosplay\s*Costume\s*Accessory.*$/i, "")
    .replace(/\s*Cosplay\s*Costume\s*Accessories.*$/i, "")
    .replace(/\s*Cosplay\s*Costume.*$/i, "")
    .replace(/\s*Cosplay\s*Halloween.*$/i, "")
    .replace(/,\s*Gothic\s*Anime.*$/i, "")
    .replace(/,\s*Kawaii\s*Anime.*$/i, "")
    .replace(/,\s*Cosplay\s*Kitten.*$/i, "")
    .trim();
}

function extractShortDescription(description) {
  // Get first meaningful sentence from the description
  const lines = description.split("\n").filter((l) => l.trim().length > 0);
  for (const line of lines) {
    const clean = line.replace(/[🐺🐱🦊✨📐⭐🎃🎀💀🐾]/g, "").trim();
    if (clean.length > 20 && clean.length < 200 && !clean.startsWith("http")) {
      return clean;
    }
  }
  return description.substring(0, 150).trim() + "...";
}

function extractFeatures(description) {
  const features = [];
  const lines = description.split("\n");
  let inFeatures = false;

  for (const line of lines) {
    const clean = line.replace(/[✨⭐📐🐺🐱🦊🎃🎀💀🐾]/g, "").trim();
    if (clean.toLowerCase().includes("features") || clean.toLowerCase().includes("what you get")) {
      inFeatures = true;
      continue;
    }
    if (inFeatures && clean.length > 5 && clean.length < 100) {
      features.push(clean);
      if (features.length >= 6) break;
    }
    if (inFeatures && clean === "") {
      if (features.length > 0) break;
    }
  }

  if (features.length === 0) {
    return ["Handcrafted with premium faux fur", "Comfortable lightweight design", "Perfect for cosplay and conventions"];
  }
  return features;
}

function extractColors(listing) {
  const title = listing.title;
  const colors = new Set();

  const colorMap = [
    "black", "white", "grey", "gray", "brown", "orange", "red", "blue",
    "green", "purple", "yellow", "pink", "neon", "turquoise", "maroon",
    "peach", "cream", "chocolate", "camel", "rust", "royal blue",
    "sky blue", "deep rose", "lime", "teal", "aquamarine",
  ];

  const titleLower = title.toLowerCase();
  for (const color of colorMap) {
    if (titleLower.includes(color)) {
      colors.add(color.charAt(0).toUpperCase() + color.slice(1));
    }
  }

  // Check inventory for color variations
  if (listing.inventory?.products) {
    for (const product of listing.inventory.products) {
      if (product.property_values) {
        for (const pv of product.property_values) {
          if (pv.property_name === "Color" && pv.values) {
            pv.values.forEach((v) => colors.add(v));
          }
        }
      }
    }
  }

  return [...colors].slice(0, 6);
}

function extractVariations(listing) {
  if (!listing.has_variations || !listing.inventory?.products) return undefined;

  const variations = [];
  for (const product of listing.inventory.products) {
    if (product.property_values?.length > 0 && product.offerings?.length > 0) {
      const name = product.property_values
        .map((pv) => pv.values?.join(", "))
        .filter(Boolean)
        .join(" - ");
      const price = product.offerings[0]?.price?.amount / product.offerings[0]?.price?.divisor;
      if (name && price) {
        variations.push({ name, price });
      }
    }
  }

  return variations.length > 1 ? variations : undefined;
}

function formatDate(timestamp) {
  return new Date(timestamp * 1000).toISOString().split("T")[0];
}

// ── Main ─────────────────────────────────────────────────────────────

console.log("📦 Building catalog from Etsy data...\n");

// 1. Read all listing JSON files
const files = fs.readdirSync(LISTINGS_DIR).filter((f) => f.endsWith(".json"));
console.log(`Found ${files.length} listing files`);

const allListings = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(LISTINGS_DIR, file), "utf8");
  const data = JSON.parse(raw);
  if (data.listing) {
    allListings.push(data);
  }
}

// 2. Filter active listings (exclude special orders)
const activeListings = allListings.filter((d) => {
  const l = d.listing;
  if (l.state !== "active") return false;
  const titleLower = l.title.toLowerCase();
  if (titleLower.includes("reshipping") || titleLower.includes("replacement order")) return false;
  return true;
});

console.log(`Active listings: ${activeListings.length}`);

// 3. Load alt text data
const altTextMap = new Map();
if (fs.existsSync(ALT_TEXT_DIR)) {
  const altDirs = fs.readdirSync(ALT_TEXT_DIR).filter((d) => /^\d+$/.test(d));
  for (const dir of altDirs) {
    const altFile = path.join(ALT_TEXT_DIR, dir, "alt_text_approved.json");
    if (fs.existsSync(altFile)) {
      const data = JSON.parse(fs.readFileSync(altFile, "utf8"));
      altTextMap.set(parseInt(dir), data);
    }
  }
  console.log(`Loaded alt text for ${altTextMap.size} listings`);
}

// 4. Ensure output directories exist
fs.mkdirSync(path.dirname(OUTPUT_DATA), { recursive: true });
fs.mkdirSync(OUTPUT_IMAGES, { recursive: true });

// 5. Process each listing
const products = [];
const slugCounts = new Map();

for (const data of activeListings) {
  const listing = data.listing;
  const listingId = listing.listing_id;
  const subcategory = classifySubcategory(listing);

  // Generate unique slug
  let slug = generateSlug(listing.title);
  if (slugCounts.has(slug)) {
    const count = slugCounts.get(slug) + 1;
    slugCounts.set(slug, count);
    slug = `${slug}-${count}`;
  } else {
    slugCounts.set(slug, 1);
  }

  // Get price
  const price = listing.price.amount / listing.price.divisor;

  // Get images
  const images = [];
  const altData = altTextMap.get(listingId);
  const backupDir = path.join(ALT_TEXT_DIR, listingId.toString());
  const hasLocalImages = fs.existsSync(backupDir);

  // Copy local images if available
  const productImageDir = path.join(OUTPUT_IMAGES, slug);
  if (hasLocalImages) {
    fs.mkdirSync(productImageDir, { recursive: true });
  }

  const listingImages = listing.images || [];
  const maxImages = 5; // rank 1-5

  for (let i = 0; i < Math.min(listingImages.length, maxImages); i++) {
    const img = listingImages[i];
    const rank = img.rank || i + 1;

    // Find alt text
    let altText = img.alt_text || "";
    if (altData?.alt_texts) {
      const altEntry = altData.alt_texts.find((a) => a.rank === rank || a.listing_image_id === img.listing_image_id);
      if (altEntry) altText = altEntry.text;
    }
    if (!altText) {
      altText = `${listing.title} - Image ${rank}`;
    }

    // Check for local image file
    let src = "";
    if (hasLocalImages) {
      // Find the image file in backup dir
      const backupFiles = fs.readdirSync(backupDir);
      const imageFile = backupFiles.find(
        (f) => f.startsWith(`rank${rank}_`) && f.endsWith(".jpg")
      );
      if (imageFile) {
        const destFile = `image-${rank}.jpg`;
        const srcPath = path.join(backupDir, imageFile);
        const destPath = path.join(productImageDir, destFile);
        try {
          fs.copyFileSync(srcPath, destPath);
          src = `/images/products/${slug}/${destFile}`;
        } catch (e) {
          console.warn(`  Warning: Could not copy ${srcPath}: ${e.message}`);
        }
      }
    }

    // Fallback to Etsy CDN
    if (!src) {
      src = img.url_570xN || img.url_fullxfull || "";
    }

    if (src) {
      images.push({
        src,
        alt: altText,
        width: img.full_width || 3000,
        height: img.full_height || 2250,
      });
    }
  }

  // Build product object
  const product = {
    id: `etsy-${listingId}`,
    slug,
    name: listing.title,
    shortName: extractShortName(listing.title),
    description: listing.description.replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"'),
    shortDescription: extractShortDescription(listing.description),
    price,
    currency: listing.price.currency_code || "USD",
    categorySlug: "faux-fur-accessories",
    subcategorySlug: subcategory,
    images,
    tags: listing.tags || [],
    materials: listing.materials?.length > 0 ? listing.materials : ["Faux Fur"],
    colors: extractColors(listing),
    features: extractFeatures(listing.description),
    marketplace: {
      name: "etsy",
      url: listing.url || `https://www.etsy.com/listing/${listingId}`,
      listingId: listingId.toString(),
    },
    inStock: listing.quantity > 0,
    views: listing.views || 0,
    favorites: listing.num_favorers || 0,
    createdAt: formatDate(listing.original_creation_timestamp || listing.created_timestamp),
    variations: extractVariations(listing),
  };

  products.push(product);
}

// Sort by favorites (popularity) desc, then views desc
products.sort((a, b) => b.favorites - a.favorites || b.views - a.views);

console.log(`\nProcessed ${products.length} products:`);
const subcatCounts = {};
for (const p of products) {
  subcatCounts[p.subcategorySlug] = (subcatCounts[p.subcategorySlug] || 0) + 1;
}
for (const [k, v] of Object.entries(subcatCounts)) {
  console.log(`  ${k}: ${v}`);
}

// 6. Generate TypeScript data file
const subcatsWithCounts = SUBCATEGORIES.map((sc) => ({
  ...sc,
  productCount: subcatCounts[sc.slug] || 0,
}));

let output = `// Auto-generated by scripts/build-catalog.mjs — DO NOT EDIT MANUALLY
// Generated: ${new Date().toISOString()}
// Source: E:\\Etsy\\Data\\listings\\

import type { Category, Product } from "../types";

export const faux_fur_products: Product[] = [\n`;

for (const p of products) {
  output += `  {\n`;
  output += `    id: ${JSON.stringify(p.id)},\n`;
  output += `    slug: ${JSON.stringify(p.slug)},\n`;
  output += `    name: ${JSON.stringify(p.name)},\n`;
  output += `    shortName: ${JSON.stringify(p.shortName)},\n`;
  output += `    description: ${JSON.stringify(p.description)},\n`;
  output += `    shortDescription: ${JSON.stringify(p.shortDescription)},\n`;
  output += `    price: ${p.price},\n`;
  output += `    currency: ${JSON.stringify(p.currency)},\n`;
  output += `    categorySlug: ${JSON.stringify(p.categorySlug)},\n`;
  output += `    subcategorySlug: ${JSON.stringify(p.subcategorySlug)},\n`;
  output += `    images: ${JSON.stringify(p.images, null, 6).replace(/\n/g, "\n    ")},\n`;
  output += `    tags: ${JSON.stringify(p.tags)},\n`;
  output += `    materials: ${JSON.stringify(p.materials)},\n`;
  output += `    colors: ${JSON.stringify(p.colors)},\n`;
  output += `    features: ${JSON.stringify(p.features)},\n`;
  output += `    marketplace: ${JSON.stringify(p.marketplace)},\n`;
  output += `    inStock: ${p.inStock},\n`;
  output += `    views: ${p.views},\n`;
  output += `    favorites: ${p.favorites},\n`;
  output += `    createdAt: ${JSON.stringify(p.createdAt)},\n`;
  if (p.variations) {
    output += `    variations: ${JSON.stringify(p.variations)},\n`;
  }
  output += `  },\n`;
}

output += `];\n\n`;

output += `export const faux_fur_category: Category = {\n`;
output += `  slug: "faux-fur-accessories",\n`;
output += `  name: "Faux Fur Accessories",\n`;
output += `  description: "Handcrafted faux fur costume accessories — ears, tails, paws, and complete costume sets for cosplay, conventions, and everyday style.",\n`;
output += `  heroDescription: "Premium handcrafted faux fur accessories for cosplay enthusiasts, convention-goers, and anyone who loves to express their wild side. Every piece is made with care using soft, cruelty-free faux fur.",\n`;
output += `  subcategories: ${JSON.stringify(subcatsWithCounts, null, 4)},\n`;
output += `  products: faux_fur_products,\n`;
output += `};\n`;

fs.writeFileSync(OUTPUT_DATA, output, "utf8");
console.log(`\n✅ Written ${OUTPUT_DATA} (${products.length} products)`);
console.log(`✅ Images copied to ${OUTPUT_IMAGES}/`);

// 7. Count image stats
let localImages = 0;
let remoteImages = 0;
for (const p of products) {
  for (const img of p.images) {
    if (img.src.startsWith("/")) localImages++;
    else remoteImages++;
  }
}
console.log(`\nImages: ${localImages} local, ${remoteImages} remote (Etsy CDN)`);
