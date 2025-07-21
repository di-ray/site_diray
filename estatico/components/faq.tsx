"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
}

const FAQ = ({ items }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <button
            className="faq-question w-full flex justify-between items-center p-4 text-left font-medium focus:outline-none"
            onClick={() => toggleQuestion(index)}
            aria-expanded={openIndex === index}
          >
            <span>{item.question}</span>
            <ChevronDown
              className={`faq-icon transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
              size={20}
            />
          </button>
          <div className={`px-4 pb-4 ${openIndex === index ? "block" : "hidden"}`}>
            <p className="text-muted-foreground">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FAQ
