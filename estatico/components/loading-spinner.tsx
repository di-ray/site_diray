"use client"

import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: number
  text?: string
  fullScreen?: boolean
}

export function LoadingSpinner({ size = 24, text = "Carregando...", fullScreen = false }: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <motion.div
          className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
          <p className="text-gray-700 font-medium">{text}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className={`h-${size} w-${size} text-primary animate-spin mr-2`} />
      {text && <p className="text-gray-700">{text}</p>}
    </div>
  )
}

export default LoadingSpinner
