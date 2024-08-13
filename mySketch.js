let colors = ['#FF4136', '#0074D9', '#2ECC40', '#FFDC00', '#FF851B', '#B10DC9'];
let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  background(255, 25);

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].move();
    shapes[i].display();
  }
}

function mouseMoved() {
  let size = map(mouseY, 0, height, 10, 100);
  let color = random(colors);
  let shape = new Shape(mouseX, mouseY, size, color);
  shapes.push(shape);
}

function mouseClicked() {
  shapes = [];
  background(255);
}

class Shape {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.angle = random(TWO_PI);
    this.speed = random(1, 3);
  }

  move() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      shapes.splice(shapes.indexOf(this), 1);
    }
  }

  display() {
    noStroke();
    fill(this.color);

    push();
    translate(this.x, this.y);
    rotate(this.angle);

    let shapeType = floor(random(3));
    if (shapeType === 0) {
      ellipse(0, 0, this.size);
    } else if (shapeType === 1) {
      rectMode(CENTER);
      rect(0, 0, this.size, this.size);
    } else {
      triangle(0, -this.size / 2, -this.size / 2, this.size / 2, this.size / 2, this.size / 2);
    }

    pop();
  }
}