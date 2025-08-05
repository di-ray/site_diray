"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import VideoBackground from "../video-background"

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

interface SolutionHeroProps {
  heroTitle?: string | null
  heroHighlight?: string | null
  heroSubtitle?: string | null
  backgroundImage?: string | null
  videoSrc?: string | null
  videoStartTime?: number | null
  videoEndTime?: number | null
  overlayOpacity?: number | null
}

export function SolutionHero({ 
  heroTitle, 
  heroHighlight, 
  heroSubtitle, 
  backgroundImage,
  videoSrc,
  videoStartTime = 70,
  videoEndTime = 76,
  overlayOpacity = 0.7
}: SolutionHeroProps) {
  return (
    <section className="relative bg-dark min-h-[60vh] flex py-20 md:py-32">
      {videoSrc ? (
        <VideoBackground
          videoSrc={videoSrc}
          overlayOpacity={overlayOpacity}
          startTime={videoStartTime || 70}
          endTime={videoEndTime || 76}
        />
      ) : backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover object-center absolute inset-0 z-0"
            priority
          />
          <div className="absolute inset-0 z-10 bg-black/70 pointer-events-none" />
        </>
      ) : null}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-3xl text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-white font-poppins"
            variants={itemVariants}
          >
            {heroTitle}
            <br />
            <span className="text-highlight">{heroHighlight}</span>
          </motion.h1>
          <motion.p className="text-base sm:text-lg md:text-xl mb-8 text-white" variants={itemVariants}>
            {heroSubtitle}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="#contato"
              className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Saiba Mais
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
