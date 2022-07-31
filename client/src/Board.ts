import Piece from './Piece.js';
import { piecesPosition } from "./config/piecesPoistions.js";
// import { handlePieceClick } from './services/handlePieceClick.js';
import { determinePiece } from './services/piecesDeterminations/determinePiece.js';
import { handleSquareClick } from './services/handleSquareClick.js';


const createSquares = (gameBoard) => {
    let state= true;
        let innerState = state;

        const alphabetToNumbers:any = {   
            1 : 'a',
            2 : 'b',
            3 : 'c',
            4 : 'd',
            5 : 'e',
            6 : 'f',
            7 : 'g',
            8 : 'h'
        }
        let squares: Element[] = []
        for (let i = 1; i <= 8; i++){
            for (let j = 8; j >= 1; j--){
                let square = document.createElement('div');
                let squareText = document.createElement('p');
                let possiblesquare = document.createElement('div');
                possiblesquare.style.display = 'none'
                squareText.textContent = `${alphabetToNumbers[i]}${j}`
                squareText.classList.add('show-square-id')
                square.id = `${alphabetToNumbers[i]}${j}` 
                square.classList.add('square')
                square.appendChild(squareText)
                square.appendChild(possiblesquare)
                if (innerState){
                    square.classList.add('white');
                    innerState = !innerState;
                }
                else{
                    square.classList.add('black');
                    innerState = !innerState;
                }
                gameBoard?.appendChild(square);
                squares.push(square)
            }
            state = !state;
            innerState = state;
        }
        return squares
}

class Board {
    #squares
    squaresClicked: object[];

    constructor(gameBoard: HTMLElement | null){
        this.#squares = createSquares(gameBoard).map((squareElement, index) => {            
            return new Square(
                squareElement,
                index % 8,
                Math.floor(index / 8)
            )
        })

        this.renderPieces(gameBoard)
        this.addListeners()

        this.squaresClicked = []

        //event is fired if the same square is clicked consecutively
        window.addEventListener('reset_squares_clicked', () => this.squaresClicked=[])

        //event is fired when a square is clicked and the second square !== the first
        window.addEventListener('squareclick', (e) => this.onSquareClick(e))
    }

    renderPieces(gameBoard){
        const squares = this.#squares
        squares.forEach(square => {
            const initialPosition = square.id;
            if (initialPosition in piecesPosition){
                const piece = piecesPosition[initialPosition]
                const pieceType = piece.slice(6)
                const pieceColor = piece.match('white') ? 'white' : 'black'
                square.piece = new Piece({pieceType, gameBoard, pieceColor, initialPosition})
            }
        })
    }

    findSquare(id){
        return this.#squares.find(square => square.id === id )
    }

    findSquareByCoordinates(x, y){
        return this.#squares.find(square => square.x === x && square.y === y)
    }

    addListeners(){
        this.#squares.forEach(square => {
            square.addListener()
        })
    }

    removeListeners(){
        this.#squares.forEach(square => {
            square.removeListener()
        })
    }

    canMove({currentSquare, futureSquare}):boolean{
        const currentSquarePiece = currentSquare.piece;
        const futureSquarePiece = futureSquare.piece;
        console.log(determinePiece.determineRook({currentSquare}, this));
        return false
    }

    movePiece({currentSquare, futureSquare}){
        this.removeListeners()
        const canMove = this.canMove({currentSquare, futureSquare});
        if (canMove){
            futureSquare.piece?.remove()
            futureSquare.piece = null
            futureSquare.piece = currentSquare.piece
            currentSquare.piece = null
        }
        this.addListeners()
    }

    onSquareClick(e){
        const {squareID} = e['detail']
        const clickedSquare = this.findSquare(squareID)
        
        if (this.squaresClicked.length < 2){
            this.squaresClicked.push(clickedSquare)
        }
        
        if (this.squaresClicked.length == 2){
            
            const currentSquare = this.squaresClicked[0];
            const futureSquare = this.squaresClicked[1];

            //move piece
            this.movePiece({currentSquare, futureSquare})

            //reset squares clicked
            this.squaresClicked=[]
            this.#squares.forEach(square => {
                square.clicked = false
                square.squareElement.classList.remove('square-clicked')
            });
        }
        console.log(this.squaresClicked);   
    }

    get squares() {
        return this.#squares
    }    
}

class Square {
    #x: number
    #y: number
    #squareElement: Element
    #piece
    #id
    eventListeners: object
    clicked: boolean

    constructor(squareElement:Element, x: number, y: number){
        this.#squareElement = squareElement
        this.#id = this.#squareElement.getAttribute('id')
        this.#x = x;
        this.#y = y
        this.#piece = null
        this.eventListeners = {}
        this.clicked = false;
    }

    set piece  (value) {
        this.#piece = value
        if (value == null)return
        this.#piece.x = this.#x;
        this.#piece.y = this.#y
    }

    get piece (){
        return this.#piece
    }

    get squareElement(){
        return this.#squareElement
    }

    get x(){
        return this.#x
    }

    get y(){
        return this.#y
    }

    get id(){
        return this.#id
    }

    addListener(){
        // this.eventListeners['pieceClick'] = () => handlePieceClick(this)
        this.eventListeners['squareClick'] = () => handleSquareClick(this)
        this.#squareElement.addEventListener('click', this.eventListeners['squareClick'])
        if (this.#piece != null){
            this.#piece.pieceElement.addEventListener('click', this.eventListeners['squareClick'])
        }
    }

    removeListener(){
        this.#squareElement.removeEventListener('click', this.eventListeners['squareClick'])
        if (this.#piece != null){            
            this.#piece.pieceElement.removeEventListener('click', this.eventListeners['squareClick'])
        }
        this.eventListeners['squareClick'] = null
    }
}

export default Board