import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, Mail, MapPin, Send } from 'lucide-react'

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

const inputStyle = {
  width: '100%',
  background: '#111111',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  padding: '13px 16px',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '0.9rem',
  color: '#F0F0F0',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
}

export default function Contact() {
  const [focused, setFocused] = useState(null)

  const fieldStyle = (name) => ({
    ...inputStyle,
    borderColor: focused === name ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.08)',
    boxShadow: focused === name ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
  })

  return (
    <div style={{ background: '#0A0A0A' }}>
      {/* Hero */}
      <section style={{ padding: '160px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: '16px' }}
          >
            Get In Touch
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
            Let's build something<br />
            <span style={{ color: '#3B82F6' }}>worth showing off.</span>
          </motion.h1>
        </div>
      </section>

      {/* Main contact section */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}>
            {/* Left column — info */}
            <FadeUp>
              <div>
                <h2 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.4rem',
                  color: '#F0F0F0',
                  marginBottom: '8px',
                }}>
                  Say hello.
                </h2>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.95rem',
                  color: '#A0A0A0',
                  lineHeight: 1.7,
                  marginBottom: '36px',
                }}>
                  Tell us about your business and what you're looking for. We'll come back to you within a few hours — and usually have a direction ready within 24 hours.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                  <a
                    href="https://wa.me/27615223385?text=Hi%20Athea%20Digital%2C%20I%27d%20like%20a%20website%20quote"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      background: '#111111',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      padding: '16px 20px',
                      textDecoration: 'none',
                      transition: 'background 0.25s ease, border-color 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(37,211,102,0.3)'
                      e.currentTarget.style.background = 'rgba(37,211,102,0.05)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                      e.currentTarget.style.background = '#111111'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(37,211,102,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <MessageCircle size={18} style={{ color: '#25D366' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#F0F0F0', marginBottom: '2px' }}>WhatsApp</p>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: '#A0A0A0' }}>061 522 3385</p>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@athea.digital"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      background: '#111111',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      padding: '16px 20px',
                      textDecoration: 'none',
                      transition: 'background 0.25s ease, border-color 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'
                      e.currentTarget.style.background = 'rgba(59,130,246,0.05)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                      e.currentTarget.style.background = '#111111'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(59,130,246,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Mail size={18} style={{ color: '#3B82F6' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#F0F0F0', marginBottom: '2px' }}>Email</p>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: '#A0A0A0' }}>hello@athea.digital</p>
                    </div>
                  </a>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(59,130,246,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <MapPin size={18} style={{ color: '#3B82F6' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#F0F0F0', marginBottom: '2px' }}>Location</p>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: '#A0A0A0' }}>Johannesburg, South Africa</p>
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(37,211,102,0.06)',
                  border: '1px solid rgba(37,211,102,0.15)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: '#A0A0A0', lineHeight: 1.65 }}>
                    <span style={{ color: '#25D366', fontWeight: 600 }}>Prefer to chat?</span> Message us on WhatsApp and we'll respond within the hour.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Right column — form */}
            <FadeUp delay={0.15}>
              <div style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '20px',
                padding: '36px',
              }}>
                <h3 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: '#F0F0F0',
                  marginBottom: '24px',
                }}>
                  Send a message
                </h3>

                <form
                  action="https://formspree.io/f/placeholder"
                  method="POST"
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: '#A0A0A0', marginBottom: '6px', letterSpacing: '0.04em' }}>
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your name"
                        style={fieldStyle('name')}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: '#A0A0A0', marginBottom: '6px', letterSpacing: '0.04em' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="your@email.com"
                        style={fieldStyle('email')}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: '#A0A0A0', marginBottom: '6px', letterSpacing: '0.04em' }}>
                      Phone <span style={{ color: 'rgba(160,160,160,0.4)' }}>(optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="061 522 3385"
                      style={fieldStyle('phone')}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: '#A0A0A0', marginBottom: '6px', letterSpacing: '0.04em' }}>
                      Tell us about your business *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="What kind of business do you run? What are you looking for in a website?"
                      style={{
                        ...fieldStyle('message'),
                        resize: 'vertical',
                        minHeight: '120px',
                      }}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      background: '#3B82F6',
                      color: '#0A0A0A',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '14px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 0 24px rgba(59,130,246,0.25)',
                      marginTop: '4px',
                      letterSpacing: '0.02em',
                    }}
                  >
                    Send Message <Send size={16} />
                  </motion.button>
                </form>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  )
}
