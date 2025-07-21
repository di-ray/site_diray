"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Eye, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function DashboardMetrics() {
  const [metrics, setMetrics] = useState({
    visitors: { count: 0, change: 0 },
    pageViews: { count: 0, change: 0 },
    leads: { count: 0, change: 0 },
    conversionRate: { value: 0, change: 0 },
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Em produção, isso seria uma chamada de API real
        // Simulando dados para demonstração
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setMetrics({
          visitors: {
            count: 12458,
            change: 8.3,
          },
          pageViews: {
            count: 45672,
            change: 12.7,
          },
          leads: {
            count: 342,
            change: 5.2,
          },
          conversionRate: {
            value: 2.74,
            change: -0.8,
          },
        })
      } catch (error) {
        console.error("Erro ao buscar métricas:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Visitantes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
          ) : (
            <>
              <div className="text-2xl font-bold">{metrics.visitors.count.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metrics.visitors.change > 0 ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={metrics.visitors.change > 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(metrics.visitors.change)}%
                </span>
                <span className="ml-1">em relação ao mês anterior</span>
              </p>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
          ) : (
            <>
              <div className="text-2xl font-bold">{metrics.pageViews.count.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metrics.pageViews.change > 0 ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={metrics.pageViews.change > 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(metrics.pageViews.change)}%
                </span>
                <span className="ml-1">em relação ao mês anterior</span>
              </p>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leads</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
          ) : (
            <>
              <div className="text-2xl font-bold">{metrics.leads.count}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metrics.leads.change > 0 ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={metrics.leads.change > 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(metrics.leads.change)}%
                </span>
                <span className="ml-1">em relação ao mês anterior</span>
              </p>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
          ) : (
            <>
              <div className="text-2xl font-bold">{metrics.conversionRate.value.toFixed(2)}%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metrics.conversionRate.change > 0 ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={metrics.conversionRate.change > 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(metrics.conversionRate.change)}%
                </span>
                <span className="ml-1">em relação ao mês anterior</span>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
