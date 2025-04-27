"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { applyPromoCode } from "@/lib/actions/cart-actions"
import { toast } from "@/components/ui/use-toast"

export function PromoCodeForm() {
  const [promoCode, setPromoCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleApplyPromoCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!promoCode.trim()) return

    setIsLoading(true)
    try {
      const result = await applyPromoCode(promoCode)
      if (result.success) {
        toast({
          title: "Promo code applied",
          description: result.message,
        })
      } else {
        toast({
          title: "Invalid promo code",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply promo code",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium mb-2">Have a promo code?</h3>
      <form className="flex space-x-2" onSubmit={handleApplyPromoCode}>
        <Input
          placeholder="Enter code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          disabled={isLoading}
        />
        <Button variant="outline" type="submit" disabled={isLoading}>
          {isLoading ? "Applying..." : "Apply"}
        </Button>
      </form>
    </div>
  )
}
