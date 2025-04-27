import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await request.json()
    const { quantity } = json

    // Validate quantity
    if (quantity < 1) {
      return NextResponse.json({ error: "Quantity must be at least 1" }, { status: 400 })
    }

    // Get cart item
    const cartItem = await db.cartItem.findUnique({
      where: {
        id: params.id,
      },
      include: {
        cart: true,
        product: true,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }

    // Verify ownership
    if (cartItem.cart.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check stock
    if (cartItem.product.stock < quantity) {
      return NextResponse.json({ error: "Not enough stock available" }, { status: 400 })
    }

    // Update quantity
    await db.cartItem.update({
      where: {
        id: params.id,
      },
      data: {
        quantity,
      },
    })

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
    console.error("Error updating cart item:", error)
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get cart item
    const cartItem = await db.cartItem.findUnique({
      where: {
        id: params.id,
      },
      include: {
        cart: true,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }

    // Verify ownership
    if (cartItem.cart.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete cart item
    await db.cartItem.delete({
      where: {
        id: params.id,
      },
    })

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
    console.error("Error removing cart item:", error)
    return NextResponse.json({ error: "Failed to remove cart item" }, { status: 500 })
  }
}
