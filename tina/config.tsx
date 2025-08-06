import { defineConfig } from "tinacms";

import { PageCollection } from "./collections/page";
import { SettingsCollection } from "./collections/settings";
import { FAQCollection } from "./collections/faq";
import { SolutionCollection } from "./collections/solution";
import { CalculatorCollection } from "./collections/calculator";

const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "dependabot/npm_and_yarn/multi-544f560e85";

export default defineConfig({
  // Self-hosted configuration
  contentApiUrlOverride: "/api/tina/graphql",
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
      SettingsCollection,
      PageCollection,
      SolutionCollection,
      CalculatorCollection,
      FAQCollection,
    ],
  },
});