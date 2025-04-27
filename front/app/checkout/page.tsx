import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CreditCard } from "lucide-react"
import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { CheckoutForm } from "@/components/checkout-form"
import { getCart } from "@/lib/data/cart"
import { getCurrentUser } from "@/lib/auth"

export default async function CheckoutPage() {
  const user = await getCurrentUser()
  const { items, subtotal, shipping, tax, total } = await getCart()

  // Redirect to cart if cart is empty
  if (items.length === 0) {
    redirect("/cart")
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to cart
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CheckoutForm user={user} />
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.brand}</p>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm">Qty: {item.quantity}</span>
                          <span className="font-medium">${item.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toLocaleString()}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (7%)</span>
                      <span>${tax.toLocaleString()}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <Button className="w-full mt-4" size="lg" form="checkout-form" type="submit">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Complete Order
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By completing your order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
