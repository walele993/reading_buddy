document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    toggleRuler: document.getElementById('toggleRuler'),
    toggleFont: document.getElementById('toggleFont'),
    fontSelect: document.getElementById('fontSelect'),
    fontSize: document.getElementById('fontSize'),
    sizeValue: document.getElementById('sizeValue'),
    contrast: document.getElementById('contrast'),
    contrastValue: document.getElementById('contrastValue'),
    lineHeight: document.getElementById('lineHeight'),
    lineHeightValue: document.getElementById('lineHeightValue'),
    letterSpacing: document.getElementById('letterSpacing'),
    letterSpacingValue: document.getElementById('letterSpacingValue'),
    wordSpacing: document.getElementById('wordSpacing'),
    wordSpacingValue: document.getElementById('wordSpacingValue'),
    resetSettings: document.getElementById('resetSettings')
  };

  // Gestione sezioni collassabili
  document.querySelectorAll('.section-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.parentElement.querySelector('.section-content');
      const icon = header.querySelector('i');
      const isExpanded = content.style.display === 'block';
      
      content.style.display = isExpanded ? 'none' : 'block';
      icon.classList.toggle('fa-chevron-up', !isExpanded);
      icon.classList.toggle('fa-chevron-down', isExpanded);
    });
  });

  // Caricamento impostazioni
  chrome.storage.local.get([
    'dyslexiaActive',
    'rulerActive',
    'rulerColor',
    'chosenFont',
    'fontSize',
    'contrast',
    'lineHeight',
    'letterSpacing',
    'wordSpacing'
  ], (result) => {
    // Font
    const isFontActive = result.dyslexiaActive ?? true;
    elements.toggleFont.querySelector('span').textContent = 
      isFontActive ? "Disable Font Adjustments" : "Enable Font Adjustments";
    elements.toggleFont.classList.toggle('active-feature', isFontActive);
    elements.fontSelect.disabled = !isFontActive;

    // Ruler
    const isRulerActive = result.rulerActive ?? false;
    elements.toggleRuler.querySelector('span').textContent = 
      isRulerActive ? "Disable Ruler" : "Enable Ruler";
    elements.toggleRuler.classList.toggle('active-feature', isRulerActive);

    // Colori ruler
    document.querySelectorAll('.color-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === (result.rulerColor || 'red'));
    });

    // Altri valori
    elements.fontSelect.value = result.chosenFont || 'Open Dyslexic';
    elements.fontSize.value = result.fontSize || 1.0;
    elements.sizeValue.textContent = `${parseFloat(elements.fontSize.value).toFixed(1)}x`;
    elements.contrast.value = result.contrast || 1.0;
    elements.contrastValue.textContent = `${parseFloat(elements.contrast.value).toFixed(1)}x`;
    elements.lineHeight.value = result.lineHeight || 1.6;
    elements.lineHeightValue.textContent = parseFloat(elements.lineHeight.value).toFixed(1);
    elements.letterSpacing.value = result.letterSpacing || 0.05;
    elements.letterSpacingValue.textContent = `${parseFloat(elements.letterSpacing.value).toFixed(2)}em`;
    elements.wordSpacing.value = result.wordSpacing || 0.1;
    elements.wordSpacingValue.textContent = `${parseFloat(elements.wordSpacing.value).toFixed(1)}em`;
  });

  // Funzione di aggiornamento
  const updateActiveTab = () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "updateSettings"});
      }
    });
  };

  // Gestione toggle
  const handleToggle = (element, storageKey, activeText, inactiveText) => {
    chrome.storage.local.get([storageKey], result => {
      const currentValue = result[storageKey] ?? false;
      const newValue = !currentValue;
      
      chrome.storage.local.set({ [storageKey]: newValue }, () => {
        element.querySelector('span').textContent = newValue ? activeText : inactiveText;
        element.classList.toggle('active-feature', newValue);
        
        if(storageKey === 'dyslexiaActive') {
          elements.fontSelect.disabled = !newValue;
        }
        
        updateActiveTab();
      });
    });
  };

  // Event listeners
  elements.toggleFont.addEventListener('click', () => 
    handleToggle(elements.toggleFont, 'dyslexiaActive', "Disable Font Adjustments", "Enable Font Adjustments")
  );

  elements.toggleRuler.addEventListener('click', () => 
    handleToggle(elements.toggleRuler, 'rulerActive', "Disable Ruler", "Enable Ruler")
  );

  document.querySelectorAll('.color-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const color = e.target.dataset.color;
      document.querySelectorAll('.color-option').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      chrome.storage.local.set({rulerColor: color}, updateActiveTab);
    });
  });

  elements.fontSelect.addEventListener('change', () => {
    chrome.storage.local.set({chosenFont: elements.fontSelect.value}, updateActiveTab);
  });

  // Gestione slider
  const createSliderHandler = (element, key, formatter) => {
    element.addEventListener('input', () => {
      const value = parseFloat(element.value);
      chrome.storage.local.set({ [key]: value }, () => {
        if(formatter) formatter(value);
        updateActiveTab();
      });
    });
  };

  createSliderHandler(elements.fontSize, 'fontSize', value => {
    elements.sizeValue.textContent = `${value.toFixed(1)}x`;
  });

  createSliderHandler(elements.contrast, 'contrast', value => {
    elements.contrastValue.textContent = `${value.toFixed(1)}x`;
  });

  createSliderHandler(elements.lineHeight, 'lineHeight', value => {
    elements.lineHeightValue.textContent = value.toFixed(1);
  });

  createSliderHandler(elements.letterSpacing, 'letterSpacing', value => {
    elements.letterSpacingValue.textContent = `${value.toFixed(2)}em`;
  });

  createSliderHandler(elements.wordSpacing, 'wordSpacing', value => {
    elements.wordSpacingValue.textContent = `${value.toFixed(1)}em`;
  });

  // Reset
  elements.resetSettings.addEventListener('click', () => {
    chrome.storage.local.clear(() => {
      chrome.tabs.reload();
      setTimeout(() => window.close(), 100);
    });
  });
});
