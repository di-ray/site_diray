"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, Search, Users, Settings, Home, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAdminSession } from "@/components/admin/auth-provider"

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { session, isAuthenticated, isLoading } = useAdminSession()

  const toggleSidebar = () => setIsOpen(!isOpen)

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Conteúdo",
      href: "/admin/conteudo",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "SEO",
      href: "/admin/seo",
      icon: <Search className="h-5 w-5" />,
    },
    {
      name: "Leads",
      href: "/admin/leads",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Configurações",
      href: "/admin/configuracoes",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <>
      <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
      </Button>

      <div
        className={cn("fixed inset-0 z-40 bg-black/50 md:hidden", isOpen ? "block" : "hidden")}
        onClick={toggleSidebar}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/admin" className="flex items-center">
            <span className="text-xl font-bold">DI.RAY Admin</span>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          >
            <Home className="h-5 w-5" />
            Voltar ao site
          </Link>
        </div>
      </aside>
    </>
  )
}
