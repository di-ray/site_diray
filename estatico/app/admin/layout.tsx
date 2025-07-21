import type React from "react"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { AdminAuthProvider } from "@/components/admin/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "DI.RAY - Painel Administrativo",
  description: "Painel administrativo para gerenciamento de conteúdo do site DI.RAY",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-gray-100 flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
        <Toaster />
      </div>
    </AdminAuthProvider>
  )
}
