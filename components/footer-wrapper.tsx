import { FooterSection } from './blocks/footer'
import client from '@/tina/__generated__/client'

async function getFooterSettings() {
  try {
    const result = await client.queries.settings({ relativePath: "index.json" })
    return result.data.settings.footer
  } catch (error) {
    console.error("Error loading footer settings:", error)
    return null
  }
}

export async function FooterWrapper() {
  const footerSettings = await getFooterSettings()
  
  return <FooterSection {...footerSettings} />
}