import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  Scissors, UtensilsCrossed, Wrench, Dumbbell, Palette, Car,
  ArrowRight, Zap, Smartphone, Clock, ChevronRight
} from 'lucide-react'

const heroWords = ['We', 'Build', 'Websites', 'That', 'Win', 'Clients.']

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
  { name: 'Luxe Hair Studio', niche: 'Hair Salon', gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
  { name: 'Volt Electrical', niche: 'Trades', gradient: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1f2937 100%)' },
  { name: 'Iron & Ink Tattoo', niche: 'Tattoo Studio', gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #1a1a1a 100%)' },
]

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
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

export default function Home() {
  return (
    <div style={{ background: '#0A0A0A' }}>
      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 24px 80px',
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

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative' }}>
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
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#F0F0F0',
            marginBottom: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.22em',
          }}>
            {heroWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', color: i === 5 ? '#3B82F6' : '#F0F0F0' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#A0A0A0',
              maxWidth: '560px',
              lineHeight: 1.65,
              marginBottom: '44px',
            }}
          >
            Athea Digital crafts premium websites for Johannesburg businesses — from salons to trades. We build it first. You love it, then you pay.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}
          >
            <Link to="/portfolio" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 24px rgba(59,130,246,0.3)',
                  letterSpacing: '0.01em',
                }}
              >
                See Our Work <ArrowRight size={16} />
              </motion.button>
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
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
                  letterSpacing: '0.01em',
                }}
              >
                Get In Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Niche strip */}
      <section style={{
        padding: '0 24px',
        marginBottom: '80px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeUp>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(160,160,160,0.5)',
              textAlign: 'center',
              marginBottom: '24px',
            }}>
              Industries We Serve
            </p>
          </FadeUp>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
          }}>
            {niches.map((n, i) => (
              <FadeUp key={n.label} delay={i * 0.07}>
                <div style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '20px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'border-color 0.25s ease, background 0.25s ease, transform 0.25s ease',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'
                    e.currentTarget.style.background = 'rgba(59,130,246,0.05)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.background = '#111111'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <n.icon size={22} style={{ color: '#3B82F6' }} />
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#A0A0A0', textAlign: 'center' }}>
                    {n.label}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Why Athea */}
      <section style={{ padding: '80px 24px', background: '#0D0D0D' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: '12px' }}>
                Why Choose Athea
              </p>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F0F0F0', letterSpacing: '-0.02em' }}>
                Built Different. Delivered Faster.
              </h2>
            </div>
          </FadeUp>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {features.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.1}>
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
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(59,130,246,0.1)'
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.2)'
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
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#F0F0F0', marginBottom: '12px' }}>
                    {f.title}
                  </h3>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: '#A0A0A0', lineHeight: 1.7 }}>
                    {f.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio preview */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: '8px' }}>
                  Recent Work
                </p>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F0F0F0', letterSpacing: '-0.02em' }}>
                  Selected Projects
                </h2>
              </div>
              <Link to="/portfolio" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ x: 4 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3B82F6', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 500 }}
                >
                  View All Work <ChevronRight size={16} />
                </motion.div>
              </Link>
            </div>
          </FadeUp>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {portfolioPreviews.map((p, i) => (
              <FadeUp key={p.name} delay={i * 0.1}>
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
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#F0F0F0' }}>
                      {p.name}
                    </h3>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
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
              {/* Glow orbs */}
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
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: '16px' }}>
                Ready To Get Online?
              </p>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                color: '#F0F0F0',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}>
                Let's build something that works.
              </h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: '#A0A0A0', marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
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
