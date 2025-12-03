"use client"

import { cn } from "@/lib/utils"
import { type Product, ORIGIN_FLAGS, CATEGORY_ICONS } from "@/lib/data"
import { Filter } from "lucide-react"

interface FilterBadgesProps {
  activeOrigin: Product["origin"] | null
  activeCategory: Product["category"] | null
  onOriginChange: (origin: Product["origin"] | null) => void
  onCategoryChange: (category: Product["category"] | null) => void
}

const origins: Product["origin"][] = ["Nigeria", "Dubai", "Togo", "France"]
const categories: Product["category"][] = ["Bags", "Wigs", "Shoes", "Cosmetics"]

const categoryLabels: Record<Product["category"], string> = {
  Bags: "Sacs",
  Wigs: "Perruques",
  Shoes: "Chaussures",
  Cosmetics: "Cosmetiques",
}

export function FilterBadges({ activeOrigin, activeCategory, onOriginChange, onCategoryChange }: FilterBadgesProps) {
  return (
    <div className="space-y-4 px-4 py-6" id="products">
      {/* Section header */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span className="font-medium">Filtrer par</span>
      </div>

      {/* Origin filters */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Origine</span>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button
            onClick={() => onOriginChange(null)}
            className={cn(
              "flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all min-h-[44px] border",
              activeOrigin === null
                ? "bg-primary text-primary-foreground border-primary shadow-soft"
                : "bg-card text-foreground border-border hover:border-primary/30 hover:bg-accent/50",
            )}
          >
            Tous
          </button>
          {origins.map((origin) => (
            <button
              key={origin}
              onClick={() => onOriginChange(activeOrigin === origin ? null : origin)}
              className={cn(
                "flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all min-h-[44px] border flex items-center gap-2",
                activeOrigin === origin
                  ? "bg-primary text-primary-foreground border-primary shadow-soft"
                  : "bg-card text-foreground border-border hover:border-primary/30 hover:bg-accent/50",
              )}
            >
              <span className="text-base">{ORIGIN_FLAGS[origin]}</span>
              {origin}
            </button>
          ))}
        </div>
      </div>

      {/* Category filters */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Categorie</span>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button
            onClick={() => onCategoryChange(null)}
            className={cn(
              "flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all min-h-[44px] border",
              activeCategory === null
                ? "bg-primary text-primary-foreground border-primary shadow-soft"
                : "bg-card text-foreground border-border hover:border-primary/30 hover:bg-accent/50",
            )}
          >
            Toutes
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(activeCategory === category ? null : category)}
              className={cn(
                "flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all min-h-[44px] border flex items-center gap-2",
                activeCategory === category
                  ? "bg-primary text-primary-foreground border-primary shadow-soft"
                  : "bg-card text-foreground border-border hover:border-primary/30 hover:bg-accent/50",
              )}
            >
              <span className="text-base">{CATEGORY_ICONS[category]}</span>
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
