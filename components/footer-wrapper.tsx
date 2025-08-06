import { FooterSection } from './blocks/footer'
import databaseClient from '@/tina/__generated__/databaseClient'

async function getFooterSettings() {
  try {
    const result = await databaseClient.queries.settings({ relativePath: "index.json" })
    return (result.data.settings as any)?.footer || null
  } catch (error) {
    console.error("Error loading footer settings:", error)
    return null
  }
}

export async function FooterWrapper() {
  const footerSettings = await getFooterSettings()
  
  if (!footerSettings) {
    return <FooterSection />
  }
  
  // Convert null values to undefined to match FooterProps type
  const props = Object.entries(footerSettings).reduce((acc, [key, value]) => {
    acc[key] = value === null ? undefined : value
    return acc
  }, {} as any)
  
  return <FooterSection {...props} />
}