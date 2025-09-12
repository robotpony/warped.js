# warped.js

A lightweight vanilla JavaScript library for weblog theming and visual enhancement. Provides rainbow link colorization and decorative branding elements without any external dependencies.

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
```

## Features

* **Rainbow Link Colorization** - Applies gradient HSL colors to targeted links
* **Interactive Hover Effects** - Links intensify color on mouseover
* **Decorative Brand Bars** - Adds flourish elements to top and bottom of page
* **Automatic Color Distribution** - Evenly distributes colors across all links
* **Selective Targeting** - Only affects `article p>a`, `article li>a`, and `header p.description a`
* **Zero Dependencies** - Pure vanilla JavaScript implementation
* **Semantic HTML** - Enhances existing structure without breaking it

## Configuration

The color system uses HSL values that can be customized by editing the source:

```javascript
const startingHue = 14;    // Orange-red starting point
const maxHue = 255;        // Blue-violet ending point
// Saturation: 57%, Lightness: 62%
// Default opacity: 25%, Hover opacity: 100%
```

Debug logging can be toggled:

```javascript
const debug = true; // Set to false to disable console logging
```

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

### Warped._d(text)

Debug logging function (internal use).

**Parameters:**
- `text` (string) - Message to log to console


