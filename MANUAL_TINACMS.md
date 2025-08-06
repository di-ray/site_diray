# Manual de Uso - TinaCMS para DI.RAY

## 📚 Índice

1. [Introdução](#introdução)
2. [Acessando o Admin](#acessando-o-admin)
3. [Editando Páginas](#editando-páginas)
4. [Gerenciando Soluções](#gerenciando-soluções)
5. [Configurações Globais](#configurações-globais)
6. [Calculadoras](#calculadoras)
7. [Upload de Imagens](#upload-de-imagens)
8. [Publicando Mudanças](#publicando-mudanças)
9. [Dicas e Boas Práticas](#dicas-e-boas-práticas)

## 🎯 Introdução

O TinaCMS é o sistema de gerenciamento de conteúdo que permite editar todo o site da DI.RAY de forma visual e intuitiva, sem necessidade de conhecimento técnico.

### Recursos Disponíveis
- ✏️ Edição visual de textos
- 🖼️ Upload e gerenciamento de imagens
- 📱 Preview em tempo real
- 🔧 Configuração de calculadoras
- 📊 Organização de conteúdo

## 🔐 Acessando o Admin

### Passo 1: Acesse o Painel
1. Navegue até `seusite.com.br/admin`
2. Você será redirecionado para a tela de login

### Passo 2: Faça Login
1. Insira suas credenciais fornecidas
2. Clique em "Login"

### Passo 3: Dashboard
Após o login, você verá o dashboard com as seguintes seções:
- **📄 Páginas** - Conteúdo das páginas do site
- **🛠️ Soluções** - Serviços oferecidos
- **⚙️ Configurações** - Settings globais
- **🧮 Calculadoras** - Configuração das calculadoras

## 📝 Editando Páginas

### Página Inicial (Home)

1. Clique em "📄 Páginas" no menu lateral
2. Selecione "Página Inicial"
3. Você verá os blocos de conteúdo disponíveis:

#### Bloco Hero (Banner Principal)
- **Título**: Texto principal do banner
- **Destaque**: Palavra em destaque (aparece em vermelho)
- **Subtítulo**: Texto secundário
- **Descrição**: Texto descritivo
- **Botão**: Texto e link do botão

#### Bloco Engajamento
- **Título**: Título da seção
- **Texto**: Conteúdo principal (suporta formatação)

#### Bloco Desafios
- **Título**: Título da seção
- **Cards**: Lista de cards por público-alvo
  - CEOs
  - Líderes de RH

#### Bloco Soluções
- **Título**: Título da seção
- **Subtítulo**: Descrição
- **Lista de Soluções**: Automaticamente carregada

#### Bloco Por que DI.RAY
- **Título**: Título da seção
- **Diferenciais**: Lista de diferenciais com ícones

#### Bloco Sobre
- **Título**: Título da seção
- **Nome do Fundador**: Nome completo
- **Cargo**: Cargo/título
- **Biografia**: Texto biográfico
- **Imagem do Fundador**: Upload de foto
- **Logos de Clientes**: Imagem com logos

#### Bloco FAQ
- **Título**: Título da seção
- **Subtítulo**: Descrição
- **Perguntas**: Lista organizada por categoria
  - Processo de consultoria
  - Atendimento e gestão administrativa
  - Informações no site

#### Bloco Contato
- **Título**: Título da seção
- **Subtítulo**: Descrição
- **WhatsApp**: Número de telefone
- **Email**: Endereço de email

### Outras Páginas

#### Por que DI.RAY
1. Navegue até "Por que DI.RAY" em Páginas
2. Edite os blocos específicos desta página

## 🛠️ Gerenciando Soluções

### Visualizando Soluções
1. Clique em "🛠️ Soluções"
2. Veja a lista de todas as soluções

### Editando uma Solução
1. Clique na solução desejada
2. Edite os campos:
   - **Título**: Nome da solução
   - **Descrição**: Breve descrição
   - **Ícone**: Escolha o ícone apropriado
   - **Conteúdo Completo**: Descrição detalhada
   - **Calculadora**: Selecione a calculadora associada

### Seções da Solução
Cada solução tem seções editáveis:
- **Como Funciona**: Etapas do processo
- **Benefícios**: Lista de benefícios
- **Público-Alvo**: Para quem é indicado
- **Resultados**: Resultados esperados

## ⚙️ Configurações Globais

### Navegação (Header)
1. Acesse "⚙️ Configurações"
2. Clique em "Navegação"
3. Configure:
   - **Logo**: Upload do logo
   - **Itens do Menu**: Links de navegação

### Rodapé (Footer)
1. Em Configurações, selecione "Rodapé"
2. Configure:
   - **Logo**: Logo do rodapé
   - **Descrição**: Texto sobre a empresa
   - **Links Rápidos**: Links importantes
   - **Serviços**: Links para soluções
   - **Redes Sociais**: Links sociais
   - **Copyright**: Texto de copyright

### Informações de Contato
1. Configure email, telefone e endereço
2. Essas informações são usadas em todo o site

## 🧮 Calculadoras

### Configurando uma Calculadora
1. Acesse "🧮 Calculadoras"
2. Selecione a calculadora desejada
3. Configure os parâmetros:

#### Campos Básicos
- **Título**: Nome da calculadora
- **Descrição**: Explicação do cálculo

#### Campos do Formulário
Para cada campo:
- **Nome**: Identificador único
- **Label**: Texto exibido
- **Tipo**: number, select, etc.
- **Obrigatório**: Sim/Não
- **Valor Mínimo/Máximo**: Para campos numéricos

#### Opções (para campos select)
- **Texto**: O que aparece para o usuário
- **Valor**: Valor usado no cálculo
- **Multiplicador**: Fator de multiplicação

#### Fórmula
- Configure como o cálculo é feito
- Use os nomes dos campos na fórmula

## 🖼️ Upload de Imagens

### Como Fazer Upload
1. Clique no campo de imagem
2. Selecione "Upload" ou "Escolher Arquivo"
3. Navegue e selecione a imagem
4. Aguarde o upload completar

### Recomendações
- **Formato**: JPG, PNG ou WebP
- **Tamanho**: Máximo 2MB
- **Dimensões**: 
  - Logo: 200x80px
  - Fotos: 800x600px mínimo
  - Banner: 1920x1080px

### Organizando Imagens
- Use nomes descritivos
- Crie pastas por categoria
- Delete imagens não utilizadas

## 📤 Publicando Mudanças

### Salvando Alterações
1. Após editar, clique em "Salvar"
2. As mudanças são salvas localmente

### Publicando no Site
1. Revise todas as mudanças
2. Clique em "Publicar"
3. Confirme a publicação
4. Aguarde a confirmação

### Desfazendo Mudanças
- Use "Descartar Mudanças" antes de salvar
- Ou restaure uma versão anterior

## 💡 Dicas e Boas Práticas

### Edição de Texto
- **Negrito**: Use para destacar informações importantes
- **Links**: Sempre teste após criar
- **Listas**: Use para organizar informações
- **Parágrafos**: Mantenha textos curtos e diretos

### SEO
- Preencha sempre títulos e descrições
- Use palavras-chave relevantes
- Mantenha URLs amigáveis

### Performance
- Otimize imagens antes do upload
- Evite textos muito longos
- Use as calculadoras apropriadas

### Backup
- Faça backup do conteúdo regularmente
- Documente mudanças importantes
- Teste em preview antes de publicar

## 🆘 Suporte

### Problemas Comuns

#### Não consigo fazer login
- Verifique suas credenciais
- Limpe o cache do navegador
- Tente em modo incógnito

#### Mudanças não aparecem
- Certifique-se de ter clicado em "Publicar"
- Aguarde alguns minutos
- Limpe o cache do site

#### Erro ao fazer upload
- Verifique o tamanho do arquivo
- Tente outro formato
- Reduza a resolução

### Contato para Suporte
- Email: suporte@m2z.com.br
- WhatsApp: (11) 99999-9999
- Horário: Segunda a Sexta, 9h às 18h

## 📋 Checklist Diário

- [ ] Verificar se há conteúdo para atualizar
- [ ] Revisar formulários de contato
- [ ] Checar funcionamento das calculadoras
- [ ] Verificar links quebrados
- [ ] Backup do conteúdo importante

## 🎓 Recursos Adicionais

### Vídeos Tutoriais
- Como editar a página inicial
- Configurando calculadoras
- Gerenciando imagens

### Templates
- Modelo de página de solução
- Estrutura de FAQ
- Formato de biografia

---

**Última atualização**: Janeiro 2025
**Versão**: 1.0