"use server";

import { auth, signIn } from "@/auth";

/**
 * Returns the user session. If no session is present, the user is redirected to the login page.
 */
export async function requireAuth() {
  const session = await auth();
  if (session) {
    return session;
  } else {
    await signIn();
  }
}
