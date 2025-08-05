
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface ContactSectionProps {
  title?: string
  description?: string
  className?: string
  illumination?: "red" | "purple" | "gradient" | "none"
}

export const ContatoSection = ({
  title = "Entre em contato",
  description = "Estou pronto para ajudar sua empresa a alcançar o próximo nível.",
  className = "",
  illumination = "none",
}: ContactSectionProps) => {
  let illuminationClass = ""

  switch (illumination) {
    case "red":
      illuminationClass = "section-illumination-red"
      break
    case "purple":
      illuminationClass = "section-illumination-purple"
      break
    case "gradient":
      illuminationClass = "section-illumination-gradient"
      break
    default:
      illuminationClass = ""
  }

  return (
    <section id="contato" className={`py-20 md:py-32 bg-dark ${illuminationClass} ${className}`}>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white animate-fadeIn">{title}</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-white animate-fadeInUp delay-100">{description}</p>
        <div className="flex flex-wrap justify-center gap-4">
      <a
        href="https://wa.me/5511996386103"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg"
      >
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
          className="mr-2 h-5 w-5"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        Envie uma mensagem
      </a>
      <a
        href="mailto:contato@diray.com.br"
        className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-md font-medium transition-all duration-300"
      >
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
          className="mr-2 h-5 w-5"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        Envie um e-mail
      </a>
    </div>
      </div>
    </section>
  )
}

export default ContatoSection
