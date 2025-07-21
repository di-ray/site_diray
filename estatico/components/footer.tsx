import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image src="/images/diray-logo-white.png" alt="DI.RAY" width={120} height={40} className="h-10 w-auto" />
            </Link>
            <p className="text-white/80 text-sm">
              Consultoria especializada em desenvolvimento organizacional e empresarial, ajudando empresas a alcançarem
              seu potencial máximo.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4">Link Rápido</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#sobre" className="text-white/60 hover:text-white transition-colors animated-underline">
                  Sobre DI.RAY
                </Link>
              </li>
              <li>
                <Link href="/solucoes" className="text-white/60 hover:text-white transition-colors animated-underline">
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/por-que-diray"
                  className="text-white/60 hover:text-white transition-colors animated-underline"
                >
                  Por que DI.RAY
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-white/60 hover:text-white transition-colors animated-underline">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-lg font-bold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/solucoes/estrategia-de-treinamento"
                  className="text-white/60 hover:text-white transition-colors animated-underline"
                >
                  Estratégia de Treinamento
                </Link>
              </li>
              <li>
                <Link
                  href="/solucoes/formacao-de-ia"
                  className="text-white/60 hover:text-white transition-colors animated-underline"
                >
                  Formação customizada em IA
                </Link>
              </li>
              <li>
                <Link
                  href="/solucoes/plano-de-comunicacao"
                  className="text-white/60 hover:text-white transition-colors animated-underline"
                >
                  Plano de Comunicação
                </Link>
              </li>
              <li>
                <Link
                  href="/solucoes/alinhamento-de-cultura"
                  className="text-white/60 hover:text-white transition-colors animated-underline"
                >
                  Alinhamento de Cultura
                </Link>
              </li>
              <li>
                <Link
                  href="/solucoes/workshop-de-metas"
                  className="text-white/60 hover:text-white transition-colors animated-underline"
                >
                  Workshop de Metas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold mb-4">Redes Sociais</h3>
            <ul className="space-y-4">
              {/* Instagram */}
              <li className="flex items-start">
                <Instagram size={20} className="mr-2 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-bold text-white">Instagram</h4>
                  <a
                    href="https://instagram.com/dirayconsultoria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white animated-underline"
                  >
                    @dirayconsultoria
                  </a>
                </div>
              </li>
              {/* LinkedIn */}
              <li className="flex items-start">
                <Linkedin size={20} className="mr-2 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-bold text-white">LinkedIn</h4>
                  <a
                    href="https://linkedin.com/company/dirayconsultoria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white animated-underline"
                  >
                    DIRAYconsultoria
                  </a>
                </div>
              </li>
              {/* TikTok */}
              <li className="flex items-start gap-2">
                {/* Using a custom SVG for TikTok since Lucide doesn't have a TikTok icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 248 600"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
                </svg>
                <div>
                  <h4 className="font-bold text-white">TikTok</h4>
                  <a
                    href="https://tiktok.com/@dirayconsultoria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white animated-underline"
                  >
                    dirayconsultoria
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} DI.RAY. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
