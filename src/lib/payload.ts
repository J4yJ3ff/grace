"use server";

import { getPayload, Payload } from "payload";
import config from "@payload-config";
import nodemailer from "nodemailer";

let cachedPayload: Payload | null = null;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  secure: false,
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const getPayloadClient = async () => {
  if (cachedPayload) {
    return cachedPayload;
  }

  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET environment variable is required");
  }

  try {
    const payload = await getPayload({
      config,
      secret: process.env.PAYLOAD_SECRET,
      email: {
        transport: transporter,
        fromAddress: "info@nohoaxx.com",
        fromName: "NoHoaxx",
      },
    });

    cachedPayload = payload;
    return payload;
  } catch (error) {
    console.error("Failed to initialize Payload client:", error);
    cachedPayload = null;
    throw error;
  }
};
