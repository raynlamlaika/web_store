"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import ProductCard from "@/components/product-card"

export default function AccessoriesPage() {
  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Accessories</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Complete your look with our stylish accessories collection
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="overflow-hidden">
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Bags"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-medium text-white">Bags</h3>
              <p className="mt-1 text-sm text-white/80">Handbags, Backpacks, Wallets</p>
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Jewelry"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-medium text-white">Jewelry</h3>
              <p className="mt-1 text-sm text-white/80">Necklaces, Earrings, Bracelets</p>
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Watches"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-medium text-white">Watches</h3>
              <p className="mt-1 text-sm text-white/80">Analog, Digital, Smart Watches</p>
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Sunglasses"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-medium text-white">Sunglasses</h3>
              <p className="mt-1 text-sm text-white/80">Designer, Polarized, Sports</p>
            </div>
          </div>
        </Card>
      </div>

      <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-6">Featured Accessories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {accessoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

// Sample Data
const accessoryProducts = [
  {
    id: 1,
    name: "Leather Crossbody Bag",
    price: 89.99,
    salePrice: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 28,
    isNew: false,
    onSale: true,
  },
  {
    id: 2,
    name: "Gold Hoop Earrings",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    reviewCount: 42,
    isNew: true,
    onSale: false,
  },
  {
    id: 3,
    name: "Minimalist Watch",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 16,
    isNew: true,
    onSale: false,
  },
  {
    id: 4,
    name: "Polarized Sunglasses",
    price: 59.99,
    salePrice: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 22,
    isNew: false,
    onSale: true,
  },
]
