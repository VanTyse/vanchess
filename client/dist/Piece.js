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
var _Piece_pieceType, _Piece_pieceColor, _Piece_pieceElement, _Piece_x, _Piece_y;
import { piecesImages } from "./config/piecesImages.js";
import { piecesPosition } from "./config/piecesPoistions.js";
class Piece {
    constructor({ pieceType, gameBoard, pieceColor, initialPosition }) {
        _Piece_pieceType.set(this, void 0);
        _Piece_pieceColor.set(this, void 0);
        _Piece_pieceElement.set(this, void 0);
        _Piece_x.set(this, void 0);
        _Piece_y.set(this, void 0);
        __classPrivateFieldSet(this, _Piece_pieceElement, document.createElement('img'), "f");
        gameBoard.appendChild(__classPrivateFieldGet(this, _Piece_pieceElement, "f"));
        __classPrivateFieldGet(this, _Piece_pieceElement, "f").style.setProperty('--x', __classPrivateFieldGet(this, _Piece_x, "f"));
        __classPrivateFieldGet(this, _Piece_pieceElement, "f").style.setProperty('--y', __classPrivateFieldGet(this, _Piece_y, "f"));
        __classPrivateFieldGet(this, _Piece_pieceElement, "f").classList.add('piece');
        __classPrivateFieldGet(this, _Piece_pieceElement, "f").src = piecesImages[piecesPosition[initialPosition]];
        __classPrivateFieldGet(this, _Piece_pieceElement, "f").setAttribute('piece-type', pieceType);
        __classPrivateFieldSet(this, _Piece_pieceType, pieceType, "f");
        __classPrivateFieldSet(this, _Piece_pieceColor, pieceColor, "f");
    }
    remove() {
        __classPrivateFieldGet(this, _Piece_pieceElement, "f").remove();
    }
    set x(value) {
        __classPrivateFieldSet(this, _Piece_x, value, "f");
        __classPrivateFieldGet(this, _Piece_pieceElement, "f").style.setProperty('--x', value);
    }
    set y(value) {
        __classPrivateFieldSet(this, _Piece_y, value, "f");
        __classPrivateFieldGet(this, _Piece_pieceElement, "f").style.setProperty('--y', value);
    }
    get pieceElement() {
        return __classPrivateFieldGet(this, _Piece_pieceElement, "f");
    }
    get pieceColor() {
        return __classPrivateFieldGet(this, _Piece_pieceColor, "f");
    }
    get pieceType() {
        return __classPrivateFieldGet(this, _Piece_pieceType, "f");
    }
}
_Piece_pieceType = new WeakMap(), _Piece_pieceColor = new WeakMap(), _Piece_pieceElement = new WeakMap(), _Piece_x = new WeakMap(), _Piece_y = new WeakMap();
export default Piece;
