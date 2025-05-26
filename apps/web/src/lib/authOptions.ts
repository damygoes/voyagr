import { env } from "@/config/env";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { SafeUserWithToken } from "../../../../packages/types/src/user/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials): Promise<SafeUserWithToken | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/voyagr-api`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `
                mutation Login($email: String!, $password: String!) {
                  login(email: $email, password: $password) {
                    user {
                      id
                      email
                      name
                      permissions
                    }
                    token
                  }
                }
              `,
              variables: {
                email: credentials.email,
                password: credentials.password,
              },
            }),
          });

          const { data, errors } = await res.json();

          if (errors || !data?.login?.user?.id) {
            const errorMessage =
              Array.isArray(errors) && errors.length > 0
                ? (errors[0].message ?? JSON.stringify(errors[0]))
                : "Login failed. Please try again.";

            throw new Error(errorMessage);
          }

          return {
            id: data.login.user.id,
            email: data.login.user.email,
            name: data.login.user.name,
            permissions: data.login.user.permissions,
            token: data.login.token,
          };
        } catch (error) {
          throw new Error(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
          );
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
        token.accessToken = user.token; // token returned from login/upsertOAuthUser
        token.email = user.email;
        token.name = user.name;
        token.permissions = user.permissions;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token?.id) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.accessToken = token.accessToken;
        session.user.permissions = token.permissions;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/voyagr-api`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `
                mutation UpsertOAuthUser($email: String!, $name: String!) {
                  upsertOAuthUser(email: $email, name: $name) {
                    user {
                      id
                      email
                      name
                      permissions
                    }
                    token
                  }
                }
              `,
              variables: {
                email: user.email,
                name: user.name ?? "",
              },
            }),
          });

          const { data, errors } = await res.json();

          if (errors || !data?.upsertOAuthUser?.user?.id) {
            console.error("Failed to upsert OAuth user:", errors);
            return false;
          }

          user.id = data.upsertOAuthUser.user.id;
          user.token = data.upsertOAuthUser.token;
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
        secure: process.env.NODE_ENV !== "development",
      },
    },
  },
};
