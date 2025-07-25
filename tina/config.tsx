import { defineConfig } from "tinacms";

import { PageCollection } from "./collections/page";
import { SettingsCollection } from "./collections/settings";
import { FAQCollection } from "./collections/faq";
import { SolutionCollection } from "./collections/solution";

export default defineConfig({
  contentApiUrlOverride: "/api/tina/gql",
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  ui: {
    previewUrl: ({ branch }) => {
      return { url: `/preview?branch=${branch}` };
    },
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
      static: true,
    },
  },
  schema: {
    collections: [
      PageCollection,
      SettingsCollection,
      FAQCollection,
      SolutionCollection,
    ],
  },
});
