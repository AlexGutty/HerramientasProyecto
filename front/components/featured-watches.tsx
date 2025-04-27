"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { addToCart } from "@/lib/actions/cart-actions"
import { addToWishlist } from "@/lib/actions/wishlist-actions"
import { toast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/types"

export function FeaturedWatches() {
  const [featuredWatches, setFeaturedWatches] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const response = await fetch("/api/products/featured")

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `Server responded with ${response.status}`)
        }

        const data = await response.json()
        setFeaturedWatches(data)
      } catch (error) {
        console.error("Error fetching featured products:", error)
        // Fallback data in case API fails
        setFeaturedWatches([
          {
            id: "1",
            name: "Chronograph Master",
            brand: "Audemars",
            price: 12500,
            image: "/placeholder.svg?height=400&width=400",
            isNew: true,
            rating: 4.9,
            reviews: 28,
            description: "Luxury chronograph watch with precision movement",
            categoryId: "luxury",
            stock: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "2",
            name: "Ocean Diver Pro",
            brand: "Rolex",
            price: 18900,
            image: "/placeholder.svg?height=400&width=400",
            isNew: false,
            rating: 4.8,
            reviews: 42,
            description: "Professional diving watch with water resistance to 300m",
            categoryId: "sport",
            stock: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "3",
            name: "Classic Fusion Gold",
            brand: "Hublot",
            price: 21500,
            image: "/placeholder.svg?height=400&width=400",
            isNew: true,
            rating: 4.7,
            reviews: 19,
            description: "Elegant fusion of traditional and modern design elements",
            categoryId: "luxury",
            stock: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "4",
            name: "Nautilus Steel",
            brand: "Patek Philippe",
            price: 35000,
            image: "/placeholder.svg?height=400&width=400",
            isNew: false,
            rating: 5.0,
            reviews: 36,
            description: "Iconic steel sports watch with distinctive porthole design",
            categoryId: "luxury",
            stock: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1)
      toast({
        title: "Added to cart",
        description: "The item has been added to your cart",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      })
    }
  }

  const handleAddToWishlist = async (productId: string) => {
    try {
      await addToWishlist(productId)
      toast({
        title: "Added to wishlist",
        description: "The item has been added to your wishlist",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to wishlist",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <section className="container px-4 py-12 md:py-24">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Best Sellers</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Loading our most popular luxury timepieces...
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="container px-4 py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Best Sellers</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our most popular luxury timepieces
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {featuredWatches.map((watch) => (
          <div key={watch.id} className="group relative">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={watch.image || "/placeholder.svg"}
                alt={watch.name}
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/80 backdrop-blur-sm"
                  onClick={() => handleAddToWishlist(watch.id)}
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
              </div>
              {watch.isNew && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-black text-white hover:bg-black/90">New Arrival</Badge>
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-col">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{watch.name}</h3>
                  <p className="text-sm text-muted-foreground">{watch.brand}</p>
                </div>
                <p className="font-semibold">${watch.price.toLocaleString()}</p>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <div className="flex items-center">
                  <span className="mr-1 text-yellow-500">★</span>
                  <span>{watch.rating}</span>
                </div>
                <span className="mx-2 text-muted-foreground">·</span>
                <span className="text-muted-foreground">{watch.reviews} reviews</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button asChild className="w-full">
                  <Link href={`/product/${watch.id}`}>View Details</Link>
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleAddToCart(watch.id)}>
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Add to cart</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <Button asChild variant="outline" size="lg">
          <Link href="/catalog">View All Watches</Link>
        </Button>
      </div>
    </section>
  )
}
