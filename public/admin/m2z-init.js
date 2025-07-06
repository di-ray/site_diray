// M2Z Control - Inicialização das customizações visuais
(function() {
  'use strict';
  
  // Função para carregar CSS customizado
  function loadCustomCSS() {
    if (document.getElementById('m2z-custom-styles')) {
      return;
    }
    
    var link = document.createElement('link');
    link.id = 'm2z-custom-styles';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/admin/custom.css';
    document.head.appendChild(link);
    console.log('M2Z Custom CSS carregado');
  }
  
  // Função para carregar Google Fonts
  function loadGoogleFonts() {
    if (document.getElementById('google-fonts-inter')) {
      return;
    }
    
    var link = document.createElement('link');
    link.id = 'google-fonts-inter';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
  }
  
  // Função para adicionar o logo M2Z
  function addM2ZLogo() {
    var attempts = 0;
    var maxAttempts = 20;
    
    function tryAddLogo() {
      attempts++;
      
      var sidebar = document.querySelector('aside') || 
                    document.querySelector('nav[role="navigation"]') ||
                    document.querySelector('[data-tina-sidebar]') ||
                    document.querySelector('div[class*="bg-gray-900"]') ||
                    document.querySelector('div[class*="bg-slate"]') ||
                    document.querySelector('.tina-sidebar');
      
      if (sidebar && !document.getElementById('m2z-logo-container')) {
        var logoContainer = document.createElement('div');
        logoContainer.id = 'm2z-logo-container';
        logoContainer.style.cssText = 'padding: 20px; text-align: center; border-bottom: 1px solid #e2e8f0; margin-bottom: 10px;';
        
        var logo = document.createElement('img');
        logo.src = '/m2z-logo.png';
        logo.alt = 'M2Z Control';
        logo.style.cssText = 'width: 40px; height: 40px; object-fit: contain; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));';
        
        logoContainer.appendChild(logo);
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
  
  // Função principal de inicialização
  function init() {
    console.log('Inicializando customizações M2Z Control...');
    
    loadGoogleFonts();
    loadCustomCSS();
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addM2ZLogo);
    } else {
      addM2ZLogo();
    }
    
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          setTimeout(addM2ZLogo, 100);
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('Customizações M2Z Control inicializadas!');
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
