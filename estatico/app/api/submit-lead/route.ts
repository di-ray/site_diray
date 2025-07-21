import { NextResponse } from "next/server"
import { google } from "googleapis"

// Configuração para autenticação com o Google Sheets
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message, source, service, budget } = body

    // Validação básica
    if (!name || !email) {
      return NextResponse.json({ success: false, message: "Nome e email são obrigatórios" }, { status: 400 })
    }

    // Obter a data atual formatada
    const now = new Date()
    const formattedDate = now.toLocaleDateString("pt-BR")
    const formattedTime = now.toLocaleTimeString("pt-BR")

    // Conectar ao Google Sheets
    const sheets = google.sheets({ version: "v4", auth })

    // ID da planilha e nome da aba
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
    const range = "Leads!A:J" // Ajuste conforme sua planilha

    // Preparar os dados para inserção
    const values = [
      [
        formattedDate,
        formattedTime,
        name,
        email,
        phone || "",
        company || "",
        message || "",
        source || "Website",
        service || "",
        budget || "",
      ],
    ]

    // Inserir dados na planilha
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Lead registrado com sucesso",
    })
  } catch (error) {
    console.error("Erro ao registrar lead:", error)
    return NextResponse.json({ success: false, message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
