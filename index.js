// add classes for mobile navigation toggling
var CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");
// const mobileMenuToggle = document.getElementById('mobile-menu-toggle');


CShamburgerMenu.addEventListener('click', function() {
    CShamburgerMenu.classList.toggle("cs-active");
    CSnavbarMenu.classList.toggle("cs-active");
    CSbody.classList.toggle("cs-open");
    // run the function to check the aria-expanded value
    // ariaExpanded();
    ariaExpanded(CShamburgerMenu);

});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not 
// function ariaExpanded() {
//     const csUL = document.querySelector('#cs-expanded');
//     const csExpanded = csUL.getAttribute('aria-expanded');

//     if (csExpanded === 'false') {
//         csUL.setAttribute('aria-expanded', 'true');
//     } else {
//         csUL.setAttribute('aria-expanded', 'false');
//     }
// }

    // Checks the value of aria expanded on an element and changes it accordingly whether it is expanded or not
    function ariaExpanded(element) {
        const isExpanded = element.getAttribute('aria-expanded');
        if (isExpanded === "false") {
            element.setAttribute('aria-expanded', 'true');
        } else {
            element.setAttribute('aria-expanded', 'false');
        };
    };


// // mobile nav toggle code
// const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
//     for (const item of dropDowns) {
//         const onClick = () => {
//         item.classList.toggle('cs-active')
//     }
//     item.addEventListener('click', onClick)
//     }

///// Handling dropdown menus on desktop (keyboard navigation) and mobile (clicks)/////
const dropdownElements = document.querySelectorAll(".cs-dropdown");
dropdownElements.forEach(element => {
    
    element.addEventListener("keydown", function(event) {
        const dropdownButton = element.querySelector(".cs-dropdown-button");
        // Makes dropdown menus appear upon hitting "Enter" or "Spacebar"
        if (event.key === "Enter" || event.key === " ") {
            element.classList.toggle("cs-active");
            if (dropdownButton) {
                ariaExpanded(dropdownButton);
            }
            event.preventDefault() // prevents default behavior of keys (moving down the page for "space")
        };

        // Makes dropdown menus disappear upon hitting "Esc"
        if (event.key === 'Escape') {
            element.classList.remove("cs-active");
            element.focus(); // Set focus back to the element
            if (dropdownButton) {
                ariaExpanded(dropdownButton);
            }
        };
    });

    // Makes dropdown menus disappear upon tabbing out of the menu
    element.addEventListener("focusout", function(event) {
        // Checks if the new focused element is outside of the current .cs-dropdown
        const relatedTarget = event.relatedTarget;
        if (!element.contains(relatedTarget)) {
            element.classList.remove("cs-active");
            const dropdownButton = element.querySelector(".cs-dropdown-button");
            if (dropdownButton) {
                ariaExpanded(dropdownButton);
            }
        };
    });

    // Handles dropdown menus on mobile - matching media query (max-width: 63.9375rem) so clicks and hover don't interfere with each other on desktop
    const maxWidthMediaQuery = window.matchMedia("(max-width: 63.9375rem)");
    if (maxWidthMediaQuery.matches) {
        element.addEventListener("click", () => {
            element.classList.toggle("cs-active")
            const dropdownButton = element.querySelector(".cs-dropdown-button");
                if (dropdownButton) {
                    ariaExpanded(dropdownButton);
                }
        });
    };
});

// Redirect to the href when Enter is pressed
const dropdownLinks = document.querySelectorAll(".cs-drop-li > .cs-li-link");
dropdownLinks.forEach(link => {
    link.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            window.location.href = this.href;
        } 
    });
});
                            

/////////////////////////////////////////////////////////////////////////////////

// This script adds a class to the body after scrolling 100px
// and we used these body.scroll styles to create some on scroll 
// animations with the navbar

document.addEventListener('scroll', (e) => { 
    const scroll = document.documentElement.scrollTop;
    if(scroll >= 100){
document.querySelector('body').classList.add('scroll')
    } else {
    document.querySelector('body').classList.remove('scroll')
    }
});