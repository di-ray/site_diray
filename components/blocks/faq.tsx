"use client"
import { useState, useEffect } from "react"
import { tinaField } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

interface FaqItem {
  question: string
  answer: any
  category?: string
}

interface FaqSectionProps {
  heading?: string
  subheading?: string
  questions?: FaqItem[]
}

export const FaqSection = (props: FaqSectionProps) => {
  const [openItems, setOpenItems] = useState<Record<string, string | null>>({})
  const [contentLoaded, setContentLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setContentLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const toggleItem = (category: string, itemId: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [category]: prev[category] === itemId ? null : itemId,
    }))
  }

  // Conteúdo padrão do FAQ
  const defaultQuestions: FaqItem[] = [
    {
      category: "Sobre os Serviços",
      question: "Como funciona o processo de consultoria?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Nosso processo começa com um diagnóstico detalhado da sua organização, seguido pelo desenvolvimento de um plano de ação personalizado. Implementamos as soluções em parceria com sua equipe e monitoramos os resultados continuamente.'
          }]
        }]
      }
    },
    {
      category: "Sobre os Serviços",
      question: "Quanto tempo dura um projeto típico?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'A duração varia conforme a complexidade e escopo do projeto. Projetos de consultoria estratégica geralmente duram de 3 a 6 meses, enquanto programas de desenvolvimento de liderança podem se estender por 6 a 12 meses.'
          }]
        }]
      }
    },
    {
      category: "Sobre os Serviços",
      question: "Vocês atendem empresas de pequeno porte?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Sim, temos soluções adaptadas para empresas de todos os portes. Nossos programas são escaláveis e personalizados para atender às necessidades específicas de cada organização, independentemente do seu tamanho.'
          }]
        }]
      }
    },
    {
      category: "Investimento e Resultados",
      question: "Como é medido o retorno sobre o investimento?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Estabelecemos métricas claras no início do projeto, alinhadas aos objetivos da sua empresa. Monitoramos indicadores como produtividade, engajamento, retenção de talentos e resultados financeiros para quantificar o impacto das nossas intervenções.'
          }]
        }]
      }
    },
    {
      category: "Investimento e Resultados",
      question: "E se eu mudar de ideia durante o serviço?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Caso tenha algum imprevisto e precise cancelar algum serviço, será cobrado pelas etapas já realizadas e um percentual das etapas ainda não concluídas. Mudanças de prazo podem ser acordadas sem custos extras, exceto em casos que demandem refação de etapas.'
          }]
        }]
      }
    },
    {
      category: "Sobre os Serviços",
      question: "Vocês oferecem treinamentos in-company?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Sim, desenvolvemos e facilitamos treinamentos personalizados nas instalações do cliente. Nossos programas são práticos e focados na aplicação imediata dos conceitos no contexto específico da sua organização.'
          }]
        }]
      }
    }
  ];

  const questions = props.questions && props.questions.length > 0 ? props.questions : defaultQuestions;
  
  // Agrupar perguntas por categoria
  const faqGroups = questions.reduce<Record<string, Array<FaqItem & { id: string }>>>((acc, item, index) => {
    const category = item.category || "Geral"
    if (!acc[category]) acc[category] = []
    acc[category].push({ ...item, id: `faq-${index}` })
    return acc
  }, {})

  return (
    <section id="faq" className="py-20 md:py-32 bg-dark">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: contentLoaded ? 1 : 0, y: contentLoaded ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            data-tina-field={tinaField(props, "heading")} 
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            {props.heading || "Perguntas Frequentes"}
          </h2>
          <p 
            data-tina-field={tinaField(props, "subheading")} 
            className="text-lg text-white/90 font-medium"
          >
            {props.subheading || "Tire suas dúvidas sobre minha metodologia de trabalho."}
          </p>
        </motion.div>

        <div
          className={`max-w-3xl mx-auto transition-opacity duration-500 ${
            contentLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="space-y-8">
            {Object.entries(faqGroups).map(([category, items], categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: contentLoaded ? 1 : 0, y: contentLoaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">{category}</h3>
                <div className="space-y-4">
                  {items.map((item, itemIndex) => (
                    <motion.div
                      key={item.id}
                      className="border border-primary/20 rounded-lg overflow-hidden bg-dark/50 hover:border-primary/50 transition-all duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: contentLoaded ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + itemIndex * 0.05 + 0.3 }}
                    >
                      <button
                        className="faq-question w-full flex justify-between items-center p-4 text-left font-medium focus:outline-none text-white"
                        onClick={() => toggleItem(category, item.id)}
                        aria-expanded={openItems[category] === item.id}
                      >
                        <span data-tina-field={tinaField(item, "question")}>
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`transition-transform duration-300 ${
                            openItems[category] === item.id ? "rotate-180" : ""
                          }`}
                          size={20}
                        />
                      </button>
                      <div
                        className={`px-4 overflow-hidden transition-all duration-300 ${
                          openItems[category] === item.id ? "max-h-96 pb-4" : "max-h-0"
                        }`}
                      >
                        <div className="text-white/80 pt-2" data-tina-field={tinaField(item, "answer")}>
                          <TinaMarkdown content={item.answer} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}