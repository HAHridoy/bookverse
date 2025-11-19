import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { loginUser } from "@/app/actions/auth/loginUser";

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret:
      process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Validate credentials exist
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Use loginUser to authenticate against database
          const user = await loginUser(credentials);

          if (!user) {
            return null;
          }

          // Return user object with id, name, and email
          return {
            id: user._id.toString(),
            name: user.name || user.email,
            email: user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
