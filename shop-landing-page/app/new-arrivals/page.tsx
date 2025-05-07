"use client"
import ProductCard from "@/components/product-card"

export default function NewArrivalsPage() {
  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">New Arrivals</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover our latest products, fresh off the runway
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

// Sample Data
const newArrivals = [
  {
    id: 1,
    name: "Oversized Blazer",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    reviewCount: 8,
    onSale: false,
    category: "women",
    isNew: true,
  },
  {
    id: 2,
    name: "Linen Button-Up Shirt",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 6,
    onSale: false,
    category: "men",
    isNew: true,
  },
  {
    id: 3,
    name: "Leather Tote Bag",
    price: 129.99,
    salePrice: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    reviewCount: 4,
    onSale: true,
    category: "accessories",
    isNew: true,
  },
  {
    id: 4,
    name: "Pleated Midi Skirt",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 3,
    onSale: false,
    category: "women",
    isNew: true,
  },
  {
    id: 5,
    name: "Slim Fit Denim Jacket",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    reviewCount: 7,
    onSale: false,
    category: "men",
    isNew: true,
  },
  {
    id: 6,
    name: "Statement Necklace",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 5,
    onSale: false,
    category: "accessories",
    isNew: true,
  },
  {
    id: 7,
    name: "Ribbed Knit Sweater",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 2,
    onSale: false,
    category: "women",
    isNew: true,
  },
  {
    id: 8,
    name: "Cargo Pants",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviewCount: 9,
    onSale: false,
    category: "men",
    isNew: true,
  },
]
