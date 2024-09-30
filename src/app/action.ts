"use server";

import { cookies } from "next/headers";

export async function getSession() {
  const isAuth = cookies().has("refresh_token");

  return { isAuth };
}
