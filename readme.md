# Change log

## index.html

1. The mobile menu toggle

`aria-expanded` should be applied to the interactive control that toggles the visibility of the mobile menu, in this case `cs-toggle`, and not the menu itself
`aria-controls`  indicates the relationship between the controlling element and the controlled element. 
A button that opens a widget should have aria-controls set to the id of the expandable widget and aria-expanded set to the current state of the widget.
[Source](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)

Added a `<title>` for the extra tooltip
Added an 1id` for JS control

`<button class="cs-toggle" id="mobile-menu-toggle" aria-expanded="false"  aria-controls="cs-expanded-ul" title="mobile menu toggle">`

2. Removed `aria-expanded=""` from   <ul id="cs-expanded" class="cs-ul">

As seen above, aria-expanded should be on the interactive element


3. Added `aria-current="page"` on active page

4. Dropdown menus

We use a `button` element instead of a `<span>` for better semantics and focus handling 

We remove `tabIndex` from `<li class="cs-li cs-dropdown" tabindex="0">` as the button will be automatically focused

We leave an empty string on the alt of the icon

Added an `id` to `<ul id="dropdown-services" class="cs-drop-ul">` for the button's `aria-controls`

5. Added `aria-label` on <a> - note: You don't need to add "button" in the label as screen readers already announce an element's role.
[Source](https://www.aditus.io/aria/aria-label/)

## index.css

1. Added styles for the newly-created `cs-dropdown-button` - removes button defaults
```CSS
 #cs-navigation .cs-dropdown-button {
    background-color: transparent;
    border: none;
    appearance: none;
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
  }
```

2. Added `.cs-active` declarations to handle desktop keyboard navigation

```CSS
  #cs-navigation .cs-dropdown:hover .cs-drop-ul,
  #cs-navigation .cs-dropdown.cs-active .cs-drop-ul {
    opacity: 1;
    visibility: visible;
    transform: scaleY(1);
  }
  #cs-navigation .cs-dropdown:hover .cs-drop-li,
  #cs-navigation .cs-dropdown.cs-active .cs-drop-li  {
    opacity: 1;
    transform: translateY(0);
  }
  ```

## index.js
1. Refactored ariaExpanded() to accept parameters
2. Overhaul of navigation to support
    * hitting Enter or Spacebar or Escape on `<li class="cs-li cs-dropdown">` opens/closes the menu and handles `aria-expanded` on the button
    * Tabbing out of the menu closes it and handles `aria-expanded` on the button
    * media query to handle hamburger menu clicks

## working demo
[Astro v4 intermediate starter kit](https://intermediate-astro-kit-decap-cms.netlify.app/)