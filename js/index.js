// /* Object fit polyfill */

// // If the browser doesn't support object-fit
// if ("objectFit" in document.documentElement.style === false) {
//   // Find all the containers holding images needing to be polyfilled
//   var imageContainers = document.querySelectorAll(".section-background");

//   // Loop through them
//   for (var i = 0; i < imageContainers.length; i++) {
//     // Get the image source attribute
//     var container = imageCollection[i];
//     var imageURL = container.querySelector("img").getAttribute("src");

//     // Set as the container's background image and add a class that can be used as a CSS hook
//     if (imageURL) {
//       container.style.backgroundImage = "url(" + imageURL + ")";
//       container.classList.add("compat-object-fit");
//     }
//   }
// } else {
//   if ("objectFit" in document.documentElement.style) {
//     console.log("object-fit natively supported");
//   }
// }

// // instantiate the scrollama
// const scroller = scrollama();
// const steps = document.querySelectorAll(".step");

// // setup the instance, pass callback functions
// scroller
//   .setup({
//     step: '.step',
//     offset: 0,
//     debug: true
//   })
//   .onStepEnter(res => {
//     // { element, index, direction }
//     console.log("enter: ", res.index, res.direction)
//     res.element.classList.add("sticky");
//   })
//   .onStepExit(res => {
//     // { element, index, direction }
//     console.log("exit: ", res.index, res.direction)
//     if (res.index > 0) {
//       steps[res.index].classList.remove("sticky");
//     }
//   });

// // setup resize event
// window.addEventListener('resize', scroller.resize);