
export interface Game {
  board: Board
  piece: Piece
  nextShape: Shape
  score: number
  level: number
}
export type Board = number[][]
export interface Position {
  x: number
  y: number
}

export interface Piece {
  position: Position
  shape: number[][]
}

export type Shape = number[][]
