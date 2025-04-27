import Link from "next/link"
import { CheckCircle, Package, Truck, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const orderId = params.id

  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <p className="font-medium mt-2">Order #{orderId}</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Track the progress of your order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-muted"></div>

              <div className="relative flex items-start mb-8 pl-10">
                <div className="absolute -left-2 rounded-full bg-primary p-1">
                  <CheckCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">Order Placed</h3>
                  <p className="text-sm text-muted-foreground">Your order has been confirmed</p>
                  <p className="text-xs text-muted-foreground mt-1">April 27, 2025 at 1:15 PM</p>
                </div>
              </div>

              <div className="relative flex items-start mb-8 pl-10">
                <div className="absolute -left-2 rounded-full bg-muted p-1">
                  <CreditCard className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">Processing Payment</h3>
                  <p className="text-sm text-muted-foreground">Your payment is being processed</p>
                </div>
              </div>

              <div className="relative flex items-start mb-8 pl-10">
                <div className="absolute -left-2 rounded-full bg-muted p-1">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">Preparing Order</h3>
                  <p className="text-sm text-muted-foreground">Your order is being prepared for shipping</p>
                </div>
              </div>

              <div className="relative flex items-start pl-10">
                <div className="absolute -left-2 rounded-full bg-muted p-1">
                  <Truck className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">Shipping</h3>
                  <p className="text-sm text-muted-foreground">Your order will be shipped soon</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Summary of your purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>$43,400.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>$3,038.00</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>$46,438.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/account/orders">View Order History</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/catalog">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
