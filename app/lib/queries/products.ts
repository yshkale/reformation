import clientPromise from "../db";

export async function getAllProducts() {
  const client = await clientPromise;
  const db = client.db("reformation");
  const products = await db.collection("products").find().toArray();

  return products;
}

export async function getProductBySlug(slug: string | undefined) {
  const client = await clientPromise;
  const db = client.db("reformation");
  const product = await db.collection("products").findOne({ slug });

  return product;
}
