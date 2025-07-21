"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const Header = () => {
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
            <Image src="/images/diray-logo.png" alt="DI.RAY" width={120} height={40} className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="transition-colors text-white hover:text-primary animate-fadeInDown delay-100">
              Home
            </Link>
            <div className="relative group animate-fadeInDown delay-200">
              <button className="flex items-center transition-colors text-white hover:text-primary">
                Soluções
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-dark/95 backdrop-blur-lg rounded-md shadow-lg overflow-hidden z-50 transform scale-0 group-hover:scale-100 transition-transform origin-top">
                <div className="p-2">
                  <Link
                    href="/solucoes/estrategia-de-treinamento"
                    className="block px-4 py-2 text-white hover:bg-primary/20 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Estratégia de Treinamento
                  </Link>
                  <Link
                    href="/solucoes/formacao-de-ia"
                    className="block px-4 py-2 text-white hover:bg-primary/20 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Formação customizada em IA
                  </Link>
                  <Link
                    href="/solucoes/plano-de-comunicacao"
                    className="block px-4 py-2 text-white hover:bg-primary/20 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Plano de Comunicação
                  </Link>
                  <Link
                    href="/solucoes/alinhamento-de-cultura"
                    className="block px-4 py-2 text-white hover:bg-primary/20 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Alinhamento de Cultura
                  </Link>
                  <Link
                    href="/solucoes/workshop-de-metas"
                    className="block px-4 py-2 text-white hover:bg-primary/20 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Workshop de Metas
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/por-que-diray"
              className="transition-colors text-white hover:text-primary animate-fadeInDown delay-300"
            >
              Por que Diray
            </Link>
            <Link
              href="/#sobre"
              className="transition-colors text-white hover:text-primary animate-fadeInDown delay-400"
            >
              Sobre
            </Link>
            <Link href="/#faq" className="transition-colors text-white hover:text-primary animate-fadeInDown delay-500">
              FAQ
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className={`md:hidden ${isMobileMenuOpen ? "animate-slideInDown" : "hidden"} py-4`}>
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-white hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <div className="py-2">
              <div className="text-white hover:text-primary transition-colors mb-2">Soluções</div>
              <div className="pl-4 flex flex-col space-y-2">
                <Link
                  href="/solucoes/estrategia-de-treinamento"
                  className="text-white/80 hover:text-primary transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Estratégia de Treinamento
                </Link>
                <Link
                  href="/solucoes/formacao-de-ia"
                  className="text-white/80 hover:text-primary transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Formação customizada em IA
                </Link>
                <Link
                  href="/solucoes/plano-de-comunicacao"
                  className="text-white/80 hover:text-primary transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Plano de Comunicação
                </Link>
                <Link
                  href="/solucoes/alinhamento-de-cultura"
                  className="text-white/80 hover:text-primary transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Alinhamento de Cultura
                </Link>
                <Link
                  href="/solucoes/workshop-de-metas"
                  className="text-white/80 hover:text-primary transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Workshop de Metas
                </Link>
              </div>
            </div>
            <Link
              href="/por-que-diray"
              className="text-white hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Por que Diray
            </Link>
            <Link
              href="/sobre"
              className="text-white hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              href="/faq"
              className="text-white hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
