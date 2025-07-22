import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from "tinacms-authjs/dist/tinacms";
import bcrypt from "bcrypt";

const users = require("../../../content/users/index.json").users;

export default NextAuth({
  ...TinaAuthJSOptions({
    authProvider: new AuthJsBackendAuthProvider(),
    secret: process.env.NEXTAUTH_SECRET!,
    debug: process.env.NODE_ENV === "development"
  }),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = users.find((u: any) => 
          u.username === credentials.username || u.email === credentials.username
        );

        if (!user) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.username,
          name: user.name,
          email: user.email,
          username: user.username
        };
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username
        }
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = (user as any).username;
      }
      return token;
    }
  }
});