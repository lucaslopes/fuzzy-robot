class Cell {
  constructor(i, j) {
    this.row = i
    this.column = j
    this.position = createVector(
      this.column * cellWidth,
      this.row  * cellWidth,
    )
    this.obstacle = false
  }

  show() {
    (this.row + this.column + 1) % 2 == 0 ?
    fill(222, 227, 230) : fill(140, 162, 173)

    if (this.obstacle)
      fill(119, 51, 68)

    noStroke()
    rect(this.position.x, this.position.y, cellWidth, cellWidth)

    // fill(146, 177, 102)
    // let width = cellWidth / 2
    // ellipse(
    //   this.position.x + width,
    //   this.position.y + width,
    //   width, width
    // )
  }

  putObstacle() {
    board[this.row - 1][this.column].obstacle = true
    this.obstacle                             = true
    board[this.row + 1][this.column].obstacle = true
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
