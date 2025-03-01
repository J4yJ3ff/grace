import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import path from "path";
import { Media } from "@/app/collections/Media";
import { Posts } from "@/app/collections/Posts";
import { Categories } from "@/app/collections/Categories";
import { Products } from "@/app/collections/Products";
import { Users } from "@/app/collections/Users";
import { ProductFiles } from "@/app/collections/ProductFile";
import { Orders } from "@/app/collections/Orders";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import nodemailer from "nodemailer";

export default buildConfig({
  email: nodemailerAdapter({
    defaultFromAddress: "info@nohoaxx.com",
    defaultFromName: "Cloudenv",
    transport: nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }),
  }),
  editor: lexicalEditor(),
  collections: [
    Media,
    Posts,
    Categories,
    Products,
    Users,
    ProductFiles,
    Orders,
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(__dirname, "./payload-types.ts"),
  },
  db: mongooseAdapter({ url: process.env.DATABASE_URI || "" }),
  sharp,
});
