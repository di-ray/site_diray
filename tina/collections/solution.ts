import type { Collection } from "tinacms"

export const SolutionCollection: Collection = {
  name: "solution",
  label: "🚀 Soluções",
  path: "content/solutions",
  format: "mdx",
  ui: {
    router: ({ document }) => `/solucoes/${document._sys.filename}`,
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Título",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "icon",
      label: "Ícone (Lucide)",
      description: "Nome do ícone da biblioteca lucide-react. Ex: 'BriefcaseBusiness'",
    },
    {
      type: "string",
      name: "excerpt",
      label: "Resumo",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Blocos de Conteúdo",
      ui: {
        visualSelector: true,
      },
      templates: [
        {
          name: "solutionHero",
          label: "Hero da Solução",
          fields: [
            { name: "heroTitle", label: "Título", type: "string", required: true },
            { name: "heroHighlight", label: "Destaque", type: "string" },
            { name: "heroSubtitle", label: "Subtítulo", type: "string" },
            { name: "backgroundImage", label: "Imagem de Fundo", type: "image" },
            { name: "videoSrc", label: "URL do Vídeo", type: "string", description: "Caminho para o arquivo de vídeo (ex: /videos/hero.mp4)" },
            { name: "videoStartTime", label: "Tempo Inicial do Vídeo (segundos)", type: "number", description: "Quando o vídeo deve começar" },
            { name: "videoEndTime", label: "Tempo Final do Vídeo (segundos)", type: "number", description: "Quando o vídeo deve reiniciar" },
            { name: "overlayOpacity", label: "Opacidade do Overlay", type: "number", description: "Opacidade do overlay escuro (0-1)" },
          ],
        },
        {
          name: "solutionIntro",
          label: "Introdução da Solução",
          fields: [
            { name: "introTitle", label: "Título", type: "string", required: true },
            { name: "introDescription", label: "Descrição (parágrafos)", type: "string", list: true },
            { name: "minPrice", label: "Preço mínimo", type: "string" },
            { name: "minDuration", label: "Duração mínima", type: "string" },
          ],
        },
        {
          name: "whatYouReceive",
          label: "O que você recebe",
          fields: [
            {
              name: "items",
              label: "Itens",
              type: "object",
              list: true,
              fields: [
                { name: "icon", label: "Ícone (Lucide)", type: "string" },
                { name: "title", label: "Título", type: "string" },
                { name: "description", label: "Descrição (parágrafos)", type: "string", list: true },
              ],
            },
          ],
        },
        {
          name: "solutionCalculator",
          label: "Calculadora de Solução",
          fields: [
            { 
              name: "calculatorType", 
              label: "Tipo de Calculadora", 
              type: "string",
              options: [
                { value: "legacy", label: "Calculadora Antiga (Legado)" },
                { value: "tina", label: "Calculadora TinaCMS" },
              ],
              required: false,
            },
            { 
              name: "calculatorId", 
              label: "ID da Calculadora (TinaCMS)", 
              type: "reference",
              collections: ["calculator"],
              description: "Selecione uma calculadora do TinaCMS",
            },
            { name: "basePrice", label: "Preço Base (Legado)", type: "number" },
            {
              name: "factors",
              label: "Fatores (Legado)",
              type: "object",
              list: true,
              fields: [
                { name: "name", label: "Nome do Fator", type: "string" },
                {
                  name: "options",
                  label: "Opções",
                  type: "object",
                  list: true,
                  fields: [
                    { name: "label", label: "Rótulo", type: "string" },
                    { name: "multiplier", label: "Multiplicador", type: "number" },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "solutionTimeline",
          label: "Timeline da Solução",
          fields: [
            { name: "timelineTitle", label: "Título da Timeline", type: "string" },
            {
              name: "steps",
              label: "Etapas",
              type: "object",
              list: true,
              fields: [
                { name: "icon", label: "Ícone (Lucide)", type: "string" },
                { name: "title", label: "Título", type: "string" },
                { name: "description", label: "Descrição", type: "string" },
              ],
            },
          ],
        },
        {
          name: "whyDiray",
          label: "Por que Diray",
          fields: [
            { name: "heading", label: "Título", type: "string", required: true },
            { name: "subheading", label: "Subtítulo", type: "string" },
            {
              name: "features",
              label: "Diferenciais",
              type: "object",
              list: true,
              fields: [
                { name: "icon", label: "Ícone (Lucide)", type: "string" },
                { name: "title", label: "Título", type: "string" },
                { name: "description", label: "Descrição", type: "string" },
              ],
            },
          ],
        },
        {
          name: "moreSolutions",
          label: "Mais Soluções",
          fields: [{ name: "heading", label: "Título", type: "string", required: true }],
        },
        {
          name: "contact",
          label: "Entre em contato",
          fields: [
            { name: "heading", label: "Título", type: "string", required: true },
            { name: "subheading", label: "Subtítulo", type: "string" },
            { name: "whatsapp", label: "WhatsApp", type: "string" },
            { name: "email", label: "E-mail", type: "string" },
          ],
        },
        // Adicione outros blocos extras conforme necessário (benefits, cta, faq, etc.)
      ],
    },
  ],
}
