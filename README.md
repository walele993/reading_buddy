# Reading Buddy

**Reading Buddy** is a Chrome extension designed to enhance web reading accessibility with a focus on dyslexia-friendly features. It provides customizable text appearance adjustments and an interactive reading ruler, making online content easier to read and navigate.

---

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Dyslexia-Friendly Fonts**  
  Choose from a curated list of fonts optimized for dyslexic readers, including:
  - Open Dyslexic
  - Atkinson Hyperlegible
  - Lexie Readable
  - Andika
  - Fredoka

- **Customizable Text Appearance**  
  Granular control over reading experience:
  - Font size (0.8x-1.8x)
  - Line height (1.0-2.5x)
  - Letter spacing (-0.1em-0.5em)
  - Word spacing (0-1.0em)
  - Advanced typography controls in collapsible section

- **Smart Contrast Adjustment**  
  New in v1.2: Dynamic contrast slider (0.5x-3x) with real-time preview

- **Enhanced Reading Ruler**  
  Improved ruler design featuring:
  - Smooth position transitions
  - Rounded edges
  - Multiple color presets
  - Dynamic shadow effects

- **Dark Mode Support**  
  Automatic adaptation to system preferences
  - Custom-tuned dark theme colors
  - Preserves readability in low-light conditions

- **Cross-Platform Compatibility**  
  Full support for:
  - Dynamic content loading
  - Shadow DOM elements
  - Iframe content
  - Single-page applications

- **Performance Optimizations**  
  - MutationObserver for dynamic content
  - Debounced event handlers
  - CSS-based animations

---

## Usage

1. **Color & Contrast Adjustment**  
   Use the dedicated contrast slider in the "Color & Contrast" section to optimize text-background relationships.

2. **Advanced Typography Controls**  
   Access detailed spacing controls through the expandable "Advanced Settings" section.

3. **Dark Mode Adaptation**  
   The extension automatically switches themes based on your system preferences while maintaining readability.

4. **Persistent Settings**  
   All preferences persist across sessions and pages, with automatic application to new content.

---

## How It Works

### Enhanced Features Implementation

- **Contrast Engine**  
  Uses CSS `filter: contrast()` with fallback values for maximum compatibility

- **Font Handling**  
  - Web-accessible font resources
  - Dynamic `@font-face` injection
  - Cross-origin font loading

- **Shadow DOM Support**  
  Recursive shadow root traversal with:
  - Style encapsulation detection
  - Per-root style injection
  - MutationObserver integration

- **Performance Features**  
  - Debounced DOM mutation handling
  - CSS custom properties for ruler styling
  - RequestAnimationFrame for smooth transitions

- **Accessibility**  
  - Semantic HTML in popup
  - ARIA-compliant controls
  - System contrast ratio preservation

---

## Development Updates

### New in v1.2

- Added contrast adjustment subsystem
- Implemented dark mode support
- Introduced collapsible sections in UI
- Added shadow DOM content handling
- Improved font loading reliability
- Enhanced ruler visual design

### Updated Project Structure

- **Dark Mode CSS**  
  `prefers-color-scheme` media queries in popup.css

- **Font Resources**  
  Web-accessible font files in `/fonts`

- **Shadow DOM Handling**  
  Recursive injection logic in content.js

---

## Contributing

We particularly welcome contributions in these areas:
- Additional dark mode variants
- Contrast calculation algorithms
- Performance benchmarking
- Cross-browser compatibility

---

## Credits
Created by **Gabriele Meucci** – Focusing on digital accessibility solutions.

**Happy reading! 📖**  
*Every word matters when it's accessible to all.*

