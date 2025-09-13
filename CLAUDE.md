# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

warped.js is a single-file vanilla JavaScript library for weblog theming and visual enhancement. It provides rainbow link colorization, decorative branding elements, and automatic code diagram styling (warped grams) without any external dependencies.

## Architecture

**Single File Structure:**
- `warped.js` - Main script containing all functionality
- No build process or package management required
- Designed to be included directly in HTML pages

**Core Components:**
- Debug logging system (`_d` function) with conditional console output
- Brand bar creation (`warpBranding`) - adds decorative flourishes to page top/bottom
- Rainbow link colorization (`warpRainbowLinks`) - applies HSL gradient colors to links
- Code grams (`warpCodeGrams`) - detects and styles code-only paragraphs as mini diagrams
- Global configuration system via `window.WarpedConfig` object
- Automatic initialization targeting specific selectors: `article p>a`, `article li>a`, `header p.description a`

**Color System:**
- Uses HSL color space for smooth gradients
- Starting hue: 14, max hue: 255
- Saturation: 57%, Lightness: 62%
- Default opacity: 0.25, hover opacity: 1.0
- Colors distributed evenly across all targeted links

## Development Notes

**Recent Improvements:**
- ✅ Module pattern with IIFE wrapper to avoid global pollution
- ✅ Modern ES6+ syntax (const/let, arrow functions, template literals)  
- ✅ Error handling for DOM manipulation
- ✅ Performance optimizations (event delegation, cached selectors)
- ✅ External configuration system via `window.WarpedConfig`
- ✅ Warped grams feature for automatic code diagram styling

**Current Implementation:**
- Modern ES6+ syntax (const/let, arrow functions, template literals)
- IIFE wrapper to avoid global pollution
- Event delegation with debounced hover handlers for performance
- Cached DOM selectors and error handling
- External configuration via `window.WarpedConfig`
- Configurable features (branding, code grams, selectors, colors, debug mode)