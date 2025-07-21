
"use client"

import { client } from "@/tina/__generated__/databaseClient"
import { tinaField } from "tinacms/dist/react"
import { useTina } from "tinacms/dist/react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export function SolutionsSection(props: {
  data: any;
  query: string;
  variables: {
    relativePath: string;
  };
}) {
  const { data } = useTina(props);
  const solutions = data.solutionConnection.edges.map((edge: any) => edge.node);

  return (
    <section className="py-20 md:py-32 bg-dark section-illumination-purple">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Conheça mais soluções
          </h2>
          <p className="text-lg text-white/80 mb-12">
            Esqueça as propostas surpresa. Calcule seu orçamento aqui mesmo no site.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution: any) => (
            <Link 
              href={`/solucoes/${solution._sys.filename}`} 
              key={solution._sys.filename}
              className="solution-card block"
            >
              <div className="flex-grow">
                <div className="flex justify-center mb-4">
                  <div className="icon-container">
                    <ArrowRight className="text-white" size={48} />
                  </div>
                </div>
                <h3 className="solution-card-title">{solution.title}</h3>
                <p className="solution-card-description">
                  {solution.excerpt || solution.description}
                </p>
              </div>
              <div className="mt-6 text-center">
                <div className="solution-card-button">
                  Saiba Mais <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
