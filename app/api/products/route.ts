import { NextResponse } from "next/server";
import { getProducts, getProductById, searchProducts, getProductsByCategory } from "@/lib/product-service";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  try {
    if (id) {
      const product = await getProductById(id);
      if (!product) {
        return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 });
      }
      return NextResponse.json(product);
    }

    if (search) {
      const products = await searchProducts(search);
      return NextResponse.json(products);
    }

    if (category) {
      const products = await getProductsByCategory(category);
      return NextResponse.json(products);
    }

    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Vérifier l'authentification de l'administrateur
  // const session = await auth.api.getSession({ headers: request.headers });
  // if (!session || session.user.role !== "admin") {
  //   return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  // }

  try {
    const data = await request.json();
    // Validation des données ici
    
    // const product = await createProduct(data);
    // return NextResponse.json(product, { status: 201 });
    
    // Pour l'instant, retourner une réponse simulée
    return NextResponse.json({ message: "Produit créé avec succès" }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}