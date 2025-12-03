"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { HeroSection } from "@/components/hero-section"
import { FilterBadges } from "@/components/filter-badges"
import { ProductGrid } from "@/components/product-grid"
import { products, type Product } from "@/lib/data"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeOrigin, setActiveOrigin] = useState<Product["origin"] | null>(null)
  const [activeCategory, setActiveCategory] = useState<Product["category"] | null>(null)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = searchQuery === "" || product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesOrigin = activeOrigin === null || product.origin === activeOrigin
      const matchesCategory = activeCategory === null || product.category === activeCategory

      return matchesSearch && matchesOrigin && matchesCategory
    })
  }, [searchQuery, activeOrigin, activeCategory])

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header onSearch={setSearchQuery} />
      <main>
        <HeroSection />
        <FilterBadges
          activeOrigin={activeOrigin}
          activeCategory={activeCategory}
          onOriginChange={setActiveOrigin}
          onCategoryChange={setActiveCategory}
        />
        <ProductGrid products={filteredProducts} />
      </main>
      <BottomNav />
    </div>
  )
}
