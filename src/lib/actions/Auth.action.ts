"use server";

import { cookies } from "next/headers";
import { getServerSideUser } from "./Users.action";

export async function checkAuthStatus() {
  const cookieStore = await cookies();
  const { user } = await getServerSideUser(cookieStore);
  return !!user;
}
