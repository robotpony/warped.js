# warped.js

A lightweight vanilla JavaScript library for weblog theming and visual enhancement. Provides rainbow link colorization, decorative branding elements, and automatic code diagram styling without any external dependencies.

## Installation

Include the script in your HTML page:

```html
<script src="warped.js"></script>
```

The script will automatically initialize when the DOM is ready.

## Usage

warped.js automatically targets specific elements in your HTML:

```html
<!-- These links will be colorized -->
<article>
  <p><a href="#">Article paragraph link</a></p>
  <ul>
    <li><a href="#">Article list link</a></li>
  </ul>
</article>

<header>
  <p class="description"><a href="#">Header description link</a></p>
</header>

<!-- These paragraphs will become centered code grams -->
<div class="post-content">
  <p><code>Novel → Expensive → Common → Invisible</code></p>
  <p><code>Input → Process → Output</code></p>
</div>
```

## Features

* **Rainbow Link Colorization** - Applies gradient HSL colors to targeted links
* **Interactive Hover Effects** - Links intensify color on mouseover
* **Decorative Brand Bars** - Adds flourish elements to top and bottom of page
* **Warped Grams** - Automatically styles code-only paragraphs as centered mini diagrams
* **Automatic Color Distribution** - Evenly distributes colors across all links
* **Selective Targeting** - Only affects `article p>a`, `article li>a`, and `header p.description a`
* **Zero Dependencies** - Pure vanilla JavaScript implementation
* **Semantic HTML** - Enhances existing structure without breaking it

## Configuration

warped.js can be configured by setting `window.WarpedConfig` before loading the script:

```html
<script>
// Configure warped.js before loading
window.WarpedConfig = {
  debug: false,
  brandColours: {
    STARTING_HUE: 180,        // Blue starting point
    MAX_HUE: 300,             // Purple ending point
    SATURATION: 70,           // Saturation percentage
    LIGHTNESS: 50,            // Lightness percentage
    DEFAULT_OPACITY: 0.3,     // Default opacity
    HOVER_OPACITY: 1          // Hover opacity
  },
  selectors: "article a, .content a",  // Custom link selectors
  enableBranding: true,       // Show/hide brand bars
  enableCodeGrams: true,      // Enable code gram detection
  debounceDelay: 16           // Hover debounce delay (0 to disable)
};
</script>
<script src="warped.js"></script>
```

### Configuration Options

* **debug** - Enable/disable console logging
* **brandColours** - HSL color configuration object
* **selectors** - CSS selectors for rainbow links
* **enableBranding** - Show/hide decorative brand bars
* **enableCodeGrams** - Auto-detect and style code-only paragraphs
* **debounceDelay** - Hover effect debounce delay in milliseconds

## Browser Support

Compatible with all modern browsers that support:
- ES6 const/let declarations
- Arrow functions
- Document.querySelector/querySelectorAll
- addEventListener

## API Reference

### Warped.init()

Initialize the warped theme system. Called automatically when DOM is ready.

```javascript
Warped.init();
```

### Warped.warpRainbowLinks(links)

Apply rainbow gradient colors to a collection of links.

**Parameters:**
- `links` (NodeList|Array) - Collection of anchor elements to colorize

**Example:**
```javascript
// Colorize all article links
const articleLinks = document.querySelectorAll('article a');
Warped.warpRainbowLinks(articleLinks);
```

### Warped.warpBranding()

Add decorative brand bars to top and bottom of page.

```javascript
Warped.warpBranding();
```

### Warped.warpCodeGrams()

Detect and style paragraphs containing only code elements as centered mini diagrams.

```javascript
Warped.warpCodeGrams();
```

**Targets:**
- `<p>` elements within `.post-content` blocks
- That contain only `<code>` elements (and whitespace)
- Adds `.code-gram` class for styling

**Example:**
```html
<!-- Before -->
<div class="post-content">
  <p><code>Start → Middle → End</code></p>
</div>

<!-- After -->
<div class="post-content">
  <p class="code-gram"><code>Start → Middle → End</code></p>
</div>
```

### Warped._d(text)

Debug logging function (internal use).

**Parameters:**
- `text` (string) - Message to log to console


