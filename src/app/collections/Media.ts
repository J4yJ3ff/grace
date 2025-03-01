import type { CollectionConfig } from "payload";

// Only admin can create/update/delete media
const isAdmin = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  return false;
};

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "title",
    description: "Media files for Grace's portfolio website",
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
