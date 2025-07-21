"use client"

import Link from "next/link"
import { useState } from "react"

export interface BudgetCalculatorProps {
  title?: string
  description?: string
}

export function BudgetCalculator({ 
  title = "Orçamento - Programas de Desenvolvimento",
  description = "Calcule o investimento necessário para seu programa de treinamento" 
}: BudgetCalculatorProps) {
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
  const [calculatedBudget, setCalculatedBudget] = useState({
    baseHours: 44.25,
    baseTotal: 6637.5,
    trainingHours: 0,
    trainingTotal: 0,
    grandTotal: 6637.5,
    timeEstimate: 11,
  })

  const handleNumTrainingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 0
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
    const value = Number.parseFloat(e.target.value) || 0
    const newTrainings = [...trainings]
    newTrainings[index].hours = value
    setTrainings(newTrainings)
  }

  const handleSessionsChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 0
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
      const baseTotal = baseHours * 150

      let trainingHours = 0
      let trainingTotal = 0
      let timeEstimateInDays = 11
      let timeEstimateInWeeks = 0

      trainings.forEach((training) => {
        if (training.format === "synchronous") {
          let sessionHours = 0
          let additionalHoursPerSession = 0
          let durationInWeeks = 0

          if (training.hours <= 1) {
            sessionHours = 39
            additionalHoursPerSession = 2
            durationInWeeks = 2
          } else if (training.hours <= 2) {
            sessionHours = 41
            additionalHoursPerSession = 4
            durationInWeeks = 2
          } else if (training.hours <= 4) {
            sessionHours = 45
            additionalHoursPerSession = 8
            durationInWeeks = 3
          } else if (training.hours <= 8) {
            sessionHours = 74
            additionalHoursPerSession = 16
            durationInWeeks = 4
          } else if (training.hours <= 16) {
            sessionHours = 145
            additionalHoursPerSession = 32
            durationInWeeks = 6
          } else {
            sessionHours = 213
            additionalHoursPerSession = 48
            durationInWeeks = 8
          }

          const additionalSessions = Math.max(0, training.sessions - 1)
          const totalHours = sessionHours + additionalSessions * additionalHoursPerSession

          trainingHours += totalHours
          timeEstimateInWeeks = Math.max(timeEstimateInWeeks, durationInWeeks)
        } else {
          let sessionHours = 0
          let durationInWeeks = 0

          if (training.hours <= 0.5) {
            sessionHours = 73
            durationInWeeks = 4
          } else if (training.hours <= 1) {
            sessionHours = 125
            durationInWeeks = 6
          } else if (training.hours <= 1.5) {
            sessionHours = 177
            durationInWeeks = 8
          } else {
            sessionHours = 229
            durationInWeeks = 10
          }

          trainingHours += sessionHours
          timeEstimateInWeeks = Math.max(timeEstimateInWeeks, durationInWeeks)
        }
      })

      trainingTotal = trainingHours * 150
      const grandTotal = baseTotal + trainingTotal
      timeEstimateInDays += timeEstimateInWeeks * 5

      setCalculatedBudget({
        baseHours: baseHours,
        baseTotal: baseTotal,
        trainingHours: trainingHours,
        trainingTotal: trainingTotal,
        grandTotal: grandTotal,
        timeEstimate: timeEstimateInDays,
      })

      setShowBudget(true)
      setShowWarning(false)
    } else {
      setShowWarning(true)
      setShowBudget(false)
    }
  }

  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary to-red-700 section-illumination">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-white/90 text-center mb-8">{description}</p>
          )}

          <div className="bg-dark/50 backdrop-blur-sm p-8 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300">
            <div className="mb-8">
              <label htmlFor="numTrainings" className="form-label">
                Quantos treinamentos com conteúdos diferentes você espera incluir no programa?
              </label>
              <input
                type="number"
                id="numTrainings"
                min="0"
                value={numTrainings || ""}
                onChange={handleNumTrainingsChange}
                disabled={cantEstimate}
                className="form-input w-full md:w-32"
              />
            </div>

            {numTrainings > 0 &&
              trainings.map((training, index) => (
                <div key={index} className="mb-8 p-6 border border-primary/20 rounded-lg bg-dark/30">
                  <h4 className="text-lg font-bold mb-4 text-white">Treinamento {index + 1}</h4>

                  <div className="mb-4">
                    <p className="form-label">Formato de treinamento</p>
                    <div className="flex flex-col space-y-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          checked={training.format === "synchronous"}
                          onChange={() => handleFormatChange(index, "synchronous")}
                          className="mr-2 text-primary"
                        />
                        <span className="text-white">Treinamento síncrono</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          checked={training.format === "asynchronous"}
                          onChange={() => handleFormatChange(index, "asynchronous")}
                          className="mr-2 text-primary"
                        />
                        <span className="text-white">Treinamento assíncrono</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`hours-${index}`} className="form-label">
                        Total de horas {training.format === "asynchronous" ? "de navegação" : ""}
                      </label>
                      <input
                        type="number"
                        id={`hours-${index}`}
                        min="0"
                        step={training.format === "asynchronous" ? "0.5" : "1"}
                        value={training.hours || ""}
                        onChange={(e) => handleHoursChange(index, e)}
                        className="form-input"
                      />
                    </div>
                    {training.format === "synchronous" && (
                      <div>
                        <label htmlFor={`sessions-${index}`} className="form-label">
                          Quantidade de turmas
                        </label>
                        <input
                          type="number"
                          id={`sessions-${index}`}
                          min="1"
                          value={training.sessions || ""}
                          onChange={(e) => handleSessionsChange(index, e)}
                          className="form-input"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

            <div className="mb-6">
              <label className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={cantEstimate} 
                  onChange={handleCantEstimateChange} 
                  className="mr-2 text-primary" 
                />
                <span className="text-white">Não consigo estimar</span>
              </label>
            </div>

            <div className="text-center mb-6">
              <button
                onClick={calculateBudget}
                className="form-submit cta-button"
              >
                Calcular Orçamento
              </button>
            </div>

            {showWarning && (
              <div className="bg-yellow-900/50 border border-yellow-500/50 text-yellow-200 p-4 rounded-md mb-6">
                Para calcular o orçamento, preencha as informações acima ou{" "}
                <Link href="/#contato" className="text-primary font-medium hover:underline">
                  entre em contato
                </Link>{" "}
                para conversar sobre esta solução.
              </div>
            )}

            {showBudget && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-white">Orçamento Estimado</h3>

                <div className="bg-dark/50 p-6 rounded-lg border border-primary/20 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <h4 className="text-sm font-medium text-white/70 mb-1">Base (Estrutura)</h4>
                      <p className="text-2xl font-bold text-white">{formatCurrency(calculatedBudget.baseTotal)}</p>
                      <p className="text-sm text-white/60">{calculatedBudget.baseHours} horas</p>
                    </div>
                    {calculatedBudget.trainingHours > 0 && (
                      <div className="text-center">
                        <h4 className="text-sm font-medium text-white/70 mb-1">Treinamentos</h4>
                        <p className="text-2xl font-bold text-white">{formatCurrency(calculatedBudget.trainingTotal)}</p>
                        <p className="text-sm text-white/60">{calculatedBudget.trainingHours.toFixed(1)} horas</p>
                      </div>
                    )}
                    <div className="text-center md:col-span-1">
                      <h4 className="text-sm font-medium text-primary mb-1">Total Geral</h4>
                      <p className="text-3xl font-bold text-primary">{formatCurrency(calculatedBudget.grandTotal)}</p>
                      <p className="text-sm text-white/60">{calculatedBudget.timeEstimate} dias úteis</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link
                    href="/#contato"
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center cta-button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.966 8.966 0 01-4.57-1.22L3 21l1.22-5.43A8.966 8.966 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z"
                      />
                    </svg>
                    Solicitar Proposta Detalhada
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}