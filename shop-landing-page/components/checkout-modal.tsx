"use client"

import type React from "react"

import { useState } from "react"
import { X, MapPin, Phone, Mail, User } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Image from "next/image"

export default function CheckoutModal() {
  const { items, subtotal, isCheckoutOpen, setIsCheckoutOpen, clearCart } = useCart()
  const [deliveryOption, setDeliveryOption] = useState("rest-des-villes")
  const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery")
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    city: "",
    address: "",
    phone: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const deliveryFee =
    deliveryOption === "casablanca"
      ? 20
      : deliveryOption === "mohmadia"
        ? 39
        : deliveryOption === "rahma"
          ? 30
          : deliveryOption === "rabat"
            ? 35
            : 35

  const total = subtotal + deliveryFee

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the order to your backend
    alert("Order submitted successfully!")
    clearCart()
    setIsCheckoutOpen(false)
  }

  if (!isCheckoutOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{items.length} articles</h2>
            <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-start gap-4 pb-4 border-b">
                <div className="w-20 h-20 relative flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{item.name}</h3>
                    <button className="text-gray-500">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  {item.color && <p className="text-sm text-gray-600">Couleur : {item.color}</p>}
                  {item.size && <p className="text-sm text-gray-600">Taille : {item.size}</p>}
                  <p className="text-sm text-gray-600">Qté : {item.quantity}</p>
                </div>
                <div className="text-right font-medium">
                  {item.salePrice ? <span>{item.salePrice} dhs</span> : <span>{item.price} dhs</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Delivery and Total */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Livraison</span>
              <span>{deliveryFee} dhs</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{total.toFixed(2)} dhs</span>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-bold mb-4">Adresse de livraison</h3>

            <div className="space-y-4 mb-6">
              <div className="flex border rounded-md overflow-hidden">
                <div className="bg-gray-100 p-3 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-0 flex-1"
                />
              </div>

              <div className="flex border rounded-md overflow-hidden">
                <div className="bg-gray-100 p-3 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  type="text"
                  placeholder="Nom*"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="border-0 flex-1"
                />
              </div>

              <div className="flex border rounded-md overflow-hidden">
                <div className="bg-gray-100 p-3 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  type="text"
                  placeholder="Ville"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="border-0 flex-1"
                />
              </div>

              <div className="flex border rounded-md overflow-hidden">
                <div className="bg-gray-100 p-3 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  type="text"
                  placeholder="Adresse"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="border-0 flex-1"
                />
              </div>

              <div className="flex border rounded-md overflow-hidden">
                <div className="bg-gray-100 p-3 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  type="tel"
                  placeholder="Numéro de téléphone*"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="border-0 flex-1"
                />
              </div>
            </div>

            {/* Delivery Options */}
            <div className="mb-6 border rounded-md p-4">
              <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rest-des-villes" id="rest-des-villes" />
                  <Label htmlFor="rest-des-villes">RESTE DES VILLES باقي المدن</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="casablanca" id="casablanca" />
                  <Label htmlFor="casablanca">LIVRAISON CASABLANCA 20 DHS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mohmadia" id="mohmadia" />
                  <Label htmlFor="mohmadia">MOHMADIA / BOUSKOURA / BERRCHID 39 DHS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rahma" id="rahma" />
                  <Label htmlFor="rahma">LIVRAISON RAHMA /DEROUA/TITT MELIL ...30 DHS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rabat" id="rabat" />
                  <Label htmlFor="rabat">RABAT//KENITRA//SALE//TEMARA//ET REGIONS 35 DHS</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <RadioGroup defaultValue="cash-on-delivery">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
                  <Label htmlFor="cash-on-delivery">Paiement à la livraison</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Promo Code */}
            <Collapsible className="mb-6 border rounded-md">
              <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
                <span>Code Promotionnel</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-200"
                >
                  <path
                    d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <Input type="text" placeholder="Enter promo code" className="mt-2" />
              </CollapsibleContent>
            </Collapsible>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button type="submit" className="w-1/2 bg-gray-700 hover:bg-gray-800 text-white uppercase">
                Valider
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
