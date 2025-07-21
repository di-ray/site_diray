"use client";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";

export const AboutSection = (props) => {
  const { 
    title = "Sobre a **DI.RAY**", 
    description = "Após 20 anos de carreira em multinacionais líderes como Meta, Nubank, McDonald's e Danone, percebi que muitos fornecedores de consultoria complicam o que poderia ser simples. Com as perguntas e ferramentas certas, é possível simplificar soluções e dar às empresas o controle dos processos de desenvolvimento, performance e cultura.",
    founderName = "Diego Raymundo",
    founderTitle = "Fundador da DI.RAY", 
    founderImage = "/images/diego-raymundo.png",
    clientLogosImage = "/images/client-logos.png",
    heading,
    biography
  } = props;

  return (
    <section id="sobre" className="py-20 md:py-32 architecture-bg">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <h2 data-tina-field={tinaField(props, "title")} className="text-4xl md:text-5xl font-bold mb-12 text-center reveal text-white">
          {title ? (
            title.split('**').map((part, index) => (
              index % 2 === 1 ? <span key={index} className="text-white">{part}</span> : part
            ))
          ) : heading ? (
            <TinaMarkdown content={heading} />
          ) : (
            "Sobre a DI.RAY"
          )}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="flex justify-center reveal">
            <div className="relative">
              <Image
                data-tina-field={tinaField(props, "founderImage")}
                src={founderImage}
                alt={founderName}
                width={400}
                height={400}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500"
              />
              <div className="text-center mt-4">
                <h3 data-tina-field={tinaField(props, "founderName")} className="text-2xl font-bold text-white">
                  {founderName}
                </h3>
                <p data-tina-field={tinaField(props, "founderTitle")} className="text-white/80">
                  {founderTitle}
                </p>
              </div>
            </div>
          </div>
          <div className="reveal">
            <div data-tina-field={tinaField(props, "description")} className="text-white text-lg mb-6">
              {description && typeof description === 'string' ? (
                <p>{description}</p>
              ) : biography ? (
                <TinaMarkdown content={biography} />
              ) : (
                <p>
                  Após 20 anos de carreira em multinacionais líderes como Meta, Nubank, McDonald's e Danone, percebi que muitos fornecedores de consultoria complicam o que poderia ser simples.<br/><br/> 
                  Com as perguntas e ferramentas certas, é possível simplificar soluções e dar às empresas o controle dos processos de desenvolvimento, performance e cultura. <br/><br/>
                  A DI.RAY nasce para trazer soluções de desenvolvimento e engajamento com total transparência e transferindo o conhecimento para o cliente, trazendo autonomia para replicar iniciativas e economizar tempo e recursos. <br/><br/>
                  Não é só sobre entregar serviços de alta qualidade, é sobre mudar as regras do jogo e redefinir a forma como as consultorias funcionam no Brasil, permitindo a mais empresas se tornarem ágeis, eficientes e prontas para o futuro.<br/><br/>
                  Com as perguntas certas e o poder da I.A., é possível simplificar soluções e dar às empresas o controle
                  dos processos de performance e cultura. A DI.RAY nasce para trazer soluções com total transparência e
                  transferindo o conhecimento para o cliente, trazendo autonomia para replicar iniciativas e economizar
                  tempo e recursos.
                </p>
              )}
            </div>
            <div className="w-full flex justify-center items-center">
              <Image
                data-tina-field={tinaField(props, "clientLogosImage")}
                alt="Client Logos"
                loading="lazy"
                width="600"
                height="50"
                src={clientLogosImage}
                className="client-logos"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
