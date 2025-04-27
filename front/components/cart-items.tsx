"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { updateCartItem, removeCartItem } from "@/lib/actions/cart-actions"
import { toast } from "@/components/ui/use-toast"
import type { CartItem } from "@/lib/types"

export function CartItems({ items }: { items: CartItem[] }) {
  const [updatingItems, setUpdatingItems] = useState<Record<string, boolean>>({})

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setUpdatingItems((prev) => ({ ...prev, [itemId]: true }))
    try {
      await updateCartItem(itemId, newQuantity)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive",
      })
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [itemId]: false }))
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    setUpdatingItems((prev) => ({ ...prev, [itemId]: true }))
    try {
      await removeCartItem(itemId)
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.brand}</p>
              <p className="font-semibold mt-1">${item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none h-8 w-8"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={updatingItems[item.id] || item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none h-8 w-8"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  disabled={updatingItems[item.id]}
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => handleRemoveItem(item.id)}
                disabled={updatingItems[item.id]}
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Remove item</span>
              </Button>
            </div>
          </div>
          <Separator className="mt-6" />
        </div>
      ))}
    </div>
  )
}
