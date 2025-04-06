import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "@/lib/ladp";

const authConfig = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g. "Sign in with...")
      name: "LDAP Credentials",
      // `credentials` is used to generate a form on the sign-in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Benutzername",
          type: "text",
          placeholder: "max.muster",
        },
        password: { label: "Passwort", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied

        // TODO: Remove this
        if (process.env.DUMMY_AUTH === "true") {
          return {
            id: "dummy-user-id",
            name: "DummyUser",
          };
        }

        // If you return null then an error will be displayed advising the user to check their details.
        if (!credentials || !credentials.password || !credentials.username) {
          console.log("no credentials provided");
          return null;
        }

        console.debug("credentials provided", credentials);
        const ldapUser = await authenticateUser(
          credentials.username as string,
          credentials.password as string,
        );

        // Any object returned will be saved in `user` property of the JWT
        if (ldapUser) {
          console.debug("user found", ldapUser);
          return ldapUser;
        }
        console.debug("no user found");
        return null;
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async authorized({ auth }) {
      console.debug("authorized callback:", auth);
      return !!auth;
    },
    async session({ session, token, user }) {
      console.debug("session callback:", session, token, user);
      return session;
    },
    async jwt({ token, user, account, profile }) {
      console.debug("jwt callback:", token, user, account, profile);
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signOut, signIn } = NextAuth(authConfig);
