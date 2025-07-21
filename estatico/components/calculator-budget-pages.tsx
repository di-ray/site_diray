"use client"

import type React from "react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import LeadForm from "@/components/lead-form"
import type { LeadFormData } from "@/components/lead-form"

// Adicione esta função no arquivo para buscar detalhes do plano da API
// Adicione esta função no início do arquivo, antes do componente CalculatorBudgetPages

async function fetchPlanDetails(pageId: string, planId: string) {
  try {
    const response = await fetch(`/api/plan-details?pageId=${pageId}&planId=${planId}`)
    if (!response.ok) {
      throw new Error("Failed to fetch plan details")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching plan details:", error)
    return null
  }
}

interface CalculatorBudgetPagesProps {
  pageId: string
  serviceName: string
  planOptions: Array<{ id: string; label: string }>
}

export const CalculatorBudgetPages: React.FC<CalculatorBudgetPagesProps> = ({ pageId, serviceName, planOptions }) => {
  const [selectedPlan, setSelectedPlan] = useState("")
  const [planDetails, setPlanDetails] = useState<any | null>(null)
  const [showBudget, setShowBudget] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState<boolean>(false)
  const [hideCalculateButton, setHideCalculateButton] = useState<boolean>(false)
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false)
  const budgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getDetails = async () => {
      if (selectedPlan) {
        const details = await fetchPlanDetails(pageId, selectedPlan)
        setPlanDetails(details)
      }
    }

    getDetails()
  }, [selectedPlan, pageId])

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlan(e.target.value)
    setShowWarning(false)
  }

  const handleLeadSubmit = (data: LeadFormData) => {
    const budgetAmount = planDetails ? planDetails.totalCost.toString() : "0"

    const leadDataWithBudget = {
      ...data,
      service: serviceName,
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

  const generatePDF = () => {
    if (!budgetRef.current) return

    const element = budgetRef.current

    html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`Orçamento-${serviceName.replace(/\s+/g, "-")}-DiRay.pdf`)
    })
  }

  return (
    <section className="py-20 md:py-32 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 text-white text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Planos (segundo tamanho da população-alvo do plano)
            </motion.h3>

            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {planOptions.map((plan, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
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

            {showLeadForm && !leadSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <LeadForm onSubmit={handleLeadSubmit} service={serviceName} source="Calculadora de Orçamento" />
              </motion.div>
            )}

            {!hideCalculateButton && (
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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

            {showBudget && planDetails && (
              <motion.div
                className="mt-8"
                ref={budgetRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.h3 className="text-xl font-bold mb-4">
                  Orçamento - {serviceName} - {planDetails.range}
                </motion.h3>

                <motion.div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <motion.tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">Etapa</th>
                        <th className="border px-4 py-2 text-left">Atividade</th>
                        <th className="border px-4 py-2 text-left">Duração Estimada</th>
                        <th className="border px-4 py-2 text-left">Horas</th>
                        <th className="border px-4 py-2 text-left">Custo (R$)</th>
                      </motion.tr>
                    </thead>
                    <tbody>
                      {[
                        { stage: "Briefing e Diagnóstico", activities: planDetails.activities.slice(0, 4) },
                        { stage: "Desenho", activities: [planDetails.activities[4]] },
                        { stage: "Entrega", activities: planDetails.activities.slice(5, 9) },
                      ].map((section, sectionIndex) =>
                        section.activities.map(
                          (
                            activity: { name: string; duration: string; hours: string; cost: string },
                            activityIndex: number,
                          ) => (
                            <motion.tr key={`${sectionIndex}-${activityIndex}`}>
                              {activityIndex === 0 && (
                                <td className="border px-4 py-2" rowSpan={section.activities.length}>
                                  {section.stage}
                                </td>
                              )}
                              <td className="border px-4 py-2">{activity.name}</td>
                              <td className="border px-4 py-2">{activity.duration}</td>
                              <td className="border px-4 py-2">{activity.hours}</td>
                              <td className="border px-4 py-2">{activity.cost}</td>
                            </motion.tr>
                          ),
                        ),
                      )}
                      <motion.tr className="bg-gray-100 font-bold">
                        <td className="border px-4 py-2">Total</td>
                        <td className="border px-4 py-2"></td>
                        <td className="border px-4 py-2">{planDetails.duration}</td>
                        <td className="border px-4 py-2">{planDetails.totalHours}</td>
                        <td className="border px-4 py-2">{planDetails.totalCost}</td>
                      </motion.tr>
                    </tbody>
                  </table>
                </motion.div>

                <motion.div className="mt-8">
                  <motion.h4 className="font-bold mb-2">Itens opcionais</motion.h4>
                  <motion.ul className="list-disc pl-5 space-y-2">
                    <motion.li>
                      <p className="font-medium">Reuniões e aplicações presenciais:</p>
                      <motion.ul className="list-circle pl-5">
                        <motion.li>Transporte: R$ 225,00 por hora de locomoção</motion.li>
                        <motion.li>Hospedagem: Segundo local e quantidade de diárias</motion.li>
                      </motion.ul>
                    </motion.li>
                    <motion.li>
                      <p className="font-medium">Reuniões adicionais:</p>
                      <motion.ul className="list-circle pl-5">
                        <motion.li>Presencial ou online: R$ 225,00 por hora</motion.li>
                      </motion.ul>
                    </motion.li>
                  </motion.ul>
                </motion.div>

                <motion.div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
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
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
