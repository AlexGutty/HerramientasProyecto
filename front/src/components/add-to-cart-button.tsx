"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { addToCart } from "@/lib/actions/cart-actions"
import { toast } from "@/components/ui/use-toast"

export function AddToCartButton({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await addToCart(productId, quantity)
      toast({
        title: "Added to cart",
        description: `${quantity} item${quantity > 1 ? "s" : ""} added to your cart`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center border rounded-md">
        <Button variant="ghost" size="icon" className="rounded-none" onClick={decreaseQuantity}>
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        <span className="w-12 text-center">{quantity}</span>
        <Button variant="ghost" size="icon" className="rounded-none" onClick={increaseQuantity}>
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>
      <div className="flex-1">
        <Button className="w-full" size="lg" onClick={handleAddToCart} disabled={isLoading}>
          <ShoppingCart className="mr-2 h-5 w-5" />
          {isLoading ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  )
}
