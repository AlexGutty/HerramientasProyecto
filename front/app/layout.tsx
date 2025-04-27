import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { ShoppingCart, User, Search, Menu, X, Heart, Package2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-provider"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Deluxe Watches | Luxury Timepieces",
  description: "Discover our exclusive collection of luxury watches crafted with precision and elegance",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="relative flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                      <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                          <Package2 className="h-6 w-6" />
                          <span className="">Deluxe Watches</span>
                        </Link>
                        <Button variant="ghost" size="icon" className="ml-auto">
                          <X className="h-6 w-6" />
                        </Button>
                      </div>
                      <nav className="mt-8 flex flex-col gap-4">
                        <Link href="/" className="text-lg font-medium">
                          Home
                        </Link>
                        <Link href="/catalog" className="text-lg font-medium">
                          Catalog
                        </Link>
                        <Link href="/cart" className="text-lg font-medium">
                          Cart
                        </Link>
                        <Link href="/support" className="text-lg font-medium">
                          Support
                        </Link>
                      </nav>
                    </SheetContent>
                  </Sheet>
                  <Link href="/" className="flex items-center gap-2 font-semibold mr-6">
                    <Package2 className="h-6 w-6" />
                    <span className="hidden md:inline-block">Deluxe Watches</span>
                  </Link>
                  <nav className="hidden md:flex items-center gap-6 text-sm">
                    <Link href="/" className="font-medium transition-colors hover:text-primary">
                      Home
                    </Link>
                    <Link href="/catalog" className="font-medium transition-colors hover:text-primary">
                      Catalog
                    </Link>
                    <Link href="/support" className="font-medium transition-colors hover:text-primary">
                      Support
                    </Link>
                  </nav>
                  <div className="ml-auto flex items-center gap-2">
                    <form className="hidden md:block mr-4" action="/catalog" method="GET">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          name="search"
                          placeholder="Search..."
                          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
                        />
                      </div>
                    </form>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="/wishlist">
                        <Heart className="h-5 w-5" />
                        <span className="sr-only">Wishlist</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="/cart">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="sr-only">Cart</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="/account">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Account</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </header>
              <Suspense fallback={<p>Loading...</p>}>
                <main className="flex-1">{children}</main>
              </Suspense>
              <footer className="border-t py-12 md:py-16">
                <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Shop</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/catalog" className="text-muted-foreground hover:text-foreground">
                          All Watches
                        </Link>
                      </li>
                      <li>
                        <Link href="/catalog?category=men" className="text-muted-foreground hover:text-foreground">
                          Men's Watches
                        </Link>
                      </li>
                      <li>
                        <Link href="/catalog?category=women" className="text-muted-foreground hover:text-foreground">
                          Women's Watches
                        </Link>
                      </li>
                      <li>
                        <Link href="/catalog?sort=newest" className="text-muted-foreground hover:text-foreground">
                          New Arrivals
                        </Link>
                      </li>
                      <li>
                        <Link href="/catalog?sale=true" className="text-muted-foreground hover:text-foreground">
                          Special Offers
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/support" className="text-muted-foreground hover:text-foreground">
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/support?tab=faq" className="text-muted-foreground hover:text-foreground">
                          FAQs
                        </Link>
                      </li>
                      <li>
                        <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                          Shipping & Delivery
                        </Link>
                      </li>
                      <li>
                        <Link href="/support?tab=returns" className="text-muted-foreground hover:text-foreground">
                          Returns & Refunds
                        </Link>
                      </li>
                      <li>
                        <Link href="/support?tab=returns" className="text-muted-foreground hover:text-foreground">
                          Warranty Information
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/about" className="text-muted-foreground hover:text-foreground">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                          Careers
                        </Link>
                      </li>
                      <li>
                        <Link href="/press" className="text-muted-foreground hover:text-foreground">
                          Press
                        </Link>
                      </li>
                      <li>
                        <Link href="/affiliates" className="text-muted-foreground hover:text-foreground">
                          Affiliates
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                          Terms of Service
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                          Cookie Policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="container mt-12 border-t pt-6">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      © {new Date().getFullYear()} Deluxe Watches. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </Link>
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </Link>
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </Link>
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
