"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Link from "next/link"

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Verificar se o usuário já aceitou os cookies
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark/95 backdrop-blur-lg text-white z-50 p-4 shadow-lg border-t border-primary/20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">Política de Cookies e Privacidade</h3>
          <p className="text-sm text-white/80">
            Utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar navegando, você concorda com
            nossa{" "}
            <Link href="/politica-de-privacidade" className="text-primary underline">
              Política de Privacidade
            </Link>{" "}
            e com o uso de cookies para análise de tráfego e personalização de conteúdo.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 border border-white/20 rounded-md hover:bg-white/10 transition-colors"
          >
            Recusar
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-md transition-colors"
          >
            Aceitar
          </button>
          <button
            onClick={declineCookies}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
