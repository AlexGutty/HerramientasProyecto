"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export function AdminRecentOrders() {
  const [orders] = useState([
    {
      id: "ORD-7352",
      customer: "John Smith",
      date: "2025-04-26",
      amount: "$24,500.00",
      status: "completed",
    },
    {
      id: "ORD-7351",
      customer: "Sarah Johnson",
      date: "2025-04-26",
      amount: "$18,900.00",
      status: "processing",
    },
    {
      id: "ORD-7350",
      customer: "Michael Brown",
      date: "2025-04-25",
      amount: "$35,000.00",
      status: "completed",
    },
    {
      id: "ORD-7349",
      customer: "Emily Davis",
      date: "2025-04-25",
      amount: "$12,500.00",
      status: "pending",
    },
    {
      id: "ORD-7348",
      customer: "Robert Wilson",
      date: "2025-04-24",
      amount: "$21,500.00",
      status: "completed",
    },
  ])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground">
        <div>Order</div>
        <div>Customer</div>
        <div>Date</div>
        <div>Amount</div>
        <div className="text-right">Status</div>
      </div>
      <div className="space-y-2">
        {orders.map((order) => (
          <div key={order.id} className="grid grid-cols-5 items-center py-2 text-sm">
            <div className="font-medium">{order.id}</div>
            <div>{order.customer}</div>
            <div>{order.date}</div>
            <div>{order.amount}</div>
            <div className="flex items-center justify-end gap-2">
              <Badge
                variant={
                  order.status === "completed" ? "default" : order.status === "processing" ? "secondary" : "outline"
                }
              >
                {order.status}
              </Badge>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
                <span className="sr-only">View order {order.id}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
