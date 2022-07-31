export const determineRook = ({currentSquare}, board) => {
    const pieceType = currentSquare.piece.pieceType;
    // if (pieceType !== 'bishop') return


    const pieceColor = currentSquare.piece.pieceColor;
    let possibleMoves = [];

    const colNumber = currentSquare.y
    const rowNumber = currentSquare.x
    console.log(`x : ${colNumber}, y : ${rowNumber}`);
    

    const southRecursion = (colNumber, rowNumber, board) => {
        if ( rowNumber > 7 )return
        console.log(rowNumber, colNumber);
        
        const square = board.findSquareByCoordinates(rowNumber, colNumber)
        console.log('happens s');

        console.log(square.squareElement, `x : ${square.x}, y : ${square.y}`);
        if ((square.piece?.pieceColor === pieceColor)){
            return
        }
        else{
            possibleMoves.push(square);
            if((square.piece?.pieceColor !== pieceColor) && square.piece !== null)return
            southRecursion(colNumber, rowNumber + 1, board)
        }
    }

    const northRecursion = (colNumber, rowNumber, board) => {
        if ( rowNumber < 0)return
        console.log(rowNumber, colNumber);
        const square = board.findSquareByCoordinates(rowNumber, colNumber)
        console.log('happens n');
        console.log(square.squareElement, `x : ${square.x}, y : ${square.y}`);
        if ((square.piece?.pieceColor === pieceColor)){
            return
        }
        else{
            possibleMoves.push(square);
            if((square.piece?.pieceColor !== pieceColor) && square.piece !== null)return
            northRecursion(colNumber, rowNumber-1, board)
        }
    }

    
    const eastRecursion = (colNumber, rowNumber, board) => {
        if ( colNumber > 7 )return
        console.log(rowNumber, colNumber);
        console.log(rowNumber, colNumber);
        const square = board.findSquareByCoordinates(rowNumber, colNumber)
        console.log('happens e');
        console.log(square.squareElement, `x : ${square.x}, y : ${square.y}`);
        if ((square.piece?.pieceColor === pieceColor)){
            return
        }
        else{
            possibleMoves.push(square);
            if((square.piece?.pieceColor !== pieceColor) && square.piece !== null)return
            eastRecursion(colNumber+1, rowNumber, board)
        }
    }

    
    const westRecursion = (colNumber, rowNumber, board) => {
        if ( colNumber < 0 )return
        const square = board.findSquareByCoordinates(rowNumber, colNumber)
        console.log('happens w');
        console.log(square.squareElement, `x : ${square.x}, y : ${square.y}`);
        
        if ((square.piece?.pieceColor === pieceColor)){
            return
        }
        else{
            possibleMoves.push(square);
            if((square.piece?.pieceColor !== pieceColor) && square.piece !== null)return
            westRecursion(colNumber-1, rowNumber, board)
        }
    }

    northRecursion(colNumber, rowNumber - 1, board); southRecursion(colNumber, rowNumber + 1, board);
    eastRecursion(colNumber+1, rowNumber, board); westRecursion(colNumber-1, rowNumber, board)

    possibleMoves.forEach(square => {
        square.squareElement.classList.add('possible-move')
    })

    return possibleMoves
}