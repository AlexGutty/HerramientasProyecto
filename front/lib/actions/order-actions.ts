"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function createOrder(formData: any) {
  // In a real app, this would create an order in the database
  // For demo purposes, we'll just simulate a successful order creation

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Generate a random order ID
  const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`

  // Clear the cart cookie
  cookies().set("cart", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "strict",
  })

  // Set an order cookie
  cookies().set("lastOrder", orderId, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: "strict",
  })

  revalidatePath("/cart")

  return orderId
}
