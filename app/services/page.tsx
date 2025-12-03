"use client"

import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, CheckCircle, Star, Award, Globe } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      title: "Accompagnement d'Achat au Nigeria",
      description: "Notre service d'accompagnement complet pour les grossistes souhaitant importer directement du Nigeria.",
      features: [
        "Assistance à la recherche de fournisseurs fiables",
        "Accompagnement lors des visites de marchés",
        "Négociation des meilleurs prix",
        "Vérification de la qualité des produits",
        "Assistance logistique et transport"
      ],
      price: "À partir de 150 000 FCFA"
    },
    {
      title: "Conseil en Importation",
      description: "Expertise pour identifier les meilleures opportunités d'importation selon vos besoins.",
      features: [
        "Analyse des tendances du marché",
        "Évaluation des fournisseurs",
        "Conformité réglementaire",
        "Optimisation des coûts",
        "Gestion des risques"
      ],
      price: "Sur devis"
    },
    {
      title: "Formation aux Marchés Étrangers",
      description: "Apprenez à naviguer efficacement dans les marchés internationaux.",
      features: [
        "Compréhension des codes culturels",
        "Techniques de négociation",
        "Identification des opportunités",
        "Gestion des relations commerciales",
        "Logistique internationale"
      ],
      price: "À partir de 75 000 FCFA"
    }
  ]

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Services d'Accompagnement Premium
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Nous vous offrons des services complets pour faciliter vos importations et maximiser vos profits.
          </p>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-card p-4 rounded-2xl shadow-soft text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">4+</span>
            <p className="text-sm text-muted-foreground">Pays desservis</p>
          </div>
          
          <div className="bg-card p-4 rounded-2xl shadow-soft text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">98%</span>
            <p className="text-sm text-muted-foreground">Clients satisfaits</p>
          </div>
          
          <div className="bg-card p-4 rounded-2xl shadow-soft text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">4.9/5</span>
            <p className="text-sm text-muted-foreground">Note moyenne</p>
          </div>
          
          <div className="bg-card p-4 rounded-2xl shadow-soft text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">500+</span>
            <p className="text-sm text-muted-foreground">Missions réussies</p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Nos Services d'Accompagnement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="shadow-soft hover:shadow-elevated transition-all">
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, featIndex) => (
                      <li key={featIndex} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">{service.price}</span>
                    <Button size="sm" asChild>
                      <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "22890000000"}`}>Demander</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-card rounded-2xl shadow-soft p-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Contactez-nous pour plus d'informations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Téléphone</h3>
              <p className="text-muted-foreground text-sm">+228 90 00 00 00</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Email</h3>
              <p className="text-muted-foreground text-sm">contact@namahouse.com</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Adresse</h3>
              <p className="text-muted-foreground text-sm">Lomé, Togo</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "22890000000"}`}>
                Contacter par WhatsApp
              </Link>
            </Button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Témoignages de Nos Clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-primary">M</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">M. Adjamé</h4>
                    <p className="text-sm text-muted-foreground">Grossiste à Abidjan</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "Grâce à leur accompagnement au Nigeria, j'ai pu doubler mes bénéfices sur mes importations de perruques. Un service professionnel et fiable !"
                </p>
                <div className="flex text-yellow-400 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-primary">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">A. Koffi</h4>
                    <p className="text-sm text-muted-foreground">Entrepreneur à Lomé</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "Le service de conseil en importation m'a permis d'éviter plusieurs pièges courants. Je recommande vivement leurs services !"
                </p>
                <div className="flex text-yellow-400 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <BottomNav />
    </div>
  )
}