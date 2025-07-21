import { type NextRequest, NextResponse } from "next/server"
import { EventEmitter } from "events"

// Declarar o tipo global para o emissor de eventos
declare global {
  var contentUpdateEmitter: EventEmitter | undefined
}

// Criar o emissor de eventos se ainda não existir
if (!global.contentUpdateEmitter) {
  global.contentUpdateEmitter = new EventEmitter()
  global.contentUpdateEmitter.setMaxListeners(100)
}

export async function GET(request: NextRequest) {
  const responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()

  // Função para enviar eventos para o cliente
  const sendEvent = async (data: any) => {
    try {
      const eventString = `data: ${JSON.stringify(data)}\n\n`
      await writer.write(new TextEncoder().encode(eventString))
    } catch (error) {
      console.error("Erro ao enviar evento SSE:", error)
    }
  }

  // Enviar evento inicial para confirmar conexão
  await sendEvent({
    type: "connected",
    timestamp: new Date().toISOString(),
    message: "Conexão estabelecida com o servidor de eventos",
  })

  // Configurar listener para atualizações de conteúdo
  const updateListener = (data: any) => {
    sendEvent(data)
  }

  // Registrar o listener
  global.contentUpdateEmitter?.on("update", updateListener)

  // Limpar o listener quando a conexão for fechada
  request.signal.addEventListener("abort", () => {
    global.contentUpdateEmitter?.off("update", updateListener)
  })

  return new NextResponse(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  })
}
