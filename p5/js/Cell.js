class Cell {
  constructor(i, j) {
    this.row = i
    this.column = j
    this.position = createVector(
      this.column * cellWidth,
      this.row  * cellWidth,
    )
    this.obstacle = false
    this.target = false
    this.edge()
  }

  edge() {
    if (this.row == 0)
      obstacles.push(
        createVector(this.position.x, this.position.y),
        createVector(this.position.x + cellWidth, this.position.y))

    if (this.row == sides - 1 && this.column != sides - 1)
      obstacles.push(
        createVector(this.position.x, this.position.y + cellWidth),
        createVector(this.position.x + cellWidth, this.position.y + cellWidth))

    if (this.column == 0)
      obstacles.push(
        createVector(this.position.x, this.position.y),
        createVector(this.position.x, this.position.y + cellWidth))

    if (this.column == sides - 1 && this.row != sides - 1)
      obstacles.push(
        createVector(this.position.x + cellWidth, this.position.y),
        createVector(this.position.x + cellWidth, this.position.y + cellWidth))
  }

  show() {
    (this.row + this.column + 1) % 2 == 0 ?
    fill(222, 227, 230) : fill(140, 162, 173)

    if (this.obstacle)
      fill(119, 51, 68)
    if (this.target)
      fill(146, 177, 102)

    noStroke()
    rect(this.position.x, this.position.y, cellWidth, cellWidth)
  }

  putObstacle() {
    let up = board[this.row - 1][this.column]
    let down = board[this.row + 1][this.column]

    up.obstacle   = true
    this.obstacle = true
    down.obstacle = true

    up.insertObstacle()
    this.insertObstacle()
    down.insertObstacle()
  }

  insertObstacle() {
    obstacles.push(
      createVector(this.position.x, this.position.y),
      createVector(this.position.x + cellWidth, this.position.y),
      createVector(this.position.x, this.position.y + cellWidth),
      createVector(this.position.x + cellWidth, this.position.y + cellWidth),
      createVector(this.position.x + cellWidth / 2, this.position.y + cellWidth / 2),
    )
  }

  contains(x, y) {
    return (
      x > this.position.x &&
      x < this.position.x + cellWidth &&
      y > this.position.y &&
      y < this.position.y + cellWidth
    )
  }
}
