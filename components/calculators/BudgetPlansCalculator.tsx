"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import Image from "next/image"
import { LeadForm, LeadFormData } from "./LeadForm"

interface Plan {
  id: string
  label: string
  range?: string
  totalCost: number
  totalHours: number
  duration: string
  activities: Array<{
    name: string
    duration: string
    hours: string
    cost: string
  }>
}

interface BudgetPlansCalculatorProps {
  calculatorId: string
  serviceName: string
  config: {
    plans: Plan[]
    hourlyRate?: number
    requiresLeadForm?: boolean
    showPDF?: boolean
  }
  display?: {
    title?: string
    subtitle?: string
    buttonText?: string
    warningMessage?: string
  }
}

export function BudgetPlansCalculator({ 
  calculatorId, 
  serviceName, 
  config,
  display 
}: BudgetPlansCalculatorProps) {
  const [selectedPlan, setSelectedPlan] = useState("")
  const [showBudget, setShowBudget] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [leadData, setLeadData] = useState<LeadFormData | null>(null)
  const budgetRef = useRef<HTMLDivElement>(null)

  const selectedPlanDetails = config.plans.find(p => p.id === selectedPlan)

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlan(e.target.value)
    setShowWarning(false)
  }

  const calculateBudget = () => {
    if (!selectedPlan) {
      setShowWarning(true)
      return
    }
    setShowBudget(true)
  }

  const handleLeadSubmit = (data: LeadFormData) => {
    setLeadData(data)
    // Aqui você pode enviar os dados para um servidor/API
    console.log("Lead captured:", data)
  }

  const generatePDF = () => {
    if (!budgetRef.current || !selectedPlanDetails) return

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

      pdf.save(`Orçamento-${serviceName.replace(/\s+/g, "-")}.pdf`)
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
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
            {display?.title || "Contrate já o serviço"}
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
              {display?.subtitle || "Selecione um plano"}
            </motion.h3>

            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {config.plans.map((plan) => (
                <motion.div
                  key={plan.id}
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
                {display?.buttonText || "Calcular"}
              </motion.button>
            </motion.div>

            {showWarning && (
              <motion.div
                className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md mb-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {display?.warningMessage || "Para calcular o orçamento, selecione um plano acima."}
              </motion.div>
            )}

            {showBudget && selectedPlanDetails && !leadData && config.requiresLeadForm !== false && (
              <LeadForm onSubmit={handleLeadSubmit} serviceName={serviceName} />
            )}

            {showBudget && selectedPlanDetails && (leadData || config.requiresLeadForm === false) && (
              <motion.div
                className="mt-8"
                ref={budgetRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="bg-white p-8">
                  <div className="flex justify-center mb-6">
                    <Image src="/images/diray-logo.png" alt="DI.RAY" width={150} height={50} className="h-12 w-auto" />
                  </div>
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">
                      Orçamento - {serviceName}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {selectedPlanDetails.range || selectedPlanDetails.label}
                    </p>
                    {leadData && (
                      <p className="text-gray-600 mt-2">
                        Preparado para: {leadData.name} - {leadData.company || leadData.email}
                      </p>
                    )}
                  </div>

                <motion.div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <motion.tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">Atividade</th>
                        <th className="border px-4 py-2 text-left">Duração</th>
                        <th className="border px-4 py-2 text-left">Horas</th>
                        <th className="border px-4 py-2 text-left">Custo</th>
                      </motion.tr>
                    </thead>
                    <tbody>
                      {selectedPlanDetails.activities.map((activity, index) => (
                        <motion.tr key={index}>
                          <td className="border px-4 py-2">{activity.name}</td>
                          <td className="border px-4 py-2">{activity.duration}</td>
                          <td className="border px-4 py-2">{activity.hours}</td>
                          <td className="border px-4 py-2">{activity.cost}</td>
                        </motion.tr>
                      ))}
                      <motion.tr className="bg-gray-100 font-bold">
                        <td className="border px-4 py-2">Total</td>
                        <td className="border px-4 py-2">{selectedPlanDetails.duration}</td>
                        <td className="border px-4 py-2">{selectedPlanDetails.totalHours}</td>
                        <td className="border px-4 py-2">{formatCurrency(selectedPlanDetails.totalCost)}</td>
                      </motion.tr>
                    </tbody>
                  </table>
                </motion.div>

                  {config.showPDF !== false && (
                    <motion.div className="mt-8 flex justify-center">
                      <motion.button
                        onClick={generatePDF}
                        className="border border-primary text-primary px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center hover:bg-primary hover:text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Baixar Orçamento em PDF
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}