import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import path from "path";
import { Media } from "@/app/collections/Media";
import { Posts } from "@/app/collections/Posts";
import { Categories } from "@/app/collections/Categories";
import { Products } from "@/app/collections/Products";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Media, Posts, Categories, Products],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(__dirname, "./payload-types.ts"),
  },
  db: mongooseAdapter({ url: process.env.DATABASE_URI || "" }),
  sharp,
});
