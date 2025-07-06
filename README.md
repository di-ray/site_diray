# M2Z Next.js & TinaCMS Starter Kit

Este é o starter kit padrão da M2Z para criar projetos web modernos, utilizando Next.js para o frontend e TinaCMS para gerenciamento de conteúdo (CMS) de forma self-hosted com MongoDB.

## ✨ Funcionalidades

- **Next.js 14:** Estrutura de frontend com App Router.
- **TinaCMS Self-Hosted:** Gerencie seu conteúdo sem depender de serviços de terceiros.
- **MongoDB Database:** Adaptador de banco de dados configurado para persistência de dados.
- **Tailwind CSS:** Framework de CSS utility-first para estilização rápida.
- **TypeScript:** Tipagem estática para um código mais robusto.
- **Estrutura de Conteúdo Pré-definida:** Collections prontas para uso:
  - Pages (Páginas)
  - Posts (Blog)
  - Projects (Portfólio)
  - Testimonials (Depoimentos)
  - Team Members (Equipe)
  - Settings (Configurações Globais)

---

## 🚀 Começando um Novo Projeto

Siga estes passos para usar este starter kit como base para um novo projeto.

### 1. Crie seu Repositório a partir do Template

**NÃO FAÇA UM FORK.** Use a função "Use this template" do GitHub para criar um novo repositório. Isso garante que você comece com um histórico Git limpo.

Se você já clonou o projeto, pode limpar o histórico manualmente:
```bash
rm -rf .git
git init
git add .
git commit -m "🎉 Initial commit from M2Z Starter Kit"
```

### 2. Instale as Dependências

Recomendamos o uso de `pnpm` para gerenciamento de pacotes.

```bash
pnpm install
```

### 3. Configure as Variáveis de Ambiente

Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env` e preencha as variáveis necessárias.

```bash
cp .env.example .env
```

**Variáveis Essenciais:**
- `NEXTAUTH_SECRET`: Chave secreta para a autenticação. Gere uma [aqui](https://generate-secret.vercel.app/32).
- `MONGODB_URI`: Sua string de conexão do MongoDB.
- `MONGODB_DATABASE`: O nome do banco de dados que você quer usar.
- `MONGODB_COLLECTION`: O nome da collection para os dados do Tina.

### 4. Inicie o Servidor de Desenvolvimento

Com tudo configurado, inicie o ambiente de desenvolvimento local:

```bash
pnpm dev
```

- Seu site estará disponível em `http://localhost:3000`.
- O painel de administração do TinaCMS estará em `http://localhost:3000/admin`.

### 5. Crie seu Primeiro Usuário

Acesse o painel de administração, e o sistema irá guiá-lo para criar o primeiro usuário administrador.

---

## 🔧 Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento local.
- `pnpm build`: Gera a build de produção do site.
- `pnpm start`: Inicia um servidor de produção (requer `pnpm build` primeiro).
- `pnpm lint`: Executa o linter para análise de código.