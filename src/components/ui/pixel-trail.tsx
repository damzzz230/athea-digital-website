import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { cn } from '../../lib/utils'
import { useDimensions } from '../hooks/use-debounced-dimensions'

interface PixelTrailProps {
  pixelSize: number
  fadeDuration?: number
  delay?: number
  className?: string
  pixelClassName?: string
}

const PixelTrail: React.FC<PixelTrailProps> = React.memo(function PixelTrail({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(containerRef)
  const trailId = useRef(uuidv4())
  const tickingRef = useRef(false)
  const lastPointRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      lastPointRef.current = { x: e.clientX, y: e.clientY }
      if (tickingRef.current) return
      tickingRef.current = true

      requestAnimationFrame(() => {
        tickingRef.current = false
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const { x: clientX, y: clientY } = lastPointRef.current
        const x = Math.floor((clientX - rect.left) / pixelSize)
        const y = Math.floor((clientY - rect.top) / pixelSize)

        const pixelElement = document.getElementById(
          `${trailId.current}-pixel-${x}-${y}`
        )
        if (pixelElement) {
          const animatePixel = (pixelElement as any).__animatePixel
          if (animatePixel) animatePixel()
        }
      })
    },
    [pixelSize]
  )

  const columns = useMemo(
    () => Math.ceil(dimensions.width / pixelSize),
    [dimensions.width, pixelSize]
  )
  const rows = useMemo(
    () => Math.ceil(dimensions.height / pixelSize),
    [dimensions.height, pixelSize]
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 w-full h-full pointer-events-auto',
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId.current}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              className={pixelClassName}
            />
          ))}
        </div>
      ))}
    </div>
  )
})

interface PixelDotProps {
  id: string
  size: number
  fadeDuration: number
  delay: number
  className?: string
}

const PixelDot: React.FC<PixelDotProps> = React.memo(
  ({ id, size, fadeDuration, delay, className }) => {
    const nodeRef = useRef<HTMLDivElement | null>(null)
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const rafRef = useRef<number | null>(null)

    // Mutates the DOM directly (bypassing React state) so the "show" frame is
    // guaranteed to paint before the fade-out transition starts — the
    // requestAnimationFrame boundary below already puts the opacity:1 write
    // in an earlier frame than the fade-out, so no forced-reflow is needed.
    const animatePixel = useCallback(() => {
      const node = nodeRef.current
      if (!node) return

      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      node.style.transition = 'none'
      node.style.opacity = '1'

      rafRef.current = requestAnimationFrame(() => {
        node.style.transition = `opacity ${fadeDuration}ms ease`
        hideTimeoutRef.current = setTimeout(() => {
          node.style.opacity = '0'
        }, delay)
      })
    }, [fadeDuration, delay])

    useEffect(() => {
      return () => {
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    }, [])

    const ref = useCallback(
      (node: HTMLDivElement | null) => {
        nodeRef.current = node
        if (node) {
          ;(node as any).__animatePixel = animatePixel
        }
      },
      [animatePixel]
    )

    return (
      <div
        id={id}
        ref={ref}
        className={cn('cursor-pointer-none', className)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          opacity: 0,
        }}
      />
    )
  }
)

PixelDot.displayName = 'PixelDot'
export { PixelTrail }
