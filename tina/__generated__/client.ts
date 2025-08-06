import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ 
  url: 'https://content.tinajs.io/1.6/content/ebb20b99-d45a-4ba2-8f1e-8461e821fde9/github/dependabot/npm_and_yarn/multi-544f560e85', 
  token: '2c23294c4d1c8174c22fa5ca648cc30f1b75f9fc', 
  queries
});
export default client;
  