function applyFontStyles(root = document) {
  chrome.storage.local.get(['dyslexiaActive', 'chosenFont', 'fontSize'], (result) => {
    const active = result.dyslexiaActive;
    const chosenFont = result.chosenFont || "Open Dyslexic";
    const fontSize = result.fontSize || 1.0;

    const styleId = 'reading-buddy-style';
    let style = root.getElementById(styleId);
    
    if (active) {
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

      const filename = fontMap[chosenFont];
      if (filename) {
        const fontURL = chrome.runtime.getURL(`fonts/${filename}`);
        style.textContent = `
          @font-face {
            font-family: '${chosenFont}';
            src: url('${fontURL}') format('woff2');
          }
          body, body *:not(script):not(style):not(noscript) {
            font-family: '${chosenFont}', sans-serif !important;
            font-size: ${fontSize}rem !important;
            line-height: 1.6 !important;
            letter-spacing: 0.05em !important;
          }
        `;
      }
    } else if (style) {
      style.remove();
    }
  });
}

// Apply to main document
applyFontStyles();

// Handle dynamic content
const observer = new MutationObserver((mutations) => {
  applyFontStyles();
  document.querySelectorAll('*').forEach(injectInShadowRoot);
});

observer.observe(document, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false
});

// Handle Shadow DOM
function injectInShadowRoot(node) {
  if (node.shadowRoot) {
    applyFontStyles(node.shadowRoot);
    node.shadowRoot.querySelectorAll('*').forEach(injectInShadowRoot);
  }
}

document.querySelectorAll('*').forEach(injectInShadowRoot);

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateFont") {
    applyFontStyles();
    document.querySelectorAll('*').forEach(injectInShadowRoot);
    sendResponse({ status: "updated" });
  }
});
