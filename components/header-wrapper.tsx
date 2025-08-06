import databaseClient from "@/tina/__generated__/databaseClient"
import Header from "./header"

async function getSettings() {
  try {
    const result = await databaseClient.queries.settings({ relativePath: "index.json" })
    return result.data.settings
  } catch (error) {
    console.error("Error loading settings:", error)
    return null
  }
}

export default async function HeaderWrapper() {
  const settings = await getSettings()
  
  // Convert TinaCMS data to match Header component props
  const headerSettings = settings && (settings as any).navigation ? {
    navigation: {
      logo: (settings as any).navigation.logo ?? undefined,
      menuItems: (settings as any).navigation.menuItems?.filter((item: any) => item !== null).map((item: any) => ({
        label: item.label,
        href: item.href,
        hasSubmenu: item.hasSubmenu ?? undefined,
        submenuItems: item.submenuItems?.filter((subItem: any) => 
          subItem !== null && subItem.label && subItem.href
        ).map((subItem: any) => ({
          label: subItem.label,
          href: subItem.href
        }))
      }))
    }
  } : null
  
  return <Header settings={headerSettings} />
}