"use client"

import Link from "next/link"
import { tinaField } from "tinacms/dist/react"
import * as Icons from "lucide-react"

interface Solution {
  slug: string
  icon: string
  title: string
  excerpt?: string
  description?: string
}

interface MoreSolutionsSectionProps {
  heading: string
  solutions?: Solution[]
  currentPage: string
}

export function MoreSolutionsSection({ heading = "Nossas Soluções", solutions = [], currentPage }: MoreSolutionsSectionProps) {
  const defaultSolutions = [
    {
      slug: "workshop-de-metas",
      icon: "Target",
      title: "Workshop de Metas",
      description: "Definição rápida e robusta de metas organizacionais com metodologia estruturada."
    },
    {
      slug: "alinhamento-de-cultura",
      icon: "Users",
      title: "Alinhamento de Cultura",
      description: "Plano prático para alinhar a cultura organizacional com os objetivos estratégicos."
    },
    {
      slug: "estrategia-de-treinamento",
      icon: "BookOpen",
      title: "Estratégia de Treinamento",
      description: "Engaje o time no aprendizado de temas relevantes para o negócio."
    },
    {
      slug: "plano-de-comunicacao",
      icon: "MessageSquare",
      title: "Plano de Comunicação",
      description: "Plano concreto para comunicar projetos e iniciativas de forma efetiva."
    },
    {
      slug: "formacao-de-ia",
      icon: "Bot",
      title: "Formação de IA",
      description: "Forme seu time em IA focado no que sua organização precisa."
    }
  ];

  const displaySolutions = solutions.length > 0 ? solutions : defaultSolutions;
  
  // Filtra a solução atual para não aparecer na lista
  const filteredSolutions = displaySolutions.filter((s) => s.slug !== currentPage)
  
  return (
    <section className="py-20 md:py-32 bg-dark section-illumination-purple">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 data-tina-field={tinaField({ heading }, "heading")} className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSolutions.map((solution) => {
            const IconComponent = Icons[solution.icon as keyof typeof Icons] as React.ElementType | undefined;
            return (
              <Link href={`/solucoes/${solution.slug}`} key={solution.slug} className="solution-card block">
                <div className="flex-grow">
                  <div className="flex justify-center mb-4">
                    <div className="icon-container">
                      {IconComponent ? <IconComponent className="text-white" size={48} /> : <Icons.BriefcaseBusiness className="text-white" size={48} />}
                    </div>
                  </div>
                  <h3 className="solution-card-title">{solution.title}</h3>
                  <p className="solution-card-description">{solution.excerpt || solution.description}</p>
                </div>
                <div className="mt-6 text-center">
                  <div className="solution-card-button">
                    Saiba Mais <Icons.ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
