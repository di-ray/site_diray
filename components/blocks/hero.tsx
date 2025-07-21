"use client"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { tinaField } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import CTAButton from "@/components/ui/cta-button"
import { initScrollReveal } from "@/lib/scroll-reveal"

export const HeroSection = (props) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  useEffect(() => {
    const cleanup = initScrollReveal()
    return () => cleanup?.()
  }, [])

  // Suporte para heroTitle, heroHighlight, heroSubtitle (igual soluções)
  const { heroTitle, heroHighlight, heroSubtitle, heading, subheading, buttonText = "Saiba Mais", buttonLink = "/solucoes" } = props;

  return (
    <section className="relative architecture-bg min-h-screen flex items-center py-32 md:py-48">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-2xl">
          <div className="mb-8"></div>
          <motion.h1
            className="text-6xl md:text-7xl lg:text-7xl font-black tracking-tight mb-10 text-white font-poppins hero-heading-rich"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {heroTitle && (
              <>
                <span className="block">{heroTitle}</span>
                <span className="block text-highlight">{heroHighlight}</span>
                <span className="block">{heroSubtitle}</span>
              </>
            )}
            {!heroTitle && (Array.isArray(heading) || typeof heading === "object" ? (
              <TinaMarkdown content={heading} />
            ) : (
              heading?.split('\n').map((line, index) => (
                <span key={index} className="block">
                  {line.includes('**') ? (
                    <>
                      {line.split('**')[0]}
                      <span className="text-highlight">{line.split('**')[1]}</span>
                      {line.split('**')[2]}
                    </>
                  ) : line}
                </span>
              ))
            ))}
          </motion.h1>

          {subheading && (
            <p data-tina-field={tinaField(props, "subheading")}
               className="text-lg md:text-xl mb-8 text-white animate-fadeInUp delay-1000">
              {subheading}
            </p>
          )}

          <div className="mt-8 animate-fadeInUp delay-1000">
            <CTAButton href={buttonLink} variant="primary" size="lg" showArrow>
              <span data-tina-field={tinaField(props, "buttonText")}>{buttonText}</span>
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}

// Adicione este CSS globalmente (ex: em globals.css):
/*
.hero-heading-rich code,
.hero-heading-rich strong {
  color: #ff5959;
  background: none;
  font-weight: inherit;
  font-size: inherit;
  padding: 0;
  border-radius: 0;
}
*/
