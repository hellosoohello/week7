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
let startTime = 0;
let endTime = 0;
let elapsedTime = 0;
let isGameOver = false;

let hasCollided = false;
let isResetting = false;

//image
let backgroundImage; 


//time
let timeAtScoreZero = 0;
let timeAtScoreFive = 0;
let duringTime = 0;

function preload() {
  //backgroundImage = loadImage('/Users/sue/Desktop/for.jpg'); // Replace 'path/to/your/image.jpg' with the actual path to your image file
}

function setup() {
  createCanvas(400, 400);
  boxColor = color(0, 0, 255);
  circleColor = color(255, 255, 0);
  groundLevel = height - initialBoxHeight;
  //image(backgroundImage, 0, 0, width, height);

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
  //image(backgroundImage, 0, 0, width, height);

  fill(150);
  //rect(0, groundLevel, width, height);

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
    if (!isResetting) {
      isResetting = true;
      setTimeout(resetGame, 5000); // Pause for 2000 milliseconds (2 seconds) before restarting the game
    }    
    resetGame();
  } else if (
    circleY > boxY + boxHeight ||
    circleY + circleSize < boxY ||
    circleX > boxX + boxWidth ||
    circleX + circleSize < boxX
  ) {
    hasCollided = false;
  }

  fill(0);
  textSize(10);
  text(`Score: ${score}`, width - 50, 15);
  text(`Time: ${elapsedTime.toFixed(2)}s`, 10, 15); // Display time in seconds with 2 decimal places
  fill(22);

  text('The student is trying to escape from the assignments.', 10, 380);
  text('Please block their way with an enormous amount of tasks. The quickest catcher wins!', 10, 390);



  if (score === 0 && timeAtScoreZero === 0) {
    timeAtScoreZero = millis();
  }

  if (score >= 5 && timeAtScoreFive === 0) {
    timeAtScoreFive = millis();
    duringTime = (timeAtScoreFive - timeAtScoreZero) / 1000;
  }

  if (score >= 5) {
    isGameOver = true;
    fill(255, 0, 0);
    textSize(30);
    text("Game Over", width / 2 - 50, height / 2);
    text(
      `Time : ${duringTime.toFixed(2)}s`,
      width / 2 - 100,
      height / 2 + 50
    );
    OverGame();
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
  elapsedTime = 0;
  score = 0; // Reset score to 0 when restarting the game
  hasCollided = false; // Reset collision flag
  isGameOver = false; // Reset game over flag
  isResetting = false;
}

function keyPressed() {
  if (keyCode === 32) {
    isSpaceDownBox = true;
    pressStartTimeBox = millis();
    isSpaceDownCircle = true;
    pressStartTimeCircle = millis();
    if (startTime === 0) {
      startTime = millis();
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    isSpaceDownBox = false;
    boxWidth = initialBoxWidth;
    isSpaceDownCircle = false;
    resetGame();
    endTime = millis();
    elapsedTime = (endTime - startTime) / 1000;
    startTime = 0;
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
  elapsedTime = 0; // Reset the elapsed time to 0
}


function OverGame() {
  initialBoxX = random(350);
  initialBoxY = random(350);
  boxX = 1000;
  boxY = 1000;
  boxWidth = initialBoxWidth;
  initialCircleX = random(350);
  initialCircleY = random(350);
  circleX = initialCircleX;
  circleY = initialCircleY;
  elapsedTime = 0; // Reset the elapsed time to 0
}

function increaseScore() {
  score++;
}
