import type { Category } from "@/lib/types"

// Mock categories
const categories: Category[] = [
  {
    id: "luxury",
    name: "Luxury",
    description: "Premium luxury watches for the discerning collector",
    slug: "luxury",
  },
  {
    id: "sport",
    name: "Sport",
    description: "Durable timepieces for active lifestyles",
    slug: "sport",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Timeless designs that never go out of style",
    slug: "classic",
  },
  {
    id: "limited",
    name: "Limited Edition",
    description: "Rare and exclusive watches in limited quantities",
    slug: "limited-edition",
  },
  {
    id: "smart",
    name: "Smart Watches",
    description: "Modern timepieces with advanced technology",
    slug: "smart-watches",
  },
  {
    id: "vintage",
    name: "Vintage",
    description: "Classic timepieces with historical significance",
    slug: "vintage",
  },
]

export async function getCategories(): Promise<Category[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  return categories
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const category = categories.find((c) => c.id === id)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return category || null
}
