"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface PerformanceData {
  server: {
    uptime: number
    totalMemory: number
    freeMemory: number
    cpuUsage: number[]
    platform: string
    cpuCores: number
    timestamp: number
  }
  site: {
    averageResponseTime: number
    cacheHitRate: number
    errorRate: number
    ttfb: number
    lcp: number
    fid: number
    cls: number
    revalidationEvents: number
    lastRevalidation: string
  }
}

export function PerformanceStats() {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  const fetchPerformanceData = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch("/api/performance")
      const data = await response.json()

      if (data.success) {
        setPerformanceData(data)
      }
    } catch (error) {
      console.error("Erro ao buscar dados de desempenho:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados de desempenho",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchPerformanceData()

    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchPerformanceData, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleRevalidateCache = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: "/",
          tag: "content",
          secret: "diray-secret-token",
        }),
      })

      const data = await response.json()

      if (data.revalidated) {
        toast({
          title: "Cache revalidado",
          description: "O cache do site foi revalidado com sucesso",
        })

        // Atualizar dados de desempenho
        fetchPerformanceData()
      } else {
        throw new Error("Falha ao revalidar cache")
      }
    } catch (error) {
      console.error("Erro ao revalidar cache:", error)
      toast({
        title: "Erro",
        description: "Não foi possível revalidar o cache",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-5 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!performanceData) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Não foi possível carregar os dados de desempenho</p>
        <Button onClick={fetchPerformanceData} className="mt-4">
          Tentar novamente
        </Button>
      </div>
    )
  }

  const { server, site } = performanceData

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Métricas de Desempenho</h2>
        <Button variant="outline" size="sm" onClick={handleRevalidateCache} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Revalidar Cache
        </Button>
      </div>

      <Tabs defaultValue="site">
        <TabsList>
          <TabsTrigger value="site">Site</TabsTrigger>
          <TabsTrigger value="server">Servidor</TabsTrigger>
        </TabsList>

        <TabsContent value="site" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tempo de Resposta</CardTitle>
                <CardDescription>Tempo médio de resposta do servidor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{site.averageResponseTime.toFixed(2)} ms</div>
                <Progress value={Math.min(100, (site.averageResponseTime / 500) * 100)} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Acerto de Cache</CardTitle>
                <CardDescription>Porcentagem de requisições servidas do cache</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{site.cacheHitRate.toFixed(1)}%</div>
                <Progress value={site.cacheHitRate} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Erro</CardTitle>
                <CardDescription>Porcentagem de requisições com erro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{site.errorRate.toFixed(2)}%</div>
                <Progress
                  value={site.errorRate * 10}
                  className="h-2 mt-2 bg-gray-200"
                  indicatorClassName="bg-red-500"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">TTFB</CardTitle>
                <CardDescription>Time to First Byte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{site.ttfb.toFixed(0)} ms</div>
                <Progress value={Math.min(100, (site.ttfb / 200) * 100)} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">LCP</CardTitle>
                <CardDescription>Largest Contentful Paint</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{site.lcp.toFixed(0)} ms</div>
                <Progress value={Math.min(100, (site.lcp / 2500) * 100)} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Revalidações</CardTitle>
                <CardDescription>Eventos de revalidação de cache</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{site.revalidationEvents}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Última: {new Date(site.lastRevalidation).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="server" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                <CardDescription>Tempo de atividade do servidor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.floor(server.uptime / 86400)}d {Math.floor((server.uptime % 86400) / 3600)}h
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Uso de Memória</CardTitle>
                <CardDescription>Memória utilizada pelo servidor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(((server.totalMemory - server.freeMemory) / server.totalMemory) * 100)}%
                </div>
                <Progress
                  value={((server.totalMemory - server.freeMemory) / server.totalMemory) * 100}
                  className="h-2 mt-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {Math.round(((server.totalMemory - server.freeMemory) / 1024 / 1024 / 1024) * 100) / 100} GB /
                  {Math.round((server.totalMemory / 1024 / 1024 / 1024) * 100) / 100} GB
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Uso de CPU</CardTitle>
                <CardDescription>Carga média da CPU</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{server.cpuUsage[0].toFixed(2)}</div>
                <Progress value={Math.min(100, (server.cpuUsage[0] * 100) / server.cpuCores)} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">{server.cpuCores} núcleos disponíveis</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
