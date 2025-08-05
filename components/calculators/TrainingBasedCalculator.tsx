"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import Link from "next/link"
import Image from "next/image"
import { LeadForm, LeadFormData } from "./LeadForm"

interface TrainingType {
  type: "synchronous" | "asynchronous"
  durations: Array<{
    hours: number
    consultingHours: number
    cost: number
    weeks: number
    additionalPerSession?: number
  }>
}

interface TrainingBasedCalculatorProps {
  calculatorId: string
  serviceName: string
  config: {
    trainingTypes: TrainingType[]
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

export function TrainingBasedCalculator({
  calculatorId,
  serviceName,
  config,
  display
}: TrainingBasedCalculatorProps) {
  const [numTrainings, setNumTrainings] = useState<number>(0)
  const [trainings, setTrainings] = useState<
    Array<{
      format: string
      hours: number
      sessions: number
    }>
  >([])
  const [cantEstimate, setCantEstimate] = useState<boolean>(false)
  const [showBudget, setShowBudget] = useState<boolean>(false)
  const [showWarning, setShowWarning] = useState<boolean>(false)
  const [leadData, setLeadData] = useState<LeadFormData | null>(null)
  const budgetRef = useRef<HTMLDivElement>(null)
  const [calculatedBudget, setCalculatedBudget] = useState({
    baseHours: 44.25,
    baseTotal: 6637.5,
    trainingHours: 0,
    trainingTotal: 0,
    grandTotal: 6637.5,
    timeEstimate: 11,
  })

  const hourlyRate = config.hourlyRate || 150

  const handleNumTrainingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    setNumTrainings(value)

    if (value > trainings.length) {
      const newTrainings = [...trainings]
      for (let i = trainings.length; i < value; i++) {
        newTrainings.push({ format: "synchronous", hours: 0, sessions: 0 })
      }
      setTrainings(newTrainings)
    } else if (value < trainings.length) {
      setTrainings(trainings.slice(0, value))
    }

    setShowWarning(false)
  }

  const handleFormatChange = (index: number, format: string) => {
    const newTrainings = [...trainings]
    newTrainings[index].format = format
    setTrainings(newTrainings)
  }

  const handleHoursChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0
    const newTrainings = [...trainings]
    newTrainings[index].hours = value
    setTrainings(newTrainings)
  }

  const handleSessionsChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    const newTrainings = [...trainings]
    newTrainings[index].sessions = value
    setTrainings(newTrainings)
  }

  const handleCantEstimateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCantEstimate(e.target.checked)
    if (e.target.checked) {
      setShowWarning(false)
    }
  }

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const calculateBudget = () => {
    if (cantEstimate || (numTrainings > 0 && trainings.length > 0)) {
      const baseHours = 44.25
      const baseTotal = baseHours * hourlyRate

      let trainingHours = 0
      let trainingTotal = 0
      let timeEstimateInDays = 11
      let timeEstimateInWeeks = 0

      trainings.forEach((training) => {
        const trainingType = config.trainingTypes.find(t => t.type === training.format)
        if (!trainingType) return

        const duration = trainingType.durations.find(d => d.hours >= training.hours)
        if (!duration) return

        if (training.format === "synchronous") {
          const additionalSessions = Math.max(0, training.sessions - 1)
          const totalHours = duration.consultingHours + additionalSessions * (duration.additionalPerSession || 0)
          trainingHours += totalHours
          timeEstimateInWeeks = Math.max(timeEstimateInWeeks, duration.weeks)
        } else {
          trainingHours += duration.consultingHours
          timeEstimateInWeeks = Math.max(timeEstimateInWeeks, duration.weeks)
        }
      })

      trainingTotal = trainingHours * hourlyRate
      const grandTotal = baseTotal + trainingTotal
      timeEstimateInDays += timeEstimateInWeeks * 5

      setCalculatedBudget({
        baseHours,
        baseTotal,
        trainingHours,
        trainingTotal,
        grandTotal,
        timeEstimate: timeEstimateInDays,
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

  const getSyncTrainingDurations = () => {
    const syncType = config.trainingTypes.find(t => t.type === "synchronous")
    return syncType?.durations || []
  }

  const getAsyncTrainingDurations = () => {
    const asyncType = config.trainingTypes.find(t => t.type === "asynchronous")
    return asyncType?.durations || []
  }

  return (
    <section className="py-20 md:py-32 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
            {display?.title || "Orçamento - Programas de Desenvolvimento"}
          </h2>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-8">
              <label htmlFor="numTrainings" className="block text-lg font-medium mb-2">
                Quantos treinamentos com conteúdos diferentes você espera incluir no programa?
              </label>
              <input
                type="number"
                id="numTrainings"
                min="0"
                value={numTrainings || ""}
                onChange={handleNumTrainingsChange}
                disabled={cantEstimate}
                className="w-full md:w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {numTrainings > 0 &&
              trainings.map((training, index) => (
                <div key={index} className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
                  <h4 className="text-lg font-bold mb-4">Treinamento {index + 1}</h4>

                  <div className="mb-4">
                    <p className="font-medium mb-2">Formato de treinamento</p>
                    <div className="flex flex-col space-y-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          checked={training.format === "synchronous"}
                          onChange={() => handleFormatChange(index, "synchronous")}
                          className="mr-2"
                        />
                        <span>Treinamento síncrono</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          checked={training.format === "asynchronous"}
                          onChange={() => handleFormatChange(index, "asynchronous")}
                          className="mr-2"
                        />
                        <span>Treinamento assíncrono</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`hours-${index}`} className="block font-medium mb-1">
                        Total de horas {training.format === "asynchronous" ? "de navegação" : ""}
                      </label>
                      <input
                        type="number"
                        id={`hours-${index}`}
                        min="0"
                        step={training.format === "asynchronous" ? "0.5" : "1"}
                        value={training.hours || ""}
                        onChange={(e) => handleHoursChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    {training.format === "synchronous" && (
                      <div>
                        <label htmlFor={`sessions-${index}`} className="block font-medium mb-1">
                          Quantidade de turmas
                        </label>
                        <input
                          type="number"
                          id={`sessions-${index}`}
                          min="1"
                          value={training.sessions || ""}
                          onChange={(e) => handleSessionsChange(index, e)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

            <div className="mb-6">
              <label className="inline-flex items-center">
                <input type="checkbox" checked={cantEstimate} onChange={handleCantEstimateChange} className="mr-2" />
                <span>Não consigo estimar</span>
              </label>
            </div>

            <div className="text-center mb-6">
              <button
                onClick={calculateBudget}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-all duration-300"
              >
                {display?.buttonText || "Calcular"}
              </button>
            </div>

            {showWarning && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md mb-6">
                {display?.warningMessage || (
                  <>
                    Para calcular o orçamento, preencha as informações acima ou{" "}
                    <Link href="/#contato" className="text-primary font-medium hover:underline">
                      entre em contato
                    </Link>{" "}
                    para conversar sobre esta solução.
                  </>
                )}
              </div>
            )}

            {showBudget && !leadData && config.requiresLeadForm !== false && (
              <LeadForm onSubmit={handleLeadSubmit} serviceName={serviceName} />
            )}

            {showBudget && (leadData || config.requiresLeadForm === false) && (
              <div className="mt-8" ref={budgetRef}>
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
                  </div>

                  <h4 className="text-xl font-bold mb-4">1. Orçamento Parcial</h4>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">Atividade</th>
                        <th className="border px-4 py-2 text-left">Duração Estimada</th>
                        <th className="border px-4 py-2 text-left">Horas de consultoria</th>
                        <th className="border px-4 py-2 text-left">Custo (R$)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">Reunião de Briefing</td>
                        <td className="border px-4 py-2">1 dia útil</td>
                        <td className="border px-4 py-2">1</td>
                        <td className="border px-4 py-2">{formatCurrency(hourlyRate)}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Entrevista com Stakeholders</td>
                        <td className="border px-4 py-2">1 dia útil</td>
                        <td className="border px-4 py-2">4,5</td>
                        <td className="border px-4 py-2">{formatCurrency(4.5 * hourlyRate)}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Desenho do Programa</td>
                        <td className="border px-4 py-2">5 dias úteis</td>
                        <td className="border px-4 py-2">20</td>
                        <td className="border px-4 py-2">{formatCurrency(20 * hourlyRate)}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Apresentação para cliente</td>
                        <td className="border px-4 py-2">1 dia útil</td>
                        <td className="border px-4 py-2">0,75</td>
                        <td className="border px-4 py-2">{formatCurrency(0.75 * hourlyRate)}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Ajuste e reenvio</td>
                        <td className="border px-4 py-2">3 dias úteis</td>
                        <td className="border px-4 py-2">12</td>
                        <td className="border px-4 py-2">{formatCurrency(12 * hourlyRate)}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Sessão de Transferência Conhec</td>
                        <td className="border px-4 py-2">1 dia útil</td>
                        <td className="border px-4 py-2">6</td>
                        <td className="border px-4 py-2">{formatCurrency(6 * hourlyRate)}</td>
                      </tr>
                      <tr className="bg-gray-100 font-bold">
                        <td className="border px-4 py-2">Subtotal Fixo</td>
                        <td className="border px-4 py-2">11 dias úteis</td>
                        <td className="border px-4 py-2">44,25</td>
                        <td className="border px-4 py-2">{formatCurrency(calculatedBudget.baseTotal)}</td>
                      </tr>
                      {calculatedBudget.trainingHours > 0 && (
                        <>
                          <tr>
                            <td className="border px-4 py-2">Desenho e Entrega das sessões</td>
                            <td className="border px-4 py-2">
                              {Math.ceil(calculatedBudget.timeEstimate - 11)} dias úteis
                            </td>
                            <td className="border px-4 py-2">{calculatedBudget.trainingHours.toFixed(2)}</td>
                            <td className="border px-4 py-2">{formatCurrency(calculatedBudget.trainingTotal)}</td>
                          </tr>
                          <tr className="bg-gray-100 font-bold">
                            <td className="border px-4 py-2">Total Geral</td>
                            <td className="border px-4 py-2">{calculatedBudget.timeEstimate} dias úteis</td>
                            <td className="border px-4 py-2">
                              {(calculatedBudget.baseHours + calculatedBudget.trainingHours).toFixed(2)}
                            </td>
                            <td className="border px-4 py-2">{formatCurrency(calculatedBudget.grandTotal)}</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-bold mb-4">2. Tabelas de referência para treinamentos</h3>
                <p className="mb-4">
                  Construção e execução dos treinamentos: Use as tabelas abaixo para estimar os custos de construção e
                  execução de treinamentos dentro do programa.
                </p>

                <div className="mb-8">
                  <h4 className="font-bold mb-2">Preços por hora e quantidade de turmas (treinamentos síncronos)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2 text-left">Duração da sessão</th>
                          <th className="border px-4 py-2 text-left">Horas de consultoria</th>
                          <th className="border px-4 py-2 text-left">Custo para 1 turma</th>
                          <th className="border px-4 py-2 text-left">Adicional por turma</th>
                          <th className="border px-4 py-2 text-left">Tempo Total*</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getSyncTrainingDurations().map((duration, index) => (
                          <tr key={index}>
                            <td className="border px-4 py-2">{duration.hours} hora(s)</td>
                            <td className="border px-4 py-2">{duration.consultingHours}</td>
                            <td className="border px-4 py-2">{formatCurrency(duration.cost)}</td>
                            <td className="border px-4 py-2">
                              {formatCurrency((duration.additionalPerSession || 0) * hourlyRate)}
                            </td>
                            <td className="border px-4 py-2">{duration.weeks} semanas</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-xs mt-1 text-gray-500">*excluindo tempo de tarefas do cliente</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold mb-2">Preços por hora (treinamento assíncronos)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2 text-left">Duração do conteúdo</th>
                          <th className="border px-4 py-2 text-left">Horas de consultoria</th>
                          <th className="border px-4 py-2 text-left">Custo desenvolvimento</th>
                          <th className="border px-4 py-2 text-left">Tempo Total*</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getAsyncTrainingDurations().map((duration, index) => (
                          <tr key={index}>
                            <td className="border px-4 py-2">{duration.hours} hora navegação</td>
                            <td className="border px-4 py-2">{duration.consultingHours}</td>
                            <td className="border px-4 py-2">{formatCurrency(duration.cost)}</td>
                            <td className="border px-4 py-2">{duration.weeks} semanas</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-xs mt-1 text-gray-500">*excluindo tempo de tarefas do cliente</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">3. Itens opcionais</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <p className="font-medium">Reuniões e aplicações presenciais:</p>
                    <ul className="list-circle pl-5">
                      <li>Transporte: R$ 225,00 por hora de locomoção</li>
                      <li>Hospedagem: Segundo local e quantidade de diárias</li>
                    </ul>
                  </li>
                  <li>
                    <p className="font-medium">Reuniões adicionais:</p>
                    <ul className="list-circle pl-5">
                      <li>Presencial ou online: R$ 225,00 por hora</li>
                    </ul>
                  </li>
                </ul>

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
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}