export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: "Bags" | "Wigs" | "Shoes" | "Cosmetics"
  origin: "Nigeria" | "Dubai" | "Togo" | "France"
}

export interface CartItem extends Product {
  quantity: number
}

export const DELIVERY_TIMES: Record<Product["origin"], string> = {
  Nigeria: "2-3 days",
  Togo: "2 days",
  Dubai: "15 days",
  France: "15 days",
}

export const ORIGIN_FLAGS: Record<Product["origin"], string> = {
  Nigeria: "🇳🇬",
  Togo: "🇹🇬",
  Dubai: "🇦🇪",
  France: "🇫🇷",
}

export const CATEGORY_ICONS: Record<Product["category"], string> = {
  Bags: "👜",
  Wigs: "💇‍♀️",
  Shoes: "👠",
  Cosmetics: "💄",
}

export const products: Product[] = [
  // Bags
  {
    id: "1",
    name: "Luxury Leather Tote Bag",
    price: 45000,
    image: "/luxury-leather-tote-bag-brown.jpg",
    category: "Bags",
    origin: "Dubai",
  },
  {
    id: "2",
    name: "Designer Crossbody Bag",
    price: 28000,
    image: "/designer-crossbody-bag-black.jpg",
    category: "Bags",
    origin: "France",
  },
  {
    id: "3",
    name: "Ankara Print Handbag",
    price: 15000,
    image: "/african-ankara-print-handbag-colorful.jpg",
    category: "Bags",
    origin: "Nigeria",
  },
  {
    id: "4",
    name: "Woven Beach Bag",
    price: 12000,
    image: "/woven-straw-beach-bag-natural.jpg",
    category: "Bags",
    origin: "Togo",
  },
  // Wigs
  {
    id: "5",
    name: 'Brazilian Body Wave Wig 22"',
    price: 85000,
    image: "/brazilian-body-wave-wig-long-black-hair.jpg",
    category: "Wigs",
    origin: "Nigeria",
  },
  {
    id: "6",
    name: "Blonde Lace Front Wig",
    price: 120000,
    image: "/blonde-lace-front-wig-straight-hair.jpg",
    category: "Wigs",
    origin: "Dubai",
  },
  {
    id: "7",
    name: 'Curly Bob Wig 14"',
    price: 55000,
    image: "/curly-bob-wig-black-short-hair.jpg",
    category: "Wigs",
    origin: "France",
  },
  {
    id: "8",
    name: "Kinky Straight Closure Wig",
    price: 68000,
    image: "/kinky-straight-closure-wig-natural-hair.jpg",
    category: "Wigs",
    origin: "Nigeria",
  },
  // Shoes
  {
    id: "9",
    name: "Stiletto Heels Gold",
    price: 35000,
    image: "/gold-stiletto-high-heels-elegant.jpg",
    category: "Shoes",
    origin: "Dubai",
  },
  {
    id: "10",
    name: "Platform Sneakers White",
    price: 42000,
    image: "/white-platform-sneakers-trendy.jpg",
    category: "Shoes",
    origin: "France",
  },
  {
    id: "11",
    name: "African Print Sandals",
    price: 18000,
    image: "/african-print-sandals-colorful-beaded.jpg",
    category: "Shoes",
    origin: "Nigeria",
  },
  {
    id: "12",
    name: "Leather Loafers Brown",
    price: 28000,
    image: "/brown-leather-loafers-classic.jpg",
    category: "Shoes",
    origin: "Togo",
  },
  // Cosmetics
  {
    id: "13",
    name: "Organic Shea Butter Set",
    price: 8500,
    image: "/organic-shea-butter-skincare-set.jpg",
    category: "Cosmetics",
    origin: "Togo",
  },
  {
    id: "14",
    name: "Premium Makeup Palette",
    price: 32000,
    image: "/premium-makeup-eyeshadow-palette-colorful.jpg",
    category: "Cosmetics",
    origin: "Dubai",
  },
  {
    id: "15",
    name: "French Perfume Collection",
    price: 75000,
    image: "/french-luxury-perfume-bottles-collection.jpg",
    category: "Cosmetics",
    origin: "France",
  },
  {
    id: "16",
    name: "African Black Soap Bundle",
    price: 6500,
    image: "/placeholder.svg?height=300&width=300",
    category: "Cosmetics",
    origin: "Nigeria",
  },
]

export const formatPrice = (price: number): string => {
  return price.toLocaleString("fr-FR") + " FCFA"
}

export const WHATSAPP_NUMBER = "22890000000" // Replace with actual number
