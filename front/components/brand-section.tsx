import Image from "next/image"

export function BrandSection() {
  const brands = [
    { name: "Rolex", logo: "/placeholder.svg?height=80&width=160" },
    { name: "Patek Philippe", logo: "/placeholder.svg?height=80&width=160" },
    { name: "Audemars Piguet", logo: "/placeholder.svg?height=80&width=160" },
    { name: "Omega", logo: "/placeholder.svg?height=80&width=160" },
    { name: "Hublot", logo: "/placeholder.svg?height=80&width=160" },
    { name: "Tag Heuer", logo: "/placeholder.svg?height=80&width=160" },
  ]

  return (
    <section className="py-12 border-y border-border">
      <div className="container px-4">
        <h2 className="text-center text-xl font-medium mb-8">Featured Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <div key={brand.name} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={160}
                height={80}
                className="h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
