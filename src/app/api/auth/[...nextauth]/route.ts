import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

interface CustomUser extends User {
  id: string;
}

interface CustomSession extends Session {
  user: CustomUser;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Simple direct comparison for testing
          if (
            credentials.email === "admin@example.com" &&
            credentials.password === "admin123"
          ) {
            return {
              id: "1",
              email: credentials.email,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }): Promise<CustomSession> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
