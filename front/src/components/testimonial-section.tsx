import Image from "next/image"
import { Star } from "lucide-react"

export function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "James Wilson",
      role: "Watch Collector",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "The quality and craftsmanship of the watches I've purchased here are exceptional. Their customer service is impeccable, making every purchase a pleasure.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sophia Chen",
      role: "Luxury Consultant",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "As someone who works in the luxury industry, I appreciate the attention to detail and authenticity guarantees. Their collection is truly world-class.",
      rating: 5,
    },
    {
      id: 3,
      name: "Robert Johnson",
      role: "CEO, Global Investments",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "I've been collecting timepieces for over 20 years, and this boutique offers some of the rarest and most exquisite watches I've seen. Highly recommended.",
      rating: 5,
    },
  ]

  return (
    <section className="bg-muted/50 py-12 md:py-24">
      <div className="container px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Clients Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Testimonials from our valued customers
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-background rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
