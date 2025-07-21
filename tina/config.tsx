import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection,
} from "tinacms-authjs/dist/tinacms";
import { defineConfig, LocalAuthProvider } from "tinacms";

import { PageCollection } from "./collections/page";
import { SettingsCollection } from "./collections/settings";
import { FAQCollection } from "./collections/faq";
import { SolutionCollection } from "./collections/solution";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default defineConfig({
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
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
      TinaUserCollection,
      PageCollection,
      SettingsCollection,
      FAQCollection,
      SolutionCollection,
    ],
  },
});
