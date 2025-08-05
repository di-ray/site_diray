"use client";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";

interface AboutSectionProps {
  heading?: string
  founderName?: string
  founderTitle?: string
  biography?: any
  founderImage?: string
  clientLogosImage?: string
}

export const AboutSection = (props: AboutSectionProps) => {
  // Conteúdo padrão do projeto DIRAY original
  const defaultHeading = "Sobre a DI.RAY"
  const defaultFounderName = "Diego Raymundo"
  const defaultFounderTitle = "Fundador da DI.RAY"
  const defaultFounderImage = "/images/diego-raymundo.png"
  const defaultClientLogosImage = "/images/client-logos.png"
  const defaultBiography = {
    type: 'root',
    children: [{
      type: 'p',
      children: [{
        type: 'text',
        text: 'Após 20 anos de carreira em multinacionais líderes como Meta, Nubank, McDonald\'s e Danone, percebi que muitos fornecedores de consultoria complicam o que poderia ser simples.\n\nCom as perguntas e ferramentas certas, é possível simplificar soluções e dar às empresas o controle dos processos de desenvolvimento, performance e cultura.\n\nA DI.RAY nasce para trazer soluções de desenvolvimento e engajamento com total transparência e transferindo o conhecimento para o cliente, trazendo autonomia para replicar iniciativas e economizar tempo e recursos.\n\nNão é só sobre entregar serviços de alta qualidade, é sobre mudar as regras do jogo e redefinir a forma como as consultorias funcionam no Brasil, permitindo a mais empresas se tornarem ágeis, eficientes e prontas para o futuro.\n\nCom as perguntas certas e o poder da I.A., é possível simplificar soluções e dar às empresas o controle dos processos de performance e cultura. A DI.RAY nasce para trazer soluções com total transparência e transferindo o conhecimento para o cliente, trazendo autonomia para replicar iniciativas e economizar tempo e recursos.'
      }]
    }]
  }

  const heading = props.heading || defaultHeading
  const founderName = props.founderName || defaultFounderName
  const founderTitle = props.founderTitle || defaultFounderTitle
  const founderImage = props.founderImage || defaultFounderImage
  const clientLogosImage = props.clientLogosImage || defaultClientLogosImage
  const biography = props.biography || defaultBiography

  return (
    <section id="sobre" className="py-20 md:py-32 architecture-bg">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <h2 
          className="text-4xl md:text-5xl font-bold mb-12 text-center reveal text-white"
          data-tina-field={tinaField(props, "heading")}
        >
          Sobre a <span className="text-white">DI.RAY</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="flex justify-center reveal">
            <div className="relative">
              <Image
                src={founderImage}
                alt={`${founderName} - DI.RAY Consultoria`}
                width={400}
                height={400}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500"
                data-tina-field={tinaField(props, "founderImage")}
              />
              <div className="text-center mt-4">
                <h3 
                  className="text-2xl font-bold text-white"
                  data-tina-field={tinaField(props, "founderName")}
                >
                  {founderName}
                </h3>
                <p 
                  className="text-white/80"
                  data-tina-field={tinaField(props, "founderTitle")}
                >
                  {founderTitle}
                </p>
              </div>
            </div>
          </div>
          <div className="reveal">
            <div 
              className="text-white text-lg mb-6"
              data-tina-field={tinaField(props, "biography")}
            >
              <TinaMarkdown content={biography} />
            </div>
            <div className="w-full flex justify-center items-center">
              <Image
                alt="Client Logos"
                loading="lazy"
                width={600}
                height={50}
                decoding="async"
                data-nimg="1"
                src={clientLogosImage}
                data-tina-field={tinaField(props, "clientLogosImage")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
