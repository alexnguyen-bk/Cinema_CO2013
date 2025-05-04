function followMouse(event) {
    var logo = document.getElementById("tiny-logo");
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    logo.style.left = mouseX - logo.offsetWidth / 2 + "px"; 
    logo.style.top = mouseY - logo.offsetHeight / 2 + "px"; 
}

