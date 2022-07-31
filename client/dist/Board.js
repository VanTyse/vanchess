var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Board_squares, _Square_x, _Square_y, _Square_squareElement, _Square_piece, _Square_id;
import Piece from './Piece.js';
import { piecesPosition } from "./config/piecesPoistions.js";
// import { handlePieceClick } from './services/handlePieceClick.js';
import { determinePiece } from './services/piecesDeterminations/determinePiece.js';
import { handleSquareClick } from './services/handleSquareClick.js';
const createSquares = (gameBoard) => {
    let state = true;
    let innerState = state;
    const alphabetToNumbers = {
        1: 'a',
        2: 'b',
        3: 'c',
        4: 'd',
        5: 'e',
        6: 'f',
        7: 'g',
        8: 'h'
    };
    let squares = [];
    for (let i = 1; i <= 8; i++) {
        for (let j = 8; j >= 1; j--) {
            let square = document.createElement('div');
            let squareText = document.createElement('p');
            let possiblesquare = document.createElement('div');
            possiblesquare.style.display = 'none';
            squareText.textContent = `${alphabetToNumbers[i]}${j}`;
            squareText.classList.add('show-square-id');
            square.id = `${alphabetToNumbers[i]}${j}`;
            square.classList.add('square');
            square.appendChild(squareText);
            square.appendChild(possiblesquare);
            if (innerState) {
                square.classList.add('white');
                innerState = !innerState;
            }
            else {
                square.classList.add('black');
                innerState = !innerState;
            }
            gameBoard === null || gameBoard === void 0 ? void 0 : gameBoard.appendChild(square);
            squares.push(square);
        }
        state = !state;
        innerState = state;
    }
    return squares;
};
class Board {
    constructor(gameBoard) {
        _Board_squares.set(this, void 0);
        __classPrivateFieldSet(this, _Board_squares, createSquares(gameBoard).map((squareElement, index) => {
            return new Square(squareElement, index % 8, Math.floor(index / 8));
        }), "f");
        this.renderPieces(gameBoard);
        this.addListeners();
        this.squaresClicked = [];
        //event is fired if the same square is clicked consecutively
        window.addEventListener('reset_squares_clicked', () => this.squaresClicked = []);
        //event is fired when a square is clicked and the second square !== the first
        window.addEventListener('squareclick', (e) => this.onSquareClick(e));
    }
    renderPieces(gameBoard) {
        const squares = __classPrivateFieldGet(this, _Board_squares, "f");
        squares.forEach(square => {
            const initialPosition = square.id;
            if (initialPosition in piecesPosition) {
                const piece = piecesPosition[initialPosition];
                const pieceType = piece.slice(6);
                const pieceColor = piece.match('white') ? 'white' : 'black';
                square.piece = new Piece({ pieceType, gameBoard, pieceColor, initialPosition });
            }
        });
    }
    findSquare(id) {
        return __classPrivateFieldGet(this, _Board_squares, "f").find(square => square.id === id);
    }
    findSquareByCoordinates(x, y) {
        return __classPrivateFieldGet(this, _Board_squares, "f").find(square => square.x === x && square.y === y);
    }
    addListeners() {
        __classPrivateFieldGet(this, _Board_squares, "f").forEach(square => {
            square.addListener();
        });
    }
    removeListeners() {
        __classPrivateFieldGet(this, _Board_squares, "f").forEach(square => {
            square.removeListener();
        });
    }
    canMove({ currentSquare, futureSquare }) {
        const currentSquarePiece = currentSquare.piece;
        const futureSquarePiece = futureSquare.piece;
        console.log(determinePiece.determineRook({ currentSquare }, this));
        return false;
    }
    movePiece({ currentSquare, futureSquare }) {
        var _a;
        this.removeListeners();
        const canMove = this.canMove({ currentSquare, futureSquare });
        if (canMove) {
            (_a = futureSquare.piece) === null || _a === void 0 ? void 0 : _a.remove();
            futureSquare.piece = null;
            futureSquare.piece = currentSquare.piece;
            currentSquare.piece = null;
        }
        this.addListeners();
    }
    onSquareClick(e) {
        const { squareID } = e['detail'];
        const clickedSquare = this.findSquare(squareID);
        if (this.squaresClicked.length < 2) {
            this.squaresClicked.push(clickedSquare);
        }
        if (this.squaresClicked.length == 2) {
            const currentSquare = this.squaresClicked[0];
            const futureSquare = this.squaresClicked[1];
            //move piece
            this.movePiece({ currentSquare, futureSquare });
            //reset squares clicked
            this.squaresClicked = [];
            __classPrivateFieldGet(this, _Board_squares, "f").forEach(square => {
                square.clicked = false;
                square.squareElement.classList.remove('square-clicked');
            });
        }
        console.log(this.squaresClicked);
    }
    get squares() {
        return __classPrivateFieldGet(this, _Board_squares, "f");
    }
}
_Board_squares = new WeakMap();
class Square {
    constructor(squareElement, x, y) {
        _Square_x.set(this, void 0);
        _Square_y.set(this, void 0);
        _Square_squareElement.set(this, void 0);
        _Square_piece.set(this, void 0);
        _Square_id.set(this, void 0);
        __classPrivateFieldSet(this, _Square_squareElement, squareElement, "f");
        __classPrivateFieldSet(this, _Square_id, __classPrivateFieldGet(this, _Square_squareElement, "f").getAttribute('id'), "f");
        __classPrivateFieldSet(this, _Square_x, x, "f");
        __classPrivateFieldSet(this, _Square_y, y, "f");
        __classPrivateFieldSet(this, _Square_piece, null, "f");
        this.eventListeners = {};
        this.clicked = false;
    }
    set piece(value) {
        __classPrivateFieldSet(this, _Square_piece, value, "f");
        if (value == null)
            return;
        __classPrivateFieldGet(this, _Square_piece, "f").x = __classPrivateFieldGet(this, _Square_x, "f");
        __classPrivateFieldGet(this, _Square_piece, "f").y = __classPrivateFieldGet(this, _Square_y, "f");
    }
    get piece() {
        return __classPrivateFieldGet(this, _Square_piece, "f");
    }
    get squareElement() {
        return __classPrivateFieldGet(this, _Square_squareElement, "f");
    }
    get x() {
        return __classPrivateFieldGet(this, _Square_x, "f");
    }
    get y() {
        return __classPrivateFieldGet(this, _Square_y, "f");
    }
    get id() {
        return __classPrivateFieldGet(this, _Square_id, "f");
    }
    addListener() {
        // this.eventListeners['pieceClick'] = () => handlePieceClick(this)
        this.eventListeners['squareClick'] = () => handleSquareClick(this);
        __classPrivateFieldGet(this, _Square_squareElement, "f").addEventListener('click', this.eventListeners['squareClick']);
        if (__classPrivateFieldGet(this, _Square_piece, "f") != null) {
            __classPrivateFieldGet(this, _Square_piece, "f").pieceElement.addEventListener('click', this.eventListeners['squareClick']);
        }
    }
    removeListener() {
        __classPrivateFieldGet(this, _Square_squareElement, "f").removeEventListener('click', this.eventListeners['squareClick']);
        if (__classPrivateFieldGet(this, _Square_piece, "f") != null) {
            __classPrivateFieldGet(this, _Square_piece, "f").pieceElement.removeEventListener('click', this.eventListeners['squareClick']);
        }
        this.eventListeners['squareClick'] = null;
    }
}
_Square_x = new WeakMap(), _Square_y = new WeakMap(), _Square_squareElement = new WeakMap(), _Square_piece = new WeakMap(), _Square_id = new WeakMap();
export default Board;
