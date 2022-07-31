export const determineBishop = ({currentSquare}, board) => {
    const pieceType = currentSquare.piece.pieceType;
    if (pieceType !== 'bishop') return


    const pieceColor = currentSquare.piece.pieceColor;
    let possibleMoves = [];

    const colNumber = currentSquare.y
    const rowNumber = currentSquare.x
    console.log(`x : ${colNumber}, y : ${rowNumber}`);
    

    const southWestRecursion = (colNumber, rowNumber, board) => {
        if ( colNumber < 0 || rowNumber > 7)return
        console.log(rowNumber, colNumber);
        
        const square = board.findSquareByCoordinates(rowNumber, colNumber)
        console.log('happens sw');
        console.log(square.squareElement, `x : ${square.x}, y : ${square.y}`);
        if ((square.piece?.pieceColor === pieceColor)){
            return
        }
        else{
            possibleMoves.push(square);
            if((square.piece?.pieceColor !== pieceColor) && square.piece !== null)return
            southWestRecursion(colNumber-1, rowNumber+1, board)
        }
    }

    const southEastRecursion = (colNumber, rowNumber, board) => {
        if ( colNumber > 7 || rowNumber > 7)return
        console.log(rowNumber, colNumber);
        const square = board.findSquareByCoordinates(rowNumber, colNumber)
        console.log('happens se');
        console.log(square.squareElement, `x : ${square.x}, y : ${square.y}`);
        if ((square.piece?.pieceColor === pieceColor)){
            return
        }
        else{
            possibleMoves.push(square);
            if((square.piece?.pieceColor !== pieceColor) && square.piece !== null)return
            southEastRecursion(colNumber+1, rowNumber+1, board)
        }
    }

    
    const northEastRecursion = (colNumber, rowNumber, board) => {
        if ( colNumber > 7 || rowNumber < 0 )return
        console.log(rowNumber, colNumber);
        console.log(rowNumber, colNumber);
        const square = board.findSquareByCoordinates(rowNumber, colNumber)
        console.log('happens ne');
        console.log(square.squareElement, `x : ${square.x}, y : ${square.y}`);
        if ((square.piece?.pieceColor === pieceColor)){
            return
        }
        else{
            possibleMoves.push(square);
            if((square.piece?.pieceColor !== pieceColor) && square.piece !== null)return
            northEastRecursion(colNumber+1, rowNumber-1, board)
        }
    }

    
    const northWestRecursion = (colNumber, rowNumber, board) => {
        if ( colNumber < 0 || rowNumber < 0 )return
        const square = board.findSquareByCoordinates(rowNumber, colNumber)
        console.log('happens nw');
        console.log(square.squareElement, `x : ${square.x}, y : ${square.y}`);
        
        if ((square.piece?.pieceColor === pieceColor)){
            return
        }
        else{
            possibleMoves.push(square);
            if((square.piece?.pieceColor !== pieceColor) && square.piece !== null)return
            northWestRecursion(colNumber-1, rowNumber-1, board)
        }
    }

    southEastRecursion(colNumber + 1 , rowNumber + 1, board); southWestRecursion(colNumber - 1, rowNumber + 1, board);
    northEastRecursion(colNumber+1, rowNumber-1, board); northWestRecursion(colNumber-1, rowNumber-1, board)

    return possibleMoves
}