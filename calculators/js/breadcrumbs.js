// Breadcrumb Navigation Generator
(function() {
  'use strict';
  
  // Don't show breadcrumbs on homepage
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    return;
  }
  
  // Generate breadcrumb data from URL
  function generateBreadcrumbs() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(s => s && s !== 'index.html');
    const breadcrumbs = [{ name: 'Home', url: '/' }];
    
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += '/' + segment;
      
      // Clean up segment name
      let name = segment
        .replace('.html', '')
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Special name mappings
      const nameMap = {
        'calculators': 'Calculators',
        'technique': 'Technique Guides',
        'training': 'Training Plans',
        'workouts': 'Workouts',
        'css': 'CSS Calculator',
        'swolf': 'SWOLF Calculator',
        'split': 'Split Calculator',
        'how to calculate swim pace': 'How to Calculate Pace',
        'swim pace chart': 'Pace Chart',
        'swimming training zones': 'Training Zones'
      };
      
      if (nameMap[segment.replace('.html', '').replace(/-/g, ' ')]) {
        name = nameMap[segment.replace('.html', '').replace(/-/g, ' ')];
      }
      
      // Don't add .html files as intermediate breadcrumbs
      if (index === segments.length - 1 || !segment.includes('.html')) {
        breadcrumbs.push({
          name: name,
          url: index === segments.length - 1 ? null : currentPath + '/'
        });
      }
    });
    
    return breadcrumbs;
  }
  
  // Create breadcrumb HTML
  function createBreadcrumbHTML(breadcrumbs) {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Breadcrumb');
    nav.className = 'bg-gray-100 py-2 px-4 text-sm';
    
    const ol = document.createElement('ol');
    ol.className = 'flex items-center space-x-2';
    ol.setAttribute('itemscope', '');
    ol.setAttribute('itemtype', 'https://schema.org/BreadcrumbList');
    
    breadcrumbs.forEach((crumb, index) => {
      const li = document.createElement('li');
      li.setAttribute('itemprop', 'itemListElement');
      li.setAttribute('itemscope', '');
      li.setAttribute('itemtype', 'https://schema.org/ListItem');
      
      if (crumb.url) {
        const a = document.createElement('a');
        a.href = crumb.url;
        a.className = 'text-blue-600 hover:text-blue-800';
        a.setAttribute('itemprop', 'item');
        a.innerHTML = '<span itemprop="name">' + crumb.name + '</span>';
        li.appendChild(a);
        
        // Add separator
        if (index < breadcrumbs.length - 1) {
          const separator = document.createElement('span');
          separator.className = 'mx-2 text-gray-400';
          separator.textContent = '>';
          li.appendChild(separator);
        }
      } else {
        // Current page (no link)
        const span = document.createElement('span');
        span.className = 'text-gray-600';
        span.setAttribute('itemprop', 'name');
        span.textContent = crumb.name;
        li.appendChild(span);
      }
      
      // Add position metadata
      const meta = document.createElement('meta');
      meta.setAttribute('itemprop', 'position');
      meta.setAttribute('content', (index + 1).toString());
      li.appendChild(meta);
      
      ol.appendChild(li);
    });
    
    nav.appendChild(ol);
    return nav;
  }
  
  // Insert breadcrumbs after navigation
  function insertBreadcrumbs() {
    const breadcrumbs = generateBreadcrumbs();
    if (breadcrumbs.length > 1) {
      const breadcrumbHTML = createBreadcrumbHTML(breadcrumbs);
      const mainNav = document.querySelector('nav');
      if (mainNav && mainNav.parentNode) {
        mainNav.parentNode.insertBefore(breadcrumbHTML, mainNav.nextSibling);
      }
    }
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertBreadcrumbs);
  } else {
    insertBreadcrumbs();
  }
})();
