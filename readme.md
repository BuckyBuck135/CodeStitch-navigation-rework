## Overview
This project aims at making a standard CodeStich navigation stitch more accessible via amending of aria-* attributes and building keyboard navigation features.

It has two branches:
 * main => the original stitch, untouched
 * feat---accessible-navigation => contains the proposed changes

I have tried to document and explain the changes as best I could in the change log below.

## Change log

### index.html

1. The mobile menu toggle

`aria-expanded` should be applied to the interactive control that toggles the visibility of the mobile menu, in this case `cs-toggle`, and not the menu itself
`aria-controls`  indicates the relationship between the controlling element and the controlled element. 
A button that opens a widget should have aria-controls set to the id of the expandable widget and aria-expanded set to the current state of the widget.
[Source](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)

Added an `id` for JS control

`<button class="cs-toggle" id="mobile-menu-toggle" aria-expanded="false"  aria-controls="cs-expanded-ul">`

2. Removed `aria-expanded=""` from   <ul id="cs-expanded" class="cs-ul">

As seen above, aria-expanded should be on the interactive element


3. Added `aria-current="page"` on active page. it can be used for accessibility, but also for styling the list item of the current page (job that is currently carried out by `.cs-active`)

4. Dropdown menus

We use a `button` element instead of a `<span>` for better semantics and focus handling 

We remove `tabIndex` from `<li class="cs-li cs-dropdown" tabindex="0">` as the button will be automatically focused

Added an `id` to `<ul id="dropdown-services" class="cs-drop-ul">` for the button's `aria-controls`

5. `aria-label` is not necessary  when the text content of the <a> tag (or any other element) is already descriptive enough to convey its purpose to users, including those using assistive technologies.

6. Removed ` alt="logo"` on all `cs-social-icon`, `cs-logo`, `cs-drop-icon`  Since the images are hidden with the aria-hidden attribute, the alt text is redundant in two ways:
  * the alt text will never be read by screen readers
  * if they were read, they would provide no descriptive meaning because all of them have "logo" as the text.

7. Added `aria-label` on all `cs-social-link`. Since the link contains only an image which is hidden from screen readers (aria-hidden="true"), there's no accessible text for the screen reader to announce. Adding an aria-label attribute will describe the purpose of the link to users of assistive technologies.

8. Removed `role="navigation"` from the nav element. The nav element is already a landmark element for navigation, which means it is inherently recognized by assistive technologies as a navigation region. Therefore, it is not necessary to explicitly add role="navigation" to a nav element.

### index.css

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

### index.js
1. Refactored ariaExpanded() to accept parameters
2. Overhaul of navigation to support
    * hitting Enter or Spacebar or Escape on `<li class="cs-li cs-dropdown">` opens/closes the menu and handles `aria-expanded` on the button
    * Tabbing out of the menu closes it and handles `aria-expanded` on the button
    * media query to handle hamburger menu clicks

### working demo
[Astro v4 intermediate starter kit](https://intermediate-astro-kit-decap-cms.netlify.app/)