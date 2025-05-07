"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, PlusCircle, LogOut, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex h-full flex-col">
                <div className="flex items-center border-b py-4">
                  <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
                    <Package className="h-6 w-6" />
                    <span>Shop Admin</span>
                  </Link>
                </div>
                <nav className="flex-1 overflow-auto py-4">
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/admin/dashboard"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/admin/dashboard/products"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      <Package className="h-4 w-4" />
                      Products
                    </Link>
                    <Link
                      href="/admin/dashboard/add-product"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-primary hover:bg-gray-100"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add Product
                    </Link>
                    <Link
                      href="/admin/dashboard/orders"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Orders
                    </Link>
                    <Link
                      href="/admin/dashboard/customers"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      <Users className="h-4 w-4" />
                      Customers
                    </Link>
                    <Link
                      href="/admin/dashboard/settings"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </div>
                </nav>
                <div className="border-t py-4">
                  <Button
                    variant="ghost"
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/admin/dashboard" className="hidden items-center gap-2 font-semibold md:flex">
            <Package className="h-6 w-6" />
            <span>Shop Admin</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar (desktop only) */}
        <aside className="hidden w-64 border-r bg-white md:block">
          <nav className="flex flex-col gap-1 p-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/dashboard/products"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
            >
              <Package className="h-4 w-4" />
              Products
            </Link>
            <Link
              href="/admin/dashboard/add-product"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-primary hover:bg-gray-100"
            >
              <PlusCircle className="h-4 w-4" />
              Add Product
            </Link>
            <Link
              href="/admin/dashboard/orders"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
            >
              <ShoppingBag className="h-4 w-4" />
              Orders
            </Link>
            <Link
              href="/admin/dashboard/customers"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
            >
              <Users className="h-4 w-4" />
              Customers
            </Link>
            <Link
              href="/admin/dashboard/settings"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
