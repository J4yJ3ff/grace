"use server";
import { Payload } from "@/lib/payload";

export async function getProducts() {
  return await Payload().then((payload) => {
    return payload.find({
      collection: "products",
      sort: "-publishedAt",
    });
  });
}
