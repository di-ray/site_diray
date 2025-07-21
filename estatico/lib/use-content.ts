"use client"

import { useState, useEffect } from "react"
import websiteContent, { type WebsiteContent } from "@/lib/content"

// Cria um estado global para o carregamento
let isLoadingGlobal = true
let contentGlobal: WebsiteContent = websiteContent
let isInitialized = false

export function useContent() {
  const [content, setContent] = useState<WebsiteContent>(contentGlobal)
  const [isLoading, setIsLoading] = useState(isLoadingGlobal)

  useEffect(() => {
    async function fetchContent() {
      // Se já inicializamos e não estamos carregando, apenas retorne
      if (isInitialized && !isLoadingGlobal) {
        setIsLoading(false)
        setContent(contentGlobal)
        return
      }

      console.log("🔄 Iniciando busca de conteúdo...")
      setIsLoading(true)

      try {
        if (typeof window !== "undefined") {
          const savedContent = localStorage.getItem("websiteContent")
          const savedTimestamp = localStorage.getItem("contentTimestamp")
          if (savedContent && savedTimestamp) {
            console.log("📦 Conteúdo carregado do localStorage")
            const parsedContent = JSON.parse(savedContent)
            setContent(parsedContent)
            contentGlobal = parsedContent
            setIsLoading(false)
            isLoadingGlobal = false
            isInitialized = true
            return
          }
        }

        console.log("🌐 Buscando conteúdo do servidor...")
        const response = await fetch("/api/content")

        if (response.ok) {
          const data = await response.json()
          console.log("✅ Conteúdo carregado do servidor:", data)
          setContent(data)
          contentGlobal = data

          if (typeof window !== "undefined") {
            localStorage.setItem("websiteContent", JSON.stringify(data))
          }
        } else {
          console.warn("⚠️ Falha ao buscar da API. Usando conteúdo padrão.")
        }
      } catch (error) {
        console.error("❌ Erro ao buscar conteúdo:", error)
      } finally {
        setIsLoading(false)
        isLoadingGlobal = false
        isInitialized = true
      }
    }

    fetchContent()

    // Configurar listener para eventos SSE de atualização de conteúdo
    const setupSSE = () => {
      try {
        const eventSource = new EventSource("/api/content-updates")

        eventSource.onopen = () => {
          console.log("SSE: Conexão estabelecida para atualizações de conteúdo")
        }

        eventSource.onmessage = async (event) => {
          try {
            const data = JSON.parse(event.data)
            console.log("SSE: Evento recebido", data)

            if (data.type === "content-update") {
              const eventTimestamp = data.timestamp
              const localTimestamp = localStorage.getItem("contentTimestamp")

              if (!localTimestamp || eventTimestamp > localTimestamp) {
                console.log("🔄 Conteúdo desatualizado. Recarregando do servidor...")
                localStorage.removeItem("websiteContent")
                localStorage.setItem("contentTimestamp", eventTimestamp)

                // Recarregar conteúdo do servidor
                const response = await fetch("/api/content")

                if (response.ok) {
                  const freshContent = await response.json()
                  console.log("✅ Conteúdo atualizado do servidor")
                  setContent(freshContent)
                  contentGlobal = freshContent

                  if (typeof window !== "undefined") {
                    localStorage.setItem("websiteContent", JSON.stringify(freshContent))
                  }
                }
              }
            }
          } catch (error) {
            console.error("Erro ao processar evento SSE:", error)
          }
        }

        eventSource.onerror = (error) => {
          console.error("Erro na conexão SSE:", error)
          eventSource.close()

          // Tentar reconectar após 5 segundos
          setTimeout(setupSSE, 5000)
        }

        return eventSource
      } catch (error) {
        console.error("Erro ao configurar SSE:", error)
        return null
      }
    }

    const eventSource = setupSSE()

    return () => {
      eventSource?.close()
    }
  }, [])

  const getSection = (pageId: string, sectionId: string) => {
    const page = content.pages.find((p) => p.id === pageId)
    return page?.sections.find((s) => s.id === sectionId) || null
  }

  const getItem = (pageId: string, sectionId: string, itemId: string) => {
    const section = getSection(pageId, sectionId)
    return section?.items?.find((item) => item.id === itemId) || null
  }

  const getText = (pageId: string, sectionId: string, field: "title" | "subtitle" | "description") => {
    const section = getSection(pageId, sectionId)
    return section?.[field] || ""
  }

  const getItemText = (pageId: string, sectionId: string, itemId: string) => {
    const item = getItem(pageId, sectionId, itemId)
    return item?.text || ""
  }

  const getFaqItems = () => {
    const faqSection = content.pages.flatMap((page) => page.sections).find((section) => section.id === "faq")

    if (!faqSection?.items) return {}

    type FaqItem = {
      id: string
      category?: string
      question?: string
      answer?: string
    }

    type FaqCategory = {
      [key: string]: {
        id: string
        category: string
        question: string
        answer: string
      }[]
    }

    return faqSection.items.reduce<FaqCategory>((acc, item: FaqItem) => {
      const question = item.question?.trim()
      const answer = item.answer?.trim()

      if (!question || !answer) return acc

      const category = item.category?.trim() || "Geral"

      if (!acc[category]) acc[category] = []

      acc[category].push({
        id: item.id,
        category,
        question,
        answer,
      })

      return acc
    }, {})
  }

  const saveContent = async (updatedContent: WebsiteContent) => {
    setContent(updatedContent)
    contentGlobal = updatedContent

    if (typeof window !== "undefined") {
      localStorage.setItem("websiteContent", JSON.stringify(updatedContent))
    }

    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContent),
      })

      if (!response.ok) {
        console.error("❌ Falha ao salvar conteúdo no servidor")
        throw new Error("Falha ao salvar conteúdo no servidor")
      }

      return await response.json()
    } catch (error) {
      console.error("❌ Erro ao salvar conteúdo no servidor:", error)
      throw error
    }
  }

  return {
    content,
    isLoading,
    getSection,
    getItem,
    getText,
    getItemText,
    getFaqItems,
    saveContent,
  }
}
