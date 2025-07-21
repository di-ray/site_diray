"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Lead {
  name: string
  email: string
  phone: string
  company?: string
  service?: string
  date: string
  time: string
}

export function RecentLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/leads")
        const data = await response.json()

        if (data.success && data.leads) {
          // Limitar a 5 leads mais recentes
          setLeads(data.leads.slice(0, 5))
        }
      } catch (error) {
        console.error("Erro ao buscar leads:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (leads.length === 0) {
    return <div className="text-center py-6 text-muted-foreground">Nenhum lead encontrado</div>
  }

  return (
    <div className="space-y-4">
      {leads.map((lead, index) => (
        <div key={index} className="flex items-start gap-4">
          <Avatar>
            <AvatarFallback>{lead.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-medium">{lead.name}</p>
              {lead.service && (
                <Badge variant="outline" className="text-xs">
                  {lead.service}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{lead.email}</p>
            <p className="text-xs text-muted-foreground">
              {lead.date} às {lead.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
