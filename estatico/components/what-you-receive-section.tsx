"use client"

import type React from "react"
import { motion, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface Item {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string[]
  href?: string // Opcional, caso queira adicionar links como no MoreSolutions
}

interface WhatYouReceiveSectionProps {
  title?: string
  items: Item[]
}

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

export function WhatYouReceiveSection({ title = "O que você recebe?", items }: WhatYouReceiveSectionProps) {
  // Determina o número de colunas com base na quantidade de itens (máximo 4)
  const gridColsClass = items.length <= 4 ? `md:grid-cols-${items.length}` : "md:grid-cols-4"

  return (
    <section className="py-20 md:py-32 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Título */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" variants={itemVariants}>
            {title}
          </motion.h2>
          <motion.p className="text-lg text-white mb-12" variants={itemVariants}>
            Tudo o que você precisa para transformar sua equipe.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className={`grid grid-cols-1 ${gridColsClass} gap-8 max-w-6xl mx-auto`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="bg-primary rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <div className="p-6">
                {/* Ícone com círculo de fundo */}
                <motion.div
                  className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                >
                  <item.icon className="text-white" width={24} height={24} />
                </motion.div>

                {/* Título */}
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>

                {/* Descrição */}
                {item.description.map((desc, i) => (
                  <p key={i} className="text-white text-sm md:text-base mb-2">
                    <span className="text-white">◉ </span>
                    {desc}
                  </p>
                ))}

                {/* Link "Saiba Mais" (opcional) */}
                {item.href && (
                  <a
                    href={item.href}
                    className="text-primary font-medium hover:underline inline-flex items-center group mt-4"
                  >
                    <motion.span whileHover={{ x: 5, transition: { duration: 0.3 } }}>
                      Saiba Mais
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
