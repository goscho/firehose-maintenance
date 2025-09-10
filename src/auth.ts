import NextAuth, { NextAuthConfig } from "next-auth";
import Authentik from "next-auth/providers/authentik";

const authConfig = {
  providers: [
    Authentik({
      clientId: process.env.AUTHENTIK_ID,
      clientSecret: process.env.AUTHENTIK_SECRET,
      issuer: process.env.AUTHENTIK_ISSUER,
    }),
  ],
  callbacks: {},
} satisfies NextAuthConfig;

export const { handlers, auth, signOut, signIn } = NextAuth(authConfig);
