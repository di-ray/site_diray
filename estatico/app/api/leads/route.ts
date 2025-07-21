import { type NextRequest, NextResponse } from "next/server"
import { getLeads } from "@/lib/actions"

export async function GET(request: NextRequest) {
  try {
    const result = await getLeads()

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      leads: result.leads,
    })
  } catch (error) {
    console.error("Erro ao buscar leads:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Erro ao buscar leads",
      },
      { status: 500 },
    )
  }
}
