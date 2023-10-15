import { useEffect, useRef, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { getInitialGame } from './utils'
import { BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH } from './const'
import { type Game } from './types'
import { useGameLoop } from '@/hooks/use-game-loop'
import { moveDown, moveLeft, moveRight, moveRotate } from './moves'
import { Button } from '@/components/ui/button'

export default function PlaygroundPage () {
  const game = useRef<Game>(getInitialGame())
  const refScore = useRef<HTMLParagraphElement | null>(null)
  const refCanvas = useRef<HTMLCanvasElement | null>(null)
  const refNext = useRef<HTMLCanvasElement | null>(null)

  const [shouldAnimate, setShouldAnimate] = useState(true)

  const draw = () => {
    if (refCanvas?.current !== null) {
      const context = refCanvas.current.getContext('2d')

      if (context !== null) {
        context.fillStyle = '#ccc'
        context.fillRect(0, 0, refCanvas.current.width, refCanvas.current.height)

        game.current.board.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value === 1) {
              context.fillStyle = 'yellow'
              context.fillRect(x, y, 1, 1)
            }
          })
        })

        game.current.piece.shape.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value === 1) {
              context.fillStyle = 'red'
              context.fillRect(game.current.piece.position.x + x, game.current.piece.position.y + y, 1, 1)
            }
          })
        })
      }
    }

    if (refNext?.current !== null) {
      const nextContext = refNext.current.getContext('2d')

      if (nextContext !== null) {
        nextContext.fillStyle = '#ccc'
        nextContext.fillRect(0, 0, refNext.current.width, refNext.current.height)

        game.current.nextShape.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value === 1) {
              nextContext.fillStyle = 'red'
              nextContext.fillRect(x, y, 1, 1)
            }
          })
        })
      }
    }

    if (refScore?.current !== null) {
      refScore.current.innerText = game.current.score.toString()
    }
  }

  const loopUpdate = () => {
    game.current = moveDown(game.current)
  }

  useEffect(() => {
    if (refCanvas?.current === null || refNext?.current === null) {
      throw new Error('Something is wrong with the tags IDs')
    }

    refCanvas.current.width = BLOCK_SIZE * BOARD_WIDTH
    refCanvas.current.height = BLOCK_SIZE * BOARD_HEIGHT

    refNext.current.width = BLOCK_SIZE * 4
    refNext.current.height = BLOCK_SIZE * 4

    const context = refCanvas.current.getContext('2d')
    const nextContext = refNext.current.getContext('2d')

    if (context === null || nextContext === null) {
      throw new Error('Unable to retrive 2d context from canvas elements')
    }

    context.scale(BLOCK_SIZE, BLOCK_SIZE)
    nextContext.scale(BLOCK_SIZE, BLOCK_SIZE)

    draw()

    const HANDLER: Record<string, () => void> = {
      ArrowUp: () => { game.current = moveRotate(game.current) },
      ArrowDown: () => { game.current = moveDown(game.current) },
      ArrowLeft: () => { game.current = moveLeft(game.current) },
      ArrowRight: () => { game.current = moveRight(game.current) },
      p: () => { setShouldAnimate((val) => !val) }
    }

    const keyDown = (event: KeyboardEvent) => {
      const handler = HANDLER[event.key] ?? undefined

      if (handler !== undefined) {
        handler()
      }
    }
    window.document.addEventListener('keydown', keyDown)

    return () => { window.document.removeEventListener('keydown', keyDown) }
  }, [])

  useGameLoop({ draw, nextStep: loopUpdate, shouldAnimate })

  return (
    <>
      <div className="h-full flex-col flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Tetris</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <div className="hidden space-x-2 md:flex">
              <Button onClick={() => { setShouldAnimate(!shouldAnimate) }}>Toggle</Button>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                <div>
                  <canvas ref={refNext} className='rounded-sm shadow-sm border'/>
                </div>
              </div>
              <div className="md:order-1">
                <div className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <div className='flex flex-col items-center justify-between'>
                      <canvas ref={refCanvas} className='rounded-sm shadow-sm border'/>
                    </div>
                    <div className='flex flex-col items-center justify-between'>
                      <p ref={refScore}></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
