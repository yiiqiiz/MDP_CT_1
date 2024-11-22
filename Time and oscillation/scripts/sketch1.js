let circleGroups = [];
let scalar = 30;
const colours = [
  "#ff2c2c", "#ffae42", "#fce205", "#46c35b", "#3d58e3", "#be2ed6",
  "#e8441f", "#fe5a01", "#fa920d", "#f4cd00", "#54ab1d", "#14a6ff", 
  "#6d5acf", "#e090df", "#abb6b2", "#f5f5f5", "#15ad03", "#02bdfd", 
  "#a0742c", "#b29815", "#ce8f5f", "#e67e22", "#34495e", "#ffbf00", 
  "#028ff5", "#9b59b6", "#fe2f03", "#378805", "#c3b091", "#e195bb",
  "#fb4a70", "#e7db00", "#002fa7", "#ff7469", "#dc2828", "#fff017"
];

function setup() {
  createCanvas(600, 600);
  smooth();
  noFill();
  for (let i = 0; i < 10; i++) {
    let groupScalar = scalar + i * 50;
    let colour = random(colours);
    let rotationSpeed = random(0.004, 0.009);
    let direction = 1;
    circleGroups[i] = createCircleGroup(
      int(random(50, 100)), 
      groupScalar, 
      rotationSpeed * direction, 
      colour
    );
  }
}

function draw() {
  background('#efefe3');
  translate(width / 2, height / 2);
  for (let i = 0; i < circleGroups.length; i++) {
    displayCircleGroup(circleGroups[i]);
  }
}

function createCircleGroup(num, scalar, rotationSpeed, colour) {
  let circleArray = [];
  let angleStep = TWO_PI / num;
  for (let i = 0; i < num; i++) {
    let angle = i * angleStep;
    circleArray.push(createCircle(i, angle, scalar));
  }
  return {
    circles: circleArray,
    angle: 0,
    rotationSpeed,
    colour,
    heightOffset: random(10, 50)
  };
}

function createCircle(number, angle, scalar) {
  return {
    number,
    angle,
    scalar,
    display: function(group) {
      let x1 = sin(this.angle) * this.scalar;
      let y1 = cos(this.angle) * this.scalar;
      let x2 = sin(this.angle) * (this.scalar + group.heightOffset);
      let y2 = cos(this.angle) * (this.scalar + group.heightOffset);

      // 使用 group.angle 结合 TWO_PI 来动态生成线条粗细
      let dynamicLineWeight = map(sin(group.angle), -1, 1, 1, 3);

      push();
      strokeWeight(dynamicLineWeight);  // 使用动态线条粗细
      stroke(group.colour);
      line(x1, y1, x2, y2);
      pop();
    }
  };
}

function displayCircleGroup(group) {
  push();
  rotate(group.angle);
  for (let i = 0; i < group.circles.length; i++) {
    group.circles[i].display(group);
  }
  group.angle += group.rotationSpeed;
  pop();
}
