"use server"

// URL do Google Apps Script Web App
const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw4hiyG7ATNxyPn9y7uDyphOJEqLMzceFa2Taq-WyJ5AZaEwOaG2RY825maubQIpnE/exec"

export interface LeadData {
  name: string
  email: string
  phone: string
  company?: string
  message?: string
  service?: string
  source?: string
  budget?: string
}

export async function submitLead(data: LeadData) {
  try {
    // Adicionar data e hora atual
    const now = new Date()
    const formattedDate = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()}`
    const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

    const leadData = {
      ...data,
      date: formattedDate,
      time: formattedTime,
    }

    // Enviar dados para o Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Erro ao enviar lead: ${response.status}`)
    }

    const result = await response.json()

    return {
      success: true,
      message: "Lead enviado com sucesso!",
      data: result,
    }
  } catch (error) {
    console.error("Erro ao enviar lead:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido ao enviar lead",
    }
  }
}

// Função para buscar leads (se necessário)
export async function getLeads() {
  try {
    // Buscar leads do Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar leads: ${response.status}`)
    }

    const data = await response.json()

    return {
      success: true,
      leads: data.leads || [],
    }
  } catch (error) {
    console.error("Erro ao buscar leads:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido ao buscar leads",
      leads: [],
    }
  }
}
