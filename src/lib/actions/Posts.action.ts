// getPost.ts
"use server";

import { Payload } from "@/lib/payload";

export async function getPost() {
  return await Payload().then((payload) => {
    return payload.find({
      collection: "posts",
      draft: false,
      sort: "-publishedAt",
    });
  });
}

export async function getPostBySlug(slug: string) {
  return await Payload().then((payload) => {
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
