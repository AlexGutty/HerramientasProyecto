"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { addToWishlist } from "@/lib/actions/wishlist-actions"
import { toast } from "@/components/ui/use-toast"

export function AddToWishlistButton({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToWishlist = async () => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" size="icon" onClick={handleAddToWishlist} disabled={isLoading}>
      <Heart className="h-5 w-5" />
      <span className="sr-only">Add to wishlist</span>
    </Button>
  )
}
