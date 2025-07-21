/**
 * Script para Google Sheets para gerenciar leads da DI.RAY
 *
 * Instruções de uso:
 * 1. Crie uma nova planilha no Google Sheets
 * 2. Vá para Extensões > Apps Script
 * 3. Cole este código no editor
 * 4. Salve o projeto e autorize as permissões necessárias
 * 5. Configure um gatilho para executar a função processNewLeads diariamente
 */

// Configurações
const CONFIG = {
  SHEET_NAMES: {
    LEADS: "Leads",
    DASHBOARD: "Dashboard",
    SETTINGS: "Configurações",
  },
  LEAD_HEADERS: [
    "Data",
    "Hora",
    "Nome",
    "Email",
    "Telefone",
    "Empresa",
    "Mensagem",
    "Fonte",
    "Serviço",
    "Orçamento",
    "Status",
    "Notas",
  ],
  STATUS_OPTIONS: ["Novo", "Contatado", "Em negociação", "Convertido", "Perdido"],
  EMAIL_NOTIFICATION: {
    ENABLED: true,
    RECIPIENTS: ["seu-email@exemplo.com"],
    SUBJECT: "Novo lead recebido - DI.RAY",
  },
}

/**
 * Função que é executada quando a planilha é aberta
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi()
  ui.createMenu("DI.RAY")
    .addItem("Processar novos leads", "processNewLeads")
    .addItem("Gerar relatório", "generateReport")
    .addItem("Configurações", "showSettings")
    .addToUi()
}

/**
 * Configura a planilha inicialmente
 */
function setupSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()

  // Criar ou obter a aba de leads
  let leadsSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.LEADS)
  if (!leadsSheet) {
    leadsSheet = ss.insertSheet(CONFIG.SHEET_NAMES.LEADS)
    leadsSheet.appendRow(CONFIG.LEAD_HEADERS)
    formatHeaderRow(leadsSheet)
  }

  // Criar ou obter a aba de dashboard
  let dashboardSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.DASHBOARD)
  if (!dashboardSheet) {
    dashboardSheet = ss.insertSheet(CONFIG.SHEET_NAMES.DASHBOARD)
    setupDashboard(dashboardSheet)
  }

  // Criar ou obter a aba de configurações
  let settingsSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.SETTINGS)
  if (!settingsSheet) {
    settingsSheet = ss.insertSheet(CONFIG.SHEET_NAMES.SETTINGS)
    setupSettings(settingsSheet)
  }
}

/**
 * Formata a linha de cabeçalho
 */
function formatHeaderRow(sheet) {
  sheet.getRange(1, 1, 1, sheet.getLastColumn()).setBackground("#ff5959").setFontColor("#ffffff").setFontWeight("bold")
}

/**
 * Configura a aba de dashboard
 */
function setupDashboard(sheet) {
  sheet.appendRow(["Dashboard - DI.RAY Consultoria"])
  sheet.getRange(1, 1).setFontSize(16).setFontWeight("bold")

  // Adicionar seções do dashboard
  sheet.appendRow([""])
  sheet.appendRow(["Resumo de Leads"])
  sheet.getRange(3, 1).setFontSize(14).setFontWeight("bold")

  sheet.appendRow(["Total de Leads:", "=COUNTA(Leads!A:A)-1"])
  sheet.appendRow(["Leads Novos:", '=COUNTIF(Leads!K:K,"Novo")'])
  sheet.appendRow(["Leads Convertidos:", '=COUNTIF(Leads!K:K,"Convertido")'])
  sheet.appendRow([
    "Taxa de Conversão:",
    '=IF(COUNTA(Leads!A:A)-1>0,COUNTIF(Leads!K:K,"Convertido")/(COUNTA(Leads!A:A)-1),0)',
  ])
  sheet.getRange(7, 2).setNumberFormat("0.00%")

  sheet.appendRow([""])
  sheet.appendRow(["Leads por Serviço"])
  sheet.getRange(9, 1).setFontSize(14).setFontWeight("bold")

  // Formatação geral
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).setVerticalAlignment("middle")
}

/**
 * Configura a aba de configurações
 */
function setupSettings(sheet) {
  sheet.appendRow(["Configurações - DI.RAY Consultoria"])
  sheet.getRange(1, 1).setFontSize(16).setFontWeight("bold")

  sheet.appendRow([""])
  sheet.appendRow(["Notificações por Email"])
  sheet.getRange(3, 1).setFontSize(14).setFontWeight("bold")

  sheet.appendRow(["Ativar notificações:", CONFIG.EMAIL_NOTIFICATION.ENABLED ? "Sim" : "Não"])
  sheet.appendRow(["Destinatários:", CONFIG.EMAIL_NOTIFICATION.RECIPIENTS.join(", ")])

  sheet.appendRow([""])
  sheet.appendRow(["Status de Leads"])
  sheet.getRange(7, 1).setFontSize(14).setFontWeight("bold")

  for (let i = 0; i < CONFIG.STATUS_OPTIONS.length; i++) {
    sheet.appendRow([CONFIG.STATUS_OPTIONS[i]])
  }
}

/**
 * Processa novos leads (marca como "Novo" e envia notificações)
 */
function processNewLeads() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const leadsSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.LEADS)

  if (!leadsSheet) {
    setupSpreadsheet()
    return
  }

  const lastRow = leadsSheet.getLastRow()
  if (lastRow <= 1) return // Apenas cabeçalho, sem leads

  const statusColumn = CONFIG.LEAD_HEADERS.indexOf("Status") + 1
  const dataRange = leadsSheet.getRange(2, 1, lastRow - 1, leadsSheet.getLastColumn())
  const values = dataRange.getValues()

  let newLeadsCount = 0
  const newLeadsData = []

  for (let i = 0; i < values.length; i++) {
    if (!values[i][statusColumn - 1]) {
      // Status vazio
      values[i][statusColumn - 1] = "Novo"
      newLeadsCount++
      newLeadsData.push(values[i])
    }
  }

  if (newLeadsCount > 0) {
    dataRange.setValues(values)

    // Enviar notificação por email se estiver ativado
    if (CONFIG.EMAIL_NOTIFICATION.ENABLED) {
      sendEmailNotification(newLeadsData)
    }

    // Atualizar dashboard
    updateDashboard()
  }
}

/**
 * Envia notificação por email sobre novos leads
 */
function sendEmailNotification(newLeads) {
  if (newLeads.length === 0) return

  const recipients = CONFIG.EMAIL_NOTIFICATION.RECIPIENTS.join(",")
  const subject = CONFIG.EMAIL_NOTIFICATION.SUBJECT

  let body = `<h2>Novos leads recebidos</h2>
              <p>Foram recebidos ${newLeads.length} novo(s) lead(s):</p>
              <table border="1" cellpadding="5" style="border-collapse: collapse;">
                <tr style="background-color: #ff5959; color: white;">
                  <th>Data</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Serviço</th>
                </tr>`

  newLeads.forEach((lead) => {
    body += `<tr>
              <td>${lead[0]}</td>
              <td>${lead[2]}</td>
              <td>${lead[3]}</td>
              <td>${lead[4]}</td>
              <td>${lead[8]}</td>
            </tr>`
  })

  body += `</table>
           <p>Acesse a <a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}">planilha</a> para mais detalhes.</p>`

  MailApp.sendEmail({
    to: recipients,
    subject: subject,
    htmlBody: body,
  })
}

/**
 * Atualiza o dashboard com dados atualizados
 */
function updateDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const dashboardSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.DASHBOARD)
  const leadsSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.LEADS)

  if (!dashboardSheet || !leadsSheet) return

  // Atualizar contagens básicas (já feitas por fórmulas)

  // Atualizar gráfico de leads por serviço
  const serviceColumn = CONFIG.LEAD_HEADERS.indexOf("Serviço") + 1
  const services = leadsSheet.getRange(2, serviceColumn, leadsSheet.getLastRow() - 1, 1).getValues()

  // Contar ocorrências de cada serviço
  const serviceCounts = {}
  services.forEach((service) => {
    const serviceName = service[0] || "Não especificado"
    serviceCounts[serviceName] = (serviceCounts[serviceName] || 0) + 1
  })

  // Limpar dados antigos
  const startRow = 10
  if (dashboardSheet.getLastRow() >= startRow) {
    dashboardSheet.getRange(startRow, 1, dashboardSheet.getLastRow() - startRow + 1, 2).clear()
  }

  // Adicionar novos dados
  let row = startRow
  for (const service in serviceCounts) {
    dashboardSheet.getRange(row, 1).setValue(service)
    dashboardSheet.getRange(row, 2).setValue(serviceCounts[service])
    row++
  }
}

/**
 * Gera um relatório de leads
 */
function generateReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const leadsSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.LEADS)

  if (!leadsSheet) {
    SpreadsheetApp.getUi().alert("A aba de leads não foi encontrada.")
    return
  }

  const today = new Date()
  const reportName = `Relatório de Leads - ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`

  let reportSheet = ss.getSheetByName(reportName)
  if (reportSheet) {
    reportSheet.clear()
  } else {
    reportSheet = ss.insertSheet(reportName)
  }

  // Copiar cabeçalhos
  const headers = leadsSheet.getRange(1, 1, 1, leadsSheet.getLastColumn()).getValues()[0]
  reportSheet.appendRow(headers)
  formatHeaderRow(reportSheet)

  // Copiar dados
  const data = leadsSheet.getRange(2, 1, leadsSheet.getLastRow() - 1, leadsSheet.getLastColumn()).getValues()
  for (let i = 0; i < data.length; i++) {
    reportSheet.appendRow(data[i])
  }

  // Adicionar resumo
  reportSheet.appendRow([""])
  reportSheet.appendRow(["Resumo do Relatório"])
  reportSheet.getRange(reportSheet.getLastRow(), 1).setFontWeight("bold")

  reportSheet.appendRow(["Total de Leads:", data.length])

  // Contar por status
  const statusColumn = CONFIG.LEAD_HEADERS.indexOf("Status")
  const statusCounts = {}

  for (let i = 0; i < data.length; i++) {
    const status = data[i][statusColumn] || "Não definido"
    statusCounts[status] = (statusCounts[status] || 0) + 1
  }

  for (const status in statusCounts) {
    reportSheet.appendRow([`Leads ${status}:`, statusCounts[status]])
  }

  // Formatar e ajustar colunas
  reportSheet.autoResizeColumns(1, reportSheet.getLastColumn())

  SpreadsheetApp.getUi().alert(`Relatório "${reportName}" gerado com sucesso!`)
}

/**
 * Exibe a aba de configurações
 */
function showSettings() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let settingsSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.SETTINGS)

  if (!settingsSheet) {
    setupSpreadsheet()
    settingsSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.SETTINGS)
  }

  ss.setActiveSheet(settingsSheet)
}
