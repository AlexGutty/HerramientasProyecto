"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function addToCart(productId: string, quantity: number) {
  // In a real app, this would add the item to the cart in the database
  // For demo purposes, we'll just set a cookie

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Set a cookie to indicate the cart has been updated
  cookies().set("cart", Date.now().toString(), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "strict",
  })

  revalidatePath("/cart")

  return { success: true }
}

export async function updateCartItem(itemId: string, quantity: number) {
  // In a real app, this would update the item quantity in the database
  // For demo purposes, we'll just set a cookie

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Set a cookie to indicate the cart has been updated
  cookies().set("cart", Date.now().toString(), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "strict",
  })

  revalidatePath("/cart")

  return { success: true }
}

export async function removeCartItem(itemId: string) {
  // In a real app, this would remove the item from the cart in the database
  // For demo purposes, we'll just set a cookie

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Set a cookie to indicate the cart has been updated
  cookies().set("cart", Date.now().toString(), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "strict",
  })

  revalidatePath("/cart")

  return { success: true }
}

export async function applyPromoCode(code: string) {
  // In a real app, this would validate the promo code and apply it to the cart
  // For demo purposes, we'll just return a success or error message

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if the code is valid (for demo, only "LUXURY20" is valid)
  if (code.toUpperCase() === "LUXURY20") {
    // Set a cookie to indicate the promo code has been applied
    cookies().set("promo", code, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "strict",
    })

    revalidatePath("/cart")

    return {
      success: true,
      message: "Promo code applied! You've received 20% off your order.",
    }
  }

  return {
    success: false,
    message: "Invalid promo code. Please try again.",
  }
}
