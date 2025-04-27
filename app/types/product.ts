// types/product.ts

import { ObjectId } from "mongodb";

export interface Variant {
  variantName: string;
  variantOptions: string[];
}

export interface Product {
  _id: string | ObjectId; // or ObjectId if you want, but string is easier
  name?: string;
  description?: string;
  price?: string; // because "$37.20" is a string
  comparePrice?: string; // same here
  rating?: number;
  variants?: Variant[];
  images?: string[];
  thumbnail?: string;
  slug?: string;
}
