import clientPromise from "../db";

export async function getAllProducts() {
  const client = await clientPromise;
  const db = client.db("reformation");
  const products = await db.collection("products").find().toArray();
  return products;
}
