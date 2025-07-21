"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import ContactForm from "@/components/contact-form"
import CTAButton from "@/components/ui/cta-button"
import { initScrollReveal } from "@/lib/scroll-reveal"
import type { Variants } from "framer-motion"
import { motion } from "framer-motion"
import { WhyDiray } from "@/components/why-diray"
import { useContent } from "@/lib/use-content"
import { MoreSolutions } from "@/components/more-solutions-home"
import LoadingSpinner from "@/components/loading-spinner"

export default function Home() {
  const { content, isLoading, getText, getItemText } = useContent()

  useEffect(() => {
    if (!isLoading) {
      const cleanup = initScrollReveal()
      return () => cleanup?.()
    }
  }, [isLoading])

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-dark">
        <LoadingSpinner size={32} />
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative architecture-bg min-h-screen flex items-center py-32 md:py-48">
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-2xl">
            <div className="mb-8"></div>
            <motion.h1
              className="text-6xl md:text-7xl lg:text-7xl font-black tracking-tight mb-10 text-white font-poppins"
              variants={itemVariants}
            >
              Desenvolva
              <br />
              <span className="text-highlight"> Engaje</span>
              <br />
              Cresça
            </motion.h1>
            
            <p className="text-lg md:text-xl mb-8 text-white animate-fadeInUp delay-1000">
              {getText("home", "hero", "description")}
            </p>
            <div className="mt-8 animate-fadeInUp delay-1000">
              <CTAButton href="/solucoes" variant="primary" size="lg" showArrow>
                Saiba Mais
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Section */}
      <section className="bg-gradient-to-r from-primary to-red-700 py-16 md:py-24 section-illumination">
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center md:text-left">
                Seu time <br className="hidden md:block" /> engajado <br className="hidden md:block" />e produtivo
              </h2>
            </div>
            <div className="reveal">
              <p className="text-white text-lg mb-6">
                Soluções em performance e cultura organizacional para equipes mais produtivas e engajadas. Usando
                inteligência artificial e experiência na área, entrego soluções práticas e efetivas e{" "}
                <strong>capacito seu time para replicar as soluções quando quiser, sem depender de consultoria.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="bg-dark py-16 md:py-24 section-illumination-red">
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white text-center reveal">
            Como a DI.RAY me ajuda?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-primary to-red-400 p-8 rounded-lg border border-primary/30 hover:border-primary transition-all duration-300 reveal">
              <div className="flex flex-col items-center mb-6">
                <div className="icon-container">
                  <svg
                    width="48"
                    height="48"
                    fill="currentColor"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 75.698 75.698"
                    className="text-white"
                  >
                    <path
                      style={{ fill: "#fffff" }}
                      d="M36.165,28.722h2.516h2.516c0,2.289-2.516,2.855-2.516,2.855S36.165,31.011,36.165,28.722z
 M31.855,17.595c-1.127-0.915-1.257-3.395-1.27-4.133c-0.005-0.268,0.099-0.527,0.287-0.718c0.188-0.191,0.444-0.299,0.713-0.299
h6.004c0.292,0,0.568,0.127,0.759,0.349c0.018,0.021,0.022,0.049,0.038,0.071h0.735c0.016-0.022,0.02-0.05,0.038-0.071
c0.189-0.221,0.467-0.349,0.759-0.349h6.005c0.269,0,0.525,0.108,0.714,0.299c0.188,0.191,0.291,0.45,0.286,0.719
c-0.014,0.738-0.144,3.217-1.27,4.132c-0.709,0.576-1.811,0.934-2.875,0.934c-1.035,0-1.91-0.334-2.463-0.94
c-0.55-0.602-0.916-1.772-1.139-2.724h-0.845c-0.223,0.952-0.589,2.122-1.14,2.724c-0.554,0.606-1.428,0.94-2.463,0.94
C33.665,18.529,32.564,18.171,31.855,17.595z M41.137,14.444c0.195,0.813,0.449,1.569,0.656,1.796
c0.162,0.178,0.54,0.289,0.985,0.289c0.598,0,1.262-0.2,1.613-0.486c0.176-0.167,0.354-0.835,0.454-1.599H41.137z M32.663,14.444
c0.1,0.764,0.279,1.434,0.456,1.601c0.608,0.495,2.214,0.612,2.596,0.194c0.208-0.228,0.461-0.983,0.656-1.795H32.663z
 M75.169,57.891v6.558c0,0.552-0.447,1-1,1l-3.352,0.001v9.248c0,0.552-0.447,1-1,1s-1-0.448-1-1v-9.247l-1.734,0.001v9.246
c0,0.552-0.447,1-1,1s-1-0.448-1-1v-9.246l-54.469,0.023v9.222c0,0.552-0.447,1-1,1s-1-0.448-1-1v-9.221L6.88,65.477v9.221
c0,0.552-0.447,1-1,1s-1-0.448-1-1v-9.22l-3.352,0.001c-0.266,0-0.52-0.105-0.707-0.293s-0.293-0.442-0.293-0.707v-6.589
c0-0.204,0.063-0.403,0.179-0.57l9.5-13.687c0.187-0.269,0.493-0.43,0.821-0.43h3.417V21.249c0-6.865,6.447-9.377,9.856-9.747
c0.54-0.057,1.04,0.336,1.101,0.885s-0.336,1.042-0.884,1.104c-0.33,0.037-8.073,0.981-8.073,7.758v1.508h13.69
c-0.848-1.386-1.475-3.051-1.717-5.033c-0.949-0.558-2.693-1.986-2.607-4.902c0.016-0.534,0.063-2.159,1.293-2.623
c0.166-0.063,0.331-0.09,0.494-0.098C28.495,4.477,33.367,0,38.752,0c0.002,0,0.004,0,0.004,0c5.385,0,10.256,4.477,11.153,10.102
c0.163,0.007,0.328,0.034,0.493,0.096c1.229,0.464,1.277,2.089,1.294,2.624c0.085,2.917-1.659,4.344-2.607,4.902
c-0.242,1.981-0.868,3.647-1.717,5.033h13.802v-1.508c0-6.777-7.743-7.722-8.073-7.758c-0.548-0.062-0.944-0.555-0.884-1.104
s0.559-0.942,1.101-0.885c3.409,0.369,9.856,2.881,9.856,9.747V40h6.646c0.305,0,0.593,0.139,0.782,0.377s0.261,0.55,0.192,0.847
l-1.707,7.428l5.907,8.675C75.109,57.494,75.169,57.69,75.169,57.891z M68.565,42H50.153L47.96,52.875h18.105L68.565,42z
 M46.107,51.945l0.762-3.782h-4.907L46.107,51.945z M61.175,29.123H52.74c0.883,0.637,1.791,1.418,2.646,2.365h5.789V29.123z
 M56.919,33.488c0.464,0.717,0.887,1.504,1.254,2.365h3.003v-2.365H56.919z M61.175,40v-2.147h-2.298
c0.189,0.676,0.341,1.393,0.454,2.147H61.175z M30.354,16.997c0.569,6.779,5.905,8.973,8.4,8.973s7.831-2.193,8.4-8.973
c0.032-0.385,0.283-0.718,0.646-0.853c0.072-0.029,1.969-0.81,1.896-3.263c-0.009-0.315-0.039-0.531-0.07-0.672
c-0.129,0.086-0.277,0.208-0.387,0.323c-0.378,0.399-1.013,0.417-1.412,0.04c-0.4-0.378-0.422-1.007-0.046-1.409
c0.043-0.046,0.129-0.13,0.235-0.226C47.5,6.009,43.347,2,38.756,2c-0.001,0-0.001,0-0.002,0h-0.001
c-4.592,0-8.745,4.007-9.262,8.936c0.106,0.096,0.193,0.181,0.236,0.227c0.377,0.403,0.355,1.036-0.048,1.414
c-0.4,0.376-1.034,0.357-1.413-0.047c-0.107-0.113-0.256-0.234-0.384-0.32c-0.031,0.142-0.062,0.356-0.07,0.672
c-0.073,2.453,1.824,3.234,1.905,3.267C30.07,16.287,30.323,16.619,30.354,16.997z M16.446,24.757v2.365h12.045
c0.696-0.347,1.136-0.51,1.158-0.518c0.013-0.004,0.026-0.001,0.038-0.005l-0.032-0.595c-0.03-0.552,0.392-1.023,0.943-1.053
c0.542-0.034,1.023,0.392,1.053,0.944l0.205,3.742l2.27-1.065c0.503-0.235,1.096-0.019,1.33,0.48c0.234,0.5,0.02,1.095-0.48,1.33
l-3.612,1.695c-0.135,0.063-0.28,0.095-0.425,0.095c-0.178,0-0.355-0.047-0.513-0.142c-0.286-0.17-0.468-0.472-0.485-0.804
l-0.138-2.526c-2.064,0.907-9.46,4.825-9.942,14.504h5.949v-1.699c0-0.552,0.447-1,1-1s1,0.448,1,1v1.699h7.293
c0.47-2.729,1.898-11.227,2.036-11.433c0.83,0.579,1.544,0.658,1.544,0.658s0.714-0.079,1.544-0.658
c0.138,0.206,1.566,8.704,2.036,11.433h5.609l0.484-2.402C48.448,40.335,48.858,40,49.334,40h7.95
c-1.369-8.016-7.94-10.763-9.692-11.352l-0.141,2.578c-0.018,0.332-0.199,0.633-0.485,0.804c-0.157,0.094-0.335,0.142-0.513,0.142
c-0.145,0-0.29-0.031-0.425-0.095l-3.612-1.695c-0.5-0.235-0.715-0.83-0.48-1.33c0.234-0.5,0.826-0.716,1.33-0.48l2.271,1.065
l0.205-3.742c0.029-0.552,0.499-0.976,1.053-0.944c0.552,0.03,0.974,0.502,0.943,1.053l-0.032,0.587
c0.166,0.046,0.709,0.209,1.476,0.531h11.995v-2.365H45.828c-2.135,2.182-4.893,3.212-7.073,3.212s-4.938-1.031-7.073-3.212H16.446z
 M25.286,29.123h-8.841v2.365h6.228C23.539,30.552,24.435,29.768,25.286,29.123z M16.446,35.853h3.23
c0.417-0.856,0.886-1.643,1.388-2.365h-4.618V35.853z M16.446,43.204h1.415c0.091-1.991,0.451-3.77,0.994-5.352h-2.409V43.204z
 M3.44,56.891h68.839l-3.801-5.582l-0.641,2.791c-0.104,0.454-0.509,0.776-0.975,0.776H46.739c-0.135,0-0.268-0.034-0.394-0.089
c-0.042-0.018-0.075-0.047-0.115-0.071c-0.056-0.034-0.116-0.056-0.165-0.102l-7.355-6.711c-0.305-0.278-0.408-0.715-0.259-1.1
c0.149-0.385,0.52-0.639,0.933-0.639h7.89l0.193-0.959H11.552L3.44,56.891z M73.169,63.449v-4.558H2.529v4.588l3.351-0.001h0h0
L73.169,63.449z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">CEOs:</h3>
              </div>
              <p className="text-white text-center font-medium">
                - Definição rápida e robusta de metas
                <br />- Plano prático para alinhar a cultura
                <br />- Engajar o time no aprendizado de temas relevantes para o negócio
                <br />- Plano concreto para comunicar projetos e iniciativas
                <br />- Forme seu time em IA focado no que sua organização precisa
              </p>
              <div className="mt-6 text-center">
                <p className="text-white font-medium">
                  O resultado? Equipe mais eficiente e sua empresa crescendo de forma estruturada.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-primary to-red-400 p-8 rounded-lg border border-primary/30 hover:border-primary transition-all duration-300 reveal">
              <div className="flex flex-col items-center mb-6">
                <div className="icon-container">
                  <svg
                    width="48"
                    height="48"
                    fill="currentColor"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 75.698 75.698"
                    className="text-white"
                  >
                    <g>
                      <g>
                        <path
                          d="M17,43H7c-3.9,0-7,3.1-7,7v10h2V50c0-2.8,2.2-5,5-5h1.3l2.8,7.4c0.1,0.3,0.5,0.6,0.9,0.6s0.8-0.3,1.1-0.6l2.8-7.4H17
		c2.8,0,5,2.2,5,5v10h2V50C24,46.1,20.9,43,17,43z M12.1,49.2L10.5,45h3.2L12.1,49.2z"
                        />
                        <rect x="11" y="54" width="2" height="2" />
                        <rect x="11" y="58" width="2" height="2" />
                        <path
                          d="M6,34v3c0,2.8,2.2,5,5,5h2c2.8,0,5-2.2,5-5v-3c0-2.8-2.2-5-5-5h-2C8.2,29,6,31.2,6,34z M8,34c0-1.7,1.3-3,3-3h2
		c1.7,0,3,1.3,3,3v3c0,1.7-1.3,3-3,3h-2c-1.7,0-3-1.3-3-3V34z"
                        />
                        <rect x="5" y="53" width="2" height="7" />
                        <rect x="17" y="53" width="2" height="7" />
                        <path
                          d="M35,43H25v2h1.3l2.8,7.4c0.1,0.3,0.5,0.6,0.9,0.6s0.8-0.3,1.1-0.6l2.8-7.4H35c2.8,0,5,2.2,5,5v10h2V50
		C42,46.1,38.9,43,35,43z M30.1,49.2L28.5,45h3.2L30.1,49.2z"
                        />
                        <rect x="29" y="54" width="2" height="2" />
                        <rect x="29" y="58" width="2" height="2" />
                        <path
                          d="M29,42h2c2.8,0,5-2.2,5-5v-3c0-2.8-2.2-5-5-5h-2c-2.8,0-5,2.2-5,5v3C24,39.8,26.2,42,29,42z M26,34c0-1.7,1.3-3,3-3h2
		c1.7,0,3,1.3,3,3v3c0,1.7-1.3,3-3,3h-2c-1.7,0-3-1.3-3-3V34z"
                        />
                        <rect x="35" y="53" width="2" height="7" />
                        <path
                          d="M53,43H43v2h1.3l2.8,7.4c0.1,0.3,0.5,0.6,0.9,0.6s0.8-0.3,1.1-0.6l2.8-7.4H53c2.8,0,5,2.2,5,5v10h2V50
		C60,46.1,56.9,43,53,43z M48.1,49.2L46.5,45h3.2L48.1,49.2z"
                        />
                        <rect x="47" y="54" width="2" height="2" />
                        <rect x="47" y="58" width="2" height="2" />
                        <path
                          d="M47,42h2c2.8,0,5-2.2,5-5v-3c0-2.8-2.2-5-5-5h-2c-2.8,0-5,2.2-5,5v3C42,39.8,44.2,42,47,42z M44,34c0-1.7,1.3-3,3-3h2
		c1.7,0,3,1.3,3,3v3c0,1.7-1.3,3-3,3h-2c-1.7,0-3-1.3-3-3V34z"
                        />
                        <rect x="53" y="53" width="2" height="7" />
                        <path
                          d="M58,0v5H2V0H0v6c0,0.6,0.4,1,1,1h24v5h-7c-0.6,0-1,0.4-1,1v11c0,0.6,0.4,1,1,1h5c0.6,0,1-0.4,1-1v-4h4v4c0,0.6,0.4,1,1,1
		h5c0.6,0,1-0.4,1-1V13c0-0.6-0.4-1-1-1h-7V7h32c0.6,0,1-0.4,1-1V0H58z M33,23h-3v-3h1v-2h-2h-6h-2v2h1v3h-3v-9h14V23z"
                        />
                        <rect x="6" width="3" height="2" />
                        <rect x="11" width="3" height="2" />
                        <rect x="16" width="3" height="2" />
                        <rect x="21" width="3" height="2" />
                        <rect x="26" width="3" height="2" />
                        <rect x="31" width="3" height="2" />
                        <rect x="36" width="3" height="2" />
                        <rect x="41" width="3" height="2" />
                        <rect x="46" width="3" height="2" />
                        <rect x="51" width="3" height="2" />
                        <path d="M43.3,15.3l-3,3c-0.4,0.4-0.4,1,0,1.4l3,3l1.4-1.4L43.4,20H50v-2h-6.6l1.3-1.3L43.3,15.3z" />
                        <path d="M6.3,21.3l1.4,1.4l3-3c0.4-0.4,0.4-1,0,1.4l-3-3l-1.4,1.4L7.6,18H0v2h7.6L6.3,21.3z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Líderes de RH:</h3>
              </div>
              <p className="text-white font-medium text-center">
                Entregue soluções em performance e cultura (definição de metas, alinhamento de cultura, plano de
                comunicação, estratégia de treinamento e formação customizada em IA) de maneira rápida, sem precisar de
                sistemas caros e complexos e capacite seu time para replicar os produtos quantas vezes quiser.
              </p>
              <div className="mt-6 text-center">
                <p className="text-white font-medium">
                  O resultado? Você fortalecendo sua posição e gerando ainda mais impacto na organização.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MoreSolutions currentPage={"/"} />

      <WhyDiray />

      {/* About Section */}
      <section id="sobre" className="py-20 md:py-32 architecture-bg">
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center reveal text-white">
            Sobre a <span className="text-white">DI.RAY</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="flex justify-center reveal">
              <div className="relative">
                <Image
                  src="/images/diego-raymundo.png"
                  alt="Diego Raymundo - DI.RAY Consultoria"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500"
                />
                <div className="text-center mt-4">
                  <h3 className="text-2xl font-bold text-white">Diego Raymundo</h3>
                  <p className="text-white/80">Fundador da DI.RAY</p>
                </div>
              </div>
            </div>
            <div className="reveal">
              <p className="text-white text-lg mb-6">
                Após 20 anos de carreira em multinacionais líderes como Meta, Nubank, McDonald\'s e Danone, percebi que muitos fornecedores de consultoria complicam o que poderia ser simples.<br/><br/> Com as perguntas e ferramentas certas, é possível simplificar soluções e dar às empresas o controle dos processos de desenvolvimento, performance e cultura. <br/><br/>A DI.RAY nasce para trazer soluções de desenvolvimento e engajamento com total transparência e transferindo o conhecimento para o cliente, trazendo autonomia para replicar iniciativas e economizar tempo e recursos. <br/><br/>Não é só sobre entregar serviços de alta qualidade, é sobre mudar as regras do jogo e redefinir a forma como as consultorias funcionam no Brasil, permitindo a mais empresas se tornarem ágeis, eficientes e prontas para o futuro.<br/><br/>
                Com as perguntas certas e o poder da I.A., é possível simplificar soluções e dar às empresas o controle
                dos processos de performance e cultura. A DI.RAY nasce para trazer soluções com total transparência e
                transferindo o conhecimento para o cliente, trazendo autonomia para replicar iniciativas e economizar
                tempo e recursos.
              </p>
              <div className="w-full flex justify-center items-center">
                <Image
                  alt="Client Logos"
                  loading="lazy"
                  width="600"
                  height="50"
                  decoding="async"
                  data-nimg="1"
                  src="/images/client-logos.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      {/* Contact Section */}
      <section id="contato" className="py-20 md:py-32 architecture-bg">
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Entre em contato</h2>
              <p className="text-lg mb-8 text-white/80">{getText("home", "contact", "description")}</p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="icon-container mr-4 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-white">Whatsapp</h3>
                    <p className="text-white/80">+55 (11) 99638-6103</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="icon-container mr-4 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-white">E-mail</h3>
                    <p className="text-white/80">contato@diray.com.br</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-dark/50 rounded-lg border border-primary/20 p-8 hover:border-primary/50 transition-all duration-300 reveal">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function FAQSection() {
  const { getFaqItems, isLoading } = useContent()
  const faqGroups = getFaqItems()
  const [openItems, setOpenItems] = useState<Record<string, string | null>>({})
  const [contentLoaded, setContentLoaded] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      // Filtrar a pergunta sobre treinamentos In-Company
      const filteredFaqGroups = { ...faqGroups }

      // Percorrer cada categoria e modificar a resposta da pergunta sobre mudança de ideia
      Object.keys(filteredFaqGroups).forEach((category) => {
        filteredFaqGroups[category] = filteredFaqGroups[category].filter(
          (item) => !item.question.includes("Vocês realizam treinamentos In-Company"),
        )

        // Atualizar a resposta da pergunta sobre mudança de ideia
        filteredFaqGroups[category].forEach((item) => {
          if (item.question.includes("E se eu mudar de ideia durante o serviço")) {
            item.answer =
              "Caso tenha algum imprevisto e precise cancelar algum serviço, será cobrado pelas etapas já realizadas e um percentual das etapas ainda não concluídas. Mudanças de prazo podem ser acordadas sem custos extras, exceto em casos que demandem refação de etapas."
          }
        })
      })

      console.log("FAQ Groups:", filteredFaqGroups) // Depuração
      const timer = setTimeout(() => setContentLoaded(true), 100)
      return () => clearTimeout(timer)
    }
  }, [isLoading, faqGroups])

  useEffect(() => {
    if (!isLoading) {
      console.log("📊 Dados do FAQ:", getFaqItems())
    }
  }, [isLoading])

  const toggleItem = (category: string, itemId: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [category]: prev[category] === itemId ? null : itemId,
    }))
  }

  return (
    <section id="faq" className="py-20 md:py-32 bg-dark">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-opacity duration-500 ${contentLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Perguntas Frequentes</h2>
          <p className="text-lg text-white/90 font-medium">Tire suas dúvidas sobre minha metodologia de trabalho.</p>
        </div>

        {isLoading ? (
          <div className="max-w-3xl mx-auto flex justify-center items-center h-64">
            <div className="animate-pulse text-white">Carregando perguntas...</div>
          </div>
        ) : Object.keys(faqGroups).length === 0 ? (
          <div className="max-w-3xl mx-auto flex justify-center items-center h-64">
            <div className="text-white">Nenhuma pergunta frequente encontrada.</div>
          </div>
        ) : (
          <div
            className={`max-w-3xl mx-auto transition-opacity duration-500 ${contentLoaded ? "opacity-100" : "opacity-0"}`}
          >
            <div className="space-y-8">
              {Object.entries(faqGroups).map(([category, items], categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="transition-all duration-500 ease-out"
                  style={{
                    animation: contentLoaded ? `fadeInUp 0.5s ease-out ${categoryIndex * 0.1}s both` : "none",
                  }}
                >
                  <h3 className="text-2xl font-bold mb-4 text-white">{category}</h3>
                  <div className="space-y-4">
                    {items
                      .filter((item) => !item.question.includes("Vocês realizam treinamentos In-Company"))
                      .map((item, itemIndex) => (
                        <div
                          key={item.id}
                          className="border border-primary/20 rounded-lg overflow-hidden bg-dark/50 hover:border-primary/50 transition-all duration-300"
                          style={{
                            animation: contentLoaded
                              ? `fadeIn 0.3s ease-out ${categoryIndex * 0.1 + itemIndex * 0.05 + 0.3}s both`
                              : "none",
                          }}
                        >
                          <button
                            className="faq-question w-full flex justify-between items-center p-4 text-left font-medium focus:outline-none text-white"
                            onClick={() => toggleItem(category, item.id)}
                            aria-expanded={openItems[category] === item.id}
                          >
                            <span>{item.question}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`transition-transform duration-300 ${openItems[category] === item.id ? "transform rotate-180" : ""}`}
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </button>
                          <div
                            className={`px-4 overflow-hidden transition-all duration-300 ${openItems[category] === item.id ? "max-h-96 pb-4" : "max-h-0"}`}
                          >
                            <p className="text-white/80 pt-2">
                              {item.question.includes("E se eu mudar de ideia durante o serviço")
                                ? "Caso tenha algum imprevisto e precise cancelar algum serviço, será cobrado pelas etapas já realizadas e um percentual das etapas ainda não concluídas. Mudanças de prazo podem ser acordadas sem custos extras, exceto em casos que demandem refação de etapas."
                                : item.answer}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
