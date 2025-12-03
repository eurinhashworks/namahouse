"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, Package, Grid3X3, Globe, Wallet } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { AdminProductModal } from "@/components/admin-product-modal"
import { products as initialProducts, type Product, formatPrice, ORIGIN_FLAGS, DELIVERY_TIMES } from "@/lib/data"
import Image from "next/image"

export default function AdminPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>()

  const handleAddProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    }
    setProductList((prev) => [...prev, newProduct])
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDeleteProduct = (productId: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== productId))
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProduct(undefined)
  }

  const stats = [
    { label: "Produits", value: productList.length, icon: Package, color: "bg-primary/10 text-primary" },
    { label: "Categories", value: 4, icon: Grid3X3, color: "bg-accent text-accent-foreground" },
    { label: "Origines", value: 4, icon: Globe, color: "bg-accent text-accent-foreground" },
    {
      label: "Valeur",
      value: formatPrice(productList.reduce((sum, p) => sum + p.price, 0)),
      icon: Wallet,
      color: "bg-primary/10 text-primary",
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Administration</h1>
              <p className="text-sm text-muted-foreground">Gerez vos produits</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-all min-h-[44px] shadow-soft hover:shadow-elevated"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Ajouter</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-card p-4 rounded-2xl border border-border/50 shadow-soft animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Product List */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-soft overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 text-sm font-medium text-muted-foreground border-b border-border/50">
              <div className="col-span-1">Image</div>
              <div className="col-span-4">Nom</div>
              <div className="col-span-2">Prix</div>
              <div className="col-span-2">Categorie</div>
              <div className="col-span-2">Origine</div>
              <div className="col-span-1">Actions</div>
            </div>

            <div className="divide-y divide-border/50">
              {productList.map((product, index) => (
                <div
                  key={product.id}
                  className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 p-4 md:p-6 md:items-center hover:bg-secondary/30 transition-colors animate-fade-up"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {/* Mobile Layout */}
                  <div className="flex gap-4 md:hidden">
                    <div className="relative w-16 h-16 flex-shrink-0 bg-secondary/50 rounded-xl overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-primary font-bold">{formatPrice(product.price)}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.category} • {ORIGIN_FLAGS[product.origin]} {product.origin}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2.5 hover:bg-secondary rounded-xl transition-colors"
                        aria-label="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2.5 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:block col-span-1">
                    <div className="relative w-12 h-12 bg-secondary/50 rounded-xl overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  </div>
                  <div className="hidden md:block col-span-4 font-semibold truncate">{product.name}</div>
                  <div className="hidden md:block col-span-2 text-primary font-bold">{formatPrice(product.price)}</div>
                  <div className="hidden md:block col-span-2 text-muted-foreground">{product.category}</div>
                  <div className="hidden md:block col-span-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{ORIGIN_FLAGS[product.origin]}</span>
                      <div>
                        <span className="text-foreground">{product.origin}</span>
                        <span className="block text-xs text-muted-foreground">{DELIVERY_TIMES[product.origin]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex col-span-1 gap-1">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-2.5 hover:bg-secondary rounded-xl transition-colors"
                      aria-label="Modifier"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2.5 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <AdminProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddProduct}
        product={editingProduct}
      />

      <BottomNav />
    </div>
  )
}
