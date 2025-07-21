"use client"

import { useEffect, useState } from "react"
import { BookOpen, Users, MessageSquare, BarChart, ArrowUpDown } from "lucide-react"
import CTAButton from "@/components/ui/cta-button"
import { WhyDiray } from "@/components/why-diray"
import { useContent } from "@/lib/use-content"
import LoadingSpinner from "@/components/loading-spinner"
import Link from "next/link"

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function Solucoes() {
  const { content, isLoading } = useContent()
  const [pageReady, setPageReady] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setPageReady(true)
    }
  }, [isLoading])

  // Dados reais para os serviços
  const services = [
    {
      title: "Estratégia de Treinamento",
      description:
        "Transforme sua equipe em um motor de crescimento com um sistema de aprendizado eficiente e alinhado aos desafios da empresa.",
      icon: BookOpen,
      href: "/solucoes/estrategia-de-treinamento",
      color: "bg-primary",
      textColor: "text-white",
    },
    {
      title: "Alinhamento de Cultura",
      description:
        "Fortaleça a cultura organizacional e alinhe os valores da empresa com as práticas diárias dos colaboradores.",
      icon: Users,
      href: "/solucoes/alinhamento-de-cultura",
      color: "bg-primary",
      textColor: "text-white",
    },
    {
      title: "Plano de Comunicação",
      description:
        "Desenvolva estratégias de comunicação eficazes para engajar equipes e transmitir mensagens com clareza e impacto.",
      icon: MessageSquare,
      href: "/solucoes/plano-de-comunicacao",
      color: "bg-primary",
      textColor: "text-white",
    },
    {
      title: "Formação customizada em IA",
      description:
        "Capacite sua equipe com treinamentos personalizados em inteligência artificial, alinhados às necessidades da empresa.",
      icon: BarChart,
      href: "/solucoes/formacao-de-ia",
      color: "bg-primary",
      textColor: "text-white",
    },
    {
      title: "Workshop de Metas",
      description:
        "Construção e aplicação de workshops para desenho e revisão de metas individuais e coletivas usando S.M.A.R.T.",
      icon: ArrowUpDown,
      href: "/solucoes/workshop-de-metas",
      color: "bg-primary",
      textColor: "text-white",
    },
  ]

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
              <span className="text-highlight">Soluções</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white">
              Consultoria especializada para transformar pessoas e impulsionar resultados
            </p>
            <div className="mt-8">
              <CTAButton href="#servicos" variant="primary" size="lg" showArrow>
                Conheça os serviços
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Section */}
      <section className="bg-gradient-to-r from-primary to-red-700 py-16 md:py-24 section-illumination">
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center md:text-left">
                Soluções <br className="hidden md:block" /> que geram <br className="hidden md:block" />
                resultados
              </h2>
            </div>
            <div>
              <p className="text-white text-lg mb-6">
                As outras consultorias complicam? Eu simplifico! Alinho cultura, metas, treinamento e comunicação para
                equipes mais produtivas e engajadas. Usando inteligência artificial e experiência na área, entrego
                soluções práticas e efetivas, e o melhor:{" "}
                <strong>capacito seu time para replicar as soluções quando quiser, sem depender de consultoria.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="bg-dark py-16 md:py-24 section-illumination-red">
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white text-center">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-primary to-red-400 p-8 rounded-lg border border-primary/30 hover:border-primary transition-all duration-300"
              >
                <div className="flex flex-col items-center mb-6">
                  <div className="icon-container">
                    <service.icon size={48} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-4">{service.title}</h3>
                </div>
                <p className="text-white text-center font-medium mb-6">{service.description}</p>
                <div className="mt-6 text-center">
                  <Link href={service.href} >
                  <CTAButton href={service.href} variant="white" size="md">
                    Saiba mais
                  </CTAButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {pageReady && <WhyDiray />}

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary to-red-700 text-white">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para transformar sua organização?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Entre em contato para conversarmos sobre como nossas soluções podem ajudar sua empresa a alcançar o próximo
            nível.
          </p>
          <CTAButton href="/#contato" variant="white" size="lg">
            Fale comigo
          </CTAButton>
        </div>
      </section>
    </>
  )
}
