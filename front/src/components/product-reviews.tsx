"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"
import { getProductReviews } from "@/lib/data/reviews"
import type { Review } from "@/lib/types"

export function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [ratingStats, setRatingStats] = useState({
    average: 0,
    total: 0,
    distribution: [
      { stars: 5, count: 0, percentage: 0 },
      { stars: 4, count: 0, percentage: 0 },
      { stars: 3, count: 0, percentage: 0 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 },
    ],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getProductReviews(productId)
        setReviews(data.reviews)
        setRatingStats(data.stats)
      } catch (error) {
        console.error("Error fetching reviews:", error)
        // Fallback data
        setReviews([
          {
            id: "1",
            name: "James Wilson",
            avatar: "/placeholder.svg?height=40&width=40",
            date: "2 months ago",
            rating: 5,
            title: "Exceptional craftsmanship",
            content:
              "I've been collecting luxury watches for over a decade, and this piece stands out for its exceptional craftsmanship and attention to detail. The movement is precise, and the finishing is impeccable. Worth every penny.",
            helpful: 12,
            productId,
            userId: "user1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "2",
            name: "Sophia Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            date: "3 weeks ago",
            rating: 4,
            title: "Beautiful timepiece with minor issues",
            content:
              "The watch is stunning and keeps perfect time. The only reason I'm giving it 4 stars instead of 5 is that the clasp feels slightly less substantial than I expected at this price point. Otherwise, it's a beautiful addition to my collection.",
            helpful: 8,
            productId,
            userId: "user2",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "3",
            name: "Robert Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            date: "1 month ago",
            rating: 5,
            title: "A masterpiece of horology",
            content:
              "This watch exceeds all expectations. The movement is a work of art, visible through the sapphire case back. The dial catches light in the most mesmerizing way, and the comfort on the wrist is unparalleled. This is truly a masterpiece of horology.",
            helpful: 15,
            productId,
            userId: "user3",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ])
        setRatingStats({
          average: 4.7,
          total: 28,
          distribution: [
            { stars: 5, count: 22, percentage: 78 },
            { stars: 4, count: 4, percentage: 14 },
            { stars: 3, count: 2, percentage: 7 },
            { stars: 2, count: 0, percentage: 0 },
            { stars: 1, count: 0, percentage: 0 },
          ],
        })
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [productId])

  if (loading) {
    return <div>Loading reviews...</div>
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${i < Math.floor(ratingStats.average) ? "fill-yellow-500 text-yellow-500" : "fill-muted text-muted"}`}
                />
              ))}
            </div>
            <div>
              <div className="text-2xl font-bold">{ratingStats.average} out of 5</div>
              <div className="text-sm text-muted-foreground">Based on {ratingStats.total} reviews</div>
            </div>
          </div>
          <div className="space-y-3">
            {ratingStats.distribution.map((item) => (
              <div key={item.stars} className="flex items-center space-x-2">
                <div className="w-12 text-sm">{item.stars} stars</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${item.percentage}%` }}></div>
                </div>
                <div className="w-12 text-sm text-right">{item.count}</div>
              </div>
            ))}
          </div>
          <Button className="mt-6">Write a Review</Button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Review Highlights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="font-medium">Exceptional quality and craftsmanship</p>
              <p className="text-sm text-muted-foreground">Mentioned in 15 reviews</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="font-medium">Accurate timekeeping</p>
              <p className="text-sm text-muted-foreground">Mentioned in 12 reviews</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
                <Star className="h-4 w-4 fill-muted text-muted" />
              </div>
              <p className="font-medium">Comfortable to wear</p>
              <p className="text-sm text-muted-foreground">Mentioned in 8 reviews</p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{review.name}</h4>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "fill-muted text-muted"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium">{review.title}</h5>
              <p className="text-muted-foreground mt-2">{review.content}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Helpful ({review.helpful})
              </Button>
              <Button variant="ghost" size="sm">
                Report
              </Button>
            </div>
            {review.id !== reviews[reviews.length - 1].id && <Separator />}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}
