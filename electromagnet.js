class Electromagnet {
  constructor(size) {
    this.moment = new Vector(0,0,0);
    this.angle = PI/2;
    this.avel = 0;
    this.aacc = 0;
    this.electrons = [];
    this.crossForces = [];
    this.size = size;
    this.drawElectrons();
  }

  drawElectrons() {
    
    this.electrons = [];
    let num = 12;
    let current = (this.angle > PI && this.angle < 2*PI) ? CURRENT : -CURRENT;
    
    for (let theta = 0; theta < 8*PI; theta += 2*PI/num) {
      let currentVector = Vector.fromSphere(current, theta+PI/2, 0);
      let amplitude = this.size;
      let position = Vector.fromSphere(amplitude, theta, 0);
      position.rotateAround(new Vector(1,0,0), this.angle);
      currentVector.rotateAround(new Vector(1,0,0), this.angle);
      currentVector.origin = position.toObject(); 
      currentVector.color = color(255,255,0);
      this.electrons.push(currentVector);
    }
  }

  calcForces() {
    this.crossForces = [];
    this.aacc = 0;
    for (let e of this.electrons) {
      let F = e.cross(B);
      F.origin = e.origin;
      F.color = color(0,0,255);
      this.crossForces.push(F);

      let r = new Vector(e.origin.x, e.origin.y,e.origin.z);
      let T = r.cross(F);
      let moment = T.dot(new Vector(1,0,0));
      this.aacc += moment/20000000;
    }
  }

  draw() {
    this.drawElectrons();
    this.calcForces();
    
    this.avel += this.aacc/10;
    this.angle += this.avel;
    while(this.angle > 2*PI) {
      this.angle -= 2*PI;
    }
    while(this.angle < 0) {
      this.angle += 2*PI;
    }
    this.avel *= 0.99;

    let thickness = this.size/10;
    noFill();
    stroke(255,0,0);
    push()
      rotateX(PI/2);
      push()
        rotateX(this.angle);
        torus(this.size, thickness, 12, 8);
      pop();
      push();
        translate(this.size*1.5 - thickness*2,0,0);
        rotateZ(PI/2);
        rotateY(-this.angle);
        cylinder(thickness,this.size/2, 6);
        translate(0,(this.size*1.5 - thickness*2)*2,0);
        cylinder(thickness,this.size/2, 6);
      pop();
    pop();

    for (let e of this.electrons) {
      push();
        translate(e.origin.x,e.origin.y,e.origin.z);
        noStroke();
        fill(255,255,0);
        sphere(20,6,4);
      pop();
      e.display();
    }

    for (let c of this.crossForces) {
      c.display();
    }
  }
}