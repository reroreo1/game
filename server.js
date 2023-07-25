// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000; // Change this to your desired port number
let game = {
    players: [], // Array of player objects
    ball: { x: 0, y: 0 }, // Ball position
    scores: { player1: 0, player2: 0 }, // Player scores
    paddles: { player1: 0, player2: 0 }, // Paddle positions for each player
  };
  
// Serve static files from the "public" folder
app.use(express.static('public'));

// Start the server
server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

// Socket.io event handling
io.on('connection', (socket) => {
  console.log('A new player connected');

  // Add server-side code for handling game events and player interactions here

  // Example: Broadcasting a message to all connected clients
  // socket.on('message', (data) => {
  //   io.emit('message', data);
  // });

  socket.on('disconnect', () => {
    console.log('A player disconnected');
    // Handle player disconnection here
  });
});

// const games = new Map();

// io.on('connection', (socket) => {
//   // When a new player connects, assign them to a game or create a new game
//   let game;
//   for (const existingGame of games.values()) {
//     if (!existingGame.isFull()) {
//       game = existingGame;
//       break;
//     }
//   }

//   if (!game) {
//     game = createNewGame();
//     games.set(game.id, game);
//   }

//   game.addPlayer(socket.id);

//   socket.join(game.id);

//   // Send the initial game state to the connected player
//   socket.emit('init', { gameId: game.id, players: game.players });

//   // Handle player input events
//   socket.on('movePaddle', (direction) => {
//     // Update the player's paddle position in the game state
//     game.updatePaddlePosition(socket.id, direction);

//     // Emit updated game state to all players in the same game
//     io.to(game.id).emit('gameState', game.state);
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     game.removePlayer(socket.id);
//     if (game.isEmpty()) {
//       games.delete(game.id);
//     } else {
//       io.to(game.id).emit('gameState', game.state);
//     }
//   });
// });

// function createNewGame() {
//   const gameId = Math.random().toString(36).substr(2, 9);
//   return {
//     id: gameId,
//     players: new Map(),
//     isFull: function () {
//       return this.players.size >= 2;
//     },
//     isEmpty: function () {
//       return this.players.size === 0;
//     },
//     addPlayer: function (playerId) {
//       this.players.set(playerId, { paddleY: initialPaddleYPosition });
//     },
//     removePlayer: function (playerId) {
//       this.players.delete(playerId);
//     },
//     updatePaddlePosition: function (playerId, direction) {
//       const player = this.players.get(playerId);
//       // Update the paddle position based on the direction (up or down)
//       // You'll need to implement this logic based on your game
//     },
//     state: function () {
//       // Return the game state as an object
//       // You'll need to implement this function based on your game
//     },
//   };
// }
