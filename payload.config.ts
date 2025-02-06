// payload.config.ts
import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [], // Add collections later
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({ url: process.env.DATABASE_URI || "" }),
  sharp,
});
