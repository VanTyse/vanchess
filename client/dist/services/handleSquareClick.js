export const handleSquareClick = (square) => {
    square.clicked = !square.clicked;
    square.squareElement.classList.toggle('square-clicked', square.clicked);
    console.log(`x:${square.x} y:${square.y}`);
    if (square.clicked) {
        window.dispatchEvent(new CustomEvent('squareclick', { detail: { squareID: square.id } }));
    }
    else {
        window.dispatchEvent(new CustomEvent('reset_squares_clicked'));
    }
};
