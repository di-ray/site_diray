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
  heading: string
  subtitle?: string
  solutions?: Solution[]
  currentPage: string
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

export function MoreSolutionsSection({ 
  heading = "Conheça mais soluções", 
  subtitle = "Esqueça as propostas surpresa. Calcule seu orçamento aqui mesmo no site.",
  solutions = [], 
  currentPage 
}: MoreSolutionsSectionProps) {
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
      description: "Desenho da estratégia de conteúdos e programas que atendam às necessidades de treinamento e desenvolvimento da organização."
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
    <section className="py-20 md:py-32 bg-primary">
      <div className="container mx-auto px-4">
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
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredSolutions.map((solution, index) => {
            const Icon = solution.icon === "ArrowUpDown" ? ArrowUpDown :
                        solution.icon === "MessageSquare" ? MessageSquare :
                        solution.icon === "Users" ? Users :
                        solution.icon === "BookOpen" ? BookOpen :
                        solution.icon === "BarChart" ? BarChart : Users;
            
            return (
              <motion.div
                key={index}
                className="rounded-lg shadow-md overflow-hidden transition-all duration-300 bg-white hover:shadow-xl"
                variants={itemVariants}
                onClick={() => window.location.href = `/solucoes/${solution.slug}`}
                style={{ cursor: "pointer" }}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-primary/10">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
                  <p className="flex-grow text-muted-foreground mb-6">
                    {solution.description}
                  </p>
                  <div className="mt-auto flex items-center justify-end">
                    <ArrowRight className="text-primary h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}