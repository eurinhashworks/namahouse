"use client"

import { useState, useMemo } from "react"
import { SearchIcon } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { ProductGrid } from "@/components/product-grid"
import { products } from "@/lib/data"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = useMemo(() => {
    if (searchQuery === "") return []
    return products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-6">Recherche</h1>

          {/* Search Input */}
          <div className="relative mb-6">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-12 pr-4 py-4 bg-secondary rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground min-h-[56px]"
            />
          </div>

          {/* Results */}
          {searchQuery === "" ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Tapez pour rechercher parmi nos produits</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                {filteredProducts.length} résultat{filteredProducts.length !== 1 ? "s" : ""} pour &quot;{searchQuery}
                &quot;
              </p>
              <ProductGrid products={filteredProducts} />
            </>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
