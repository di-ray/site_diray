import type { Collection } from "tinacms";

export const TeamMemberCollection: Collection = {
  name: "teamMember",
  label: "👥 Membros da Equipe",
  path: "content/team",
  format: "md",
  fields: [
    {
      type: "string",
      name: "name",
      label: "📛 Nome",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "role",
      label: "👨‍💻 Cargo",
      required: true,
    },
    {
      type: "image",
      name: "photo",
      label: "👤 Foto",
    },
    {
      type: "string",
      name: "bio",
      label: "📄 Biografia",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      name: "socialLinks",
      label: "🔗 Links Sociais",
      fields: [
        {
          type: "string",
          name: "linkedin",
          label: "LinkedIn",
        },
        {
          type: "string",
          name: "github",
          label: "GitHub",
        },
        {
          type: "string",
          name: "twitter",
          label: "Twitter",
        },
      ],
    },
  ],
};
