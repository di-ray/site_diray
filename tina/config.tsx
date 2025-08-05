import { defineConfig } from "tinacms";

import { PageCollection } from "./collections/page";
import { SettingsCollection } from "./collections/settings";
import { FAQCollection } from "./collections/faq";
import { SolutionCollection } from "./collections/solution";
import { CalculatorCollection } from "./collections/calculator";

const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  token:  process.env.TINA_TOKEN, // This should match the value in your .env file
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // This should match the value in your .env file
  branch,
  
  build: {
    publicFolder: "public",
    outputFolder: "admin",
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
      CalculatorCollection,
    ],
  },
});