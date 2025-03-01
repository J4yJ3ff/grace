import type {
  CollectionConfig,
  Access,
  CollectionBeforeChangeHook,
} from "payload";

// Add User type definition
type User = {
  id: string;
  role?: string;
};

const addUser: CollectionBeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null;
  return { ...data, user: user?.id };
};

// Users can only access product files they own or have purchased
const yourOwnAndPurchased: Access = async ({ req }) => {
  const user = req.user as User | null;

  if (!user) return false;
  if (user.role === "admin") return true;

  const { docs: products } = await req.payload.find({
    collection: "products",
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const ownProductFileIds = products.flatMap((prod) => prod.product_files);

  const { docs: orders } = await req.payload.find({
    collection: "orders",
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const purchasedProductFileIds = orders
    .map((order) => {
      return order.products.map((product) => {
        if (typeof product === "string")
          return req.payload.logger.error(
            "Search depth not sufficient to find purchased file IDs"
          );

        return typeof product.product_files === "string"
          ? product.product_files
          : product.product_files.id;
      });
    })
    .filter(Boolean)
    .flat();

  return {
    id: {
      in: [...ownProductFileIds, ...purchasedProductFileIds],
    },
  };
};

// Only admin can create/update/delete product files
const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  return false;
};

const preserveFilename: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
}) => {
  if (!data.filename && originalDoc) {
    // Preserve the existing filename if it's not provided in the update
    data.filename = originalDoc.filename;
  }
  return data;
};

export const ProductFiles: CollectionConfig = {
  slug: "product_files",
  admin: {
    useAsTitle: "filename",
    description: "Digital files for products",
    group: "E-commerce",
    hidden: ({ user }) => !user || user?.role !== "admin",
  },
  hooks: {
    beforeChange: [addUser, preserveFilename],
  },
  access: {
    read: yourOwnAndPurchased,
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
  },
  upload: {
    staticURL: "/product_files",
    staticDir: "product_files",
    mimeTypes: ["image/*", "font/*", "application/postscript"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        condition: () => false,
      },
      hasMany: false,
      required: true,
    },
    {
      name: "description",
      type: "text",
      admin: {
        description: "Description of the file",
      },
    },
  ],
};
