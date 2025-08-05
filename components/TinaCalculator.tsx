"use client"

import { useTina } from "tinacms/dist/react"
import {
  BudgetPlansCalculator,
  SalaryBasedCalculator,
  TrainingBasedCalculator,
  CustomCalculator
} from "./calculators"

interface TinaCalculatorProps {
  query: string
  variables: any
  data: any
}

export function TinaCalculator({ query, variables, data: initialData }: TinaCalculatorProps) {
  const { data } = useTina({
    query,
    variables,
    data: initialData,
  })

  const calculator = data?.calculator

  if (!calculator) {
    return <div>Calculadora não encontrada</div>
  }

  const commonProps = {
    calculatorId: calculator.id || calculator._sys?.filename,
    serviceName: calculator.name,
    config: calculator.config || {},
    display: calculator.display || {},
  }

  switch (calculator.type) {
    case 'budget-plans':
      return <BudgetPlansCalculator {...commonProps} />
    
    case 'salary-based':
      return <SalaryBasedCalculator {...commonProps} />
    
    case 'training-based':
      return <TrainingBasedCalculator {...commonProps} />
    
    case 'custom':
      return <CustomCalculator {...commonProps} />
    
    default:
      return <div>Tipo de calculadora não suportado: {calculator.type}</div>
  }
}