var cam;
var electromagnet;
var B;
var CURRENT = 20

function setup() {
  createCanvas(1200,750,WEBGL);
  B = new Vector(0,1,0);
  cam = new Camera();
  electromagnet = new Electromagnet(200);
}

function draw() {
  updateInput();
  background(200);

  push()
    translate(0,250,0);
    rotateX(PI/2);
    fill(255);
    box(1000,1000,10);
  pop();
  electromagnet.draw();
  cam.move();
}