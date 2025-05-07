"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/context/admin-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogOut, Package, PlusCircle, Settings, ShoppingBag, Users } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold">Shop Admin</h2>
        </div>
        <nav className="mt-6">
          <Link href="/admin" className="flex items-center px-6 py-3 hover:bg-gray-100">
            <Package className="mr-3 h-5 w-5" />
            <span>Products</span>
          </Link>
          <Link href="/admin/add-product" className="flex items-center px-6 py-3 text-primary hover:bg-gray-100">
            <PlusCircle className="mr-3 h-5 w-5" />
            <span>Add Product</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center px-6 py-3 hover:bg-gray-100">
            <ShoppingBag className="mr-3 h-5 w-5" />
            <span>Orders</span>
          </Link>
          <Link href="/admin/customers" className="flex items-center px-6 py-3 hover:bg-gray-100">
            <Users className="mr-3 h-5 w-5" />
            <span>Customers</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center px-6 py-3 hover:bg-gray-100">
            <Settings className="mr-3 h-5 w-5" />
            <span>Settings</span>
          </Link>
          <div className="mt-auto border-t pt-4">
            <Button variant="ghost" className="flex w-full items-center px-6 py-3 hover:bg-gray-100" onClick={logout}>
              <LogOut className="mr-3 h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}
