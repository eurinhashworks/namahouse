import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
}

export async function getProductsByCategory(categoryName: string) {
  return await prisma.product.findMany({
    where: { 
      category: {
        name: categoryName,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });
}

export async function searchProducts(query: string) {
  return await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { 
          category: {
            name: { contains: query, mode: "insensitive" }
          }
        },
      ],
    },
    include: {
      category: true,
    },
  });
}

export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  stock: number;
}) {
  // Generate slug from name
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return await prisma.product.create({
    data: {
      ...data,
      slug,
    },
  });
}

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: number;
    images?: string[];
    categoryId?: string;
    stock?: number;
  }
) {
  // Generate slug from name if name is being updated
  let slug: string | undefined;
  if (data.name) {
    slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  return await prisma.product.update({
    where: { id },
    data: {
      ...data,
      ...(slug && { slug }),
    },
  });
}

export async function deleteProduct(id: string) {
  return await prisma.product.delete({
    where: { id },
  });
}