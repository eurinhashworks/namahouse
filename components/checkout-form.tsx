"use client"

import { useState } from "react"
import { MessageCircle, MapPin, User, ArrowRight } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/data"

export function CheckoutForm() {
  const { totalPrice, generateWhatsAppLink, items } = useCart()
  const [name, setName] = useState("")
  const [city, setCity] = useState("")

  const isFormValid = name.trim().length > 0 && city.trim().length > 0 && items.length > 0

  const handleSubmit = () => {
    if (!isFormValid) return
    const whatsappLink = generateWhatsAppLink(name.trim(), city.trim())
    window.open(whatsappLink, "_blank")
  }

  return (
    <div className="fixed bottom-20 md:bottom-0 left-0 right-0 glass border-t border-border/50 p-4 space-y-4 shadow-elevated">
      {/* Customer info */}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-muted-foreground transition-all min-h-[48px]"
          />
        </div>
        <div className="relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Votre ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-muted-foreground transition-all min-h-[48px]"
          />
        </div>
      </div>

      {/* Total and CTA */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Total</p>
          <p className="text-2xl font-bold text-foreground">{formatPrice(totalPrice)}</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="flex-1 max-w-[260px] flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] disabled:bg-muted disabled:text-muted-foreground text-white font-semibold py-4 px-6 rounded-xl transition-all min-h-[56px] shadow-soft hover:shadow-elevated group"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Commander</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
