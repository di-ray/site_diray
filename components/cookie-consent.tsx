"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export interface CookieConsentProps {
  companyName?: string
  policyUrl?: string
}

export function CookieConsent({ 
  companyName = "DI.RAY",
  policyUrl = "/politica-de-privacidade" 
}: CookieConsentProps) {
  const [showConsent, setShowConsent] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Sempre true, não pode ser desabilitado
    analytics: false,
    marketing: false,
    functional: false
  })
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Verificar se o usuário já deu consentimento
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setShowConsent(false)
    
    // Recarregar a página para ativar os scripts de tracking
    window.location.reload()
  }

  const acceptSelected = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setShowConsent(false)
    
    // Recarregar apenas se analytics ou marketing foram aceitos
    if (preferences.analytics || preferences.marketing) {
      window.location.reload()
    }
  }

  const rejectAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setShowConsent(false)
  }

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    if (type === 'necessary') return // Não pode ser alterado
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-dark/95 backdrop-blur-sm border-t border-primary/20 shadow-2xl animate-slideInDown">
      <div className="container mx-auto max-w-6xl">
        {!showDetails ? (
          // Vista resumida
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">
                🍪 Cookies & Privacidade
              </h3>
              <p className="text-white/80 text-sm">
                Utilizamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo. 
                Você pode escolher quais tipos de cookies aceitar.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 min-w-max">
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 text-sm border border-white/30 text-white rounded-md hover:bg-white/10 transition-all duration-300"
              >
                Personalizar
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-all duration-300"
              >
                Rejeitar Tudo
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-300 cta-button"
              >
                Aceitar Tudo
              </button>
            </div>
          </div>
        ) : (
          // Vista detalhada
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                Preferências de Cookies
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Cookies Necessários */}
              <div className="p-4 bg-dark/50 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">Necessários</h4>
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="text-primary"
                  />
                </div>
                <p className="text-xs text-white/70">
                  Essenciais para o funcionamento básico do site. Sempre ativos.
                </p>
              </div>

              {/* Cookies de Analytics */}
              <div className="p-4 bg-dark/50 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">Analytics</h4>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => handlePreferenceChange('analytics')}
                    className="text-primary"
                  />
                </div>
                <p className="text-xs text-white/70">
                  Google Analytics para análise de tráfego e melhoria do site.
                </p>
              </div>

              {/* Cookies de Marketing */}
              <div className="p-4 bg-dark/50 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">Marketing</h4>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => handlePreferenceChange('marketing')}
                    className="text-primary"
                  />
                </div>
                <p className="text-xs text-white/70">
                  Facebook Pixel, LinkedIn e Google Ads para campanhas direcionadas.
                </p>
              </div>

              {/* Cookies Funcionais */}
              <div className="p-4 bg-dark/50 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">Funcionais</h4>
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={() => handlePreferenceChange('functional')}
                    className="text-primary"
                  />
                </div>
                <p className="text-xs text-white/70">
                  Personalização e recursos avançados do site.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/70">
                Para mais informações, consulte nossa{" "}
                <Link href={policyUrl} className="text-primary hover:underline animated-underline">
                  Política de Privacidade
                </Link>
                .
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-all duration-300"
                >
                  Rejeitar Tudo
                </button>
                <button
                  onClick={acceptSelected}
                  className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-300 cta-button"
                >
                  Salvar Preferências
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Hook para verificar consentimento de cookies
export const useCookieConsent = () => {
  const [consent, setConsent] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent')
    if (stored) {
      setConsent(JSON.parse(stored))
    }
  }, [])

  const hasConsent = (type: string) => {
    return consent?.[type] === true
  }

  const updateConsent = (newConsent: any) => {
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent))
    setConsent(newConsent)
  }

  return {
    consent,
    hasConsent,
    updateConsent
  }
}