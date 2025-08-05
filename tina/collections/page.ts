import type { Collection } from "tinacms"

export const PageCollection: Collection = {
  name: "page",
  label: "📄 Páginas",
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
          label: "🎯 Hero Principal",
          fields: [
            { name: "heading", label: "📝 Título Principal", type: "string" },
            { name: "subheading", label: "📄 Subtítulo", type: "string" },
            { name: "description", label: "📝 Descrição", type: "string" },
            { name: "buttonText", label: "🔘 Texto do Botão", type: "string" },
            { name: "buttonLink", label: "🔗 Link do Botão", type: "string" },
          ],
        },
        {
          name: "engagement",
          label: "💪 Seção de Engajamento",
          fields: [
            { name: "heading", label: "📝 Título", type: "string" },
            { name: "text", label: "📄 Texto", type: "rich-text" },
          ],
        },
        {
          name: "challenges",
          label: "🎯 Desafios e Soluções",
          fields: [
            { name: "heading", label: "📝 Título da Seção", type: "string" },
            {
              name: "cards",
              label: "🃏 Cards",
              type: "object",
              list: true,
              fields: [
                { name: "groupTitle", label: "👥 Título do Grupo (Ex: CEOs)", type: "string" },
                { name: "content", label: "📄 Conteúdo do Card", type: "rich-text" },
                { name: "resultText", label: "✅ Texto de Resultado", type: "string" },
              ],
            },
          ],
        },
        {
          name: "moreSolutions",
          label: "🚀 Mais Soluções",
          fields: [
            { name: "heading", label: "📝 Título", type: "string" },
            { name: "subtitle", label: "📄 Subtítulo", type: "string" },
            {
              name: "solutions",
              label: "🛠️ Lista de Soluções",
              type: "object",
              list: true,
              fields: [
                { name: "slug", label: "🔗 Slug", type: "string" },
                { name: "icon", label: "🎨 Ícone", type: "string" },
                { name: "title", label: "📝 Título", type: "string" },
                { name: "description", label: "📄 Descrição", type: "string" },
              ],
            },
          ],
        },
        {
          name: "moreSolutionsHome",
          label: "🏠 Mais Soluções (Home)",
          fields: [
            { name: "heading", label: "📝 Título", type: "string" },
            { name: "subtitle", label: "📄 Subtítulo", type: "string" },
            {
              name: "solutions",
              label: "🛠️ Lista de Soluções",
              type: "object",
              list: true,
              fields: [
                { name: "slug", label: "🔗 Slug", type: "string" },
                { name: "icon", label: "🎨 Ícone", type: "string" },
                { name: "title", label: "📝 Título", type: "string" },
                { name: "description", label: "📄 Descrição", type: "string" },
              ],
            },
          ],
        },
        {
          name: "whyDiray",
          label: "⭐ Por que DI.RAY",
          fields: [
            { name: "heading", label: "📝 Título", type: "string" },
            { name: "subheading", label: "📄 Subtítulo", type: "string" },
            {
              name: "features",
              label: "✨ Diferenciais",
              type: "object",
              list: true,
              fields: [
                { name: "icon", label: "🎨 Ícone", type: "string" },
                { name: "title", label: "📝 Título", type: "string" },
                { name: "description", label: "📄 Descrição", type: "string" },
              ],
            },
          ],
        },
        {
          name: "about",
          label: "👤 Seção Sobre",
          fields: [
            { name: "heading", label: "📝 Título", type: "string" },
            { name: "founderName", label: "👤 Nome do Fundador", type: "string" },
            { name: "founderTitle", label: "💼 Cargo do Fundador", type: "string" },
            { name: "biography", label: "📖 Biografia", type: "rich-text" },
            { name: "founderImage", label: "🖼️ Imagem do Fundador", type: "image" },
            { name: "clientLogosImage", label: "🏢 Logos de Clientes", type: "image" },
          ],
        },
        {
          name: "faq",
          label: "❓ FAQ",
          fields: [
            { name: "heading", label: "📝 Título", type: "string" },
            { name: "subheading", label: "📄 Subtítulo", type: "string" },
            {
              name: "questions",
              label: "❓ Perguntas",
              type: "object",
              list: true,
              fields: [
                { name: "category", label: "📁 Categoria", type: "string" },
                { name: "question", label: "❓ Pergunta", type: "string" },
                { name: "answer", label: "💬 Resposta", type: "rich-text" },
              ],
            },
          ],
        },
        {
          name: "logoCarousel",
          label: "🏢 Carrossel de Logos",
          fields: [
            { name: "title", label: "📝 Título", type: "string" },
            { name: "description", label: "📄 Descrição", type: "string" },
            { name: "logoImage", label: "🖼️ Imagem dos Logos", type: "image" },
            { name: "showAnimation", label: "🎬 Mostrar Animação", type: "boolean" },
          ],
        },
        {
          name: "contact",
          label: "📞 Seção de Contato",
          fields: [
            { name: "heading", label: "📝 Título", type: "string" },
            { name: "subheading", label: "📄 Subtítulo", type: "string" },
            { name: "whatsapp", label: "📱 WhatsApp", type: "string" },
            { name: "email", label: "📧 E-mail", type: "string" },
          ],
        },
        {
          name: "footer",
          label: "🦶 Rodapé",
          fields: [
            { name: "logo", label: "🖼️ Logo", type: "image" },
            { name: "logoAlt", label: "📝 Texto Alternativo do Logo", type: "string" },
            { name: "description", label: "📄 Descrição", type: "string" },
            { name: "quickLinksTitle", label: "📝 Título Links Rápidos", type: "string" },
            {
              name: "quickLinks",
              label: "🔗 Links Rápidos",
              type: "object",
              list: true,
              fields: [
                { name: "text", label: "📝 Texto", type: "string" },
                { name: "href", label: "🔗 Link", type: "string" },
              ],
            },
            { name: "servicesTitle", label: "📝 Título Serviços", type: "string" },
            {
              name: "serviceLinks",
              label: "🛠️ Links de Serviços",
              type: "object",
              list: true,
              fields: [
                { name: "text", label: "📝 Texto", type: "string" },
                { name: "href", label: "🔗 Link", type: "string" },
              ],
            },
            { name: "socialTitle", label: "📝 Título Redes Sociais", type: "string" },
            {
              name: "socialLinks",
              label: "📱 Redes Sociais",
              type: "object",
              list: true,
              fields: [
                { name: "platform", label: "📱 Plataforma", type: "string" },
                { name: "username", label: "👤 Usuário", type: "string" },
                { name: "url", label: "🔗 URL", type: "string" },
              ],
            },
            { name: "copyrightText", label: "©️ Texto de Copyright", type: "string" },
          ],
        },
      ],
    },
  ],
}
