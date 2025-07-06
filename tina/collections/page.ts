import type { Collection } from "tinacms";

export const PageCollection: Collection = {
  name: "page",
  label: "📄 Páginas",
  path: "content/pages",
  format: "md",
  ui: {
    router: () => "/",
    filename: {
      readonly: false,
      slugify: (values) => {
        return `${values?.header?.toLowerCase().replace(/ /g, '-')}`
      },
    },
    beforeSubmit: async ({
      form,
      cms,
      values,
    }) => {
      // Validações personalizadas antes de salvar
      if (!values.header) {
        throw new Error('O campo Header é obrigatório');
      }
      return values;
    },
  },
  fields: [
    {
      type: "string",
      name: "header",
      label: "📝 Cabeçalho da Página",
      description: "O título principal que aparecerá na página",
      required: true,
    },
    {
      type: "object",
      name: "logo",
      label: "🖼️ Logo",
      description: "Logo que será exibido na página",
      fields: [
        { 
          type: "image", 
          name: "url", 
          label: "🖼️ Imagem do Logo",
          description: "Faça upload ou selecione uma imagem"
        },
        { 
          type: "string", 
          name: "alt", 
          label: "📝 Texto Alternativo",
          description: "Descrição da imagem para acessibilidade"
        },
      ],
    },
    {
      type: "object",
      list: true,
      name: "links",
      label: "🔗 Links de Navegação",
      description: "Links que aparecerão na página",
      ui: {
        itemProps: (item) => {
          return {
            label: `🔗 ${item?.header || 'Novo Link'}`,
          };
        },
        defaultItem: {
          header: "Novo Link",
          description: "Descrição do link",
          url: "https://",
        },
      },
      fields: [
        { 
          type: "string", 
          name: "header",
          label: "📝 Título do Link",
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
          name: "url",
          label: "🌐 URL",
          required: true,
        },
      ],
    },
  ],
};
