// src/utils/gaUtils.js
export const loadGAScript = (codeBoard) => {
    if (!codeBoard) {
      console.warn('No codeBoard provided, GA not loaded.');
      return;
    }
  
    // Check if GA script already exists
    if (document.getElementById('ga-script')) {
      console.log('GA script already loaded.');
      return;
    }
  
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${codeBoard}`;
    script.id = 'ga-script';
    document.head.appendChild(script);
  
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', codeBoard);
      console.log('GA initialized with codeBoard:', codeBoard);
    };
  };
  