const gameBoard = document.querySelector('.game-board')
import Game from "./Game.js"

const game = new Game(gameBoard)
game.start()


