# Proposal: shared warped core for Bruce's sites

Status: accepted as direction, 2026-10-26. Nothing is built yet, and no site or warped.js change is planned now; future releases will adopt this a piece at a time. Sources: the warped.js repo, and inventories from the bruce-loves-to-cook and space-command site sessions (both checked against their code).

## Abstract

warped.js gets a small shared core of behaviours that any of Bruce's sites can use: configurable accent links, a configurable stripe, a popover placer and a `<details>` close helper. The core shares code only, not a look. Each site keeps its own markup, styling, colours and fonts and passes them in as configuration. w42's current behaviour becomes one configuration of the core, and its theme layer (PaperMod overrides, fonts, code grams) stays where it is.

## Decisions (Bruce, 2026-10-26)

1. Shared code only. No family look, no shared palette or tokens.
2. Link styling MUST be configurable, including the colour gradient. The gradient MAY be passed as a constant or as a function.
3. Markup and styling MUST NOT be standardized by warped.js. The footer is out of scope.
4. No versioned URLs for now. Sites stay in sync with the main copy, so changes MUST be careful and backwards-compatible.
5. Two files: the core lives in `core/warped-core.{js,css}`, separate from w42's warped.{js,css}.

## What's shared, and why

| Module | Comes from | Who'd use it |
|---|---|---|
| Accent links | warped.js `warpRainbowLinks` + hover handlers; cook site's `.wikilink`/`.extlink` underline | w42, cook; space-command if it wants |
| Stripe | warped.js `warpBranding`; space-command's CSS `.stripe` | w42, space-command |
| Popover placer | fugu popover.js (69 lines) | cook; anyone with hover/focus popovers |
| Details-close | cook site's inline drawer script (header/basic.html:129) | cook; space-command's menus if it gets real ones |

Not shared: code grams (w42 only; they overlap the build-time fence work), fonts, colour tokens, the footer, the cookbook scripts (ingredients, sidebar, TOC, search), and space-command's teaser script.

## Specification

### Layout

```
warped.js/
  core/
    warped-core.js    links, stripe, popover, details-close
    warped-core.css   the mechanics only: uses custom properties, sets no colours or fonts
  warped.js           w42 entry: sets w42's config, keeps code grams
  warped.css          w42 theme layer, unchanged
```

The core MUST NOT reference PaperMod, Blowfish, fugu or any site's markup. It acts only on selectors and options it's given. Every module MUST do nothing when its config is absent or its selectors match nothing, and pages MUST still work without JS.

### Config

One global, read once at load. It's `window.WarpedConfig`, as today:

```js
window.WarpedConfig = {
  links: {
    selectors: "article p a:not(sup a, code a), article li a:not(sup a, code a)",
    line: "border",            // "border" (border-bottom) or "underline" (text-decoration)
    width: "4px",
    offset: "3px",             // underline only
    colour: Warped.hues({ start: 14, end: 255, s: 57, l: 62 }),
    rest: 0.25,                // opacity at rest
    hover: 1,                  // opacity on hover and focus
  },
  stripe: { ... },             // see below
  popover: true,
  detailsClose: true,
};
```

`links.colour` takes any of:

- a CSS colour string, giving one colour for every link (`"var(--accent)"`, `"#d6a668"`);
- an array of colour stops, spread evenly across the links in document order;
- a function `(index, total, link) => cssColour`, for any gradient or rule a site wants.

The core ships one helper, `Warped.hues({ start, end, s, l })`, which returns the function w42 uses today: HSL hues from `start` to `end`, wrapping. With the defaults above, w42 looks exactly as it does now.

Implementation: the JS sets one custom property per link, `--warped-link: <colour>`. warped-core.css does the rest: rest and hover colours through `color-mix(in srgb, var(--warped-link) <rest%>, transparent)`, `:hover` and `:focus-visible`, and the transition. This replaces `_setupEventDelegation`, `_debounce` and the `data-hue` attributes (about 70 lines). Hover then works with keyboard focus too and costs no JS per event. `debounceDelay` stays accepted and ignored, for compatibility.

The top-level `selectors` and `brandColours` keys keep working, mapped onto `links`, so w42's existing config and the README examples don't break.

### Stripe

```js
stripe: {
  into: "body",              // where to insert: a selector; or false, and the site writes its own <div class="warped-stripe">
  where: ["top", "bottom"],
  ends: ["#68d6a1", "#d6cb68", "#d6a668", "#d68168"],   // blocks at each end, mirrored
  bar: "#689fd6",
  block: "30px",
  height: { top: "15px", bottom: "5px" },
  fixed: true,
}
```

`ends` also accepts a function `(i, n) => colour`, like `links.colour`. The JS only inserts the element (if asked) and writes the colours to custom properties. CSS draws the bar as one gradient, after space-command's `.stripe`, so a site that writes its own element and sets the properties needs no JS at all. w42's config reproduces the current bars. space-command can adopt it or keep its own.

### Popover and details-close

- **Popover:** fugu's popover.js moves into the core unchanged, with the same contract (`.pop-host`, `.pop`, `.pop-up`, `.pop-flip`, `--pop-x`). Styling stays with each site.
- **Details-close:** any `details[data-warped-close]` closes when you click outside it, and `[data-warped-close-for="<id>"]` closes a drawer by id. This is a generic version of the cook site's drawer and nav-drop script.

## Distribution and keeping in sync

There are no versions or tags for now (decision 4). Each site uses the current main copy:

| Site | How it gets the core |
|---|---|
| w42 | CDN, as today (`cdn.warpedvisions.org/core/…`; w42 already adds `?v=<hash>` itself) |
| bruce-loves-to-cook | a copy in `assets/` taken from main, through Hugo Pipes with SRI |
| space-command | a copy inlined or staged by deploy.sh, keeping its "no third-party loads" promise |

What that requires:

- Config keys MUST only be added, never renamed or removed. Defaults MUST NOT change what an existing site sees.
- The core gets a short `core/CONSUMERS.md` listing which site uses which module and how it's loaded, so a change shows who to tell.
- After any core change, tell the site sessions (warped-agent, the cook site's session or fugu-agent, space-command content), so the copying sites refresh their copy.
- If the copies drift, revisit versioned URLs.

## Risks

- **w42 regressions.** Moving links to a custom property and CSS hover must render identically with the default config. Check with a side-by-side preview through warped-agent before deploying.
- **Ownership.** popover.js moves out of fugu, so fugu-agent must agree first.
- **CSP.** The new `core/` path is on the same CDN host, so w42's CSP needs no change. Tell warped-agent before the first deploy, per the deploy rule.

## Plan

No work is scheduled. When a future warped.js release touches links, the stripe or popovers, build that piece into `core/` as specified here, keeping w42's look unchanged by default. Steps, in order, when the time comes:

1. Links and stripe into `core/`, with w42's warped.js as a thin config over them. Preview with warped-agent, then deploy with Bruce's OK.
2. Popover and details-close, once fugu-agent agrees to the move.
3. Other sites adopt modules on their own schedule.
