let board = []
let dim = 4
let cellSize = 100
let empty_row = 3
let empty_col = 3
let tile_col, tile_row, moveFrom, moveTo
let swipeSound, selectSound, tileImg

function preload() {
    swipeSound = loadSound("swipe.mp3")
    selectSound = loadSound("select.wav")
}

function setup() {
  createCanvas(420, 420);
  init()
}

function init() {
    board = []
    let number = 15
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            board.push(new Cell(j, i, number))
            number--
        }
    }
}

function draw() {
  background("#73AD21");

  for (let tile of board) {
      tile.display()
  }
}

function findTile(row, col) {
    for (let tile of board) {
        if (tile.row == row && tile.col == col) {
            return tile
        }
    }
}

function play(tile) {
       
    tile_row = tile.row;
    tile_col = tile.col;

    // check if the tile if legal move
    if ((tile_row == empty_row) && ((tile_col + 1) == empty_col))
    {
        let moveFrom = tile
        let moveTo = findTile(tile_row, tile_col + 1)
        TweenLite.to(moveFrom, 0.3, {x: moveTo.x})
        moveFrom.col++
        moveTo.x -= cellSize
        moveTo.col--
        empty_col = tile_col;
        swipeSound.play()
    } 
    
    else if ((tile_row == empty_row) && ((tile_col - 1) == empty_col))
    {
        let moveFrom = tile
        let moveTo = findTile(tile_row, tile_col - 1)
        TweenLite.to(moveFrom, 0.3, {x: moveTo.x})
        moveFrom.col--
        moveTo.x += cellSize
        moveTo.col++
        empty_col = tile_col;
        swipeSound.play()
    }

    else if ((tile_col == empty_col) && ((tile_row - 1) == empty_row))
    {
        let moveFrom = tile
        let moveTo = findTile(tile_row - 1, tile_col)
        TweenLite.to(moveFrom, 0.3, {y: moveTo.y})
        moveFrom.row--
        moveTo.y += cellSize
        moveTo.row++
        empty_row = tile_row;
        swipeSound.play()
    }

    else if ((tile_col == empty_col) && ((tile_row + 1) == empty_row))
    {
        let moveFrom = tile
        let moveTo = findTile(tile_row + 1, tile_col)
        TweenLite.to(moveFrom, 0.3, {y: moveTo.y})
        moveFrom.row++
        moveTo.y -= cellSize
        moveTo.row--
        empty_row = tile_row;
        swipeSound.play()
    }
}


class Cell {
    constructor(col, row, number) {
        this.col = col
        this.row = row
        this.x = this.col * cellSize + 10
        this.y = this.row * cellSize + 10
        this.number =  number
    }

    display() {
        if (this.number) {
            strokeWeight(6)
            stroke("#73AD21")
            fill("red")
            rect(this.x, this.y, cellSize, cellSize)
            // image(tileImg, this.x, this.y, cellSize, cellSize)
            textAlign(CENTER)
            textSize(60)
            strokeWeight(6)
            stroke(0, 0, 0, 100)
            fill(0, 0, 0, 100)
            text(this.number, this.x + cellSize/2 + 2, this.y + cellSize/2 + 17)
            noStroke()
            fill("white")
            text(this.number, this.x + cellSize/2, this.y + cellSize/2 + 15)
        }
        
    }
}

function mousePressed() {
    for (let tile of board) {
        if (clickedOn(tile)) {
            play(tile)
        }
    }
}


function clickedOn(tile) {
    if (mouseX > tile.x + cellSize || mouseX < tile.x) {
        return false
    }
    if (mouseY >tile.y + cellSize || mouseY < tile.y) {
        return false
    }
    return true
}

function deviceShaken() {
    init()
}