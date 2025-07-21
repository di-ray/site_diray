
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ContatoSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
        <p className="text-lg text-gray-700 mb-8">Entre em contato conosco e descubra como podemos ajudar a impulsionar seus resultados.</p>
        <Link href="/contato">
          <Button size="lg">Fale com um especialista</Button>
        </Link>
      </div>
    </section>
  )
}
