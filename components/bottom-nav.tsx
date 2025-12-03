"use client"

import { Home, Search, ShoppingBag, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "Accueil" },
  { href: "/search", icon: Search, label: "Recherche" },
  { href: "/cart", icon: ShoppingBag, label: "Panier" },
  { href: "/admin", icon: Settings, label: "Admin" },
]

export function BottomNav() {
  const pathname = usePathname()
  const { totalItems } = useCart()

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="glass border border-border/50 rounded-2xl shadow-elevated">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const isCart = item.href === "/cart"

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[60px]",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <div className={cn("relative p-2 rounded-xl transition-all", isActive && "bg-primary/10")}>
                  <item.icon className={cn("w-5 h-5 transition-transform", isActive && "scale-110")} />
                  {isCart && totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </div>
                <span className={cn("text-[10px] font-medium transition-all", isActive && "font-semibold")}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
