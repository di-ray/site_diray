"use client"

import React from "react"
import { motion, type Variants } from "framer-motion"
import { Sparkles, DollarSign, Award, Unlink } from "lucide-react"
import { tinaField } from "tinacms/dist/react"

// Animation Variants for Staggered Effects
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

interface Feature {
  icon: string
  title: string
  description: string
}

interface WhyDiraySectionProps {
  heading?: string
  features?: Feature[]
}

export function WhyDiraySection({ 
  heading = "Por que", 
  features = [] 
}: WhyDiraySectionProps) {
  const defaultFeatures = [
    {
      icon: "Sparkles",
      title: "Transparência",
      description: "Saiba desde o primeiro dia exatamente o que será feito, quanto custará e quais as métricas de sucesso."
    },
    {
      icon: "DollarSign",
      title: "Economia",
      description: "Um só prestador e soluções usando aplicativos do dia a dia. Sem cobranças extras e sistemas caros e complexos"
    },
    {
      icon: "Award",
      title: "Excelência",
      description: "Número limitado de clientes aliado a mais de 20 anos de experiência em multinacionais"
    },
    {
      icon: "Unlink",
      title: "Autonomia",
      description: "Seu time treinado nas metodologias e em IA para replicar as soluções o quanto quiser"
    }
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <section id="por-que-diray" className="py-16 md:py-24 bg-gradient-to-b from-red-500 to-primary">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          data-tina-field={tinaField({ heading }, "heading")}
          className="text-3xl md:text-4xl font-bold mb-16 text-white items-center text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {heading} <span className="text-primary">DI.RAY</span>
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayFeatures.map((feature, i) => {
            const Icon = feature.icon === "Sparkles" ? Sparkles :
                        feature.icon === "DollarSign" ? DollarSign :
                        feature.icon === "Award" ? Award :
                        feature.icon === "Unlink" ? Unlink : Sparkles;
            
            return (
              <motion.div
                key={i}
                className="bg-dark/50 p-8 rounded-lg border border-primary/30 hover:border-white transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <div className="flex flex-col items-center mb-6">
                  <motion.div
                    className="icon-container w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                  >
                    <Icon size={32} className="text-[#ffcd38]" />
                  </motion.div>
                  <h3 
                    data-tina-field={tinaField(feature, `features.${i}.title`)}
                    className="text-2xl font-bold text-white text-center"
                  >
                    {feature.title}
                  </h3>
                </div>
                <p 
                  data-tina-field={tinaField(feature, `features.${i}.description`)}
                  className="text-white text-center"
                >
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}