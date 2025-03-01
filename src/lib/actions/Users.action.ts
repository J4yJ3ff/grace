"use server";

import { z } from "zod";
import { getPayloadClient } from "../payload";
import { NextRequest } from "next/server";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { User } from "payload";

const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function createUser(
  credentials: z.infer<typeof AuthCredentialsValidator>
) {
  const { email, password } = AuthCredentialsValidator.parse(credentials);
  const payload = await getPayloadClient();

  // Check if user already exists
  const { docs: users } = await payload.find({
    collection: "users",
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (users.length !== 0) {
    return { success: false, error: "User already exists. Sign in instead" };
  }

  await payload.create({
    collection: "users",
    data: {
      email,
      password,
      role: "user",
    },
  });
  return { success: true, sentToEmail: email };
}

export async function verifyEmail(token: string) {
  const payload = await getPayloadClient();

  try {
    const isVerified = await payload.verifyEmail({
      collection: "users",
      token,
    });

    if (!isVerified) {
      return { success: false, error: "Invalid or expired token" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error verifying email:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export const getServerSideUser = async (
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies
) => {
  const token = cookies.get("payload-token")?.value;

  const meRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );
  const { user } = (await meRes.json()) as { user: User | null };

  return { user };
};

export async function getUserOrders() {
  const payload = await getPayloadClient();

  try {
    const { user } = await payload.auth.getMe();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const { docs: orders } = await payload.find({
      collection: "orders",
      where: {
        user: {
          equals: user.id,
        },
      },
      depth: 2, // Include product details
    });

    return { success: true, orders };
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return { success: false, error: "Failed to fetch orders" };
  }
}
