import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { lenisInstance } from '../lib/lenisInstance'

/**
 * Initialises Lenis smooth scroll and wires it into GSAP's ticker so
 * GSAP ScrollTrigger stays perfectly in sync with the Lenis scroll position.
 *
 * Returns a ref whose `.current` is the Lenis instance — pass it where you
 * need to call lenis.scrollTo() (e.g. route-change resets).
 */
export function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      // How long (seconds) a full-page scroll gesture takes to settle
      duration: 1.2,
      // Exponential ease — feels snappy at start, silky at the end
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false, // keep native on mobile (feels more natural)
    })

    lenisRef.current = lenis
    lenisInstance.current = lenis

    // Tell GSAP ScrollTrigger to re-check trigger positions on every Lenis tick
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis via GSAP's ticker so all animations are on the same clock
    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0) // prevents GSAP from compensating for tab-focus lag

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisRef.current = null
      lenisInstance.current = null
    }
  }, [])

  return lenisRef
}
