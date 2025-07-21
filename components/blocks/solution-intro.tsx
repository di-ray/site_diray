"use client"
import { motion } from "framer-motion"
import { Clock, DollarSign } from "lucide-react"

export function SolutionIntro({ introTitle, introDescription, minPrice, minDuration }) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-red-700 to-primary">
      <motion.div className="container mx-auto px-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.2 }}>
            <motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{introTitle}</h2>
            </motion.div>
            <motion.div>
              {introDescription && introDescription.map((paragraph, index) => (
                <p key={index} className="text-white text-lg mb-6">{paragraph}</p>
              ))}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-center">
                  <DollarSign className="text-white mr-2" size={20} />
                  <span className="text-white">Preço mínimo: {minPrice}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="text-white mr-2" size={20} />
                  <span className="text-white">Duração mínima: {minDuration}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
