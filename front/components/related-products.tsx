"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { addToCart } from "@/lib/actions/cart-actions"
import { addToWishlist } from "@/lib/actions/wishlist-actions"
import { toast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/types"

export function RelatedProducts({ products }: { products: Product[] }) {
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

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/80 backdrop-blur-sm"
                  onClick={() => handleAddToWishlist(product.id)}
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
              </div>
            </div>
            <div className="mt-4 flex flex-col">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                </div>
                <p className="font-semibold">${product.price.toLocaleString()}</p>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <div className="flex items-center">
                  <span className="mr-1 text-yellow-500">★</span>
                  <span>{product.rating}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button asChild className="w-full">
                  <Link href={`/product/${product.id}`}>View Details</Link>
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleAddToCart(product.id)}>
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Add to cart</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
