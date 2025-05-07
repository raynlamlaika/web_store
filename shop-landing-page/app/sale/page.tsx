"use client"
import ProductCard from "@/components/product-card"

export default function SalePage() {
  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sale</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Shop our limited-time offers and save big on premium products
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {saleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

// Sample Data
const saleProducts = [
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
  },
  {
    id: 2,
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
    id: 3,
    name: "Leather Crossbody Bag",
    price: 89.99,
    salePrice: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 16,
    isNew: false,
    onSale: true,
  },
  {
    id: 4,
    name: "Slim Fit Chinos",
    price: 59.99,
    salePrice: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 28,
    isNew: false,
    onSale: true,
  },
  {
    id: 5,
    name: "Summer Dress",
    price: 69.99,
    salePrice: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 22,
    isNew: false,
    onSale: true,
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    price: 129.99,
    salePrice: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    reviewCount: 56,
    isNew: false,
    onSale: true,
  },
  {
    id: 7,
    name: "Silk Blouse",
    price: 69.99,
    salePrice: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 22,
    isNew: false,
    onSale: true,
  },
  {
    id: 8,
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
