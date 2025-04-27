"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import type { Category, SearchParams } from "@/lib/types"

export function ProductFilters({
  categories,
  searchParams,
}: {
  categories: Category[]
  searchParams: SearchParams
}) {
  const router = useRouter()
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number.parseInt(searchParams.minPrice || "5000"),
    Number.parseInt(searchParams.maxPrice || "30000"),
  ])

  const brands = ["Rolex", "Patek Philippe", "Audemars Piguet", "Omega", "Hublot", "Tag Heuer"]
  const watchTypes = ["Automatic", "Manual", "Quartz", "Smart"]
  const materials = ["Stainless Steel", "Gold", "Platinum", "Titanium", "Ceramic"]

  const applyFilters = () => {
    const params = new URLSearchParams()

    // Preserve search query if exists
    if (searchParams.search) {
      params.set("search", searchParams.search)
    }

    // Preserve sort if exists
    if (searchParams.sort) {
      params.set("sort", searchParams.sort)
    }

    // Add category if selected
    if (searchParams.category) {
      params.set("category", searchParams.category)
    }

    // Add brand if selected
    if (searchParams.brand) {
      params.set("brand", searchParams.brand)
    }

    // Add price range
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    // Reset to page 1 when filtering
    params.set("page", "1")

    router.push(`/catalog?${params.toString()}`)
  }

  return (
    <Accordion type="multiple" defaultValue={["categories", "brands", "price", "type", "material"]} className="w-full">
      <AccordionItem value="categories">
        <AccordionTrigger className="py-2">Categories</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={searchParams.category === category.id}
                  onCheckedChange={(checked) => {
                    const params = new URLSearchParams(window.location.search)
                    if (checked) {
                      params.set("category", category.id)
                    } else {
                      params.delete("category")
                    }
                    params.set("page", "1")
                    router.push(`/catalog?${params.toString()}`)
                  }}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="brands">
        <AccordionTrigger className="py-2">Brands</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={searchParams.brand === brand.toLowerCase()}
                  onCheckedChange={(checked) => {
                    const params = new URLSearchParams(window.location.search)
                    if (checked) {
                      params.set("brand", brand.toLowerCase())
                    } else {
                      params.delete("brand")
                    }
                    params.set("page", "1")
                    router.push(`/catalog?${params.toString()}`)
                  }}
                />
                <label
                  htmlFor={`brand-${brand}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="price">
        <AccordionTrigger className="py-2">Price Range</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <Slider value={priceRange} min={1000} max={50000} step={1000} onValueChange={setPriceRange} />
            <div className="flex items-center justify-between">
              <span className="text-sm">${priceRange[0].toLocaleString()}</span>
              <span className="text-sm">${priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="type">
        <AccordionTrigger className="py-2">Watch Type</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {watchTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={`type-${type}`} />
                <label
                  htmlFor={`type-${type}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="material">
        <AccordionTrigger className="py-2">Material</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {materials.map((material) => (
              <div key={material} className="flex items-center space-x-2">
                <Checkbox id={`material-${material}`} />
                <label
                  htmlFor={`material-${material}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {material}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <Button className="w-full mt-4" onClick={applyFilters}>
        Apply Filters
      </Button>
    </Accordion>
  )
}
