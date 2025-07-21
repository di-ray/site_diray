"use client"

import Image from "next/image"

export interface LogoCarouselProps {
  title?: string
  description?: string
  logos?: Array<{
    name: string
    src: string
    alt: string
  }>
}

const defaultLogos = [
  { name: "Meta", src: "/images/clients/logo1.png", alt: "Meta" },
  { name: "Nubank", src: "/images/clients/logo2.png", alt: "Nubank" },
  { name: "McDonald's", src: "/images/clients/logo3.png", alt: "McDonald's" },
  { name: "Danone", src: "/images/clients/logo4.png", alt: "Danone" },
  { name: "Empresa 5", src: "/images/clients/logo5.png", alt: "Cliente 5" },
  { name: "Empresa 6", src: "/images/clients/logo6.png", alt: "Cliente 6" },
  { name: "Empresa 7", src: "/images/clients/logo7.webp", alt: "Cliente 7" },
]

export function LogoCarousel({ 
  title = "Empresas que confiam na DI.RAY",
  description = "Já trabalhamos com grandes empresas e startups inovadoras",
  logos = defaultLogos
}: LogoCarouselProps) {
  return (
    <section className="py-16 md:py-24 bg-dark/50">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-white/70 text-lg">
              {description}
            </p>
          )}
        </div>

        <div className="logo-carousel-container">
          <div className="logo-carousel animate-fadeIn">
            {/* Primeira série de logos */}
            {logos.map((logo, index) => (
              <div key={`logo-${index}`} className="logo-item">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  className="logo-item img"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ))}
            
            {/* Duplicar logos para efeito de loop contínuo */}
            {logos.map((logo, index) => (
              <div key={`logo-duplicate-${index}`} className="logo-item">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  className="logo-item img"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            Mais de 20 anos de experiência em multinacionais líderes
          </p>
        </div>
      </div>
    </section>
  )
}