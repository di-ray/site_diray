"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { WhyDiray } from "@/components/why-diray"
import { useContent } from "@/lib/use-content"
import CTAButton from "@/components/ui/cta-button"
import ContactForm from "@/components/contact-form"
import LoadingSpinner from "@/components/loading-spinner"

export default function PorQueDiray() {
  const { content, isLoading, getText } = useContent()
  const [pageReady, setPageReady] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setPageReady(true)
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-dark">
        <LoadingSpinner size={32} />
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative architecture-bg min-h-[70vh] flex items-center py-32 md:py-48">
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-10 text-white font-poppins">
              Por que <br />
              <span className="text-highlight">DI.RAY?</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white">
              Conheça nossa abordagem única e descubra como podemos transformar sua organização
            </p>
            <div className="mt-8">
              <CTAButton href="#diferenciais" variant="primary" size="lg" showArrow>
                Nossos diferenciais
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Why DI.RAY Section */}
      <div id="diferenciais">
        <WhyDiray />
      </div>

      {/* About Section */}
      <section id="sobre" className="py-20 md:py-32 architecture-bg">
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
            Sobre a <span className="text-white">DI.RAY</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src="/images/diego-raymundo.png"
                  alt="Diego Raymundo - DI.RAY Consultoria"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500"
                />
                <div className="text-center mt-4">
                  <h3 className="text-2xl font-bold text-white">Diego Raymundo</h3>
                  <p className="text-white/80">Fundador da DI.RAY</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-white text-lg mb-6">{getText("home", "about", "description")}</p>
              <div className="w-full flex justify-center items-center">
                <Image
                  alt="Client Logos"
                  loading="lazy"
                  width="600"
                  height="50"
                  decoding="async"
                  data-nimg="1"
                  src="/images/client-logos.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 md:py-32 architecture-bg">
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Entre em contato</h2>
              <p className="text-lg mb-8 text-white/80">{getText("home", "contact", "description")}</p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="icon-container mr-4 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-white">Whatsapp</h3>
                    <p className="text-white/80">+55 (11) 99638-6103</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="icon-container mr-4 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-white">E-mail</h3>
                    <p className="text-white/80">contato@diray.com.br</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-dark/50 rounded-lg border border-primary/20 p-8 hover:border-primary/50 transition-all duration-300">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
