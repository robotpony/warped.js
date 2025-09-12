(function() {
  'use strict';
  
  // Configuration and state
  const debug = true;
  
  // Create namespace object for warped functionality
  const Warped = {
    
    // Debug logging with conditional output
    _d(text) {
      if (debug) {
        console.log(text);
      }
    },

    // Add decorative brand bars to page
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
      document.body.appendChild(bottomContainer, document.body);

      this._d("w40 branding added");
    },

    // Colourize a set of <a> links (including hovers)
    warpRainbowLinks(links) {
      const totalLinks = links.length;
      const startingHue = 14;
      const maxHue = 255;
      let hue = startingHue;
      const increment = Math.round((maxHue - startingHue) / totalLinks);

      if (totalLinks == 0) {
        this._d("No links found");
        return;
      }

      links.forEach((link) => {
        const hslaColorDefault = "hsla(" + hue + ", 57%, 62%, .25)";
        const hslaColorHover = "hsla(" + hue + ", 57%, 62%, 1)";

        link.setAttribute("data-hue", hslaColorDefault);
        link.setAttribute("data-hue-hover", hslaColorHover);

        link.style.borderBottomColor = hslaColorDefault;

        link.addEventListener("mouseover", function (event) {
          const l = event.target;
          l.style.borderBottomColor = l.getAttribute("data-hue-hover");
        });
        link.addEventListener("mouseout", function (event) {
          const l = event.target;
          l.style.borderBottomColor = l.getAttribute("data-hue");
        });

        hue += increment;
        if (hue > maxHue) {
          hue = startingHue;
        }
      });
    },

    // Initialize the warped theme
    init() {
      this._d("w40 theme starting");

      // colourize article links
      this.warpRainbowLinks(
        document.querySelectorAll(
          "article p>a, article li>a, header p.description a",
        ),
      );
      // add warped brand flourishes
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
