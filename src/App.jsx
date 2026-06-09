import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'

const SITE_URL = 'https://athea.digital'

const PAGE_TITLES = {
  '/':          'Athea Digital — Premium Web Design, Johannesburg',
  '/about':     'About Us | Athea Digital — Johannesburg Web Design Studio',
  '/services':  'Web Design Services for Johannesburg Businesses | Athea Digital',
  '/portfolio': 'Our Work & Portfolio | Athea Digital',
  '/pricing':   'Web Design Pricing & Packages | Athea Digital',
  '/contact':   'Get a Quote | Athea Digital — Johannesburg Web Design',
}

const PAGE_DESCRIPTIONS = {
  '/':          'Athea Digital builds premium websites for Johannesburg businesses — salons, trades, restaurants, fitness, tattoo studios and more. We design your site first — see it, approve it, and pay 50% to kick off. Full build delivered in 7 days.',
  '/about':     'We\'re a two-person web design studio based in Johannesburg. We build fast, mobile-first websites for local businesses — we design it first, you approve it, then pay 50% to start. Full site delivered in 7 days.',
  '/services':  'Custom websites for Johannesburg hair salons, restaurants, trades, fitness studios, tattoo parlours, and auto detailers. Niche-specific design that converts.',
  '/portfolio': 'View Athea Digital\'s portfolio of premium websites built for Johannesburg local businesses. Real projects, real results.',
  '/pricing':   'Transparent, once-off web design pricing for Johannesburg businesses. Starter from R3,499 — no monthly fees, no hidden costs. You own your site outright.',
  '/contact':   'Get in touch with Athea Digital for a custom website quote. Based in Johannesburg — we respond within a few hours and have a direction ready within 24 hours.',
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter:   { opacity: 1, y: 0  },
  exit:    { opacity: 0, y: -8 },
}

const pageTransition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1],
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}

/**
 * Resets scroll to the top on every route change.
 * Uses Lenis for an instant (non-animated) jump so the incoming page
 * always starts at the top regardless of the previous scroll position.
 */
function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = lenisRef?.current
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, lenisRef])

  return null
}

export default function App() {
  const location  = useLocation()
  const lenisRef  = useLenis()   // ← Lenis smooth scroll + GSAP sync

  useEffect(() => {
    const path = location.pathname
    const title = PAGE_TITLES[path] ?? 'Athea Digital'
    const description = PAGE_DESCRIPTIONS[path] ?? PAGE_DESCRIPTIONS['/']
    const url = `${SITE_URL}${path}`

    document.title = title

    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }

    setMeta('meta[name="description"]', 'content', description)
    setMeta('link#canonical-tag', 'href', url)
    setMeta('meta[id="og-url"]', 'content', url)
    setMeta('meta[id="og-title"]', 'content', title)
    setMeta('meta[id="og-description"]', 'content', description)
    setMeta('meta[id="twitter-title"]', 'content', title)
    setMeta('meta[id="twitter-description"]', 'content', description)
  }, [location.pathname])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0A0A0A' }}>
      <CustomCursor />
      <Navbar />
      <ScrollToTop lenisRef={lenisRef} />
      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/"          element={<PageWrapper><Home      /></PageWrapper>} />
            <Route path="/about"     element={<PageWrapper><About     /></PageWrapper>} />
            <Route path="/services"  element={<PageWrapper><Services  /></PageWrapper>} />
            <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
            <Route path="/pricing"   element={<PageWrapper><Pricing   /></PageWrapper>} />
            <Route path="/contact"   element={<PageWrapper><Contact   /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
