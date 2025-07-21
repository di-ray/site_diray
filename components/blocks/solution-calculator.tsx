"use client"
import { useState, useRef, useEffect } from "react"

export function SolutionCalculator({ slug, title, basePrice, factors }) {
  const [selectedValues, setSelectedValues] = useState<Record<string, number>>({})
  const [result, setResult] = useState(basePrice)

  useEffect(() => {
    const defaultValues: Record<string, number> = {}
    factors.forEach((factor) => {
      defaultValues[factor.name] = factor.options[0].multiplier
    })
    setSelectedValues(defaultValues)
  }, [factors])

  useEffect(() => {
    let multiplier = 1
    Object.values(selectedValues).forEach((value) => {
      multiplier *= typeof value === 'number' ? value : 1
    })
    setResult(Math.round(basePrice * multiplier))
  }, [selectedValues, basePrice])

  const handleFactorChange = (factorName: string, multiplier: number) => {
    setSelectedValues((prev) => ({ ...prev, [factorName]: multiplier }))
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
