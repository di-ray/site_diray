import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { DatabaseConnection } from "@/lib/db-connection"
import type { RowDataPacket } from "mysql2"

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const dbConnection = DatabaseConnection.getInstance()
        const connection = await dbConnection.getConnection()

        try {
          const [users] = await connection.execute<RowDataPacket[]>("SELECT * FROM users WHERE username = ?", [
            credentials.username,
          ])

          if (users.length === 0) {
            return null
          }

          const user = users[0]

          if (!user?.password) {
            return null
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user.password)

          if (!passwordMatch) {
            return null
          }

          return {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
          }
        } catch (error) {
          console.error("Erro ao autenticar usuário:", error)
          return null
        } finally {
          await dbConnection.closeConnection()
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.uid = user.id
        token.username = user.username
      }
      return token
    },
    async session({ session, token }: any) {
      session.user = session.user || {}
      session.user.id = token.uid
      session.user.username = token.username
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
