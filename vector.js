class Vector {
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.origin = {x:0, y:0, z:0};
    this.color = color(0,0,0);
  }

  static fromSphere(r,theta,phi) {
    let x = (r) * cos(phi) * cos(theta);
    let y = (r) * -sin(phi);
    let z = (r) * -sin(theta) * cos(phi);
    return new Vector(x, y, z);
  }

  toObject() {
    return {x: this.x, y: this.y, z: this.z};
  }

  rotateAround(around, theta) {
    let k = around.normalized();
    let vpar = k.times(this.dot(k));
    let vperp = this.plus(vpar.times(-1));
    let w = k.cross(this); 

    vperp.mult(cos(theta));
    w.mult(sin(theta));
    let result = vperp.plus(w).plus(vpar);

    this.x = result.x;
    this.y = result.y;
    this.z = result.z;
  }

  display() {

    noStroke(50);
    fill(this.color);
    let size = this.magnitude();

    push();
      translate(this.origin.x, this.origin.y, this.origin.z);
      let x = this.x;
      let y = this.y;
      let z = this.z;
      
      let theta = atan2(z,x);
      let phi = atan2(y,sqrt(z*z+x*x));

      rotateZ(-PI/2);
      rotateX(theta);
      rotateZ(phi);

      translate(0,size,0);
      cylinder(size/10,size*2,8,1);
      translate(0, size, 0);
      cone(size/4,size/2,8,1);
    pop();
  }

  cross(other) {
    let xx = this.y * other.z - this.z * other.y;
    let yy = -(this.x * other.z - this.z * other.x);
    let zz = this.x * other.y - this.y * other.x;
    return new Vector(xx,yy,zz);
  }

  dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  magnitude() {
    return sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  // cross(other) {
  //   let x = this.y * other.z - this.z * other.y;
  //   let y = this.z * other.x - this.x * other.z;
  //   let z = this.x * other.y - this.y * other.x;
  //   return new Vector(x,y,z); 
  // }

  normalize() {
    if (this.magnitude() === 0) {return;}
    this.x /= this.magnitude();
    this.y /= this.magnitude();
    this.z /= this.magnitude();
  }

  normalized() {
    if (this.magnitude() === 0) {return new Vector(0,0,0);}
    return new Vector(
      this.x / this.magnitude(),
      this.y / this.magnitude(),
      this.z / this.magnitude()
    );
  }

  add(other) {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
  }

  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
  }

  mult(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
  }

  plus(other) {
    let me = new Vector(this.x, this.y, this.z);
    me.add(other);
    return me;
  }

  minus(other) {
    let me = new Vector(this.x, this.y, this.z);
    me.sub(other);
    return me;
  }

  times(scalar) {
    let me = new Vector(this.x, this.y, this.z);
    me.mult(scalar);
    return me;
  }
}