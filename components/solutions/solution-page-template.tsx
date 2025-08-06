"use client"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { useTina } from "tinacms/dist/react"
import { SolutionsSection } from "./solutions-section"
import { ContatoSection } from "./contato-section"
import { PorqueDiRay } from "./porque-diray"
import { SolutionHero } from "../blocks/solution-hero"
import { SolutionIntro } from "../blocks/solution-intro"
import { WhatYouReceiveSection, type Item } from "../blocks/what-you-receive-section"
import { SolutionCalculator } from "../blocks/solution-calculator"
import { SolutionTimeline } from "../blocks/solution-timeline"
import { SolutionQuery } from "@/tina/__generated__/types"
import { MoreSolutionsSection } from "../blocks/more-solutions"
import { WhyDiraySection } from "../blocks/why-diray"

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
                videoSrc={block.videoSrc}
                videoStartTime={block.videoStartTime}
                videoEndTime={block.videoEndTime}
                overlayOpacity={block.overlayOpacity}
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
            if (!block.items) return null;
            const filteredItems = block.items.filter(item => item !== null) as Item[];
            if (filteredItems.length === 0) return null;
            return (
              <WhatYouReceiveSection
                key={idx}
                items={filteredItems}
              />
            );
          case "SolutionBlocksSolutionCalculator":
            // Se temos dados completos da calculadora, renderizamos diretamente
            if (block.calculatorType === 'tina' && block.calculatorId?.__typename === 'Calculator') {
              const calculator = block.calculatorId;
              
              // Renderizar o componente apropriado baseado no tipo
              if (calculator.type === 'salary-based') {
                const SalaryBasedCalculator = require('../calculators/SalaryBasedCalculator').SalaryBasedCalculator;
                return (
                  <SalaryBasedCalculator
                    key={idx}
                    calculatorId={calculator._sys?.filename || ''}
                    serviceName={calculator.name || ''}
                    config={calculator.config || {}}
                    display={calculator.display || {}}
                  />
                );
              } else if (calculator.type === 'budget-plans') {
                const BudgetPlansCalculator = require('../calculators/BudgetPlansCalculator').BudgetPlansCalculator;
                return (
                  <BudgetPlansCalculator
                    key={idx}
                    calculatorId={calculator._sys?.filename || ''}
                    serviceName={calculator.name || ''}
                    config={calculator.config || {}}
                    display={calculator.display || {}}
                  />
                );
              } else if (calculator.type === 'training-based') {
                const TrainingBasedCalculator = require('../calculators/TrainingBasedCalculator').TrainingBasedCalculator;
                return (
                  <TrainingBasedCalculator
                    key={idx}
                    calculatorId={calculator._sys?.filename || ''}
                    serviceName={calculator.name || ''}
                    config={calculator.config || {}}
                    display={calculator.display || {}}
                  />
                );
              } else if (calculator.type === 'custom') {
                const CustomCalculator = require('../calculators/CustomCalculator').CustomCalculator;
                return (
                  <CustomCalculator
                    key={idx}
                    calculatorId={calculator._sys?.filename || ''}
                    serviceName={calculator.name || ''}
                    config={calculator.config || {}}
                    display={calculator.display || {}}
                  />
                );
              }
            }
            
            // Fallback para calculadora legada
            return (
              <SolutionCalculator
                key={idx}
                basePrice={block.basePrice || undefined}
                factors={block.factors ? block.factors
                  .filter(factor => factor && factor.name && factor.options)
                  .map(factor => ({
                    name: factor!.name || '',
                    options: factor!.options
                      ? factor!.options
                          .filter(opt => opt && opt.label && opt.multiplier !== undefined)
                          .map(opt => ({ 
                            label: opt!.label || '', 
                            multiplier: Number(opt!.multiplier)
                          }))
                      : []
                  })) : undefined}
                calculatorType={block.calculatorType as 'legacy' | 'tina' | undefined}
                calculatorId={typeof block.calculatorId === 'string' ? block.calculatorId : block.calculatorId?._sys?.filename || block.calculatorId?.id}
                slug={data.solution._sys?.filename}
                title={data.solution.title}
              />
            );
          case "SolutionBlocksSolutionTimeline":
            const filteredSteps = block.steps?.filter(step => step !== null) ?? undefined;
            return (
              <SolutionTimeline
                key={idx}
                timelineTitle={block.timelineTitle ?? undefined}
                steps={filteredSteps as any}
              />
            );
          default:
            return null;
        }
      })}
      <WhyDiraySection />
      <MoreSolutionsSection
        heading="Conheça mais soluções"
        currentPage={data.solution._sys?.filename || ""}
      />
      <ContatoSection />
    </>
  );
}
