import { createClient } from "tinacms/dist/client";
import { queries } from "./types";

// Self-hosted configuration
const apiUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/tina/graphql`
  : process.env.NODE_ENV === "production"
  ? "https://site-diray.vercel.app/api/tina/graphql" 
  : "http://localhost:3000/api/tina/graphql";

export const client = createClient({
  url: apiUrl,
  token: process.env.TINA_TOKEN || "",
  queries,
});

export default client;
  