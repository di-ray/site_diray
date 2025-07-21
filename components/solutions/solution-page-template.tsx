"use client"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { useTina } from "tinacms/dist/react"
import { SolutionsSection } from "./solutions-section"
import { ContatoSection } from "./contato-section"
import { PorqueDiRay } from "./porque-diray"
import { SolutionHero } from "../blocks/solution-hero"
import { SolutionIntro } from "../blocks/solution-intro"
import { WhatYouReceiveSection } from "../blocks/what-you-receive-section"
import { SolutionCalculator } from "../blocks/solution-calculator"
import { SolutionTimeline } from "../blocks/solution-timeline"
import { SolutionQuery } from "@/tina/__generated__/types"
import { MoreSolutionsSection } from "../blocks/more-solutions"

type SolutionPageTemplateProps = {
  data: SolutionQuery;
  query: string;
  variables: object;
  solutions: {
    data: any;
    query: string;
    variables: object;
  };
}

export function SolutionPageTemplate(props: SolutionPageTemplateProps) {
  const { data } = useTina(props);

  if (!data || !data.solution) {
    return <div>Solution not found.</div>;
  }

  const blocks = (data.solution.blocks || []).filter(Boolean);

  return (
    <>
      {blocks.map((block, idx) => {
        if (!block || typeof block !== "object" || !("__typename" in block)) return null;
        switch (block.__typename) {
          case "SolutionBlocksSolutionHero":
            return (
              <SolutionHero
                key={idx}
                heroTitle={block.heroTitle}
                heroHighlight={block.heroHighlight}
                heroSubtitle={block.heroSubtitle}
                backgroundImage={block.backgroundImage}
              />
            );
          case "SolutionBlocksSolutionIntro":
            return (
              <SolutionIntro
                key={idx}
                introTitle={block.introTitle}
                introDescription={block.introDescription}
                minPrice={block.minPrice}
                minDuration={block.minDuration}
              />
            );
          case "SolutionBlocksWhatYouReceive":
            return (
              <WhatYouReceiveSection
                key={idx}
                items={block.items}
              />
            );
          case "SolutionBlocksSolutionCalculator":
            return (
              <SolutionCalculator
                key={idx}
                basePrice={block.basePrice}
                factors={block.factors}
                slug={data.solution._sys?.filename}
                title={data.solution.title}
              />
            );
          case "SolutionBlocksSolutionTimeline":
            return (
              <SolutionTimeline
                key={idx}
                timelineTitle={block.timelineTitle}
                steps={block.steps}
              />
            );
          default:
            return null;
        }
      })}
      <PorqueDiRay />
      <MoreSolutionsSection
        heading="Conheça mais soluções"
        currentPage={data.solution._sys?.filename || ""}
      />
      <ContatoSection />
    </>
  );
}
