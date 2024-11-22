let targetX, targetY; 
let targetRadius = 50; 
let targetMinRadius = 10; 
let currentRadius; 
let targetColor; 

let score = 0; 
let timeLeft = 30000;
let targetInterval = 1500; 
let lastTargetTime = 0;

let shrinkInterval = 100; 
let lastShrinkTime = 0; 

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  newTarget(); 
}

function draw() {
  background(240);

  
  fill(targetColor);
  noStroke();
  ellipse(targetX, targetY, currentRadius * 2);

  
  if (millis() - lastShrinkTime > shrinkInterval && currentRadius > targetMinRadius) {
    currentRadius -= 1; 
    lastShrinkTime = millis();
  }

  
  fill(0);
  textSize(24);
  text("Score: " + score, width / 2, 30);

  
  let minutes = floor(timeLeft / 60000);
  let seconds = floor((timeLeft % 60000) / 1000);
  let timeDisplay = nf(minutes, 2) + ":" + nf(seconds, 2);
  text("Time Left: " + timeDisplay, width / 2, 60);

  
  let currentMillis = millis(); 
  if (currentMillis - lastTargetTime < targetInterval) {
    timeLeft -= deltaTime; 
  }

  
  if (currentMillis - lastTargetTime > targetInterval) {
    newTarget(); 
  }

  
  if (timeLeft <= 0) {
    gameOver();
  }
}

function mousePressed() {
  if (timeLeft <= 0) return; 

  
  let d = dist(mouseX, mouseY, targetX, targetY);
  if (d < currentRadius) {
    score += 1; 
    newTarget(); 
  } else {
    timeLeft -= 2000; 
  }
}


function newTarget() {
  targetX = random(targetRadius, width - targetRadius);
  targetY = random(targetRadius, height - targetRadius);
  targetColor = color(random(255), random(255), random(255)); 
  currentRadius = targetRadius; 
  lastTargetTime = millis();
  lastShrinkTime = millis(); 
}


function gameOver() {
  background(240);
  textSize(32);
  fill(0);
  text("Game Over", width / 2, height / 2);
  textSize(24);
  text("Final Score: " + score, width / 2, height / 2 + 40);
  noLoop(); 
}

