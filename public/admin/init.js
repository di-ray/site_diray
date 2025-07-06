// M2Z Control - Inicialização das customizações visuais
(function() {
  'use strict';
  
  // Função para carregar CSS customizado
  function loadCustomCSS() {
    // Verifica se o CSS já foi carregado
    if (document.getElementById('m2z-custom-styles')) {
      return;
    }
    
    // Cria o link para o CSS customizado
    const link = document.createElement('link');
    link.id = 'm2z-custom-styles';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/admin/custom.css';
    
    // Adiciona ao head
    document.head.appendChild(link);
    
    console.log('M2Z Custom CSS carregado');
  }
  
  // Função para carregar Google Fonts
  function loadGoogleFonts() {
    if (document.getElementById('google-fonts-inter')) {
      return;
    }
    
    const link = document.createElement('link');
    link.id = 'google-fonts-inter';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    
    document.head.appendChild(link);
  }
  
  // Função para adicionar o logo M2Z
  function addM2ZLogo() {
    // Tenta encontrar a sidebar várias vezes
    let attempts = 0;
    const maxAttempts = 20;
    
    function tryAddLogo() {
      attempts++;
      
      // Procura por vários seletores possíveis da sidebar
      const sidebar = document.querySelector('aside') || 
                     document.querySelector('nav[role="navigation"]') ||
                     document.querySelector('[data-tina-sidebar]') ||
                     document.querySelector('div[class*="bg-gray-900"]') ||
                     document.querySelector('div[class*="bg-slate"]') ||
                     document.querySelector('.tina-sidebar');
      
      if (sidebar && !document.getElementById('m2z-logo-container')) {
        // Cria container do logo
        const logoContainer = document.createElement('div');
        logoContainer.id = 'm2z-logo-container';
        logoContainer.style.cssText = `
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid var(--m2z-neutral-200, #e2e8f0);
          margin-bottom: 10px;
        `;
        
        // Cria a imagem do logo
        const logo = document.createElement('img');
        logo.src = '/m2z-logo.png';
        logo.alt = 'M2Z Control';
        logo.style.cssText = `
          width: 40px;
          height: 40px;
          object-fit: contain;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
        `;
        
        logoContainer.appendChild(logo);
        
        // Insere no topo da sidebar
        sidebar.insertBefore(logoContainer, sidebar.firstChild);
        
        console.log('Logo M2Z adicionado à sidebar');
        return true;
      }
      
      if (attempts < maxAttempts) {
        setTimeout(tryAddLogo, 500);
      }
      
      return false;
    }
    
    tryAddLogo();
  }
  
  // Função para aplicar favicon
  function setFavicon() {
    // Remove favicon existente
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (existingFavicon) {
      existingFavicon.remove();
    }
    
    // Adiciona novo favicon
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = '/m2z-logo.png';
    
    document.head.appendChild(favicon);
  }
  
  // Função para melhorar a acessibilidade
  function enhanceAccessibility() {
    // Adiciona meta tags se não existirem
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(viewport);
    }
    
    // Melhora o contraste de texto
    document.body.style.setProperty('color-scheme', 'light');
  }
  
  // Função principal de inicialização
  function init() {
    console.log('Inicializando customizações M2Z Control...');
    
    // Carrega estilos
    loadGoogleFonts();
    loadCustomCSS();
    
    // Configura favicon
    setFavicon();
    
    // Melhora acessibilidade
    enhanceAccessibility();
    
    // Aguarda o DOM estar pronto e adiciona o logo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addM2ZLogo);
    } else {
      addM2ZLogo();
    }
    
    // Observer para mudanças no DOM (SPA)
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Re-executa customizações quando há mudanças no DOM
          setTimeout(addM2ZLogo, 100);
        }
      });
    });
    
    // Observa mudanças no body
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('Customizações M2Z Control inicializadas com sucesso!');
  }
  
  // Inicia quando o script carrega
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
