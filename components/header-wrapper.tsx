import { client } from "@/tina/__generated__/client"
import Header from "./header"

async function getSettings() {
  try {
    const result = await client.queries.settings({ relativePath: "index.json" })
    return result.data.settings
  } catch (error) {
    console.error("Error loading settings:", error)
    return null
  }
}

export default async function HeaderWrapper() {
  const settings = await getSettings()
  
  return <Header settings={settings} />
}