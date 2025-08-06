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
  
  // Convert TinaCMS data to match Header component props
  const headerSettings = settings ? {
    navigation: settings.navigation ? {
      logo: settings.navigation.logo ?? undefined,
      menuItems: settings.navigation.menuItems?.filter(item => item !== null).map(item => ({
        label: item.label,
        href: item.href,
        hasSubmenu: item.hasSubmenu ?? undefined,
        submenuItems: item.submenuItems?.filter(subItem => 
          subItem !== null && subItem.label && subItem.href
        ).map(subItem => ({
          label: subItem!.label!,
          href: subItem!.href!
        }))
      }))
    } : undefined
  } : null
  
  return <Header settings={headerSettings} />
}