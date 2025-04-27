"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AdminProductsTable() {
  const [products] = useState([
    {
      id: "product-1",
      name: "Chronograph Master Platinum",
      brand: "Audemars",
      price: 24500,
      image: "/placeholder.svg?height=40&width=40",
      category: "luxury",
      stock: 8,
      status: "In Stock"
    },
    {
      id: "product-2",
      name: "Ocean Diver Pro",
      brand: "Rolex",
      price: 18900,
      image: "/placeholder.svg?height=40&width=40",
      category: "sport",
      stock: 12,
      status: "In Stock"
    },
    {
      id: "product-3",
      name: "Classic Fusion Gold",
      brand: "Hublot",
      price: 21500,
      image: "/placeholder.svg?height=40&width=40",
      category: "classic",
      stock: 5,
      status: "Low Stock"
    },
    {
      id: "product-4",
      name: "Nautilus Steel",
      brand: "Patek Philippe",
      price: 35000,
      image: "/placeholder.svg?height=40&width=40",
      category: "luxury",
      stock: 3,
      status: "Low Stock"
    },
    {
      id: "product-5",
      name: "Royal Oak Gold",
      brand: "Audemars Piguet",
      price: 42500,
      image: "/placeholder.svg?height=40&width=40",
      category: "luxury",
      stock: 0,
      status: "Out of Stock"
    },
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search products..."
            className="h-9 w-[250px]"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <span>Category</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Check className="mr-2 h-4 w-4" />
                <span>All</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="ml-6">Luxury</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="ml-6">Sport</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="ml-6">Classic</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <span>Status</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Check className="mr-2 h-4 w-4" />
                <span>All</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="ml-6">In Stock</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="ml-6">Low Stock</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="ml-6">Out of Stock</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">&lt;\
