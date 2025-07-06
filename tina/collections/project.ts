
import type { Collection } from "tinacms";

export const ProjectCollection: Collection = {
  name: "project",
  label: "🚀 Projetos",
  path: "content/projects",
  format: "md",
  fields: [
    {
      type: "string",
      name: "title",
      label: "📝 Título do Projeto",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "client",
      label: "🏢 Cliente",
    },
    {
      type: "datetime",
      name: "completedDate",
      label: "🗓️ Data de Conclusão",
    },
    {
      type: "string",
      name: "website",
      label: "🌐 Website",
    },
    {
      type: "image",
      name: "thumbnail",
      label: "🖼️ Miniatura",
    },
    {
      type: "string",
      name: "tags",
      label: "🏷️ Tecnologias/Tags",
      list: true,
      ui: {
        component: "tags",
      },
    },
    {
      type: "rich-text",
      name: "description",
      label: "📄 Descrição do Projeto",
      isBody: true,
    },
  ],
};
