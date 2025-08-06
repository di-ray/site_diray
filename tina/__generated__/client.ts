import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ 
  url: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "http://localhost:4001",
  token: process.env.TINA_TOKEN , 
  queries
});
export default client;
  