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
