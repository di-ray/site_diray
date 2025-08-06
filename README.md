# DI.RAY - Sistema de Gestão de Conteúdo com TinaCMS

## 📋 Sobre o Projeto

Este é o sistema de gerenciamento de conteúdo do site da DI.RAY Consultoria, construído com Next.js 14, TypeScript e TinaCMS. O projeto permite edição completa do conteúdo do site através de uma interface administrativa intuitiva.

## 🚀 Tecnologias Principais

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **TinaCMS** - Sistema de gerenciamento de conteúdo
- **Tailwind CSS** - Framework de estilos utilitários
- **Framer Motion** - Animações e interações
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

## 📁 Estrutura do Projeto

```
m2z-control/
├── app/                    # Diretório principal do Next.js 14 (App Router)
│   ├── layout.tsx         # Layout principal da aplicação
│   ├── page.tsx           # Página inicial
│   ├── globals.css        # Estilos globais
│   └── [outras-paginas]/  # Outras páginas do site
├── components/            # Componentes React
│   ├── blocks/           # Blocos de conteúdo editáveis
│   ├── ui/               # Componentes de UI reutilizáveis
│   └── calculators/      # Calculadoras interativas
├── content/              # Conteúdo gerenciado pelo TinaCMS
│   ├── pages/           # Arquivos MDX das páginas
│   ├── solutions/       # Conteúdo das soluções
│   └── settings/        # Configurações globais
├── tina/                 # Configuração do TinaCMS
│   ├── config.tsx       # Configuração principal
│   └── collections/     # Definições das coleções
├── public/              # Arquivos estáticos
│   └── images/         # Imagens do site
└── lib/                # Utilitários e helpers
```

## 🎨 Componentes Principais

### Blocos de Conteúdo Editáveis

1. **Hero** - Banner principal com título, subtítulo e CTA
2. **About** - Seção sobre a empresa com biografia do fundador
3. **Solutions** - Listagem de soluções oferecidas
4. **FAQ** - Perguntas frequentes organizadas por categoria
5. **Contact** - Formulário de contato integrado
6. **Header** - Cabeçalho editável com navegação
7. **Footer** - Rodapé editável com links e redes sociais
8. **Logo Carousel** - Carrossel de logos de clientes
9. **Challenges** - Seção de desafios e soluções por público
10. **Engagement** - Seção de engajamento com texto rico
11. **Why DI.RAY** - Diferenciais da empresa

### Calculadoras Interativas

- Implementadas em cada página de solução
- Cálculo automático de investimento baseado em parâmetros
- Totalmente configuráveis via TinaCMS

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- pnpm (gerenciador de pacotes)

### Instalação

```bash
# Clonar o repositório
git clone [url-do-repositorio]

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env.local
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` com as seguintes variáveis:

```env
# TinaCMS
TINA_TOKEN=seu_token_aqui
NEXT_PUBLIC_TINA_CLIENT_ID=seu_client_id_aqui

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_FB_PIXEL_ID=
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
```

### Executar em Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# Acessar TinaCMS Admin
# http://localhost:3000/admin
```

### Build para Produção

```bash
# Gerar build de produção
pnpm build

# Executar build localmente
pnpm start
```

## 📝 Gerenciamento de Conteúdo

### Acessando o Admin

1. Acesse `/admin` no seu site
2. Faça login com suas credenciais do TinaCMS
3. Edite o conteúdo através da interface visual

### Estrutura de Conteúdo

- **Páginas**: Conteúdo principal do site em formato MDX
- **Soluções**: Páginas individuais para cada serviço oferecido
- **Configurações**: Settings globais como navegação e rodapé
- **Calculadoras**: Configuração das calculadoras de cada solução

### Editando Conteúdo

1. Navegue até a seção desejada no admin
2. Clique no conteúdo que deseja editar
3. Faça as alterações no editor visual
4. Salve as mudanças

## 🎯 Funcionalidades Principais

- ✅ CMS completo com interface visual
- ✅ Páginas totalmente editáveis
- ✅ Calculadoras interativas configuráveis
- ✅ Formulário de contato integrado
- ✅ SEO otimizado
- ✅ Design responsivo
- ✅ Animações suaves
- ✅ Analytics integrado
- ✅ LGPD compliance com banner de cookies

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 🤝 Contribuindo

1. Crie uma branch para sua feature
2. Faça commit das mudanças
3. Push para a branch
4. Abra um Pull Request

## 📞 Suporte

Para suporte ou dúvidas sobre o projeto:
- Email: contato@diray.com.br
- WhatsApp: +55 11 99638-6103

## 📄 Licença

Este projeto é propriedade da DI.RAY Consultoria. Todos os direitos reservados.

---

## 🛠️ Estrutura Técnica Detalhada

### Collections do TinaCMS

1. **PageCollection** (`/tina/collections/page.ts`)
   - Gerencia todas as páginas do site
   - Suporta blocos de conteúdo modulares
   - Templates disponíveis para cada seção

2. **SolutionCollection** (`/tina/collections/solution.ts`)
   - Páginas individuais de soluções
   - Calculadoras integradas
   - Seções customizáveis

3. **SettingsCollection** (`/tina/collections/settings.ts`)
   - Configurações globais do site
   - Navegação (header e footer)
   - Informações de contato
   - Redes sociais

4. **CalculatorCollection** (`/tina/collections/calculator.ts`)
   - Configuração das calculadoras
   - Parâmetros e fórmulas
   - Textos e labels

### Componentes de UI

Localização: `/components/ui/`

- **Button** - Botões estilizados
- **Card** - Cards para conteúdo
- **Input** - Campos de formulário
- **Textarea** - Áreas de texto
- **Label** - Labels para formulários
- **CTAButton** - Botões de call-to-action

### Utilitários

- **cn()** - Função para concatenar classes do Tailwind
- **formatCurrency()** - Formatação de valores monetários
- **validateForm()** - Validação de formulários com Zod