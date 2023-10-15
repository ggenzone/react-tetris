import { type Game } from './types'
import { checkCollision, removeRows, solidifyPiece, transposeShape } from './utils'

export function moveDown (game: Game): Game {
  const newGame = structuredClone(game)
  const tempPiece = structuredClone(newGame.piece)
  tempPiece.position.y++

  if (!checkCollision(newGame.board, tempPiece)) {
    newGame.piece.position = tempPiece.position
    return newGame
  }

  return removeRows(solidifyPiece(newGame))
}

export function moveLeft (game: Game): Game {
  const newGame = structuredClone(game)

  const tempPiece = structuredClone(newGame.piece)
  tempPiece.position.x--

  if (!checkCollision(newGame.board, tempPiece)) {
    newGame.piece.position = tempPiece.position
  }

  return newGame
}

export function moveRight (game: Game): Game {
  const newGame = structuredClone(game)
  const tempPiece = structuredClone(newGame.piece)
  tempPiece.position.x++

  if (!checkCollision(newGame.board, tempPiece)) {
    newGame.piece.position = tempPiece.position
  }

  return newGame
}

export function moveRotate (game: Game): Game {
  const newGame = structuredClone(game)
  const tempPiece = structuredClone(newGame.piece)

  tempPiece.shape = transposeShape(tempPiece.shape)

  if (!checkCollision(newGame.board, tempPiece)) {
    newGame.piece.shape = tempPiece.shape
  }

  return newGame
}
