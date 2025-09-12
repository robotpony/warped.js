(function() {
  'use strict';
  
  // Configuration and state
  const debug = true; // Set to false to disable console logging
  
  /**
   * Namespace object containing all warped.js functionality for weblog theming
   * and visual enhancement. Provides rainbow link colorization and decorative
   * branding elements without external dependencies.
   * @namespace Warped
   */
  const Warped = {
    
    /**
     * Debug logging with conditional output based on debug flag
     * @param {string} text - Message to log to console
     */
    _d(text) {
      if (debug) {
        console.log(text);
      }
    },

    /**
     * Add decorative brand bars to top and bottom of page
     * Creates flourish elements with horizontal lines for visual branding
     */
    warpBranding() {
      const brandBarElements = `<div class="flourish left"><hr><hr><hr><hr></div>
         <div class="flourish right"><hr><hr><hr><hr></div>`;

      const topContainer = document.createElement("div");
      topContainer.innerHTML = brandBarElements;
      topContainer.classList.add("top", "warped-bar");
      document.body.insertBefore(topContainer, document.body.firstChild);

      const bottomContainer = document.createElement("div");
      bottomContainer.innerHTML = brandBarElements;
      bottomContainer.classList.add("bottom", "warped-bar");
      document.body.appendChild(bottomContainer);

      this._d("w40 branding added");
    },

    /**
     * Apply rainbow gradient colors to a collection of links with hover effects
     * Distributes HSL colors evenly across all provided links
     * @param {NodeList|Array} links - Collection of anchor elements to colorize
     * @example
     * Warped.warpRainbowLinks(document.querySelectorAll('article a'));
     */
    warpRainbowLinks(links) {
      const totalLinks = links.length;
      // HSL color system configuration
      const startingHue = 14;    // Orange-red starting point
      const maxHue = 255;        // Blue-violet ending point
      let hue = startingHue;
      // Calculate even distribution of colors across all links
      const increment = Math.round((maxHue - startingHue) / totalLinks);

      if (totalLinks == 0) {
        this._d("No links found");
        return;
      }

      links.forEach((link) => {
        // Generate HSL colors: 57% saturation, 62% lightness
        const hslaColorDefault = "hsla(" + hue + ", 57%, 62%, .25)";  // 25% opacity default
        const hslaColorHover = "hsla(" + hue + ", 57%, 62%, 1)";      // Full opacity on hover

        // Store colors as data attributes for hover event handlers
        link.setAttribute("data-hue", hslaColorDefault);
        link.setAttribute("data-hue-hover", hslaColorHover);

        // Apply default color to bottom border
        link.style.borderBottomColor = hslaColorDefault;

        link.addEventListener("mouseover", function (event) {
          const l = event.target;
          l.style.borderBottomColor = l.getAttribute("data-hue-hover");
        });
        link.addEventListener("mouseout", function (event) {
          const l = event.target;
          l.style.borderBottomColor = l.getAttribute("data-hue");
        });

        // Advance to next color, wrapping back to start if needed
        hue += increment;
        if (hue > maxHue) {
          hue = startingHue;
        }
      });
    },

    /**
     * Initialize the warped theme system
     * Automatically applies rainbow colors to targeted links and adds branding
     */
    init() {
      this._d("w40 theme starting");

      // Apply rainbow colors to targeted link selectors
      this.warpRainbowLinks(
        document.querySelectorAll(
          "article p>a, article li>a, header p.description a",
        ),
      );
      // Add decorative brand flourishes
      this.warpBranding();

      this._d("w40 theme installed");
    }
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Warped.init());
  } else {
    Warped.init();
  }

})();
