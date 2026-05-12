# ECOMSOL Store — ecomsol.store

Multi-category e-commerce catalog platform. Products link to external marketplaces (Etsy, Amazon).

## Stack
- Next.js 16, React 19, TypeScript, Tailwind v4
- Static generation (SSG) — no database
- Vercel deployment

## Commands
- `npm run dev` — dev server
- `npm run build` — production build (67 static pages)
- `npm run lint` — ESLint
- `node scripts/build-catalog.mjs` — regenerate product data from Etsy source files

## Architecture

### Data Pipeline
Source: `E:\Etsy\Data\listings\*.json` (60 Etsy API responses)
Script: `scripts/build-catalog.mjs` reads listings, classifies subcategories, copies images, generates:
- `src/data/categories/faux-fur-accessories.ts` (auto-generated, 53 products)
- `public/images/products/{slug}/` (164 local images)

### Category System
Categories are defined per data file in `src/data/categories/`.
Adding a new category = add a new data file + import it in `src/data/index.ts`.

Current: **Faux Fur Accessories** (53 products)
- Ears (39) | Ears & Tail Sets (8) | Costume Sets (5) | Paws & Gloves (1)

### Key Files
```
src/data/types.ts              — Generic Product/Category types
src/data/index.ts              — Category registry + query functions
src/data/categories/*.ts       — One file per product category
src/components/                — ProductCard, ProductGrid, CategoryCard, etc.
src/app/                       — All pages (shop, category, product detail, etc.)
src/lib/schemas.ts             — JSON-LD structured data helpers
scripts/build-catalog.mjs      — Etsy data → TypeScript data pipeline
```

### Images
- 33 listings have local images (from E:\Etsy\Analytics\image-backups\)
- 20 listings use Etsy CDN URLs (i.etsystatic.com, configured in next.config.ts)

## Design
- Light, neutral, professional theme (not niche-specific)
- Colors: Blue primary (#2563eb), Orange CTA (#ea580c), white bg
- Font: Inter
- Mobile-first responsive

## External Links
- Etsy shop: https://www.etsy.com/shop/ecomsolstore
- Domain: ecomsol.store (Namecheap)
- Email: hello@ecomsol.store
