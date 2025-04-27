import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const category = await db.category.findUnique({
      where: {
        id: params.id,
      },
      include: {
        products: {
          take: 10, // Limit to 10 products
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ category })
  } catch (error) {
    console.error("Error fetching category:", error)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const json = await request.json()

    const category = await db.category.update({
      where: {
        id: params.id,
      },
      data: {
        name: json.name,
        slug: json.slug,
        image: json.image,
        description: json.description,
      },
    })

    return NextResponse.json({ category })
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if category has products
    const productsCount = await db.product.count({
      where: {
        categoryId: params.id,
      },
    })

    if (productsCount > 0) {
      return NextResponse.json({ error: "Cannot delete category with products" }, { status: 400 })
    }

    await db.category.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
