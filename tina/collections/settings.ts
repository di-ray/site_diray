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
