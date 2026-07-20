import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function LegalSection({ title, children }) {
  return (
    <FadeUp>
      <section style={{ marginBottom: '36px' }}>
        <h2 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '1.15rem',
          color: '#F0EDE8',
          marginBottom: '12px',
          letterSpacing: '-0.01em',
        }}>
          {title}
        </h2>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.95rem',
          color: '#9A9A9A',
          lineHeight: 1.8,
        }}>
          {children}
        </div>
      </section>
    </FadeUp>
  )
}

export function LegalList({ items }) {
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', margin: '10px 0' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span style={{ color: '#8B5CF6', flexShrink: 0, marginTop: '2px' }}>—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function LegalPageLayout({ eyebrow, title, lastUpdated, intro, children }) {
  return (
    <div style={{ background: '#0A0A0F' }}>
      <section className="pt-[120px] px-4 pb-16 md:pt-[160px] md:px-6 md:pb-20" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B5CF6', marginBottom: '16px' }}
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 6vw, 3.4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#F0EDE8',
              marginBottom: '14px',
            }}
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(154,154,154,0.6)', marginBottom: intro ? '24px' : 0 }}
          >
            Last updated: {lastUpdated}
          </motion.p>
          {intro && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.02rem', color: '#9A9A9A', lineHeight: 1.7 }}
            >
              {intro}
            </motion.p>
          )}
        </div>
      </section>

      <section className="px-4 pb-24 md:px-6" style={{ background: '#0A0A0F' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          {children}
        </div>
      </section>
    </div>
  )
}
