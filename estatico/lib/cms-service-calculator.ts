import { DatabaseConnection } from "./db-connection"
import type { RowDataPacket } from "mysql2/promise"

export interface CalculatorConfig {
  variables: {
    name: string
    type: "number" | "select"
    defaultValue: string
    position: number
    label: string
    min?: number
    max?: number
    step?: number
    options?: { value: string; label: string }[]
  }[]
  formula: string
}

export class CalculatorService {
  private dbConnection: DatabaseConnection

  constructor() {
    this.dbConnection = DatabaseConnection.getInstance()
  }

  public async getCalculatorConfig(solutionId: string): Promise<CalculatorConfig | null> {
    try {
      const connection = await this.dbConnection.getConnection()

      const [configRows] = await connection.execute<RowDataPacket[]>(
        "SELECT * FROM calculator_configs WHERE solution_id = ?",
        [solutionId],
      )

      if (configRows.length === 0) return null

      const calculatorConfig = configRows[0]

      // Buscar variáveis da calculadora
      const [variableRows] = await connection.execute<RowDataPacket[]>(
        "SELECT * FROM calculator_variables WHERE calculator_config_id = ? ORDER BY position",
        [calculatorConfig.id],
      )

      return {
        formula: calculatorConfig.formula,
        variables: variableRows.map((variable: any) => ({
          name: variable.name,
          type: variable.type,
          defaultValue: variable.default_value,
          position: variable.position,
          label: variable.label, // Ensure label is included
          min: variable.min,
          max: variable.max,
          step: variable.step,
          options: variable.options ? JSON.parse(variable.options) : undefined, // Parse options if present
        })),
      }
    } catch (error) {
      console.error("Error fetching calculator config:", error)
      return null
    }
  }

  public async saveCalculatorConfig(solutionId: string, config: CalculatorConfig): Promise<boolean> {
    try {
      const connection = await this.dbConnection.getConnection()
      await connection.beginTransaction()

      // Inserir ou atualizar a configuração da calculadora
      const [result] = (await connection.execute(
        "INSERT INTO calculator_configs (solution_id, formula) VALUES (?, ?) ON DUPLICATE KEY UPDATE formula = ?",
        [solutionId, config.formula, config.formula],
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
      for (let i = 0; i < config.variables.length; i++) {
        const variable = config.variables[i]
        await connection.execute(
          "INSERT INTO calculator_variables (calculator_config_id, name, type, default_value, position) VALUES (?, ?, ?, ?, ?)",
          [calculatorConfigId, variable.name, variable.type, variable.defaultValue, i],
        )
      }

      await connection.commit()
      return true
    } catch (error) {
      const connection = await this.dbConnection.getConnection()
      await connection.rollback()
      console.error("Error saving calculator config:", error)
      return false
    }
  }
}
