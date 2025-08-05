import type { Collection } from "tinacms"

export const PageCollection: Collection = {
  name: "page",
  label: "Páginas",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`
      }
      return `/${document._sys.filename}`
    },
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
      type: "object",
      list: true,
      name: "blocks",
      label: "Blocos de Conteúdo",
      ui: {
        visualSelector: true,
      },
      templates: [
        {
          name: "hero",
          label: "Seção Hero",
          fields: [
            { name: "heading", label: "Título Principal", type: "string" },
            { name: "subheading", label: "Subtítulo", type: "string" },
            { name: "description", label: "Descrição", type: "string" },
            { name: "buttonText", label: "Texto do Botão", type: "string" },
            { name: "buttonLink", label: "Link do Botão", type: "string" },
          ],
        },
        {
          name: "engagement",
          label: "Seção de Engajamento",
          fields: [
            { name: "heading", label: "Título", type: "string" },
            { name: "text", label: "Texto", type: "rich-text" },
          ],
        },
        {
          name: "challenges",
          label: "Seção de Desafios (Cards)",
          fields: [
            { name: "heading", label: "Título da Seção", type: "string" },
            {
              name: "cards",
              label: "Cards",
              type: "object",
              list: true,
              fields: [
                { name: "groupTitle", label: "Título do Grupo (Ex: CEOs)", type: "string" },
                { name: "content", label: "Conteúdo do Card (Pontos)", type: "rich-text" },
                { name: "resultText", label: "Texto de Resultado", type: "string" },
              ],
            },
          ],
        },
        {
          name: "moreSolutions",
          label: "Mais Soluções",
          fields: [{ name: "heading", label: "Título", type: "string" }],
        },
        {
          name: "whyDiray",
          label: "Por que DI.RAY",
          fields: [
            { name: "heading", label: "Título", type: "string" },
            { name: "subheading", label: "Subtítulo", type: "string" },
          ],
        },
        {
          name: "about",
          label: "Seção Sobre",
          fields: [
            { name: "heading", label: "Título", type: "string" },
            { name: "founderName", label: "Nome do Fundador", type: "string" },
            { name: "founderTitle", label: "Cargo do Fundador", type: "string" },
            { name: "biography", label: "Biografia", type: "rich-text" },
            { name: "founderImage", label: "Imagem do Fundador", type: "image" },
            { name: "clientLogosImage", label: "Imagem de Logos de Clientes", type: "image" },
          ],
        },
        {
          name: "faq",
          label: "Seção de FAQ",
          fields: [
            { name: "heading", label: "Título", type: "string" },
            { name: "subheading", label: "Subtítulo", type: "string" },
            {
              name: "questions",
              label: "Perguntas",
              type: "object",
              list: true,
              fields: [
                { name: "question", label: "Pergunta", type: "string" },
                { name: "answer", label: "Resposta", type: "rich-text" },
              ],
            },
          ],
        },
        {
          name: "contact",
          label: "Seção de Contato",
          fields: [
            { name: "heading", label: "Título", type: "string" },
            { name: "subheading", label: "Subtítulo", type: "string" },
            { name: "whatsapp", label: "Whatsapp", type: "string" },
            { name: "email", label: "E-mail", type: "string" },
          ],
        },
      ],
    },
  ],
}
