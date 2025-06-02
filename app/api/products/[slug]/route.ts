import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "../../../lib/queries/products";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        {
          error: "Slug parameter is required.",
        },
        {
          status: 400,
        }
      );
    }

    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        {
          error: "Product does not exist!",
        },
        {
          status: 404, // Changed to 404 for "not found"
        }
      );
    }

    return NextResponse.json(product);
  } catch (err) {
    console.log(`Error fetching the product data`, err);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      {
        status: 500,
      }
    );
  }
}
