"use client"

import { useState } from "react"
import Image from "next/image"

export function AdminTopProducts() {
  const [products] = useState([
    {
      id: "product-1",
      name: "Chronograph Master Platinum",
      brand: "Audemars",
      image: "/placeholder.svg?height=40&width=40",
      sales: 42,
      revenue: "$1,029,000.00",
    },
    {
      id: "product-2",
      name: "Nautilus Steel",
      brand: "Patek Philippe",
      image: "/placeholder.svg?height=40&width=40",
      sales: 38,
      revenue: "$1,330,000.00",
    },
    {
      id: "product-3",
      name: "Royal Oak Gold",
      brand: "Audemars Piguet",
      image: "/placeholder.svg?height=40&width=40",
      sales: 35,
      revenue: "$1,487,500.00",
    },
    {
      id: "product-4",
      name: "Submariner Date",
      brand: "Rolex",
      image: "/placeholder.svg?height=40&width=40",
      sales: 31,
      revenue: "$449,500.00",
    },
    {
      id: "product-5",
      name: "Big Bang Ceramic",
      brand: "Hublot",
      image: "/placeholder.svg?height=40&width=40",
      sales: 28,
      revenue: "$554,400.00",
    },
  ])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 text-xs font-medium text-muted-foreground">
        <div className="col-span-2">Product</div>
        <div>Sales</div>
        <div className="text-right">Revenue</div>
      </div>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="grid grid-cols-4 items-center">
            <div className="col-span-2 flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-xs text-muted-foreground">{product.brand}</div>
              </div>
            </div>
            <div>{product.sales}</div>
            <div className="text-right font-medium">{product.revenue}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
