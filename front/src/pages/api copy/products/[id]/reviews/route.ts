import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const reviews = await db.review.findMany({
      where: {
        productId: params.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await request.json()

    // Check if user has already reviewed this product
    const existingReview = await db.review.findFirst({
      where: {
        productId: params.id,
        userId: session.user.id,
      },
    })

    if (existingReview) {
      return NextResponse.json({ error: "You have already reviewed this product" }, { status: 400 })
    }

    // Check if user has purchased this product
    const hasPurchased = await db.orderItem.findFirst({
      where: {
        productId: params.id,
        order: {
          userId: session.user.id,
          status: "DELIVERED",
        },
      },
    })

    if (!hasPurchased) {
      return NextResponse.json({ error: "You can only review products you have purchased" }, { status: 400 })
    }

    const review = await db.review.create({
      data: {
        rating: json.rating,
        comment: json.comment,
        productId: params.id,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json({ review }, { status: 201 })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
