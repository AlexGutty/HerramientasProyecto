"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createOrder } from "@/lib/actions/order-actions"
import { toast } from "@/components/ui/use-toast"
import type { User } from "@/lib/types"

export function CheckoutForm({ user }: { user: User | null }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const formValues = Object.fromEntries(formData.entries())

    try {
      const orderId = await createOrder({
        ...formValues,
        paymentMethod,
      })

      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase!",
      })

      // Redirect to order confirmation page
      router.push(`/order-confirmation/${orderId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form id="checkout-form" onSubmit={handleSubmit}>
      <div className="rounded-lg border shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                name="firstName"
                placeholder="Enter your first name"
                defaultValue={user?.firstName || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                name="lastName"
                placeholder="Enter your last name"
                defaultValue={user?.lastName || ""}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={user?.email || ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              defaultValue={user?.phone || ""}
              required
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter your street address"
              defaultValue={user?.address?.street || ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
            <Input
              id="address2"
              name="address2"
              placeholder="Apartment, suite, etc."
              defaultValue={user?.address?.unit || ""}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="Enter your city"
                defaultValue={user?.address?.city || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State / Province</Label>
              <Select name="state" defaultValue={user?.address?.state || ""}>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                  <SelectItem value="fl">Florida</SelectItem>
                  <SelectItem value="il">Illinois</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP / Postal Code</Label>
              <Input
                id="zip"
                name="zip"
                placeholder="Enter ZIP code"
                defaultValue={user?.address?.zip || ""}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select name="country" defaultValue={user?.address?.country || "us"}>
              <SelectTrigger id="country">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
            <TabsTrigger value="bank-transfer">Bank Transfer</TabsTrigger>
          </TabsList>
          <TabsContent value="credit-card" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                required={paymentMethod === "credit-card"}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" name="expiry" placeholder="MM/YY" required={paymentMethod === "credit-card"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" name="cvc" placeholder="123" required={paymentMethod === "credit-card"} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name-on-card">Name on Card</Label>
              <Input
                id="name-on-card"
                name="nameOnCard"
                placeholder="Enter name as it appears on card"
                required={paymentMethod === "credit-card"}
              />
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </TabsContent>
          <TabsContent value="paypal" className="pt-4">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <Image src="/placeholder.svg?height=60&width=120" alt="PayPal" width={120} height={60} className="mb-4" />
              <p className="text-muted-foreground mb-4">
                You will be redirected to PayPal to complete your payment securely.
              </p>
              <Button>Continue with PayPal</Button>
            </div>
          </TabsContent>
          <TabsContent value="bank-transfer" className="pt-4">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Please use the following details to make a bank transfer. Your order will be processed once the payment
                is confirmed.
              </p>
              <div className="rounded-lg bg-muted p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Bank Name:</span>
                  <span>Luxury Watch Bank</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Account Name:</span>
                  <span>Deluxe Watches Inc.</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Account Number:</span>
                  <span>1234567890</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Routing Number:</span>
                  <span>987654321</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Reference:</span>
                  <span>ORDER-{Math.floor(Math.random() * 10000)}</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </form>
  )
}
