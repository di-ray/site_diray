import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection,
} from "tinacms-authjs/dist/tinacms";
import { defineConfig, LocalAuthProvider } from "tinacms";

import { PageCollection } from "./collections/page";
import { SettingsCollection } from "./collections/settings";
import { PostCollection } from "./collections/post";
import { ProjectCollection } from "./collections/project";
import { TestimonialCollection } from "./collections/testimonial";
import { TeamMemberCollection } from "./collections/teamMember";

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
      PostCollection,
      ProjectCollection,
      TestimonialCollection,
      TeamMemberCollection,
    ],
  },
});
