import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the user's wishlist items
    const wishlistItems = await db.wishlistItem.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ wishlistItems })
  } catch (error) {
    console.error("Error fetching wishlist:", error)
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await request.json()
    const { productId } = json

    // Check if product exists
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Check if item already exists in wishlist
    const existingItem = await db.wishlistItem.findFirst({
      where: {
        userId: session.user.id,
        productId,
      },
    })

    if (existingItem) {
      return NextResponse.json({ error: "Product already in wishlist" }, { status: 400 })
    }

    // Add to wishlist
    const wishlistItem = await db.wishlistItem.create({
      data: {
        userId: session.user.id,
        productId,
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json({ wishlistItem }, { status: 201 })
  } catch (error) {
    console.error("Error adding to wishlist:", error)
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 })
  }
}
