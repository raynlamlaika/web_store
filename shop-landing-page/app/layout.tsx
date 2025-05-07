import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { CartProvider } from "@/context/cart-context"
import CartDrawer from "@/components/cart-drawer"
import CheckoutModal from "@/components/checkout-modal"
// Import the AdminProvider
import { AdminProvider } from "@/context/admin-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Fashion Shop - Discover the Latest Trends",
  description: "Shop the latest fashion trends with our premium quality clothing and accessories.",
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* Wrap the CartProvider with AdminProvider */}
          <AdminProvider>
            <CartProvider>
              <Header />
              {children}
              <CartDrawer />
              <CheckoutModal />
            </CartProvider>
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
