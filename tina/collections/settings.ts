import type { Collection } from "tinacms";

export const SettingsCollection: Collection = {
  name: "settings",
  label: "⚙️ Configurações do Site",
  path: "content/settings",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    global: true,
  },
  fields: [
    {
      type: "object",
      name: "siteInfo",
      label: "🌐 Informações do Site",
      fields: [
        {
          type: "string",
          name: "title",
          label: "📝 Título do Site",
          required: true,
        },
        {
          type: "string",
          name: "description",
          label: "📄 Descrição",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "keywords",
          label: "🏷️ Palavras-chave",
          description: "Separadas por vírgula",
        },
      ],
    },
    {
      type: "object",
      name: "contact",
      label: "📞 Informações de Contato",
      fields: [
        {
          type: "string",
          name: "email",
          label: "📧 E-mail",
        },
        {
          type: "string",
          name: "phone",
          label: "📱 Telefone",
        },
        {
          type: "string",
          name: "address",
          label: "🏢 Endereço",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
    {
      type: "object",
      name: "social",
      label: "📱 Redes Sociais",
      fields: [
        {
          type: "string",
          name: "facebook",
          label: "Facebook",
        },
        {
          type: "string",
          name: "instagram",
          label: "Instagram",
        },
        {
          type: "string",
          name: "linkedin",
          label: "LinkedIn",
        },
        {
          type: "string",
          name: "twitter",
          label: "Twitter",
        },
      ],
    },
    {
      type: "object",
      name: "navigation",
      label: "🧭 Navegação (Header)",
      fields: [
        {
          type: "image",
          name: "logo",
          label: "🖼️ Logo",
        },
        {
          type: "object",
          name: "menuItems",
          label: "📋 Itens do Menu",
          list: true,
          fields: [
            {
              type: "string",
              name: "label",
              label: "📝 Texto",
              required: true,
            },
            {
              type: "string",
              name: "href",
              label: "🔗 Link",
              required: true,
            },
            {
              type: "boolean",
              name: "hasSubmenu",
              label: "📂 Tem submenu?",
            },
            {
              type: "object",
              name: "submenuItems",
              label: "📋 Itens do Submenu",
              list: true,
              fields: [
                {
                  type: "string",
                  name: "label",
                  label: "📝 Texto",
                },
                {
                  type: "string",
                  name: "href",
                  label: "🔗 Link",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "footer",
      label: "🦶 Rodapé",
      fields: [
        { 
          type: "image",
          name: "logo", 
          label: "🖼️ Logo" 
        },
        { 
          type: "string",
          name: "logoAlt", 
          label: "📝 Texto Alternativo do Logo" 
        },
        { 
          type: "string",
          name: "description", 
          label: "📄 Descrição" 
        },
        { 
          type: "string",
          name: "quickLinksTitle", 
          label: "📝 Título Links Rápidos" 
        },
        {
          type: "object",
          name: "quickLinks",
          label: "🔗 Links Rápidos",
          list: true,
          fields: [
            { 
              type: "string",
              name: "text", 
              label: "📝 Texto" 
            },
            { 
              type: "string",
              name: "href", 
              label: "🔗 Link" 
            },
          ],
        },
        { 
          type: "string",
          name: "servicesTitle", 
          label: "📝 Título Serviços" 
        },
        {
          type: "object",
          name: "serviceLinks",
          label: "🛠️ Links de Serviços",
          list: true,
          fields: [
            { 
              type: "string",
              name: "text", 
              label: "📝 Texto" 
            },
            { 
              type: "string",
              name: "href", 
              label: "🔗 Link" 
            },
          ],
        },
        { 
          type: "string",
          name: "socialTitle", 
          label: "📝 Título Redes Sociais" 
        },
        {
          type: "object",
          name: "socialLinks",
          label: "📱 Redes Sociais",
          list: true,
          fields: [
            { 
              type: "string",
              name: "platform", 
              label: "📱 Plataforma" 
            },
            { 
              type: "string",
              name: "username", 
              label: "👤 Usuário" 
            },
            { 
              type: "string",
              name: "url", 
              label: "🔗 URL" 
            },
          ],
        },
        { 
          type: "string",
          name: "copyrightText", 
          label: "©️ Texto de Copyright" 
        },
      ],
    },
    {
      type: "object",
      name: "theme",
      label: "🎨 Tema e Aparência",
      fields: [
        {
          type: "string",
          name: "primaryColor",
          label: "🎨 Cor Primária",
          ui: {
            component: "color",
          },
        },
        {
          type: "string",
          name: "secondaryColor",
          label: "🎨 Cor Secundária",
          ui: {
            component: "color",
          },
        },
        {
          type: "boolean",
          name: "darkMode",
          label: "🌙 Modo Escuro",
        },
      ],
    },
  ],
};
