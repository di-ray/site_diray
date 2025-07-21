"use client"

import type React from "react"
import Link from "next/link"
import { FileText, Zap, Clock, DollarSign, BookMarked, Download, Briefcase, Presentation, Share2 } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { motion, type Variants, AnimatePresence } from "framer-motion"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import LeadForm from "@/components/lead-form"
import type { LeadFormData } from "@/components/lead-form"
import ContactSection from "@/components/contact-section"
import { WhyDiray } from "@/components/why-diray"
import { WhatYouReceiveSection } from "@/components/what-you-receive-section"
import { MoreSolutions } from "@/components/more-solutions"
import ImageBackground from "@/components/image-background"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useContent } from "@/lib/use-content"

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
      description: "Entendimento das necessidades de treinamento e objetivos estratégicos.",
      icon: Briefcase,
    },
    {
      title: "Análise Inicial",
      description:
        "Avaliação da estrutura da empresa e identificação dos desafios de T&D (Treinamento e Desenvolvimento).",
      icon: FileText,
    },
    {
      title: "Desenho do documento de estratégia",
      description: "Criação do plano de treinamento completo.",
      icon: BookMarked,
    },
    {
      title: "Apresentação de estratégia",
      description: "Apresentação do plano e ajustes finais.",
      icon: Presentation,
    },
    {
      title: "Transferência de Expertise",
      description: "Repasse do conhecimento para sua empresa replicar o produto sempre que necessário.",
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
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
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
            viewport={{ once: true, margin: "-100px" }}
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

export default function EstrategiaTreinamento() {
  const { isLoading } = useContent()
  const [pageReady, setPageReady] = useState(false)

  useEffect(() => {
    // Definir pageReady como true após o carregamento inicial
    if (!isLoading) {
      setPageReady(true)
    }
  }, [isLoading])

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Carregando conteúdo..." />
  }

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center py-20 md:py-32">
        <ImageBackground imageSrc="/images/windows-building-pattern.jpg" overlayOpacity={0.8} illumination="gradient" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="max-w-3xl text-left" variants={containerVariants} initial="hidden" animate="visible">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-white font-poppins"
              variants={itemVariants}
            >
              Estratégia de
              <br />
              <span className="text-highlight">Treinamento</span>
            </motion.h1>
            <motion.p className="text-base sm:text-lg md:text-xl mb-8 text-white" variants={itemVariants}>
              Transforme sua equipe em um motor de crescimento.
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
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              variants={containerVariants}
              initial="hidden"
              animate={pageReady ? "visible" : "hidden"}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Aprender é bom.
                  <br className="hidden md:block" /> Aplicar é melhor
                </h2>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
                <p className="text-white text-lg mb-6">
                  Treinamento eficaz vai além de cursos isolados. Para gerar impacto real, é preciso uma estratégia com
                  formatos adequados, métricas claras e alinhamento com os desafios do negócio.
                </p>
                <p className="text-white text-lg mb-6">
                  Eu crio uma Estratégia de Treinamento sob medida, estruturando eixos de aprendizagem, formatos e
                  indicadores. Além disso, capacito sua equipe para aplicar e replicar a estratégia com autonomia
                </p>
                <motion.div className="flex flex-col md:flex-row gap-6" variants={containerVariants}>
                  <motion.div className="flex items-center" variants={itemVariants}>
                    <DollarSign className="text-white mr-2" size={20} />
                    <span className="text-white">Preço mínimo: R$ 10.800,00</span>
                  </motion.div>
                  <motion.div className="flex items-center" variants={itemVariants}>
                    <Clock className="text-white mr-2" size={20} />
                    <span className="text-white">Duração mínima: 15 dias úteis</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* What You Receive Section */}
      <WhatYouReceiveSection
        items={[
          {
            title: "Documento de Estratégia de T&D",
            description: [
              "Plano completo com os objetivos, eixos de aprendizagem, programas e estratégia de implementação. A estratégia é desenhada levando em conta sua cultura organizacional, desafios e estrutura.",
            ],
            icon: BookMarked,
          },
          {
            title: "Sessão de Transferência de Expertise (ETM©)",
            description: [
              "Capacitação para replicar os treinamentos de forma independente.",
              "Transferência de conhecimento sobre as ferramentas aplicadas, incluindo IA.",
            ],
            icon: Zap,
          },
        ]}
      />

      {/* Budget Calculator Section */}
      <BudgetCalculator />

      {/* Implementation Process Section */}
      <ImplementationProcessSection />

      {/* WhyDiray Section - Garantindo que seja renderizado */}
      {pageReady && <WhyDiray />}

      <MoreSolutions currentPage="/solucoes/estrategia-de-treinamento" />

      <ContactSection />
    </>
  )
}

function BudgetCalculator() {
  const [selectedPlan, setSelectedPlan] = useState("")
  const [showBudget, setShowBudget] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState<boolean>(false)
  const [hideCalculateButton, setHideCalculateButton] = useState<boolean>(false)
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false)
  const budgetRef = useRef<HTMLDivElement>(null)

  // Adicione esta função no início do componente, antes do return
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlan(e.target.value)
    setShowWarning(false)
  }

  const handleLeadSubmit = (data: LeadFormData) => {
    const planDetails = getPlanDetails()
    const budgetAmount = planDetails ? planDetails.totalCost.toString() : "0"

    const leadDataWithBudget = {
      ...data,
      service: "Estratégia de Treinamento",
      budget: budgetAmount,
    }

    console.log("Lead submitted:", leadDataWithBudget)
    setLeadSubmitted(true)
    setShowLeadForm(false)
    setShowBudget(true)
  }

  const calculateBudget = () => {
    if (!selectedPlan) {
      setShowWarning(true)
      return
    }

    setHideCalculateButton(true)
    setShowLeadForm(true)
  }

  // Corrigir o botão de PDF para evitar corte de informações
  function generatePDF() {
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

      pdf.save("Orçamento-Estrategia-de-Treinamento-DiRay.pdf")
    })
  }

  const getPlanDetails = () => {
    switch (selectedPlan) {
      case "plan1":
        return {
          range: "Até 100 pessoas",
          duration: "3 semanas",
          totalHours: 72,
          totalCost: 10800,
          activities: [
            { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
            { name: "Entrevista com Stakeholders", duration: "1 dia útil", hours: 3, cost: 450 },
            { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
            { name: "Ajuste e reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
            { name: "Estratégia de Treinamento", duration: "5 dias úteis", hours: 40, cost: 6000 },
            { name: "Apresentação para cliente", duration: "1 dia útil", hours: 2, cost: 300 },
            { name: "Ajuste e reenvio", duration: "2 dias úteis", hours: 10, cost: 1500 },
            { name: "Apresentação para outras lideranças", duration: "1 dia útil", hours: 1, cost: 150 },
            { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3, cost: 450 },
          ],
        }
      case "plan2":
        return {
          range: "100 a 500 pessoas",
          duration: "5 semanas",
          totalHours: 122,
          totalCost: 18300,
          activities: [
            { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
            { name: "Entrevista com Stakeholders", duration: "2 dias úteis", hours: 3, cost: 450 },
            { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
            { name: "Ajuste e reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
            { name: "Estratégia de Treinamento", duration: "10 dias úteis", hours: 80, cost: 12000 },
            { name: "Apresentação para cliente", duration: "1 dia útil", hours: 2, cost: 300 },
            { name: "Ajuste e reenvio", duration: "3 dias úteis", hours: 20, cost: 3000 },
            { name: "Apresentação para outras lideranças", duration: "1 dia útil", hours: 1, cost: 150 },
            { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3, cost: 450 },
          ],
        }
      case "plan3":
        return {
          range: "500 a 2000 pessoas",
          duration: "6 semanas",
          totalHours: 172,
          totalCost: 25800,
          activities: [
            { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
            { name: "Entrevista com Stakeholders", duration: "3 dias úteis", hours: 3, cost: 450 },
            { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
            { name: "Ajuste e reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
            { name: "Estratégia de Treinamento", duration: "15 dias úteis", hours: 120, cost: 18000 },
            { name: "Apresentação para cliente", duration: "1 dia útil", hours: 2, cost: 300 },
            { name: "Ajuste e reenvio", duration: "5 dias úteis", hours: 30, cost: 4500 },
            { name: "Apresentação para outras lideranças", duration: "1 dia útil", hours: 1, cost: 150 },
            { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3, cost: 450 },
          ],
        }
      case "plan4":
        return {
          range: "Acima de 2000 pessoas",
          duration: "8 semanas",
          totalHours: 272,
          totalCost: 40800,
          activities: [
            { name: "Reunião de Briefing com cliente", duration: "1 dia útil", hours: 1, cost: 150 },
            { name: "Entrevista com Stakeholders", duration: "4 dias úteis", hours: 3, cost: 450 },
            { name: "Documento de entendimento", duration: "2 dias úteis", hours: 8, cost: 1200 },
            { name: "Ajuste e reenvio", duration: "1 dia útil", hours: 4, cost: 600 },
            { name: "Estratégia de Treinamento", duration: "20 dias úteis", hours: 200, cost: 30000 },
            { name: "Apresentação para cliente", duration: "1 dia útil", hours: 2, cost: 300 },
            { name: "Ajuste e reenvio", duration: "6 dias úteis", hours: 50, cost: 7500 },
            { name: "Apresentação para outras lideranças", duration: "1 dia útil", hours: 1, cost: 150 },
            { name: "STC (sessão de transf. conhec)", duration: "1 dia útil", hours: 3, cost: 450 },
          ],
        }
      default:
        return null
    }
  }

  const planDetails = getPlanDetails()

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary to-red-700">
      <motion.div
        className="container mx-auto px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 text-white text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Contrate já o serviço
          </motion.h2>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h3
              className="text-xl font-bold mb-6"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              Planos (segundo tamanho da população-alvo do plano)
            </motion.h3>

            <motion.div
              className="space-y-4 mb-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                { id: "plan1", label: "Até 100 pessoas" },
                { id: "plan2", label: "100 a 500 pessoas" },
                { id: "plan3", label: "500 a 2000 pessoas" },
                { id: "plan4", label: "Acima de 2000 pessoas" },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.3 } }}
                >
                  <input
                    type="radio"
                    id={plan.id}
                    name="plan"
                    value={plan.id}
                    checked={selectedPlan === plan.id}
                    onChange={handlePlanChange}
                    className="mr-3 h-4 w-4"
                  />
                  <label htmlFor={plan.id} className="text-lg">
                    {plan.label}
                  </label>
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
                  <LeadForm
                    onSubmit={handleLeadSubmit}
                    service="Estratégia de Treinamento"
                    source="Calculadora de Orçamento"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {!hideCalculateButton && (
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
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
                Para calcular o orçamento, selecione um plano acima ou{" "}
                <Link href="/#contato" className="text-primary font-medium hover:underline">
                  entre em contato
                </Link>{" "}
                para conversar sobre esta solução.
              </motion.div>
            )}

            {(showBudget || leadSubmitted) && planDetails ? (
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
                      <p className="text-dark">Estratégia de Treinamento - {planDetails.range}</p>
                      <p className="text-dark text-sm">Emitido em: {new Date().toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2 text-left">Etapa</th>
                          <th className="border px-4 py-2 text-left">Atividade</th>
                          <th className="border px-4 py-2 text-left">Duração Estimada</th>
                          <th className="border px-4 py-2 text-left">Horas</th>
                          <th className="border px-4 py-2 text-left">Custo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { stage: "Briefing e Diagnóstico", activities: planDetails.activities.slice(0, 4) },
                          { stage: "Desenho", activities: [planDetails.activities[4]] },
                          { stage: "Entrega", activities: planDetails.activities.slice(5, 9) },
                        ].map((section, sectionIndex) =>
                          section.activities.map((activity, activityIndex) => (
                            <tr key={`${sectionIndex}-${activityIndex}`}>
                              {activityIndex === 0 && (
                                <td className="border px-4 py-2" rowSpan={section.activities.length}>
                                  {section.stage}
                                </td>
                              )}
                              <td className="border px-4 py-2">{activity.name}</td>
                              <td className="border px-4 py-2">{activity.duration}</td>
                              <td className="border px-4 py-2">{activity.hours}</td>
                              <td className="border px-4 py-2">{formatCurrency(activity.cost)}</td>
                            </tr>
                          )),
                        )}
                        <tr className="bg-gray-100 font-bold">
                          <td className="border px-4 py-2">Total</td>
                          <td className="border px-4 py-2"></td>
                          <td className="border px-4 py-2">{planDetails.duration}</td>
                          <td className="border px-4 py-2">{planDetails.totalHours}</td>
                          <td className="border px-4 py-2">{formatCurrency(planDetails.totalCost)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

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

                  <motion.div
                    className="mt-8 flex flex-col md:flex-row gap-4 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.button
                      onClick={generatePDF}
                      className="border border-primary text-primary px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center hover:bg-primary hover:text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Salvar orçamento em PDF
                    </motion.button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            ) : showBudget && !planDetails ? (
              <motion.div
                key="budget-error"
                className="mt-8 text-red-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                Erro: Não foi possível carregar os detalhes do orçamento. Tente novamente.
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
