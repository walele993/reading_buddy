# Reading Buddy

## Overview
**Reading Buddy** is a browser extension designed to enhance reading accessibility by providing dyslexia-friendly fonts and customizable text settings. This extension helps users tailor their reading experience with specialized fonts and adjustable text sizing. *Note: This project is currently a work in progress and not yet officially released.*

---

## Features
- **Dyslexia-Friendly Fonts**: Choose from 5+ accessibility-optimized fonts
- **Text Sizing**: Adjust font size from 0.8x to 1.8x of original size
- **Real-Time Application**: Changes apply instantly to all page content
- **Cross-Site Compatibility**: Works on most websites including Google
- **Persistent Settings**: Remembers user preferences between sessions
- **Reset Functionality**: Restore default settings with one click

---

## Technologies Used
- **HTML**: Popup interface structure
- **CSS**: Modern styling with flexbox and grid
- **JavaScript**: Font injection and settings management
- **Chrome Extensions API**: Storage, scripting, and tabs APIs

---

## File Structure
reading-buddy/
├── icons/
│ ├── icon16.png
│ ├── icon48.png
│ └── icon128.png
├── fonts/
│ ├── Andika-Regular.woff2
│ ├── AtkinsonHyperlegible-Regular.woff2
│ └── ...other font files
├── manifest.json
├── popup.html
├── popup.css
├── popup.js
└── content.js

---

## How It Works
1. **Font Injection**:
   - Dynamically injects selected font using CSS `@font-face`
   - Applies styles to all page elements including dynamic content
   - Handles Shadow DOM components and iframes

2. **Settings Management**:
   - Stores user preferences using `chrome.storage.local`
   - Syncs settings across all open tabs
   - Uses MutationObserver to handle dynamic content changes

3. **Accessibility Features**:
   - Adjusts line height and letter spacing for readability
   - Maintains text hierarchy while applying styles
   - Preserves original page layout

---

## Installation *(Development Preview)*
1. Clone/download the repository
2. In Chrome: `chrome://extensions/`
3. Enable **Developer Mode** (top-right toggle)
4. Click **Load unpacked** and select the extension folder

---

## Usage
1. Click the extension icon to open the control panel
2. Toggle font adjustment with the main switch
3. Select preferred font from dropdown
4. Adjust font size using the slider
5. Reset to defaults with the reset button

---

## Customization
- **Add Fonts**: Add new WOFF2 fonts to `/fonts` and update:
  - `manifest.json` web resources
  - Font mapping in `content.js`
- **Adjust Size Range**: Modify `min`/`max` values in popup.html
- **UI Colors**: Update CSS variables in `popup.css`

---

## APIs Used
- **Chrome Storage API**: Persistent settings storage
- **Chrome Scripting API**: Content script management
- **Chrome Tabs API**: Cross-tab communication
- **Chrome Runtime API**: Extension messaging

---

## Future Improvements
- [ ] Text spacing customization
- [ ] Contrast adjustment options
- [ ] Per-website configuration
- [ ] Font weight adjustment
- [ ] Keyboard shortcuts
- [ ] Export/import settings

---

## Development Status
⚠️ **Work in Progress**  
This extension is under active development. Current features are functional but may have compatibility issues with some websites. Contributions welcome!

---

## Conclusion
Reading Buddy aims to make web content more accessible for users with dyslexia and visual impairments. While still in development, it already provides powerful tools to customize reading experiences. Stay tuned for updates!

---

## Credits
Created by Gabriele Meucci - Focusing on digital accessibility solutions

---

**Happy reading! 📖**  
*Every word matters when it's accessible to all.*
