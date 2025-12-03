"use client"

import type { Product } from "@/lib/data"
import { ProductCard } from "./product-card"
import { Package, RefreshCw } from "lucide-react"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-up">
        <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mb-6">
          <Package className="w-10 h-10 text-primary" />
        </div>
        <h3 className="font-semibold text-xl mb-2">Aucun produit trouve</h3>
        <p className="text-muted-foreground text-sm max-w-xs mb-6">
          Essayez de modifier vos filtres ou votre recherche pour trouver ce que vous cherchez
        </p>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 text-primary font-medium hover:underline"
        >
          <RefreshCw className="w-4 h-4" />
          Reinitialiser les filtres
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pb-8">
      {products.map((product, index) => (
        <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
