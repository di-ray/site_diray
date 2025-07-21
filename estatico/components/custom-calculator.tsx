"use client"

import { useState, useEffect } from "react"
import type { CalculatorConfig } from "@/lib/cms-service-calculator"

interface CustomCalculatorProps {
  config: CalculatorConfig
}

export function CustomCalculator({ config }: CustomCalculatorProps) {
  const [values, setValues] = useState<Record<string, any>>({})
  const [result, setResult] = useState<number | null>(null)

  // Inicializar valores padrão
  useEffect(() => {
    const defaultValues: Record<string, any> = {}
    config.variables.forEach((variable) => {
      if (variable.type === "number") {
        defaultValues[variable.name] = Number.parseFloat(variable.defaultValue)
      } else {
        defaultValues[variable.name] = variable.defaultValue
      }
    })
    setValues(defaultValues)
  }, [config])

  // Calcular resultado quando os valores mudarem
  useEffect(() => {
    if (Object.keys(values).length === 0) return

    try {
      // Criar uma função a partir da fórmula
      const formula = config.formula
      const args = Object.keys(values)
      const func = new Function(...args, `return ${formula}`)

      // Executar a função com os valores atuais
      const calculatedResult = func(...args.map((arg) => values[arg]))
      setResult(calculatedResult)
    } catch (error) {
      console.error("Erro ao calcular resultado:", error)
      setResult(null)
    }
  }, [values, config.formula])

  // Manipular mudanças nos inputs
  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Renderizar input com base no tipo
  const renderInput = (variable: CalculatorConfig["variables"][0]) => {
    switch (variable.type) {
      case "number":
        return (
          <div key={variable.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{variable.label}</label>
            <input
              type="number"
              value={values[variable.name] || ""}
              onChange={(e) => handleChange(variable.name, Number.parseFloat(e.target.value) || 0)}
              min={variable.min}
              max={variable.max}
              step={variable.step || 1}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )
      case "select":
        return (
          <div key={variable.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{variable.label}</label>
            <select
              value={values[variable.name] || ""}
              onChange={(e) => handleChange(variable.name, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Calculadora de Orçamento</h2>

      <div className="space-y-4">{config.variables.map(renderInput)}</div>

      {result !== null && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <p className="text-lg font-medium">Orçamento estimado:</p>
          <p className="text-3xl font-bold text-green-600">
            R$ {result.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      )}
    </div>
  )
}
