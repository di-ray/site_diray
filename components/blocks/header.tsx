"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { tinaField } from "tinacms/dist/react"

interface NavigationLink {
  text: string
  href: string
}

interface SolutionLink {
  text: string
  href: string
}

interface HeaderProps {
  logo?: string
  logoAlt?: string
  navigationLinks?: NavigationLink[]
  solutionLinks?: SolutionLink[]
  showSolutions?: boolean
}

export function HeaderSection({ 
  logo = "/images/diray-logo.png",
  logoAlt = "DI.RAY",
  navigationLinks = [
    { text: "Home", href: "/" },
    { text: "Por que Diray", href: "/por-que-diray" },
    { text: "Sobre", href: "/#sobre" },
    { text: "FAQ", href: "/#faq" }
  ],
  solutionLinks = [
    { text: "Estratégia de Treinamento", href: "/solucoes/estrategia-de-treinamento" },
    { text: "Formação customizada em IA", href: "/solucoes/formacao-de-ia" },
    { text: "Plano de Comunicação", href: "/solucoes/plano-de-comunicacao" },
    { text: "Alinhamento de Cultura", href: "/solucoes/alinhamento-de-cultura" },
    { text: "Workshop de Metas", href: "/solucoes/workshop-de-metas" }
  ],
  showSolutions = true
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        isScrolled || isMobileMenuOpen ? "bg-dark/95 shadow-sm backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center animate-fadeIn">
            <Image 
              src={logo} 
              alt={logoAlt} 
              width={120} 
              height={40} 
              className="h-10 w-auto" 
              data-tina-field={tinaField({ logo }, "logo")}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link, index) => {
              if (link.text === "Soluções" && showSolutions) {
                return (
                  <div key={index} className="relative group animate-fadeInDown delay-200">
                    <button className="flex items-center transition-colors text-white hover:text-primary">
                      <span data-tina-field={tinaField(link, `navigationLinks.${index}.text`)}>
                        {link.text}
                      </span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    <div className="absolute left-0 mt-2 w-64 bg-dark/95 backdrop-blur-lg rounded-md shadow-lg overflow-hidden z-50 transform scale-0 group-hover:scale-100 transition-transform origin-top">
                      <div className="p-2">
                        {solutionLinks.map((solution, sIndex) => (
                          <Link
                            key={sIndex}
                            href={solution.href}
                            className="block px-4 py-2 text-white hover:bg-primary/20 rounded-md"
                            data-tina-field={tinaField(solution, `solutionLinks.${sIndex}.text`)}
                          >
                            {solution.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
              
              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`transition-colors text-white hover:text-primary animate-fadeInDown delay-${(index + 1) * 100}`}
                  data-tina-field={tinaField(link, `navigationLinks.${index}.text`)}
                >
                  {link.text}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? "animate-slideInDown" : "hidden"} py-4`}>
          <nav className="flex flex-col space-y-4">
            {navigationLinks.map((link, index) => {
              if (link.text === "Soluções" && showSolutions) {
                return (
                  <div key={index} className="py-2">
                    <div className="text-white hover:text-primary transition-colors mb-2">{link.text}</div>
                    <div className="pl-4 flex flex-col space-y-2">
                      {solutionLinks.map((solution, sIndex) => (
                        <Link
                          key={sIndex}
                          href={solution.href}
                          className="text-white/80 hover:text-primary transition-colors py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {solution.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }
              
              return (
                <Link
                  key={index}
                  href={link.href}
                  className="text-white hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.text}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}