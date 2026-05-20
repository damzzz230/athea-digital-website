import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

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

const projects = [
  {
    id: 1,
    name: 'Luxe Hair Studio',
    niche: 'Salons',
    tag: 'Hair Salon',
    description: 'A sleek booking-forward site for a premium Joburg salon. Gallery-led with WhatsApp booking integration.',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
    accent: '#3B82F6',
  },
  {
    id: 2,
    name: 'Volt Electrical JHB',
    niche: 'Trades',
    tag: 'Electrical',
    description: 'Emergency-call-first design for a Johannesburg electrician. One-tap call CTA above the fold.',
    gradient: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1f3a1f 100%)',
    accent: '#22c55e',
  },
  {
    id: 3,
    name: 'Iron & Ink Tattoo',
    niche: 'Fitness',
    tag: 'Tattoo Studio',
    description: 'Portfolio-first site for a Sandton tattoo studio. Dark editorial aesthetic with artist profiles.',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #1a1212 100%)',
    accent: '#ef4444',
  },
  {
    id: 4,
    name: 'The Grind Cafe',
    niche: 'Restaurants',
    tag: 'Restaurant',
    description: 'Warm, menu-focused site for a Parkhurst neighbourhood cafe. Online reservations via WhatsApp.',
    gradient: 'linear-gradient(135deg, #1a1205 0%, #2d2210 50%, #1a1a0a 100%)',
    accent: '#f59e0b',
  },
  {
    id: 5,
    name: 'Peak Performance PT',
    niche: 'Fitness',
    tag: 'Fitness',
    description: 'Conversion-focused site for a personal trainer in Randburg. Package pricing and lead capture form.',
    gradient: 'linear-gradient(135deg, #0a1a0a 0%, #0d2b0d 50%, #112211 100%)',
    accent: '#10b981',
  },
  {
    id: 6,
    name: 'DetailCraft Auto',
    niche: 'Trades',
    tag: 'Auto Detailing',
    description: 'Before/after gallery site for a premium auto detailer in Midrand. Package pricing with quote form.',
    gradient: 'linear-gradient(135deg, #0d0d1a 0%, #151525 50%, #1a1a2e 100%)',
    accent: '#8b5cf6',
  },
]

const filters = ['All', 'Salons', 'Trades', 'Restaurants', 'Fitness']

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.niche === activeFilter || p.tag.toLowerCase().includes(activeFilter.toLowerCase()))

  return (
    <div style={{ background: '#0A0A0A' }}>
      {/* Hero */}
      <section style={{ padding: '160px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '500px',
          height: '400px',
          background: 'radial-gradient(circle at bottom right, rgba(59,130,246,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: '16px' }}
          >
            Our Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#F0F0F0',
              maxWidth: '700px',
              marginBottom: '20px',
            }}
          >
            Sites that perform<br />
            <span style={{ color: '#3B82F6' }}>in the real world.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.05rem', color: '#A0A0A0', maxWidth: '480px', lineHeight: 1.7 }}
          >
            A selection of sites we've built for local Johannesburg businesses. Each one is designed to win new customers, not just look good.
          </motion.p>
        </div>
      </section>

      {/* Filter row */}
      <section style={{ padding: '0 24px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {filters.map((f) => (
                <motion.button
                  key={f}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    padding: '8px 18px',
                    borderRadius: '100px',
                    border: activeFilter === f ? '1px solid #3B82F6' : '1px solid rgba(255,255,255,0.08)',
                    background: activeFilter === f ? 'rgba(59,130,246,0.15)' : 'transparent',
                    color: activeFilter === f ? '#3B82F6' : '#A0A0A0',
                    transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  {f}
                </motion.button>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  style={{
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '20px',
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
                  {/* Image placeholder */}
                  <div style={{
                    height: '220px',
                    background: p.gradient,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}>
                      <div style={{
                        width: '48px',
                        height: '2px',
                        background: p.accent,
                        opacity: 0.6,
                        borderRadius: '1px',
                      }} />
                      <span style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        color: 'rgba(240,240,240,0.35)',
                        letterSpacing: '-0.01em',
                      }}>
                        {p.name}
                      </span>
                      <div style={{
                        width: '24px',
                        height: '2px',
                        background: p.accent,
                        opacity: 0.4,
                        borderRadius: '1px',
                      }} />
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '22px 24px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <span style={{
                        display: 'inline-block',
                        background: 'rgba(59,130,246,0.1)',
                        border: '1px solid rgba(59,130,246,0.2)',
                        borderRadius: '100px',
                        padding: '3px 10px',
                        fontSize: '0.72rem',
                        color: '#3B82F6',
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 500,
                      }}>
                        {p.tag}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#F0F0F0', marginBottom: '8px' }}>
                      {p.name}
                    </h3>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: '#A0A0A0', lineHeight: 1.65, marginBottom: '18px' }}>
                      {p.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.82rem',
                        background: 'transparent',
                        color: '#A0A0A0',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '6px',
                        padding: '7px 14px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'color 0.2s ease, border-color 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#3B82F6'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#A0A0A0'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                    >
                      View Project <ExternalLink size={13} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#A0A0A0' }}>No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
