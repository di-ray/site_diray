"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin } from "lucide-react"
import { tinaField } from "tinacms/dist/react"

interface FooterLink {
  text: string
  href: string
}

interface SocialLink {
  platform: string
  username: string
  url: string
}

interface FooterProps {
  logo?: string
  logoAlt?: string
  description?: string
  quickLinksTitle?: string
  quickLinks?: FooterLink[]
  servicesTitle?: string
  serviceLinks?: FooterLink[]
  socialTitle?: string
  socialLinks?: SocialLink[]
  copyrightText?: string
}

export function FooterSection({
  logo = "/images/diray-logo-white.png",
  logoAlt = "DI.RAY",
  description = "Consultoria especializada em desenvolvimento organizacional e empresarial, ajudando empresas a alcançarem seu potencial máximo.",
  quickLinksTitle = "Link Rápido",
  quickLinks = [
    { text: "Sobre DI.RAY", href: "/#sobre" },
    { text: "Serviços", href: "/solucoes" },
    { text: "Por que DI.RAY", href: "/por-que-diray" },
    { text: "Perguntas Frequentes", href: "/#faq" }
  ],
  servicesTitle = "Serviços",
  serviceLinks = [
    { text: "Estratégia de Treinamento", href: "/solucoes/estrategia-de-treinamento" },
    { text: "Formação customizada em IA", href: "/solucoes/formacao-de-ia" },
    { text: "Plano de Comunicação", href: "/solucoes/plano-de-comunicacao" },
    { text: "Alinhamento de Cultura", href: "/solucoes/alinhamento-de-cultura" },
    { text: "Workshop de Metas", href: "/solucoes/workshop-de-metas" }
  ],
  socialTitle = "Redes Sociais",
  socialLinks = [
    { platform: "Instagram", username: "@dirayconsultoria", url: "https://instagram.com/dirayconsultoria" },
    { platform: "LinkedIn", username: "DIRAYconsultoria", url: "https://linkedin.com/company/dirayconsultoria" },
    { platform: "TikTok", username: "dirayconsultoria", url: "https://tiktok.com/@dirayconsultoria" }
  ],
  copyrightText = `© ${new Date().getFullYear()} DI.RAY. Todos os direitos reservados.`
}: FooterProps) {
  return (
    <footer className="bg-dark text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image 
                src={logo} 
                alt={logoAlt} 
                width={120} 
                height={40} 
                className="h-10 w-auto" 
                data-tina-field={tinaField({  logo  } as any, "logo")}
              />
            </Link>
            <p 
              className="text-white/80 text-sm"
              data-tina-field={tinaField({  description  } as any, "description")}
            >
              {description}
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 
              className="text-lg font-bold mb-4"
              data-tina-field={tinaField({  quickLinksTitle  } as any, "quickLinksTitle")}
            >
              {quickLinksTitle}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-white/60 hover:text-white transition-colors animated-underline"
                    data-tina-field={tinaField(link as any, "text")}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 
              className="text-lg font-bold mb-4"
              data-tina-field={tinaField({  servicesTitle  } as any, "servicesTitle")}
            >
              {servicesTitle}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors animated-underline"
                    data-tina-field={tinaField(link as any, "text")}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 
              className="text-lg font-bold mb-4"
              data-tina-field={tinaField({  socialTitle  } as any, "socialTitle")}
            >
              {socialTitle}
            </h3>
            <ul className="space-y-4">
              {socialLinks.map((social, index) => (
                <li key={index} className="flex items-start">
                  {social.platform === "Instagram" && <Instagram size={20} className="mr-2 flex-shrink-0 text-primary" />}
                  {social.platform === "LinkedIn" && <Linkedin size={20} className="mr-2 flex-shrink-0 text-primary" />}
                  {social.platform === "TikTok" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 248 600"
                      fill="currentColor"
                      className="mr-2 flex-shrink-0 text-primary"
                    >
                      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                    </svg>
                  )}
                  <div>
                    <h4 
                      className="font-bold text-white"
                      data-tina-field={tinaField(social as any, "platform")}
                    >
                      {social.platform}
                    </h4>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-white animated-underline"
                      data-tina-field={tinaField(social as any, "username")}
                    >
                      {social.username}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60 text-sm">
          <p data-tina-field={tinaField({  copyrightText  } as any, "copyrightText")}>
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  )
}