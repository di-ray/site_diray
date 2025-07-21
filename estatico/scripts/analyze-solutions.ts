import fs from "fs"
import path from "path"

// Função para analisar as soluções
async function analyzeSolutions() {
  console.log("Analisando soluções e seus modelos de orçamento...")

  // Estrutura para armazenar os resultados da análise
  const analysis = {
    planBasedSolutions: [] as any[],
    calculatorBasedSolutions: [] as any[],
    allSolutions: [] as any[],
  }

  try {
    // Verificar arquivos na pasta de páginas para identificar todas as soluções
    const pagesDir = path.join(process.cwd(), "app", "(solutions)")
    const solutionFiles = fs
      .readdirSync(pagesDir)
      .filter((file) => fs.statSync(path.join(pagesDir, file)).isDirectory())
      .filter((dir) => dir !== "layout.tsx" && !dir.startsWith("_"))

    console.log("Soluções encontradas nos arquivos:", solutionFiles)

    // Verificar cada solução para determinar seu tipo
    for (const solutionSlug of solutionFiles) {
      // Verificar se existe um arquivo de calculadora específico
      const calculatorPath = path.join(pagesDir, solutionSlug, "calculator.tsx")
      const hasCustomCalculator = fs.existsSync(calculatorPath)

      // Verificar se a solução está no objeto solutionPlans (que contém planos predefinidos)
      const hasPredefinedPlans = checkForPredefinedPlans(solutionSlug)

      // Obter o título da solução do conteúdo do site
      const solutionTitle = getSolutionTitle(solutionSlug)

      // Determinar o tipo de solução
      const solutionType = hasPredefinedPlans ? "plan-based" : "calculator-based"

      // Adicionar à lista apropriada
      const solutionInfo = {
        slug: solutionSlug,
        title: solutionTitle,
        type: solutionType,
        hasCustomCalculator,
        hasPredefinedPlans,
      }

      analysis.allSolutions.push(solutionInfo)

      if (hasPredefinedPlans) {
        analysis.planBasedSolutions.push(solutionInfo)
      } else {
        analysis.calculatorBasedSolutions.push(solutionInfo)
      }
    }

    // Analisar o conteúdo de cada calculadora personalizada
    for (const solution of analysis.calculatorBasedSolutions) {
      const calculatorPath = path.join(pagesDir, solution.slug, "calculator.tsx")
      if (fs.existsSync(calculatorPath)) {
        const calculatorContent = fs.readFileSync(calculatorPath, "utf8")
        solution.calculatorVariables = extractCalculatorVariables(calculatorContent)
      }
    }

    // Exibir resultados
    console.log("\n=== ANÁLISE DE SOLUÇÕES ===\n")

    console.log("SOLUÇÕES BASEADAS EM PLANOS PREDEFINIDOS:")
    analysis.planBasedSolutions.forEach((solution) => {
      console.log(`- ${solution.title} (${solution.slug})`)
    })

    console.log("\nSOLUÇÕES COM CALCULADORAS PERSONALIZADAS:")
    analysis.calculatorBasedSolutions.forEach((solution) => {
      console.log(`- ${solution.title} (${solution.slug})`)
      if (solution.calculatorVariables && solution.calculatorVariables.length > 0) {
        console.log("  Variáveis utilizadas:")
        solution.calculatorVariables.forEach((variable: string) => {
          console.log(`  * ${variable}`)
        })
      }
    })

    // Salvar análise em um arquivo JSON
    fs.writeFileSync(path.join(process.cwd(), "scripts", "solutions-analysis.json"), JSON.stringify(analysis, null, 2))

    console.log("\nAnálise concluída e salva em scripts/solutions-analysis.json")

    return analysis
  } catch (error) {
    console.error("Erro durante a análise de soluções:", error)
    throw error
  }
}

// Função para verificar se uma solução tem planos predefinidos
function checkForPredefinedPlans(solutionSlug: string): boolean {
  // Lista de soluções que sabemos que têm planos predefinidos
  const knownPlanBasedSolutions = [
    "plano-de-comunicacao",
    "alinhamento-de-cultura",
    "workshop-de-metas",
    "estrategia-de-treinamento",
    "programa-de-desenvolvimento",
  ]

  return knownPlanBasedSolutions.includes(solutionSlug)
}

// Função para obter o título da solução
function getSolutionTitle(solutionSlug: string): string {
  // Mapeamento de slugs para títulos
  const solutionTitles: { [key: string]: string } = {
    "plano-de-comunicacao": "Plano de Comunicação",
    "alinhamento-de-cultura": "Alinhamento de Cultura",
    "workshop-de-metas": "Workshop de Metas",
    "estrategia-de-treinamento": "Estratégia de Treinamento",
    "programa-de-desenvolvimento": "Programa de Desenvolvimento",
    "consultoria-em-comunicacao": "Consultoria em Comunicação",
    "treinamento-de-lideres": "Treinamento de Líderes",
    "workshop-de-comunicacao": "Workshop de Comunicação",
    "diagnostico-de-comunicacao": "Diagnóstico de Comunicação",
    "pesquisa-de-comunicacao": "Pesquisa de Comunicação",
    "analise-de-cenario": "Análise de Cenário",
  }

  return (
    solutionTitles[solutionSlug] ||
    solutionSlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  )
}

// Função para extrair variáveis de uma calculadora personalizada
function extractCalculatorVariables(calculatorContent: string): string[] {
  const variables: string[] = []

  // Procurar por padrões comuns de variáveis em calculadoras
  // Exemplo: useState, useRef, inputs, sliders, etc.

  // Procurar por useState
  const useStateMatches = calculatorContent.match(/const\s+\[\s*(\w+)\s*,\s*set\w+\s*\]\s*=\s*useState/g)
  if (useStateMatches) {
    useStateMatches.forEach((match) => {
      const variableMatch = match.match(/const\s+\[\s*(\w+)\s*,/)
      if (variableMatch && variableMatch[1]) {
        variables.push(variableMatch[1])
      }
    })
  }

  // Procurar por inputs com name
  const inputMatches = calculatorContent.match(/name\s*=\s*["'](\w+)["']/g)
  if (inputMatches) {
    inputMatches.forEach((match) => {
      const nameMatch = match.match(/name\s*=\s*["'](\w+)["']/)
      if (nameMatch && nameMatch[1]) {
        variables.push(nameMatch[1])
      }
    })
  }

  return [...new Set(variables)] // Remover duplicatas
}

// Executar a análise
analyzeSolutions().catch((error) => {
  console.error("Erro durante a análise:", error)
})
