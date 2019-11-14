class Camera {
  constructor() {
    this.theta = 0
    this.phi = 0
    this.position = Vector.fromSphere(-800, 0, 0);
    this.speed = 10;
  }

  move() {
    let forward = Vector.fromSphere(1, this.theta, this.phi).normalized();
    let up = Vector.fromSphere(1, this.theta, this.phi-PI/2).normalized();
    let right = forward.cross(up).normalized();

    this.position.add(forward.times(mouseZoom));
    mouseZoom = 0;

    let cartesian = this.position;
    let lookAt = this.position.plus(forward.times(1000))

    camera(cartesian.x, cartesian.y, cartesian.z, lookAt.x, lookAt.y, lookAt.z, up.x, up.y, up.z);

    let panSpeed = 0.25 * log(dist(cartesian.x,cartesian.y,cartesian.z,0,0,0)*8);

    if (register["mb_center"]) {
      this.position.sub(right.times(mouseSpeed.x * panSpeed));
      this.position.sub(up.times(mouseSpeed.y * panSpeed));
    }

    if (register["mb_right"]) {
      this.theta -= mouseSpeed.x/400;
      this.phi -= mouseSpeed.y/400;
    }

    if (register["mb_left"]) {
      this.click(forward, right, up);
    }
  }
  
  click(forward, right, up) {
    let mpos = this.position.plus(right.times(mouseX-width/2)).plus(up.times(mouseY - height/2));
    let pointingAt = forward.times(10000);
    beginShape(LINES)
      stroke(255,0,255)
      vertex(mpos.x, mpos.y, mpos.z);
      vertex(pointingAt.x, pointingAt.y, pointingAt.z);
    endShape()
  }
}