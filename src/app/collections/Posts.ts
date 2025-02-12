import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "featuredImage",
      type: "upload",
      required: true,
      relationTo: "media",
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "excerpt",
      type: "text",
      required: true,
    },
    {
      name: "author",
      type: "text",
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      defaultValue: () => new Date(),
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
    },
  ],
};
