const nav = document.querySelector('nav');
const navigationUrl = nav.querySelector('.nav__top-button span');

const sectionsObserver = new IntersectionObserver(currentSectionChanges, { root: null, rootMargin: '-50% 0px -50% 0px' });
const sections = document.querySelectorAll('section');
let currentSectionName = 'about';

const firstElement = document.querySelector('h1');
const dynamicButton = document.querySelector('.dynamic-button');

const mobileNavButton = document.querySelector('.mobile-nav > button');

const navigationLinks = {};
const dynamicTitles = {};
const dynamicLinks = {
    about: '#work',
    work: '#contact',
    contact: '#about'
}



/* Functions */

function currentSectionChanges(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            // Update current section if intersecting section is different from the current one
            if (currentSectionName !== sectionId) setCurrentSection(sectionId);
        }
    });
}

function setCurrentSection(newSectionName) {
    // Updates Selected Navigation Link

    if (currentSectionName) {
        const currentNavigationLink = navigationLinks[currentSectionName];
        currentNavigationLink.classList.remove('nav__links--selected');
    }
    // nav__links--selected highlights selected navigation link
    const newNavigationLink = navigationLinks[newSectionName];
    newNavigationLink.classList.add('nav__links--selected');

    // Updates nav url
    navigationUrl.innerText = newSectionName === 'about' ? '/' : '/' + newSectionName;

    currentSectionName = newSectionName;

    // Hides dynamic button
    // There is an eventListener on transitionEnd for dynamicButton. When the animation is done, the eventListener update it
    dynamicButton.classList.add('dynamic-button--hidden');
}

function goToSection(event) {
    event.preventDefault();

    // Hides mobile navigation if visible
    const mobileNavIsVisible = nav.classList.contains('nav--visible');
    if (mobileNavIsVisible) {
        nav.classList.remove('nav--visible');
    }

    const targetId = event.currentTarget.getAttribute('href');
    const targetPosY = document.querySelector(targetId).offsetTop;

    const startPosition = window.scrollY;
    const distance = targetPosY - startPosition;
    const duration = 1000;
    const startTime = performance.now();
    
    const step = () => {
        const progress = (performance.now() - startTime) / duration;
        const amount = easeInOutQuad(progress);
        window.scrollTo({ top: startPosition + amount * distance, behavior: 'auto'});
        if (progress < 0.99) {
            window.requestAnimationFrame(step);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    step();
}

function toggleMobileNav() {
    // Toggle .nav--visible that hides or shows mobile navigation
    const mobileNavIsVisible = nav.classList.contains('nav--visible');
    console.log(mobileNavIsVisible);
    nav.classList.toggle('nav--visible', !mobileNavIsVisible);

    // Toggle mobile navigation button
    mobileNavButton.classList.toggle('button--close', !mobileNavIsVisible);
    const ariaLabel = mobileNavIsVisible ? 'Open navigation menu' : 'Close navigation menu';
    mobileNavButton.ariaLabel = ariaLabel;
}



/* Events & Init */

// Init data and events
sections.forEach(section => {
    const id = section.id;
    sectionsObserver.observe(section);

    // Init Navigation Links object
    const navigationLink = document.querySelector(`a[href="#${id}"]`);
    navigationLink.addEventListener('click', goToSection);
    navigationLinks[id] = navigationLink;

    // Init Dynamic Titles
    const title = section.getAttribute('data-dynamic-title');
    dynamicTitles[id] = title;
});

// On scroll : Navigation Border
window.addEventListener('scroll', () => {
    // Navigation border
    const headerRectTop = firstElement.getBoundingClientRect().top;
    const borderShouldBeVisible = headerRectTop <= 73;
    nav.classList.toggle('nav-border--visible', borderShouldBeVisible);
});

// Update Dynamic Button Title + Href when the transition that hides the button is done
// Dynamic Button is hidden when setCurrentSection()
dynamicButton.addEventListener('transitionend', function() {
    const isDynamicButtonHidden = dynamicButton.classList.contains('dynamic-button--hidden');

    if (isDynamicButtonHidden) {
        // Updates Title, Href
        dynamicButton.querySelector('span').innerText = dynamicTitles[currentSectionName];
        dynamicButton.href = dynamicLinks[currentSectionName];

        const isLastSection = currentSectionName === 'contact' ? true : false;
        dynamicButton.classList.toggle('dynamic-button--up', isLastSection);

        dynamicButton.classList.remove('dynamic-button--hidden');
    }
});

dynamicButton.addEventListener('click', goToSection);

// Mobile navigation | Shows / hides navigation on click
mobileNavButton.addEventListener('click', function() {
    toggleMobileNav();
});