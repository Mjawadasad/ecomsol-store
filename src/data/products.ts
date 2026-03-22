export type Category = "ears" | "tails" | "sets";

export type Variation = {
  name: string;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: Category;
  categories: Category[];
  description: string;
  shortDescription: string;
  price: number;
  variations?: Variation[];
  images: string[];
  tags: string[];
  materials: string[];
  colors: string[];
  features: string[];
  perfectFor: string[];
  careTips: string[];
  etsyUrl: string;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "P001",
    slug: "grey-deep-rose-poseable-bunny-rabbit-ears-headband",
    name: "Grey and Deep Rose Poseable Bunny Rabbit Ears Headband",
    shortName: "Poseable Bunny Ears",
    category: "ears",
    categories: ["ears"],
    description: `These poseable bunny ears are built for long con days - lightweight, realistic, and easy to style with any character or outfit. The wire core holds whatever shape you set, so go upright, floppy, or asymmetric depending on your vibe.

Soft grey faux fur with a deep rose inner ear that pops beautifully in photos. The slim black metal headband disappears into your wig or hair, so it looks like the ears are just... growing out of your head. Which is the whole point.

The wire core is the real MVP here - bend them into any position and they stay put. Upright and alert for that action pose, flopped down for a chill selfie, or one up and one down because you're quirky like that. They hold their shape through panels, photo ops, and dance battles.`,
    shortDescription: "Fully poseable faux fur bunny ears with wire core. Grey with deep rose inner ear, lightweight for all-day con wear.",
    price: 40.00,
    images: [
      "/images/products/p001-bunny-ears/grey-deep-rose-faux-fur-poseable-bunny-rabbit-ears-headband-front-view.jpg",
      "/images/products/p001-bunny-ears/bunny-rabbit-ears-headband-grey-rose-faux-fur-poseable-three-quarter-view.jpg",
      "/images/products/p001-bunny-ears/poseable-bunny-ears-headband-grey-rose-cosplay-costume-accessory-on-stand.jpg",
      "/images/products/p001-bunny-ears/grey-rabbit-ears-headband-faux-fur-poseable-side-angle-cosplay.jpg",
      "/images/products/p001-bunny-ears/poseable-grey-bunny-ears-headband-back-view-faux-fur-cosplay-halloween.jpg",
    ],
    tags: ["bunny ears headband", "rabbit ears cosplay", "poseable bunny ears", "grey bunny ears", "plush animal ears", "cosplay ears", "costume headband", "halloween ears", "anime cosplay", "faux fur ears", "gift for her", "Easter costume", "rose pink ears"],
    materials: ["Premium faux fur", "Flexible wire core", "Metal headband"],
    colors: ["Grey", "Deep Rose"],
    features: [
      "Fully poseable - wire core holds any shape you bend them into",
      "Soft grey faux fur with deep rose inner ear",
      "Light enough for full convention day wear",
      "Slim black metal headband disappears into hair or wigs",
    ],
    perfectFor: [
      "Con season - anime expos, Comic-Con, cosplay meetups",
      "Halloween and Easter costumes",
      "Festival and rave fits",
      "Cosplay photoshoots and social media content",
      "Bunny-themed character builds and OCs",
      "Gifts for your cosplayer friends",
    ],
    careTips: [
      "Gently comb or use a hair dryer on low to refluff after a long con day",
      "Spot clean only - no machine wash",
      "Reshape the wire before storing so they keep their form",
    ],
    etsyUrl: "https://www.etsy.com/shop/ecomsolstore",
    inStock: true,
  },
  {
    id: "P002",
    slug: "red-fox-ears-and-tail-set-faux-fur",
    name: "Red Fox Ears and Tail Set",
    shortName: "Red Fox Set",
    category: "sets",
    categories: ["ears", "tails", "sets"],
    description: `These fox ears are THAT piece that pulls your whole look together. Whether you're putting together a kitsune build for con season or just need the perfect finishing touch for Halloween, this set hits different.

The ears have that classic red fox look - rich copper-brown on the outside, creamy white inner with fluffy white tufts at the base. Black-tipped edges give them that realistic edge. The tail matches perfectly with thick, fluffy copper-brown fur and a black tip, just like the real thing.

The ears sit naturally on a slim headband that stays put even through dance battles. The tail attaches with an adjustable belt strap so it won't slip during panels or photoshoots. Both pieces are super lightweight so you can wear them all day without getting tired.`,
    shortDescription: "Realistic red fox faux fur ears headband and matching tail with belt strap. Rich copper-brown with cream inner and black tips.",
    price: 50.00,
    variations: [
      { name: "Fox Ears Only", price: 28.00 },
      { name: "Fox Tail Only", price: 30.00 },
      { name: "Fox Ears + Tail Set", price: 50.00 },
    ],
    images: [
      "/images/products/p002-fox-set/red-fox-faux-fur-ears-headband-tail-set-cosplay-three-quarter-view.jpg",
      "/images/products/p002-fox-set/red-fox-ears-headband-faux-fur-front-view-cosplay.jpg",
      "/images/products/p002-fox-set/red-fox-ears-headband-faux-fur-side-angle-cosplay.jpg",
      "/images/products/p002-fox-set/red-fox-ears-and-tail-set-faux-fur-cosplay-product-display.jpg",
      "/images/products/p002-fox-set/red-fox-faux-fur-tail-cosplay-side-view.jpg",
    ],
    tags: ["fox ears headband", "fox tail cosplay", "fox ears and tail set", "red fox ears", "faux fur fox ears", "kitsune ears", "cosplay ears", "anime cosplay", "therian ears", "halloween costume", "furry ears headband", "fox costume", "convention cosplay"],
    materials: ["Premium faux fur", "Metal headband", "Adjustable belt strap"],
    colors: ["Copper-Brown", "Cream White", "Black Tips"],
    features: [
      "Realistic red fox coloring that looks amazing in photos",
      "Premium faux fur with serious fluff factor",
      "Ears sit naturally on slim headband - stays put all day",
      "Tail attaches with adjustable belt strap - won't slip",
      "Super lightweight for all-day wear",
      "Available as ears only, tail only, or full set",
    ],
    perfectFor: [
      "Con season and anime expos",
      "Halloween and costume parties",
      "Therian and furry meetups",
      "Streaming and social media content",
      "Festival and rave fits",
      "Cosplay photoshoots",
      "Gift for your favorite weeb",
    ],
    careTips: [
      "Brush gently or use a hair dryer on low to refluff",
      "Spot clean with a damp cloth - no machine wash",
      "Store flat or hanging to keep the shape right",
    ],
    etsyUrl: "https://www.etsy.com/shop/ecomsolstore",
    inStock: true,
  },
  {
    id: "P003",
    slug: "white-curly-plush-cat-ears-and-tail-set",
    name: "White Curly Plush Cat Ears and Tail Set",
    shortName: "White Curly Cat Set",
    category: "sets",
    categories: ["ears", "tails", "sets"],
    description: `OK these are ridiculously cute. Soft white curly plush cat ears paired with a matching long curly tail. The whole set just screams kawaii and honestly it's giving main character energy at any con.

The curly texture on these is what sets them apart - not your basic straight-fur cat ears. The soft lamb-like curls catch light beautifully in photos and give that fluffy, dreamy aesthetic. Pink velvet inner ears add just the right pop of color.

The matching tail is long, fluffy, and has the same gorgeous curly texture. It attaches with an adjustable belt strap that stays secure through everything - panels, photo ops, impromptu hallway photoshoots, all of it.`,
    shortDescription: "Kawaii white curly plush cat ears and matching long curly tail. Unique lamb-like texture with pink velvet inner ears.",
    price: 32.00,
    images: [
      "/images/products/p003-white-curly-set/white-curly-plush-cat-ears-tail-set-kawaii-lolita-pink-bow-hero.jpg",
      "/images/products/p003-white-curly-set/white-curly-plush-cat-ears-headband-front-view-cosplay.jpg",
      "/images/products/p003-white-curly-set/white-curly-cat-ears-tail-set-three-quarter-view-cosplay.jpg",
      "/images/products/p003-white-curly-set/white-curly-cat-ears-tail-set-back-view-pink-bow-bell.jpg",
      "/images/products/p003-white-curly-set/white-curly-plush-cat-ears-headband-front-view-close-up.jpg",
      "/images/products/p003-white-curly-set/white-curly-plush-cat-ear-detail-close-up-texture.jpg",
      "/images/products/p003-white-curly-set/white-curly-cat-ears-and-tail-flat-lay-product-display.jpg",
      "/images/products/p003-white-curly-set/white-curly-cat-ears-tail-side-view-pink-bow-cosplay.jpg",
    ],
    tags: ["cat ears and tail set", "white cat ears", "kawaii cat ears", "lolita cat ears", "plush cat ears", "cat tail cosplay", "curly fur cat ears", "anime cosplay", "neko ears", "costume accessory", "cute cat ears", "halloween cat", "convention cosplay"],
    materials: ["Curly plush faux fur", "Metal headband", "Adjustable belt strap"],
    colors: ["White", "Pink Velvet"],
    features: [
      "Unique curly plush texture that stands out from basic cat ears",
      "Matching long curly tail with adjustable belt strap",
      "Soft pink velvet inner ears for sweet contrast",
      "Super lightweight and comfortable for all-day wear",
      "Tail stays secure through everything",
    ],
    perfectFor: [
      "Kawaii and lolita fashion looks",
      "Con season and anime expos",
      "Halloween and costume parties",
      "Social media content and photoshoots",
      "Festival and rave fits",
      "Streaming setups",
      "Gift for your favorite neko fan",
    ],
    careTips: [
      "Gently brush or use a hair dryer on low to restore curl pattern",
      "Spot clean with a damp cloth - no machine wash",
      "Store in a cool, dry place to keep curls intact",
    ],
    etsyUrl: "https://www.etsy.com/shop/ecomsolstore",
    inStock: true,
  },
  {
    id: "P004",
    slug: "white-cat-ears-headband-blue-organza-ribbon-flower",
    name: "White Cat Ears Headband with Blue Organza Ribbons and Purple Flowers",
    shortName: "Blue Organza Cat Ears",
    category: "ears",
    categories: ["ears"],
    description: `These are the prettiest cat ears you'll ever put on your head. Soft white faux fur ears decorated with delicate purple hydrangea flowers and flowing blue organza ribbon bows that cascade down like fairy wings. This isn't just a cosplay piece - it's a whole mood.

The trailing organza ribbons give that ethereal movement when you walk, and the purple flowers add dimension that photographs incredibly well. Whether you're going for a fairy cat aesthetic or leveling up a lolita coord, these just work.

The white faux fur is soft and premium quality, and the slim headband sits comfortably all day. Every detail - from the flower placement to the ribbon drape - is designed to catch light and movement. These are conversation starters at any event.`,
    shortDescription: "Ethereal white faux fur cat ears with flowing blue organza ribbons and purple hydrangea flower accents. Fairy lolita aesthetic.",
    price: 35.00,
    images: [
      "/images/products/p004-blue-organza-ears/white-cat-ears-headband-blue-organza-purple-flower-front-view.jpg",
      "/images/products/p004-blue-organza-ears/white-cat-ears-headband-purple-flower-organza-front-close-up.jpg",
      "/images/products/p004-blue-organza-ears/white-cat-ears-headband-blue-ribbon-flower-three-quarter-view.jpg",
      "/images/products/p004-blue-organza-ears/white-cat-ears-headband-organza-ribbon-side-view-lolita.jpg",
      "/images/products/p004-blue-organza-ears/white-cat-ears-headband-blue-organza-ribbon-back-view.jpg",
      "/images/products/p004-blue-organza-ears/white-fluffy-cat-ears-headband-blue-ribbon-flower-front-view.jpg",
    ],
    tags: ["cat ears headband", "lolita cat ears", "fairy cat ears", "white cat ears", "organza ribbon ears", "flower cat ears", "anime cosplay", "kawaii headband", "costume headband", "convention cosplay", "purple flower ears", "cat ears hair accessory", "cute ears headband"],
    materials: ["Faux fur", "Organza ribbon", "Artificial flowers", "Metal headband"],
    colors: ["White", "Blue", "Purple"],
    features: [
      "Soft white faux fur cat ears with premium detailing",
      "Delicate purple hydrangea flower accents on each ear",
      "Flowing blue organza ribbon bows with beautiful drape",
      "Trailing ribbons create elegant movement with every step",
      "Lightweight and comfortable for all-day wear",
    ],
    perfectFor: [
      "Lolita and fairy kei fashion coords",
      "Con season and anime expos",
      "Photoshoots and social media content",
      "Tea parties and themed events",
      "Halloween and costume parties",
      "Streaming and video content",
      "Gift for anyone who loves cute accessories",
    ],
    careTips: [
      "Handle organza ribbons gently to maintain shape",
      "Spot clean with a damp cloth - no machine wash",
      "Store flat to prevent ribbon creasing",
    ],
    etsyUrl: "https://www.etsy.com/shop/ecomsolstore",
    inStock: true,
  },
  {
    id: "P005",
    slug: "brown-faux-fur-cat-ears-headband-realistic",
    name: "Brown Faux Fur Cat Ears Headband",
    shortName: "Brown Cat Ears",
    category: "ears",
    categories: ["ears"],
    description: `If you want cat ears that actually look like real cat ears, these are it. Rich chocolate brown faux fur with soft cream-colored fluffy tufts at the base and subtle pink inner ear detail. The realistic coloring and natural shape make these perfect for cosplays where you need that authentic animal ear look, not the costume-shop vibe.

The fur quality on these is seriously impressive - dense, soft, and has that natural gradation from dark brown to cream that makes them look like actual cat ears peeking through your hair.

The slim headband blends into your hair seamlessly, and the whole thing is lightweight enough that you forget you're wearing them. Until someone compliments you for the hundredth time, that is.`,
    shortDescription: "Realistic dark brown faux fur cat ears with cream fluffy tufts and pink inner ear detail. Natural, authentic look.",
    price: 30.00,
    images: [
      "/images/products/p005-brown-cat-ears/brown-faux-fur-cat-ears-headband-realistic-front-view.jpg",
      "/images/products/p005-brown-cat-ears/brown-faux-fur-cat-ears-headband-realistic-side-view.jpg",
      "/images/products/p005-brown-cat-ears/brown-faux-fur-cat-ears-headband-cream-tufts-front-view.jpg",
      "/images/products/p005-brown-cat-ears/brown-faux-fur-cat-ears-headband-realistic-back-view.jpg",
    ],
    tags: ["brown cat ears", "cat ears headband", "realistic cat ears", "faux fur cat ears", "fluffy cat ears", "cosplay ears", "therian ears", "anime cosplay", "plush cat ears", "halloween costume", "convention cosplay", "animal ears headband", "cat ear cosplay"],
    materials: ["Premium dense faux fur", "Metal headband"],
    colors: ["Chocolate Brown", "Cream", "Pink"],
    features: [
      "Realistic brown coloring with natural gradient",
      "Fluffy cream-colored ear tufts at the base",
      "Soft pink inner ear detail",
      "Premium dense faux fur with natural texture",
      "Slim headband that blends into hair seamlessly",
      "Super lightweight for all-day wear",
    ],
    perfectFor: [
      "Realistic animal cosplays",
      "Therian and furry meetups",
      "Con season and anime expos",
      "Halloween costumes",
      "Streaming and social media content",
      "Photoshoots",
      "Gift for cat lovers",
    ],
    careTips: [
      "Gently brush or use a hair dryer on low to refluff",
      "Spot clean with a damp cloth - no machine wash",
      "Store flat to maintain shape",
    ],
    etsyUrl: "https://www.etsy.com/shop/ecomsolstore",
    inStock: true,
  },
  {
    id: "P006",
    slug: "black-faux-fur-cat-ears-and-tail-set-realistic",
    name: "Black Faux Fur Cat Ears and Tail Set",
    shortName: "Black Cat Set",
    category: "sets",
    categories: ["ears", "tails", "sets"],
    description: `The classic black cat look, done right. Rich black faux fur ears with soft cream-colored fluffy tufts at the base and subtle pink inner ear detail, paired with a matching sleek black faux fur tail. These have that realistic quality that makes people do a double-take.

The ears feature dense, premium black fur with natural-looking cream tufts that add dimension and authenticity. The matching tail is smooth, flexible, and attaches securely with a belt strap so it moves naturally.

The slim headband blends into dark hair seamlessly, and both pieces are lightweight enough for all-day wear. Whether you're going for a classic black cat cosplay or adding edge to a dark fashion coord, this set delivers.`,
    shortDescription: "Realistic black faux fur cat ears with cream tufts and pink inner ear, plus matching sleek black tail. Classic black cat look.",
    price: 38.00,
    images: [
      "/images/products/p006-black-cat-set/black-faux-fur-cat-ears-headband-realistic-front-view.jpg",
      "/images/products/p006-black-cat-set/black-faux-fur-cat-ears-headband-realistic-side-view.jpg",
      "/images/products/p006-black-cat-set/black-faux-fur-cat-ears-headband-cream-tufts-three-quarter.jpg",
      "/images/products/p006-black-cat-set/black-faux-fur-cat-ears-headband-realistic-back-view.jpg",
      "/images/products/p006-black-cat-set/black-faux-fur-cat-tail-cosplay-flat-lay.jpg",
    ],
    tags: ["black cat ears", "cat ears and tail", "black cat costume", "faux fur cat ears", "realistic cat ears", "cat tail cosplay", "cosplay ears", "therian ears", "anime cosplay", "halloween cat", "fluffy cat ears", "convention cosplay", "black cat cosplay"],
    materials: ["Premium dense faux fur", "Metal headband", "Adjustable belt strap"],
    colors: ["Black", "Cream", "Pink"],
    features: [
      "Realistic black fur with natural cream-colored ear tufts",
      "Soft pink inner ear detail for authentic look",
      "Matching black faux fur tail with belt strap attachment",
      "Premium dense fur with natural texture",
      "Slim headband that blends into dark hair seamlessly",
      "Super lightweight for all-day wear",
    ],
    perfectFor: [
      "Black cat cosplays",
      "Therian and furry meetups",
      "Con season and anime expos",
      "Halloween costumes - classic black cat never fails",
      "Streaming and social media content",
      "Lolita and dark fashion coords",
      "Gift for cat lovers and cosplayers",
    ],
    careTips: [
      "Gently brush or use a hair dryer on low to refluff",
      "Spot clean with a damp cloth - no machine wash",
      "Store flat to maintain shape",
    ],
    etsyUrl: "https://www.etsy.com/shop/ecomsolstore",
    inStock: true,
  },
  {
    id: "P007",
    slug: "neon-green-black-cat-ears-and-tail-set",
    name: "Neon Green and Black Cat Ears and Tail Set",
    shortName: "Neon Green Cat Set",
    category: "sets",
    categories: ["ears", "tails", "sets"],
    description: `These ears GO. Neon green and black faux fur cat ears with dark green inner accents and massive fluffy lime green tufts that absolutely pop. Paired with a sleek black faux fur tail. This set was made for standing out in a crowd.

The color combo is straight-up electric - the neon green catches every light at raves, cons, and festivals, while the black gives it that edgy contrast. The dark green inner ear markings add depth and make the whole look feel intentional and designed, not just thrown together.

The fluffy lime green tufts have serious volume and presence. Combined with the slim headband and the matching black tail (belt strap attachment, adjustable), you get a complete look that's ready for the floor from the moment you put it on.`,
    shortDescription: "Eye-catching neon green and black faux fur cat ears with massive lime tufts, plus matching black tail. Electric rave energy.",
    price: 42.00,
    variations: [
      { name: "Cat Ears Only", price: 25.00 },
      { name: "Cat Tail Only", price: 25.00 },
      { name: "Cat Ears + Tail Set", price: 42.00 },
    ],
    images: [
      "/images/products/p007-neon-green-set/neon-green-black-cat-ears-tail-set-cosplay-hero.jpg",
      "/images/products/p007-neon-green-set/neon-green-black-cat-ears-headband-front-view-dark.jpg",
      "/images/products/p007-neon-green-set/neon-green-black-cat-ears-headband-front-view-cosplay.jpg",
      "/images/products/p007-neon-green-set/neon-green-black-cat-ears-headband-front-view-white.jpg",
      "/images/products/p007-neon-green-set/neon-green-black-cat-ear-close-up-detail-faux-fur.jpg",
      "/images/products/p007-neon-green-set/neon-green-black-cat-ears-headband-product-display-stand.jpg",
      "/images/products/p007-neon-green-set/neon-green-black-cat-ears-headband-product-display-front.jpg",
      "/images/products/p007-neon-green-set/neon-green-black-cat-ears-headband-choker-front-view.jpg",
    ],
    tags: ["neon green cat ears", "black cat ears", "cat ears and tail set", "rave cat ears", "anime cat ears", "neon cosplay", "festival ears", "therian ears", "faux fur cat ears", "halloween costume", "convention cosplay", "green cat costume", "cosplay ears"],
    materials: ["Faux fur", "Metal headband", "Adjustable belt strap"],
    colors: ["Neon Green", "Black", "Dark Green", "Lime"],
    features: [
      "Eye-catching neon green and black color combo",
      "Dark green inner ear accent markings",
      "Massive fluffy lime green ear tufts with serious volume",
      "Matching sleek black faux fur tail with belt strap",
      "Slim headband for comfortable all-day wear",
      "Available as ears only, tail only, or full set",
    ],
    perfectFor: [
      "Raves, EDM festivals, and glow events",
      "Anime conventions and expos",
      "Therian and furry meetups",
      "Halloween costumes with edge",
      "Streaming and social media content",
      "Cosplay photoshoots",
      "Gift for anyone who likes to stand out",
    ],
    careTips: [
      "Gently brush or use a hair dryer on low to refluff",
      "Spot clean with a damp cloth - no machine wash",
      "Store flat to maintain fur shape",
    ],
    etsyUrl: "https://www.etsy.com/shop/ecomsolstore",
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.categories.includes(category));
}

export function getFeaturedProducts(): Product[] {
  return [products[0], products[1], products[6], products[3]];
}

export const categoryInfo: Record<Category, { name: string; slug: string; description: string; tagline: string }> = {
  ears: {
    name: "Ears",
    slug: "ears",
    description: "From poseable bunny ears to realistic cat ears to fairy-inspired designs, find the perfect ears for your next cosplay, convention, or costume. Every pair is handcrafted with premium faux fur and designed to look amazing in photos.",
    tagline: "Find your perfect pair",
  },
  tails: {
    name: "Tails",
    slug: "tails",
    description: "Complete your look with a matching tail. Our tails feature premium faux fur, adjustable belt strap attachments, and realistic coloring that pairs perfectly with our ear sets.",
    tagline: "Complete the look",
  },
  sets: {
    name: "Ears & Tail Sets",
    slug: "sets",
    description: "Get the full look with our matched ears and tail sets. Each set is designed to work together perfectly - matching colors, textures, and quality. Bundle pricing saves you money versus buying separately.",
    tagline: "The full look, one click",
  },
};
