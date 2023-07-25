// client.js
const socket = io();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

// Ball properties
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Function to draw paddles and ball
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw left paddle
  ctx.fillStyle = '#000';
  ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);

  // Draw right paddle
  ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.closePath();
}

// Function to handle paddle movement
function movePaddle(e) {
  const keyCode = e.keyCode;

  // Move left paddle
  if (keyCode === 38) { // Up arrow
    leftPaddleY -= 10;
  } else if (keyCode === 40) { // Down arrow
    leftPaddleY += 10;
  }

  // Move right paddle (for second player, if implemented)
  // Use e.key === 'w' for up and e.key === 's' for down, for example

  // Ensure paddles stay within the canvas
  leftPaddleY = Math.max(0, Math.min(leftPaddleY, canvas.height - paddleHeight));
  rightPaddleY = Math.max(0, Math.min(rightPaddleY, canvas.height - paddleHeight));

  // Emit paddle position to the server (for multiplayer syncing)
  socket.emit('paddlePosition', { leftPaddleY, rightPaddleY });
}

// Event listener to handle key press for paddle movement
document.addEventListener('keydown', movePaddle);

// Function to update game state and render
function update() {
  // Update ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Reverse ball direction if it hits the top or bottom edge
  if (ballY < 0 || ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Check collision with paddles
  if (
    (ballX < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
    (ballX > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Emit ball position to the server (for multiplayer syncing)
  socket.emit('ballPosition', { ballX, ballY });

  draw();
  requestAnimationFrame(update);
}

// Start the game loop
update();


// const socket = io();

// socket.on('init', (data) => {
//   const { gameId, players } = data;
//   // Initialize the game with the given gameId and players
//   // You'll need to implement this function based on your game
// });

// socket.on('gameState', (gameState) => {
//   // Update the game state and redraw the canvas with the new state
//   // You'll need to implement this function based on your game
// });

// // Handle player input events and emit them to the server
// document.addEventListener('keydown', (event) => {
//   const direction = event.key === 'ArrowUp' ? 'up' : event.key === 'ArrowDown' ? 'down' : null;
//   if (direction) {
//     socket.emit('movePaddle', direction);
//   }
// });

