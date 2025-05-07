"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Star, Heart } from "lucide-react"
import { useCart } from "@/context/cart-context"

export type ProductProps = {
  id: number
  name: string
  price: number
  salePrice?: number
  image: string
  rating: number
  reviewCount: number
  isNew?: boolean
  onSale?: boolean
  trending?: boolean
  category?: string
  color?: string
  size?: string
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.image,
      color: product.color,
      size: product.size,
      quantity: 1,
    })
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.isNew && <Badge className="absolute top-2 left-2">New</Badge>}
        {product.onSale && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Sale
          </Badge>
        )}
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-white/80 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>
      <div className="p-4">
        <h3 className="font-medium">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < product.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            {product.onSale ? (
              <>
                <span className="font-medium">${product.salePrice}</span>
                <span className="text-sm text-muted-foreground line-through">${product.price}</span>
              </>
            ) : (
              <span className="font-medium">${product.price}</span>
            )}
          </div>
          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleAddToCart}>
            <ShoppingBag className="h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </div>
  )
}
