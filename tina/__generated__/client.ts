import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:3000/api/tina/graphql', token: '2c23294c4d1c8174c22fa5ca648cc30f1b75f9fc', queries,  });
export default client;
  