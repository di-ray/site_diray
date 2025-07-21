import { type NextRequest, NextResponse } from "next/server"
import os from "os"

export async function GET(request: NextRequest) {
  try {
    // Coletar métricas de desempenho do servidor
    const serverMetrics = {
      uptime: os.uptime(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      cpuUsage: os.loadavg(),
      platform: os.platform(),
      cpuCores: os.cpus().length,
      timestamp: Date.now(),
    }

    // Métricas simuladas de desempenho do site
    const siteMetrics = {
      averageResponseTime: Math.random() * 200 + 50, // 50-250ms
      cacheHitRate: Math.random() * 30 + 70, // 70-100%
      errorRate: Math.random() * 1, // 0-1%
      ttfb: Math.random() * 100 + 20, // 20-120ms
      lcp: Math.random() * 1000 + 500, // 500-1500ms
      fid: Math.random() * 50 + 10, // 10-60ms
      cls: Math.random() * 0.1, // 0-0.1
      revalidationEvents: Math.floor(Math.random() * 50), // 0-50 eventos
      lastRevalidation: new Date(Date.now() - Math.random() * 86400000).toISOString(), // Últimas 24h
    }

    return NextResponse.json({
      success: true,
      server: serverMetrics,
      site: siteMetrics,
    })
  } catch (error) {
    console.error("Erro ao buscar métricas de desempenho:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Erro ao buscar métricas de desempenho",
      },
      { status: 500 },
    )
  }
}
