import { PrimaryActionEmailHtml } from "@/components/emails/PrimaryActionEmail";
import { Access, CollectionConfig } from "payload";

const adminsAndUser: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;

  return {
    id: {
      equals: user?.id,
    },
  };
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return PrimaryActionEmailHtml({
          actionLabel: "verify your account",
          buttonText: "Verify Account",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
        });
      },
    },
  },
  access: {
    read: adminsAndUser,
    create: () => true,
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  admin: {
    useAsTitle: "email",
    description: "User accounts for Grace's portfolio website",
    defaultColumns: ["email", "name", "role"],
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "password",
      type: "text",
      required: true,
    },
    {
      name: "products",
      label: "Products",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "product_files",
      label: "Product files",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "product_files",
      hasMany: true,
    },
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
      defaultValue: "user",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: false,
    },
    {
      name: "bio",
      type: "textarea",
      required: false,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "banner",
      type: "upload",
      relationTo: "media",
      required: false,
    },
  ],
};
