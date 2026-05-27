/**
 * Central GSAP setup — import { gsap, ScrollTrigger } from here everywhere
 * so plugins are registered exactly once.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
