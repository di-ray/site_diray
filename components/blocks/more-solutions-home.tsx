"use client"

import Link from "next/link"
import { tinaField } from "tinacms/dist/react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpDown, MessageSquare, Users, BookOpen, BarChart } from "lucide-react"

interface Solution {
  slug: string
  icon: string
  title: string
  excerpt?: string
  description?: string
}

interface MoreSolutionsSectionProps {
  heading?: string
  subtitle?: string
  solutions?: Solution[]
  currentPage?: string
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function MoreSolutionsHomeSection({ heading = "Conheça mais soluções", subtitle = "Esqueça as propostas surpresa. Calcule seu orçamento aqui mesmo no site.", solutions = [], currentPage = "" }: MoreSolutionsSectionProps) {
  const defaultSolutions = [
    {
      slug: "workshop-de-metas",
      icon: "ArrowUpDown",
      title: "Workshop de Metas",
      description: "Construção e aplicação de workshops para desenho e revisão de metas individuais e coletivas usando S.M.A.R.T."
    },
    {
      slug: "plano-de-comunicacao",
      icon: "MessageSquare",
      title: "Plano de Comunicação",
      description: "Desenvolvimento de um plano de comunicação para campanhas internas e/ou iniciativas de mudança organizacional."
    },
    {
      slug: "alinhamento-de-cultura",
      icon: "Users",
      title: "Alinhamento de Cultura",
      description: "Mapeamento e diagnóstico da cultura da empresa e desenho de plano de ação para aumento do alinhamento cultural."
    },
    {
      slug: "estrategia-de-treinamento",
      icon: "BookOpen",
      title: "Estratégia de Treinamento",
      description: "Desenho de uma estratégia de treinamento robusta para desenvolver a organização ou departamentos específicos."
    },
    {
      slug: "formacao-de-ia",
      icon: "BarChart",
      title: "Formação em IA customizada",
      description: "Implementação de um programa customizado de formação em IA para desenvolver seu time nas ferramentas e prompts que ele realmente precisa"
    }
  ];

  const displaySolutions = solutions.length > 0 ? solutions : defaultSolutions;
  
  // Filtra a solução atual para não aparecer na lista
  const filteredSolutions = displaySolutions.filter((s) => s.slug !== currentPage)
  
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-dark to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Título */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            data-tina-field={tinaField({ heading }, "heading")} 
            className="text-3xl md:text-4xl font-bold mb-6 text-white" 
            variants={itemVariants}
          >
            {heading}
          </motion.h2>
          <motion.p 
            data-tina-field={tinaField({ subtitle }, "subtitle")} 
            className="text-lg text-white mb-12" 
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
        </motion.div>
        {/* Contêiner dos Cards */}
        <div className="relative">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredSolutions.map((solution, index) => {
              const isCurrent = solution.slug === currentPage;
              const Icon = solution.icon === "ArrowUpDown" ? ArrowUpDown :
                          solution.icon === "MessageSquare" ? MessageSquare :
                          solution.icon === "Users" ? Users :
                          solution.icon === "BookOpen" ? BookOpen :
                          solution.icon === "BarChart" ? BarChart : Users;
              
              return (
                <motion.div
                  key={index}
                  className="bg-primary rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col min-h-[280px]"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  onClick={() => !isCurrent && (window.location.href = `/solucoes/${solution.slug}`)}
                  style={{ cursor: isCurrent ? "default" : "pointer" }}
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* Ícone com círculo de fundo */}
                    <motion.div
                      className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center mb-4"
                      whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                    >
                      <Icon className="text-white" width={24} height={24} />
                    </motion.div>

                    {/* Título */}
                    <h3 
                      data-tina-field={tinaField(solution, `solutions.${index}.title`)}
                      className="text-xl font-bold mb-3 text-white"
                    >
                      {solution.title}
                    </h3>

                    {/* Descrição */}
                    <p 
                      data-tina-field={tinaField(solution, `solutions.${index}.description`)}
                      className="text-white text-sm md:text-base mb-2 flex-grow"
                    >
                      {solution.description}
                    </p>

                    {/* Link "Saiba Mais" */}
                    {!isCurrent && (
                      <div className="mt-auto flex items-center justify-end">
                        <a href={`/solucoes/${solution.slug}`} className="text-white font-medium hover:underline group">
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
        </div>
      </div>
    </section>
  )
}
