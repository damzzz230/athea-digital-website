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

function ExpandableGallery({ images }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const getFlexValue = (index) => {
    if (hoveredIndex === null) return 1
    return hoveredIndex === index ? 2 : 0.5
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: '4px', height: '220px', width: '100%' }}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            style={{ flex: 1, position: 'relative', cursor: 'pointer', overflow: 'hidden', borderRadius: '4px' }}
            animate={{ flex: getFlexValue(index) }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedIndex(index)}
          >
            <img src={image} alt={`screenshot-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <motion.div
              style={{ position: 'absolute', inset: 0, background: 'black' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 0 : 0.35 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.95)', padding: '24px' }}
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#F0F0F0', cursor: 'pointer', zIndex: 10 }}
            >
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 1 + images.length) % images.length) }}
                style={{ position: 'absolute', left: '20px', background: 'none', border: 'none', color: '#F0F0F0', cursor: 'pointer', zIndex: 10 }}
              >
                <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <motion.img
              key={selectedIndex}
              src={images[selectedIndex]}
              alt={`screenshot-${selectedIndex}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px' }}
            />
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex + 1) % images.length) }}
                style={{ position: 'absolute', right: '20px', background: 'none', border: 'none', color: '#F0F0F0', cursor: 'pointer', zIndex: 10 }}
              >
                <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: '#A0A0A0', fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem' }}>
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const projects = [
  {
    id: 1,
    name: 'Luxe Hair Studio',
    niche: 'Salons',
    tag: 'Hair Salon',
    description: 'A sleek booking-forward site for a premium Joburg salon. Gallery-led with WhatsApp booking integration.',
    accent: '#3B82F6',
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80',
    ],
  },
  {
    id: 2,
    name: 'Arc Energy JHB',
    niche: 'Trades',
    tag: 'Electrical',
    description: 'Call-first design for a Johannesburg electricians and Victron experts.',
    accent: '#22c55e',
    url: 'https://www.arcenergy.co.za',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    ],
  },
  {
    id: 3,
    name: 'Iron & Ink Tattoo',
    niche: 'Tattoo',
    tag: 'Tattoo Studio',
    description: 'Portfolio-first site for a Sandton tattoo studio. Dark editorial aesthetic with artist profiles.',
    accent: '#ef4444',
    images: [
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80',
      'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80',
      'https://images.unsplash.com/photo-1543767271-7b282a59ff78?w=800&q=80',
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=800&q=80',
    ],
  },
  {
    id: 4,
    name: 'The Grind Cafe',
    niche: 'Restaurants',
    tag: 'Restaurant',
    description: 'Warm, menu-focused site for a Parkhurst neighbourhood cafe. Online reservations via WhatsApp.',
    accent: '#f59e0b',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80',
    ],
  },
  {
    id: 5,
    name: 'Peak Performance PT',
    niche: 'Fitness',
    tag: 'Fitness',
    description: 'Conversion-focused site for a personal trainer in Randburg. Package pricing and lead capture form.',
    accent: '#10b981',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
    ],
  },
  {
    id: 6,
    name: 'DetailCraft Auto',
    niche: 'Trades',
    tag: 'Auto Detailing',
    description: 'Before/after gallery site for a premium auto detailer in Midrand. Package pricing with quote form.',
    accent: '#8b5cf6',
    images: [
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&q=80',
      'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80',
    ],
  },
]

const filters = ['All', 'Salons', 'Trades', 'Restaurants', 'Fitness', 'Tattoo']

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
                  <ExpandableGallery images={p.images} />

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
                    <motion.a
                      href={p.url || undefined}
                      target={p.url ? '_blank' : undefined}
                      rel={p.url ? 'noopener noreferrer' : undefined}
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
                        textDecoration: 'none',
                        transition: 'color 0.2s ease, border-color 0.2s ease',
                        cursor: p.url ? 'none' : 'default',
                        pointerEvents: p.url ? 'auto' : 'none',
                        opacity: p.url ? 1 : 0.4,
                      }}
                      onMouseEnter={e => { if (p.url) { e.currentTarget.style.color = '#3B82F6'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)' } }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#A0A0A0'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                    >
                      View Project <ExternalLink size={13} />
                    </motion.a>
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
