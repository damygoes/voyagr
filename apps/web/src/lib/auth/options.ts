import { env } from "@/config/env";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        try {
          const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });
          const user = await res.json();
          if (!res.ok) {
            const errorMessage = user?.message || "Authentication failed";
            throw new Error(errorMessage);
          }
          if (!user || !user.id) {
            throw new Error("Invalid user data received from the server");
          }
          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/auth/upsert-oauth-user`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                name: user.name ?? "",
              }),
            },
          );

          if (!res.ok) {
            console.error("Failed to upsert OAuth user");
            return false;
          }

          const dbUser = await res.json();
          if (!dbUser?.id) {
            console.error("Invalid user returned from backend");
            return false;
          }

          user.id = dbUser.id; // ✅ Pass to JWT
        } catch (error) {
          console.error("Error in OAuth sign-in flow:", error);
          return false;
        }
      }

      return true;
    },
  },
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "development"
          ? "next-auth.session-token"
          : "__Secure-next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV !== "development", // ✅ Only secure in prod
      },
    },
  },
};
