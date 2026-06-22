import { useEffect, memo } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

function CustomCursor() {
  // Motion values bypass React's render cycle entirely — Framer Motion
  // writes directly to the DOM node, so cursor movement causes zero
  // React re-renders.
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const ringScaleRaw = useMotionValue(1)

  // Spring-smoothed position for the outer ring (gives it the slight lag)
  const springX = useSpring(mouseX, { stiffness: 1200, damping: 60, mass: 0.1 })
  const springY = useSpring(mouseY, { stiffness: 1200, damping: 60, mass: 0.1 })
  // Spring-smoothed scale for hover expand
  const ringScale = useSpring(ringScaleRaw, { stiffness: 800, damping: 35 })

  // Offset transforms — GPU-composited translate, no layout triggered
  const ringX = useTransform(springX, v => v - 20)
  const ringY = useTransform(springY, v => v - 20)
  const dotX = useTransform(mouseX, v => v - 4)
  const dotY = useTransform(mouseY, v => v - 4)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor-hover]')
      ringScaleRaw.set(el ? 1.8 : 1)
    }

    // passive: true tells the browser this handler will never call
    // preventDefault(), unblocking the scroll compositor thread.
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [mouseX, mouseY, ringScaleRaw]) // motion values are stable refs — runs once

  return (
    <>
      {/* Outer ring — spring-delayed, scales on hover */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(139,92,246,0.45)',
          pointerEvents: 'none',
          zIndex: 99998,
          scale: ringScale,
          willChange: 'transform',
        }}
      />
      {/* Inner dot — tracks raw mouse position with no lag */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#8B5CF6',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      />
    </>
  )
}

export default memo(CustomCursor)
