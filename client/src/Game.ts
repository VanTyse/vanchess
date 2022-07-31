import Board from './Board.js'

class Game {
    #gameBoardElement;
    gameBoard;

    constructor(gameBoardElement: Element | null){
        this.#gameBoardElement = gameBoardElement
    }

    start(){
        this.createBoard()
    }

    createBoard(): void{
        this.gameBoard = new Board(this.#gameBoardElement)
    }
}

export default Game