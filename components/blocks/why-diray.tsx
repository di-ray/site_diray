"use client"

import React from "react"
import { motion, type Variants } from "framer-motion"
import { Sparkles, DollarSign, Award, Unlink } from "lucide-react"

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

import * as Icons from "lucide-react"
import { tinaField } from "tinacms/dist/react"

interface Feature {
  icon: string
  title: string
  description: string
}

interface WhyDiraySectionProps {
  heading: string
  features?: Feature[]
}

export function WhyDiraySection({ heading = "Por que escolher a DI.RAY?", features = [] }: WhyDiraySectionProps) {
  const defaultFeatures = [
    {
      icon: "Target",
      title: "Foco em Resultados",
      description: "Soluções práticas e efetivas que geram resultados concretos para sua organização."
    },
    {
      icon: "Users",
      title: "Capacitação do Time",
      description: "Transferimos conhecimento para que seu time replique as soluções quando quiser."
    },
    {
      icon: "Zap",
      title: "Implementação Rápida",
      description: "Metodologia ágil que permite implementar mudanças sem sistemas complexos."
    },
    {
      icon: "Shield",
      title: "20 Anos de Experiência",
      description: "Experiência em multinacionais como Meta, Nubank, McDonald's e Danone."
    },
    {
      icon: "Bot",
      title: "Inteligência Artificial",
      description: "Uso de IA para simplificar processos e maximizar a eficiência organizacional."
    },
    {
      icon: "CheckCircle",
      title: "Autonomia Garantida",
      description: "Você não fica dependente de consultoria após a implementação."
    }
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary to-red-700 section-illumination">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 data-tina-field={tinaField({ heading }, "heading")} className="text-3xl md:text-4xl font-bold mb-6 text-white reveal">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayFeatures.map((feature, i) => {
            const IconComponent = Icons[feature.icon as keyof typeof Icons] as React.ElementType | undefined;
            return (
              <motion.div 
                key={i} 
                className="bg-dark/50 backdrop-blur-sm p-8 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 reveal text-center"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="icon-container mb-6">
                  {IconComponent ? <IconComponent className="text-primary mx-auto" size={48} /> : <Icons.ShieldCheck className="text-primary mx-auto" size={48} />}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
