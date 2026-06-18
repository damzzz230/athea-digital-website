import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, MapPin } from 'lucide-react'

const pageLinks = [
  { label: 'Home',      to: '/' },
  { label: 'About',     to: '/about' },
  { label: 'Services',  to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing',   to: '/pricing' },
  { label: 'Contact',   to: '/contact' },
]

const nicheItems = [
  'Hair Salons',
  'Restaurants & Cafés',
  'Trades & Contractors',
  'Fitness & Personal Trainers',
  'Tattoo Studios',
  'Auto Detailing',
]

// ── Replicates the navbar's scaleX underline hover — routed link ──────────────
function FooterLink({ to, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to={to}
      style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: hovered ? '#F0EDE8' : '#9A9A9A',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        position: 'relative',
        paddingBottom: '4px',
        display: 'inline-block',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <motion.span
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: '#8B5CF6',
          borderRadius: '1px',
          originX: 0,
        }}
      />
    </Link>
  )
}


// ── Column heading ─────────────────────────────────────────────────────────────
function ColHeading({ children }) {
  return (
    <h4 style={{
      fontFamily: 'Syne, sans-serif',
      fontWeight: 700,
      fontSize: '0.75rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#F0EDE8',
      marginBottom: '20px',
    }}>
      {children}
    </h4>
  )
}

export default function Footer() {
  return (
    <footer style={{
      background: '#12121A',
      borderTop: '1px solid #2A2A3A',
      padding: '64px 24px 32px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ── Main grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '48px',
        }}>

          {/* Brand column */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <img
                src="/images/Athea_Digital_logo_white_transparent.png"
                alt="Athea Digital"
                className="footer-logo"
                style={{ width: 'auto', display: 'block' }}
              />
            </Link>

            {/* Tagline */}
            <p style={{
              marginTop: '10px',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '0.05em',
              color: '#8B5CF6',
            }}>
              Built in Joburg. Built to convert.
            </p>

            <p style={{
              marginTop: '12px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.875rem',
              color: '#9A9A9A',
              lineHeight: 1.6,
              maxWidth: '260px',
            }}>
              Premium websites for Johannesburg businesses. We build first — you pay only when you're impressed.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {[
                { href: 'https://wa.me/27615223385', icon: <MessageCircle size={16} />, label: 'WhatsApp' },
                { href: 'mailto:hello@athea.digital', icon: <Mail size={16} />, label: 'Email' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#2A2A3A',
                    border: '1px solid #2A2A3A',
                    color: '#9A9A9A',
                    transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background    = 'rgba(139,92,246,0.15)'
                    e.currentTarget.style.color         = '#8B5CF6'
                    e.currentTarget.style.borderColor   = 'rgba(139,92,246,0.3)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background    = '#2A2A3A'
                    e.currentTarget.style.color         = '#9A9A9A'
                    e.currentTarget.style.borderColor   = '#2A2A3A'
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <ColHeading>Pages</ColHeading>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pageLinks.map((l) => (
                <li key={l.to}>
                  <FooterLink to={l.to}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Industries */}
          <div>
            <ColHeading>Service Industries</ColHeading>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {nicheItems.map((item) => (
                <li key={item}>
                  <FooterLink to="/services">{item}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <ColHeading>Contact</ColHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a
                href="https://wa.me/27615223385"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9A9A9A', textDecoration: 'none', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F0EDE8' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#9A9A9A' }}
              >
                <MessageCircle size={15} style={{ color: '#8B5CF6', flexShrink: 0 }} />
                061 522 3385
              </a>
              <a
                href="mailto:hello@athea.digital"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9A9A9A', textDecoration: 'none', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F0EDE8' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#9A9A9A' }}
              >
                <Mail size={15} style={{ color: '#8B5CF6', flexShrink: 0 }} />
                hello@athea.digital
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', color: '#9A9A9A' }}>
                <MapPin size={15} style={{ color: '#8B5CF6', flexShrink: 0 }} />
                Johannesburg, South Africa
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          borderTop: '1px solid #2A2A3A',
          paddingTop: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(154,154,154,0.5)' }}>
            © 2026 Athea Digital. Built in Johannesburg.
          </p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(154,154,154,0.3)' }}>
            Designed & developed by Athea Digital
          </p>
        </div>

      </div>

      <style>{`
        .footer-logo { height: 90px; }
        @media (max-width: 768px) {
          .footer-logo { height: 60px; }
        }
      `}</style>
    </footer>
  )
}
