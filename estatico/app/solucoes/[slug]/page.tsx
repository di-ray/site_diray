"use client"

import { useEffect, useState } from "react"

// Define the PageContent type
interface PageContent {
  id: string
  title: string
  sections: { description?: string }[]
}
import { useContent } from "@/lib/use-content"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { LoadingSpinner } from "@/components/loading-spinner"
import { motion } from "framer-motion"

interface SolutionPageProps {
  params: {
    slug: string
  }
}

export default function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = params
  const { content, isLoading } = useContent()
  const [solution, setSolution] = useState<PageContent | null>(null)

  useEffect(() => {
    if (!isLoading && content) {
      const foundSolution = content.pages.find((page) => page.id === slug)
      setSolution(foundSolution || null)
    }
  }, [slug, content, isLoading])

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Carregando conteúdo..." />
  }

  if (!solution) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Solução não encontrada</h1>
        <p className="mb-6">A solução que você está procurando não está disponível.</p>
        <Link href="/solucoes" className="text-primary font-medium hover:underline inline-flex items-center group">
          Ver todas as soluções
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-6">{solution.title}</h1>
        <p className="mb-6">{solution.sections[0]?.description}</p>
        <Link href="/#contato" className="text-primary font-medium hover:underline inline-flex items-center group">
          Entre em contato
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  )
}
