"use client"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"
import { tinaField } from "tinacms/dist/react"

interface Step {
  title?: string
  description?: string
  icon?: string
}

interface SolutionTimelineProps {
  timelineTitle?: string
  steps?: Step[]
}

export function SolutionTimeline({ timelineTitle = "Etapas da Implementação", steps = [] }: SolutionTimelineProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-dark to-gray-900">
      <motion.div className="container mx-auto px-4" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <motion.h2 
          data-tina-field={tinaField({ timelineTitle }, "timelineTitle")}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white" 
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {timelineTitle}
        </motion.h2>
        <div className="relative max-w-2xl mx-auto">
          <motion.div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-red-500 z-10 hidden sm:block" initial={{ height: 0 }} whileInView={{ height: "100%" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: "easeInOut" }} />
          <motion.div className="space-y-8 w-full">
            {steps && steps.map((step, index) => {
              const Icon = Icons[step.icon] || Icons.ChevronRight;
              return (
                <motion.div key={index} className="relative flex items-center mb-12 w-full z-20" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <div className="w-full sm:w-3/4 bg-gradient-to-br from-primary to-red-500 p-4 sm:p-6 rounded-[30px_0px_30px_30px] shadow-lg hover:shadow-xl transition-all duration-300">
                    <h3 
                      data-tina-field={tinaField(step, `steps.${index}.title`)}
                      className="text-base sm:text-lg font-bold text-white mb-2"
                    >
                      {step.title}
                    </h3>
                    <p 
                      data-tina-field={tinaField(step, `steps.${index}.description`)}
                      className="text-white/80 text-sm"
                    >
                      {step.description}
                    </p>
                  </div>
                  <motion.div className="absolute right-[-19px] top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-20">
                    <Icon className="text-primary w-5 h-5" />
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
