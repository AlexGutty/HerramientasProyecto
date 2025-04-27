import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const brand = searchParams.get("brand")
  const priceMin = searchParams.get("priceMin")
  const priceMax = searchParams.get("priceMax")
  const sort = searchParams.get("sort") || "newest"
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "12")
  const skip = (page - 1) * limit

  try {
    // Build the filter object based on query parameters
    const filter: any = {}

    if (category) {
      filter.categoryId = category
    }

    if (brand) {
      filter.brand = brand
    }

    if (priceMin || priceMax) {
      filter.price = {}
      if (priceMin) filter.price.gte = Number.parseFloat(priceMin)
      if (priceMax) filter.price.lte = Number.parseFloat(priceMax)
    }

    // Determine the sort order
    let orderBy: any = {}
    switch (sort) {
      case "newest":
        orderBy = { createdAt: "desc" }
        break
      case "price-asc":
        orderBy = { price: "asc" }
        break
      case "price-desc":
        orderBy = { price: "desc" }
        break
      case "popular":
        orderBy = { soldCount: "desc" }
        break
      default:
        orderBy = { createdAt: "desc" }
    }

    // Get products with pagination
    const products = await db.product.findMany({
      where: filter,
      orderBy,
      skip,
      take: limit,
      include: {
        category: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    })

    // Calculate average rating for each product
    const productsWithAvgRating = products.map((product) => {
      const avgRating =
        product.reviews.length > 0
          ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
          : 0

      return {
        ...product,
        avgRating,
        reviewCount: product.reviews.length,
        reviews: undefined, // Remove the reviews array from the response
      }
    })

    // Get total count for pagination
    const totalCount = await db.product.count({
      where: filter,
    })

    return NextResponse.json({
      products: productsWithAvgRating,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const product = await db.product.create({
      data: {
        name: json.name,
        description: json.description,
        price: json.price,
        images: json.images,
        stock: json.stock,
        brand: json.brand,
        categoryId: json.categoryId,
        features: json.features,
        specifications: json.specifications,
      },
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
