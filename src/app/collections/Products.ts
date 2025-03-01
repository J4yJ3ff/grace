import { stripe } from "@/lib/stripe";
import {
  CollectionConfig,
  CollectionBeforeChangeHook,
  CollectionAfterChangeHook,
  Access,
  User,
} from "payload";

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
  // console.log("Syncing user after change", { doc });
  const fullUser = await req.payload.findByID({
    collection: "users",
    id: req.user?.id,
  });

  // console.log("Full user", fullUser);
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

    // console.log("Updating user products list", { dataToUpdate });

    await req.payload.update({
      collection: "users",
      id: fullUser.id,
      data: {
        products: dataToUpdate,
      },
    });
  } else {
    console.log("User not found or invalid user data", {
      userId: req.user?.id,
    });
  }
};

const isAdminOrHasAccess =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;

    if (!user) return false;
    if (user.role === "admin") return true;

    const userProductIDs = (
      (user.products || []) as (string | { id: string })[]
    ).reduce<Array<string>>((acc, product) => {
      if (!product) return acc;
      if (typeof product === "string") {
        acc.push(product);
      } else {
        acc.push(product.id);
      }

      return acc;
    }, []);

    return {
      id: {
        in: userProductIDs,
      },
    };
  };

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    defaultColumns: ["name", "price", "category", "id"],
    useAsTitle: "name",
  },
  access: {
    read: isAdminOrHasAccess(),
    create: isAdminOrHasAccess(),
    update: isAdminOrHasAccess(),
    delete: isAdminOrHasAccess(),
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
