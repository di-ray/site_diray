"use client"

import type { PageQuery } from "../tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"
import { useEffect } from "react"
import { initScrollReveal } from "@/lib/scroll-reveal"

import { HeroSection } from "./blocks/hero"
import { EngagementSection } from "./blocks/engagement"
import { ChallengesSection } from "./blocks/challenges"
import { AboutSection } from "./blocks/about"
import { ContactSection } from "./blocks/contact"
import { MoreSolutionsSection } from "./blocks/more-solutions"
import { WhyDiraySection } from "./blocks/why-diray"
import { FaqSection } from "./blocks/faq"

const components = {
  hero: HeroSection,
  engagement: EngagementSection,
  challenges: ChallengesSection,
  about: AboutSection,
  contact: ContactSection,
  "more-solutions": MoreSolutionsSection,
  moresolutions: MoreSolutionsSection,
  "why-diray": WhyDiraySection,
  whydiray: WhyDiraySection,
  faq: FaqSection,
}

export function Page(props: {
  data: PageQuery;
  variables: object;
  query: string;
}) {
  const { data } = useTina(props);

  useEffect(() => {
    const cleanup = initScrollReveal()
    return () => cleanup?.()
  }, [])

  // Add error handling for missing data
  if (!data?.page) {
    return (
      <main className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erro: Página não encontrada</h1>
          <p className="text-gray-600">Os dados da página não puderam ser carregados.</p>
        </div>
      </main>
    )
  }

  return (
    <main>
      {data.page.blocks?.map((block, i) => {
        if (!block || !block.__typename) {
          return null
        }
        const blockName = block.__typename.replace("PageBlocks", "").toLowerCase()
        const Component = components[blockName]
        if (Component) {
          return (
            <div key={i} data-tina-field={tinaField(block)}>
              <Component {...block} />
            </div>
          )
        }
        // Log warning for missing components
        console.warn(`Component not found for block type: ${blockName}`)
        return null
      })}
    </main>
  )
}
