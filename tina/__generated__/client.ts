import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/home/moitinho/site_diray/tina/__generated__/.cache/1758046082568', url: '/api/tina/graphql', token: 'undefined', queries,  });
export default client;
  