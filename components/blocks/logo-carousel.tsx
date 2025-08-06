"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { tinaField } from "tinacms/dist/react"

export interface LogoCarouselProps {
  title?: string
  description?: string
  logoImage?: string
  showAnimation?: boolean
}

export function LogoCarousel({ 
  title = "Empresas que confiam na DI.RAY",
  description = "Já trabalhamos com grandes empresas e startups inovadoras",
  logoImage = "/images/client-logos.png",
  showAnimation = true
}: LogoCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showAnimation) return
    
    const carousel = carouselRef.current
    if (!carousel) return

    let scrollAmount = 0
    const speed = 0.5
    let lastTime = 0
    let animationId: number

    const step = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp
      const deltaTime = timestamp - lastTime
      lastTime = timestamp

      scrollAmount += (speed * deltaTime) / 16

      if (scrollAmount >= carousel.scrollWidth / 2) {
        scrollAmount = 0
      }

      carousel.scrollLeft = scrollAmount
      animationId = requestAnimationFrame(step)
    }

    animationId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [showAnimation])

  return (
    <section className="py-16 md:py-24 bg-dark/50">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          {title && (
            <h2 
              data-tina-field={tinaField({  title  } as any, "title")}
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
            >
              {title}
            </h2>
          )}
          {description && (
            <p 
              data-tina-field={tinaField({  description  } as any, "description")}
              className="text-white/70 text-lg"
            >
              {description}
            </p>
          )}
        </div>

        <div className="w-full flex justify-center items-center mb-8">
          <div 
            ref={carouselRef}
            className="overflow-hidden whitespace-nowrap max-w-4xl"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
            }}
          >
            <Image 
              src={logoImage} 
              alt="Client Logos" 
              width={800} 
              height={60} 
              className="client-logos inline-block" 
              data-tina-field={tinaField({  logoImage  } as any, "logoImage")}
              style={{ objectFit: 'contain' }}
            />
            {/* Duplicate for seamless loop */}
            {showAnimation && (
              <Image 
                src={logoImage} 
                alt="Client Logos" 
                width={800} 
                height={60} 
                className="client-logos inline-block ml-8" 
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/60 text-sm">
            Mais de 20 anos de experiência em multinacionais líderes
          </p>
        </div>
      </div>
    </section>
  )
}