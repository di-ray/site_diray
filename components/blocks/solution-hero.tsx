"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export function SolutionHero({ heroTitle, heroHighlight, heroSubtitle, backgroundImage }) {
  return (
    <section className="relative min-h-[60vh] flex items-center py-20 md:py-32">
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover object-center absolute inset-0 z-0 opacity-80"
            priority
          />
          {/* Overlay gradiente escuro para melhor contraste do texto */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none" />
        </>
      )}
      <div className="container mx-auto px-4 relative z-20">
        <motion.div className="max-w-3xl text-left" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-white font-poppins"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {heroTitle}
            <br />
            <span className="text-highlight">{heroHighlight}</span>
          </motion.h1>
          <motion.p className="text-base sm:text-lg md:text-xl mb-8 text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            {heroSubtitle}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
