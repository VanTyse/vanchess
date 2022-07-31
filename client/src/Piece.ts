import { piecesImages } from "./config/piecesImages.js";
import { piecesPosition } from "./config/piecesPoistions.js";

class Piece {
    #pieceType: string
    #pieceColor: string
    #pieceElement: HTMLImageElement
    #x
    #y

    constructor({pieceType, gameBoard, pieceColor, initialPosition}){
        this.#pieceElement = document.createElement('img')
        gameBoard.appendChild(this.#pieceElement);
        this.#pieceElement.style.setProperty('--x', this.#x)
        this.#pieceElement.style.setProperty('--y', this.#y)
        this.#pieceElement.classList.add('piece')
        this.#pieceElement.src = piecesImages[piecesPosition[initialPosition]]
        this.#pieceElement.setAttribute('piece-type', pieceType)
        this.#pieceType = pieceType
        this.#pieceColor = pieceColor
    }

    remove(){
        this.#pieceElement.remove()
    }

    set x(value){
        this.#x = value;
        this.#pieceElement.style.setProperty('--x', value);
    }

    
    set y(value){
        this.#y = value;
        this.#pieceElement.style.setProperty('--y', value);
    }

    get pieceElement(){
        return this.#pieceElement
    }

    get pieceColor(){
        return this.#pieceColor
    }

    get pieceType(){
        return this.#pieceType
    }
}

export default Piece