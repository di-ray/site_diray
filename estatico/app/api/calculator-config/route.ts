import { NextResponse } from "next/server"
import { CalculatorService } from "@/lib/cms-service-calculator"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const solutionId = searchParams.get("solutionId")

  if (!solutionId) {
    return NextResponse.json({ error: "Missing solutionId parameter" }, { status: 400 })
  }

  try {
    console.log(`🔄 API: Buscando configuração da calculadora para solutionId: ${solutionId}`)
    const calculatorService = new CalculatorService()

    // Adicionar um pequeno atraso para garantir que a conexão esteja pronta
    await new Promise((resolve) => setTimeout(resolve, 500))

    const calculatorConfig = await calculatorService.getCalculatorConfig(solutionId)

    if (!calculatorConfig) {
      console.warn(`⚠️ API: Configuração da calculadora não encontrada para solutionId: ${solutionId}`)
      return NextResponse.json({ error: "Calculator configuration not found" }, { status: 404 })
    }

    console.log(`✅ API: Configuração da calculadora obtida com sucesso para solutionId: ${solutionId}`)
    return NextResponse.json(calculatorConfig)
  } catch (error) {
    console.error(`❌ API: Erro ao buscar configuração da calculadora para solutionId ${solutionId}:`, error)
    return NextResponse.json(
      {
        error: "Failed to fetch calculator configuration",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
