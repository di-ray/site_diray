import mysql from "mysql2/promise"

// Configurações de calculadoras personalizadas
const calculatorConfigs = {
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
  "workshop-de-metas": {
    title: "Workshop de Metas",
    description: "Calcule o orçamento para workshop de metas",
    formula: "customLogic", // Indica que usa lógica personalizada
    customLogic: true,
    variables: [
      {
        name: "lowRange",
        type: "number",
        label: "Pessoas com salário até R$ 12.000",
        defaultValue: 0,
        min: 0,
        max: 1000,
      },
      {
        name: "midRange",
        type: "number",
        label: "Pessoas com salário de R$ 12.000 a R$ 25.000",
        defaultValue: 0,
        min: 0,
        max: 1000,
      },
      {
        name: "highRange",
        type: "number",
        label: "Pessoas com salário acima de R$ 25.000",
        defaultValue: 0,
        min: 0,
        max: 1000,
      },
    ],
  },
  "programa-de-desenvolvimento": {
    title: "Programa de Desenvolvimento",
    description: "Calcule o orçamento para programa de desenvolvimento",
    formula: "customLogic", // Indica que usa lógica personalizada
    customLogic: true,
    variables: [
      {
        name: "numTrainings",
        type: "number",
        label: "Número de treinamentos",
        defaultValue: 0,
        min: 0,
        max: 20,
      },
    ],
  },
}

async function migrateCalculatorConfigs() {
  console.log("Migrando configurações de calculadoras personalizadas...")

  // Configurar conexão com o banco de dados
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "cms_db",
  })

  try {
    // Criar tabelas se não existirem
    await createTables(connection)

    // Migrar configurações de calculadoras
    await migrateConfigs(connection, calculatorConfigs)

    console.log("Migração de calculadoras concluída com sucesso!")
  } catch (error) {
    console.error("Erro durante a migração:", error)
  } finally {
    await connection.end()
  }
}

async function createTables(connection: mysql.Connection) {
  console.log("Verificando tabelas para calculadoras...")

  // Tabela de configurações de calculadoras
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS calculator_configs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      solution_id VARCHAR(50) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      formula TEXT NOT NULL,
      custom_logic BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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

  console.log("Tabelas verificadas com sucesso!")
}

async function migrateConfigs(connection: mysql.Connection, configs: any) {
  console.log("Migrando configurações...")

  // Iniciar transação
  await connection.beginTransaction()

  try {
    // Para cada configuração de calculadora
    for (const [solutionId, config] of Object.entries(configs)) {
      console.log(`Migrando configuração para: ${solutionId}`)

      // Verificar se a solução existe
      const [solutionRows] = (await connection.execute("SELECT * FROM solutions WHERE solution_id = ?", [
        solutionId,
      ])) as any

      // Se a solução não existe, criá-la
      if (solutionRows.length === 0) {
        await connection.execute("INSERT INTO solutions (solution_id, title, page_id) VALUES (?, ?, ?)", [
          solutionId,
          (config as any).title,
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
        "INSERT INTO calculator_configs (solution_id, title, description, formula, custom_logic) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = ?, description = ?, formula = ?, custom_logic = ?",
        [
          solutionId,
          (config as any).title,
          (config as any).description || null,
          (config as any).formula,
          (config as any).customLogic || false,
          (config as any).title,
          (config as any).description || null,
          (config as any).formula,
          (config as any).customLogic || false,
        ],
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

        const [varResult] = (await connection.execute(
          "INSERT INTO calculator_variables (calculator_config_id, name, type, label, default_value, min, max, step, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            calculatorConfigId,
            variable.name,
            variable.type,
            variable.label || null,
            variable.defaultValue?.toString() || null,
            variable.min || null,
            variable.max || null,
            variable.step || null,
            i,
          ],
        )) as any

        // Se a variável tem opções (para tipo select)
        if (variable.options && variable.options.length > 0) {
          const variableId = varResult.insertId

          // Remover opções existentes
          await connection.execute("DELETE FROM calculator_variable_options WHERE variable_id = ?", [variableId])

          // Inserir novas opções
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

    await connection.commit()
    console.log("Configurações migradas com sucesso!")
  } catch (error) {
    await connection.rollback()
    throw error
  }
}

// Executar a migração
migrateCalculatorConfigs().catch((error) => {
  console.error("Erro durante a migração de calculadoras:", error)
})
