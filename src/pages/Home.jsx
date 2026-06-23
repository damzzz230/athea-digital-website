import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useTransform, useScroll } from 'framer-motion'
import {
  Scissors, UtensilsCrossed, Wrench, Dumbbell, Palette, Car,
  ArrowRight, Zap, Smartphone, Clock, ChevronRight, ExternalLink
} from 'lucide-react'
import { gsap } from '../lib/gsap'
import Marquee from '../components/Marquee'
import BackgroundVideo from '../components/BackgroundVideo'
import { BackgroundCircles } from '../components/ui/background-circles'

const heroWords = ["See It.", "Love It.", "Own It."]

const niches = [
  { icon: Scissors, label: 'Hair Salons' },
  { icon: UtensilsCrossed, label: 'Restaurants' },
  { icon: Wrench, label: 'Trades' },
  { icon: Dumbbell, label: 'Fitness' },
  { icon: Palette, label: 'Tattoo Studios' },
  { icon: Car, label: 'Auto Detailing' },
]

const features = [
  {
    icon: Zap,
    title: 'Built to Convert',
    body: 'Every layout decision, CTA placement, and copy choice is made with one goal: turning visitors into paying customers for your business.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Always',
    body: 'Over 80% of local business searches happen on mobile. Your site is designed for thumb-scrolling first — desktop second.',
  },
  {
    icon: Clock,
    title: 'Launched in Days',
    body: 'No discovery calls that drag on for weeks. We design your site before you commit — approve it, pay 50%, and have the full build delivered in 7 days.',
  },
]

const portfolioPreviews = [
  // { name: 'Luxe Hair Studio', niche: 'Hair Salon', gradient: 'linear-gradient(135deg, #12121A 0%, #12121A 50%, #0A0A0F 100%)' },
  { name: 'Arc Energy JHB', niche: 'Electrical', gradient: 'linear-gradient(135deg, #0A0A0F 0%, #12121A 50%, #12121A 100%)', url: 'https://www.arcenergy.co.za' },
  // { name: 'Iron & Ink Tattoo', niche: 'Tattoo Studio', gradient: 'linear-gradient(135deg, #12121A 0%, #2A1E26 50%, #12121A 100%)' },
]

// ── Stagger variants ─────────────────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// ── HeroWord ─────────────────────────────────────────────────────────────────
function HeroWord({ word, index, total, scrollYProgress }) {
  const start = (index / total) * 0.6
  const end = start + 0.15
  const isBlue = index === total - 1

  const color = useTransform(
    scrollYProgress,
    [start, end],
    isBlue ? ['#8B5CF6', '#8B5CF6'] : ['#F0EDE8', 'rgba(240,237,232,0.15)']
  )

  return (
    <motion.span
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'inline-block', color }}
    >
      {word}
    </motion.span>
  )
}

// ── FadeUp — whileInView, opacity + transform only ───────────────────────────
function FadeUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// ── MaskReveal — word-by-word clip reveal for major headings ─────────────────
function MaskReveal({ text }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px -80px 0px' })
  const words = text.split(' ')
  return (
    <span
      ref={ref}
      aria-label={text}
      className="justify-center md:justify-start"
      style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.28em', rowGap: 0 }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ overflow: 'hidden', display: 'inline-block', lineHeight: 'inherit' }}
        >
          <motion.span
            style={{ display: 'inline-block', lineHeight: 'inherit' }}
            initial={{ y: '105%' }}
            animate={inView ? { y: 0 } : { y: '105%' }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// ── CountUp — number steps from 0 to target on scroll into view ──────────────
function CountUp({ to, suffix = '', stepMs = 100 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let current = 0
    const id = setInterval(() => {
      current += 1
      setCount(current)
      if (current >= to) clearInterval(id)
    }, stepMs)
    return () => clearInterval(id)
  }, [inView, to, stepMs])

  return (
    <span ref={ref} style={{ display: 'inline' }}>
      {count}{suffix}
    </span>
  )
}

// ── NicheScrollReveal — radial card burst driven by scroll progress ──────────
function NicheScrollReveal() {
  const sectionRef = useRef(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  // Generous margin so BackgroundCircles' infinite rotate/scale/gradient
  // animations mount a little before the section arrives and unmount once
  // it's well past — they'd otherwise keep animating (and repainting) for
  // the entire scroll length of the page, not just while this is on screen.
  const isNearViewport = useInView(sectionRef, { margin: '300px' })

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      if (!sectionRef.current) return
      const offsetTop = sectionRef.current.offsetTop
      // Reserve only the first 55% of the pinned scroll window for the
      // burst animation itself — the remaining 45% holds the fully-formed
      // result on screen (instead of unpinning right as it finishes).
      const pinnedWindow  = sectionRef.current.offsetHeight - window.innerHeight
      const animationSpan = Math.max(pinnedWindow * 0.55, 1)
      const relativeScroll = Math.max(0, window.scrollY - offsetTop)
      setAnimationProgress(Math.min(relativeScroll / animationSpan, 1))
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update() // seed on mount in case already scrolled
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const expandRadius   = animationProgress * 220
  const cardOpacity    = Math.min(animationProgress * 3, 1)
  const angleStep      = (2 * Math.PI) / 6

  return (
    <>
    {/* Mobile — static 2-column grid (no orbital/scroll-pin math) */}
    <section className="block md:hidden" style={{ padding: '64px 16px', position: 'relative', overflow: 'hidden' }}>
      <FadeUp>
        <p style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '1.1rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#F0EDE8',
          fontWeight: 700,
          textAlign: 'center',
          margin: '0 0 28px',
        }}>
          Industries We Serve
        </p>
      </FadeUp>
      <div className="grid grid-cols-2 gap-3">
        {niches.map((n, i) => (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
          >
            <Link to="/services" style={{ textDecoration: 'none' }}>
              <div style={{
                width: '100%',
                padding: '16px',
                background: '#12121A',
                border: '1px solid #2A2A3A',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                minHeight: '44px',
              }}>
                <n.icon size={22} className="mx-auto" style={{ color: '#8B5CF6' }} />
                <span className="text-center" style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: '#9A9A9A',
                  lineHeight: 1.3,
                }}>
                  {n.label}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Desktop — orbital scroll-pinned reveal */}
    <section
      ref={sectionRef}
      className="hidden md:block"
      style={{ height: '130vh', position: 'relative', marginBottom: '80px' }}
    >
      {/* Sticky viewport-height panel */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
      }}>

        {/* Layer 1 — Animated purple circles background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {isNearViewport && <BackgroundCircles variant="athea" className="opacity-40" />}
        </div>

        {/* Layer 2 — Vignette to blend edges cleanly */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 75% 75% at center, transparent 25%, #0A0A0F 100%)',
          }}
        />

        {/* Layer 3 — All section content */}
        <div className="relative z-10" style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
        }}>

        {/* Section label */}
        <FadeUp>
          <p style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '1.1rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#F0EDE8',
            fontWeight: 700,
            textAlign: 'center',
            margin: 0,
          }}>
            Industries We Serve
          </p>
        </FadeUp>

        {/* Radial burst container */}
        <div style={{ position: 'relative', width: '500px', height: '500px' }}>

          {/* Outer ring — appears after 60% progress */}
          {animationProgress > 0.6 && (
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1px solid #2A2A3A',
              opacity: Math.min((animationProgress - 0.6) / 0.4, 1),
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none',
            }} />
          )}

          {/* Inner ring — appears after 20% progress */}
          {animationProgress > 0.2 && (
            <div style={{
              position: 'absolute',
              top: '12.5%',
              left: '12.5%',
              width: '75%',
              height: '75%',
              borderRadius: '50%',
              border: '1px solid rgba(139,92,246,0.15)',
              opacity: Math.min((animationProgress - 0.2) / 0.4, 1),
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none',
            }} />
          )}

          {/* Centre orb */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.06) 55%, transparent 75%)',
            border: '1px solid rgba(139,92,246,0.25)',
            boxShadow: `0 0 ${40 + animationProgress * 40}px rgba(139,92,246,${0.1 + animationProgress * 0.15})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            transition: 'box-shadow 0.1s linear',
          }}>
            {animationProgress > 0.6 && (
              <>
                <span style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  color: '#F0EDE8',
                  letterSpacing: '-0.01em',
                  opacity: Math.min((animationProgress - 0.6) / 0.4, 1),
                  transition: 'opacity 0.3s ease',
                }}>
                  Your Industry.
                </span>
                <span style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  color: '#8B5CF6',
                  letterSpacing: '-0.01em',
                  opacity: Math.min((animationProgress - 0.6) / 0.4, 1),
                  transition: 'opacity 0.3s ease',
                }}>
                  Your Site.
                </span>
              </>
            )}
          </div>

          {/* Radial niche cards */}
          {niches.map((n, i) => {
            const angle = -Math.PI / 2 + angleStep * i
            const x     = Math.cos(angle) * expandRadius
            const y     = Math.sin(angle) * expandRadius
            return (
              <Link
                key={n.label}
                to="/services"
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    width: '110px',
                    height: '110px',
                    background: '#12121A',
                    border: '1px solid #2A2A3A',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: cardOpacity,
                    cursor: 'pointer',
                    transition: 'border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#8B5CF6'
                    e.currentTarget.style.boxShadow  = '0 20px 60px rgba(139,92,246,0.15), 0 0 0 1px rgba(139,92,246,0.6)'
                    e.currentTarget.style.background  = 'rgba(139,92,246,0.05)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#2A2A3A'
                    e.currentTarget.style.boxShadow  = 'none'
                    e.currentTarget.style.background  = '#12121A'
                  }}
                >
                  <n.icon size={22} style={{ color: '#8B5CF6' }} />
                  <span style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    color: '#9A9A9A',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    padding: '0 6px',
                  }}>
                    {n.label}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
        </div>
      </div>
    </section>
    </>
  )
}

// ── Feature card — ref-based inView animation ─────────────────────────────────
function FeatureCard({ feature, direction, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: direction.x, y: direction.y }}
      transition={{ duration: 1.1, delay: 0.2 + delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ opacity: 0 }}
    >
      <div
        style={{
          background: '#1C1C28',
          border: '1px solid #2A2A3A',
          borderRadius: '16px',
          padding: '32px',
          height: '100%',
          transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-6px)'
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(139,92,246,0.15), 0 0 0 1px rgba(139,92,246,0.6)'
          e.currentTarget.style.borderColor = '#8B5CF6'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = '#2A2A3A'
        }}
      >
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          background: 'rgba(139,92,246,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}>
          <feature.icon size={20} style={{ color: '#8B5CF6' }} />
        </div>
        <h3 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '1.15rem',
          color: '#F0EDE8',
          marginBottom: '12px',
        }}>
          {feature.title}
        </h3>
        <FeatureBody feature={feature} />
      </div>
    </motion.div>
  )
}

// ── Feature body renderer — isolates CountUp for the 80% stat ────────────────
function FeatureBody({ feature }) {
  const bodyStyle = {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.9rem',
    color: '#9A9A9A',
    lineHeight: 1.7,
  }
  if (feature.title === 'Mobile-First Always') {
    return (
      <p style={bodyStyle}>
        Over <CountUp to={80} />% of local business searches happen on mobile. Your site is designed for thumb-scrolling first — desktop second.
      </p>
    )
  }
  return <p style={bodyStyle}>{feature.body}</p>
}

export default function Home() {
  const heroRef       = useRef(null)
  const floatingOrbRef = useRef(null)  // GSAP-parallax decorative orb

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // GSAP ScrollTrigger — parallax on the secondary hero background orb.
  // Animates a purely decorative element so there's zero conflict with
  // Framer Motion which handles the content/text animations above.
  useEffect(() => {
    if (!floatingOrbRef.current || !heroRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(floatingOrbRef.current, {
        y: -200,            // drifts upward as user scrolls
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,       // slight lag gives a dreamy parallax feel
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div style={{ background: '#0A0A0F' }}>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="min-h-[100dvh] md:min-h-screen pt-[110px] px-4 pb-16 md:pt-[140px] md:px-6 md:pb-20"
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Fullscreen background video — replaces the previous 3D logo animation */}
        <BackgroundVideo />
        {/* Background glow blob */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* GSAP-parallax secondary orb — drifts at a different rate to add depth */}
        <div
          ref={floatingOrbRef}
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '8%',
            width: '480px',
            height: '480px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.045) 0%, transparent 65%)',
            filter: 'blur(72px)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '48px',
          flexWrap: 'wrap',
        }}>
          {/* Left: text content */}
          <div className="text-center md:text-left w-full" style={{ flex: '1 1 380px', minWidth: 0 }}>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.2)',
                borderRadius: '100px',
                padding: '6px 14px',
                marginBottom: '32px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8B5CF6', display: 'inline-block' }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: '#8B5CF6', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
                Johannesburg Web Design Studio
              </span>
            </motion.div>

            {/* Hero headline */}
            <h1
              className="items-center md:items-stretch"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: '#F0EDE8',
                marginBottom: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.04em',
              }}
            >
              {heroWords.map((word, i) => (
                <HeroWord
                  key={i}
                  word={word}
                  index={i}
                  total={heroWords.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mx-auto md:mx-0"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                color: '#9A9A9A',
                maxWidth: '480px',
                lineHeight: 1.65,
                marginBottom: '44px',
              }}
            >
              We build your site before you pay a thing. 50% to start. Full delivery in 7 days. Balance on completion.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex-col md:flex-row justify-center md:justify-start"
              style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
            >
              <Link to="/contact" className="block w-full md:inline-block md:w-auto" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full max-w-[320px] mx-auto md:w-auto md:max-w-none md:mx-0"
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    background: '#8B5CF6',
                    color: '#0A0A0F',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px 28px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 0 24px rgba(139,92,246,0.35)',
                    letterSpacing: '0.01em',
                  }}
                >
                  Get In Touch <ArrowRight size={16} />
                </motion.button>
              </Link>
              <Link to="/portfolio" className="block w-full md:inline-block md:w-auto" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full max-w-[320px] mx-auto md:w-auto md:max-w-none md:mx-0"
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    background: 'transparent',
                    color: '#8B5CF6',
                    border: '1px solid #8B5CF6',
                    borderRadius: '8px',
                    padding: '14px 28px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    letterSpacing: '0.01em',
                    transition: 'background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#8B5CF6'
                    e.currentTarget.style.color = '#0A0A0F'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(139,92,246,0.25)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#8B5CF6'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  See Our Work <ArrowRight size={16} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Marquee ticker — GSAP infinite scroll ── */}
      <Marquee />

      {/* ── Industries We Serve — radial scroll reveal ── */}
      <NicheScrollReveal />

      {/* ── Why Athea ── */}
      <section className="py-16 px-4 md:py-20 md:px-6" style={{ background: '#12121A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <FadeUp>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#8B5CF6',
                marginBottom: '12px',
              }}>
                Why Choose Athea
              </p>
            </FadeUp>
            {/* Word-by-word mask reveal on the H2 */}
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: '#F0EDE8',
              letterSpacing: '-0.02em',
            }}>
              <MaskReveal text="Built Different. Delivered Faster." />
            </h2>
          </div>

          {/* Staggered feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px' }}>
            {features.map((f, i) => {
              const directions = [
                { x: -160, y: 0 },
                { x: 0, y: 140 },
                { x: 160, y: 0 },
              ]
              return (
                <FeatureCard key={f.title} feature={f} direction={directions[i]} delay={i * 0.15} />
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Portfolio preview ── */}
      <section className="py-16 px-4 md:py-20 md:px-6">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section header */}
          <FadeUp>
            <div
              className="flex-col items-center text-center md:flex-row md:items-end md:text-left"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '48px',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#8B5CF6',
                  marginBottom: '8px',
                }}>
                  Recent Work
                </p>
                {/* Word-by-word mask reveal on the H2 */}
                <h2 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  color: '#F0EDE8',
                  letterSpacing: '-0.02em',
                }}>
                  <MaskReveal text="Selected Projects" />
                </h2>
              </div>
              <Link to="/portfolio" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ x: 4 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#8B5CF6',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }}
                >
                  View All Work <ChevronRight size={16} />
                </motion.div>
              </Link>
            </div>
          </FadeUp>

          {/* Staggered portfolio cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: '24px' }}
          >
            {portfolioPreviews.map((p) => (
              <motion.div key={p.name} variants={fadeUpItem}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: '#12121A',
                    border: '1px solid #2A2A3A',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(139,92,246,0.12)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#2A2A3A'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ height: '200px', background: p.gradient, position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        color: 'rgba(240,237,232,0.4)',
                        letterSpacing: '-0.02em',
                      }}>
                        {p.name}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '20px 24px' }}>
                    <span style={{
                      display: 'inline-block',
                      background: 'rgba(139,92,246,0.1)',
                      border: '1px solid rgba(139,92,246,0.2)',
                      borderRadius: '100px',
                      padding: '3px 10px',
                      fontSize: '0.75rem',
                      color: '#8B5CF6',
                      fontFamily: 'DM Sans, sans-serif',
                      marginBottom: '8px',
                    }}>
                      {p.niche}
                    </span>
                    <h3 style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: '#F0EDE8',
                      marginBottom: p.url ? '12px' : 0,
                    }}>
                      {p.name}
                    </h3>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          color: '#8B5CF6',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline' }}
                        onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none' }}
                      >
                        View Site <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 px-4 md:py-20 md:px-6">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{
              background: '#12121A',
              border: '1px solid rgba(139,92,246,0.15)',
              borderRadius: '24px',
              padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Glow orb */}
              <div style={{
                position: 'absolute',
                top: '-60px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '400px',
                height: '200px',
                background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#8B5CF6',
                marginBottom: '16px',
              }}>
                Ready To Get Online?
              </p>

              {/* Word-by-word mask reveal on the CTA H2 */}
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                color: '#F0EDE8',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                flexWrap: 'wrap',
              }}>
                <MaskReveal text="Let's build something that works." />
              </h2>

              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '1rem',
                color: '#9A9A9A',
                maxWidth: '480px',
                margin: '0 auto 36px',
              }}>
                No lengthy briefs. No guessing. We design your site first — love it, pay 50% to kick off, full site in 7 days.
              </p>

              <div className="flex-col md:flex-row" style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <a
                  href="https://wa.me/27615223385?text=Hi%20Athea%20Digital%2C%20I%27d%20like%20a%20quote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto"
                  style={{ textDecoration: 'none' }}
                >
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full max-w-[280px] mx-auto md:w-auto md:max-w-none md:mx-0"
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      background: '#25D366',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '14px 28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </motion.button>
                </a>
                <Link to="/contact" className="w-full md:w-auto" style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full max-w-[280px] mx-auto md:w-auto md:max-w-none md:mx-0"
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      background: 'transparent',
                      color: '#8B5CF6',
                      border: '1px solid #8B5CF6',
                      borderRadius: '8px',
                      padding: '14px 28px',
                      transition: 'background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#8B5CF6'
                      e.currentTarget.style.color = '#0A0A0F'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(139,92,246,0.25)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#8B5CF6'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    Send a Message
                  </motion.button>
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  )
}
