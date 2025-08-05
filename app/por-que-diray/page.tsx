"use client"

import { WhyDiraySection }  from "@/components/blocks/why-diray"
import CTAButton from "@/components/ui/cta-button"
import { AboutSection } from "@/components/blocks/about"
import ContatoSection from "@/components/solutions/contato-section"

export default function PorQueDiray() {



  return (
    <>
      {/* Hero Section */}
      <section className="relative architecture-bg min-h-[70vh] flex items-center py-32 md:py-48">
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-10 text-white font-poppins">
              Por que <br />
              <span className="text-highlight">DI.RAY?</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white">
              Conheça nossa abordagem única e descubra como podemos transformar sua organização
            </p>
            <div className="mt-8">
              <CTAButton href="#diferenciais" variant="primary" size="lg" showArrow>
                Nossos diferenciais
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Why DI.RAY Section */}
      <div id="diferenciais">
        <WhyDiraySection />
      </div>

      {/* About Section */}
      <AboutSection />

      <ContatoSection />
    </>
  )
}
