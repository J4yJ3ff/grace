// getPost.ts
"use server";

import { getPayloadClient } from "@/lib/payload";

export async function getPost() {
  return await getPayloadClient().then((payload) => {
    return payload.find({
      collection: "posts",
      draft: false,
      sort: "-publishedAt",
    });
  });
}

export async function getPostBySlug(slug: string) {
  return await getPayloadClient().then((payload) => {
    return payload.find({
      collection: "posts",
      where: {
        slug: {
          equals: slug,
        },
      },
      draft: false,
    });
  });
}
