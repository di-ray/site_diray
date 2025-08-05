import { Collection } from "tinacms";

export const FAQCollection: Collection = {
  name: "faq",
  label: "❓ Perguntas Frequentes",
  path: "content/faqs",
  format: "md",
  fields: [
    {
      type: "string",
      name: "question",
      label: "Pergunta",
      isTitle: true,
      required: true,
    },
    {
      type: "rich-text",
      name: "answer",
      label: "Resposta",
      required: true,
    },
  ],
};
