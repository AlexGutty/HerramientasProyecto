"use client"
import { Filter, ChevronDown } from "lucide-react"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getProducts } from "@/lib/data/products"
import { getCategories } from "@/lib/data/categories"
import type { SearchParams } from "@/lib/types"

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { products, totalProducts } = await getProducts({
    page: searchParams.page ? Number.parseInt(searchParams.page) : 1,
    limit: 12,
    sort: searchParams.sort || "featured",
    category: searchParams.category,
    brand: searchParams.brand,
    minPrice: searchParams.minPrice ? Number.parseInt(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number.parseInt(searchParams.maxPrice) : undefined,
    search: searchParams.search,
  })

  const categories = await getCategories()

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Watch Collection</h1>
          <p className="text-muted-foreground mt-2">Browse our exclusive selection of luxury timepieces</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Search</h3>
              <div className="relative">
                <form action="/catalog" method="GET">
                  <Input
                    name="search"
                    placeholder="Search watches..."
                    className="w-full"
                    defaultValue={searchParams.search || ""}
                  />
                  {/* Preserve other filters when searching */}
                  {searchParams.category && <input type="hidden" name="category" value={searchParams.category} />}
                  {searchParams.brand && <input type="hidden" name="brand" value={searchParams.brand} />}
                  {searchParams.minPrice && <input type="hidden" name="minPrice" value={searchParams.minPrice} />}
                  {searchParams.maxPrice && <input type="hidden" name="maxPrice" value={searchParams.maxPrice} />}
                  {searchParams.sort && <input type="hidden" name="sort" value={searchParams.sort} />}
                  <Button type="submit" className="sr-only">
                    Search
                  </Button>
                </form>
              </div>
            </div>

            <Suspense fallback={<div>Loading filters...</div>}>
              <ProductFilters categories={categories} searchParams={searchParams} />
            </Suspense>
          </div>

          {/* Mobile Filters Button */}
          <div className="md:hidden mb-4">
            <Button variant="outline" className="w-full flex items-center justify-between">
              <span className="flex items-center">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {products.length} of {totalProducts} products
              </p>
              <form className="flex items-center space-x-2">
                <Select
                  defaultValue={searchParams.sort || "featured"}
                  name="sort"
                  onValueChange={(value) => {
                    const url = new URL(window.location.href)
                    url.searchParams.set("sort", value)
                    window.location.href = url.toString()
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </form>
            </div>

            <Suspense fallback={<div>Loading products...</div>}>
              <ProductGrid products={products} />
            </Suspense>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={!searchParams.page || searchParams.page === "1"}
                  onClick={() => {
                    const url = new URL(window.location.href)
                    url.searchParams.set("page", String(Math.max(1, Number.parseInt(searchParams.page || "1") - 1)))
                    window.location.href = url.toString()
                  }}
                >
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </Button>
                {[...Array(Math.ceil(totalProducts / 12))].map((_, i) => (
                  <Button
                    key={i}
                    variant={
                      searchParams.page === String(i + 1) || (!searchParams.page && i === 0) ? "default" : "outline"
                    }
                    size="sm"
                    className="h-8 w-8"
                    onClick={() => {
                      const url = new URL(window.location.href)
                      url.searchParams.set("page", String(i + 1))
                      window.location.href = url.toString()
                    }}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  disabled={Number.parseInt(searchParams.page || "1") >= Math.ceil(totalProducts / 12)}
                  onClick={() => {
                    const url = new URL(window.location.href)
                    url.searchParams.set("page", String(Number.parseInt(searchParams.page || "1") + 1))
                    window.location.href = url.toString()
                  }}
                >
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
