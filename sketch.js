let initialBoxWidth = 0;
let initialBoxHeight = 20;
let initialBoxX;
let initialBoxY;
let boxWidth;
let boxHeight;
let boxX;
let boxY;
let isSpaceDownBox = false;
let pressStartTimeBox;
let boxColor;

let groundLevel;
let initialCircleSize = 10;
let circleSize;
let initialCircleX;
let initialCircleY;
let circleX;
let circleY;
let isSpaceDownCircle = false;
let pressStartTimeCircle;
let circleColor;

let score = 0;

let hasCollided = false;

function setup() {
  createCanvas(400, 400);
  boxColor = color(0, 0, 255);
  circleColor = color(255, 255, 0);
  groundLevel = height - initialBoxHeight;
  initialBoxX = random(width - initialBoxWidth);
  initialBoxY = random(groundLevel);
  boxX = initialBoxX;
  boxY = initialBoxY;
  boxWidth = initialBoxWidth;
  boxHeight = initialBoxHeight;
  initialCircleX = random(width);
  initialCircleY = random(groundLevel);
  circleX = initialCircleX;
  circleY = initialCircleY;
  circleSize = initialCircleSize;
}

function draw() {
  background(220);

  fill(150);
  rect(0, groundLevel, width, height);

  fill(boxColor);
  rect(boxX, boxY, boxWidth, boxHeight);

  if (isSpaceDownBox) {
    let pressDuration = millis() - pressStartTimeBox;
    let widthIncrease = map(pressDuration, 0, 1000, 0, 100);
    boxWidth = initialBoxWidth + widthIncrease;
  }

  if (isSpaceDownCircle) {
    let pressDuration = millis() - pressStartTimeCircle;
    let jumpHeight = map(pressDuration, 0, 1000, 0, 100);
    circleY = 370 - jumpHeight * jumpHeight / 100;
  }

  fill(circleColor);
  ellipse(circleX, circleY, circleSize, circleSize);

  if (
    circleY + circleSize >= boxY &&
    circleY <= boxY + boxHeight &&
    circleX >= boxX &&
    circleX <= boxX + boxWidth &&
    !hasCollided
  ) {
    increaseScore();
    hasCollided = true;
  } else if (
    circleY > boxY + boxHeight ||
    circleY + circleSize < boxY ||
    circleX > boxX + boxWidth ||
    circleX + circleSize < boxX
  ) {
    hasCollided = false;
  }

  fill(0);
  textSize(20);
  text(`Score: ${score}`, width - 150, 30);
}

function keyPressed() {
  if (keyCode === 32) {
    isSpaceDownBox = true;
    pressStartTimeBox = millis();
    isSpaceDownCircle = true;
    pressStartTimeCircle = millis();
  }
}

function keyReleased() {
  if (keyCode === 32) {
    isSpaceDownBox = false;
    boxWidth = initialBoxWidth;
    isSpaceDownCircle = false;
  }
}

function resetGame() {
  initialBoxX = random(width - initialBoxWidth);
  initialBoxY = random(groundLevel);
  boxX = initialBoxX;
  boxY = initialBoxY;
  boxWidth = initialBoxWidth;
  initialCircleX = random(width);
  initialCircleY = random(groundLevel);
  circleX = initialCircleX;
  circleY = initialCircleY;
}

function increaseScore() {
  score++;
}
