import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CookieConsent from "@/components/cookie-consent"
import TrackingScripts from "@/components/tracking-scripts"
import { cn } from "@/lib/utils"

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
  description: "Consultoria especializada em desenvolvimento organizacional e empresarial",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn("min-h-screen bg-background font-sans antialiased overflow-x-hidden", poppins.variable)}>
        {/* Scripts de rastreamento - Substitua com seus IDs reais */}
        <TrackingScripts
          googleAnalyticsId="G-XXXXXXXXXX"
          googleAdsId="XXXXXXXXXX"
          facebookPixelId="XXXXXXXXXX"
          linkedInId="XXXXXXXXXX"
        />

        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"
