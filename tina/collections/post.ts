
import type { Collection } from "tinacms";

export const PostCollection: Collection = {
  name: "post",
  label: "📰 Posts de Blog",
  path: "content/posts",
  format: "mdx",
  ui: {
    router: ({ document }) => `/blog/${document._sys.filename}`,
    filename: {
      readonly: false,
      slugify: (values) => {
        return `${values?.title?.toLowerCase().replace(/ /g, '-')}`
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "📝 Título",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      name: "publishedAt",
      label: "🗓️ Data de Publicação",
      ui: {
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
      },
    },
    {
      type: "image",
      name: "featuredImage",
      label: "🖼️ Imagem de Destaque",
    },
    {
      type: "string",
      name: "excerpt",
      label: "📄 Resumo",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "reference",
      name: "author",
      label: "✍️ Autor",
      collections: ["user"],
    },
    {
      type: "string",
      name: "tags",
      label: "🏷️ Tags",
      list: true,
      ui: {
        component: "tags",
      },
    },
    {
      type: "rich-text",
      name: "body",
      label: "✍️ Conteúdo do Post",
      isBody: true,
    },
  ],
};
