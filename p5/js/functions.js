function boardLength() {
  let length
    (windowHeight < windowWidth) ?
    length = windowHeight - 17 :
    length = windowWidth  - 17
  return length
}

function createBoard() {
  boardSize = boardLength()
  cellWidth = boardSize / sides
  createCanvas(boardSize, boardSize)

  for (let i = 0; i < sides; i++) {
    let row = []
    for (let j = 0; j < sides; j++)
      row.push(new Cell(i, j))
    board.push(row)
  }
}

function showBoard() {
  for (let i = 0; i < sides; i++)
    for (let j = 0; j < sides; j++)
        board[i][j].show();
}

function mousePressed() {
  for (let i = 0; i < sides; i++)
    for (let j = 0; j < sides; j++)
      if (board[i][j].contains(mouseX, mouseY))
        board[i][j].putObstacle()
}
