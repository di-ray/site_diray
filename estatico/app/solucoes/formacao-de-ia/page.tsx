"use client"

import type React from "react"
import Link from "next/link"
import {
  FileText,
  Users,
  Award,
  Zap,
  Search,
  FileTextIcon as FileTextLucide,
  Presentation,
  Share2,
  DollarSign,
  Clock,
  Download,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { motion, type Variants } from "framer-motion" // For animations
import VideoBackground from "@/components/video-background"
import { AnimatePresence } from "framer-motion"
import LeadForm from "@/components/lead-form"
import type { LeadFormData } from "@/components/lead-form"
import { submitLead } from "@/lib/actions"
import ContactSection from "@/components/contact-section"
import { WhyDiray } from "@/components/why-diray"
import { WhatYouReceiveSection } from "@/components/what-you-receive-section"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { MoreSolutions } from "@/components/more-solutions"

// Animation Variants for Staggered Effects
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

// Timeline Item Component
interface TimelineItemProps {
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const TimelineItem = ({ title, description, icon: Icon }: TimelineItemProps) => (
  <motion.div
    className="relative flex items-center mb-12 w-full z-20"
    variants={itemVariants}
    whileHover={{ scale: 1.02 }} // Keep the hover animation on the card itself
    transition={{ duration: 0.3 }}
  >
    {/* Timeline Card */}
    <div className="w-full sm:w-3/4 bg-gradient-to-br from-primary to-red-500 p-4 sm:p-6 rounded-[30px_0px_30px_30px] shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-base sm:text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </div>
    {/* Icon Container */}
    <motion.div
      className="absolute right-[-19px] top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-20"
      variants={itemVariants}
    >
      <Icon className="text-primary w-5 h-5" />
    </motion.div>
  </motion.div>
)

// Implementation Process Section Component
const ImplementationProcessSection = () => {
  const steps = [
    {
      title: "Diagnóstico",
      description: "Entendimento das necessidades e objetivos do programa.",
      icon: Search,
    },
    {
      title: "Desenvolvimento do plano e materiais",
      description: "Criação do conteúdo do módulo e estrutura das sessões síncronas.",
      icon: FileTextLucide,
    },
    {
      title: "Facilitação",
      description: "Entrega das sessões e módulos online",
      icon: Presentation,
    },
    {
      title: "Transferência de Expertise (ETM)",
      description: "Repasse do conhecimento para sua empresa replicar o treinamento sempre que necessário.",
      icon: Share2,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-dark to-gray-900">
      <motion.div
        className="container mx-auto px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Como funciona a implementação?
        </motion.h2>
        <div className="relative max-w-2xl mx-auto">
          {/* Timeline Line */}
          <motion.div
            className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-red-500 z-10 hidden sm:block"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {/* Timeline Items */}
          <motion.div className="space-y-8 w-full">
            {steps.map((step, index) => (
              <TimelineItem key={index} title={step.title} description={step.description} icon={step.icon} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// Main Component
export default function FormacaoDeIa() {
  const [pageReady, setPageReady] = useState(false)

  useEffect(() => {
    setPageReady(true)
  }, [])
  return (
    <>
      <section className="relative bg-dark min-h-[60vh] flex py-20 md:py-32">
        <VideoBackground
          videoSrc="/videos/megalopolis-timelapse2.mp4"
          overlayOpacity={0.7}
          startTime={70}
          endTime={76}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="max-w-3xl text-left" variants={containerVariants} initial="hidden" animate="visible">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-white font-poppins"
              variants={itemVariants}
            >
              Formação customizada
              <br />
              <span className="text-highlight">em I.A.</span>
            </motion.h1>
            <motion.p className="text-base sm:text-lg md:text-xl mb-8 text-white" variants={itemVariants}>
              Crie uma equipe de alta performance na era da IA
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                href="#contato"
                className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Saiba Mais
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-red-700 to-primary">
        <motion.div
          className="container mx-auto px-4"
          variants={sectionVariants}
          initial="hidden"
          animate={pageReady ? "visible" : "hidden"}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              variants={containerVariants}
              initial="hidden"
              animate={pageReady ? "visible" : "hidden"}
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Desenvolva seu time
                  <br className="hidden md:block" /> em IA!
                </h2>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
                <p className="text-white text-lg mb-6">
                  Em um cenário de mudanças aceleradas, como o trabalho híbrido e a transformação digital, o
                  desenvolvimento contínuo das equipes é essencial para garantir a{" "}
                  <strong>adaptação do negócio, fortalecer a cultura organizacional e aumentar a produtividade.</strong>
                </p>
                <p className="text-white text-lg mb-6">
                  A formação customizada em I.A. da DI.RAY usa a metodologia de Aprendizagem via Engajamento (AVE), que
                  começa pelo convencimento e torna o aprendizado algo desejado e não imposto.
                </p>
                <motion.div className="flex flex-col md:flex-row gap-6" variants={containerVariants}>
                  <motion.div className="flex items-center" variants={itemVariants}>
                    <DollarSign className="text-white mr-2" size={20} />
                    <span className="text-white">Preço mínimo: R$ 11.137,00 </span>
                  </motion.div>
                  <motion.div className="flex items-center" variants={itemVariants}>
                    <Clock className="text-white mr-2" size={20} />
                    <span className="text-white">Duração mínima: 3 semanas</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* What You Receive Section */}
      <WhatYouReceiveSection
        title="O que você recebe?"
        items={[
          {
            icon: FileText,
            title: "Desenho do programa",
            description: [
              "Definição dos temas das sessões/módulos",
              "Definição das abordagens, eixos de aprendizagem e conteúdos",
              "Definição das sessões do treinamento (síncronas e assíncronas)",
            ],
          },
          {
            icon: Users,
            title: "Entregáveis por módulo:",
            description: [
              "Módulo online.",
              "Curadoria de materiais de micro aprendizagem (artigos, vídeos, livros, podcasts, etc).",
              "Facilitação online das sessões",
            ],
          },
          {
            icon: Award,
            title: "Relatório de avaliação",
            description: ["Métricas de aquisição de conhecimento", "Avaliação de aprendizagem", "Coleta de satisfação"],
          },
          {
            icon: Zap,
            title: "Sessão de Transferência de Expertise (ETM©)",
            description: [
              "Capacitação para replicar os treinamentos de forma independente",
              "Transferência de conhecimento sobre as ferramentas aplicadas, incluindo IA",
            ],
          },
        ]}
      />

      {/* Budget Calculator Section */}
      <BudgetCalculator />

      {/* Implementation Process Section */}
      <ImplementationProcessSection />

      <WhyDiray />

      <MoreSolutions currentPage="/solucoes/formacao-de-ia" />

      <ContactSection />
    </>
  )
}

// Ajuste na calculadora do Programa de Desenvolvimento
function BudgetCalculator() {
  const [numSessions, setNumSessions] = useState<number>()
  const [showLeadForm, setShowLeadForm] = useState<boolean>(false)
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false)
  const [calculatedBudget, setCalculatedBudget] = useState({
    baseHours: 44.25,
    baseTotal: 6637.5,
    sessionHours: 30,
    sessionTotal: 4500,
    grandTotal: 11137.5,
    timeEstimate: 25, // 11 dias base + 14 dias (2 semanas) para 1 sessão
    additionalWeeks: 2, // 2 semanas para 1 sessão
  })
  const [showWarning, setShowWarning] = useState<boolean>(false)

  const budgetRef = useRef<HTMLDivElement>(null)

  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  // Tabela de referência para horas e semanas com base no número de sessões
  const sessionReference = {
    1: { hours: 30, weeks: 2, additionalHoursPerClass: 3 },
    2: { hours: 60, weeks: 4, additionalHoursPerClass: 6 },
    3: { hours: 90, weeks: 6, additionalHoursPerClass: 9 },
    4: { hours: 120, weeks: 8, additionalHoursPerClass: 12 },
    8: { hours: 240, weeks: 16, additionalHoursPerClass: 24 },
    10: { hours: 300, weeks: 20, additionalHoursPerClass: 30 },
  }

  // Função para obter valores de referência com base no número de sessões
  const getSessionReference = (sessions: number) => {
    const keys = Object.keys(sessionReference).map(Number)
    const closestKey = keys.reduce((prev, curr) => {
      return Math.abs(curr - sessions) < Math.abs(prev - sessions) ? curr : prev
    })

    return sessionReference[closestKey as keyof typeof sessionReference]
  }

  const handleNumSessionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 1
    setNumSessions(Math.max(1, value)) // Garantir que o valor mínimo seja 1
    setShowWarning(false)
  }

  const calculateBudget = () => {
    const baseHours = 44.25 // 1 + 4.5 + 20 + 0.75 + 12 + 6
    const baseTotal = baseHours * 150

    // Obter referência para o número de sessões selecionado
    const reference = getSessionReference(numSessions ?? 1)

    // Calcular horas e custo com base no número de sessões
    const sessionHours = reference.hours
    const sessionTotal = sessionHours * 150

    // Calcular tempo estimado em dias (11 dias base + semanas adicionais)
    const additionalWeeks = reference.weeks
    const timeEstimateInDays = 11 + additionalWeeks * 5 // 5 dias úteis por semana

    const grandTotal = baseTotal + sessionTotal

    setCalculatedBudget({
      baseHours: baseHours,
      baseTotal: baseTotal,
      sessionHours: sessionHours,
      sessionTotal: sessionTotal,
      grandTotal: grandTotal,
      timeEstimate: timeEstimateInDays,
      additionalWeeks: additionalWeeks,
    })

    setShowLeadForm(true)
    setShowWarning(false)
  }
  const handleLeadSubmit = async (data: LeadFormData) => {
    const leadData = {
      ...data,
      service: "Formação customizada em IA",
      budget: calculatedBudget.grandTotal.toString(),
    }

    try {
      await submitLead(leadData)
      setLeadSubmitted(true)
      setShowLeadForm(false)
    } catch (error) {
      console.error("Erro ao enviar lead:", error)
    }
  }

  // Corrigir o botão de PDF para evitar corte de informações
  const generatePDF = () => {
    if (!budgetRef.current) return

    const element = budgetRef.current

    // Aumentar a escala para melhor qualidade e definir useCORS para true
    html2canvas(element, {
      scale: 1.5, // Reduzir a escala para evitar cortes
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth + 50, // Adicionar margem extra
      windowHeight: element.scrollHeight + 50, // Adicionar margem extra
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      })

      const imgWidth = 190 // Reduzir a largura para garantir margens
      const pageHeight = 280 // Reduzir a altura para garantir margens
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 10 // Começar com uma margem superior

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight) // Adicionar margem à esquerda
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10 // Adicionar margem superior em cada página
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save("Orçamento-Formação-Customizada-IA-DiRay.pdf")
    })
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary to-red-700">
      <motion.div
        className="container mx-auto px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 text-white text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Contrate já o serviço
          </motion.h2>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h3
              className="text-xl font-bold mb-6"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Quantas sessões você deseja incluir no programa?
            </motion.h3>

            <motion.div
              className="mb-8"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <label htmlFor="numSessions" className="block text-lg font-medium mb-2">
                Número de sessões
              </label>
              <input
                type="number"
                id="numSessions"
                min="0"
                value={numSessions}
                onChange={handleNumSessionsChange}
                className="w-full md:w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary relative z-50"
              />
              <p className="text-sm text-gray-500 mt-2">
                O número de sessões determina a duração e o custo do programa.
              </p>
            </motion.div>

            <AnimatePresence>
              {showLeadForm && !leadSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <LeadForm
                    onSubmit={handleLeadSubmit}
                    service="Formação customizada em IA"
                    source="Calculadora de Orçamento"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {!showLeadForm && !leadSubmitted && (
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.button
                  onClick={calculateBudget}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Calcular
                </motion.button>
              </motion.div>
            )}

            {showWarning && (
              <motion.div
                className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md mb-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Para calcular o orçamento, preencha as informações acima ou{" "}
                <Link href="/#contato" className="text-primary font-medium hover:underline">
                  entre em contato
                </Link>{" "}
                para conversar sobre esta solução.
              </motion.div>
            )}

            {leadSubmitted && (
              <AnimatePresence>
                <motion.div
                  key="budget-section"
                  className="mt-8"
                  ref={budgetRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <img src="/images/diray-logo.png" alt="DiRay Logo" className="h-12" />
                    </div>
                    <div className="text-right">
                      <h3 className="text-xl font-bold">Orçamento</h3>
                      <p className="text-dark">Formação customizada em IA</p>
                      <p className="text-dark text-sm">Emitido em: {new Date().toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2 text-left">Atividade</th>
                          <th className="border px-4 py-2 text-left">Duração Estimada</th>
                          <th className="border px-4 py-2 text-left">Horas de consultoria</th>
                          <th className="border px-4 py-2 text-left">Preço</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2">Reunião de Briefing</td>
                          <td className="border px-4 py-2">1 dia útil</td>
                          <td className="border px-4 py-2">1</td>
                          <td className="border px-4 py-2">{formatCurrency(150)}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">Entrevista com Stakeholders</td>
                          <td className="border px-4 py-2">1 dia útil</td>
                          <td className="border px-4 py-2">4,5</td>
                          <td className="border px-4 py-2">{formatCurrency(675)}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">Desenho do Programa</td>
                          <td className="border px-4 py-2">5 dias úteis</td>
                          <td className="border px-4 py-2">20</td>
                          <td className="border px-4 py-2">{formatCurrency(3000)}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">Apresentação para cliente</td>
                          <td className="border px-4 py-2">1 dia útil</td>
                          <td className="border px-4 py-2">0,75</td>
                          <td className="border px-4 py-2">{formatCurrency(112.5)}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">Ajuste e reenvio</td>
                          <td className="border px-4 py-2">3 dias úteis</td>
                          <td className="border px-4 py-2">12</td>
                          <td className="border px-4 py-2">{formatCurrency(1800)}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">Sessão de Transferência Conhec</td>
                          <td className="border px-4 py-2">1 dia útil</td>
                          <td className="border px-4 py-2">6</td>
                          <td className="border px-4 py-2">{formatCurrency(900)}</td>
                        </tr>
                        <tr className="bg-gray-100 font-bold">
                          <td className="border px-4 py-2">Subtotal Fixo</td>
                          <td className="border px-4 py-2">11 dias úteis</td>
                          <td className="border px-4 py-2">44,25</td>
                          <td className="border px-4 py-2">{formatCurrency(calculatedBudget.baseTotal)}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">
                            Desenho e Entrega das sessões ({numSessions} {numSessions === 1 ? "sessão" : "sessões"})
                          </td>
                          <td className="border px-4 py-2">
                            {calculatedBudget.additionalWeeks} semanas ({calculatedBudget.additionalWeeks * 5} dias
                            úteis)
                          </td>
                          <td className="border px-4 py-2">{calculatedBudget.sessionHours}</td>
                          <td className="border px-4 py-2">{formatCurrency(calculatedBudget.sessionTotal)}</td>
                        </tr>
                        <tr className="bg-gray-100 font-bold">
                          <td className="border px-4 py-2">Total Geral</td>
                          <td className="border px-4 py-2">{calculatedBudget.timeEstimate} dias úteis</td>
                          <td className="border px-4 py-2">
                            {(calculatedBudget.baseHours + calculatedBudget.sessionHours).toFixed(2)}
                          </td>
                          <td className="border px-4 py-2">{formatCurrency(calculatedBudget.grandTotal)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
                <motion.div className="mt-8">
                  <motion.h4 className="font-bold mb-2">Itens opcionais</motion.h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <p className="font-medium">Reuniões e aplicações presenciais:</p>
                      <ul className="list-circle pl-5">
                        <li>Transporte: {formatCurrency(225)} por hora de locomoção</li>
                        <li>Hospedagem: Segundo local e quantidade de diárias</li>
                      </ul>
                    </li>
                    <li>
                      <p className="font-medium">Reuniões adicionais:</p>
                      <ul className="list-circle pl-5">
                        <li>Presencial ou online: {formatCurrency(225)} por hora</li>
                      </ul>
                    </li>
                  </ul>
                </motion.div>
                <motion.button
                  onClick={generatePDF}
                  className="flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Baixar PDF
                </motion.button>
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
