"use client"
import { useEffect } from "react"
import { motion, type Variants } from "framer-motion"
import { tinaField } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import CTAButton from "@/components/ui/cta-button"
import { initScrollReveal } from "@/lib/scroll-reveal"

interface HeroSectionProps {
  heading?: string
  subheading?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export const HeroSection = (props: HeroSectionProps) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  }

  useEffect(() => {
    const cleanup = initScrollReveal()
    return () => cleanup?.()
  }, [])

  // Conteúdo padrão do projeto DIRAY original
  const defaultHeading = "Desenvolva\nEngaje\nCresça"
  const defaultSubheading = "Soluções em desenvolvimento organizacional"
  const defaultDescription = "que você contrata uma vez e reaplica quantas vezes quiser."
  const defaultButtonText = "Saiba Mais"
  const defaultButtonLink = "/solucoes"

  const heading = props.heading || defaultHeading
  const subheading = props.subheading || defaultSubheading
  const description = props.description || defaultDescription
  const buttonText = props.buttonText || defaultButtonText
  const buttonLink = props.buttonLink || defaultButtonLink

  return (
    <section className="relative architecture-bg min-h-screen flex items-center py-32 md:py-48">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-2xl">
          <div className="mb-8"></div>
          <motion.h1
            className="text-6xl md:text-7xl lg:text-7xl font-black tracking-tight mb-10 text-white font-poppins"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            data-tina-field={tinaField(props as any, "heading")}
          >
            {heading.split('\n').map((line, index) => (
              <span key={index} className="block">
                {line === "Engaje" ? (
                  <span className="text-highlight"> {line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-2 text-white font-medium"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            data-tina-field={tinaField(props as any, "subheading")}
          >
            {subheading}
          </motion.p>

          <motion.p 
            className="text-lg md:text-xl mb-8 text-white animate-fadeInUp delay-1000"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            data-tina-field={tinaField(props as any, "description")}
          >
            {description}
          </motion.p>

          <div className="mt-8 animate-fadeInUp delay-1000">
            <CTAButton href={buttonLink} variant="primary" size="lg" showArrow>
              <span data-tina-field={tinaField(props as any, "buttonText")}>{buttonText}</span>
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}

