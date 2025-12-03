"use client"

import { createContext, useContext, useState, type ReactNode, useCallback } from "react"
import { type Product, type CartItem, formatPrice, WHATSAPP_NUMBER, ORIGIN_FLAGS } from "./data"

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  generateWhatsAppLink: (customerName: string, city: string) => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId)
        return
      }
      setItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    },
    [removeFromCart],
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const generateWhatsAppLink = useCallback(
    (customerName: string, city: string) => {
      const itemsList = items
        .map(
          (item) =>
            `- ${item.quantity}x ${item.name} (${ORIGIN_FLAGS[item.origin]} ${item.origin}) : ${formatPrice(item.price * item.quantity)}`,
        )
        .join("\n")

      const message = `Bonjour Nama House, je souhaite commander:\n\n${itemsList}\n\n*Total: ${formatPrice(totalPrice)}*\n\nClient: ${customerName}\nVille: ${city}`

      const encodedMessage = encodeURIComponent(message)
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
    },
    [items, totalPrice],
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        generateWhatsAppLink,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
