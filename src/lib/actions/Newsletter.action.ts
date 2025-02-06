"use server";

import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");

export async function subscribeToNewsletter(formData: FormData) {
  const emailResult = emailSchema.safeParse(formData.get("email"));

  if (!emailResult.success) {
    return { error: emailResult.error.issues[0].message };
  }

  const email = emailResult.data;

  // Listmonk configuration (store these in environment variables)
  const LISTMONK_API_URL = process.env.LISTMONK_API_URL;
  const LISTMONK_API_USERNAME = process.env.LISTMONK_API_USERNAME;
  const LISTMONK_API_PASSWORD = process.env.LISTMONK_API_PASSWORD;
  const LISTMONK_LIST_IDS = process.env.LISTMONK_LIST_IDS; // Comma-separated list IDs
  const LISTMONK_SUBSCRIBE_STATUS = "enabled"; // or 'pending' for double opt-in

  if (
    !LISTMONK_API_URL ||
    !LISTMONK_API_USERNAME ||
    !LISTMONK_API_PASSWORD ||
    !LISTMONK_LIST_IDS
  ) {
    console.error("Listmonk configuration is missing");
    return { error: "Server configuration error" };
  }

  try {
    const response = await fetch(`${LISTMONK_API_URL}/api/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${LISTMONK_API_USERNAME}:${LISTMONK_API_PASSWORD}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        email: email,
        name: "", // Add if you want to collect names
        status: LISTMONK_SUBSCRIBE_STATUS,
        lists: LISTMONK_LIST_IDS.split(",").map(Number),
      }),
    });

    const data = await response.json();

    console.log("Listmonk API response:", data);

    if (!response.ok) {
      // Handle duplicate email case
      if (response.status === 409) {
        return { error: "This email is already subscribed" };
      }

      // Handle other errors
      const errorMessage = data.message || data.error || "Subscription failed";
      return { error: errorMessage };
    }

    return { success: true };
  } catch (error) {
    console.error("Listmonk API error:", error);
    return { error: "Failed to connect to newsletter service" };
  }
}
