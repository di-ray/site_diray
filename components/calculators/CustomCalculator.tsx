"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import Image from "next/image"
import { LeadForm, LeadFormData } from "./LeadForm"

interface Variable {
  name: string
  label: string
  type: "number" | "select" | "text"
  defaultValue: string
  min?: number
  max?: number
  step?: number
  options?: Array<{ value: string; label: string }>
}

interface CustomCalculatorProps {
  calculatorId: string
  serviceName: string
  config: {
    formula: string
    variables: Variable[]
    hourlyRate?: number
    requiresLeadForm?: boolean
    showPDF?: boolean
  }
  display?: {
    title?: string
    subtitle?: string
    buttonText?: string
    warningMessage?: string
    resultLabel?: string
  }
}

export function CustomCalculator({ 
  calculatorId, 
  serviceName, 
  config,
  display 
}: CustomCalculatorProps) {
  const [values, setValues] = useState<Record<string, any>>({})
  const [result, setResult] = useState<number | null>(null)
  const [showBudget, setShowBudget] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [leadData, setLeadData] = useState<LeadFormData | null>(null)
  const budgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const defaultValues: Record<string, any> = {}
    config.variables.forEach((variable) => {
      if (variable.type === "number") {
        defaultValues[variable.name] = parseFloat(variable.defaultValue)
      } else {
        defaultValues[variable.name] = variable.defaultValue
      }
    })
    setValues(defaultValues)
  }, [config])

  useEffect(() => {
    if (Object.keys(values).length === 0) return

    try {
      const formula = config.formula
      const args = Object.keys(values)
      const func = new Function(...args, `return ${formula}`)
      const calculatedResult = func(...args.map((arg) => values[arg]))
      setResult(calculatedResult)
    } catch (error) {
      console.error("Erro ao calcular resultado:", error)
      setResult(null)
    }
  }, [values, config.formula])

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
    setShowWarning(false)
  }

  const calculateBudget = () => {
    if (result === null) {
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
    if (!budgetRef.current || result === null) return

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

  const renderInput = (variable: Variable) => {
    switch (variable.type) {
      case "number":
        return (
          <div key={variable.name} className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">{variable.label}</label>
            <input
              type="number"
              value={values[variable.name] || ""}
              onChange={(e) => handleChange(variable.name, parseFloat(e.target.value) || 0)}
              min={variable.min}
              max={variable.max}
              step={variable.step || 1}
              className="w-full p-2 rounded bg-dark text-white"
            />
          </div>
        )
      case "select":
        return (
          <div key={variable.name} className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">{variable.label}</label>
            <select
              value={values[variable.name] || ""}
              onChange={(e) => handleChange(variable.name, e.target.value)}
              className="w-full p-2 rounded bg-dark text-white"
            >
              {variable.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )
      default:
        return null
    }
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
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            {display?.title || "Simule seu investimento"}
          </motion.h2>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            {!showBudget ? (
              <>
                {display?.subtitle && (
                  <motion.h3
                    className="text-xl font-bold mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {display.subtitle}
                  </motion.h3>
                )}

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {config.variables.map(renderInput)}
                </motion.div>

                <motion.div
                  className="text-center mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" as const }}
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
              </>
            ) : !leadData && config.requiresLeadForm !== false ? (
              <LeadForm onSubmit={handleLeadSubmit} serviceName={serviceName} />
            ) : (
              <motion.div
                className="mt-8"
                ref={budgetRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" as const }}
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

                  <div className="overflow-x-auto mb-8">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2 text-left">Parâmetro</th>
                          <th className="border px-4 py-2 text-left">Valor Selecionado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {config.variables.map((variable) => {
                          const displayValue = variable.type === 'select' 
                            ? variable.options?.find(opt => opt.value === values[variable.name])?.label
                            : values[variable.name];
                          
                          return (
                            <tr key={variable.name}>
                              <td className="border px-4 py-2">{variable.label}</td>
                              <td className="border px-4 py-2">{displayValue}</td>
                            </tr>
                          );
                        })}
                        <tr className="bg-gray-50">
                          <td className="border px-4 py-2 font-medium">Base de Cálculo</td>
                          <td className="border px-4 py-2">
                            {config.formula.includes('9600') ? 'R$ 9.600,00' : 
                             config.formula.includes('7200') ? 'R$ 7.200,00' : 
                             'Valor customizado'}
                          </td>
                        </tr>
                        <tr className="bg-gray-100 font-bold">
                          <td className="border px-4 py-2">
                            {display?.resultLabel || "Investimento Total Estimado"}
                          </td>
                          <td className="border px-4 py-2">
                            R$ {result?.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-8">
                    <p className="text-sm text-blue-800">
                      <strong>Observação:</strong> Este orçamento é uma estimativa baseada nos parâmetros selecionados. 
                      O valor final pode variar de acordo com as necessidades específicas do seu projeto.
                    </p>
                  </div>

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