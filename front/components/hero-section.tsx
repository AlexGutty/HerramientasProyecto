import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Luxury watches background"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
      </div>
      <div className="relative z-10 container flex flex-col items-center justify-center space-y-4 px-4 py-32 md:py-56 text-center text-white">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">Timeless Elegance</h1>
          <p className="mx-auto max-w-[700px] text-lg md:text-xl/relaxed lg:text-xl/relaxed xl:text-2xl/relaxed">
            Discover our exclusive collection of luxury timepieces crafted with precision and elegance
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
            <Link href="/catalog">
              Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            <Link href="/about">Our Story</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
