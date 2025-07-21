import type { Collection } from "tinacms";

export const TestimonialCollection: Collection = {
  name: "testimonial",
  label: "💬 Depoimentos",
  path: "content/testimonials",
  format: "json",
  fields: [
    {
      type: "string",
      name: "quote",
      label: "💬 Citação",
      required: true,
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "author",
      label: "✍️ Autor",
      required: true,
    },
    {
      type: "string",
      name: "company",
      label: "🏢 Empresa/Cargo",
    },
    {
      type: "image",
      name: "avatar",
      label: "👤 Avatar",
    },
  ],
};
