"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { useAdminSession } from "@/components/admin/auth-provider"

export function AdminHeader() {
  const pathname = usePathname()
  const { toast } = useToast()
  const [pageTitle, setPageTitle] = useState("Dashboard")
  const [notifications, setNotifications] = useState<any[]>([])
  const { session, logout } = useAdminSession()

  useEffect(() => {
    // Definir o título da página com base no pathname
    if (pathname === "/admin") setPageTitle("Dashboard")
    else if (pathname === "/admin/conteudo") setPageTitle("Gerenciamento de Conteúdo")
    else if (pathname === "/admin/seo") setPageTitle("SEO")
    else if (pathname === "/admin/leads") setPageTitle("Leads")
    else if (pathname === "/admin/analytics") setPageTitle("Analytics")
    else if (pathname === "/admin/configuracoes") setPageTitle("Configurações")
    else setPageTitle("Admin")

    // Simular notificações
    setNotifications([
      { id: 1, title: "Novo lead recebido", time: "5 min atrás" },
      { id: 2, title: "Conteúdo atualizado", time: "1 hora atrás" },
      { id: 3, title: "Backup automático concluído", time: "3 horas atrás" },
    ])
  }, [pathname])

  return (
    <header className="h-16 px-6 border-b bg-white flex items-center justify-between">
      <h1 className="text-xl font-semibold hidden md:block">{pageTitle}</h1>

      <div className="container mx-auto flex items-center gap-4 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 transform translate-x-1 -translate-y-1" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="cursor-pointer py-3">
                  <div>
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="py-3 text-center text-sm text-gray-500">Nenhuma notificação</div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
