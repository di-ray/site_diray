// This file contains all text content for the website
// Organized by page and section for easy management
export interface TextContent {
  id: string
  text: string
  category?: string // Adicionar para suportar FAQs
  question?: string // Adicionar para suportar FAQs
  answer?: string // Adicionar para suportar FAQs
}

export interface SectionContent {
  id: string
  title: string
  subtitle?: string
  description?: string
  items?: TextContent[]
}

export interface PageContent {
  id: string
  title: string
  sections: SectionContent[]
}

export interface WebsiteContent {
  pages: PageContent[]
  global: {
    navigation: {
      links: { text: string; href: string }[]
    }
    footer: {
      copyright: string
      links: { text: string; href: string }[]
    }
  }
}

const websiteContent: WebsiteContent = {
  global: {
    navigation: {
      links: [
        { text: "Home", href: "/" },
        { text: "Soluções", href: "/solucoes" },
        { text: "Sobre", href: "/#sobre" },
        { text: "Contato", href: "/#contato" },
      ],
    },
    footer: {
      copyright: "© 2025 DI.RAY. Todos os direitos reservados.",
      links: [
        { text: "Termos de Serviço", href: "#" },
        { text: "Política de Privacidade", href: "/politica-de-privacidade" },
      ],
    },
  },
  pages: [
    {
      id: "home",
      title: "Home",
      sections: [
        {
          id: "hero",
          title: "Desenvolva\nEngaje\nCresça",
          subtitle: "Soluções em desenvolvimento organizacional",
          description: "que você contrata uma vez e reaplica quantas vezes quiser.",
        },
        {
          id: "engagement",
          title: "Seu time Engajado e Produtivo",
          description:
            "As outras consultorias complicam? Eu simplifico! Alinho cultura, metas, treinamento e comunicação para equipes mais produtivas e engajadas. Usando inteligência artificial e experiência na área, entrego soluções práticas e efetivas — e o melhor: capacito seu time para replicar as soluções quando quiser, sem depender de consultoria.",
        },
        {
          id: "challenges",
          title: "Sua empresa enfrenta esses desafios?",
          items: [
            {
              id: "ceos",
              text: "Time desalinhado? Metas que não se conectam com o crescimento? Cultura da empresa não impulsiona resultados? Posso ajudar a organizar esses pontos para que sua equipe seja mais eficiente e sua empresa cresça de forma estruturada.",
            },
            {
              id: "hr-leaders",
              text: "Gestão de pessoas complexa e com poucos recursos? Transformo desafios como engajamento, comunicação e desenvolvimento em soluções simples e aplicáveis, ajudando você a fortalecer sua posição e gerar ainda mais impacto na organização.",
            },
          ],
        },
        {
          id: "solutions",
          title: "Conheça as Soluções",
          subtitle: "Esqueça as propostas surpresa.",
          description: "Calcule seu orçamento aqui mesmo no site.",
          items: [
            {
              id: "solution-1",
              text: "Plano de Comunicação: Desenvolvimento de um plano de comunicação para campanhas internas e/ou iniciativas de mudança organizacional.",
            },
            {
              id: "solution-2",
              text: "Alinhamento de Cultura: Mapeamento e diagnóstico da cultura da empresa e desenho de plano de ação para aumento do alinhamento cultural.",
            },
            {
              id: "solution-3",
              text: "Workshop de Metas: Construção e aplicação de workshops para desenho e revisão de metas individuais e coletivas usando S.M.A.R.T.",
            },
            {
              id: "solution-4",
              text: "Estratégia de Treinamento: Desenho de uma estratégia de treinamento robusta para desenvolver a organização ou departamentos específicos.",
            },
            {
              id: "solution-5",
              text: "Programas de Desenvolvimento: Implementação de programas de treinamento para desenvolver competências comportamentais ou técnicas de um grupo.",
            },
          ],
        },
        {
          id: "why-diray",
          title: "Porque DI.RAY",
          items: [
            {
              id: "transparency",
              text: "Transparência: Saiba desde o primeiro dia exatamente o que será feito, quanto custará e quais as métricas de sucesso.",
            },
            {
              id: "economy",
              text: "Economia: Um só prestador, do briefing à entrega. Sem cobranças extras e altos custos fixos.",
            },
            {
              id: "excellence",
              text: "Excelência: Número limitado de clientes aliado a mais de 20 anos de experiência em multinacionais",
            },
            {
              id: "autonomy",
              text: "Autonomia: Seu time treinado nas metodologias e em IA para replicar as soluções o quanto quiser",
            },
          ],
        },
        {
          id: "about",
          title: "Sobre DI.RAY",
          description:
            "Após 20 anos de carreira em multinacionais líderes como Meta, Nubank, McDonald's e Danone, percebi que muitos fornecedores de consultoria complicam o que poderia ser simples. Com as perguntas e ferramentas certas, é possível simplificar soluções e dar às empresas o controle dos processos de desenvolvimento, performance e cultura. A DI.RAY nasce para trazer soluções de desenvolvimento e engajamento com total transparência e transferindo o conhecimento para o cliente, trazendo autonomia para replicar iniciativas e economizar tempo e recursos. Não é só sobre entregar serviços de alta qualidade — é sobre mudar as regras do jogo e redefinir a forma como as consultorias funcionam no Brasil, permitindo a mais empresas se tornarem ágeis, eficientes e prontas para o futuro.",
        },
        {
          id: "faq",
          title: "Perguntas Frequentes",
          subtitle: "Tire suas dúvidas sobre nossos serviços e metodologia de trabalho.",
          items: [
            {
              id: "faq-1",
              text: "Como funciona o processo de consultoria? Nosso processo começa com um diagnóstico detalhado da sua organização, seguido pelo desenvolvimento de um plano de ação personalizado. Implementamos as soluções em parceria com sua equipe e monitoramos os resultados continuamente.",
            },
            {
              id: "faq-2",
              text: "Quanto tempo dura um projeto típico? A duração varia conforme a complexidade e escopo do projeto. Projetos de consultoria estratégica geralmente duram de 3 a 6 meses, enquanto programas de desenvolvimento de liderança podem se estender por 6 a 12 meses.",
            },
            {
              id: "faq-3",
              text: "Vocês atendem empresas de pequeno porte? Sim, temos soluções adaptadas para empresas de todos os portes. Nossos programas são escaláveis e personalizados para atender às necessidades específicas de cada organização, independentemente do seu tamanho.",
            },
            {
              id: "faq-4",
              text: "Como é medido o retorno sobre o investimento? Estabelecemos métricas claras no início do projeto, alinhadas aos objetivos da sua empresa. Monitoramos indicadores como produtividade, engajamento, retenção de talentos e resultados financeiros para quantificar o impacto das nossas intervenções.",
            },
            {
              id: "faq-5",
              text: "Vocês oferecem treinamentos in-company? Sim, desenvolvemos e facilitamos treinamentos personalizados nas instalações do cliente. Nossos programas são práticos e focados na aplicação imediata dos conceitos no contexto específico da sua organização.",
            },
          ],
        },
        {
          id: "contact",
          title: "Entre em contato",
          description:
            "Estamos prontos para ajudar sua empresa a alcançar o próximo nível. Preencha o formulário e um de nossos consultores entrará em contato.",
        },
      ],
    },
    {
      id: "solucoes",
      title: "Soluções",
      sections: [
        {
          id: "hero",
          title: "Nossas Soluções",
          subtitle: "Consultoria especializada para transformar pessoas e impulsionar resultados",
        },
        {
          id: "approach",
          title: "Nossa Abordagem",
          subtitle: "Combinamos conhecimento técnico com sensibilidade humana para criar soluções personalizadas",
          items: [
            {
              id: "approach-1",
              text: "Diagnóstico: Análise detalhada da situação atual, identificando desafios e oportunidades específicas da sua organização.",
            },
            {
              id: "approach-2",
              text: "Planejamento: Desenvolvimento de estratégias e planos de ação personalizados, alinhados aos objetivos do seu negócio.",
            },
            {
              id: "approach-3",
              text: "Implementação: Execução das ações planejadas com acompanhamento contínuo e ajustes quando necessário.",
            },
          ],
        },
        {
          id: "cta",
          title: "Pronto para transformar sua organização?",
          description:
            "Entre em contato para conversarmos sobre como nossas soluções podem ajudar sua empresa a alcançar o próximo nível.",
        },
      ],
    },
    {
      id: "plano-de-comunicacao",
      title: "Plano de Comunicação",
      sections: [
        {
          id: "hero",
          title: "Plano de Comunicação",
          subtitle: "Estratégias eficazes para engajar equipes e transmitir mensagens com clareza",
        },
        {
          id: "intro",
          title: "Comunicação clara, resultados extraordinários",
          items: [
            {
              id: "what-is",
              text: "O que é: Desenvolvimento de um plano de comunicação (mensagens-chave, canais e lista de peças) para campanhas internas e/ou iniciativas de mudança.",
            },
            {
              id: "when-hire",
              text: "Quando contratar: Quando você precisa passar um conjunto de mensagens para a organização para gerar uma ação/resultado específicos ou durante grandes iniciativas e projetos que envolvam mudança organizacional.",
            },
          ],
        },
        {
          id: "deliverables",
          title: "O que você recebe?",
          items: [
            {
              id: "deliverable-1",
              text: "Plano de Comunicação: Plano completo contendo os objetivos, públicos-alvo, papéis e responsabilidades, mensagens principais, canais de comunicação, peças de comunicação, ferramentas de medição, conteúdos e calendário.",
            },
            {
              id: "deliverable-2",
              text: "Relatório de avaliação: Reporte para medição dos resultados do plano, com as seguintes métricas: Ciência da informação (Awareness), Entendimento, Reação, Execução das ações (CTA).",
            },
            {
              id: "deliverable-3",
              text: "Sessão de Transferência de Expertise (ETM©): Momento no qual eu repasso para o cliente todo o conhecimento sobre como o plano foi construído, para que este possa replicar o processo quantas vezes quiser.",
            },
          ],
        },
      ],
    },
    {
      id: "alinhamento-de-cultura",
      title: "Alinhamento de Cultura",
      sections: [
        {
          id: "hero",
          title: "Alinhamento de Cultura",
          subtitle: "Fortaleça a cultura organizacional e alinhe valores com práticas",
        },
        {
          id: "intro",
          title: "Cultura forte, resultados consistentes",
          items: [
            {
              id: "what-is",
              text: "O que é: Mapeamento e diagnóstico da cultura da empresa (escrito vs. praticado) e desenho de plano de ação para aumento do alinhamento cultural.",
            },
            {
              id: "when-hire",
              text: "Quando contratar: Quando você precisa alinhar a cultura desejada com as práticas do dia a dia da organização para promover um forte senso de pertencimento e engajamento dos funcionários.",
            },
          ],
        },
        {
          id: "deliverables",
          title: "O que você recebe?",
          items: [
            {
              id: "deliverable-1",
              text: "Diagnóstico da cultura: Documento que mostra os elementos culturais da organização (valores, heróis, história, etc) e como essa cultura está sendo vivida (ou não) na prática na organização.",
            },
            {
              id: "deliverable-2",
              text: "Plano de alinhamento cultural: Plano de ação em vários eixos com medidas para realinhar os comportamentos do dia a dia e com a cultura desejada pela organização.",
            },
            {
              id: "deliverable-3",
              text: "Sessão de Transferência de Expertise (ETM©): Momento no qual eu repasso para o cliente todo o conhecimento sobre como o plano foi construído, para que este possa replicar o processo quantas vezes quiser.",
            },
          ],
        },
      ],
    },
    {
      id: "workshop-de-metas",
      title: "Workshop de Metas",
      sections: [
        {
          id: "hero",
          title: "Workshop de Metas",
          subtitle: "Construção e aplicação de workshops para desenho e revisão de metas",
        },
        {
          id: "intro",
          title: "Metas claras, resultados extraordinários",
          items: [
            {
              id: "what-is",
              text: "O que é: Construção e aplicação de workshop para desenho e revisão de metas individuais e coletivas claras e viáveis usando metodologia S.M.A.R.T.",
            },
            {
              id: "when-hire",
              text: "Quando contratar: Quando você precisa definir ou alinhar metas individuais ou de equipes para se conectarem com os objetivos da organização.",
            },
          ],
        },
        {
          id: "deliverables",
          title: "O que você recebe?",
          items: [
            {
              id: "deliverable-1",
              text: "Workshop de definição de metas: Estrutura de um workshop abordando a metodologia S.M.A.R.T., os objetivos da organização e a construção das metas individuais e coletivas.",
            },
            {
              id: "deliverable-2",
              text: "Condução do workshop: Facilitação do workshop, com construção e revisão das metas individuais e do time.",
            },
            {
              id: "deliverable-3",
              text: "Sessão de Transferência de Expertise (ETM©): Momento no qual eu repasso para o cliente todo o conhecimento sobre como o workshop foi construído e conduzido, para que este possa replicar o processo quantas vezes quiser.",
            },
          ],
        },
      ],
    },
    {
      id: "estrategia-de-treinamento",
      title: "Estratégia de Treinamento",
      sections: [
        {
          id: "hero",
          title: "Estratégia de Treinamento",
          subtitle: "Transforme sua equipe em um motor de crescimento",
        },
        {
          id: "intro",
          title: "O caminho mais rápido para o crescimento do seu negócio",
          items: [
            {
              id: "what-is",
              text: "O que é: Desenho de estratégia de treinamento (eixos de aprendizagem, lista de programas, formatos e indicadores de resultado) para organizações.",
            },
            {
              id: "when-hire",
              text: "Quando contratar: Quando você precisa criar um plano de treinamento para sua organização ou departamento.",
            },
          ],
        },
        {
          id: "deliverables",
          title: "O que você recebe?",
          items: [
            {
              id: "deliverable-1",
              text: "Documento de Estratégia de T&D: Plano completo contendo: Objetivos da estratégia, Eixos de aprendizagem, Programas, Estratégia de implementação.",
            },
            {
              id: "deliverable-2",
              text: "Sessão de Transferência de Expertise (ETM©): Momento no qual eu repasso para o cliente todo o conhecimento sobre como o plano foi construído, para que este possa replicar o processo quantas vezes quiser. Esta transferência de conhecimento permite que sua equipe interna se torne autônoma na atualização e adaptação da estratégia de treinamento conforme as necessidades da organização evoluem.",
            },
          ],
        },
      ],
    },
    {
      id: "programa-de-desenvolvimento",
      title: "Programa de Desenvolvimento",
      sections: [
        {
          id: "hero",
          title: "Programa de Desenvolvimento",
          subtitle: "Treinamentos estratégicos para equipes de alta performance",
        },
        {
          id: "intro",
          title: "Aprimore as Competências do seu Time!",
          description:
            "O Programa de Desenvolvimento da Di.Ray é ideal para empresas que precisam desenvolver competências específicas dentro de uma população. A consultoria é voltada para empresas que precisam de mais de um treinamento para fortalecer habilidades em um grupo de pessoas de maneira estruturada. Os treinamentos não apenas fortalecem a cultura organizacional, mas também atraem talentos, aumentam a produtividade e impulsionam a competitividade no mercado. Em um cenário de mudanças aceleradas, como o trabalho híbrido e a transformação digital, o desenvolvimento contínuo das equipes é essencial para garantir a adaptação e o sucesso sustentável das organizações.",
        },
        {
          id: "deliverables",
          title: "O que você recebe?",
          items: [
            {
              id: "deliverable-1",
              text: "Desenho do programa: Documento com os objetivos do programa, Definição das abordagens, eixos de aprendizagem e conteúdos, Definição das sessões do treinamento (síncronas e assíncronas).",
            },
            {
              id: "deliverable-2",
              text: "Entregáveis por sessão: Plano de sessão estruturado, Materiais para execução (apresentações, suporte para treinamentos e formatos para e-learning), Facilitação online ou presencial.",
            },
            {
              id: "deliverable-3",
              text: "Relatório de avaliação: Métricas de aquisição de conhecimento, Avaliação de aprendizagem, Coleta de satisfação, Métricas personalizadas, conforme necessidade.",
            },
            {
              id: "deliverable-4",
              text: "Sessão de Transferência de Expertise (ETM©): Capacitação para replicar os treinamentos de forma independente, Transferência de conhecimento sobre as ferramentas aplicadas, incluindo IA.",
            },
          ],
        },
      ],
    },
    {
      id: "politica-de-privacidade",
      title: "Política de Privacidade",
      sections: [
        {
          id: "intro",
          title: "Política de Privacidade",
          subtitle: "Última atualização: 31 de março de 2025",
          description:
            "A DI.RAY Consultoria em Desenvolvimento Organizacional ('nós', 'nosso' ou 'DI.RAY') está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais quando você visita nosso site ou utiliza nossos serviços. Ao utilizar nosso site ou serviços, você concorda com a coleta e uso de informações de acordo com esta política.",
        },
        {
          id: "collected-info",
          title: "Informações que Coletamos",
          description:
            "Podemos coletar os seguintes tipos de informações: Informações de identificação pessoal: nome, endereço de e-mail, número de telefone, empresa e cargo. Informações de uso: como você interage com nosso site, incluindo páginas visitadas, tempo gasto no site e links clicados. Informações do dispositivo: tipo de dispositivo, sistema operacional, tipo de navegador e configurações de idioma. Cookies e tecnologias similares: utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site.",
        },
      ],
    },
  ],
}

export default websiteContent
