"use client"

import { DashboardMetrics } from "@/components/admin/dashboard-metrics"
import { RecentLeads } from "@/components/admin/recent-leads"
import { ContentUpdateStats } from "@/components/admin/content-update-stats"
import { PerformanceStats } from "@/components/admin/performance-stats"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAdminSession } from "@/components/admin/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminDashboard() {
  const { session, isAuthenticated, isLoading } = useAdminSession()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <DashboardMetrics />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Leads Recentes</CardTitle>
                <CardDescription>Últimos leads capturados no site</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentLeads />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atualizações de Conteúdo</CardTitle>
                <CardDescription>Histórico de atualizações recentes</CardDescription>
              </CardHeader>
              <CardContent>
                <ContentUpdateStats />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas de Visitantes</CardTitle>
              <CardDescription>Dados de visitantes dos últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {/* Gráfico de analytics será implementado aqui */}
              <div className="flex items-center justify-center h-full border border-dashed rounded-lg">
                <p className="text-muted-foreground">Dados de analytics serão exibidos aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceStats />
        </TabsContent>
      </Tabs>
    </div>
  )
}
