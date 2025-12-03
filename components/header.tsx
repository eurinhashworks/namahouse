"use client"

import { useState } from "react"
import { Search, ShoppingBag, X, Sparkles } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface HeaderProps {
  onSearch?: (query: string) => void
}

export function Header({ onSearch }: HeaderProps) {
  const { totalItems } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch?.(value)
  }

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo with accent */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-soft group-hover:shadow-elevated transition-shadow">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight leading-none">
              Nama<span className="text-primary">House</span>
            </span>
            <span className="text-[10px] text-muted-foreground leading-none hidden sm:block">Import & Style</span>
          </div>
        </Link>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-secondary/60 hover:bg-secondary rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-card placeholder:text-muted-foreground transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Search Toggle - Mobile */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={cn(
              "md:hidden p-2.5 rounded-xl transition-all",
              searchOpen ? "bg-primary/10 text-primary" : "hover:bg-secondary text-foreground",
            )}
            aria-label="Rechercher"
          >
            {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2.5 hover:bg-secondary rounded-xl transition-all group"
            aria-label="Panier"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-soft animate-scale-in">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-4 animate-fade-up">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
              className="w-full pl-11 pr-4 py-3 bg-secondary/60 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-card placeholder:text-muted-foreground transition-all"
            />
          </div>
        </div>
      )}
    </header>
  )
}
