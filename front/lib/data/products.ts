// This file contains functions for fetching product data

import type { Product } from "@/lib/types"

// Mock database of products
const products: Product[] = [
  {
    id: "1",
    name: "Chronograph Master",
    brand: "Audemars",
    price: 12500,
    image: "/placeholder.svg?height=400&width=400",
    isNew: true,
    rating: 4.9,
    reviews: 28,
    description: "Luxury chronograph watch with precision movement",
    categoryId: "luxury",
    stock: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Ocean Diver Pro",
    brand: "Rolex",
    price: 18900,
    image: "/placeholder.svg?height=400&width=400",
    isNew: false,
    rating: 4.8,
    reviews: 42,
    description: "Professional diving watch with water resistance to 300m",
    categoryId: "sport",
    stock: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Classic Fusion Gold",
    brand: "Hublot",
    price: 21500,
    image: "/placeholder.svg?height=400&width=400",
    isNew: true,
    rating: 4.7,
    reviews: 19,
    description: "Elegant fusion of traditional and modern design elements",
    categoryId: "luxury",
    stock: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Nautilus Steel",
    brand: "Patek Philippe",
    price: 35000,
    image: "/placeholder.svg?height=400&width=400",
    isNew: false,
    rating: 5.0,
    reviews: 36,
    description: "Iconic steel sports watch with distinctive porthole design",
    categoryId: "luxury",
    stock: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Royal Oak Offshore",
    brand: "Audemars Piguet",
    price: 45000,
    image: "/placeholder.svg?height=400&width=400",
    isNew: true,
    rating: 4.9,
    reviews: 24,
    description: "Bold and sporty chronograph with iconic octagonal bezel",
    categoryId: "sport",
    stock: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "Submariner Date",
    brand: "Rolex",
    price: 14000,
    image: "/placeholder.svg?height=400&width=400",
    isNew: false,
    rating: 4.8,
    reviews: 56,
    description: "Legendary diving watch with date function and rotating bezel",
    categoryId: "sport",
    stock: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    name: "Big Bang Ceramic",
    brand: "Hublot",
    price: 18500,
    image: "/placeholder.svg?height=400&width=400",
    isNew: false,
    rating: 4.6,
    reviews: 31,
    description: "Bold ceramic chronograph with innovative materials",
    categoryId: "luxury",
    stock: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    name: "Aquanaut Travel Time",
    brand: "Patek Philippe",
    price: 65000,
    image: "/placeholder.svg?height=400&width=400",
    isNew: true,
    rating: 4.9,
    reviews: 18,
    description: "Elegant sports watch with dual time zone functionality",
    categoryId: "luxury",
    stock: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  // In a real app, this would fetch from a database
  return products
}

// Get a single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const product = products.find((p) => p.id === id)
  return product || null
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  // In a real app, this might filter by a "featured" flag or use some other criteria
  // For now, we'll just return the first 4 products
  return products.slice(0, 4)
}

// Get products by category
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return products.filter((p) => p.categoryId === categoryId)
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.brand.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery),
  )
}

// Get related products
export async function getRelatedProducts(productId: string): Promise<Product[]> {
  const product = await getProductById(productId)
  if (!product) return []

  // Get products in the same category, excluding the current product
  const relatedProducts = products.filter((p) => p.categoryId === product.categoryId && p.id !== productId)

  // Return up to 4 related products
  return relatedProducts.slice(0, 4)
}
