import type { Access, CollectionConfig } from "payload";

// Users can only see their own orders
const yourOwn: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;

  return {
    user: {
      equals: user?.id,
    },
  };
};

// Only admin can create/update/delete orders
const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  return false;
};

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "id",
    description: "Customer orders for Grace's products",
    group: "E-commerce",
  },
  access: {
    read: yourOwn,
    update: isAdmin,
    delete: isAdmin,
    create: ({ req }) => Boolean(req.user), // Logged in users can create orders
  },
  fields: [
    {
      name: "_isPaid",
      type: "checkbox",
      access: {
        read: ({ req }) => req.user?.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      admin: {
        hidden: true,
      },
      relationTo: "users",
      required: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: true,
    },
    {
      name: "orderDate",
      type: "date",
      admin: {
        description: "Date when the order was placed",
        position: "sidebar",
      },
      defaultValue: () => new Date(),
    },
    {
      name: "status",
      type: "select",
      defaultValue: "processing",
      options: [
        { label: "Processing", value: "processing" },
        { label: "Shipped", value: "shipped" },
        { label: "Delivered", value: "delivered" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
  ],
};
