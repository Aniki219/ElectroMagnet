var register = {};
var mouseSpeed = {x: 0, y:0};
var mousePrev = {x: 0, y: 0};
var mouseZoom = 0;

function updateInput() {
  mouseSpeed = {x: mouseX - mousePrev.x, y: mouseY - mousePrev.y};
  mousePrev = {x: mouseX, y: mouseY};
}

function mousePressed() {
  register["mb_" + mouseButton] = true;
}

function mouseReleased() {
  register["mb_" + mouseButton] = false;
}

function mouseWheel(event) {
  let dir = event.deltaY;
  mouseZoom = -dir;
}

function keyPressed() {
  register[keyCode] = true;
}

function keyReleased() {
  register[keyCode] = false;
}