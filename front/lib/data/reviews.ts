import type { Review } from "@/lib/types"

// Mock reviews data
const reviews: Record<string, Review[]> = {
  "product-1": [
    {
      id: "review-1",
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2 months ago",
      rating: 5,
      title: "Exceptional craftsmanship",
      content:
        "I've been collecting luxury watches for over a decade, and this piece stands out for its exceptional craftsmanship and attention to detail. The movement is precise, and the finishing is impeccable. Worth every penny.",
      helpful: 12,
      productId: "product-1",
      userId: "user1",
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    },
    {
      id: "review-2",
      name: "Sophia Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "3 weeks ago",
      rating: 4,
      title: "Beautiful timepiece with minor issues",
      content:
        "The watch is stunning and keeps perfect time. The only reason I'm giving it 4 stars instead of 5 is that the clasp feels slightly less substantial than I expected at this price point. Otherwise, it's a beautiful addition to my collection.",
      helpful: 8,
      productId: "product-1",
      userId: "user2",
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    },
    {
      id: "review-3",
      name: "Robert Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "1 month ago",
      rating: 5,
      title: "A masterpiece of horology",
      content:
        "This watch exceeds all expectations. The movement is a work of art, visible through the sapphire case back. The dial catches light in the most mesmerizing way, and the comfort on the wrist is unparalleled. This is truly a masterpiece of horology.",
      helpful: 15,
      productId: "product-1",
      userId: "user3",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
  ],
}

// Generate default reviews for products that don't have any
function getDefaultReviews(productId: string): Review[] {
  return [
    {
      id: `default-review-1-${productId}`,
      name: "Watch Enthusiast",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "1 month ago",
      rating: 5,
      title: "Excellent quality and design",
      content:
        "This watch is a perfect blend of elegance and functionality. The craftsmanship is outstanding and it keeps perfect time. Highly recommended for any serious collector.",
      helpful: 7,
      productId,
      userId: "default-user1",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
    {
      id: `default-review-2-${productId}`,
      name: "Luxury Collector",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2 weeks ago",
      rating: 4,
      title: "Great watch with minor details to improve",
      content:
        "The watch is beautiful and well-crafted. The only small issue is the bracelet adjustment which could be more user-friendly. Otherwise, it's a fantastic timepiece that I'm proud to own.",
      helpful: 5,
      productId,
      userId: "default-user2",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
  ]
}

export async function getProductReviews(productId: string) {
  // Get reviews for the product or generate default ones
  const productReviews = reviews[productId] || getDefaultReviews(productId)

  // Calculate rating statistics
  const totalReviews = productReviews.length
  const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = totalReviews > 0 ? Number.parseFloat((totalRating / totalReviews).toFixed(1)) : 0

  // Calculate distribution
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = productReviews.filter((review) => review.rating === stars).length
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0
    return { stars, count, percentage }
  })

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    reviews: productReviews,
    stats: {
      average: averageRating,
      total: totalReviews,
      distribution,
    },
  }
}
