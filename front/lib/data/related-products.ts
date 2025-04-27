import type { Product } from "@/lib/types"
import { getProductById } from "@/lib/data/products"

// Mock database of products (simplified version of the one in products.ts)
const products: Product[] = Array.from({ length: 24 }).map((_, i) => ({
  id: `product-${i + 1}`,
  name: `Luxury Watch ${i + 1}`,
  brand: ["Rolex", "Patek Philippe", "Audemars Piguet", "Omega", "Hublot", "Tag Heuer"][i % 6],
  price: Math.floor(Math.random() * 30000) + 5000,
  image: "/placeholder.svg?height=400&width=400",
  isNew: i % 5 === 0,
  rating: Number.parseFloat((4 + Math.random()).toFixed(1)),
  reviews: Math.floor(Math.random() * 50) + 5,
  description: "Luxury timepiece with exceptional craftsmanship",
  categoryId: ["luxury", "sport", "classic", "limited", "smart", "vintage"][i % 6],
  stock: Math.floor(Math.random() * 10) + 1,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  updatedAt: new Date(),
}))

export async function getRelatedProducts(productId: string): Promise<Product[]> {
  // Get the current product
  const currentProduct = await getProductById(productId)

  if (!currentProduct) {
    return []
  }

  // Find products in the same category or by the same brand
  let relatedProducts = products.filter(
    (product) =>
      product.id !== productId &&
      (product.categoryId === currentProduct.categoryId || product.brand === currentProduct.brand),
  )

  // If we don't have enough related products, add some random ones
  if (relatedProducts.length < 4) {
    const randomProducts = products
      .filter((product) => product.id !== productId && !relatedProducts.some((rp) => rp.id === product.id))
      .sort(() => 0.5 - Math.random())
      .slice(0, 4 - relatedProducts.length)

    relatedProducts = [...relatedProducts, ...randomProducts]
  }

  // Limit to 4 products
  relatedProducts = relatedProducts.slice(0, 4)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  return relatedProducts
}
