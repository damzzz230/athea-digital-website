import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const ITEMS = [
  'Web Design',
  '✦',
  'SEO Optimized',
  '✦',
  'Mobile-First',
  '✦',
  'Delivered in Days',
  '✦',
  'Custom Code',
  '✦',
  'Conversion-Focused',
  '✦',
  'Local Business',
  '✦',
  'No Upfront Payment',
  '✦',
]

/**
 * A GSAP-powered infinite marquee ticker.
 * - Items are doubled so the seam is invisible when GSAP loops.
 * - Pauses on hover, resumes on leave.
 * - `speed` = seconds to traverse one full set width.
 */
export default function Marquee({ speed = 32 }) {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let cleanupEvents = () => {}

    // Measure after first paint so scrollWidth is accurate
    const rafId = requestAnimationFrame(() => {
      // track contains two identical sets; half = one full set width
      const half = track.scrollWidth / 2

      gsap.set(track, { x: 0 })

      tweenRef.current = gsap.to(track, {
        x: -half,
        duration: speed,
        ease: 'none',
        repeat: -1, // seamless: at -half the content looks identical to 0
      })

      // Hover pause / resume
      const wrapper = track.parentElement
      const pause  = () => tweenRef.current?.pause()
      const resume = () => tweenRef.current?.play()
      wrapper.addEventListener('mouseenter', pause)
      wrapper.addEventListener('mouseleave', resume)

      cleanupEvents = () => {
        wrapper.removeEventListener('mouseenter', pause)
        wrapper.removeEventListener('mouseleave', resume)
      }
    })

    return () => {
      cancelAnimationFrame(rafId)
      tweenRef.current?.kill()
      cleanupEvents()
    }
  }, [speed])

  // Double items → one full set (visible) + one set (waiting in the wings)
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '18px 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(13,13,13,0.95)',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '48px',
          whiteSpace: 'nowrap',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily:     item === '✦' ? 'serif' : 'DM Sans, sans-serif',
              fontWeight:     item === '✦' ? 400      : 500,
              fontSize:       item === '✦' ? '0.6rem' : '0.72rem',
              color:          item === '✦'
                ? 'rgba(59,130,246,0.45)'
                : 'rgba(160,160,160,0.38)',
              letterSpacing:  item === '✦' ? 0 : '0.1em',
              textTransform:  'uppercase',
              lineHeight:     1,
              userSelect:     'none',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
