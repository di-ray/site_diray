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
    // Processo de consultoria
    {
      category: "Processo de consultoria",
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
      category: "Processo de consultoria",
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
      category: "Processo de consultoria",
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
      category: "Processo de consultoria",
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
      category: "Processo de consultoria",
      question: "Você subcontrata fornecedores para materiais ou design?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Não. Todas as etapas, do briefing à entrega, são realizadas diretamente por mim, garantindo qualidade, eficiência e transparência, sem a necessidade de contratação de fornecedores externos.'
          }]
        }]
      }
    },
    {
      category: "Processo de consultoria",
      question: "Você usa IA em suas soluções?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Sim, para otimizar processos operacionais e focar na análise e personalização. E, como parte do serviço, ensino aos clientes como usar essas ferramentas de IA, garantindo autonomia e eficiência para futuras aplicações.'
          }]
        }]
      }
    },
    {
      category: "Processo de consultoria",
      question: "Como os resultados são mensurados?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Todas as soluções incluem métricas definidas e que são comunicadas ao cliente logo na etapa de briefing. Detalhes sobre as métricas podem ser encontrados na página de cada serviço.'
          }]
        }]
      }
    },
    {
      category: "Processo de consultoria",
      question: "Como você define preços e prazos?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Baseio-me em processos claros, diretos e simplificados, estruturados pela minha experiência de mais de 20 anos com processos de desenvolvimento e engajamento. Cada etapa tem horas bem definidas, e os custos são calculados por valor/hora de consultoria.'
          }]
        }]
      }
    },
    {
      category: "Processo de consultoria",
      question: "Por que outras consultorias não abrem preços e prazos?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Os motivos podem incluir falta de expertise na área, desconhecimento de práticas de automação e mesmo falta de interesse em simplificar processos e trazer transparência ao cliente. Realizo todas as etapas internamente, evitando complexidade e custos adicionais.'
          }]
        }]
      }
    },
    {
      category: "Processo de consultoria",
      question: "Por que minha empresa precisa de soluções de desenvolvimento e engajamento?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Desenvolvimento e engajamento fortalecem a cultura, atraem talentos e aumentam a produtividade. São essenciais para a competitividade no mercado e adaptação às mudanças recentes como trabalho híbrido e transformação digital das organizações.'
          }]
        }]
      }
    },
    {
      category: "Processo de consultoria",
      question: "O que é a Sessão de Transferência de Conhecimento?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'É uma etapa do modelo de consultoria DI.RAY em que ensino como os serviços foram implementados e como usar as ferramentas aplicadas, incluindo IA. Isso garante autonomia ao cliente para replicar iniciativas no futuro quantas vezes e com quais públicos quiser.'
          }]
        }]
      }
    },
    // Atendimento e gestão administrativa
    {
      category: "Atendimento e gestão administrativa",
      question: "Você emite nota fiscal?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Sim, todos os serviços seguem os requisitos legais brasileiros e práticas éticas, com emissão de nota fiscal.'
          }]
        }]
      }
    },
    {
      category: "Atendimento e gestão administrativa",
      question: "Quais formas de pagamento são aceitas?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Transferência bancária, link de pagamento online e cartões de crédito ou débito.'
          }]
        }]
      }
    },
    {
      category: "Atendimento e gestão administrativa",
      question: "Você oferece outros produtos além dos listados no site?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Não. Para manter o foco e a qualidade, trabalho apenas com os produtos do portfólio. O aumento do portfólio pode ser avaliado, caso haja demanda consistente.'
          }]
        }]
      }
    },
    {
      category: "Atendimento e gestão administrativa",
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
      category: "Atendimento e gestão administrativa",
      question: "Minha organização é única. Como você consegue calcular custos e prazos para ela?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'Adapto processos bem estruturados à realidade de cada cliente. Minha experiência de mais de 20 anos em diferentes segmentos garante soluções personalizadas e eficazes, mantendo a simplicidade e resultados focados.'
          }]
        }]
      }
    },
    // Informações no site
    {
      category: "Informações no site",
      question: "O que significa \"preço mínimo\"?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'É o custo para serviços aplicados nos cenários de menor complexidade possível. Por exemplo, para serviços cujo preço está relacionado à quantidade de funcionários, seriam as organizações que estão na menor faixa de número de funcionários.'
          }]
        }]
      }
    },
    {
      category: "Informações no site",
      question: "Por que as durações são estimadas?",
      answer: {
        type: 'root',
        children: [{
          type: 'p',
          children: [{
            type: 'text',
            text: 'As estimativas consideram o tempo necessário de execução das etapas executadas por DI.RAY. Caso as etapas de responsabilidade do cliente acabem demandando mais tempo, a duração total é impactada.'
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
            data-tina-field={tinaField(props as any, "heading")} 
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            {props.heading || "Perguntas Frequentes"}
          </h2>
          <p 
            data-tina-field={tinaField(props as any, "subheading")} 
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
                        <span data-tina-field={tinaField(item as any, "question")}>
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
                        <div className="text-white/80 pt-2" data-tina-field={tinaField(item as any, "answer")}>
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