"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload } from "lucide-react"
import { type Product, ORIGIN_FLAGS } from "@/lib/data"

interface AdminProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Omit<Product, "id">) => void
  product?: Product
}

const origins: Product["origin"][] = ["Nigeria", "Dubai", "Togo", "France"]
const categories: Product["category"][] = ["Bags", "Wigs", "Shoes", "Cosmetics"]

const categoryLabels: Record<Product["category"], string> = {
  Bags: "Sacs",
  Wigs: "Perruques",
  Shoes: "Chaussures",
  Cosmetics: "Cosmétiques",
}

export function AdminProductModal({ isOpen, onClose, onSave, product }: AdminProductModalProps) {
  const [name, setName] = useState(product?.name || "")
  const [price, setPrice] = useState(product?.price.toString() || "")
  const [category, setCategory] = useState<Product["category"]>(product?.category || "Bags")
  const [origin, setOrigin] = useState<Product["origin"]>(product?.origin || "Nigeria")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name,
      price: Number.parseInt(price) || 0,
      category,
      origin,
      image: "/placeholder.svg?height=300&width=300",
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-card w-full md:max-w-md rounded-t-2xl md:rounded-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{product ? "Modifier le produit" : "Ajouter un produit"}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nom du produit
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Sac en cuir premium"
              className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground min-h-[48px]"
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Prix (FCFA)
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 25000"
              className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground min-h-[48px]"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Catégorie
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Product["category"])}
              className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[48px]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {categoryLabels[cat]}
                </option>
              ))}
            </select>
          </div>

          {/* Origin */}
          <div className="space-y-2">
            <label htmlFor="origin" className="text-sm font-medium">
              Origine
            </label>
            <select
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value as Product["origin"])}
              className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[48px]"
            >
              {origins.map((orig) => (
                <option key={orig} value={orig}>
                  {ORIGIN_FLAGS[orig]} {orig}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload (Dummy) */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Image du produit</label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Cliquez ou glissez une image ici</p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl hover:bg-primary/90 transition-colors min-h-[56px]"
          >
            {product ? "Enregistrer les modifications" : "Ajouter le produit"}
          </button>
        </form>
      </div>
    </div>
  )
}
