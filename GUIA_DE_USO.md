# 🎯 Guia de Uso - Admin Personalizado M2Z Control

## 🚀 Primeiros Passos

### 1. Acessando o Admin
1. Abra seu navegador
2. Acesse: `http://localhost:3000/admin`
3. O sistema carregará com sua identidade visual personalizada

### 2. Interface Personalizada
- **Logo M2Z** no cabeçalho da sidebar
- **Cores da marca** em toda interface
- **Loading screen** personalizado
- **Navegação** com ícones e emojis

## 📝 Gerenciando Conteúdo

### Editando Páginas
1. Na sidebar, clique em "📄 Páginas"
2. Selecione a página que deseja editar
3. Use os campos personalizados:
   - **📝 Cabeçalho da Página**: Título principal
   - **🖼️ Logo**: Upload de imagem com texto alternativo
   - **🔗 Links de Navegação**: Lista de links com descrições

### Configurações do Site
1. Clique em "⚙️ Configurações do Site"
2. Edite as seções:
   - **🌐 Informações do Site**: Título, descrição, palavras-chave
   - **📞 Contatos**: E-mail, telefone, endereço
   - **📱 Redes Sociais**: URLs das redes sociais
   - **🎨 Tema**: Cores primária/secundária, modo escuro

## 🎨 Personalizações Visuais

### Tema da Marca
- **Cor Principal**: Rosa M2Z (#E6007E)
- **Botões**: Com gradiente e efeitos hover
- **Campos**: Bordas e focus states personalizados
- **Animações**: Transições suaves

### Responsividade
- **Desktop**: Layout completo
- **Tablet/Mobile**: Sidebar adaptativa

## 💡 Dicas de Uso

### Campos Obrigatórios
- São marcados com asterisco (*)
- O sistema impede salvamento sem preenchê-los

### Uploads de Imagem
- Use o campo "🖼️ Logo" para fazer upload
- Sempre preencha o texto alternativo
- Formatos suportados: JPG, PNG, SVG, WebP

### Links de Navegação
- Use o botão "+" para adicionar novos links
- URLs podem ser internas (/sobre) ou externas (https://...)
- Descrições ajudam na usabilidade

### Salvamento
- Clique em "Salvar" (botão personalizado com gradiente)
- Aguarde a confirmação de sucesso
- Mudanças são aplicadas imediatamente no site

## 🔧 Recursos Avançados

### Validações
- Campos obrigatórios são validados automaticamente
- URLs são verificadas quanto ao formato
- Mensagens de erro em português

### Preview em Tempo Real
- Mudanças podem ser visualizadas instantaneamente
- Abra o site em outra aba para acompanhar

### Histórico de Mudanças
- Todas as alterações são registradas
- Possível reverter mudanças quando necessário

## 🎯 Fluxo de Trabalho Recomendado

### Configuração Inicial
1. Acesse "⚙️ Configurações do Site"
2. Preencha informações básicas da empresa
3. Configure contatos e redes sociais
4. Defina cores do tema se necessário

### Gestão de Páginas
1. Vá para "📄 Páginas"
2. Edite o conteúdo conforme necessário
3. Adicione/remova links de navegação
4. Atualize logos e imagens

### Manutenção Regular
1. Verifique configurações mensalmente
2. Atualize informações de contato
3. Adicione novos links conforme crescimento
4. Monitore performance do site

## 🚨 Resolução de Problemas

### Site Não Carrega
- Verifique se o servidor está rodando
- Execute: `pnpm dev` no terminal
- Aguarde a mensagem de "Ready"

### Mudanças Não Aparecem
- Aguarde alguns segundos para propagação
- Recarregue a página (F5)
- Limpe cache do navegador se necessário

### Erro ao Salvar
- Verifique campos obrigatórios
- Confirme formato de URLs
- Tente novamente em alguns segundos

### CSS Não Carrega
- Verifique se `custom-admin.css` existe
- Confirme que o arquivo está em `public/admin/`
- Recarregue a página com Ctrl+F5

## 📱 Acesso Mobile

### Navegação Touch
- Interface otimizada para touch
- Sidebar responsiva
- Botões com área de toque adequada

### Performance
- Imagens otimizadas automaticamente
- Loading states para feedback visual
- Animações suaves sem comprometer performance

## 🔐 Segurança

### Modo Local (Desenvolvimento)
- Sem autenticação necessária
- Apenas para desenvolvimento local
- Não expor em rede pública

### Modo Produção
- Autenticação obrigatória
- Usuários e senhas gerenciados
- Sessões seguras

## 📊 Monitoramento

### Logs
- Todas as ações são registradas
- Verifique console para debugging
- Erros são reportados automaticamente

### Performance
- Interface otimizada para velocidade
- Lazy loading de componentes
- Cache inteligente de assets

## 🎓 Recursos de Aprendizado

### Documentação Oficial
- [TinaCMS Docs](https://tina.io/docs/)
- [Next.js Guide](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Comunidade
- [TinaCMS Discord](https://discord.gg/zumN63Ybpf)
- [GitHub Issues](https://github.com/tinacms/tinacms)

---

## 📞 Suporte Técnico

### Contato
- **E-mail**: suporte@m2z.com.br
- **Telefone**: +55 (11) 99999-9999

### Horário de Atendimento
- **Segunda a Sexta**: 9h às 18h
- **Resposta**: Até 24h úteis

---

**🎉 Parabéns! Você agora tem um admin TinaCMS totalmente personalizado com a identidade visual da M2Z!**
