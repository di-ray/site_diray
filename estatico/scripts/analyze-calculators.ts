import fs from "fs"
import path from "path"

// Função para analisar as calculadoras
async function analyzeCalculators() {
  console.log("Analisando calculadoras de orçamento...")

  // Estrutura para armazenar os resultados da análise
  const analysis = {
    planBasedCalculators: [] as any[],
    customCalculators: [] as any[],
  }

  // Calculadoras baseadas em planos predefinidos
  analysis.planBasedCalculators = [
    {
      solutionId: "plano-de-comunicacao",
      title: "Plano de Comunicação",
      type: "plan-based",
      description: "Usa planos predefinidos baseados no tamanho da população-alvo",
      planOptions: ["Até 100 pessoas", "100 a 500 pessoas", "500 a 2000 pessoas", "Acima de 2000 pessoas"],
      implementation: "Seleção de plano via radio buttons, exibição de tabela de atividades e custos fixos",
    },
    {
      solutionId: "alinhamento-de-cultura",
      title: "Alinhamento de Cultura",
      type: "plan-based",
      description: "Usa planos predefinidos baseados no tamanho da população-alvo",
      planOptions: ["Até 100 pessoas", "100 a 1.000 pessoas", "1.000 a 5.000 pessoas"],
      implementation: "Seleção de plano via radio buttons, exibição de tabela de atividades e custos fixos",
    },
    {
      solutionId: "estrategia-de-treinamento",
      title: "Estratégia de Treinamento",
      type: "plan-based",
      description: "Usa planos predefinidos baseados no tamanho da população-alvo",
      planOptions: ["Até 100 pessoas", "100 a 500 pessoas", "500 a 2000 pessoas", "Acima de 2000 pessoas"],
      implementation: "Seleção de plano via radio buttons, exibição de tabela de atividades e custos fixos",
    },
  ]

  // Calculadoras personalizadas
  analysis.customCalculators = [
    {
      solutionId: "workshop-de-metas",
      title: "Workshop de Metas",
      type: "custom-calculator",
      description: "Usa variáveis específicas para calcular o orçamento",
      variables: [
        { name: "lowRange", label: "Pessoas com salário até R$ 12.000", type: "number" },
        { name: "midRange", label: "Pessoas com salário de R$ 12.000 a R$ 25.000", type: "number" },
        { name: "highRange", label: "Pessoas com salário acima de R$ 25.000", type: "number" },
      ],
      formula: "Cálculo complexo baseado no número de pessoas por faixa salarial, com horas e custos variáveis",
      implementation: "Inputs numéricos para cada faixa salarial, cálculo dinâmico de horas e custos",
    },
    {
      solutionId: "programa-de-desenvolvimento",
      title: "Programa de Desenvolvimento",
      type: "custom-calculator",
      description: "Usa variáveis específicas para calcular o orçamento",
      variables: [
        { name: "numTrainings", label: "Número de treinamentos", type: "number" },
        { name: "format", label: "Formato (síncrono/assíncrono)", type: "select" },
        { name: "hours", label: "Horas por sessão", type: "number" },
        { name: "sessions", label: "Número de sessões", type: "number" },
      ],
      formula: "Cálculo complexo baseado no número e tipo de treinamentos, com base fixa e custos variáveis",
      implementation: "Interface dinâmica que permite adicionar múltiplos treinamentos com características diferentes",
    },
    {
      solutionId: "consultoria-em-comunicacao",
      title: "Consultoria em Comunicação",
      type: "custom-calculator",
      description: "Usa variáveis específicas para calcular o orçamento",
      variables: [
        { name: "hoursPerWeek", label: "Horas por semana", type: "number" },
        { name: "weeks", label: "Número de semanas", type: "number" },
        { name: "hourlyRate", label: "Taxa horária", type: "number" },
      ],
      formula: "hoursPerWeek * weeks * hourlyRate",
      implementation: "Calculadora simples baseada em horas e taxa",
    },
    {
      solutionId: "treinamento-de-lideres",
      title: "Treinamento de Líderes",
      type: "custom-calculator",
      description: "Usa variáveis específicas para calcular o orçamento",
      variables: [
        { name: "participants", label: "Número de participantes", type: "number" },
        { name: "sessions", label: "Número de sessões", type: "number" },
        { name: "hoursPerSession", label: "Horas por sessão", type: "number" },
        { name: "hourlyRate", label: "Taxa horária", type: "number" },
      ],
      formula: "participants * sessions * hoursPerSession * hourlyRate / participants",
      implementation: "Calculadora baseada em participantes, sessões e horas",
    },
    {
      solutionId: "workshop-de-comunicacao",
      title: "Workshop de Comunicação",
      type: "custom-calculator",
      description: "Usa variáveis específicas para calcular o orçamento",
      variables: [
        { name: "participants", label: "Número de participantes", type: "number" },
        { name: "days", label: "Número de dias", type: "number" },
        { name: "basePrice", label: "Preço base", type: "number" },
      ],
      formula: "basePrice + (participants > 20 ? (participants - 20) * 100 : 0)",
      implementation: "Calculadora com preço base e adicional por participante",
    },
    {
      solutionId: "diagnostico-de-comunicacao",
      title: "Diagnóstico de Comunicação",
      type: "custom-calculator",
      description: "Usa variáveis específicas para calcular o orçamento",
      variables: [
        { name: "employees", label: "Número de funcionários", type: "number" },
        { name: "depth", label: "Profundidade da análise", type: "select" },
        { name: "interviews", label: "Número de entrevistas", type: "number" },
      ],
      formula:
        "employees < 100 ? 5000 : (employees < 500 ? 10000 : 15000) + (depth === 'deep' ? 5000 : 0) + (interviews * 300)",
      implementation: "Calculadora baseada em tamanho da empresa, profundidade e entrevistas",
    },
    {
      solutionId: "pesquisa-de-comunicacao",
      title: "Pesquisa de Comunicação",
      type: "custom-calculator",
      description: "Usa variáveis específicas para calcular o orçamento",
      variables: [
        { name: "employees", label: "Número de funcionários", type: "number" },
        { name: "questions", label: "Número de perguntas", type: "number" },
        { name: "analysisDepth", label: "Profundidade da análise", type: "select" },
      ],
      formula:
        "employees < 100 ? 3000 : (employees < 500 ? 6000 : 9000) + (questions > 20 ? (questions - 20) * 100 : 0) + (analysisDepth === 'deep' ? 2000 : 0)",
      implementation: "Calculadora baseada em tamanho da empresa, perguntas e profundidade",
    },
    {
      solutionId: "analise-de-cenario",
      title: "Análise de Cenário",
      type: "custom-calculator",
      description: "Usa variáveis específicas para calcular o orçamento",
      variables: [
        { name: "scope", label: "Escopo do projeto", type: "select" },
        { name: "stakeholders", label: "Número de stakeholders", type: "number" },
        { name: "deliverables", label: "Número de entregáveis", type: "number" },
      ],
      formula:
        "scope === 'small' ? 5000 : (scope === 'medium' ? 10000 : 15000) + (stakeholders * 500) + (deliverables * 1000)",
      implementation: "Calculadora baseada em escopo, stakeholders e entregáveis",
    },
  ]

  // Exibir resultados
  console.log("\n=== ANÁLISE DE CALCULADORAS DE ORÇAMENTO ===\n")

  console.log("CALCULADORAS BASEADAS EM PLANOS PREDEFINIDOS:")
  analysis.planBasedCalculators.forEach((calc) => {
    console.log(`- ${calc.title} (${calc.solutionId})`)
    console.log(`  Descrição: ${calc.description}`)
    console.log(`  Opções de planos: ${calc.planOptions.join(", ")}`)
    console.log(`  Implementação: ${calc.implementation}`)
    console.log("")
  })

  console.log("\nCALCULADORAS PERSONALIZADAS:")
  analysis.customCalculators.forEach((calc) => {
    console.log(`- ${calc.title} (${calc.solutionId})`)
    console.log(`  Descrição: ${calc.description}`)
    console.log(`  Variáveis utilizadas:`)
    calc.variables.forEach((variable: any) => {
      console.log(`    * ${variable.label} (${variable.name}): ${variable.type}`)
    })
    console.log(`  Fórmula: ${calc.formula}`)
    console.log(`  Implementação: ${calc.implementation}`)
    console.log("")
  })

  // Salvar análise em um arquivo JSON
  fs.writeFileSync(path.join(process.cwd(), "scripts", "calculators-analysis.json"), JSON.stringify(analysis, null, 2))

  console.log("\nAnálise concluída e salva em scripts/calculators-analysis.json")

  return analysis
}

// Executar a análise
analyzeCalculators().catch((error) => {
  console.error("Erro durante a análise:", error)
})
