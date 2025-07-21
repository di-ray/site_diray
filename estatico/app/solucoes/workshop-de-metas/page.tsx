"use client"

import type React from "react"
import Link from "next/link"
import {
  FileText,
  Users,
  Zap,
  ArrowRight,
  MessageSquare,
  BarChart,
  ArrowUpDown,
  BookOpen,
  Clock,
  DollarSign,
  Target,
  Briefcase,
  PenTool,
  Presentation,
  Share2,
  Download,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { motion, type Variants } from "framer-motion" // For animations
import { AnimatePresence } from "framer-motion"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import LeadForm from "@/components/lead-form"
import type { LeadFormData } from "@/components/lead-form"
import ContactSection from "@/components/contact-section"
import { WhyDiray } from "@/components/why-diray"
import { WhatYouReceiveSection } from "@/components/what-you-receive-section"
import ImageBackground from "@/components/image-background"

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
      title: "Briefing & Diagnóstico",
      description: "Entendimento das necessidades da empresa.",
      icon: Briefcase,
    },
    {
      title: "Análise Inicial",
      description: "Avaliação dos objetivos atuais e desafios.",
      icon: FileText,
    },
    {
      title: "Desenho do workshop",
      description: "Planejamento estruturado das sessões.",
      icon: PenTool,
    },
    {
      title: "Facilitação do workshop",
      description: "Condução das dinâmicas e alinhamento das metas.",
      icon: Presentation,
    },
    {
      title: "Transferência de Expertise",
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
          Etapas da Implementação
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

export default function WorkshopMetas() {
  const [pageReady, setPageReady] = useState(false)

  useEffect(() => {
    setPageReady(true)
  }, [])
  const whatYouReceiveItems = [
    {
      icon: Target,
      title: "Workshop de definição de metas",
      description: ["Sessão prática baseada na metodologia S.M.A.R.T., alinhada aos objetivos da empresa."],
    },
    {
      icon: Users,
      title: "Condução do workshop",
      description: ["Facilitação do processo, com revisão e refinamento das metas criadas."],
    },
    {
      icon: Zap,
      title: "Sessão de Transferência de Expertise (ETM©)",
      description: [
        "Capacitação para replicar os treinamentos de forma independente.",
        "Transferência de conhecimento sobre as ferramentas aplicadas, incluindo IA.",
      ],
    },
  ]

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center py-20 md:py-32">
        <ImageBackground imageSrc="/images/downtown-urban-modern.jpg" overlayOpacity={0.8} illumination="gradient" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="max-w-3xl text-left" variants={containerVariants} initial="hidden" animate="visible">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-white font-poppins"
              variants={itemVariants}
            >
              Workshop de
              <br />
              <span className="text-highlight">Metas</span>
            </motion.h1>
            <motion.p className="text-base sm:text-lg md:text-xl mb-8 text-white" variants={itemVariants}>
              Liberte o potencial do seu negócio.
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
                  Supere a estagnação com
                  <br className="hidden md:block" /> metas claras e realistas
                </h2>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
                <p className="text-white text-lg mb-6">
                  A falta de objetivos claros pode levar a metas irreais, falta de previsibilidade nos negócios, baixa
                  motivação e falhas na comunicação e estruturação de processos.
                </p>
                <p className="text-white text-lg mb-6">
                  Com o Workshop de Metas sua empresa irá{" "}
                  <strong> definir objetivos claros e efetivos usando a metodologia SMART</strong> , garantindo que cada
                  membro compreenda seu papel na estratégia da empresa. Transforme desafios em oportunidades, criando
                  uma cultura de crescimento sustentável e resultados consistentes
                </p>
                <motion.div className="flex flex-col md:flex-row gap-6" variants={containerVariants}>
                  <motion.div className="flex items-center" variants={itemVariants}>
                    <DollarSign className="text-white mr-2" size={20} />
                    <span className="text-white">Preço mínimo: R$ 4.500,00</span>
                  </motion.div>
                  <motion.div className="flex items-center" variants={itemVariants}>
                    <Clock className="text-white mr-2" size={20} />
                    <span className="text-white">Duração mínima: 7 dias úteis</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <WhatYouReceiveSection title="O que você recebe?" items={whatYouReceiveItems} />

      {/* Budget Calculator Section */}
      <BudgetCalculator />
      {/* Implementation Process Section */}
      <ImplementationProcessSection />

      <WhyDiray />

      {/* More Solutions Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary to-red-700">
        <motion.div
          className="container mx-auto px-4"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" variants={itemVariants}>
                Conheça mais soluções
              </motion.h2>
              <motion.p className="text-lg text-white mb-12" variants={itemVariants}>
                Esqueça as propostas surpresa. Calcule seu orçamento aqui mesmo no site.
              </motion.p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  title: "Alinhamento de Cultura",
                  description:
                    "Mapeamento e diagnóstico da cultura da empresa e desenho de plano de ação para aumento do alinhamento cultural.",
                  icon: Users,
                  href: "/solucoes/alinhamento-de-cultura",
                },
                {
                  title: "Plano de Comunicação",
                  description:
                    "Desenvolvimento de um plano de comunicação para campanhas internas e/ou iniciativas de mudança organizacional.",
                  icon: MessageSquare,
                  href: "/solucoes/plano-de-comunicacao",
                },
                {
                  title: "Workshop de Metas",
                  description:
                    "Construção e aplicação de workshops para desenho e revisão de metas individuais e coletivas usando S.M.A.R.T.",
                  icon: ArrowUpDown,
                  href: "/solucoes/workshop-de-metas",
                  current: true,
                },
                {
                  title: "Estratégia de Treinamento",
                  description:
                    "Desenho da estratégia de conteúdos e programas que atendam às necessidades de treinamento e desenvolvimento da organização.",
                  icon: BookOpen,
                  href: "/solucoes/estrategia-de-treinamento",
                },
                {
                  title: "Programa de Desenvolvimento",
                  description:
                    "Implementação de programas de treinamento para desenvolver competências comportamentais ou técnicas de um grupo.",
                  icon: BarChart,
                  href: "/solucoes/programa-de-desenvolvimento",
                },
              ].map((solution, index) => (
                <motion.div
                  key={index}
                  className={`${solution.current ? "hidden" : "bg-white"} rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <div className="p-6">
                    <motion.div
                      className={`${solution.current ? "w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4" : "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"}`}
                      whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                    >
                      <solution.icon className="text-primary" size={24} />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
                    <p className={`${solution.current ? "text-white mb-6" : "text-muted-foreground mb-6"}`}>
                      {solution.description}
                    </p>
                    <Link
                      href={solution.href}
                      className="text-primary font-medium hover:underline inline-flex items-center group"
                    >
                      <motion.span whileHover={{ x: 5, transition: { duration: 0.3 } }}>
                        Saiba Mais
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <ContactSection />
    </>
  )
}

// Budget Calculator Component
function BudgetCalculator() {
  const [salaryRanges, setSalaryRanges] = useState({
    lowRange: 0,
    midRange: 0,
    highRange: 0,
  })

  const [showBudget, setShowBudget] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [calculatedBudget, setCalculatedBudget] = useState({
    totalSessions: 0,
    workshopDesignDays: 0,
    workshopDesignHours: 0,
    facilitationDays: 0,
    facilitationHours: 0,
    totalDays: 0,
    totalHours: 0,
    totalCost: 0,
  })

  const budgetRef = useRef<HTMLDivElement>(null)
  const [showLeadForm, setShowLeadForm] = useState<boolean>(false)
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false)
  const [hideCalculateButton, setHideCalculateButton] = useState<boolean>(false)

  // Adicione esta função no início do componente, antes do return
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSalaryRanges({
      ...salaryRanges,
      [name]: Number.parseInt(value) || 0,
    })
    setShowWarning(false)
  }

  const handleLeadSubmit = (data: LeadFormData) => {
    const leadDataWithBudget = {
      ...data,
      service: "Workshop de Metas",
      budget: calculatedBudget.totalCost.toString(),
    }

    console.log("Lead submitted:", leadDataWithBudget)
    setLeadSubmitted(true)
    setShowLeadForm(false)
    setShowBudget(true)
  }

  const calculateBudget = () => {
    const total = salaryRanges.lowRange + salaryRanges.midRange + salaryRanges.highRange
    if (total > 0) {
      const totalSessions = Math.max(
        1,
        Math.ceil((salaryRanges.lowRange + salaryRanges.midRange + salaryRanges.highRange) / 10),
      )

      const workshopDesignHours = Math.max(12, totalSessions * 12)
      const workshopDesignDays = Math.max(3, totalSessions * 2)
      const facilitationHours =
        salaryRanges.lowRange + salaryRanges.midRange * 2 + salaryRanges.highRange * 4 + totalSessions * 8
      const facilitationDays = Math.max(1, totalSessions * 0.5)
      const briefingHours = 1
      const stcHours = 2
      const totalHours = briefingHours + workshopDesignHours + facilitationHours + stcHours
      const totalCost = totalHours * 150
      const totalDays = 1 + workshopDesignDays + facilitationDays + 1

      setCalculatedBudget({
        totalSessions,
        workshopDesignDays,
        workshopDesignHours,
        facilitationDays,
        facilitationHours,
        totalDays,
        totalHours,
        totalCost,
      })

      setHideCalculateButton(true)
      setShowLeadForm(true)
      setShowWarning(false)
    } else {
      setShowWarning(true)
      setShowBudget(false)
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

      pdf.save("Orçamento-Workshop-Metas-DiRay.pdf")
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
              Quantas pessoas estarão no escopo do serviço por faixa salarial (salário base mensal bruto)?
            </motion.h3>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { id: "lowRange", label: "Até R$ 12.000" },
                { id: "midRange", label: "De R$ 12.000 a R$ 25.000" },
                { id: "highRange", label: "Acima de R$ 25.000" },
              ].map((range, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <label htmlFor={range.id} className="block text-sm font-medium mb-2">
                    {range.label}
                  </label>
                  <input
                    type="number"
                    id={range.id}
                    name={range.id}
                    value={salaryRanges[range.id as keyof typeof salaryRanges] || ""}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </motion.div>
              ))}
            </motion.div>

            <AnimatePresence>
              {showLeadForm && !leadSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <LeadForm onSubmit={handleLeadSubmit} service="Workshop de Metas" source="Calculadora de Orçamento" />
                </motion.div>
              )}
            </AnimatePresence>

            {!hideCalculateButton && (
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

            {(showBudget || leadSubmitted) && (
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
                      <p className="text-dark">Workshop de Metas</p>
                      <p className="text-dark text-sm">Emitido em: {new Date().toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2 text-left">Etapa</th>
                          <th className="border px-4 py-2 text-left">Atividade</th>
                          <th className="border px-4 py-2 text-left">Duração estimada</th>
                          <th className="border px-4 py-2 text-left">Horas de consultoria</th>
                          <th className="border px-4 py-2 text-left">Preço</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2">Briefing</td>
                          <td className="border px-4 py-2">Reunião de Briefing</td>
                          <td className="border px-4 py-2">1 dia útil</td>
                          <td className="border px-4 py-2">1</td>
                          <td className="border px-4 py-2">{formatCurrency(150)}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">Desenho da estrutura</td>
                          <td className="border px-4 py-2">Desenho do Workshop</td>
                          <td className="border px-4 py-2">{calculatedBudget.workshopDesignDays} dias úteis</td>
                          <td className="border px-4 py-2">{calculatedBudget.workshopDesignHours}</td>
                          <td className="border px-4 py-2">
                            {formatCurrency(calculatedBudget.workshopDesignHours * 150)}
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">Entrega</td>
                          <td className="border px-4 py-2">Facilitação do workshop</td>
                          <td className="border px-4 py-2">{calculatedBudget.facilitationDays} dia(s) útil(is)</td>
                          <td className="border px-4 py-2">{calculatedBudget.facilitationHours}</td>
                          <td className="border px-4 py-2">
                            {formatCurrency(calculatedBudget.facilitationHours * 150)}
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2"></td>
                          <td className="border px-4 py-2">Sessão de transferência</td>
                          <td className="border px-4 py-2">1 dia útil</td>
                          <td className="border px-4 py-2">2</td>
                          <td className="border px-4 py-2">{formatCurrency(300)}</td>
                        </tr>
                        <tr className="bg-gray-100 font-bold">
                          <td className="border px-4 py-2">Total</td>
                          <td className="border px-4 py-2"></td>
                          <td className="border px-4 py-2">{calculatedBudget.totalDays} dias úteis</td>
                          <td className="border px-4 py-2">{calculatedBudget.totalHours}</td>
                          <td className="border px-4 py-2">{formatCurrency(calculatedBudget.totalCost)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">
                        * Este orçamento é uma estimativa baseada nas informações fornecidas.
                      </p>
                      <p className="text-sm text-gray-600">
                        * Valores sujeitos a alterações após análise detalhada das necessidades.
                      </p>
                    </div>
                    <motion.button
                      onClick={generatePDF}
                      className="flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-medium transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Baixar PDF
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
