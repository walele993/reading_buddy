document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    toggle: document.getElementById('toggleFont'),
    fontSelect: document.getElementById('fontSelect'),
    fontSize: document.getElementById('fontSize'),
    sizeValue: document.getElementById('sizeValue'),
    reset: document.getElementById('resetSettings')
  };

  // Load settings
  chrome.storage.local.get(['dyslexiaActive', 'chosenFont', 'fontSize'], (result) => {
    const active = result.dyslexiaActive || false;
    elements.toggle.querySelector('span').textContent = active ? "Disable" : "Enable";
    elements.fontSelect.value = result.chosenFont || "Open Dyslexic";
    elements.fontSize.value = result.fontSize || 1.0;
    elements.sizeValue.textContent = `${parseFloat(elements.fontSize.value).toFixed(1)}x`;
  });

  // Update tab function
  const updateActiveTab = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      tabs[0]?.id && chrome.tabs.sendMessage(tabs[0].id, {action: "updateFont"});
    });
  };

  // Event handlers
  elements.toggle.addEventListener('click', () => {
    chrome.storage.local.get(['dyslexiaActive'], (result) => {
      const newActive = !(result.dyslexiaActive || false);
      chrome.storage.local.set({dyslexiaActive: newActive}, () => {
        elements.toggle.querySelector('span').textContent = newActive ? "Disable" : "Enable";
        updateActiveTab();
      });
    });
  });

  elements.fontSelect.addEventListener('change', () => {
    chrome.storage.local.set({chosenFont: elements.fontSelect.value}, updateActiveTab);
  });

  elements.fontSize.addEventListener('input', () => {
    const size = parseFloat(elements.fontSize.value);
    elements.sizeValue.textContent = `${size.toFixed(1)}x`;
    chrome.storage.local.set({fontSize: size}, updateActiveTab);
  });

  elements.reset.addEventListener('click', () => {
    chrome.storage.local.clear(() => {
      location.reload();
      chrome.tabs.reload();
    });
  });
});