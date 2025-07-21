import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const { path, tag, secret } = await request.json()

    // Verificar token de segurança
    const expectedSecret = process.env.REVALIDATE_SECRET || "diray-secret-token"
    if (secret !== expectedSecret) {
      return NextResponse.json({ success: false, message: "Token de segurança inválido" }, { status: 401 })
    }

    // Revalidar por caminho ou tag
    if (path) {
      revalidatePath(path)
      console.log(`🔄 Revalidando caminho: ${path}`)
    }

    if (tag) {
      revalidateTag(tag)
      console.log(`🔄 Revalidando tag: ${tag}`)
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      path: path || null,
      tag: tag || null,
    })
  } catch (error) {
    console.error("❌ Erro ao revalidar:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Erro ao revalidar",
      },
      { status: 500 },
    )
  }
}
