"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface UpdateEvent {
  id: string
  page: string
  section: string
  user: string
  timestamp: string
}

export function ContentUpdateStats() {
  const [updates, setUpdates] = useState<UpdateEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Dados simulados para demonstração
    const mockUpdates = [
      {
        id: "1",
        page: "Home",
        section: "Hero",
        user: "Admin",
        timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        page: "Soluções",
        section: "Serviços",
        user: "Admin",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "3",
        page: "Contato",
        section: "Formulário",
        user: "Admin",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    setUpdates(mockUpdates)
    setIsLoading(false)

    // Conectar ao SSE para atualizações em tempo real
    const eventSource = new EventSource("/api/content-updates")

    eventSource.onopen = () => {
      setIsConnected(true)
      console.log("SSE: Conexão estabelecida")
    }

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        console.log("SSE: Evento recebido", data)

        if (data.type === "content-update") {
          // Adicionar nova atualização à lista
          const newUpdate = {
            id: data.id,
            page: data.page || "Desconhecido",
            section: data.section || "Conteúdo",
            user: data.user || "Admin",
            timestamp: data.timestamp,
          }

          setUpdates((prev) => [newUpdate, ...prev].slice(0, 5))
        }
      } catch (error) {
        console.error("Erro ao processar evento SSE:", error)
      }
    }

    eventSource.onerror = (error) => {
      console.error("Erro na conexão SSE:", error)
      setIsConnected(false)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffSec < 60) return `${diffSec} segundos atrás`
    if (diffMin < 60) return `${diffMin} minutos atrás`
    if (diffHour < 24) return `${diffHour} horas atrás`
    return `${diffDay} dias atrás`
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Atualizações recentes</p>
        <Badge variant={isConnected ? "success" : "destructive"} className="text-xs">
          {isConnected ? "Conectado" : "Desconectado"}
        </Badge>
      </div>

      {updates.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">Nenhuma atualização recente</div>
      ) : (
        <div className="space-y-3">
          {updates.map((update) => (
            <div key={update.id} className="border-b pb-3 last:border-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">
                  {update.page} - {update.section}
                </p>
                <Badge variant="outline" className="text-xs">
                  {update.user}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{formatTimeAgo(update.timestamp)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
