var debug = true;

function _d(text) {
  if (debug) {
    console.log(text);
  }
}

function warpBranding() {
  var brandBarElements = `<div class="flourish left"><hr><hr><hr><hr></div>
         <div class="flourish right"><hr><hr><hr><hr></div>`;

  var topContainer = document.createElement("div");
  topContainer.innerHTML = brandBarElements;
  topContainer.classList.add("top", "warped-bar");
  document.body.insertBefore(topContainer, document.body.firstChild);

  var bottomContainer = document.createElement("div");
  bottomContainer.innerHTML = brandBarElements;
  bottomContainer.classList.add("bottom", "warped-bar");
  document.body.appendChild(bottomContainer, document.body);

  _d("w40 branding added");
}

/* Colourize a set of <a> links (including hovers) */
function warpRainbowLinks(links) {
  var totalLinks = links.length,
    startingHue = 14,
    maxHue = 255,
    hue = startingHue,
    hueAttr = "data-hue",
    increment = Math.round((maxHue - startingHue) / totalLinks);

  if (totalLinks == 0) {
    _d("No links found");
    return;
  }

  links.forEach((link) => {
    var hslaColorDefault = "hsla(" + hue + ", 57%, 62%, .25)";
    var hslaColorHover = "hsla(" + hue + ", 57%, 62%, 1)";

    link.setAttribute("data-hue", hslaColorDefault);
    link.setAttribute("data-hue-hover", hslaColorHover);

    link.style.borderBottomColor = hslaColorDefault;

    link.addEventListener("mouseover", function (event) {
      var l = event.target;
      l.style.borderBottomColor = l.getAttribute("data-hue-hover");
    });
    link.addEventListener("mouseout", function (event) {
      var l = event.target;
      l.style.borderBottomColor = l.getAttribute("data-hue");
    });

    hue += increment;
    if (hue > maxHue) {
      hue = startingHue;
    }
  });
}

_d("w40 theme starting");

// colourize article links
warpRainbowLinks(
  document.querySelectorAll(
    "article p>a, article li>a, header p.description a",
  ),
);
// add warped brand flourishes
warpBranding();

_d("w40 theme installed");
