import mysql from "mysql2/promise"
import websiteContent from "../lib/content"

// Dados de planos para cada solução
const solutionPlans = {
  "plano-de-comunicacao": [
    {
      id: "plan1",
      range: "Até 100 pessoas",
      duration: "3 semanas",
      totalHours: 72,
      totalCost: 10800,
      activities: [
        { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Entrevista com Stakeholders", duration: "1 dia útil", hours: 4.5, cost: 675 },
        { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
        { name: "Ajuste e reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
        { name: "Plano de Comunicação", duration: "5 dias úteis", hours: 40, cost: 6000 },
        { name: "Apresentação para cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Ajuste e reenvio", duration: "2 dias úteis", hours: 10, cost: 1500 },
        { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3.5, cost: 525 },
      ],
    },
    {
      id: "plan2",
      range: "100 a 500 pessoas",
      duration: "5 semanas",
      totalHours: 122,
      totalCost: 18300,
      activities: [
        { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Entrevista com Stakeholders", duration: "2 dias úteis", hours: 4.5, cost: 675 },
        { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
        { name: "Ajuste e reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
        { name: "Plano de Comunicação", duration: "10 dias úteis", hours: 80, cost: 12000 },
        { name: "Apresentação para cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Ajuste e reenvio", duration: "3 dias úteis", hours: 20, cost: 3000 },
        { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3.5, cost: 525 },
      ],
    },
    {
      id: "plan3",
      range: "500 a 2000 pessoas",
      duration: "6 semanas",
      totalHours: 172,
      totalCost: 25800,
      activities: [
        { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Entrevista com Stakeholders", duration: "3 dias úteis", hours: 4.5, cost: 675 },
        { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
        { name: "Ajuste e reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
        { name: "Plano de Comunicação", duration: "15 dias úteis", hours: 120, cost: 18000 },
        { name: "Apresentação para cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Ajuste e reenvio", duration: "5 dias úteis", hours: 30, cost: 4500 },
        { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3.5, cost: 525 },
      ],
    },
    {
      id: "plan4",
      range: "Acima de 2000 pessoas",
      duration: "8 semanas",
      totalHours: 272,
      totalCost: 40800,
      activities: [
        { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Entrevista com Stakeholders", duration: "4 dias úteis", hours: 4.5, cost: 675 },
        { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
        { name: "Ajuste e reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
        { name: "Plano de Comunicação", duration: "20 dias úteis", hours: 200, cost: 30000 },
        { name: "Apresentação para cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Ajuste e reenvio", duration: "6 dias úteis", hours: 50, cost: 7500 },
        { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3.5, cost: 525 },
      ],
    },
  ],
  "alinhamento-de-cultura": [
    {
      id: "plan1",
      range: "Até 100 pessoas",
      duration: "4 semanas",
      totalHours: 92,
      totalCost: 13800,
      activities: [
        { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Entrevista com Colaboradores", duration: "5 dias úteis", hours: 12.5, cost: 1875 },
        { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
        { name: "Ajuste e Reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
        { name: "Mapa de cultura e plano", duration: "5 dias úteis", hours: 40, cost: 6000 },
        { name: "Apresentação para cliente e CEO", duration: "1 dia útil", hours: 2, cost: 300 },
        { name: "Ajuste e Reenvio", duration: "3 dias úteis", hours: 20, cost: 3000 },
        { name: "Apresentação para outras lideranças", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3.5, cost: 525 },
      ],
    },
    {
      id: "plan2",
      range: "100 a 1.000 pessoas",
      duration: "6 semanas",
      totalHours: 162,
      totalCost: 24300,
      activities: [
        { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Entrevista com Colaboradores", duration: "9 dias úteis", hours: 22.5, cost: 3375 },
        { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
        { name: "Ajuste e Reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
        { name: "Mapa de cultura e plano", duration: "10 dias úteis", hours: 80, cost: 12000 },
        { name: "Apresentação para cliente e CEO", duration: "1 dia útil", hours: 2, cost: 300 },
        { name: "Ajuste e Reenvio", duration: "4 dias úteis", hours: 40, cost: 6000 },
        { name: "Apresentação para outras lideranças", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3.5, cost: 525 },
      ],
    },
    {
      id: "plan3",
      range: "1.000 a 5.000 pessoas",
      duration: "8 semanas",
      totalHours: 292,
      totalCost: 43800,
      activities: [
        { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Entrevista com Colaboradores", duration: "13 dias úteis", hours: 32.5, cost: 4875 },
        { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
        { name: "Ajuste e Reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
        { name: "Mapa de cultura e plano", duration: "15 dias úteis", hours: 160, cost: 24000 },
        { name: "Apresentação para cliente e CEO", duration: "1 dia útil", hours: 2, cost: 300 },
        { name: "Ajuste e Reenvio", duration: "5 dias úteis", hours: 80, cost: 12000 },
        { name: "Apresentação para outras lideranças", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3.5, cost: 525 },
      ],
    },
  ],
  "workshop-de-metas": [
    {
      id: "plan1",
      range: "Até 100 pessoas",
      duration: "2 semanas",
      totalHours: 30,
      totalCost: 4500,
      activities: [
        { name: "Reunião de Briefing", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Desenho do Workshop", duration: "3 dias úteis", hours: 12, cost: 1800 },
        { name: "Facilitação do workshop", duration: "1 dia útil", hours: 15, cost: 2250 },
        { name: "Sessão de transferência", duration: "1 dia útil", hours: 2, cost: 300 },
      ],
    },
    {
      id: "plan2",
      range: "100 a 500 pessoas",
      duration: "3 semanas",
      totalHours: 45,
      totalCost: 6750,
      activities: [
        { name: "Reunião de Briefing", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Desenho do Workshop", duration: "5 dias úteis", hours: 20, cost: 3000 },
        { name: "Facilitação do workshop", duration: "2 dias úteis", hours: 22, cost: 3300 },
        { name: "Sessão de transferência", duration: "1 dia útil", hours: 2, cost: 300 },
      ],
    },
    {
      id: "plan3",
      range: "500 a 1000 pessoas",
      duration: "4 semanas",
      totalHours: 60,
      totalCost: 9000,
      activities: [
        { name: "Reunião de Briefing", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Desenho do Workshop", duration: "7 dias úteis", hours: 28, cost: 4200 },
        { name: "Facilitação do workshop", duration: "3 dias úteis", hours: 29, cost: 4350 },
        { name: "Sessão de transferência", duration: "1 dia útil", hours: 2, cost: 300 },
      ],
    },
  ],
  "estrategia-de-treinamento": [
    {
      id: "plan1",
      range: "Até 100 pessoas",
      duration: "3 semanas",
      totalHours: 72,
      totalCost: 10800,
      activities: [
        { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Entrevista com Stakeholders", duration: "1 dia útil", hours: 3, cost: 450 },
        { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
        { name: "Ajuste e reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
        { name: "Estratégia de Treinamento", duration: "5 dias úteis", hours: 40, cost: 6000 },
        { name: "Apresentação para cliente", duration: "1 dia útil", hours: 2, cost: 300 },
        { name: "Ajuste e reenvio", duration: "2 dias úteis", hours: 10, cost: 1500 },
        { name: "Apresentação para outras lideranças", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3, cost: 450 },
      ],
    },
    {
      id: "plan2",
      range: "100 a 500 pessoas",
      duration: "5 semanas",
      totalHours: 122,
      totalCost: 18300,
      activities: [
        { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Entrevista com Stakeholders", duration: "2 dias úteis", hours: 3, cost: 450 },
        { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
        { name: "Ajuste e reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
        { name: "Estratégia de Treinamento", duration: "10 dias úteis", hours: 80, cost: 12000 },
        { name: "Apresentação para cliente", duration: "1 dia útil", hours: 2, cost: 300 },
        { name: "Ajuste e reenvio", duration: "3 dias úteis", hours: 20, cost: 3000 },
        { name: "Apresentação para outras lideranças", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3, cost: 450 },
      ],
    },
    {
      id: "plan3",
      range: "500 a 2000 pessoas",
      duration: "6 semanas",
      totalHours: 172,
      totalCost: 25800,
      activities: [
        { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Entrevista com Stakeholders", duration: "3 dias úteis", hours: 3, cost: 450 },
        { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
        { name: "Ajuste e reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
        { name: "Estratégia de Treinamento", duration: "15 dias úteis", hours: 120, cost: 18000 },
        { name: "Apresentação para cliente", duration: "1 dia útil", hours: 2, cost: 300 },
        { name: "Ajuste e reenvio", duration: "5 dias úteis", hours: 30, cost: 4500 },
        { name: "Apresentação para outras lideranças", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3, cost: 450 },
      ],
    },
    {
      id: "plan4",
      range: "Acima de 2000 pessoas",
      duration: "8 semanas",
      totalHours: 272,
      totalCost: 40800,
      activities: [
        { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "Entrevista com Stakeholders", duration: "4 dias úteis", hours: 3, cost: 450 },
        { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
        { name: "Ajuste e reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
        { name: "Estratégia de Treinamento", duration: "20 dias úteis", hours: 200, cost: 30000 },
        { name: "Apresentação para cliente", duration: "1 dia útil", hours: 2, cost: 300 },
        { name: "Ajuste e reenvio", duration: "6 dias úteis", hours: 50, cost: 7500 },
        { name: "Apresentação para outras lideranças", duration: "1 dia útil", hours: 1, cost: 150 },
        { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3, cost: 450 },
      ],
    },
  ],
}

// Mapeamento de soluções para títulos
const solutionTitles = {
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

// Configurações de calculadoras personalizadas
const calculatorConfigs = {
  "programa-de-desenvolvimento": {
    title: "Programa de Desenvolvimento",
    description: "Calcule o orçamento para programa de desenvolvimento",
    formula: "programType === 'basic' ? 22913 : (programType === 'intermediate' ? 33638 : 47138)",
    variables: [
      {
        name: "programType",
        type: "select",
        label: "Tipo de programa",
        defaultValue: "basic",
        options: [
          { value: "basic", label: "Programa Básico (7 semanas)" },
          { value: "intermediate", label: "Programa Intermediário (12 semanas)" },
          { value: "advanced", label: "Programa Avançado (16 semanas)" },
        ],
      },
    ],
  },
  "consultoria-em-comunicacao": {
    title: "Consultoria em Comunicação",
    description: "Calcule o orçamento para consultoria em comunicação",
    formula: "hoursPerWeek * weeks * hourlyRate",
    variables: [
      {
        name: "hoursPerWeek",
        type: "number",
        label: "Horas por semana",
        defaultValue: 4,
        min: 1,
        max: 40,
      },
      {
        name: "weeks",
        type: "number",
        label: "Número de semanas",
        defaultValue: 4,
        min: 1,
        max: 52,
      },
      {
        name: "hourlyRate",
        type: "number",
        label: "Taxa horária (R$)",
        defaultValue: 150,
        min: 100,
        max: 500,
      },
    ],
  },
  "treinamento-de-lideres": {
    title: "Treinamento de Líderes",
    description: "Calcule o orçamento para treinamento de líderes",
    formula: "participants * sessions * hoursPerSession * hourlyRate / participants",
    variables: [
      {
        name: "participants",
        type: "number",
        label: "Número de participantes",
        defaultValue: 10,
        min: 1,
        max: 100,
      },
      {
        name: "sessions",
        type: "number",
        label: "Número de sessões",
        defaultValue: 4,
        min: 1,
        max: 20,
      },
      {
        name: "hoursPerSession",
        type: "number",
        label: "Horas por sessão",
        defaultValue: 2,
        min: 1,
        max: 8,
        step: 0.5,
      },
      {
        name: "hourlyRate",
        type: "number",
        label: "Taxa horária (R$)",
        defaultValue: 200,
        min: 100,
        max: 500,
      },
    ],
  },
  "workshop-de-comunicacao": {
    title: "Workshop de Comunicação",
    description: "Calcule o orçamento para workshop de comunicação",
    formula: "basePrice + (participants > 20 ? (participants - 20) * 100 : 0)",
    variables: [
      {
        name: "participants",
        type: "number",
        label: "Número de participantes",
        defaultValue: 20,
        min: 5,
        max: 100,
      },
      {
        name: "days",
        type: "number",
        label: "Número de dias",
        defaultValue: 1,
        min: 1,
        max: 5,
      },
      {
        name: "basePrice",
        type: "number",
        label: "Preço base (R$)",
        defaultValue: 3000,
        min: 1000,
        max: 10000,
        step: 500,
      },
    ],
  },
  "diagnostico-de-comunicacao": {
    title: "Diagnóstico de Comunicação",
    description: "Calcule o orçamento para diagnóstico de comunicação",
    formula:
      "employees < 100 ? 5000 : (employees < 500 ? 10000 : 15000) + (depth === 'deep' ? 5000 : 0) + (interviews * 300)",
    variables: [
      {
        name: "employees",
        type: "number",
        label: "Número de funcionários",
        defaultValue: 100,
        min: 10,
        max: 5000,
      },
      {
        name: "depth",
        type: "select",
        label: "Profundidade da análise",
        defaultValue: "medium",
        options: [
          { value: "standard", label: "Padrão" },
          { value: "deep", label: "Aprofundada" },
        ],
      },
      {
        name: "interviews",
        type: "number",
        label: "Número de entrevistas",
        defaultValue: 5,
        min: 0,
        max: 50,
      },
    ],
  },
  "pesquisa-de-comunicacao": {
    title: "Pesquisa de Comunicação",
    description: "Calcule o orçamento para pesquisa de comunicação",
    formula:
      "employees < 100 ? 3000 : (employees < 500 ? 6000 : 9000) + (questions > 20 ? (questions - 20) * 100 : 0) + (analysisDepth === 'deep' ? 2000 : 0)",
    variables: [
      {
        name: "employees",
        type: "number",
        label: "Número de funcionários",
        defaultValue: 100,
        min: 10,
        max: 5000,
      },
      {
        name: "questions",
        type: "number",
        label: "Número de perguntas",
        defaultValue: 20,
        min: 5,
        max: 100,
      },
      {
        name: "analysisDepth",
        type: "select",
        label: "Profundidade da análise",
        defaultValue: "standard",
        options: [
          { value: "standard", label: "Padrão" },
          { value: "deep", label: "Aprofundada" },
        ],
      },
    ],
  },
  "analise-de-cenario": {
    title: "Análise de Cenário",
    description: "Calcule o orçamento para análise de cenário",
    formula:
      "scope === 'small' ? 5000 : (scope === 'medium' ? 10000 : 15000) + (stakeholders * 500) + (deliverables * 1000)",
    variables: [
      {
        name: "scope",
        type: "select",
        label: "Escopo do projeto",
        defaultValue: "medium",
        options: [
          { value: "small", label: "Pequeno" },
          { value: "medium", label: "Médio" },
          { value: "large", label: "Grande" },
        ],
      },
      {
        name: "stakeholders",
        type: "number",
        label: "Número de stakeholders",
        defaultValue: 5,
        min: 1,
        max: 50,
      },
      {
        name: "deliverables",
        type: "number",
        label: "Número de entregáveis",
        defaultValue: 2,
        min: 1,
        max: 20,
      },
    ],
  },
}

async function migrateAllContent() {
  console.log("Iniciando migração completa de conteúdo para o banco de dados...")

  // Configurar conexão com o banco de dados com configurações específicas para Hostgator
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "cms_db",
    connectTimeout: 60000, // Aumentar timeout para 60 segundos
    ssl: process.env.DB_SSL === "true" ? {} : undefined, // Suporte a SSL se necessário
    multipleStatements: true,
    dateStrings: true,
  })

  try {
    // Testar a conexão
    await connection.execute("SELECT 1")
    console.log("Conexão com o banco de dados estabelecida com sucesso")

    // Criar tabelas se não existirem
    await createTables(connection)

    // Import functions
    const { migrateWebsiteContent } = await import("./migrate-website-content")
    const { migrateSolutionPlans } = await import("./migrate-solution-plans")
    const { migrateCalculatorConfigs } = await import("./migrate-calculator-configs")

    // Migrar conteúdo do site
    await migrateWebsiteContent(connection, websiteContent)

    // Migrar planos de cada solução
    await migrateSolutionPlans(connection, solutionPlans, solutionTitles)

    // Migrar configurações de calculadoras personalizadas
    await migrateCalculatorConfigs(connection, calculatorConfigs, solutionTitles)

    console.log("Migração completa realizada com sucesso!")
  } catch (error) {
    console.error("Erro durante a migração:", error)
  } finally {
    await connection.end()
  }
}

async function createTables(connection: mysql.Connection) {
  console.log("Criando tabelas no banco de dados...")

  // Tabela de páginas
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS pages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      page_id VARCHAR(50) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `)

  // Tabela de seções
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS sections (
      id INT AUTO_INCREMENT PRIMARY KEY,
      page_id VARCHAR(50) NOT NULL,
      section_id VARCHAR(50) NOT NULL,
      title VARCHAR(255),
      subtitle TEXT,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_section (page_id, section_id),
      FOREIGN KEY (page_id) REFERENCES pages(page_id) ON DELETE CASCADE
    )
  `)

  // Tabela de itens
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      section_id VARCHAR(50) NOT NULL,
      item_id VARCHAR(50) NOT NULL,
      text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_item (section_id, item_id)
    )
  `)

  // Tabela de configurações globais
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS global_settings (
      id INT PRIMARY KEY DEFAULT 1,
      copyright VARCHAR(255) NOT NULL DEFAULT '© 2025 DI.RAY. Todos os direitos reservados.',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `)

  // Tabela de links de navegação
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS navigation_links (
      id INT AUTO_INCREMENT PRIMARY KEY,
      text VARCHAR(100) NOT NULL,
      href VARCHAR(255) NOT NULL,
      position INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `)

  // Tabela de links de rodapé
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS footer_links (
      id INT AUTO_INCREMENT PRIMARY KEY,
      text VARCHAR(100) NOT NULL,
      href VARCHAR(255) NOT NULL,
      position INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `)

  // Tabela de soluções
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS solutions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      solution_id VARCHAR(50) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      page_id VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `)

  // Tabela de detalhes de planos (para calculadoras de orçamento)
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS plan_details (
      id INT AUTO_INCREMENT PRIMARY KEY,
      page_id VARCHAR(50) NOT NULL,
      plan_id VARCHAR(50) NOT NULL,
      range VARCHAR(100) NOT NULL,
      duration VARCHAR(50) NOT NULL,
      total_hours DECIMAL(10,2) NOT NULL,
      total_cost DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_plan (page_id, plan_id)
    )
  `)

  // Tabela de atividades de planos
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS plan_activities (
      id INT AUTO_INCREMENT PRIMARY KEY,
      plan_detail_id INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      duration VARCHAR(50) NOT NULL,
      hours DECIMAL(10,2) NOT NULL,
      cost DECIMAL(10,2) NOT NULL,
      position INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (plan_detail_id) REFERENCES plan_details(id) ON DELETE CASCADE
    )
  `)

  // Tabela de configurações de calculadoras
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS calculator_configs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      solution_id VARCHAR(50) NOT NULL UNIQUE,
      formula TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (solution_id) REFERENCES solutions(solution_id) ON DELETE CASCADE
    )
  `)

  // Tabela de variáveis de calculadoras
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS calculator_variables (
      id INT AUTO_INCREMENT PRIMARY KEY,
      calculator_config_id INT NOT NULL,
      name VARCHAR(50) NOT NULL,
      type VARCHAR(20) NOT NULL,
      label VARCHAR(255),
      default_value VARCHAR(255),
      min FLOAT NULL,
      max FLOAT NULL,
      step FLOAT NULL,
      position INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (calculator_config_id) REFERENCES calculator_configs(id) ON DELETE CASCADE
    )
  `)

  // Tabela de opções para variáveis do tipo select
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS calculator_variable_options (
      id INT AUTO_INCREMENT PRIMARY KEY,
      variable_id INT NOT NULL,
      value VARCHAR(50) NOT NULL,
      label VARCHAR(255) NOT NULL,
      position INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (variable_id) REFERENCES calculator_variables(id) ON DELETE CASCADE
    )
  `)

  // Tabela de tipos de soluções
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS solution_types (
      id INT AUTO_INCREMENT PRIMARY KEY,
      solution_id VARCHAR(50) NOT NULL UNIQUE,
      type ENUM('plan-based', 'calculator-based') NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (solution_id) REFERENCES solutions(solution_id) ON DELETE CASCADE
    )
  `)

  console.log("Tabelas criadas com sucesso!")
}

// Função para migrar configurações de calculadoras
async function migrateCalculatorConfigs(connection: mysql.Connection, configs: any, solutionTitles: any) {
  console.log("Migrando configurações de calculadoras...")

  // Iniciar transação
  await connection.beginTransaction()

  try {
    // Para cada configuração de calculadora
    for (const [solutionId, config] of Object.entries(configs)) {
      console.log(`Migrando configuração de calculadora para: ${solutionId}`)

      // Verificar se a solução existe
      const [solutionRows] = (await connection.execute("SELECT * FROM solutions WHERE solution_id = ?", [
        solutionId,
      ])) as any

      // Se a solução não existe, criá-la
      if (solutionRows.length === 0) {
        await connection.execute("INSERT INTO solutions (solution_id, title, page_id) VALUES (?, ?, ?)", [
          solutionId,
          solutionTitles[solutionId as keyof typeof solutionTitles] || solutionId,
          solutionId,
        ])
      }

      // Definir o tipo da solução como baseada em calculadora
      await connection.execute(
        "INSERT INTO solution_types (solution_id, type) VALUES (?, ?) ON DUPLICATE KEY UPDATE type = ?",
        [solutionId, "calculator-based", "calculator-based"],
      )

      // Inserir ou atualizar a configuração da calculadora
      const [result] = (await connection.execute(
        "INSERT INTO calculator_configs (solution_id, formula) VALUES (?, ?) ON DUPLICATE KEY UPDATE formula = ?",
        [solutionId, (config as any).formula, (config as any).formula],
      )) as any

      // Obter o ID da configuração da calculadora
      let calculatorConfigId
      if (result.insertId) {
        calculatorConfigId = result.insertId
      } else {
        const [rows] = (await connection.execute("SELECT id FROM calculator_configs WHERE solution_id = ?", [
          solutionId,
        ])) as any
        calculatorConfigId = rows[0].id
      }

      // Remover variáveis existentes para esta calculadora
      await connection.execute("DELETE FROM calculator_variables WHERE calculator_config_id = ?", [calculatorConfigId])

      // Inserir variáveis da calculadora
      for (let i = 0; i < (config as any).variables.length; i++) {
        const variable = (config as any).variables[i]

        // Inserir a variável
        const [varResult] = (await connection.execute(
          "INSERT INTO calculator_variables (calculator_config_id, name, type, label, default_value, min, max, step, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            calculatorConfigId,
            variable.name,
            variable.type,
            variable.label,
            variable.defaultValue.toString(),
            variable.min || null,
            variable.max || null,
            variable.step || null,
            i,
          ],
        )) as any

        // Se a variável é do tipo select, inserir as opções
        if (variable.type === "select" && variable.options) {
          const variableId = varResult.insertId

          for (let j = 0; j < variable.options.length; j++) {
            const option = variable.options[j]
            await connection.execute(
              "INSERT INTO calculator_variable_options (variable_id, value, label, position) VALUES (?, ?, ?, ?)",
              [variableId, option.value, option.label, j],
            )
          }
        }
      }
    }

    // Definir o tipo das soluções baseadas em planos
    for (const solutionId of Object.keys(solutionPlans)) {
      await connection.execute(
        "INSERT INTO solution_types (solution_id, type) VALUES (?, ?) ON DUPLICATE KEY UPDATE type = ?",
        [solutionId, "plan-based", "plan-based"],
      )
    }

    await connection.commit()
    console.log("Configurações de calculadoras migradas com sucesso!")
  } catch (error) {
    await connection.rollback()
    throw error
  }
}

// Executar a migração
migrateAllContent().catch((error) => {
  console.error("Erro durante a migração completa:", error)
})
