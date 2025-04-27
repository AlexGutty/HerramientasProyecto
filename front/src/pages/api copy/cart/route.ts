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

    // Get the user's cart
    const cart = await db.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    // If no cart exists, create an empty one
    if (!cart) {
      const newCart = await db.cart.create({
        data: {
          userId: session.user.id,
        },
        include: {
          items: true,
        },
      })

      return NextResponse.json({
        cart: newCart,
        subtotal: 0,
        itemCount: 0,
      })
    }

    // Calculate subtotal and item count
    const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

    return NextResponse.json({
      cart,
      subtotal,
      itemCount,
    })
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await request.json()
    const { productId, quantity } = json

    // Validate product exists and has enough stock
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    if (product.stock < quantity) {
      return NextResponse.json({ error: "Not enough stock available" }, { status: 400 })
    }

    // Get or create cart
    let cart = await db.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: true,
      },
    })

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: session.user.id,
        },
        include: {
          items: true,
        },
      })
    }

    // Check if item already exists in cart
    const existingItem = await db.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    })

    if (existingItem) {
      // Update quantity
      await db.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      })
    } else {
      // Add new item
      await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      })
    }

    // Get updated cart
    const updatedCart = await db.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    // Calculate subtotal and item count
    const subtotal = updatedCart!.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    const itemCount = updatedCart!.items.reduce((sum, item) => sum + item.quantity, 0)

    return NextResponse.json({
      cart: updatedCart,
      subtotal,
      itemCount,
    })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}
