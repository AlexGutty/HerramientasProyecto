import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Share2, Check, Star, Truck, Shield, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ProductReviews } from "@/components/product-reviews"
import { RelatedProducts } from "@/components/related-products"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { AddToWishlistButton } from "@/components/add-to-wishlist-button"
import { getProductById } from "@/lib/data/products"
import { getRelatedProducts } from "@/lib/data/related-products"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(params.id)

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/catalog" className="hover:underline">
            Catalog
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href={`/catalog?brand=${product.brand.toLowerCase()}`} className="hover:underline">
            {product.brand}
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[product.image, ...Array(3).fill("/placeholder.svg")].map((image, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${i + 1}`}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <p className="text-lg text-muted-foreground">{product.brand}</p>
                </div>
                <div className="flex space-x-2">
                  <AddToWishlistButton productId={product.id} />
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-500 text-yellow-500" : "fill-muted text-muted"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold">${product.price.toLocaleString()}</div>
              {product.originalPrice && (
                <div className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString()}
                </div>
              )}
              {product.originalPrice && (
                <Badge className="bg-green-600 hover:bg-green-700">
                  Save ${(product.originalPrice - product.price).toLocaleString()}
                </Badge>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex space-x-2">
                {["Silver", "Blue", "Black", "Rose Gold"].map((color) => (
                  <Button
                    key={color}
                    variant="outline"
                    className="rounded-full h-10 w-10 p-0 border-2 flex items-center justify-center"
                  >
                    <span className="sr-only">{color}</span>
                    <span
                      className={`h-6 w-6 rounded-full ${
                        color === "Silver"
                          ? "bg-gray-300"
                          : color === "Blue"
                            ? "bg-blue-600"
                            : color === "Black"
                              ? "bg-black"
                              : "bg-rose-400"
                      }`}
                    ></span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Size</h3>
              <div className="flex space-x-2">
                {["38mm", "42mm", "44mm"].map((size) => (
                  <Button key={size} variant="outline" className="rounded-md">
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <AddToCartButton productId={product.id} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Free shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">2-year warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">30-day returns</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Check className="h-5 w-5" />
              <span>In stock and ready to ship</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="mt-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Features</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Platinum case with polished and satin-finished surfaces</li>
                <li>Blue sunburst dial with applied hour markers</li>
                <li>Self-winding mechanical movement</li>
                <li>70-hour power reserve</li>
                <li>Water-resistant to 100 meters</li>
                <li>Sapphire crystal case back</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="py-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["Case Material", "Platinum"],
                  ["Case Diameter", "42mm"],
                  ["Movement", "Automatic"],
                  ["Power Reserve", "70 hours"],
                  ["Water Resistance", "100m"],
                  ["Crystal", "Sapphire with anti-reflective coating"],
                  ["Dial", "Blue sunburst"],
                  ["Bracelet", "Platinum with folding clasp"],
                ].map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <ProductReviews productId={product.id} />
          </TabsContent>
        </Tabs>

        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  )
}
