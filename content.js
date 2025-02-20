let ruler = null;

function createRuler() {
  ruler = document.createElement('div');
  ruler.id = 'dyslexia-ruler';
  ruler.style.cssText = `
      position: fixed;
      width: 95%;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 42px;
      background: var(--ruler-bg, rgba(255, 107, 107, 0.4));
      border-top: 2px solid var(--ruler-border, rgba(255, 107, 107, 0.7));
      box-shadow: 0 0 10px var(--ruler-shadow, rgba(255, 107, 107, 0.5));
      z-index: 999999;
      pointer-events: none;
      display: none;
      transition: top 0.1s ease;
      border-radius: 15px;
  `;
  
  document.body.appendChild(ruler);
}

function updateRulerPosition(e) {
  if (ruler) {
    ruler.style.top = `${e.clientY}px`;
  }
}

// Apply settings
function applySettings() {
  chrome.storage.local.get(['contrast'], (result) => {
    document.body.style.filter = `contrast(${result.contrast || 1})`;
  });
}

// Initialize
createRuler();
applySettings();


// Apply font and contrast settings
function applySettings(root = document) {
  chrome.storage.local.get(
    ['dyslexiaActive', 'chosenFont', 'fontSize', 'lineHeight', 'letterSpacing', 'wordSpacing', 'contrast'], 
    (result) => {
      const styleId = 'reading-buddy-style';
      let style = root.getElementById(styleId);
      
      if (result.dyslexiaActive) {
        if (!style) {
          style = root.createElement('style');
          style.id = styleId;
          root.head.appendChild(style);
        }

        const fontMap = {
          "Andika": "Andika-Regular.woff2",
          "Atkinson Hyperlegible": "AtkinsonHyperlegible-Regular.woff2",
          "Fredoka": "Fredoka-Regular.woff2",
          "Lexie Readable": "LexieReadable-Regular.woff2",
          "Open Dyslexic": "OpenDyslexic-Regular.woff2"
        };

        const filename = fontMap[result.chosenFont];
        if (filename) {
          const fontURL = chrome.runtime.getURL(`fonts/${filename}`);
          style.textContent = `
            @font-face {
              font-family: '${result.chosenFont}';
              src: url('${fontURL}') format('woff2');
            }
            body, body *:not(script):not(style):not(noscript) {
              font-family: '${result.chosenFont}', sans-serif !important;
              font-size: ${result.fontSize || 1.0}rem !important;
              line-height: ${result.lineHeight || 1.6} !important;
              letter-spacing: ${result.letterSpacing || 0.05}em !important;
              word-spacing: ${result.wordSpacing || 0.1}em !important;
            }
          `;
        }
      } else if (style) {
        style.remove();
      }

      // Apply contrast
      root.body.style.filter = `contrast(${result.contrast || 1})`;
    }
  );
}

// Handle Shadow DOM
function injectInShadowRoot(node) {
  if (node.shadowRoot) {
    applySettings(node.shadowRoot);
    node.shadowRoot.querySelectorAll('*').forEach(injectInShadowRoot);
  }
}

// Listen for changes
chrome.storage.local.onChanged.addListener((changes) => {
  console.log('Storage changed:', changes);

  if (changes.rulerActive && ruler) {
    ruler.style.display = changes.rulerActive.newValue ? 'block' : 'none';
    if (changes.rulerActive.newValue) {
      document.addEventListener('mousemove', updateRulerPosition);
    } else {
      document.removeEventListener('mousemove', updateRulerPosition);
    }
  }

  if (changes.rulerColor && ruler) {
    const color = changes.rulerColor.newValue;
    if (color === "green") {
      ruler.style.setProperty('--ruler-bg', 'rgba(76, 175, 80, 0.4)');
      ruler.style.setProperty('--ruler-border', 'rgba(76, 175, 80, 0.7)');
      ruler.style.setProperty('--ruler-shadow', 'rgba(76, 175, 80, 0.5)');
    } else if (color === "blue") {
      ruler.style.setProperty('--ruler-bg', 'rgba(33, 150, 243, 0.4)');
      ruler.style.setProperty('--ruler-border', 'rgba(33, 150, 243, 0.7)');
      ruler.style.setProperty('--ruler-shadow', 'rgba(33, 150, 243, 0.5)');
    } else if (color === "red") {
      ruler.style.setProperty('--ruler-bg', 'rgba(244, 67, 54, 0.4)');
      ruler.style.setProperty('--ruler-border', 'rgba(244, 67, 54, 0.7)');
      ruler.style.setProperty('--ruler-shadow', 'rgba(244, 67, 54, 0.5)');
    } else if (color === "yellow") {
      ruler.style.setProperty('--ruler-bg', 'rgba(255, 235, 59, 0.4)');
      ruler.style.setProperty('--ruler-border', 'rgba(255, 235, 59, 0.7)');
      ruler.style.setProperty('--ruler-shadow', 'rgba(255, 235, 59, 0.5)');
    }
  }

  if (changes.dyslexiaActive || changes.chosenFont || changes.fontSize || 
      changes.lineHeight || changes.letterSpacing || changes.wordSpacing || 
      changes.contrast) {
    applySettings();
  }
});

// Handle dynamic content
const observer = new MutationObserver((mutations) => {
  applySettings();
  document.querySelectorAll('*').forEach(injectInShadowRoot);
});

observer.observe(document, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false
});

// Apply to Shadow DOM elements
document.querySelectorAll('*').forEach(injectInShadowRoot);

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateSettings") {
    applySettings();
    document.querySelectorAll('*').forEach(injectInShadowRoot);
    sendResponse({ status: "updated" });
  }
});
