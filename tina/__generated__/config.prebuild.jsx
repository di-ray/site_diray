// tina/config.tsx
import { defineConfig } from "tinacms";

// tina/collections/page.ts
var PageCollection = {
  name: "page",
  label: "\u{1F4C4} P\xE1ginas",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      return `/${document._sys.filename}`;
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      isTitle: true,
      required: true
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Blocos de Conte\xFAdo",
      ui: {
        visualSelector: true
      },
      templates: [
        {
          name: "hero",
          label: "\u{1F3AF} Hero Principal",
          fields: [
            { name: "heading", label: "\u{1F4DD} T\xEDtulo Principal", type: "string" },
            { name: "subheading", label: "\u{1F4C4} Subt\xEDtulo", type: "string" },
            { name: "description", label: "\u{1F4DD} Descri\xE7\xE3o", type: "string" },
            { name: "buttonText", label: "\u{1F518} Texto do Bot\xE3o", type: "string" },
            { name: "buttonLink", label: "\u{1F517} Link do Bot\xE3o", type: "string" }
          ]
        },
        {
          name: "engagement",
          label: "\u{1F4AA} Se\xE7\xE3o de Engajamento",
          fields: [
            { name: "heading", label: "\u{1F4DD} T\xEDtulo", type: "string" },
            { name: "text", label: "\u{1F4C4} Texto", type: "rich-text" }
          ]
        },
        {
          name: "challenges",
          label: "\u{1F3AF} Desafios e Solu\xE7\xF5es",
          fields: [
            { name: "heading", label: "\u{1F4DD} T\xEDtulo da Se\xE7\xE3o", type: "string" },
            {
              name: "cards",
              label: "\u{1F0CF} Cards",
              type: "object",
              list: true,
              fields: [
                { name: "groupTitle", label: "\u{1F465} T\xEDtulo do Grupo (Ex: CEOs)", type: "string" },
                { name: "content", label: "\u{1F4C4} Conte\xFAdo do Card", type: "rich-text" },
                { name: "resultText", label: "\u2705 Texto de Resultado", type: "string" }
              ]
            }
          ]
        },
        {
          name: "moreSolutions",
          label: "\u{1F680} Mais Solu\xE7\xF5es",
          fields: [
            { name: "heading", label: "\u{1F4DD} T\xEDtulo", type: "string" },
            { name: "subtitle", label: "\u{1F4C4} Subt\xEDtulo", type: "string" },
            {
              name: "solutions",
              label: "\u{1F6E0}\uFE0F Lista de Solu\xE7\xF5es",
              type: "object",
              list: true,
              fields: [
                { name: "slug", label: "\u{1F517} Slug", type: "string" },
                { name: "icon", label: "\u{1F3A8} \xCDcone", type: "string" },
                { name: "title", label: "\u{1F4DD} T\xEDtulo", type: "string" },
                { name: "description", label: "\u{1F4C4} Descri\xE7\xE3o", type: "string" }
              ]
            }
          ]
        },
        {
          name: "moreSolutionsHome",
          label: "\u{1F3E0} Mais Solu\xE7\xF5es (Home)",
          fields: [
            { name: "heading", label: "\u{1F4DD} T\xEDtulo", type: "string" },
            { name: "subtitle", label: "\u{1F4C4} Subt\xEDtulo", type: "string" },
            {
              name: "solutions",
              label: "\u{1F6E0}\uFE0F Lista de Solu\xE7\xF5es",
              type: "object",
              list: true,
              fields: [
                { name: "slug", label: "\u{1F517} Slug", type: "string" },
                { name: "icon", label: "\u{1F3A8} \xCDcone", type: "string" },
                { name: "title", label: "\u{1F4DD} T\xEDtulo", type: "string" },
                { name: "description", label: "\u{1F4C4} Descri\xE7\xE3o", type: "string" }
              ]
            }
          ]
        },
        {
          name: "whyDiray",
          label: "\u2B50 Por que DI.RAY",
          fields: [
            { name: "heading", label: "\u{1F4DD} T\xEDtulo", type: "string" },
            { name: "subheading", label: "\u{1F4C4} Subt\xEDtulo", type: "string" },
            {
              name: "features",
              label: "\u2728 Diferenciais",
              type: "object",
              list: true,
              fields: [
                { name: "icon", label: "\u{1F3A8} \xCDcone", type: "string" },
                { name: "title", label: "\u{1F4DD} T\xEDtulo", type: "string" },
                { name: "description", label: "\u{1F4C4} Descri\xE7\xE3o", type: "string" }
              ]
            }
          ]
        },
        {
          name: "about",
          label: "\u{1F464} Se\xE7\xE3o Sobre",
          fields: [
            { name: "heading", label: "\u{1F4DD} T\xEDtulo", type: "string" },
            { name: "founderName", label: "\u{1F464} Nome do Fundador", type: "string" },
            { name: "founderTitle", label: "\u{1F4BC} Cargo do Fundador", type: "string" },
            { name: "biography", label: "\u{1F4D6} Biografia", type: "rich-text" },
            { name: "founderImage", label: "\u{1F5BC}\uFE0F Imagem do Fundador", type: "image" },
            { name: "clientLogosImage", label: "\u{1F3E2} Logos de Clientes", type: "image" }
          ]
        },
        {
          name: "faq",
          label: "\u2753 FAQ",
          fields: [
            { name: "heading", label: "\u{1F4DD} T\xEDtulo", type: "string" },
            { name: "subheading", label: "\u{1F4C4} Subt\xEDtulo", type: "string" },
            {
              name: "questions",
              label: "\u2753 Perguntas",
              type: "object",
              list: true,
              fields: [
                { name: "category", label: "\u{1F4C1} Categoria", type: "string" },
                { name: "question", label: "\u2753 Pergunta", type: "string" },
                { name: "answer", label: "\u{1F4AC} Resposta", type: "rich-text" }
              ]
            }
          ]
        },
        {
          name: "logoCarousel",
          label: "\u{1F3E2} Carrossel de Logos",
          fields: [
            { name: "title", label: "\u{1F4DD} T\xEDtulo", type: "string" },
            { name: "description", label: "\u{1F4C4} Descri\xE7\xE3o", type: "string" },
            { name: "logoImage", label: "\u{1F5BC}\uFE0F Imagem dos Logos", type: "image" },
            { name: "showAnimation", label: "\u{1F3AC} Mostrar Anima\xE7\xE3o", type: "boolean" }
          ]
        },
        {
          name: "contact",
          label: "\u{1F4DE} Se\xE7\xE3o de Contato",
          fields: [
            { name: "heading", label: "\u{1F4DD} T\xEDtulo", type: "string" },
            { name: "subheading", label: "\u{1F4C4} Subt\xEDtulo", type: "string" },
            { name: "whatsapp", label: "\u{1F4F1} WhatsApp", type: "string" },
            { name: "email", label: "\u{1F4E7} E-mail", type: "string" }
          ]
        },
        {
          name: "footer",
          label: "\u{1F9B6} Rodap\xE9",
          fields: [
            { name: "logo", label: "\u{1F5BC}\uFE0F Logo", type: "image" },
            { name: "logoAlt", label: "\u{1F4DD} Texto Alternativo do Logo", type: "string" },
            { name: "description", label: "\u{1F4C4} Descri\xE7\xE3o", type: "string" },
            { name: "quickLinksTitle", label: "\u{1F4DD} T\xEDtulo Links R\xE1pidos", type: "string" },
            {
              name: "quickLinks",
              label: "\u{1F517} Links R\xE1pidos",
              type: "object",
              list: true,
              fields: [
                { name: "text", label: "\u{1F4DD} Texto", type: "string" },
                { name: "href", label: "\u{1F517} Link", type: "string" }
              ]
            },
            { name: "servicesTitle", label: "\u{1F4DD} T\xEDtulo Servi\xE7os", type: "string" },
            {
              name: "serviceLinks",
              label: "\u{1F6E0}\uFE0F Links de Servi\xE7os",
              type: "object",
              list: true,
              fields: [
                { name: "text", label: "\u{1F4DD} Texto", type: "string" },
                { name: "href", label: "\u{1F517} Link", type: "string" }
              ]
            },
            { name: "socialTitle", label: "\u{1F4DD} T\xEDtulo Redes Sociais", type: "string" },
            {
              name: "socialLinks",
              label: "\u{1F4F1} Redes Sociais",
              type: "object",
              list: true,
              fields: [
                { name: "platform", label: "\u{1F4F1} Plataforma", type: "string" },
                { name: "username", label: "\u{1F464} Usu\xE1rio", type: "string" },
                { name: "url", label: "\u{1F517} URL", type: "string" }
              ]
            },
            { name: "copyrightText", label: "\xA9\uFE0F Texto de Copyright", type: "string" }
          ]
        }
      ]
    }
  ]
};

// tina/collections/settings.ts
var SettingsCollection = {
  name: "settings",
  label: "\u2699\uFE0F Configura\xE7\xF5es do Site",
  path: "content/settings",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false
    },
    global: true
  },
  fields: [
    {
      type: "object",
      name: "siteInfo",
      label: "\u{1F310} Informa\xE7\xF5es do Site",
      fields: [
        {
          type: "string",
          name: "title",
          label: "\u{1F4DD} T\xEDtulo do Site",
          required: true
        },
        {
          type: "string",
          name: "description",
          label: "\u{1F4C4} Descri\xE7\xE3o",
          ui: {
            component: "textarea"
          }
        },
        {
          type: "string",
          name: "keywords",
          label: "\u{1F3F7}\uFE0F Palavras-chave",
          description: "Separadas por v\xEDrgula"
        }
      ]
    },
    {
      type: "object",
      name: "contact",
      label: "\u{1F4DE} Informa\xE7\xF5es de Contato",
      fields: [
        {
          type: "string",
          name: "email",
          label: "\u{1F4E7} E-mail"
        },
        {
          type: "string",
          name: "phone",
          label: "\u{1F4F1} Telefone"
        },
        {
          type: "string",
          name: "address",
          label: "\u{1F3E2} Endere\xE7o",
          ui: {
            component: "textarea"
          }
        }
      ]
    },
    {
      type: "object",
      name: "social",
      label: "\u{1F4F1} Redes Sociais",
      fields: [
        {
          type: "string",
          name: "facebook",
          label: "Facebook"
        },
        {
          type: "string",
          name: "instagram",
          label: "Instagram"
        },
        {
          type: "string",
          name: "linkedin",
          label: "LinkedIn"
        },
        {
          type: "string",
          name: "twitter",
          label: "Twitter"
        }
      ]
    },
    {
      type: "object",
      name: "navigation",
      label: "\u{1F9ED} Navega\xE7\xE3o (Header)",
      fields: [
        {
          type: "image",
          name: "logo",
          label: "\u{1F5BC}\uFE0F Logo"
        },
        {
          type: "object",
          name: "menuItems",
          label: "\u{1F4CB} Itens do Menu",
          list: true,
          fields: [
            {
              type: "string",
              name: "label",
              label: "\u{1F4DD} Texto",
              required: true
            },
            {
              type: "string",
              name: "href",
              label: "\u{1F517} Link",
              required: true
            },
            {
              type: "boolean",
              name: "hasSubmenu",
              label: "\u{1F4C2} Tem submenu?"
            },
            {
              type: "object",
              name: "submenuItems",
              label: "\u{1F4CB} Itens do Submenu",
              list: true,
              fields: [
                {
                  type: "string",
                  name: "label",
                  label: "\u{1F4DD} Texto"
                },
                {
                  type: "string",
                  name: "href",
                  label: "\u{1F517} Link"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "object",
      name: "footer",
      label: "\u{1F9B6} Rodap\xE9",
      fields: [
        {
          type: "image",
          name: "logo",
          label: "\u{1F5BC}\uFE0F Logo"
        },
        {
          type: "string",
          name: "logoAlt",
          label: "\u{1F4DD} Texto Alternativo do Logo"
        },
        {
          type: "string",
          name: "description",
          label: "\u{1F4C4} Descri\xE7\xE3o"
        },
        {
          type: "string",
          name: "quickLinksTitle",
          label: "\u{1F4DD} T\xEDtulo Links R\xE1pidos"
        },
        {
          type: "object",
          name: "quickLinks",
          label: "\u{1F517} Links R\xE1pidos",
          list: true,
          fields: [
            {
              type: "string",
              name: "text",
              label: "\u{1F4DD} Texto"
            },
            {
              type: "string",
              name: "href",
              label: "\u{1F517} Link"
            }
          ]
        },
        {
          type: "string",
          name: "servicesTitle",
          label: "\u{1F4DD} T\xEDtulo Servi\xE7os"
        },
        {
          type: "object",
          name: "serviceLinks",
          label: "\u{1F6E0}\uFE0F Links de Servi\xE7os",
          list: true,
          fields: [
            {
              type: "string",
              name: "text",
              label: "\u{1F4DD} Texto"
            },
            {
              type: "string",
              name: "href",
              label: "\u{1F517} Link"
            }
          ]
        },
        {
          type: "string",
          name: "socialTitle",
          label: "\u{1F4DD} T\xEDtulo Redes Sociais"
        },
        {
          type: "object",
          name: "socialLinks",
          label: "\u{1F4F1} Redes Sociais",
          list: true,
          fields: [
            {
              type: "string",
              name: "platform",
              label: "\u{1F4F1} Plataforma"
            },
            {
              type: "string",
              name: "username",
              label: "\u{1F464} Usu\xE1rio"
            },
            {
              type: "string",
              name: "url",
              label: "\u{1F517} URL"
            }
          ]
        },
        {
          type: "string",
          name: "copyrightText",
          label: "\xA9\uFE0F Texto de Copyright"
        }
      ]
    },
    {
      type: "object",
      name: "theme",
      label: "\u{1F3A8} Tema e Apar\xEAncia",
      fields: [
        {
          type: "string",
          name: "primaryColor",
          label: "\u{1F3A8} Cor Prim\xE1ria",
          ui: {
            component: "color"
          }
        },
        {
          type: "string",
          name: "secondaryColor",
          label: "\u{1F3A8} Cor Secund\xE1ria",
          ui: {
            component: "color"
          }
        },
        {
          type: "boolean",
          name: "darkMode",
          label: "\u{1F319} Modo Escuro"
        }
      ]
    }
  ]
};

// tina/collections/faq.ts
var FAQCollection = {
  name: "faq",
  label: "\u2753 Perguntas Frequentes",
  path: "content/faqs",
  format: "md",
  fields: [
    {
      type: "string",
      name: "question",
      label: "Pergunta",
      isTitle: true,
      required: true
    },
    {
      type: "rich-text",
      name: "answer",
      label: "Resposta",
      required: true
    }
  ]
};

// tina/collections/solution.ts
var SolutionCollection = {
  name: "solution",
  label: "\u{1F680} Solu\xE7\xF5es",
  path: "content/solutions",
  format: "mdx",
  ui: {
    router: ({ document }) => `/solucoes/${document._sys.filename}`
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "icon",
      label: "\xCDcone (Lucide)",
      description: "Nome do \xEDcone da biblioteca lucide-react. Ex: 'BriefcaseBusiness'"
    },
    {
      type: "string",
      name: "excerpt",
      label: "Resumo",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Blocos de Conte\xFAdo",
      ui: {
        visualSelector: true
      },
      templates: [
        {
          name: "solutionHero",
          label: "Hero da Solu\xE7\xE3o",
          fields: [
            { name: "heroTitle", label: "T\xEDtulo", type: "string", required: true },
            { name: "heroHighlight", label: "Destaque", type: "string" },
            { name: "heroSubtitle", label: "Subt\xEDtulo", type: "string" },
            { name: "backgroundImage", label: "Imagem de Fundo", type: "image" },
            { name: "videoSrc", label: "URL do V\xEDdeo", type: "string", description: "Caminho para o arquivo de v\xEDdeo (ex: /videos/hero.mp4)" },
            { name: "videoStartTime", label: "Tempo Inicial do V\xEDdeo (segundos)", type: "number", description: "Quando o v\xEDdeo deve come\xE7ar" },
            { name: "videoEndTime", label: "Tempo Final do V\xEDdeo (segundos)", type: "number", description: "Quando o v\xEDdeo deve reiniciar" },
            { name: "overlayOpacity", label: "Opacidade do Overlay", type: "number", description: "Opacidade do overlay escuro (0-1)" }
          ]
        },
        {
          name: "solutionIntro",
          label: "Introdu\xE7\xE3o da Solu\xE7\xE3o",
          fields: [
            { name: "introTitle", label: "T\xEDtulo", type: "string", required: true },
            { name: "introDescription", label: "Descri\xE7\xE3o (par\xE1grafos)", type: "string", list: true },
            { name: "minPrice", label: "Pre\xE7o m\xEDnimo", type: "string" },
            { name: "minDuration", label: "Dura\xE7\xE3o m\xEDnima", type: "string" }
          ]
        },
        {
          name: "whatYouReceive",
          label: "O que voc\xEA recebe",
          fields: [
            {
              name: "items",
              label: "Itens",
              type: "object",
              list: true,
              fields: [
                { name: "icon", label: "\xCDcone (Lucide)", type: "string" },
                { name: "title", label: "T\xEDtulo", type: "string" },
                { name: "description", label: "Descri\xE7\xE3o (par\xE1grafos)", type: "string", list: true }
              ]
            }
          ]
        },
        {
          name: "solutionCalculator",
          label: "Calculadora de Solu\xE7\xE3o",
          fields: [
            {
              name: "calculatorType",
              label: "Tipo de Calculadora",
              type: "string",
              options: [
                { value: "legacy", label: "Calculadora Antiga (Legado)" },
                { value: "tina", label: "Calculadora TinaCMS" }
              ],
              required: false
            },
            {
              name: "calculatorId",
              label: "ID da Calculadora (TinaCMS)",
              type: "reference",
              collections: ["calculator"],
              description: "Selecione uma calculadora do TinaCMS"
            },
            { name: "basePrice", label: "Pre\xE7o Base (Legado)", type: "number" },
            {
              name: "factors",
              label: "Fatores (Legado)",
              type: "object",
              list: true,
              fields: [
                { name: "name", label: "Nome do Fator", type: "string" },
                {
                  name: "options",
                  label: "Op\xE7\xF5es",
                  type: "object",
                  list: true,
                  fields: [
                    { name: "label", label: "R\xF3tulo", type: "string" },
                    { name: "multiplier", label: "Multiplicador", type: "number" }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "solutionTimeline",
          label: "Timeline da Solu\xE7\xE3o",
          fields: [
            { name: "timelineTitle", label: "T\xEDtulo da Timeline", type: "string" },
            {
              name: "steps",
              label: "Etapas",
              type: "object",
              list: true,
              fields: [
                { name: "icon", label: "\xCDcone (Lucide)", type: "string" },
                { name: "title", label: "T\xEDtulo", type: "string" },
                { name: "description", label: "Descri\xE7\xE3o", type: "string" }
              ]
            }
          ]
        },
        {
          name: "whyDiray",
          label: "Por que Diray",
          fields: [
            { name: "heading", label: "T\xEDtulo", type: "string", required: true },
            { name: "subheading", label: "Subt\xEDtulo", type: "string" },
            {
              name: "features",
              label: "Diferenciais",
              type: "object",
              list: true,
              fields: [
                { name: "icon", label: "\xCDcone (Lucide)", type: "string" },
                { name: "title", label: "T\xEDtulo", type: "string" },
                { name: "description", label: "Descri\xE7\xE3o", type: "string" }
              ]
            }
          ]
        },
        {
          name: "moreSolutions",
          label: "Mais Solu\xE7\xF5es",
          fields: [{ name: "heading", label: "T\xEDtulo", type: "string", required: true }]
        },
        {
          name: "contact",
          label: "Entre em contato",
          fields: [
            { name: "heading", label: "T\xEDtulo", type: "string", required: true },
            { name: "subheading", label: "Subt\xEDtulo", type: "string" },
            { name: "whatsapp", label: "WhatsApp", type: "string" },
            { name: "email", label: "E-mail", type: "string" }
          ]
        }
        // Adicione outros blocos extras conforme necessário (benefits, cta, faq, etc.)
      ]
    }
  ]
};

// tina/collections/calculator.ts
var CalculatorCollection = {
  name: "calculator",
  label: "\u{1F9EE} Calculadoras",
  path: "content/calculators",
  format: "json",
  fields: [
    {
      type: "string",
      name: "name",
      label: "Nome da Calculadora",
      required: true
    },
    {
      type: "string",
      name: "type",
      label: "Tipo de Calculadora",
      required: true,
      options: [
        { value: "budget-plans", label: "Or\xE7amento com Planos" },
        { value: "salary-based", label: "Baseada em Sal\xE1rio" },
        { value: "training-based", label: "Baseada em Treinamentos" },
        { value: "custom", label: "Personalizada" }
      ]
    },
    {
      type: "string",
      name: "description",
      label: "Descri\xE7\xE3o",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "object",
      name: "config",
      label: "Configura\xE7\xE3o",
      fields: [
        // Campos para calculadoras com planos
        {
          type: "object",
          name: "plans",
          label: "Planos",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label || "Novo Plano" };
            }
          },
          fields: [
            {
              type: "string",
              name: "id",
              label: "ID do Plano",
              required: true
            },
            {
              type: "string",
              name: "label",
              label: "Nome do Plano",
              required: true
            },
            {
              type: "string",
              name: "range",
              label: "Faixa/Descri\xE7\xE3o"
            },
            {
              type: "number",
              name: "totalCost",
              label: "Custo Total"
            },
            {
              type: "number",
              name: "totalHours",
              label: "Horas Totais"
            },
            {
              type: "string",
              name: "duration",
              label: "Dura\xE7\xE3o"
            },
            {
              type: "object",
              name: "activities",
              label: "Atividades",
              list: true,
              fields: [
                {
                  type: "string",
                  name: "name",
                  label: "Nome da Atividade"
                },
                {
                  type: "string",
                  name: "duration",
                  label: "Dura\xE7\xE3o"
                },
                {
                  type: "string",
                  name: "hours",
                  label: "Horas"
                },
                {
                  type: "string",
                  name: "cost",
                  label: "Custo"
                }
              ]
            }
          ]
        },
        // Campos para calculadoras baseadas em salário
        {
          type: "object",
          name: "salaryRanges",
          label: "Faixas Salariais",
          list: true,
          fields: [
            {
              type: "string",
              name: "id",
              label: "ID",
              required: true
            },
            {
              type: "string",
              name: "label",
              label: "Descri\xE7\xE3o da Faixa",
              required: true
            },
            {
              type: "number",
              name: "min",
              label: "Valor M\xEDnimo"
            },
            {
              type: "number",
              name: "max",
              label: "Valor M\xE1ximo"
            },
            {
              type: "number",
              name: "multiplier",
              label: "Multiplicador"
            }
          ]
        },
        // Campos para calculadoras de treinamento
        {
          type: "object",
          name: "trainingTypes",
          label: "Tipos de Treinamento",
          list: true,
          fields: [
            {
              type: "string",
              name: "type",
              label: "Tipo",
              options: ["synchronous", "asynchronous"]
            },
            {
              type: "object",
              name: "durations",
              label: "Dura\xE7\xF5es",
              list: true,
              fields: [
                {
                  type: "number",
                  name: "hours",
                  label: "Horas"
                },
                {
                  type: "number",
                  name: "consultingHours",
                  label: "Horas de Consultoria"
                },
                {
                  type: "number",
                  name: "cost",
                  label: "Custo"
                },
                {
                  type: "number",
                  name: "weeks",
                  label: "Semanas"
                },
                {
                  type: "number",
                  name: "additionalPerSession",
                  label: "Adicional por Sess\xE3o"
                }
              ]
            }
          ]
        },
        // Configurações gerais
        {
          type: "number",
          name: "hourlyRate",
          label: "Valor da Hora"
        },
        {
          type: "boolean",
          name: "requiresLeadForm",
          label: "Requer Formul\xE1rio de Lead"
        },
        {
          type: "boolean",
          name: "showPDF",
          label: "Mostrar Bot\xE3o de PDF"
        },
        {
          type: "string",
          name: "formula",
          label: "F\xF3rmula de C\xE1lculo",
          description: "Para calculadoras personalizadas",
          ui: {
            component: "textarea"
          }
        },
        {
          type: "object",
          name: "variables",
          label: "Vari\xE1veis",
          list: true,
          description: "Para calculadoras personalizadas",
          fields: [
            {
              type: "string",
              name: "name",
              label: "Nome da Vari\xE1vel"
            },
            {
              type: "string",
              name: "label",
              label: "Label"
            },
            {
              type: "string",
              name: "type",
              label: "Tipo",
              options: ["number", "select", "text"]
            },
            {
              type: "string",
              name: "defaultValue",
              label: "Valor Padr\xE3o"
            },
            {
              type: "number",
              name: "min",
              label: "M\xEDnimo"
            },
            {
              type: "number",
              name: "max",
              label: "M\xE1ximo"
            },
            {
              type: "number",
              name: "step",
              label: "Passo"
            },
            {
              type: "object",
              name: "options",
              label: "Op\xE7\xF5es",
              list: true,
              fields: [
                {
                  type: "string",
                  name: "value",
                  label: "Valor"
                },
                {
                  type: "string",
                  name: "label",
                  label: "Label"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "object",
      name: "display",
      label: "Exibi\xE7\xE3o",
      fields: [
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo da Se\xE7\xE3o"
        },
        {
          type: "string",
          name: "subtitle",
          label: "Subt\xEDtulo"
        },
        {
          type: "string",
          name: "buttonText",
          label: "Texto do Bot\xE3o"
        },
        {
          type: "string",
          name: "warningMessage",
          label: "Mensagem de Aviso",
          ui: {
            component: "textarea"
          }
        },
        {
          type: "string",
          name: "successMessage",
          label: "Mensagem de Sucesso",
          ui: {
            component: "textarea"
          }
        }
      ]
    }
  ]
};

// tina/config.tsx
var isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.NEXT_PUBLIC_TINA_BRANCH || "main";
var config_default = defineConfig({
  // Self-hosted configuration
  contentApiUrlOverride: isLocal ? `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/tina/graphql` : "/api/tina/graphql",
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    publicFolder: "public",
    outputFolder: "admin"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
      static: true
    }
  },
  schema: {
    collections: [
      SettingsCollection,
      PageCollection,
      SolutionCollection,
      CalculatorCollection,
      FAQCollection
    ]
  }
});
export {
  config_default as default
};
