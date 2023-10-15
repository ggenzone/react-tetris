import { useEffect, useRef } from 'react'

interface GameLoopProps {
  draw: () => void
  nextStep: () => void
  shouldAnimate: boolean
}
export const useGameLoop = ({
  draw,
  nextStep,
  shouldAnimate = true
}: GameLoopProps) => {
  const frame = useRef(0)
  const lastTime = useRef(0)
  const dropCounter = useRef(0)

  const update = (time: number) => {
    if (shouldAnimate) {
      draw()

      const deltaTime = time - lastTime.current
      lastTime.current = time
      dropCounter.current += deltaTime
      if (dropCounter.current > 500) {
        nextStep()
        dropCounter.current = 0
      }

      frame.current = window.requestAnimationFrame(update) 
    }
  }

  useEffect(() => {
    if (shouldAnimate) {
      frame.current = requestAnimationFrame(update)
    } else {
      cancelAnimationFrame(frame.current)
    }

    return () => { cancelAnimationFrame(frame.current) }
  }, [shouldAnimate])
}
