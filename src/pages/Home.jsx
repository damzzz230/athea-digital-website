import { useRef, useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, useTransform, useScroll, animate, useAnimation } from 'framer-motion'
import {
  Scissors, UtensilsCrossed, Wrench, Dumbbell, Palette, Car,
  ArrowRight, Zap, Smartphone, Clock, ChevronRight, ExternalLink
} from 'lucide-react'

const heroWords = ["We're So Good,", "We Build It", "First."]

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
    body: 'No discovery calls that drag on for weeks. We spec-build your site and have it live faster than any traditional agency.',
  },
]

const portfolioPreviews = [
  // { name: 'Luxe Hair Studio', niche: 'Hair Salon', gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
  { name: 'Arc Energy JHB', niche: 'Electrical', gradient: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1f3a1f 100%)', url: 'https://www.arcenergy.co.za' },
  // { name: 'Iron & Ink Tattoo', niche: 'Tattoo Studio', gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #1a1a1a 100%)' },
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
    isBlue ? ['#3B82F6', '#3B82F6'] : ['#F0F0F0', 'rgba(240,240,240,0.15)']
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

// ── Logo3D ───────────────────────────────────────────────────────────────────
function Logo3D() {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const rotXMV  = useMotionValue(0)
  const rotYMV  = useMotionValue(0)
  const glowXMV = useMotionValue(50)
  const glowYMV = useMotionValue(50)

  const glowControls = useAnimation()

  const MAX  = 12
  const LERP = 0.08

  const lerpRef    = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 })
  const rafRef     = useRef(null)
  const hovRef     = useRef(false)
  const springsRef = useRef([])

  const startBreathing = useCallback(() => {
    glowControls.start({
      scale:   [1, 1.08, 1],
      opacity: [0.6, 0.85, 0.6],
      transition: { duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
    })
  }, [glowControls])

  const tick = useCallback(() => {
    const s = lerpRef.current
    s.cx += (s.tx - s.cx) * LERP
    s.cy += (s.ty - s.cy) * LERP

    rotXMV.set(-s.cy * 2 * MAX)
    rotYMV.set( s.cx * 2 * MAX)
    glowXMV.set(50 + s.cx * 30)
    glowYMV.set(50 + s.cy * 30)

    if (hovRef.current) rafRef.current = requestAnimationFrame(tick)
  }, [rotXMV, rotYMV, glowXMV, glowYMV])

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    lerpRef.current.tx = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width  - 0.5))
    lerpRef.current.ty = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top)  / rect.height - 0.5))
  }, [])

  const handleMouseEnter = useCallback(async () => {
    springsRef.current.forEach(a => a?.stop?.())
    springsRef.current = []
    lerpRef.current.cx =  rotYMV.get() / (2 * MAX)
    lerpRef.current.cy = -rotXMV.get() / (2 * MAX)
    hovRef.current = true
    setIsHovered(true)
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
    await glowControls.start({
      scale: 1.25, opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    })
    if (!hovRef.current) return
    glowControls.start({
      scale: 1.1, opacity: 0.9,
      transition: { duration: 0.4, ease: 'easeInOut' },
    })
  }, [tick, rotXMV, rotYMV, glowControls])

  const handleMouseLeave = useCallback(async () => {
    springsRef.current.forEach(a => a?.stop?.())
    hovRef.current = false
    setIsHovered(false)
    lerpRef.current.tx = 0
    lerpRef.current.ty = 0
    cancelAnimationFrame(rafRef.current)
    springsRef.current = [
      animate(rotXMV,  0,  { type: 'spring', duration: 0.7, bounce: 0.15 }),
      animate(rotYMV,  0,  { type: 'spring', duration: 0.7, bounce: 0.15 }),
      animate(glowXMV, 50, { type: 'spring', duration: 0.7, bounce: 0.15 }),
      animate(glowYMV, 50, { type: 'spring', duration: 0.7, bounce: 0.15 }),
    ]
    await glowControls.start({
      scale: 1, opacity: 0.6,
      transition: { duration: 0.6, ease: 'easeInOut' },
    })
    if (!hovRef.current) startBreathing()
  }, [rotXMV, rotYMV, glowXMV, glowYMV, glowControls, startBreathing])

  useEffect(() => {
    startBreathing()
    return () => {
      cancelAnimationFrame(rafRef.current)
      springsRef.current.forEach(a => a?.stop?.())
    }
  }, [startBreathing])

  const glowLeft = useTransform(glowXMV, v => `${v}%`)
  const glowTop  = useTransform(glowYMV, v => `${v}%`)

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        flex: '1 1 400px',
        height: '520px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        perspective: '900px',
      }}
    >
      <motion.div
        animate={glowControls}
        initial={{ scale: 1, opacity: 0.6 }}
        style={{
          position: 'absolute',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.12) 40%, transparent 70%)',
          filter: 'blur(40px)',
          left: glowLeft,
          top: glowTop,
          x: '-50%',
          y: '-50%',
          pointerEvents: 'none',
        }}
      />
      <div style={{
        position: 'absolute',
        width: '340px',
        height: '340px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)',
        filter: 'blur(24px)',
        pointerEvents: 'none',
      }} />

      <motion.div
        style={{
          rotateX: rotXMV,
          rotateY: rotYMV,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.4) 0%, transparent 70%)',
            filter: 'blur(32px)',
            transform: 'translateZ(-60px) scale(0.85)',
            opacity: isHovered ? 0.9 : 0.5,
            transition: 'opacity 0.4s ease',
          }}
        />
        <img
          src="/images/Athea_Digital_3D_Logo.png"
          alt="Athea Digital"
          draggable={false}
          style={{
            width: '560px',
            maxWidth: '90vw',
            height: 'auto',
            display: 'block',
            userSelect: 'none',
            transform: 'rotate(90deg)',
            filter: isHovered
              ? 'drop-shadow(0 0 32px rgba(59,130,246,0.6)) drop-shadow(0 0 8px rgba(59,130,246,0.4))'
              : 'drop-shadow(0 0 20px rgba(59,130,246,0.4)) drop-shadow(0 0 6px rgba(59,130,246,0.25))',
            transition: 'filter 0.4s ease',
          }}
        />
      </motion.div>
    </div>
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
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')
  return (
    <span
      ref={ref}
      aria-label={text}
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
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// ── CountUp — number animates from 0 to target on scroll into view ───────────
function CountUp({ to, suffix = '', duration = 1.5 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, v => Math.round(v))

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration, ease: 'easeOut' })
    }
  }, [inView, count, to, duration])

  return (
    <span ref={ref} style={{ display: 'inline' }}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  )
}

// ── NicheHorizontalScroll — pinned horizontal scroll for Industries section ──
function NicheHorizontalScroll() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  // Initialise with a reasonable desktop default; recalculated after mount
  const [translateXEnd, setTranslateXEnd] = useState(-800)
  const [sectionHeight, setSectionHeight] = useState('250vh')

  useEffect(() => {
    const calc = () => {
      if (!trackRef.current) return
      const trackW = trackRef.current.scrollWidth
      const viewW  = window.innerWidth
      // How far we need to pull the strip left so the last card is fully visible
      const translation = Math.max(0, trackW - viewW + 48)
      setTranslateXEnd(-translation)
      // Make scroll distance give a ~0.8× pan feel (comfortable, not too slow)
      const scrollPx = Math.ceil(translation / 0.8)
      setSectionHeight(`calc(100vh + ${scrollPx}px)`)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, translateXEnd])

  return (
    <section
      ref={containerRef}
      style={{ height: sectionHeight, position: 'relative', marginBottom: '80px' }}
    >
      {/* Sticky viewport-height panel */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '32px',
      }}>
        {/* Section label fades in as panel enters view */}
        <FadeUp>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(160,160,160,0.5)',
            textAlign: 'center',
            margin: 0,
          }}>
            Industries We Serve
          </p>
        </FadeUp>

        {/* Horizontally-scrolling card strip */}
        <motion.div
          ref={trackRef}
          style={{
            x,
            display: 'flex',
            gap: '12px',
            paddingLeft: '24px',
            paddingRight: '24px',
            willChange: 'transform',
          }}
        >
          {niches.map((n) => (
            <Link
              key={n.label}
              to="/services"
              style={{ textDecoration: 'none', display: 'block', flex: '0 0 280px' }}
            >
              <div
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '20px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  transition: 'border-color 0.25s ease, background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#3B82F6'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.6)'
                  e.currentTarget.style.background = 'rgba(59,130,246,0.05)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.background = '#111111'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <n.icon size={22} style={{ color: '#3B82F6' }} />
                <span style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: '#A0A0A0',
                  textAlign: 'center',
                }}>
                  {n.label}
                </span>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Feature body renderer — isolates CountUp for the 80% stat ────────────────
function FeatureBody({ feature }) {
  const bodyStyle = {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.9rem',
    color: '#A0A0A0',
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
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  return (
    <div style={{ background: '#0A0A0A' }}>

      {/* ── Hero ── */}
      <section ref={heroRef} style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '140px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow blob */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

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
          <div style={{ flex: '1 1 380px', minWidth: 0 }}>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: '100px',
                padding: '6px 14px',
                marginBottom: '32px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3B82F6', display: 'inline-block' }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: '#3B82F6', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
                Johannesburg Web Design Studio
              </span>
            </motion.div>

            {/* Hero headline */}
            <h1 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: '#F0F0F0',
              marginBottom: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.04em',
            }}>
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
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                color: '#A0A0A0',
                maxWidth: '480px',
                lineHeight: 1.65,
                marginBottom: '44px',
              }}
            >
              See your finished website before you spend a cent. Custom-built for your business. Delivered in 5 days.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}
            >
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    background: '#3B82F6',
                    color: '#0A0A0A',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px 28px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 0 24px rgba(59,130,246,0.35)',
                    letterSpacing: '0.01em',
                  }}
                >
                  Get In Touch <ArrowRight size={16} />
                </motion.button>
              </Link>
              <Link to="/portfolio" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    background: 'transparent',
                    color: '#F0F0F0',
                    border: '1px solid rgba(240,240,240,0.15)',
                    borderRadius: '8px',
                    padding: '14px 28px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    letterSpacing: '0.01em',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#3B82F6'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(59,130,246,0.25)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(240,240,240,0.15)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  See Our Work <ArrowRight size={16} />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right: interactive 3D logo */}
          <Logo3D />
        </div>
      </section>

      {/* ── Industries We Serve — horizontal scroll ── */}
      <NicheHorizontalScroll />

      {/* ── Why Athea ── */}
      <section style={{ padding: '80px 24px', background: '#0D0D0D' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <FadeUp>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#3B82F6',
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
              color: '#F0F0F0',
              letterSpacing: '-0.02em',
            }}>
              <MaskReveal text="Built Different. Delivered Faster." />
            </h2>
          </div>

          {/* Staggered feature cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUpItem}>
                <div
                  style={{
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '16px',
                    padding: '32px',
                    height: '100%',
                    transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.6)'
                    e.currentTarget.style.borderColor = '#3B82F6'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(59,130,246,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}>
                    <f.icon size={20} style={{ color: '#3B82F6' }} />
                  </div>
                  <h3 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    color: '#F0F0F0',
                    marginBottom: '12px',
                  }}>
                    {f.title}
                  </h3>
                  <FeatureBody feature={f} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Portfolio preview ── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section header */}
          <FadeUp>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '48px',
              flexWrap: 'wrap',
              gap: '16px',
            }}>
              <div>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#3B82F6',
                  marginBottom: '8px',
                }}>
                  Recent Work
                </p>
                {/* Word-by-word mask reveal on the H2 */}
                <h2 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  color: '#F0F0F0',
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
                    color: '#3B82F6',
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
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {portfolioPreviews.map((p) => (
              <motion.div key={p.name} variants={fadeUpItem}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(59,130,246,0.12)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
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
                        color: 'rgba(240,240,240,0.4)',
                        letterSpacing: '-0.02em',
                      }}>
                        {p.name}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '20px 24px' }}>
                    <span style={{
                      display: 'inline-block',
                      background: 'rgba(59,130,246,0.1)',
                      border: '1px solid rgba(59,130,246,0.2)',
                      borderRadius: '100px',
                      padding: '3px 10px',
                      fontSize: '0.75rem',
                      color: '#3B82F6',
                      fontFamily: 'DM Sans, sans-serif',
                      marginBottom: '8px',
                    }}>
                      {p.niche}
                    </span>
                    <h3 style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: '#F0F0F0',
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
                          color: '#3B82F6',
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
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{
              background: '#111111',
              border: '1px solid rgba(59,130,246,0.15)',
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
                background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#3B82F6',
                marginBottom: '16px',
              }}>
                Ready To Get Online?
              </p>

              {/* Word-by-word mask reveal on the CTA H2 */}
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                color: '#F0F0F0',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
                justifyContent: 'center',
              }}>
                <MaskReveal text="Let's build something that works." />
              </h2>

              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '1rem',
                color: '#A0A0A0',
                maxWidth: '480px',
                margin: '0 auto 36px',
              }}>
                No lengthy briefs. No upfront payment. We build your site — you see it, love it, then we talk about the rest.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <a
                  href="https://wa.me/27000000000?text=Hi%20Athea%20Digital%2C%20I%27d%20like%20a%20quote"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
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
                      gap: '8px',
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </motion.button>
                </a>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      background: 'transparent',
                      color: '#F0F0F0',
                      border: '1px solid rgba(240,240,240,0.15)',
                      borderRadius: '8px',
                      padding: '14px 28px',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#3B82F6'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(59,130,246,0.25)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(240,240,240,0.15)'
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
