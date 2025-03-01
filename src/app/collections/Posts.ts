import type { CollectionConfig } from "payload";

// Only admin can create/update/delete posts
const isAdmin = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  return false;
};

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    description: "Blog posts for Grace's portfolio website",
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
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
