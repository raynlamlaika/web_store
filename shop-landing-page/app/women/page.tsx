"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import ProductCard from "@/components/product-card"

export default function WomenPage() {
  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Women's Collection</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover our latest styles for women, from casual to formal wear
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="overflow-hidden">
          <div className="relative h-80 w-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=300"
              alt="Women's Tops"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-medium text-white">Tops</h3>
              <p className="mt-1 text-sm text-white/80">T-Shirts, Blouses, Sweaters</p>
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="relative h-80 w-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=300"
              alt="Women's Bottoms"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-medium text-white">Bottoms</h3>
              <p className="mt-1 text-sm text-white/80">Jeans, Skirts, Shorts</p>
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="relative h-80 w-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=300"
              alt="Women's Dresses"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-medium text-white">Dresses</h3>
              <p className="mt-1 text-sm text-white/80">Casual, Formal, Summer</p>
            </div>
          </div>
        </Card>
      </div>

      <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {womenProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

// Sample Data
const womenProducts = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: 49.99,
    salePrice: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 28,
    isNew: false,
    onSale: true,
  },
  {
    id: 2,
    name: "High-Waisted Jeans",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    reviewCount: 42,
    isNew: true,
    onSale: false,
  },
  {
    id: 3,
    name: "Oversized Cardigan",
    price: 45.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 16,
    isNew: false,
    onSale: false,
  },
  {
    id: 4,
    name: "Silk Blouse",
    price: 69.99,
    salePrice: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 22,
    isNew: false,
    onSale: true,
  },
]
