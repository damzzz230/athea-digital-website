import { Link } from 'react-router-dom'
import { MessageCircle, Mail, MapPin } from 'lucide-react'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer style={{
      background: '#0D0D0D',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '64px 24px 32px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
              <img
                src="/images/Athea_Digital_logo_white_transparent.png"
                alt="Athea Digital"
                className="footer-logo"
                style={{ width: 'auto', display: 'block' }}
              />
            </Link>
            <p style={{
              marginTop: '12px',
              fontSize: '0.875rem',
              color: '#A0A0A0',
              lineHeight: 1.6,
              maxWidth: '260px',
            }}>
              Premium websites for Johannesburg businesses. We build first — you pay only when you're impressed.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <a
                href="https://wa.me/27000000000"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: '#A0A0A0',
                  transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.15)'; e.currentTarget.style.color = '#3B82F6'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#A0A0A0'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="mailto:hello@athea.digital"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: '#A0A0A0',
                  transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.15)'; e.currentTarget.style.color = '#3B82F6'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#A0A0A0'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#F0F0F0',
              marginBottom: '20px',
            }}>
              Pages
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.875rem',
                      color: '#A0A0A0',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => { e.target.style.color = '#F0F0F0' }}
                    onMouseLeave={e => { e.target.style.color = '#A0A0A0' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#F0F0F0',
              marginBottom: '20px',
            }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a
                href="https://wa.me/27000000000"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F0F0F0' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#A0A0A0' }}
              >
                <MessageCircle size={15} style={{ color: '#3B82F6', flexShrink: 0 }} />
                +27 000 000 0000
              </a>
              <a
                href="mailto:hello@athea.digital"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A0A0A0', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F0F0F0' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#A0A0A0' }}
              >
                <Mail size={15} style={{ color: '#3B82F6', flexShrink: 0 }} />
                hello@athea.digital
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
                <MapPin size={15} style={{ color: '#3B82F6', flexShrink: 0 }} />
                Johannesburg, South Africa
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(160,160,160,0.5)' }}>
            © 2025 Athea Digital. Built in Johannesburg.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(160,160,160,0.3)' }}>
            Designed & developed by Athea Digital
          </p>
        </div>
      </div>
      <style>{`
        .footer-logo { height: 44px; }
        @media (max-width: 768px) {
          .footer-logo { height: 36px; }
        }
      `}</style>
    </footer>
  )
}
