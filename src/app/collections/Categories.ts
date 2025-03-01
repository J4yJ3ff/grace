import type { CollectionConfig } from "payload";

// Only admin can create/update/delete categories
const isAdmin = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  return false;
};

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    description: "Categories for blog posts and products",
  },
  access: {
    read: isAdmin, // Everyone can read categories
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};
