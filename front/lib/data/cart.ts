import { cookies } from "next/headers"
import type { CartItem } from "@/lib/types"

// Mock cart data
const mockCartItems: CartItem[] = [
  {
    id: "cart-item-1",
    productId: "product-1",
    name: "Chronograph Master Platinum",
    brand: "Audemars",
    price: 24500,
    quantity: 1,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "cart-item-2",
    productId: "product-2",
    name: "Ocean Diver Pro",
    brand: "Rolex",
    price: 18900,
    quantity: 1,
    image: "/placeholder.svg?height=200&width=200",
  },
]

export async function getCart() {
  // In a real app, this would fetch the cart from a database based on the user's session
  // For demo purposes, we'll return mock data
  const cartCookie = cookies().get("cart")

  const items = mockCartItems

  if (cartCookie) {
    try {
      // In a real app, this would be a token that identifies the cart in the database
      // For demo purposes, we'll just use the mock data
    } catch (error) {
      console.error("Error parsing cart cookie:", error)
    }
  }

  // Calculate totals
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const tax = subtotal * 0.07 // 7% tax
  const total = subtotal + shipping + tax

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    items,
    subtotal,
    shipping,
    tax,
    total,
  }
}
