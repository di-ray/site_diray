"use client"

import type React from "react"
import { motion, type Variants } from "framer-motion"
import { ArrowRight, ArrowUpDown, MessageSquare, Users, BookOpen, BarChart } from "lucide-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

interface MoreSolutionsProps {
  currentPage: string // Identifica a página atual
}

export const MoreSolutions: React.FC<MoreSolutionsProps> = ({ currentPage }) => {
  const solutions = [
    {
      title: "Workshop de Metas",
      description: [
        "Construção e aplicação de workshops para desenho e revisão de metas individuais e coletivas usando S.M.A.R.T.",
      ],
      icon: ArrowUpDown,
      href: "/solucoes/workshop-de-metas",
    },
    {
      title: "Plano de Comunicação",
      description: [
        "Desenvolvimento de um plano de comunicação para campanhas internas e/ou iniciativas de mudança organizacional.",
      ],
      icon: MessageSquare,
      href: "/solucoes/plano-de-comunicacao",
    },
    {
      title: "Alinhamento de Cultura",
      description: [
        "Mapeamento e diagnóstico da cultura da empresa e desenho de plano de ação para aumento do alinhamento cultural.",
      ],
      icon: Users,
      href: "/solucoes/alinhamento-de-cultura",
    },
    {
      title: "Estratégia de Treinamento",
      description: [
        "Desenho da estratégia de conteúdos e programas que atendam às necessidades de treinamento e desenvolvimento da organização.",
      ],
      icon: BookOpen,
      href: "/solucoes/estrategia-de-treinamento",
    },
    {
      title: "Formação em IA customizada",
      description: [
        "Implementação de um programa customizado de formação em IA para desenvolver seu time nas ferramentas e prompts que ele realmente precisa",
      ],
      icon: BarChart,
      href: "/solucoes/formacao-de-ia",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-dark to-gray-900  relative overflow-hidden">
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
            Conheça mais soluções
          </motion.h2>
          <motion.p className="text-lg text-white mb-12" variants={itemVariants}>
            Esqueça as propostas surpresa. Calcule seu orçamento aqui mesmo no site.
          </motion.p>
        </motion.div>

        {/* Contêiner dos Cards */}
        <div className="relative">
          {/* Máscara para opacidade translúcida nas extremidades (apenas em telas pequenas) */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {solutions.map((solution, index) => {
              const isCurrent = solution.href === currentPage
              return (
                <motion.div
                  key={index}
                  className="bg-primary rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  onClick={() => !isCurrent && (window.location.href = solution.href)} // Redireciona ao clicar no card
                  style={{ cursor: isCurrent ? "default" : "pointer" }}
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* Ícone com círculo de fundo */}
                    <motion.div
                      className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center mb-4"
                      whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                    >
                      <solution.icon className="text-white" width={24} height={24} />
                    </motion.div>

                    {/* Título */}
                    <h3 className="text-xl font-bold mb-3 text-white">{solution.title}</h3>

                    {/* Descrição */}
                    {solution.description.map((desc, i) => (
                      <p key={i} className="text-white text-sm md:text-base mb-2">
                        {desc}
                      </p>
                    ))}

                    {/* Link "Saiba Mais" */}
                    {!isCurrent && (
                      <div className="mt-auto flex items-center justify-end">
                        <a href={solution.href} className="text-white font-medium hover:underline group">
                          <motion.span whileHover={{ x: 5, transition: { duration: 0.3 } }}>
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </motion.span>
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Setas de Navegação (apenas em telas pequenas) */}
          <div className="md:hidden flex justify-between absolute inset-y-0 left-0 right-0 items-center px-4">
            <button className="text-white transition-colors">
              <ChevronLeft size={32} />
            </button>
            <button className="text-white transition-colors">
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
