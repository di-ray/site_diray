"use client"
import { useState, useEffect } from "react"
import { client } from '@/tina/__generated__/client'
import { TinaCalculator } from '../TinaCalculator'

interface SolutionCalculatorProps {
  slug?: string
  title?: string
  basePrice?: number
  factors?: Array<{
    name: string
    options: Array<{
      label: string
      multiplier: number
    }>
  }>
  calculatorType?: 'legacy' | 'tina'
  calculatorId?: string
}

export function SolutionCalculator({ 
  slug, 
  title, 
  basePrice, 
  factors, 
  calculatorType = 'legacy',
  calculatorId 
}: SolutionCalculatorProps) {
  const [selectedValues, setSelectedValues] = useState<Record<string, number>>({})
  const [result, setResult] = useState(basePrice || 0)
  const [calculatorData, setCalculatorData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Carregar calculadora TinaCMS se necessário
  useEffect(() => {
    const loadCalculator = async () => {
      if (calculatorType === 'tina' && calculatorId) {
        setLoading(true)
        try {
          // calculatorId pode vir como string ou objeto
          let relativePath = ''
          if (typeof calculatorId === 'string') {
            relativePath = calculatorId.replace('content/calculators/', '')
          } else if (calculatorId && typeof calculatorId === 'object' && 'id' in calculatorId) {
            relativePath = (calculatorId as any).id.replace('content/calculators/', '')
          }
          
          console.log('Loading calculator:', relativePath)
          
          const response = await (client.queries as any).calculator({
            relativePath: relativePath,
          })
          setCalculatorData(response)
        } catch (error) {
          console.error('Error loading calculator:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    loadCalculator()
  }, [calculatorId, calculatorType])

  // Configurar valores padrão para calculadora legada
  useEffect(() => {
    if (calculatorType === 'legacy' && factors) {
      const defaultValues: Record<string, number> = {}
      factors.forEach((factor) => {
        defaultValues[factor.name] = factor.options[0].multiplier
      })
      setSelectedValues(defaultValues)
    }
  }, [factors, calculatorType])

  // Calcular resultado para calculadora legada
  useEffect(() => {
    if (calculatorType === 'legacy' && basePrice) {
      let multiplier = 1
      Object.values(selectedValues).forEach((value) => {
        multiplier *= typeof value === 'number' ? value : 1
      })
      setResult(Math.round(basePrice * multiplier))
    }
  }, [selectedValues, basePrice, calculatorType])

  const handleFactorChange = (factorName: string, multiplier: number) => {
    setSelectedValues((prev) => ({ ...prev, [factorName]: multiplier }))
  }

  // Renderizar calculadora TinaCMS
  if (calculatorType === 'tina') {
    if (loading) {
      return (
        <section className="py-20 md:py-32 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-center">Carregando calculadora...</p>
              </div>
            </div>
          </div>
        </section>
      )
    }

    if (!calculatorData) {
      return null
    }

    return (
      <TinaCalculator
        query={calculatorData.query}
        variables={calculatorData.variables}
        data={calculatorData.data}
      />
    )
  }

  // Renderizar calculadora legada
  if (!factors || !basePrice) {
    return null
  }

  return (
    <section id="calculadora" className="py-16 md:py-24 bg-gradient-to-r from-primary to-red-700">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">Simule seu investimento</h2>
        <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 mb-8">
          {factors.map((factor, idx) => (
            <div key={idx} className="mb-6">
              <label className="block text-dark font-semibold mb-2">{factor.name}</label>
              <select
                className="w-full p-2 rounded bg-dark text-white"
                value={selectedValues[factor.name]}
                onChange={e => handleFactorChange(factor.name, Number(e.target.value))}
              >
                {factor.options.map((opt, i) => (
                  <option key={i} value={opt.multiplier}>{opt.label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="text-center">
          <div className="text-lg text-white mb-2">Investimento estimado:</div>
          <div className="text-4xl font-bold text-white mb-6">R$ {result.toLocaleString("pt-BR")}</div>
        </div>
      </div>
    </section>
  )
}
