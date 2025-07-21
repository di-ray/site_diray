import { type NextRequest, NextResponse } from "next/server"

// Dados simulados para demonstração
const mockAnalyticsData = {
  visitors: {
    total: 12458,
    unique: 8743,
    returning: 3715,
    byDay: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      visitors: Math.floor(Math.random() * 500) + 200,
    })),
  },
  pages: [
    { path: "/", views: 5432, uniqueVisitors: 4321 },
    { path: "/solucoes", views: 2345, uniqueVisitors: 1987 },
    { path: "/solucoes/alinhamento-de-cultura", views: 1234, uniqueVisitors: 987 },
    { path: "/solucoes/estrategia-de-treinamento", views: 987, uniqueVisitors: 765 },
    { path: "/solucoes/plano-de-comunicacao", views: 876, uniqueVisitors: 654 },
  ],
  sources: [
    { name: "Google", visits: 5678, percentage: 45.6 },
    { name: "Direct", visits: 2345, percentage: 18.8 },
    { name: "Social Media", visits: 1987, percentage: 15.9 },
    { name: "Referral", visits: 1543, percentage: 12.4 },
    { name: "Other", visits: 905, percentage: 7.3 },
  ],
  devices: [
    { type: "Desktop", count: 6789, percentage: 54.5 },
    { type: "Mobile", count: 4567, percentage: 36.7 },
    { type: "Tablet", count: 1102, percentage: 8.8 },
  ],
}

export async function GET(request: NextRequest) {
  try {
    // Em produção, aqui você faria uma chamada para sua API de analytics real
    // Por exemplo, Google Analytics API, Plausible, etc.

    // Simulando um pequeno atraso para parecer uma chamada de API real
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      data: mockAnalyticsData,
    })
  } catch (error) {
    console.error("Erro ao buscar dados de analytics:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Erro ao buscar dados de analytics",
      },
      { status: 500 },
    )
  }
}
