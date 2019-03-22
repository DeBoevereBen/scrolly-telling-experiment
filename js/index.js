/* Object fit polyfill */

// If the browser doesn't support object-fit
if ("objectFit" in document.documentElement.style === false) {
    // Find all the containers holding images needing to be polyfilled
    var imageContainers = document.querySelectorAll(".section-background");

    // Loop through them
    for (var i = 0; i < imageContainers.length; i++) {
        // Get the image source attribute
        var container = imageCollection[i];
        var imageURL = container.querySelector("img").getAttribute("src");

        // Set as the container's background image and add a class that can be used as a CSS hook
        if (imageURL) {
            container.style.backgroundImage = "url(" + imageURL + ")";
            container.classList.add("compat-object-fit");
        }
    }
} else {
    if ("objectFit" in document.documentElement.style) {
        console.log("object-fit natively supported");
    }
}

// instantiate the scrollama
const sectionStickyScroller = scrollama();
const sectionAbsoluteScroller = scrollama();

// setup the instance, pass callback functions
sectionStickyScroller
    .setup({
        step: '.section-step',
        offset: 0,
        debug: true
    })
    .onStepEnter(res => {
        // { element, index, direction }
        console.log("enter: ", res.index, res.direction)
        const sticky = getStickyElement(res.element);

        sticky.classList.add("sticky-top");
    })
    .onStepExit(res => {
        // { element, index, direction }
        console.log("exit: ", res.index, res.direction)
        const sticky = getStickyElement(res.element);

        sticky.classList.remove("sticky-top");
    });

sectionAbsoluteScroller
    .setup({
        step: '.section-step',
        offset: 1,
        debug: true
    })
    .onStepEnter(res => {
        // { element, index, direction }
        console.log("bottom enter: ", res.index, res.direction)
        const sticky = getStickyElement(res.element);

        sticky.classList.replace("sticky-bottom", "sticky-top");
    })
    .onStepExit(res => {
        // { element, index, direction }
        console.log("bottom exit: ", res.index, res.direction)
        const sticky = getStickyElement(res.element);

        sticky.classList.replace("sticky-top", "sticky-bottom");
    });

function getStickyElement(parent) {
    const children = parent.childNodes;
    let wrapper = null;
    for (const child of children) {
        if (child.classList && child.classList.contains("background-wrapper"))
            wrapper = child;
    }
    if (!wrapper) return;

    return wrapper.firstElementChild;
}

// setup resize event
window.addEventListener('resize', () => {
    sectionStickyScroller.resize();
    sectionAbsoluteScroller.resize();
});