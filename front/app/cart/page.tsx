import Link from "next/link"
import { ShoppingCart, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CartItems } from "@/components/cart-items"
import { PromoCodeForm } from "@/components/promo-code-form"
import { getCart } from "@/lib/data/cart"

export default async function CartPage() {
  const { items, subtotal, shipping, tax, total } = await getCart()

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">Review and modify your items before checkout</p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-lg border shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Cart Items ({items.length})</h2>
                  <CartItems items={items} />
                </div>
              </div>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (7%)</span>
                    <span>${tax.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/checkout">
                      Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <div className="mt-6">
                <PromoCodeForm />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Looks like you haven't added any watches to your cart yet. Explore our collection to find your perfect
              timepiece.
            </p>
            <Button asChild size="lg">
              <Link href="/catalog">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
