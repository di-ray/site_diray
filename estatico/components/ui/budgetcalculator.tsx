"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"

// Budget Calculator Component
function BudgetCalculator() {
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
    baseHours: 44.25, // Sum of fixed hours (briefing, stakeholders, etc.)
    baseTotal: 6637.5, // baseHours * 150
    trainingHours: 0,
    trainingTotal: 0,
    grandTotal: 6637.5,
    timeEstimate: 11, // Base time in days
  })

  // Handle number of trainings change
  const handleNumTrainingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 0
    setNumTrainings(value)

    // Adjust trainings array size
    if (value > trainings.length) {
      // Add new trainings
      const newTrainings = [...trainings]
      for (let i = trainings.length; i < value; i++) {
        newTrainings.push({ format: "synchronous", hours: 0, sessions: 0 })
      }
      setTrainings(newTrainings)
    } else if (value < trainings.length) {
      // Remove excess trainings
      setTrainings(trainings.slice(0, value))
    }

    setShowWarning(false)
  }

  // Handle training format change
  const handleFormatChange = (index: number, format: string) => {
    const newTrainings = [...trainings]
    newTrainings[index].format = format
    setTrainings(newTrainings)
  }

  // Handle training hours change
  const handleHoursChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value) || 0
    const newTrainings = [...trainings]
    newTrainings[index].hours = value
    setTrainings(newTrainings)
  }

  // Handle training sessions change
  const handleSessionsChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 0
    const newTrainings = [...trainings]
    newTrainings[index].sessions = value
    setTrainings(newTrainings)
  }

  // Handle can't estimate checkbox
  const handleCantEstimateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCantEstimate(e.target.checked)
    if (e.target.checked) {
      setShowWarning(false)
    }
  }

  // Format currency in BRL
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  // Calculate budget based on user inputs
  const calculateBudget = () => {
    if (cantEstimate || (numTrainings > 0 && trainings.length > 0)) {
      // Base costs - fixed hours of consultancy
      const baseHours = 44.25 // 1 + 4.5 + 20 + 0.75 + 12 + 6
      const baseTotal = baseHours * 150

      let trainingHours = 0
      let trainingTotal = 0
      let timeEstimateInDays = 11 // Base time in days (fixed components)
      let timeEstimateInWeeks = 0

      // Calculate costs for trainings
      trainings.forEach((training) => {
        if (training.format === "synchronous") {
          // Calculate synchronous training costs
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

          // Calculate additional sessions
          const additionalSessions = Math.max(0, training.sessions - 1)
          const totalHours = sessionHours + additionalSessions * additionalHoursPerSession

          trainingHours += totalHours
          timeEstimateInWeeks = Math.max(timeEstimateInWeeks, durationInWeeks)
        } else {
          // Calculate asynchronous training costs
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

      // Calculate total cost and time
      trainingTotal = trainingHours * 150
      const grandTotal = baseTotal + trainingTotal
      timeEstimateInDays += timeEstimateInWeeks * 5 // Convert weeks to days (5 working days per week)

      // Set calculated budget
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
    <section className="py-20 md:py-32 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
            Orçamento - Programas de Desenvolvimento
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

            {/* Training configurations */}
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
                Calcular
              </button>
            </div>

            {showWarning && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md mb-6">
                Para calcular o orçamento, preencha as informações acima ou{" "}
                <Link href="/#contato" className="text-primary font-medium hover:underline">
                  entre em contato
                </Link>{" "}
                para conversar sobre esta solução.
              </div>
            )}

            {showBudget && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">1. Orçamento Parcial</h3>

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
                        <td className="border px-4 py-2">150</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Entrevista com Stakeholders</td>
                        <td className="border px-4 py-2">1 dia útil</td>
                        <td className="border px-4 py-2">4,5</td>
                        <td className="border px-4 py-2">675</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Desenho do Programa</td>
                        <td className="border px-4 py-2">5 dias úteis</td>
                        <td className="border px-4 py-2">20</td>
                        <td className="border px-4 py-2">3.000</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Apresentação para cliente</td>
                        <td className="border px-4 py-2">1 dia útil</td>
                        <td className="border px-4 py-2">0,75</td>
                        <td className="border px-4 py-2">112,50</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Ajuste e reenvio</td>
                        <td className="border px-4 py-2">3 dias úteis</td>
                        <td className="border px-4 py-2">12</td>
                        <td className="border px-4 py-2">1.800</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Sessão de Transferência Conhec</td>
                        <td className="border px-4 py-2">1 dia útil</td>
                        <td className="border px-4 py-2">6</td>
                        <td className="border px-4 py-2">900</td>
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
                        <tr>
                          <td className="border px-4 py-2">1 hora</td>
                          <td className="border px-4 py-2">39</td>
                          <td className="border px-4 py-2">{formatCurrency(39 * 150)}</td>
                          <td className="border px-4 py-2">{formatCurrency(2 * 150)}</td>
                          <td className="border px-4 py-2">2 semanas</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">2 horas</td>
                          <td className="border px-4 py-2">41</td>
                          <td className="border px-4 py-2">{formatCurrency(41 * 150)}</td>
                          <td className="border px-4 py-2">{formatCurrency(4 * 150)}</td>
                          <td className="border px-4 py-2">2 semanas</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">4 horas</td>
                          <td className="border px-4 py-2">45</td>
                          <td className="border px-4 py-2">{formatCurrency(45 * 150)}</td>
                          <td className="border px-4 py-2">{formatCurrency(8 * 150)}</td>
                          <td className="border px-4 py-2">3 semanas</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">1 dia (8 horas)</td>
                          <td className="border px-4 py-2">74</td>
                          <td className="border px-4 py-2">{formatCurrency(74 * 150)}</td>
                          <td className="border px-4 py-2">{formatCurrency(16 * 150)}</td>
                          <td className="border px-4 py-2">4 semanas</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">2 dias (16 horas)</td>
                          <td className="border px-4 py-2">145</td>
                          <td className="border px-4 py-2">{formatCurrency(145 * 150)}</td>
                          <td className="border px-4 py-2">{formatCurrency(32 * 150)}</td>
                          <td className="border px-4 py-2">6 semanas</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">3 dias (24 horas)</td>
                          <td className="border px-4 py-2">213</td>
                          <td className="border px-4 py-2">{formatCurrency(213 * 150)}</td>
                          <td className="border px-4 py-2">{formatCurrency(48 * 150)}</td>
                          <td className="border px-4 py-2">8 semanas</td>
                        </tr>
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
                        <tr>
                          <td className="border px-4 py-2">0,5 hora navegação</td>
                          <td className="border px-4 py-2">73</td>
                          <td className="border px-4 py-2">{formatCurrency(73 * 150)}</td>
                          <td className="border px-4 py-2">4 semanas</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">1 hora navegação</td>
                          <td className="border px-4 py-2">125</td>
                          <td className="border px-4 py-2">{formatCurrency(125 * 150)}</td>
                          <td className="border px-4 py-2">6 semanas</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">1,5 horas navegação</td>
                          <td className="border px-4 py-2">177</td>
                          <td className="border px-4 py-2">{formatCurrency(177 * 150)}</td>
                          <td className="border px-4 py-2">8 semanas</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">2 horas navegação</td>
                          <td className="border px-4 py-2">229</td>
                          <td className="border px-4 py-2">{formatCurrency(229 * 150)}</td>
                          <td className="border px-4 py-2">10 semanas</td>
                        </tr>
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

                <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center">
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Salvar orçamento em PDF
                  </button>
                  <Link
                    href="/#contato"
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center"
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Contratar o produto
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
