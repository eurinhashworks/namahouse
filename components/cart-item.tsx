"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { type CartItem as CartItemType, formatPrice, ORIGIN_FLAGS } from "@/lib/data"
import { useCart } from "@/lib/cart-context"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex gap-4 p-4 bg-card rounded-2xl border border-border/50 shadow-soft">
      {/* Image */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-secondary/50 rounded-xl overflow-hidden">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" sizes="96px" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm">{ORIGIN_FLAGS[item.origin]}</span>
              <span className="text-xs text-muted-foreground">{item.origin}</span>
            </div>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label={`Supprimer ${item.name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity controls */}
          <div className="flex items-center gap-1 bg-secondary/60 rounded-xl p-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center bg-card rounded-lg hover:bg-accent transition-colors"
              aria-label="Reduire la quantite"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center bg-card rounded-lg hover:bg-accent transition-colors"
              aria-label="Augmenter la quantite"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Price */}
          <p className="font-bold text-primary text-lg">{formatPrice(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  )
}
