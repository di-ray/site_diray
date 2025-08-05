import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import HeaderWrapper from "@/components/header-wrapper"
import Footer from "@/components/footer"
import { TrackingScripts } from "@/components/tracking-scripts"
import { CookieConsent } from "@/components/cookie-consent"

// Mova as fontes para o escopo do módulo
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "DI.RAY - Consultoria em Desenvolvimento Organizacional",
  description: "Soluções em performance e cultura organizacional para equipes mais produtivas e engajadas. Usando inteligência artificial e experiência na área, entrego soluções práticas e efetivas.",
  keywords: "consultoria organizacional, desenvolvimento empresarial, treinamento corporativo, cultura organizacional, performance, inteligência artificial, DI.RAY, Diego Raymundo",
  authors: [{ name: "Diego Raymundo" }],
  creator: "DI.RAY Consultoria",
  publisher: "DI.RAY Consultoria",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn("min-h-screen bg-background font-sans antialiased overflow-x-hidden", poppins.variable, inter.variable)}>
        <TrackingScripts 
          googleAnalyticsId={process.env.NEXT_PUBLIC_GA_ID}
          facebookPixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID}
          linkedInPartnerId={process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}
          googleAdsId={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}
        />
        <HeaderWrapper />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
