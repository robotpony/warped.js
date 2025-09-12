# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

warped.js is a single-file vanilla JavaScript library for weblog theming and visual enhancement. It provides rainbow link colorization and decorative branding elements without any external dependencies.

## Architecture

**Single File Structure:**
- `warped.js` - Main script containing all functionality
- No build process or package management required
- Designed to be included directly in HTML pages

**Core Components:**
- Debug logging system (`_d` function) with conditional console output
- Brand bar creation (`warpBranding`) - adds decorative flourishes to page top/bottom
- Rainbow link colorization (`warpRainbowLinks`) - applies HSL gradient colors to links
- Automatic initialization targeting specific selectors: `article p>a`, `article li>a`, `header p.description a`

**Color System:**
- Uses HSL color space for smooth gradients
- Starting hue: 14, max hue: 255
- Saturation: 57%, Lightness: 62%
- Default opacity: 0.25, hover opacity: 1.0
- Colors distributed evenly across all targeted links

## Development Notes

**Planned Improvements (see README.md):**
- Module pattern with IIFE wrapper to avoid global pollution
- Modern ES6+ syntax (const/let, arrow functions, template literals)
- Error handling for DOM manipulation
- Performance optimizations (event delegation, cached selectors)
- Extract configuration constants from inline magic numbers

**Current Implementation:**
- Uses `var` declarations and function expressions
- Direct DOM manipulation with individual event listeners
- Global scope functions
- Inline configuration values