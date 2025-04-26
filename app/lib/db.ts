/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/db.ts
import { MongoClient } from "mongodb";

const env: string = process.env.NODE_ENV;
const uri = process.env.MONGO_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (env === "staging") {
  // Use global var in dev to prevent hot reload from creating multiple connections
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production, no global var
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
