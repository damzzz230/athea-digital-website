import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const CONSENT_KEY = 'athea_cookie_consent'

// TODO: When GA Measurement ID is ready, initialise GA here only if athea_cookie_consent === "accepted"

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    return stored !== 'accepted' && stored !== 'rejected'
  })

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: '#111111',
            borderTop: '1px solid rgba(59, 130, 246, 0.2)',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontFamily: "'DM Sans', sans-serif",
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
            <span style={{ color: '#F0F0F0', fontSize: '14px', lineHeight: 1.4 }}>
              We use cookies to understand how visitors use our site.
            </span>
            <span style={{ color: '#A0A0A0', fontSize: '12px', lineHeight: 1.4 }}>
              No essential site functions are affected if you decline.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <DeclineButton onClick={handleDecline} />
            <AcceptButton onClick={handleAccept} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DeclineButton({ onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '8px 20px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 500,
        fontFamily: 'inherit',
        background: 'transparent',
        border: `1px solid ${hovered ? '#F0F0F0' : '#A0A0A0'}`,
        color: hovered ? '#F0F0F0' : '#A0A0A0',
        cursor: 'pointer',
        transition: 'border-color 0.15s, color 0.15s',
        lineHeight: 1,
      }}
    >
      Decline
    </button>
  )
}

function AcceptButton({ onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '8px 20px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 500,
        fontFamily: 'inherit',
        background: hovered ? '#2563EB' : '#3B82F6',
        border: '1px solid transparent',
        color: '#ffffff',
        cursor: 'pointer',
        transition: 'background 0.15s',
        lineHeight: 1,
      }}
    >
      Accept
    </button>
  )
}
