"use client";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

interface EngagementSectionProps {
  heading?: string
  text?: any
}

export const EngagementSection = (props: EngagementSectionProps) => {
  // Conteúdo padrão do projeto DIRAY original
  const defaultHeading = "Seu time Engajado e Produtivo"
  const defaultText = {
    type: 'root',
    children: [{
      type: 'p',
      children: [{
        type: 'text',
        text: 'As outras consultorias complicam? Eu simplifico! Alinho cultura, metas, treinamento e comunicação para equipes mais produtivas e engajadas. Usando inteligência artificial e experiência na área, entrego soluções práticas e efetivas — e o melhor: capacito seu time para replicar as soluções quando quiser, sem depender de consultoria.'
      }]
    }]
  }

  const heading = props.heading || defaultHeading
  const text = props.text || defaultText
  
  return (
    <section className="bg-gradient-to-r from-primary to-red-700 py-16 md:py-24 section-illumination">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-white text-center md:text-left"
              data-tina-field={tinaField(props as any, "heading")}
            >
              Seu time <br className="hidden md:block" /> engajado <br className="hidden md:block" />e produtivo
            </h2>
          </div>
          <div className="reveal">
            <div 
              className="text-white text-lg mb-6"
              data-tina-field={tinaField(props as any, "text")}
            >
              <TinaMarkdown content={text} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
