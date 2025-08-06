import { defineConfig } from "tinacms";

import { PageCollection } from "./collections/page";
import { SettingsCollection } from "./collections/settings";
import { FAQCollection } from "./collections/faq";
import { SolutionCollection } from "./collections/solution";
import { CalculatorCollection } from "./collections/calculator";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';
const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.NEXT_PUBLIC_TINA_BRANCH || "main";

export default defineConfig({
  // Self-hosted configuration
  contentApiUrlOverride: isLocal 
    ? `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/tina/graphql` 
    : "/api/tina/graphql",
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  
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
      SettingsCollection,
      PageCollection,
      SolutionCollection,
      CalculatorCollection,
      FAQCollection,
    ],
  },
});