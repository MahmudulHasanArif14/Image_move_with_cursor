var elements = document.querySelectorAll(".elem");

elements.forEach(function (element) {
    var image = element.querySelector("img");
    var targetX = 0;
    var targetY = 0;
    var currentX = 0;
    var currentY = 0;
    var rafId = null;
    var smoothing = parseFloat(element.dataset.smooth || "0.16");

    function animate() {
        currentX += (targetX - currentX) * smoothing;
        currentY += (targetY - currentY) * smoothing;
        image.style.setProperty("--x", currentX + "px");
        image.style.setProperty("--y", currentY + "px");

        if (Math.abs(targetX - currentX) > 0.2 || Math.abs(targetY - currentY) > 0.2) {
            rafId = requestAnimationFrame(animate);
            
        } else {
            rafId = null;
        }
    }

    // function setCenter() {
    //     var rect = element.getBoundingClientRect();
    //     targetX = rect.width / 2;
    //     targetY = rect.height / 2;
    //     currentX = targetX;
    //     currentY = targetY;
    //     image.style.setProperty("--x", currentX + "px");
    //     image.style.setProperty("--y", currentY + "px");
    // }

    // setCenter();
    // window.addEventListener("resize", setCenter);

    element.addEventListener("mousemove", function (e) {
        var rect = element.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
        if (!rafId) {
            rafId = requestAnimationFrame(animate);
        }
    });

    element.addEventListener("mouseenter", function () {
        element.classList.add("is-active");
    });

    element.addEventListener("mouseleave", function () {
        element.classList.remove("is-active");
        // setCenter();
        if (!rafId) {
            rafId = requestAnimationFrame(animate);
        }
    });
});
