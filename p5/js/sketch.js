const sides = 15
let boardSize
let cellWidth
let board = []
let robot
let target
let numObstacles = 7
let obstacles = []

function setup() {
  createBoard()
  robot = new Robot(
    cellWidth / 2,
    cellWidth / 2
  )
  target = createVector(
    board[sides - 1][sides - 1].position.x + cellWidth / 2,
    board[sides - 1][sides - 1].position.y + cellWidth / 2
  )
}

function draw() {
  showBoard()
  robot.show()
  if (numObstacles == 0) {
    robot.seek(target)
    for (let i = 0; i < obstacles.length; i++)
      robot.avoid(obstacles[i])
    robot.update()
  }
}

/////////////////////////////////////////////////

function boardLength() {
  let length
  (windowHeight < windowWidth) ?
    length = windowHeight - 17 :
    length = windowWidth - 17
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

  board[sides - 1][sides - 1].target = true
}

function showBoard() {
  for (let i = 0; i < sides; i++)
    for (let j = 0; j < sides; j++)
      board[i][j].show();
}

function mousePressed() {
  if (numObstacles > 0) {
    for (let i = 0; i < sides; i++)
      for (let j = 0; j < sides; j++)
        if (board[i][j].contains(mouseX, mouseY)) {
          board[i][j].putObstacle()
          numObstacles--
        }
  }
}
