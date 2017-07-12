function generateBoard(height, width, numberOfMines){
  let board = createBlankBoard(height, width)
  insertMines(board, numberOfMines)
  return board;
}
function printBoard(board){
  board.map((row)=>{
    console.log(row.join(' '))
  })
}
function createBlankBoard(height, width){
  let board = new Array(height)
  for(let i=0; i< height; i++){
    board[i] = new Array(width).fill(0)
  }
  return board
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function insertMines(board, numberOfMines){
  for(let i=0; i<numberOfMines; i++){
    let indexA = getRandomArbitrary(0, board.length-1)
    let indexB = getRandomArbitrary(0, board[0].length-1)
    while(board[indexA][indexB] === '*'){
      indexA = getRandomArbitrary(0, board.length-1)
      indexB = getRandomArbitrary(0, board[0].length-1)
    }
    board[indexA][indexB] = '*'
    updateNumbers(board, indexA, indexB)
  }
}

function indexOutOfBounds(board, x, y){
  return (board.length <= y || board[0].length <= x) || y<0 || x<0
}
function updateNumbers(board, positionY, positionX){
  //o o o
  //o * o
  //o o o
  for(let i=-1; i<=1; i++){
    for(let j=-1; j<=1; j++){
      if((i==0 && j==0)
      || indexOutOfBounds(board,positionX+i, positionY+i )
      || board[positionY+i][positionX+j]==='*'){
          continue;
      }
      board[positionY+i][positionX+j]++
    }
  }


}
console.log(printBoard(generateBoard(4,7,10)))


//Test size
console.log(generateBoard(4,4,1).length == 4)
console.log(generateBoard(4,7,1)[0].length == 7)
console.log(printBoard(generateBoard(4,7,1)))

console.log("TESTS")
console.log(generateBoard(7,2,1).length == 7)
console.log(generateBoard(7,2,1)[0].length == 2)
// console.log(printBoard(generateBoard(7,2,1)))
// mines = *

//test out of bounds
console.log(indexOutOfBounds(generateBoard(5,4,1), 5, 0)==true)
console.log(indexOutOfBounds(generateBoard(5,4,1), 3, 0)==false)
console.log(indexOutOfBounds(generateBoard(7,2,1), -1, 0)==true)
//Test mines
let flatArray = [].concat.apply([], generateBoard(5,4,1));
console.log(flatArray.includes('*'))

flatArray = [].concat.apply([], generateBoard(4,10,5));
console.log(flatArray.filter((a)=> a === '*').length == 5)
