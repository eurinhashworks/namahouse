"use client"

import { Package, Truck, ShieldCheck, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent/30 via-accent/10 to-background py-10 md:py-16 px-4">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative">
        <div className="text-center space-y-5 max-w-2xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card px-4 py-1.5 rounded-full shadow-soft text-sm">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-medium text-foreground">Livraison au Togo en 2 jours</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance leading-tight">
            Importez directement du{" "}
            <span className="text-primary relative">
              Nigeria, Dubai & France
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path
                  d="M2 6C50 2 150 2 198 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-primary/30"
                />
              </svg>
            </span>
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Qualite premium en gros et detail. Sacs, perruques, chaussures et cosmetiques livres rapidement.
          </p>

          {/* CTA */}
          <div className="pt-2">
            <Link
              href="#products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-semibold hover:bg-primary/90 transition-all shadow-soft hover:shadow-elevated group"
            >
              Decouvrir les produits
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 pt-10 md:pt-12">
          <div className="flex items-center gap-3 bg-card px-5 py-3 rounded-2xl shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <span className="text-xs text-muted-foreground block">Origine</span>
              <span className="text-sm font-semibold">4 Pays</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-card px-5 py-3 rounded-2xl shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <span className="text-xs text-muted-foreground block">Qualite</span>
              <span className="text-sm font-semibold">100% Authentique</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-card px-5 py-3 rounded-2xl shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Truck className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <span className="text-xs text-muted-foreground block">Livraison</span>
              <span className="text-sm font-semibold">2-15 jours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
