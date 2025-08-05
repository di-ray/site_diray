"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import Image from "next/image"
import { LeadForm, LeadFormData } from "./LeadForm"

interface SalaryRange {
  id: string
  label: string
  min?: number
  max?: number
  multiplier?: number
}

interface SalaryBasedCalculatorProps {
  calculatorId: string
  serviceName: string
  config: {
    salaryRanges: SalaryRange[]
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

export function SalaryBasedCalculator({
  calculatorId,
  serviceName,
  config,
  display
}: SalaryBasedCalculatorProps) {
  const [salaryValues, setSalaryValues] = useState<Record<string, number>>({})
  const [showBudget, setShowBudget] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [leadData, setLeadData] = useState<LeadFormData | null>(null)
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSalaryValues({
      ...salaryValues,
      [name]: parseInt(value) || 0,
    })
    setShowWarning(false)
  }

  const calculateBudget = () => {
    const totalPeople = Object.values(salaryValues).reduce((a, b) => a + b, 0)
    
    if (totalPeople > 0) {
      // Cálculo baseado no Workshop de Metas original
      const totalSessions = Math.max(1, Math.ceil(totalPeople / 10))
      const workshopDesignHours = Math.max(12, totalSessions * 12)
      const workshopDesignDays = Math.max(3, totalSessions * 2)
      
      let facilitationHours = 0
      config.salaryRanges.forEach((range) => {
        const count = salaryValues[range.id] || 0
        facilitationHours += count * (range.multiplier || 1)
      })
      facilitationHours += totalSessions * 8

      const facilitationDays = Math.max(1, totalSessions * 0.5)
      const briefingHours = 1
      const stcHours = 2
      const totalHours = briefingHours + workshopDesignHours + facilitationHours + stcHours
      const totalCost = totalHours * (config.hourlyRate || 150)
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

      setShowBudget(true)
      setShowWarning(false)
    } else {
      setShowWarning(true)
      setShowBudget(false)
    }
  }

  const handleLeadSubmit = (data: LeadFormData) => {
    setLeadData(data)
    // Aqui você pode enviar os dados para um servidor/API
    console.log("Lead captured:", data)
  }

  const generatePDF = () => {
    if (!budgetRef.current) return

    const element = budgetRef.current

    html2canvas(element, {
      scale: 1.5,
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth + 50,
      windowHeight: element.scrollHeight + 50,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      })

      const imgWidth = 190
      const pageHeight = 280
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 10

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`Orçamento-${serviceName.replace(/\s+/g, "-")}.pdf`)
    })
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary to-red-700">
      <motion.div
        className="container mx-auto px-4"
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
              {display?.subtitle || "Quantas pessoas estarão no escopo do serviço por faixa salarial?"}
            </motion.h3>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {config.salaryRanges.map((range, index) => (
                <motion.div
                  key={range.id}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <label htmlFor={range.id} className="block text-sm font-medium mb-2">
                    {range.label}
                  </label>
                  <input
                    type="number"
                    id={range.id}
                    name={range.id}
                    value={salaryValues[range.id] || ""}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </motion.div>
              ))}
            </motion.div>

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
                {display?.warningMessage || "Para calcular o orçamento, preencha as informações acima."}
              </motion.div>
            )}

            {showBudget && !leadData && config.requiresLeadForm !== false && (
              <LeadForm onSubmit={handleLeadSubmit} serviceName={serviceName} />
            )}

            {showBudget && (leadData || config.requiresLeadForm === false) && (
              <motion.div
                className="mt-8"
                ref={budgetRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white p-8">
                  <div className="flex justify-center mb-6">
                    <Image src="/images/diray-logo.png" alt="DI.RAY" width={150} height={50} className="h-12 w-auto" />
                  </div>
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">Orçamento - {serviceName}</h3>
                    {leadData && (
                      <p className="text-gray-600">
                        Preparado para: {leadData.name} - {leadData.company || leadData.email}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      Emitido em: {new Date().toLocaleDateString("pt-BR")}
                    </p>
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
                        <td className="border px-4 py-2">{formatCurrency(config.hourlyRate || 150)}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Desenho</td>
                        <td className="border px-4 py-2">Desenho do Workshop</td>
                        <td className="border px-4 py-2">{calculatedBudget.workshopDesignDays} dias úteis</td>
                        <td className="border px-4 py-2">{calculatedBudget.workshopDesignHours}</td>
                        <td className="border px-4 py-2">
                          {formatCurrency(calculatedBudget.workshopDesignHours * (config.hourlyRate || 150))}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2" rowSpan={2}>Entrega</td>
                        <td className="border px-4 py-2">Facilitação</td>
                        <td className="border px-4 py-2">{calculatedBudget.facilitationDays} dia(s) útil(is)</td>
                        <td className="border px-4 py-2">{calculatedBudget.facilitationHours}</td>
                        <td className="border px-4 py-2">
                          {formatCurrency(calculatedBudget.facilitationHours * (config.hourlyRate || 150))}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Sessão de transferência</td>
                        <td className="border px-4 py-2">1 dia útil</td>
                        <td className="border px-4 py-2">2</td>
                        <td className="border px-4 py-2">{formatCurrency(2 * (config.hourlyRate || 150))}</td>
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

                  {config.showPDF !== false && (
                    <div className="mt-8 flex justify-center">
                      <motion.button
                        onClick={generatePDF}
                        className="border border-primary text-primary px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center hover:bg-primary hover:text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Baixar Orçamento em PDF
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}