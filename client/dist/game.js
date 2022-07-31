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
var _Game_gameBoardElement;
import Board from './Board.js';
class Game {
    constructor(gameBoardElement) {
        _Game_gameBoardElement.set(this, void 0);
        __classPrivateFieldSet(this, _Game_gameBoardElement, gameBoardElement, "f");
    }
    start() {
        this.createBoard();
    }
    createBoard() {
        this.gameBoard = new Board(__classPrivateFieldGet(this, _Game_gameBoardElement, "f"));
    }
}
_Game_gameBoardElement = new WeakMap();
export default Game;
