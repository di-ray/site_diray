import type mysql from "mysql2/promise"

export async function migrateSolutionPlans(connection: mysql.Connection, solutionPlans: any, solutionTitles: any) {
  console.log("Migrando planos de soluções...")

  // Iniciar transação
  await connection.beginTransaction()

  try {
    // Para cada solução com planos
    for (const [solutionId, plans] of Object.entries(solutionPlans)) {
      console.log(`Migrando planos para solução: ${solutionId}`)

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

      // Para cada plano
      for (const plan of plans as any[]) {
        console.log(`Migrando plano: ${plan.id}`)

        // Inserir ou atualizar o plano
        const [result] = (await connection.execute(
          "INSERT INTO plan_details (page_id, plan_id, range, duration, total_hours, total_cost) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE range = ?, duration = ?, total_hours = ?, total_cost = ?",
          [
            solutionId,
            plan.id,
            plan.range,
            plan.duration,
            plan.totalHours,
            plan.totalCost,
            plan.range,
            plan.duration,
            plan.totalHours,
            plan.totalCost,
          ],
        )) as any

        // Obter o ID do plano
        let planDetailId
        if (result.insertId) {
          planDetailId = result.insertId
        } else {
          const [rows] = (await connection.execute("SELECT id FROM plan_details WHERE page_id = ? AND plan_id = ?", [
            solutionId,
            plan.id,
          ])) as any
          planDetailId = rows[0].id
        }

        // Remover atividades existentes para este plano
        await connection.execute("DELETE FROM plan_activities WHERE plan_detail_id = ?", [planDetailId])

        // Inserir atividades do plano
        for (let i = 0; i < plan.activities.length; i++) {
          const activity = plan.activities[i]
          await connection.execute(
            "INSERT INTO plan_activities (plan_detail_id, name, duration, hours, cost, position) VALUES (?, ?, ?, ?, ?, ?)",
            [planDetailId, activity.name, activity.duration, activity.hours, activity.cost, i],
          )
        }
      }
    }

    await connection.commit()
    console.log("Planos de soluções migrados com sucesso!")
  } catch (error) {
    await connection.rollback()
    throw error
  }
}
