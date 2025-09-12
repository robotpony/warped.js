(function() {
  'use strict';
  
  // Configuration and state
  const debug = true; // Set to false to disable console logging
  
  // Color system constants
  const COLOR_CONFIG = {
    STARTING_HUE: 14,        // Orange-red starting point
    MAX_HUE: 255,            // Blue-violet ending point
    SATURATION: 57,          // Saturation percentage
    LIGHTNESS: 62,           // Lightness percentage
    DEFAULT_OPACITY: 0.25,   // Default opacity (25%)
    HOVER_OPACITY: 1         // Hover opacity (100%)
  };
  
  /**
   * Namespace object containing all warped.js functionality for weblog theming
   * and visual enhancement. Provides rainbow link colorization and decorative
   * branding elements without external dependencies.
   * @namespace Warped
   */
  const Warped = {
    
    // Cache for frequently accessed DOM elements
    _cache: {
      body: null,
      targetedLinks: null,
      initialized: false
    },
    
    // Event delegation setup flag
    _eventDelegationSetup: false,
    
    // Debounce timeout storage for hover events
    _hoverDebounceTimeout: null,
    
    /**
     * Initialize DOM element cache to avoid repeated queries
     * @private
     */
    _initCache() {
      if (this._cache.initialized) return;
      
      this._cache.body = document.body;
      this._cache.targetedLinks = document.querySelectorAll(
        "article p>a, article li>a, header p.description a"
      );
      this._cache.initialized = true;
      this._d(`Cached ${this._cache.targetedLinks?.length || 0} targeted links`);
    },
    
    /**
     * Simple debounce utility for hover events
     * @private
     * @param {Function} func - Function to debounce
     * @param {number} delay - Delay in milliseconds (default 16ms for ~60fps)
     * @returns {Function} Debounced function
     */
    _debounce(func, delay = 16) {
      return (...args) => {
        clearTimeout(this._hoverDebounceTimeout);
        this._hoverDebounceTimeout = setTimeout(() => func.apply(this, args), delay);
      };
    },
    
    /**
     * Set up event delegation for hover effects on warped links
     * Uses a single event listener on document body instead of individual listeners
     * @private
     */
    _setupEventDelegation() {
      if (this._eventDelegationSetup || !this._cache.body) return;
      
      // Target selector for event delegation
      const targetSelector = "article p>a, article li>a, header p.description a";
      
      // Create debounced hover handlers for smooth performance
      const debouncedMouseover = this._debounce((target) => {
        try {
          const hoverColor = target.getAttribute("data-hue-hover");
          if (hoverColor && target.style) {
            target.style.borderBottomColor = hoverColor;
          }
        } catch (error) {
          this._d(`Error in debounced mouseover handler: ${error.message}`, true);
        }
      });
      
      const debouncedMouseout = this._debounce((target) => {
        try {
          const defaultColor = target.getAttribute("data-hue");
          if (defaultColor && target.style) {
            target.style.borderBottomColor = defaultColor;
          }
        } catch (error) {
          this._d(`Error in debounced mouseout handler: ${error.message}`, true);
        }
      });
      
      // Single mouseover handler for all targeted links
      this._cache.body.addEventListener("mouseover", (event) => {
        const target = event.target;
        if (target && target.matches && target.matches(targetSelector)) {
          debouncedMouseover(target);
        }
      });
      
      // Single mouseout handler for all targeted links
      this._cache.body.addEventListener("mouseout", (event) => {
        const target = event.target;
        if (target && target.matches && target.matches(targetSelector)) {
          debouncedMouseout(target);
        }
      });
      
      this._eventDelegationSetup = true;
      this._d("Event delegation with debouncing setup completed");
    },
    
    /**
     * Debug logging with conditional output based on debug flag
     * @param {string} text - Message to log to console
     * @param {boolean} forceLog - Override debug flag to force logging
     */
    _d(text, forceLog = false) {
      if (debug || forceLog) {
        console.log(text);
      }
    },

    /**
     * Add decorative brand bars to top and bottom of page
     * Creates flourish elements with horizontal lines for visual branding
     */
    warpBranding() {
      // Initialize cache if not already done
      this._initCache();
      
      // Validate that document.body exists before manipulation
      if (!this._cache.body) {
        this._d("Error: document.body not found, cannot add branding", true);
        return;
      }

      try {
        const brandBarElements = `<div class="flourish left"><hr><hr><hr><hr></div>
           <div class="flourish right"><hr><hr><hr><hr></div>`;

        const topContainer = document.createElement("div");
        if (!topContainer) {
          this._d("Error: Could not create top container element", true);
          return;
        }
        
        topContainer.innerHTML = brandBarElements;
        topContainer.classList.add("top", "warped-bar");
        
        // Check for firstChild to avoid null reference
        const firstChild = this._cache.body.firstChild;
        if (firstChild) {
          this._cache.body.insertBefore(topContainer, firstChild);
        } else {
          this._cache.body.appendChild(topContainer);
        }

        const bottomContainer = document.createElement("div");
        if (!bottomContainer) {
          this._d("Error: Could not create bottom container element", true);
          return;
        }
        
        bottomContainer.innerHTML = brandBarElements;
        bottomContainer.classList.add("bottom", "warped-bar");
        this._cache.body.appendChild(bottomContainer);

        this._d("w40 branding added");
      } catch (error) {
        this._d(`Error adding branding: ${error.message}`, true);
      }
    },

    /**
     * Apply rainbow gradient colors to a collection of links with hover effects
     * Distributes HSL colors evenly across all provided links
     * @param {NodeList|Array} links - Collection of anchor elements to colorize
     * @example
     * Warped.warpRainbowLinks(document.querySelectorAll('article a'));
     */
    warpRainbowLinks(links) {
      // Validate links parameter
      if (!links) {
        this._d("Error: links parameter is null or undefined", true);
        return;
      }

      if (!links.length && links.length !== 0) {
        this._d("Error: links parameter is not array-like (missing length property)", true);
        return;
      }

      const totalLinks = links.length;
      if (totalLinks === 0) {
        this._d("No links found");
        return;
      }

      try {
        const { STARTING_HUE, MAX_HUE, SATURATION, LIGHTNESS, DEFAULT_OPACITY, HOVER_OPACITY } = COLOR_CONFIG;
        let hue = STARTING_HUE;
        // Calculate even distribution of colors across all links
        const increment = Math.round((MAX_HUE - STARTING_HUE) / totalLinks);

        links.forEach((link, index) => {
          // Validate each link element
          if (!link || !link.nodeType || link.nodeType !== Node.ELEMENT_NODE) {
            this._d(`Warning: Skipping invalid link at index ${index}`, true);
            return;
          }

          try {
            // Generate HSL colors using configuration constants
            const hslaColorDefault = `hsla(${hue}, ${SATURATION}%, ${LIGHTNESS}%, ${DEFAULT_OPACITY})`;
            const hslaColorHover = `hsla(${hue}, ${SATURATION}%, ${LIGHTNESS}%, ${HOVER_OPACITY})`;

            // Store colors as data attributes for hover event handlers
            link.setAttribute("data-hue", hslaColorDefault);
            link.setAttribute("data-hue-hover", hslaColorHover);

            // Apply default color to bottom border
            if (link.style) {
              link.style.borderBottomColor = hslaColorDefault;
            }

          } catch (error) {
            this._d(`Error processing link at index ${index}: ${error.message}`, true);
          }

          // Advance to next color, wrapping back to start if needed
          hue += increment;
          if (hue > MAX_HUE) {
            hue = STARTING_HUE;
          }
        });
      } catch (error) {
        this._d(`Error in warpRainbowLinks: ${error.message}`, true);
      }
    },

    /**
     * Initialize the warped theme system
     * Automatically applies rainbow colors to targeted links and adds branding
     */
    init() {
      try {
        this._d("w40 theme starting");

        // Validate document exists
        if (!document) {
          this._d("Error: document not available", true);
          return;
        }

        // Initialize cache for performance
        this._initCache();
        
        // Set up event delegation for hover effects
        this._setupEventDelegation();

        // Apply rainbow colors to cached targeted links
        if (this._cache.targetedLinks && this._cache.targetedLinks.length > 0) {
          this.warpRainbowLinks(this._cache.targetedLinks);
        } else {
          this._d("Warning: No targeted links found in cache", true);
        }

        // Add decorative brand flourishes
        this.warpBranding();

        this._d("w40 theme installed");
      } catch (error) {
        this._d(`Error initializing warped theme: ${error.message}`, true);
      }
    }
  };

  // Auto-initialize when DOM is ready
  try {
    if (document && document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => Warped.init());
    } else if (document) {
      Warped.init();
    }
  } catch (error) {
    console.error(`Error in warped.js auto-initialization: ${error.message}`);
  }

})();
