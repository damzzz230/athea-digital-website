import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-bottom 0.3s ease',
        background: scrolled ? 'rgba(18,18,26,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid #2A2A3A' : '1px solid transparent',
      }}
    >
      <div className="px-4 md:px-6" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="h-[64px] md:h-[88px]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img
              src="/images/Athea_Digital_logo_white_transparent.png"
              alt="Athea Digital"
              className="navbar-logo h-[52px] md:h-[90px]"
              style={{ width: 'auto', display: 'block' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '36px' }}>
            {links.map((l) => {
              const active = location.pathname === l.to
              const hovered = hoveredLink === l.to
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    color: active || hovered ? '#F0EDE8' : '#9A9A9A',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    paddingBottom: '4px',
                  }}
                  onMouseEnter={() => setHoveredLink(l.to)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {l.label}
                  {/* Active indicator — slides between links on navigation */}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: '#8B5CF6',
                        borderRadius: '1px',
                      }}
                    />
                  )}
                  {/* Hover underline — fills left to right */}
                  {!active && (
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
                  )}
                </Link>
              )
            })}
            <Link
              to="/contact"
              className="px-[20px] py-[8px] text-[0.875rem]"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 600,
                color: '#0A0A0F',
                background: '#8B5CF6',
                borderRadius: '6px',
                textDecoration: 'none',
                transition: 'background 0.2s ease, transform 0.2s ease',
                display: 'inline-block',
              }}
              onMouseEnter={e => { e.target.style.background = '#A78BFA'; e.target.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.target.style.background = '#8B5CF6'; e.target.style.transform = 'translateY(0)' }}
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile-only: compact CTA + burger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/contact"
              className="px-4 py-[6px] text-xs"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 600,
                color: '#0A0A0F',
                background: '#8B5CF6',
                borderRadius: '6px',
                textDecoration: 'none',
                display: 'inline-block',
                minHeight: '32px',
                lineHeight: '20px',
              }}
            >
              Get a Quote
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="relative z-[60] flex items-center justify-center"
              style={{
                background: 'none',
                border: 'none',
                color: '#F0EDE8',
                width: '44px',
                height: '44px',
              }}
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen mobile menu — portaled to document.body so it isn't
          affected by the header's backdrop-filter, which would otherwise
          promote the header into a containing block and collapse this
          fixed-position overlay down to the header's own height. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 flex md:hidden flex-col items-center justify-center"
              style={{ background: '#0A0A0F' }}
            >
              {links.map((l, i) => {
                const active = location.pathname === l.to
                return (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="mobile-nav-link"
                      style={{
                        display: 'block',
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 700,
                        fontSize: '2rem',
                        color: active ? '#8B5CF6' : '#F0EDE8',
                        textDecoration: 'none',
                        padding: '14px 0',
                        textAlign: 'center',
                        borderBottom: active ? '2px solid #8B5CF6' : '2px solid transparent',
                      }}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style>{`
        .mobile-nav-link:active { border-bottom-color: #8B5CF6 !important; }
      `}</style>
    </motion.header>
  )
}
