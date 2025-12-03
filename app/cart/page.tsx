"use client"

import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { CartItem } from "@/components/cart-item"
import { CheckoutForm } from "@/components/checkout-form"
import { useCart } from "@/lib/cart-context"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { items } = useCart()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-60 md:pb-48">
        <div className="container mx-auto px-4 py-6">
          {/* Page header */}
          <div className="flex items-center gap-3 mb-6">
            <Link href="/" className="p-2 hover:bg-secondary rounded-xl transition-colors" aria-label="Retour">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Mon Panier</h1>
              {items.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {items.length} article{items.length > 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-up">
              <div className="w-24 h-24 bg-accent rounded-2xl flex items-center justify-center mb-6">
                <ShoppingBag className="w-12 h-12 text-primary" />
              </div>
              <h2 className="font-semibold text-xl mb-2">Votre panier est vide</h2>
              <p className="text-muted-foreground text-sm mb-8 max-w-xs">
                Decouvrez nos produits importes et ajoutez vos favoris au panier
              </p>
              <Link
                href="/"
                className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-soft hover:shadow-elevated min-h-[48px] flex items-center gap-2"
              >
                Voir les produits
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <CartItem item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {items.length > 0 && <CheckoutForm />}
      <BottomNav />
    </div>
  )
}
