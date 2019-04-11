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
var sectionStickyScroller = scrollama();
var sectionAbsoluteScroller = scrollama();

// setup the instance, pass callback functions
sectionStickyScroller
    .setup({
        step: '.section-step',
        offset: 0.05,
        // debug: true // enable to see the trigger line
    })
    .onStepEnter(function (res) {
        // { element, index, direction }
        console.log("Top enter: ", res.index, res.direction)
        var sticky = getStickyElement(res.element);

        sticky.classList.add("sticky-top");
    })
    .onStepExit(function (res) {
        // { element, index, direction }
        console.log("Top exit: ", res.index, res.direction)
        var sticky = getStickyElement(res.element);

        sticky.classList.remove("sticky-top");
    });

sectionAbsoluteScroller
    .setup({
        step: '.section-step',
        offset: 0.95,
        // debug: true // enable to see the trigger line
    })
    .onStepEnter(function (res) {
        // { element, index, direction }
        console.log("bottom enter: ", res.index, res.direction)
        var sticky = getStickyElement(res.element);

        sticky.classList.replace("sticky-bottom", "sticky-top");
    })
    .onStepExit(function (res) {
        // { element, index, direction }
        console.log("bottom exit: ", res.index, res.direction)
        var sticky = getStickyElement(res.element);

        sticky.classList.replace("sticky-top", "sticky-bottom");
    });

function getStickyElement(parent) {
    var children = parent.childNodes;
    var wrapper = null;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.classList && child.classList.contains("background-wrapper"))
            wrapper = child;
    }
    if (!wrapper) return;

    return wrapper.firstElementChild;
}

// setup resize event
window.addEventListener('resize', function () {
    sectionStickyScroller.resize();
    sectionAbsoluteScroller.resize();
});