import type { RowDataPacket } from "mysql2/promise"
import { DatabaseConnection } from "./db-connection"

export interface TextContent {
  id: string
  text: string
  category?: string
  question?: string
  answer?: string
}

export interface SectionContent {
  id: string
  title: string
  subtitle?: string
  description?: string
  items?: TextContent[]
}

export interface PageContent {
  id: string
  title: string
  sections: SectionContent[]
}

export interface WebsiteContent {
  pages: PageContent[]
  global: {
    navigation: {
      links: { text: string; href: string }[]
    }
    footer: {
      copyright: string
      links: { text: string; href: string }[]
    }
  }
}

export interface Solution {
  id: string
  title: string
  description: string
  pageId: string
}

export interface PlanDetail {
  id: string
  range: string
  duration: string
  totalHours: number
  totalCost: number
  activities: {
    name: string
    duration: string
    hours: number
    cost: number
  }[]
}

export interface CalculatorConfig {
  formula: string
  variables: {
    name: string
    type: string
    defaultValue: string
    position: number
  }[]
}

export interface SolutionType {
  id: string
  type: "plan-based" | "calculator-based"
}

export class CMSService {
  private dbConnection: DatabaseConnection

  constructor() {
    this.dbConnection = DatabaseConnection.getInstance()
  }

  // Método para obter todo o conteúdo do site
  public async getWebsiteContent(): Promise<WebsiteContent | null> {
    try {
      // Obter conexão com o banco de dados
      const connection = await this.dbConnection.getConnection()

      // Buscar todas as páginas
      const [pagesRows] = await connection.execute<RowDataPacket[]>("SELECT * FROM pages")

      // Buscar todas as seções
      const [sectionsRows] = await connection.execute<RowDataPacket[]>("SELECT * FROM sections")

      // Buscar todos os itens
      const [itemsRows] = await connection.execute<RowDataPacket[]>("SELECT * FROM items")

      // Buscar configurações globais
      const [globalRows] = await connection.execute<RowDataPacket[]>("SELECT * FROM global_settings")

      // Buscar links de navegação
      const [navRows] = await connection.execute<RowDataPacket[]>("SELECT * FROM navigation_links ORDER BY position")

      // Buscar links de rodapé
      const [footerRows] = await connection.execute<RowDataPacket[]>("SELECT * FROM footer_links ORDER BY position")

      // Construir o objeto de conteúdo do site
      const pages: PageContent[] = pagesRows.map((page: any) => {
        const pageSections = sectionsRows
          .filter((section: any) => section.page_id === page.page_id)
          .map((section: any) => {
            const sectionItems = itemsRows
              .filter((item: any) => item.section_id === section.section_id)
              .map((item: any) => ({
                id: item.item_id,
                text: item.text || "",
                category: item.category || undefined,
                question: item.question || undefined,
                answer: item.answer || undefined,
              }))

            return {
              id: section.section_id,
              title: section.title || "",
              subtitle: section.subtitle || undefined,
              description: section.description || undefined,
              items: sectionItems.length > 0 ? sectionItems : undefined,
            }
          })

        return {
          id: page.page_id,
          title: page.title,
          sections: pageSections,
        }
      })

      // Construir configurações globais
      const globalSettings = globalRows[0] || {}

      const websiteContent: WebsiteContent = {
        pages,
        global: {
          navigation: {
            links: navRows.map((link: any) => ({
              text: link.text,
              href: link.href,
            })),
          },
          footer: {
            copyright: globalSettings.copyright || "© 2025 DI.RAY. Todos os direitos reservados.",
            links: footerRows.map((link: any) => ({
              text: link.text,
              href: link.href,
            })),
          },
        },
      }

      return websiteContent
    } catch (error) {
      console.error("Error fetching website content:", error)
      return null
    }
  }

  // Método para salvar uma página completa
  public async savePage(page: PageContent): Promise<boolean> {
    try {
      const connection = await this.dbConnection.getConnection()
      await connection.beginTransaction()

      // Inserir ou atualizar a página
      await connection.execute("INSERT INTO pages (page_id, title) VALUES (?, ?) ON DUPLICATE KEY UPDATE title = ?", [
        page.id,
        page.title,
        page.title,
      ])

      // Para cada seção
      for (const section of page.sections) {
        // Inserir ou atualizar a seção
        await connection.execute(
          "INSERT INTO sections (page_id, section_id, title, subtitle, description) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = ?, subtitle = ?, description = ?",
          [
            page.id,
            section.id,
            section.title,
            section.subtitle || null,
            section.description || null,
            section.title,
            section.subtitle || null,
            section.description || null,
          ],
        )

        // Se a seção tem itens
        if (section.items && section.items.length > 0) {
          for (const item of section.items) {
            // Inserir ou atualizar o item
            await connection.execute(
              "INSERT INTO items (section_id, item_id, text) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE text = ?",
              [section.id, item.id, item.text, item.text],
            )
          }
        }
      }

      await connection.commit()
      return true
    } catch (error) {
      const connection = await this.dbConnection.getConnection()
      await connection.rollback()
      console.error("Error saving page:", error)
      return false
    }
  }

  // Método para salvar uma seção específica
  public async saveSection(pageId: string, section: SectionContent): Promise<boolean> {
    try {
      const connection = await this.dbConnection.getConnection()
      await connection.beginTransaction()

      // Inserir ou atualizar a seção
      await connection.execute(
        "INSERT INTO sections (page_id, section_id, title, subtitle, description) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = ?, subtitle = ?, description = ?",
        [
          pageId,
          section.id,
          section.title,
          section.subtitle || null,
          section.description || null,
          section.title,
          section.subtitle || null,
          section.description || null,
        ],
      )

      // Se a seção tem itens
      if (section.items && section.items.length > 0) {
        // Primeiro, remover itens existentes para esta seção
        await connection.execute("DELETE FROM items WHERE section_id = ?", [section.id])

        // Depois, inserir os novos itens
        for (const item of section.items) {
          await connection.execute("INSERT INTO items (section_id, item_id, text) VALUES (?, ?, ?)", [
            section.id,
            item.id,
            item.text,
          ])
        }
      }

      await connection.commit()
      return true
    } catch (error) {
      const connection = await this.dbConnection.getConnection()
      await connection.rollback()
      console.error("Error saving section:", error)
      return false
    }
  }

  // Método para salvar configurações globais
  public async saveGlobalSettings(settings: WebsiteContent["global"]): Promise<boolean> {
    try {
      const connection = await this.dbConnection.getConnection()
      await connection.beginTransaction()

      // Atualizar copyright
      await connection.execute(
        "INSERT INTO global_settings (id, copyright) VALUES (1, ?) ON DUPLICATE KEY UPDATE copyright = ?",
        [settings.footer.copyright, settings.footer.copyright],
      )

      // Atualizar links de navegação
      await connection.execute("DELETE FROM navigation_links")
      for (let i = 0; i < settings.navigation.links.length; i++) {
        const link = settings.navigation.links[i]
        await connection.execute("INSERT INTO navigation_links (text, href, position) VALUES (?, ?, ?)", [
          link.text,
          link.href,
          i,
        ])
      }

      // Atualizar links de rodapé
      await connection.execute("DELETE FROM footer_links")
      for (let i = 0; i < settings.footer.links.length; i++) {
        const link = settings.footer.links[i]
        await connection.execute("INSERT INTO footer_links (text, href, position) VALUES (?, ?, ?)", [
          link.text,
          link.href,
          i,
        ])
      }

      await connection.commit()
      return true
    } catch (error) {
      const connection = await this.dbConnection.getConnection()
      await connection.rollback()
      console.error("Error saving global settings:", error)
      return false
    }
  }

  // Método para obter todas as soluções
  public async getAllSolutions(): Promise<Solution[]> {
    try {
      const connection = await this.dbConnection.getConnection()
      const [rows] = await connection.execute<RowDataPacket[]>("SELECT * FROM solutions")
      return rows.map((row: any) => ({
        id: row.solution_id,
        title: row.title,
        description: row.description,
        pageId: row.page_id,
      }))
    } catch (error) {
      console.error("Error fetching all solutions:", error)
      return []
    }
  }

  // Método para obter uma solução específica
  public async getSolution(solutionId: string): Promise<Solution | null> {
    try {
      const connection = await this.dbConnection.getConnection()
      const [rows] = await connection.execute<RowDataPacket[]>("SELECT * FROM solutions WHERE solution_id = ?", [
        solutionId,
      ])
      if (rows.length === 0) return null

      const row = rows[0]
      return {
        id: row.solution_id,
        title: row.title,
        description: row.description,
        pageId: row.page_id,
      }
    } catch (error) {
      console.error("Error fetching solution:", error)
      return null
    }
  }

  // Método para obter detalhes de um plano específico (para calculadoras de orçamento)
  public async getPlanDetails(pageId: string, planId: string): Promise<PlanDetail | null> {
    try {
      const connection = await this.dbConnection.getConnection()
      const [rows] = await connection.execute<RowDataPacket[]>(
        "SELECT * FROM plan_details WHERE page_id = ? AND plan_id = ?",
        [pageId, planId],
      )

      if (rows.length === 0) return null

      const planDetails = rows[0]

      // Buscar atividades do plano
      const [activitiesRows] = await connection.execute<RowDataPacket[]>(
        "SELECT * FROM plan_activities WHERE plan_detail_id = ? ORDER BY position",
        [planDetails.id],
      )

      return {
        id: planDetails.plan_id,
        range: planDetails.range,
        duration: planDetails.duration,
        totalHours: planDetails.total_hours,
        totalCost: planDetails.total_cost,
        activities: activitiesRows.map((activity: any) => ({
          name: activity.name,
          duration: activity.duration,
          hours: activity.hours,
          cost: activity.cost,
        })),
      }
    } catch (error) {
      console.error("Error fetching plan details:", error)
      return null
    }
  }

  // Método para obter todos os planos de uma solução
  public async getAllPlanDetails(pageId: string): Promise<PlanDetail[]> {
    try {
      const connection = await this.dbConnection.getConnection()
      const [rows] = await connection.execute<RowDataPacket[]>("SELECT * FROM plan_details WHERE page_id = ?", [pageId])

      const plans: PlanDetail[] = []

      for (const planDetails of rows) {
        // Buscar atividades do plano
        const [activitiesRows] = await connection.execute<RowDataPacket[]>(
          "SELECT * FROM plan_activities WHERE plan_detail_id = ? ORDER BY position",
          [planDetails.id],
        )

        plans.push({
          id: planDetails.plan_id,
          range: planDetails.range,
          duration: planDetails.duration,
          totalHours: planDetails.total_hours,
          totalCost: planDetails.total_cost,
          activities: activitiesRows.map((activity: any) => ({
            name: activity.name,
            duration: activity.duration,
            hours: activity.hours,
            cost: activity.cost,
          })),
        })
      }

      return plans
    } catch (error) {
      console.error("Error fetching all plan details:", error)
      return []
    }
  }

  // Método para obter conteúdo de uma página específica
  public async getPageContent(pageSlug: string): Promise<any> {
    try {
      const connection = await this.dbConnection.getConnection()
      const [rows] = await connection.execute<RowDataPacket[]>("SELECT * FROM pages WHERE page_id = ?", [pageSlug])
      return rows.length > 0 ? rows[0] : null
    } catch (error) {
      console.error("Error fetching page content:", error)
      return null
    }
  }

  // Método para obter todas as páginas
  public async getAllPages(): Promise<any[]> {
    try {
      const connection = await this.dbConnection.getConnection()
      const [rows] = await connection.execute<RowDataPacket[]>("SELECT * FROM pages")
      return rows
    } catch (error) {
      console.error("Error fetching all pages:", error)
      return []
    }
  }

  // Método para obter uma solução com base no identificador da página
  public async fetchSolutionFromCMS(pageId: string): Promise<any> {
    try {
      const connection = await this.dbConnection.getConnection()
      // Buscar a solução
      const [solutionRows] = await connection.execute<RowDataPacket[]>("SELECT * FROM solutions WHERE page_id = ?", [
        pageId,
      ])

      if (solutionRows.length === 0) return null

      const solution = solutionRows[0]

      // Buscar os planos da solução
      const plans = await this.getAllPlanDetails(pageId)

      return {
        solution: solution.title,
        planDetails: plans,
      }
    } catch (error) {
      console.error("Error fetching solution from CMS:", error)
      return null
    }
  }

  // Método para obter o tipo de uma solução
  public async getSolutionType(solutionId: string): Promise<SolutionType | null> {
    try {
      const connection = await this.dbConnection.getConnection()
      const [rows] = await connection.execute<RowDataPacket[]>("SELECT * FROM solution_types WHERE solution_id = ?", [
        solutionId,
      ])

      if (rows.length === 0) return null

      return {
        id: rows[0].solution_id,
        type: rows[0].type,
      }
    } catch (error) {
      console.error("Error fetching solution type:", error)
      return null
    }
  }

  // Método para obter a configuração de uma calculadora
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
        })),
      }
    } catch (error) {
      console.error("Error fetching calculator config:", error)
      return null
    }
  }

  // Método para salvar a configuração de uma calculadora
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

      // Definir o tipo da solução como baseada em calculadora
      await connection.execute(
        "INSERT INTO solution_types (solution_id, type) VALUES (?, ?) ON DUPLICATE KEY UPDATE type = ?",
        [solutionId, "calculator-based", "calculator-based"],
      )

      await connection.commit()
      return true
    } catch (error) {
      const connection = await this.dbConnection.getConnection()
      await connection.rollback()
      console.error("Error saving calculator config:", error)
      return false
    }
  }

  // Método para obter todas as soluções com seus tipos
  public async getAllSolutionsWithTypes(): Promise<(Solution & { type: string })[]> {
    try {
      const connection = await this.dbConnection.getConnection()
      const [rows] = await connection.execute<RowDataPacket[]>(`
        SELECT s.*, st.type 
        FROM solutions s
        LEFT JOIN solution_types st ON s.solution_id = st.solution_id
      `)

      return rows.map((row: any) => ({
        id: row.solution_id,
        title: row.title,
        description: row.description,
        pageId: row.page_id,
        type: row.type || "unknown",
      }))
    } catch (error) {
      console.error("Error fetching all solutions with types:", error)
      return []
    }
  }

  // Método para obter dados de orçamento baseado no tipo de solução
  public async getBudgetData(solutionId: string): Promise<any> {
    try {
      // Verificar o tipo da solução
      const solutionType = await this.getSolutionType(solutionId)

      if (!solutionType) return null

      if (solutionType.type === "plan-based") {
        // Para soluções baseadas em planos, retornar os planos
        return this.getAllPlanDetails(solutionId)
      } else if (solutionType.type === "calculator-based") {
        // Para soluções baseadas em calculadoras, retornar a configuração da calculadora
        return this.getCalculatorConfig(solutionId)
      }

      return null
    } catch (error) {
      console.error("Error fetching budget data:", error)
      return null
    }
  }
}
