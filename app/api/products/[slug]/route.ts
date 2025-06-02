import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "../../../lib/queries/products";

export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const { slug } = context.params;

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
          error: "Product does not exists!",
        },
        {
          status: 400,
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
