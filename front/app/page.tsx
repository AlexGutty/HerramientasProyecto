import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FeaturedWatches } from "@/components/featured-watches"
import { HeroSection } from "@/components/hero-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { BrandSection } from "@/components/brand-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="container px-4 py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Collections</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our handpicked selection of luxury timepieces
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <Link href="/catalog/luxury" className="group">
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Luxury Collection"
                width={600}
                height={400}
                className="object-cover w-full h-[300px] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Luxury Collection</h3>
              <p className="text-muted-foreground mt-2">Timeless elegance for the discerning collector</p>
              <div className="flex items-center mt-4 text-sm">
                <span className="flex items-center">
                  Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
          <Link href="/catalog/sport" className="group">
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Sport Collection"
                width={600}
                height={400}
                className="object-cover w-full h-[300px] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Sport Collection</h3>
              <p className="text-muted-foreground mt-2">Precision engineering for the active lifestyle</p>
              <div className="flex items-center mt-4 text-sm">
                <span className="flex items-center">
                  Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
          <Link href="/catalog/limited" className="group">
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Limited Edition"
                width={600}
                height={400}
                className="object-cover w-full h-[300px] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Limited Edition</h3>
              <p className="text-muted-foreground mt-2">Rare and exclusive timepieces for collectors</p>
              <div className="flex items-center mt-4 text-sm">
                <span className="flex items-center">
                  Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <FeaturedWatches />
      <BrandSection />
      <TestimonialSection />

      <section className="bg-muted py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Our Newsletter</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Stay updated with our latest collections and exclusive offers
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <form className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                  placeholder="Enter your email"
                  type="email"
                  required
                />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our terms and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
