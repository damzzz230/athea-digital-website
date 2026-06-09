import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

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

const tiers = [
  {
    name: 'Starter',
    price: 'R3,499',
    period: 'once-off',
    tagline: 'Perfect for trades and personal trainers',
    recommended: false,
    features: [
      '3-page website',
      'Mobile-first responsive design',
      'WhatsApp CTA button',
      'Google Maps embed',
      'Cloudflare hosting setup',
      'Basic on-page SEO',
    ],
  },
  {
    name: 'Standard',
    price: 'R4,999',
    period: 'once-off',
    tagline: 'Our most popular package',
    recommended: true,
    features: [
      '5-page website',
      'All Starter features',
      'Photo / work gallery',
      'Scroll animations (AOS)',
      'Contact form',
      '1 revision round',
      'Priority delivery',
    ],
  },
  {
    name: 'Retainer Add-on',
    price: 'R499–R600',
    period: '/month',
    tagline: 'Keep your site fresh and current',
    recommended: false,
    features: [
      'Monthly content updates',
      'Copy & image changes',
      'Domain & hosting management',
      'Performance monitoring',
      'Priority support (same day)',
    ],
  },
]

const faqs = [
  {
    q: 'How does payment work?',
    a: 'We design your site first at no cost. Once you approve it, pay 50% to kick off. We deliver the full site within 7 days — balance due on completion.',
  },
  {
    q: 'What do I need to provide?',
    a: 'Ideally: your logo (or we can help create one), some photos of your work or business (phone photos are fine), your services list and pricing, and your contact details. That\'s it — we handle the copy, design, and build.',
  },
  {
    q: 'Can I cancel the retainer?',
    a: 'Yes — the retainer is month-to-month with no lock-in. Cancel anytime with 7 days notice. Your site remains yours regardless of whether you keep the retainer.',
  },
]

function FAQ({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          color: '#F0F0F0',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 600,
          fontSize: '1rem',
          textAlign: 'left',
          gap: '16px',
        }}
      >
        {item.q}
        <span style={{ flexShrink: 0, color: '#3B82F6' }}>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.9rem',
          color: '#A0A0A0',
          lineHeight: 1.75,
          paddingBottom: '20px',
        }}>
          {item.a}
        </p>
      </motion.div>
    </div>
  )
}

export default function Pricing() {
  const [selectedTier, setSelectedTier] = useState(null)
  const [hoveredTier, setHoveredTier] = useState(null)

  return (
    <div style={{ background: '#0A0A0A' }}>
      {/* Hero */}
      <section style={{ padding: '160px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: '16px' }}
          >
            Transparent Pricing
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
              marginBottom: '20px',
            }}
          >
            Flat rates.<br />
            <span style={{ color: '#3B82F6' }}>No surprises.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.05rem', color: '#A0A0A0', maxWidth: '500px', lineHeight: 1.7, margin: '0 auto' }}
          >
            All packages are once-off payments — no monthly platform fees, no hidden charges. You own your site outright.
          </motion.p>
        </div>
      </section>

      {/* Pricing cards */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}>
            {tiers.map((t, i) => {
              const isSelected = selectedTier === t.name
              const isHovered = hoveredTier === t.name
              const isActive = isSelected || isHovered
              const anotherSelected = selectedTier !== null && !isSelected

              return (
              <FadeUp key={t.name} delay={i * 0.1}>
                <div
                  className={t.recommended && !anotherSelected ? 'pulse-border' : ''}
                  style={{
                    background: t.recommended
                      ? (anotherSelected ? '#0d1117' : '#111827')
                      : '#111111',
                    border: t.recommended
                      ? `2px solid ${anotherSelected ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.6)'}`
                      : `1px solid ${isActive ? '#3B82F6' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: '20px',
                    padding: '36px',
                    position: 'relative',
                    cursor: 'pointer',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: isActive
                      ? '0 20px 60px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.6)'
                      : 'none',
                    opacity: anotherSelected && !isActive ? 0.5 : 1,
                    transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease, background 0.3s ease',
                  }}
                  onMouseEnter={() => setHoveredTier(t.name)}
                  onMouseLeave={() => setHoveredTier(null)}
                  onClick={() => setSelectedTier(prev => prev === t.name ? null : t.name)}
                >
                  {t.recommended && (
                    <div style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#3B82F6',
                      color: '#0A0A0A',
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '4px 14px',
                      borderRadius: '100px',
                      whiteSpace: 'nowrap',
                    }}>
                      Most Popular
                    </div>
                  )}

                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: t.recommended ? '#3B82F6' : '#A0A0A0', marginBottom: '8px' }}>
                    {t.name}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 2.6rem)', color: '#F0F0F0', letterSpacing: '-0.03em' }}>
                      {t.price}
                    </span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: '#A0A0A0' }}>
                      {t.period}
                    </span>
                  </div>

                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: '#A0A0A0', marginBottom: '28px', lineHeight: 1.5 }}>
                    {t.tagline}
                  </p>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', marginBottom: '28px' }}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '11px' }}>
                      {t.features.map((f) => (
                        <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <Check size={15} style={{ color: '#3B82F6', flexShrink: 0, marginTop: '3px' }} />
                          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: '#A0A0A0', lineHeight: 1.5 }}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/contact" style={{ textDecoration: 'none', display: 'block' }}>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        width: '100%',
                        padding: '13px',
                        borderRadius: '8px',
                        border: t.recommended ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        background: t.recommended ? '#3B82F6' : 'transparent',
                        color: t.recommended ? '#0A0A0A' : '#F0F0F0',
                        letterSpacing: '0.02em',
                        boxShadow: t.recommended ? '0 0 24px rgba(59,130,246,0.3)' : 'none',
                      }}
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>
              </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '40px 24px 100px', background: '#0D0D0D' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: '12px' }}>
                Common Questions
              </p>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#F0F0F0', letterSpacing: '-0.02em' }}>
                FAQ
              </h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div>
              {faqs.map((item) => (
                <FAQ key={item.q} item={item} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
