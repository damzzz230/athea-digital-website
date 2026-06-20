import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Scissors, UtensilsCrossed, Wrench, Dumbbell, Palette, Car, ArrowRight } from 'lucide-react'
import { useScreenSize } from '../hooks/use-screen-size'

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function MaskReveal({ text }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
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

function ServiceCard({ service, direction, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-200px' })
  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: direction.x, y: direction.y }}
      transition={{ duration: 1.1, delay: 0.2 + delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ opacity: 0, height: '100%' }}
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        style={{
          background: '#12121A',
          border: '1px solid #2A2A3A',
          borderRadius: '20px',
          overflow: 'hidden',
          height: '100%',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#8B5CF6'
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(139,92,246,0.15), 0 0 0 1px rgba(139,92,246,0.6)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#2A2A3A'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={{
          background: service.color,
          padding: '28px 28px 24px',
          borderBottom: '1px solid #2A2A3A',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(139,92,246,0.15)',
            border: '1px solid rgba(139,92,246,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <service.icon size={22} style={{ color: '#8B5CF6' }} />
          </div>
          <div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#F0EDE8', marginBottom: '4px' }}>
              {service.niche}
            </h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: '#9A9A9A' }}>
              {service.tagline}
            </p>
          </div>
        </div>
        <div style={{ padding: '24px 28px 28px' }}>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(154,154,154,0.5)',
            marginBottom: '14px',
          }}>
            What's Included
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {service.features.map((f) => (
              <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#8B5CF6',
                  flexShrink: 0,
                  marginTop: '7px',
                }} />
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#9A9A9A', lineHeight: 1.6 }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}

const services = [
  {
    icon: Scissors,
    niche: 'Hair Salons',
    tagline: 'Turn foot traffic into bookings',
    features: [
      'Online booking integration & WhatsApp CTA',
      'Service menu with pricing and gallery',
      'Google Maps embed + directions link',
    ],
    color: '#262631',
  },
  {
    icon: UtensilsCrossed,
    niche: 'Restaurants & Cafes',
    tagline: 'Menu online, tables full',
    features: [
      'Digital menu with photos and descriptions',
      'Reservation form or WhatsApp booking',
      'Trading hours, location & Google Maps',
    ],
    color: '#2A2419',
  },
  {
    icon: Wrench,
    niche: 'Trades (Plumbers, Electricians & Construction)',
    tagline: 'Be found when it matters most',
    features: [
      'Emergency call CTA button (one-click)',
      'Services list with coverage area map',
      'Trust badges, licensing & WhatsApp CTA',
    ],
    color: '#1E2A2A',
  },
  {
    icon: Dumbbell,
    niche: 'Fitness & Personal Trainers',
    tagline: 'Turn prospects into members',
    features: [
      'Class schedule or personal training packages',
      'Before/after gallery and testimonials',
      'Lead capture form + WhatsApp booking CTA',
    ],
    color: '#1E2A1E',
  },
  {
    icon: Palette,
    niche: 'Tattoo Studios',
    tagline: 'Let your art do the selling',
    features: [
      'Portfolio gallery with filterable categories',
      'Artist profiles and booking request form',
      'Flash availability section + WhatsApp CTA',
    ],
    color: '#2A1E26',
  },
  {
    icon: Car,
    niche: 'Auto Detailing',
    tagline: 'Show the shine, book the job',
    features: [
      'Package pricing with before/after gallery',
      'Online quote request or WhatsApp CTA',
      'Location, service area & Google Maps',
    ],
    color: '#1E222A',
  },
]

export default function Services() {
  const screenSize = useScreenSize()
  return (
    <div style={{ background: '#0A0A0F' }}>
      {/* Hero */}
      <section className="pt-[120px] px-4 pb-16 md:pt-[160px] md:px-6 md:pb-20" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '0%',
          left: '30%',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="text-center md:text-left" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B5CF6', marginBottom: '16px' }}
          >
            What We Build
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto md:mx-0"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#F0EDE8',
              maxWidth: '900px',
              marginBottom: '20px',
            }}
          >
            A site built for<br className="hidden md:block" />{' '}
            <span style={{ color: '#8B5CF6' }}>your industry.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto md:mx-0"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '1.05rem',
              color: '#9A9A9A',
              maxWidth: '520px',
              lineHeight: 1.7,
            }}
          >
            Cookie-cutter websites don't convert. We build niche-specific sites that speak your customer's language and move them to take action.
          </motion.p>
        </div>
      </section>

      {/* Services grid */}
      <section className="px-4 md:px-6 pb-20">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '24px',
          }}>
            {services.map((s, i) => {
              const mobile = screenSize.lessThan('md')
              const directions = [
                { x: mobile ? -80 : -160, y: 0 },
                { x: 0, y: mobile ? -20 : -120 },
                { x: mobile ? 80 : 160, y: 0 },
                { x: mobile ? -80 : -160, y: 0 },
                { x: 0, y: mobile ? 20 : 120 },
                { x: mobile ? 80 : 160, y: 0 },
              ]
              return (
                <ServiceCard key={s.niche} service={s} direction={directions[i]} delay={i < 3 ? i * 0.1 : (i - 3) * 0.1} />
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 pb-16 md:px-6 md:pb-[100px]">
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <FadeUp>
            <div className="p-6 md:p-12" style={{
              background: '#12121A',
              border: '1px solid rgba(139,92,246,0.12)',
              borderRadius: '20px',
              textAlign: 'center',
            }}>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                color: '#F0EDE8',
                marginBottom: '12px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                <MaskReveal text="Don't see your industry?" />
              </h2>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.95rem',
                color: '#9A9A9A',
                lineHeight: 1.7,
                marginBottom: '28px',
              }}>
                We build for any local business in Johannesburg. If you have customers, we can build something that brings you more of them.
              </p>
              <Link to="/contact" className="block w-full md:inline-block md:w-auto" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full max-w-[280px] mx-auto md:w-auto md:max-w-none md:mx-0"
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
                    boxShadow: '0 0 24px rgba(139,92,246,0.25)',
                  }}
                >
                  Let's Talk <ArrowRight size={16} />
                </motion.button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
