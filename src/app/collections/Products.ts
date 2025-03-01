import { stripe } from "@/lib/stripe";
import type {
  CollectionConfig,
  CollectionBeforeChangeHook,
  CollectionAfterChangeHook,
  Access,
  User,
} from "payload";

// export type Product = {
//   name: string
//   description: string
//   price: number
//   category: string
//   product_files: string
//   priceId: string
//   stripeId: string
//   productImages: {
//     image: string
//   }[]
//   user: string | User
// }

const addUser: CollectionBeforeChangeHook<Product> = async ({
  req,
  data,
  operation,
}) => {
  if (operation === "create") {
    const user = req.user;
    return { ...data, user: user?.id };
  }
};

const syncUser: CollectionAfterChangeHook<Product> = async ({ req, doc }) => {
  const fullUser = await req.payload.findByID({
    collection: "users",
    id: req.user?.id,
  });

  if (fullUser && typeof fullUser === "object") {
    const { products } = fullUser;

    const allIDs = [
      ...(products?.map((product) =>
        typeof product === "object" ? product.id : product
      ) || []),
    ];

    const createdProductIDs = allIDs.filter(
      (id, index) => allIDs.indexOf(id) === index
    );

    const dataToUpdate = [...createdProductIDs, doc.id];

    await req.payload.update({
      collection: "users",
      id: fullUser.id,
      data: {
        products: dataToUpdate,
      },
    });
  }
};

// Only admin can create/update/delete products
const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  return false;
};

// Admin can see all products, users can only see published products
const productsAccess: Access = ({ req: { user } }) => {
  // Admin can see all products
  if (user?.role === "admin") return true;

  // Public access to view products (for store page)
  return false;
};

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    defaultColumns: ["name", "price", "category", "id"],
    useAsTitle: "name",
    group: "E-commerce",
    description: "Products for Grace's portfolio website",
  },
  access: {
    read: productsAccess,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      addUser,
      async (args) => {
        if (args.operation === "create") {
          const data = args.data as Product;

          const createdProduct = await stripe.products.create({
            name: data.name,
            default_price_data: {
              currency: "USD",
              unit_amount: Math.round(data.price * 100),
            },
          });

          const updated: Product = {
            ...data,
            stripeId: createdProduct.id,
            priceId: createdProduct.default_price as string,
          };

          return updated;
        } else if (args.operation === "update") {
          const data = args.data as Product;

          const updatedProduct = await stripe.products.update(data.stripeId!, {
            name: data.name,
            default_price: data.priceId!,
          });

          const updated: Product = {
            ...data,
            stripeId: updatedProduct.id,
            priceId: updatedProduct.default_price as string,
          };

          return updated;
        }
      },
    ],
    afterChange: [syncUser],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },

    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Product details",
    },
    {
      name: "price",
      label: "Price in USD",
      type: "number",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "relationship",
      relationTo: "categories",
    },
    {
      name: "product_files",
      label: "Product file(s)",
      type: "relationship",
      relationTo: "product_files",
      hasMany: false,
      required: true,
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "productImages",
      type: "array",
      minRows: 1,
      maxRows: 4,
      label: "Product images",
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
