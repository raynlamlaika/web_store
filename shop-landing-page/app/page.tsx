"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Star, ChevronRight, Mail } from "lucide-react"
import ProductCard from "@/components/product-card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge variant="outline" className="inline-block mb-2">
                  New Collection
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover Our Latest Fashion Collection
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Elevate your style with our premium quality clothing and accessories. Shop the latest trends now.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="inline-flex items-center gap-2" asChild>
                  <Link href="/new-arrivals">
                    Shop Now <ShoppingBag className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/women">View Collections</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[600px] overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Hero Image"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Shop by Category</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Browse our wide selection of products across different categories
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {categories.map((category) => (
              <Link key={category.name} href={category.href} className="group relative overflow-hidden rounded-lg">
                <div className="relative h-80 w-full overflow-hidden rounded-lg">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-medium text-white">{category.name}</h3>
                    <p className="mt-1 text-sm text-white/80">{category.count} products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Products</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Discover our most popular items loved by customers
              </p>
            </div>
          </div>
          <Tabs defaultValue="all" className="mt-8">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="new">New Arrivals</TabsTrigger>
                <TabsTrigger value="sale">On Sale</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="new" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products
                  .filter((p) => p.isNew)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="sale" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products
                  .filter((p) => p.onSale)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="trending" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products
                  .filter((p) => p.trending)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-center mt-10">
            <Button variant="outline" size="lg" className="gap-1" asChild>
              <Link href="/new-arrivals">
                View All Products <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Don't just take our word for it, hear from our satisfied customers
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mb-4 italic">{testimonial.text}</p>
                  <div className="flex items-center gap-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Stay Updated</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Subscribe to our newsletter for exclusive offers, new arrivals, and fashion tips
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <form className="flex space-x-2">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" required />
                <Button type="submit" className="gap-1">
                  Subscribe <Mail className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 md:py-24 border-t">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Shop</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="/new-arrivals" className="hover:underline">
                  New Arrivals
                </Link>
                <Link href="/" className="hover:underline">
                  Best Sellers
                </Link>
                <Link href="/sale" className="hover:underline">
                  Sale
                </Link>
                <Link href="/women" className="hover:underline">
                  Collections
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Help</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="#" className="hover:underline">
                  Contact Us
                </Link>
                <Link href="#" className="hover:underline">
                  FAQs
                </Link>
                <Link href="#" className="hover:underline">
                  Shipping & Returns
                </Link>
                <Link href="#" className="hover:underline">
                  Size Guide
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">About</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="#" className="hover:underline">
                  Our Story
                </Link>
                <Link href="#" className="hover:underline">
                  Sustainability
                </Link>
                <Link href="#" className="hover:underline">
                  Careers
                </Link>
                <Link href="#" className="hover:underline">
                  Press
                </Link>
                <Link href="/admin/login" className="font-bold text-primary hover:underline">
                  Admin Login
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Legal</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="#" className="hover:underline">
                  Terms of Service
                </Link>
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:underline">
                  Cookie Policy
                </Link>
                <Link href="#" className="hover:underline">
                  Accessibility
                </Link>
              </nav>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} YourShopName. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
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
                  <span className="sr-only">Facebook</span>
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
                  <span className="sr-only">Instagram</span>
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
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample Data
const categories = [
  {
    name: "Women's Fashion",
    count: 124,
    href: "/women",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Men's Collection",
    count: 98,
    href: "/men",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Accessories",
    count: 56,
    href: "/accessories",
    image: "/placeholder.svg?height=400&width=300",
  },
]

const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    salePrice: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 42,
    isNew: false,
    onSale: true,
    trending: true,
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    reviewCount: 28,
    isNew: true,
    onSale: false,
    trending: true,
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 89.99,
    salePrice: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 16,
    isNew: false,
    onSale: true,
    trending: false,
  },
  {
    id: 4,
    name: "Oversized Sweater",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 3,
    reviewCount: 12,
    isNew: true,
    onSale: false,
    trending: false,
  },
  {
    id: 5,
    name: "Casual Sneakers",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    reviewCount: 34,
    isNew: false,
    onSale: false,
    trending: true,
  },
  {
    id: 6,
    name: "Summer Dress",
    price: 69.99,
    salePrice: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 22,
    isNew: false,
    onSale: true,
    trending: false,
  },
  {
    id: 7,
    name: "Denim Jacket",
    price: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 18,
    isNew: true,
    onSale: false,
    trending: true,
  },
  {
    id: 8,
    name: "Wireless Earbuds",
    price: 129.99,
    salePrice: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    reviewCount: 56,
    isNew: false,
    onSale: true,
    trending: true,
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "I absolutely love the quality of the clothes! The fabric is soft, durable, and the fit is perfect. Will definitely be ordering more.",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Michael Chen",
    location: "Toronto, Canada",
    text: "Fast shipping and excellent customer service. The product exceeded my expectations and I've already received compliments on my new jacket.",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Emma Williams",
    location: "London, UK",
    text: "This is my third order and I'm never disappointed. The styles are trendy yet timeless, and the prices are reasonable for the quality you get.",
    rating: 4,
    avatar: "/placeholder.svg?height=100&width=100",
  },
]
