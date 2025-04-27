import { NextResponse } from "next/server"
import { getFeaturedProducts } from "@/lib/data/products"

export async function GET() {
  try {
    // Get featured products from the data layer
    const products = await getFeaturedProducts()

    // Return the products as JSON
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error in featured products API route:", error)
    return NextResponse.json({ error: "Failed to fetch featured products" }, { status: 500 })
  }
}
