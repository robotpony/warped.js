# warped.js

A simple script for my weblog, for fun visual improvements, and branding.

## Features

* Debug logging system - Conditional console logging controlled by debug flag
* Brand bar creation - Adds decorative flourish bars at top and bottom of page with horizontal lines
* Rainbow link colorization - Applies gradient HSL colors to article and header links
* Interactive hover effects - Links change color intensity on mouseover/mouseout
* Automatic color distribution - Calculates hue increments based on total number of links
* Selective targeting - Specifically targets links in articles, lists, and header descriptions
* Vanilla JavaScript implementation - No external dependencies or frameworks
* Semantic HTML enhancement - Adds visual improvements without breaking existing structure
* Weblog theming focus - Designed specifically for blog/weblog visual branding

## Tech

* Vanilla JavaScript - No frameworks or libraries
* Semantic HTML - Standard HTML structure

## Plan

2. Modern JavaScript:

* Use template literals consistently (already used in one place)
* Arrow functions for cleaner syntax
* querySelector optimization with cached selectors

3. Error Handling:

* Add null checks for DOM elements before manipulation
* Validate that document.body exists before inserting elements

4. Code Organization:

* Extract magic numbers (hue values, saturation %) as named constants
* Separate configuration from logic
* Use object methods instead of standalone functions

5. Performance:

* Cache frequently accessed DOM elements
* Use event delegation instead of individual listeners per link
* Debounce hover events if needed

6. Modern ES6+ Features:

* Destructuring for cleaner variable assignments
* Default parameters for the debug function
* Class-based organization if expanding functionality
