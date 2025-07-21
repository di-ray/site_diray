import { NextResponse } from "next/server"
import { CMSService } from "@/lib/cms-service"
import websiteContent from "@/lib/content"
import { revalidatePath, revalidateTag } from "next/cache"

export async function GET() {
  console.log("🔄 API: Iniciando busca de conteúdo do banco de dados...")
  const cmsService = new CMSService()

  try {
    // Adicionar um pequeno atraso para garantir que a conexão esteja pronta
    await new Promise((resolve) => setTimeout(resolve, 500))

    const content = await cmsService.getWebsiteContent()
    console.log("🔍 API: Conteúdo obtido do banco:", content ? "✅ Sucesso" : "❌ Falha")

    if (!content) {
      console.warn("⚠️ API: Sem conteúdo no banco, usando fallback")
      return NextResponse.json(websiteContent)
    }

    return NextResponse.json(content)
  } catch (error) {
    console.error("❌ API: Erro ao buscar conteúdo do banco:", error)
    // Retornar o conteúdo de fallback em caso de erro
    return NextResponse.json(websiteContent)
  }
}

export async function POST(request: Request) {
  console.log("🔄 API: Iniciando salvamento de conteúdo no banco de dados...")
  try {
    const content = await request.json()
    const cmsService = new CMSService()

    // Salvar páginas
    for (const page of content.pages) {
      await cmsService.savePage(page)
    }

    // Salvar configurações globais
    await cmsService.saveGlobalSettings(content.global)

    // Revalidar todas as páginas e tags de conteúdo
    revalidatePath("/")
    revalidateTag("content")

    // Enviar evento de atualização para o canal SSE
    const eventId = Date.now().toString()
    global.contentUpdateEmitter?.emit("update", {
      id: eventId,
      timestamp: new Date().toISOString(),
      type: "content-update",
    })

    console.log("✅ API: Conteúdo salvo com sucesso no banco de dados")
    return NextResponse.json({
      success: true,
      revalidated: true,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("❌ API: Erro ao salvar conteúdo:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to save content",
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
