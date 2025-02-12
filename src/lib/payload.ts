"use server";

import { getPayload } from "payload";

import config from "@payload-config";

export async function Payload() {
  return await getPayload({ config });
}
