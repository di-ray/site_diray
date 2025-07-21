/**
 * Código para Google Apps Script
 * Este script deve ser copiado para o editor do Google Apps Script
 */

// Função executada quando uma solicitação GET é recebida
function doGet(e) {
  return handleRequest(e)
}

// Função executada quando uma solicitação POST é recebida
function doPost(e) {
  return handleRequest(e)
}

// Função para processar solicitações
function handleRequest(e) {
  // Configurar CORS para permitir acesso de qualquer origem
  var output = ContentService.createTextOutput()
  output.setMimeType(ContentService.MimeType.JSON)

  // Adicionar cabeçalhos CORS
  output.setHeader("Access-Control-Allow-Origin", "*")
  output.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  output.setHeader("Access-Control-Allow-Headers", "Content-Type")

  try {
    // Se for uma solicitação POST, adicionar um novo lead
    if (e.method === "POST") {
      // Obter dados do corpo da solicitação
      var postData = JSON.parse(e.postData.contents)

      // Adicionar lead à planilha
      var result = addLeadData(postData)

      // Enviar notificação por email (opcional)
      sendEmailNotification(postData)

      // Retornar resposta de sucesso
      output.setContent(
        JSON.stringify({
          success: true,
          message: "Lead adicionado com sucesso",
          data: result,
        }),
      )
    }
    // Se for uma solicitação GET, retornar todos os leads
    else if (e.method === "GET") {
      var leads = getLeadsData()

      output.setContent(
        JSON.stringify({
          success: true,
          leads: leads,
        }),
      )
    }

    return output
  } catch (error) {
    // Retornar erro em caso de falha
    output.setContent(
      JSON.stringify({
        success: false,
        message: "Erro: " + error.toString(),
      }),
    )

    return output
  }
}

// Função para obter todos os leads da planilha
function getLeadsData() {
  // Obter a planilha ativa
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

  // Obter dados da planilha (excluindo o cabeçalho)
  var dataRange = sheet.getDataRange()
  var values = dataRange.getValues()

  // Obter cabeçalhos (primeira linha)
  var headers = values[0]

  // Array para armazenar os leads
  var leads = []

  // Converter dados da planilha para objetos JSON
  for (var i = 1; i < values.length; i++) {
    var row = values[i]
    var lead = {}

    // Mapear valores para propriedades usando cabeçalhos
    for (var j = 0; j < headers.length; j++) {
      lead[headers[j]] = row[j]
    }

    leads.push(lead)
  }

  return leads
}

// Função para adicionar um novo lead à planilha
function addLeadData(leadData) {
  // Obter a planilha ativa
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

  // Verificar se a planilha tem cabeçalhos
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]

  // Se não houver cabeçalhos, adicioná-los
  if (headers.length === 0 || headers[0] === "") {
    headers = ["date", "time", "name", "email", "phone", "company", "message", "service", "source", "budget"]
    sheet.getRange(1, 1, 1, headers.length).setValues([headers])
  }

  // Preparar dados para inserção
  var rowData = []

  // Mapear dados do lead para a ordem dos cabeçalhos
  for (var i = 0; i < headers.length; i++) {
    var header = headers[i]
    rowData.push(leadData[header] || "")
  }

  // Adicionar nova linha à planilha
  sheet.appendRow(rowData)

  return {
    row: sheet.getLastRow(),
    data: leadData,
  }
}

// Função para enviar notificação por email
function sendEmailNotification(leadData) {
  try {
    // Email do destinatário (altere para o seu email)
    var recipientEmail = Session.getActiveUser().getEmail()

    // Assunto do email
    var subject = "Novo Lead Recebido: " + leadData.name

    // Corpo do email
    var body =
      "Um novo lead foi recebido:\n\n" +
      "Nome: " +
      leadData.name +
      "\n" +
      "Email: " +
      leadData.email +
      "\n" +
      "Telefone: " +
      leadData.phone +
      "\n" +
      "Empresa: " +
      (leadData.company || "Não informado") +
      "\n" +
      "Serviço: " +
      (leadData.service || "Não informado") +
      "\n" +
      "Orçamento: " +
      (leadData.budget || "Não informado") +
      "\n" +
      "Fonte: " +
      (leadData.source || "Website") +
      "\n\n" +
      "Mensagem: " +
      (leadData.message || "Nenhuma mensagem") +
      "\n\n" +
      "Data: " +
      leadData.date +
      " às " +
      leadData.time

    // Enviar email
    MailApp.sendEmail(recipientEmail, subject, body)

    return true
  } catch (error) {
    // Registrar erro, mas não interromper o fluxo
    console.error("Erro ao enviar email: " + error.toString())
    return false
  }
}
