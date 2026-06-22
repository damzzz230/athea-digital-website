import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

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
              style={{ position: 'absolute', inset: 0, background: '#12121A' }}
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
            style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(18,18,26,0.95)', padding: '24px' }}
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#F0EDE8', cursor: 'pointer', zIndex: 10 }}
            >
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 1 + images.length) % images.length) }}
                style={{ position: 'absolute', left: '20px', background: 'none', border: 'none', color: '#F0EDE8', cursor: 'pointer', zIndex: 10 }}
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
                style={{ position: 'absolute', right: '20px', background: 'none', border: 'none', color: '#F0EDE8', cursor: 'pointer', zIndex: 10 }}
              >
                <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem' }}>
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
    id: 2,
    name: 'Arc Energy JHB',
    niche: 'Trades',
    tag: 'Electrical',
    description: 'Call-first design for a Johannesburg electricians and Victron experts.',
    accent: '#8B5CF6',
    url: 'https://www.arcenergy.co.za',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    ],
  },
]

export default function Portfolio() {
  return (
    <div style={{ background: '#0A0A0F' }}>
      {/* Hero */}
      <section className="pt-[120px] px-4 pb-12 md:pt-[160px] md:px-6 md:pb-[60px]" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '500px',
          height: '400px',
          background: 'radial-gradient(circle at bottom right, rgba(139,92,246,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="text-center md:text-left" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B5CF6', marginBottom: '16px' }}
          >
            Our Work
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
              maxWidth: '1150px',
              marginBottom: '20px',
            }}
          >
            Sites that perform<br className="hidden md:block" />{' '}
            <span style={{ color: '#8B5CF6' }}>in the real world.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto md:mx-0"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.05rem', color: '#9A9A9A', maxWidth: '480px', lineHeight: 1.7 }}
          >
            A selection of sites we've built for local Johannesburg businesses. Each one is designed to win new customers, not just look good.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 pb-16 md:px-6 md:pb-[100px]">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '24px' }}>
            <AnimatePresence mode="popLayout">
              {projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  style={{
                    background: '#12121A',
                    border: '1px solid #2A2A3A',
                    borderRadius: '20px',
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
                  <ExpandableGallery images={p.images} />

                  {/* Card body */}
                  <div style={{ padding: '22px 24px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <span style={{
                        display: 'inline-block',
                        background: 'rgba(139,92,246,0.1)',
                        border: '1px solid rgba(139,92,246,0.2)',
                        borderRadius: '100px',
                        padding: '3px 10px',
                        fontSize: '0.72rem',
                        color: '#8B5CF6',
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 500,
                      }}>
                        {p.tag}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#F0EDE8', marginBottom: '8px' }}>
                      {p.name}
                    </h3>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: '#9A9A9A', lineHeight: 1.65, marginBottom: '18px' }}>
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
                        color: '#9A9A9A',
                        border: '1px solid #2A2A3A',
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
                      onMouseEnter={e => { if (p.url) { e.currentTarget.style.color = '#8B5CF6'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)' } }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#9A9A9A'; e.currentTarget.style.borderColor = '#2A2A3A' }}
                    >
                      View Project <ExternalLink size={13} />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  )
}
