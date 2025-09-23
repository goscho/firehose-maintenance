import NextAuth, { NextAuthConfig } from "next-auth";
import Authentik from "next-auth/providers/authentik";
import Logto from "next-auth/providers/logto"

var authConfig: NextAuthConfig;

if (process.env.NODE_ENV === "production") {
  authConfig = {
    providers: [
      Authentik({
        clientId: process.env.AUTHENTIK_ID,
        clientSecret: process.env.AUTHENTIK_SECRET,
        issuer: process.env.AUTHENTIK_ISSUER,
      }),
    ],
    callbacks: {},
  }
}
else {
  authConfig = {
    providers: [
      Logto({
        clientId: process.env.LOGTO_ID,
        clientSecret: process.env.LOGTO_SECRET,
        issuer: process.env.LOGTO_ISSUER
      }),
    ],
    callbacks: {},
  }
}

export const { handlers, auth, signOut, signIn } = NextAuth(authConfig);
