export const determineBishop = ({ currentSquare }, board) => {
    const pieceType = currentSquare.piece.pieceType;
    if (pieceType !== 'bishop')
        return;
    const pieceColor = currentSquare.piece.pieceColor;
    let possibleMoves = [];
    const colNumber = currentSquare.y;
    const rowNumber = currentSquare.x;
    console.log(`x : ${colNumber}, y : ${rowNumber}`);
    const southWestRecursion = (colNumber, rowNumber, board) => {
        var _a, _b;
        if (colNumber < 0 || rowNumber > 7)
            return;
        console.log(rowNumber, colNumber);
        const square = board.findSquareByCoordinates(rowNumber, colNumber);
        console.log('happens sw');
        console.log(square.squareElement, `x : ${square.x}, y : ${square.y}`);
        if ((((_a = square.piece) === null || _a === void 0 ? void 0 : _a.pieceColor) === pieceColor)) {
            return;
        }
        else {
            possibleMoves.push(square);
            if ((((_b = square.piece) === null || _b === void 0 ? void 0 : _b.pieceColor) !== pieceColor) && square.piece !== null)
                return;
            southWestRecursion(colNumber - 1, rowNumber + 1, board);
        }
    };
    const southEastRecursion = (colNumber, rowNumber, board) => {
        var _a, _b;
        if (colNumber > 7 || rowNumber > 7)
            return;
        console.log(rowNumber, colNumber);
        const square = board.findSquareByCoordinates(rowNumber, colNumber);
        console.log('happens se');
        console.log(square.squareElement, `x : ${square.x}, y : ${square.y}`);
        if ((((_a = square.piece) === null || _a === void 0 ? void 0 : _a.pieceColor) === pieceColor)) {
            return;
        }
        else {
            possibleMoves.push(square);
            if ((((_b = square.piece) === null || _b === void 0 ? void 0 : _b.pieceColor) !== pieceColor) && square.piece !== null)
                return;
            southEastRecursion(colNumber + 1, rowNumber + 1, board);
        }
    };
    const northEastRecursion = (colNumber, rowNumber, board) => {
        var _a, _b;
        if (colNumber > 7 || rowNumber < 0)
            return;
        console.log(rowNumber, colNumber);
        console.log(rowNumber, colNumber);
        const square = board.findSquareByCoordinates(rowNumber, colNumber);
        console.log('happens ne');
        console.log(square.squareElement, `x : ${square.x}, y : ${square.y}`);
        if ((((_a = square.piece) === null || _a === void 0 ? void 0 : _a.pieceColor) === pieceColor)) {
            return;
        }
        else {
            possibleMoves.push(square);
            if ((((_b = square.piece) === null || _b === void 0 ? void 0 : _b.pieceColor) !== pieceColor) && square.piece !== null)
                return;
            northEastRecursion(colNumber + 1, rowNumber - 1, board);
        }
    };
    const northWestRecursion = (colNumber, rowNumber, board) => {
        var _a, _b;
        if (colNumber < 0 || rowNumber < 0)
            return;
        const square = board.findSquareByCoordinates(rowNumber, colNumber);
        console.log('happens nw');
        console.log(square.squareElement, `x : ${square.x}, y : ${square.y}`);
        if ((((_a = square.piece) === null || _a === void 0 ? void 0 : _a.pieceColor) === pieceColor)) {
            return;
        }
        else {
            possibleMoves.push(square);
            if ((((_b = square.piece) === null || _b === void 0 ? void 0 : _b.pieceColor) !== pieceColor) && square.piece !== null)
                return;
            northWestRecursion(colNumber - 1, rowNumber - 1, board);
        }
    };
    southEastRecursion(colNumber + 1, rowNumber + 1, board);
    southWestRecursion(colNumber - 1, rowNumber + 1, board);
    northEastRecursion(colNumber + 1, rowNumber - 1, board);
    northWestRecursion(colNumber - 1, rowNumber - 1, board);
    return possibleMoves;
};
