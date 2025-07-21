import Link from "next/link"

export default function PoliticaPrivacidade() {
  return (
    <div className="bg-dark min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-dark/50 p-8 rounded-lg border border-primary/20">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Política de Privacidade</h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 mb-6">Última atualização: 31 de março de 2025</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">1. Introdução</h2>
            <p className="text-white/80 mb-4">
              A DI.RAY Consultoria em Desenvolvimento Organizacional ("nós", "nosso" ou "DI.RAY") está comprometida em
              proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e
              protegemos suas informações pessoais quando você visita nosso site ou utiliza nossos serviços.
            </p>
            <p className="text-white/80 mb-4">
              Ao utilizar nosso site ou serviços, você concorda com a coleta e uso de informações de acordo com esta
              política.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">2. Informações que Coletamos</h2>
            <p className="text-white/80 mb-4">Podemos coletar os seguintes tipos de informações:</p>
            <ul className="list-disc pl-6 mb-4 text-white/80">
              <li className="mb-2">
                <strong>Informações de identificação pessoal</strong>: nome, endereço de e-mail, número de telefone,
                empresa e cargo.
              </li>
              <li className="mb-2">
                <strong>Informações de uso</strong>: como você interage com nosso site, incluindo páginas visitadas,
                tempo gasto no site e links clicados.
              </li>
              <li className="mb-2">
                <strong>Informações do dispositivo</strong>: tipo de dispositivo, sistema operacional, tipo de navegador
                e configurações de idioma.
              </li>
              <li className="mb-2">
                <strong>Cookies e tecnologias similares</strong>: utilizamos cookies e tecnologias similares para
                melhorar sua experiência em nosso site.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">3. Como Usamos Suas Informações</h2>
            <p className="text-white/80 mb-4">Utilizamos suas informações para:</p>
            <ul className="list-disc pl-6 mb-4 text-white/80">
              <li className="mb-2">Fornecer, manter e melhorar nossos serviços;</li>
              <li className="mb-2">Processar solicitações de orçamento e contato;</li>
              <li className="mb-2">Enviar informações sobre nossos serviços, atualizações e materiais promocionais;</li>
              <li className="mb-2">Analisar tendências de uso e melhorar a experiência do usuário;</li>
              <li className="mb-2">Detectar, prevenir e resolver problemas técnicos e de segurança.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">4. Compartilhamento de Informações</h2>
            <p className="text-white/80 mb-4">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas seguintes
              circunstâncias:
            </p>
            <ul className="list-disc pl-6 mb-4 text-white/80">
              <li className="mb-2">Com seu consentimento;</li>
              <li className="mb-2">
                Com prestadores de serviços que nos auxiliam na operação do site e na prestação de serviços;
              </li>
              <li className="mb-2">Para cumprir obrigações legais;</li>
              <li className="mb-2">Para proteger nossos direitos, privacidade, segurança ou propriedade.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">5. Cookies e Tecnologias Similares</h2>
            <p className="text-white/80 mb-4">
              Utilizamos cookies e tecnologias similares para coletar informações sobre como você interage com nosso
              site. Você pode configurar seu navegador para recusar todos os cookies ou para indicar quando um cookie
              está sendo enviado. No entanto, algumas funcionalidades do site podem não funcionar corretamente sem
              cookies.
            </p>
            <p className="text-white/80 mb-4">Utilizamos os seguintes tipos de cookies:</p>
            <ul className="list-disc pl-6 mb-4 text-white/80">
              <li className="mb-2">
                <strong>Cookies essenciais</strong>: necessários para o funcionamento básico do site;
              </li>
              <li className="mb-2">
                <strong>Cookies de preferências</strong>: permitem que o site lembre suas preferências;
              </li>
              <li className="mb-2">
                <strong>Cookies estatísticos</strong>: ajudam a entender como os visitantes interagem com o site;
              </li>
              <li className="mb-2">
                <strong>Cookies de marketing</strong>: utilizados para rastrear visitantes em websites e exibir anúncios
                relevantes.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">6. Seus Direitos</h2>
            <p className="text-white/80 mb-4">
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
            </p>
            <ul className="list-disc pl-6 mb-4 text-white/80">
              <li className="mb-2">Direito de acesso às suas informações pessoais;</li>
              <li className="mb-2">Direito de correção de dados incompletos, inexatos ou desatualizados;</li>
              <li className="mb-2">Direito de eliminação dos dados tratados com seu consentimento;</li>
              <li className="mb-2">Direito de portabilidade dos dados;</li>
              <li className="mb-2">Direito de informação sobre o compartilhamento de dados;</li>
              <li className="mb-2">Direito de revogação do consentimento.</li>
            </ul>
            <p className="text-white/80 mb-4">
              Para exercer esses direitos, entre em contato conosco através do e-mail:{" "}
              <a href="mailto:privacidade@diray.co" className="text-primary hover:underline">
                privacidade@diray.co
              </a>
              .
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">7. Segurança de Dados</h2>
            <p className="text-white/80 mb-4">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais
              contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de
              transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">8. Retenção de Dados</h2>
            <p className="text-white/80 mb-4">
              Mantemos suas informações pessoais pelo tempo necessário para cumprir as finalidades descritas nesta
              Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">9. Alterações nesta Política</h2>
            <p className="text-white/80 mb-4">
              Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos sobre quaisquer alterações
              publicando a nova Política de Privacidade nesta página e atualizando a data de "última atualização" no
              topo.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">10. Contato</h2>
            <p className="text-white/80 mb-4">
              Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco:
            </p>
            <p className="text-white/80 mb-4">DI.RAY Consultoria em</p>
            <p className="text-white/80 mb-4">
              DI.RAY Consultoria em Desenvolvimento Organizacional
              <br />
              Email:{" "}
              <a href="mailto:contato@diray.co" className="text-primary hover:underline">
                contato@diray.co
              </a>
              <br />
              Telefone: +55 (11) 9999-9999
              <br />
              São Paulo - SP
            </p>

            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-all duration-300"
              >
                Voltar para a página inicial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
