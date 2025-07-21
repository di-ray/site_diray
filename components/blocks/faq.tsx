"use client"
import { useState, useEffect } from "react"
import { tinaField } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

export const FaqSection = (props) => {
  const [openItemId, setOpenItemId] = useState<string | null>(null)
  const [contentLoaded, setContentLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setContentLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const toggleItem = (itemId: string) => {
    setOpenItemId((prev) => (prev === itemId ? null : itemId))
  }

  return (
    <section id="faq" className="py-20 md:py-32 bg-dark">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-opacity duration-500 ${
            contentLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 data-tina-field={tinaField(props, "heading")} className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {props.heading}
          </h2>
          <p data-tina-field={tinaField(props, "subheading")} className="text-lg text-white/90 font-medium">
            {props.subheading}
          </p>
        </div>

        {!props.questions || props.questions.length === 0 ? (
          <div className="max-w-3xl mx-auto flex justify-center items-center h-64">
            <div className="text-white">Nenhuma pergunta frequente encontrada.</div>
          </div>
        ) : (
          <div
            className={`max-w-3xl mx-auto transition-opacity duration-500 ${
              contentLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="space-y-4">
              {props.questions.map((faqItem, idx) => {
                if (!faqItem || !faqItem.question) return null
                const itemId = `faq-${idx}`
                return (
                  <div
                    key={itemId}
                    data-tina-field={tinaField(faqItem)}
                    className="bg-gray-800 rounded-lg border border-gray-700"
                  >
                    <button
                      onClick={() => toggleItem(itemId)}
                      className="w-full text-left p-6 hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <h3
                          data-tina-field={tinaField(faqItem, "question")}
                          className="text-lg font-semibold text-white pr-4"
                        >
                          {faqItem.question}
                        </h3>
                        <span className="text-primary text-xl font-bold">{openItemId === itemId ? "−" : "+"}</span>
                      </div>
                    </button>
                    {openItemId === itemId && (
                      <div className="px-6 pb-6" data-tina-field={tinaField(faqItem, "answer")}> 
                        <div className="text-gray-300">
                          <TinaMarkdown content={faqItem.answer} />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
