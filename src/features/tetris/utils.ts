import { BOARD_HEIGHT, BOARD_WIDTH } from './const'
import { getRandomShape } from './pieces'
import { type Board, type Piece, type Game, Shape } from './types'

export function createBoard (width: number, height: number): Board {
  const emptyBoard: Board = (Array(height).fill(0).map(() => Array(width).fill(0)))

  return emptyBoard
}

export function getInitialGame (): Game {
  return {
    board: createBoard(BOARD_WIDTH, BOARD_HEIGHT),
    piece: {
      position: { x: 5, y: 7 },
      shape: getRandomShape()
    },
    nextShape: getRandomShape(),
    score: 0,
    level: 1
  }
}

export function checkCollision (board: Board, piece: Piece): boolean {
  return piece.shape.some((row, y) => {
    return row.some((value, x) => {
      const boardValue = board[piece.position.y + y]?.[piece.position.x + x]
      if (boardValue === undefined) {
        return true
      } else if (boardValue === 1 && value === 1) {
        return true
      }
      return false
    })
  })
}

export function removeRows (game: Game): Game {
  const newGame = structuredClone(game)
  const rowsToRemove: number[] = []

  newGame.board.forEach((row, y) => {
    if (row.every(value => value === 1)) {
      rowsToRemove.push(y)
    }
  })

  rowsToRemove.forEach((y) => {
    newGame.board.splice(y, 1)
    const newRow = Array(BOARD_WIDTH).fill(0)
    newGame.board.unshift(newRow)
  })

  newGame.score += (100 * rowsToRemove.length)
  return newGame
}

export function solidifyPiece (game: Game): Game {
  const newGame = structuredClone(game)

  newGame.piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        if (newGame.board[y + newGame.piece.position.y]?.[x + newGame.piece.position.x] !== undefined) {
          newGame.board[y + newGame.piece.position.y][x + newGame.piece.position.x] = 1
        }
      }
    })
  })

  newGame.piece.shape = structuredClone(newGame.nextShape)
  newGame.piece.position.x = (BOARD_WIDTH / 2)
  newGame.piece.position.y = 0
  newGame.nextShape = getRandomShape()
  newGame.score += 10

  if (checkCollision(newGame.board, newGame.piece)) {
    //solidifyPiece()
    newGame.board.forEach(row => row.fill(0))
    newGame.score = 0
    window.alert('Ha ha')
  }

  return newGame
}

export function transposeShape (shape: Shape): Shape {
  const newShape = []
  for (let i = 0; i < shape[0].length; i++) {
    const row = []
    for (let j = shape.length - 1; j >= 0; j--) {
      row.push(shape[j][i])
    }

    newShape.push(row)
  }

  return newShape
}
