let boxWidth = 0;
let boxHeight = 30;
let isSpaceDown = false;
let pressStartTime;
let boxColor;

function setup() {
  createCanvas(400, 400);
  boxColor = color(0, 0, 255); // Blue color
}

function draw() {
  background(220);
  fill(boxColor);
  rect(20, 10, boxWidth, boxHeight);

  if (isSpaceDown) {
    let pressDuration = millis() - pressStartTime;
    let widthIncrease = map(pressDuration, 0, 1000, 0, 100); // Adjust the map range as needed
    boxWidth = 20 + widthIncrease;
  }
}

function keyPressed() {
  if (keyCode === 32) {
    isSpaceDown = true;
    pressStartTime = millis();
  }
}

function keyReleased() {
  if (keyCode === 32) {
    isSpaceDown = false;
    boxWidth = 0; // Reset the width to the original size
  }
}
