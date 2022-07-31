import { determineBishop } from "./bishop.js"
import { determineRook } from "./rook.js"

class DeterminePiece {
    determineBishop
    determineRook
    constructor(){
        this.determineBishop = determineBishop
        this.determineRook = determineRook
    }
}

export const determinePiece = new DeterminePiece
