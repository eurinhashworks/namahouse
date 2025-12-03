"use client"

import { Plus, Check, Clock } from "lucide-react"
import Image from "next/image"
import { type Product, formatPrice, DELIVERY_TIMES, ORIGIN_FLAGS } from "@/lib/data"
import { useCart } from "@/lib/cart-context"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, items } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const itemInCart = items.find((item) => item.id === product.id)

  const handleAddToCart = () => {
    addToCart(product)
    setJustAdded(true)
  }

  useEffect(() => {
    if (justAdded) {
      const timer = setTimeout(() => setJustAdded(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [justAdded])

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/50 hover:border-border">
      {/* Image */}
      <div className="relative aspect-square bg-secondary/50 overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Origin & Delivery Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-card/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl shadow-soft">
          <span className="text-sm">{ORIGIN_FLAGS[product.origin]}</span>
          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Clock className="w-3 h-3" />
            {DELIVERY_TIMES[product.origin]}
          </div>
        </div>

        {/* Quick add overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-sm line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{product.origin}</p>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <p className="font-bold text-lg text-foreground">{formatPrice(product.price)}</p>
          <button
            onClick={handleAddToCart}
            className={cn(
              "flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl transition-all duration-200",
              justAdded
                ? "bg-primary/15 text-primary scale-95"
                : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 shadow-soft",
            )}
            aria-label={`Ajouter ${product.name} au panier`}
          >
            {justAdded ? (
              <Check className="w-5 h-5" />
            ) : (
              <div className="flex items-center gap-1">
                <Plus className="w-5 h-5" />
                {itemInCart && <span className="text-xs font-bold">{itemInCart.quantity}</span>}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
