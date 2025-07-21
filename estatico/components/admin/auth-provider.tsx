"use client"

import type React from "react"
import { SessionProvider, useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

interface AuthContextProps {
  children: React.ReactNode
}

export function AdminAuthProvider({ children }: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>
}

export function useAdminSession() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const isAuthenticated = status === "authenticated"
  const isLoading = status === "loading"

  const logout = async () => {
    await signOut({ redirect: false })
    router.push("/admin/login")
  }

  return { session, isAuthenticated, isLoading, logout }
}
