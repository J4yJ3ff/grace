"use server";
import { getPayloadClient } from "@/lib/payload";

export async function getProducts() {
  return await getPayloadClient().then((payload) => {
    return payload.find({
      collection: "products",
      sort: "-publishedAt",
    });
  });
}
