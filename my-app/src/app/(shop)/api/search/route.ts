import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) { // Peticion HTTP
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim(); // (Trim) -> Elimina espacios en blanco

  if (!query) {
    return NextResponse.json([]);
  };

  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive", // No distingue mayusculas
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          tags: {
            equals: [query.toLowerCase()],
          },
        },
      ],
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(products);
};
