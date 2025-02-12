import { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  //   admin: {
  //     useAsTitle: "title",
  //   },
  access: {
    read: () => true,
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
