import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Eye } from 'lucide-react'
import { useScreenSize } from '../hooks/use-screen-size'
import { GooeyFilter } from '../components/ui/gooey-filter'
import { PixelTrail } from '../components/ui/pixel-trail'

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

function MaskReveal({ text, align = 'flex-start' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const words = text.split(' ')
  const desktopJustify = align === 'center' ? 'justify-center' : 'md:justify-start'
  return (
    <span
      ref={ref}
      aria-label={text}
      className={`justify-center ${desktopJustify}`}
      style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.28em', rowGap: 0 }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ overflow: 'hidden', display: 'inline-block', lineHeight: 'inherit' }}
        >
          <motion.span
            style={{ display: 'inline-block', lineHeight: 'inherit' }}
            initial={{ y: '105%' }}
            animate={inView ? { y: 0 } : { y: '105%' }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function TeamCard({ member, direction, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: direction.x, y: direction.y }}
      transition={{ duration: 1.1, delay: 0.2 + delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ opacity: 0 }}
    >
      <div style={{
        background: '#12121A',
        border: '1px solid #2A2A3A',
        borderRadius: '20px',
        padding: '36px',
        transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#8B5CF6'
          e.currentTarget.style.transform = 'translateY(-6px)'
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(139,92,246,0.15), 0 0 0 1px rgba(139,92,246,0.6)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#2A2A3A'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: member.color,
          border: '2px solid rgba(139,92,246,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#F0EDE8' }}>
            {member.initials}
          </span>
        </div>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#F0EDE8', marginBottom: '4px' }}>
          {member.name}
        </h3>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: '#8B5CF6', marginBottom: '16px', letterSpacing: '0.02em' }}>
          {member.title}
        </p>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: '#9A9A9A', lineHeight: 1.7 }}>
          {member.bio}
        </p>
      </div>
    </motion.div>
  )
}

function ValueCard({ value, direction, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: direction.x, y: direction.y }}
      transition={{ duration: 1.1, delay: 0.2 + delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ opacity: 0 }}
    >
      <div style={{
        background: '#12121A',
        border: '1px solid #2A2A3A',
        borderRadius: '16px',
        padding: '32px',
        transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-6px)'
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(139,92,246,0.15), 0 0 0 1px rgba(139,92,246,0.6)'
          e.currentTarget.style.borderColor = '#8B5CF6'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = '#2A2A3A'
        }}
      >
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          background: 'rgba(139,92,246,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}>
          <value.icon size={20} style={{ color: '#8B5CF6' }} />
        </div>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#F0EDE8', marginBottom: '12px' }}>
          {value.title}
        </h3>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: '#9A9A9A', lineHeight: 1.7 }}>
          {value.body}
        </p>
      </div>
    </motion.div>
  )
}

const values = [
  {
    icon: Zap,
    title: 'Speed',
    body: 'We move fast without cutting corners. Most sites are built and presented within 5 working days of initial contact.',
  },
  {
    icon: Shield,
    title: 'Quality',
    body: 'Every site we deliver is responsive, fast-loading, and built on modern tech — not a drag-and-drop builder with hidden limitations.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    body: "No hidden costs, no vague timelines. You see exactly what you're getting before you commit a cent. Approve the design, pay 50% to start.",
  },
]

const team = [
  {
    name: 'Damian de Boer',
    title: 'Co-Founder & Design Lead',
    bio: 'Damian leads the design and SEO strategy on every build. He obsesses over the details that make a site convert — layout, hierarchy, and making sure Google knows you exist. A Marketing graduate from the IMM, he brings both creative and strategic thinking to every project.',
    initials: 'DD',
    color: '#262631',
  },
  {
    name: 'Dasendhran Subramoney',
    title: 'Co-Founder & Lead Developer',
    bio: 'Das engineers the foundation every site runs on. He handles the architecture, code quality, and performance that makes a site fast, stable, and built to last. A Software Development graduate from CodeSpace, clean code isn\'t a bonus for him — it\'s the baseline.',
    initials: 'DS',
    color: '#332A1E',
  },
]

export default function About() {
  const screenSize = useScreenSize()
  return (
    <div style={{ background: '#0A0A0F' }}>
      {/* Hero */}
      <section className="pt-[120px] px-4 pb-16 md:pt-[160px] md:px-6 md:pb-20" style={{
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="text-center md:text-left" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B5CF6', marginBottom: '16px' }}
          >
            About the Studio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto md:mx-0"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#F0EDE8',
              maxWidth: '800px',
              marginBottom: '28px',
            }}
          >
            Two developers.<br className="hidden md:block" />{' '}
            <span style={{ color: '#8B5CF6' }}>One obsession.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto md:mx-0"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '1.1rem',
              color: '#9A9A9A',
              maxWidth: '560px',
              lineHeight: 1.7,
            }}
          >
            Small studio. Serious output. Every site is built by us, for you — no middlemen, no outsourcing, no compromises.
          </motion.p>
        </div>
      </section>

      {/* Team */}
      <section className="px-4 md:px-6 pt-10 pb-20">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
            {team.map((member, i) => {
              const mobile = screenSize.lessThan('md')
              const directions = [
                { x: mobile ? -80 : -160, y: 0 },
                { x: mobile ? 80 : 160, y: 0 },
              ]
              return (
                <TeamCard key={member.name} member={member} direction={directions[i]} delay={i * 0.15} />
              )
            })}
          </div>
        </div>
      </section>

      {/* Studio story */}
      <section className="py-16 px-4 md:py-20 md:px-6" style={{ background: '#12121A', position: 'relative', overflow: 'hidden' }}>
        {/* Gooey pixel-trail background — spans the whole section */}
        <div className="absolute inset-0 z-0">
          <GooeyFilter id="gooey-filter-spec-build" strength={5} />
          <div
            className="absolute inset-0"
            style={{ filter: 'url(#gooey-filter-spec-build)' }}
          >
            <PixelTrail
              pixelSize={screenSize.lessThan('lg') ? 20 : 28}
              fadeDuration={500}
              delay={0}
              pixelClassName="bg-[#8B5CF6]"
            />
          </div>
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 10, textAlign: 'center', pointerEvents: 'none' }}>
          <FadeUp>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B5CF6', marginBottom: '16px' }}>
              How We Work
            </p>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: '#F0EDE8',
              letterSpacing: '-0.02em',
              marginBottom: '28px',
            }}>
              <MaskReveal text="The Spec-Build Model" align="center" />
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: '#9A9A9A', lineHeight: 1.8, marginBottom: '20px' }}>
              Most agencies ask you to sign a contract, pay a deposit, and then wait weeks to see anything. We do the opposite.
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: '#9A9A9A', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong style={{ color: '#F0EDE8' }}>We design your site first</strong> — layout, copy, features. Love it? Pay 50% to kick off. Full build delivered in 7 days, balance on completion.
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: '#9A9A9A', lineHeight: 1.8 }}>
              This model works because we're confident in what we produce. It also means we only build sites we believe in — so you never end up with something we're not proud of.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
              <Link to="/contact" style={{ textDecoration: 'none', pointerEvents: 'auto' }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    background: '#8B5CF6',
                    color: '#0A0A0F',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 0 24px rgba(139,92,246,0.25)',
                  }}
                >
                  Start a Conversation <ArrowRight size={16} />
                </motion.button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 md:py-20 md:px-6">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B5CF6', marginBottom: '12px' }}>
                What We Stand For
              </p>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F0EDE8', letterSpacing: '-0.02em' }}>
                <MaskReveal text="Our Values" />
              </h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px' }}>
            {values.map((v, i) => {
              const mobile = screenSize.lessThan('md')
              const directions = [
                { x: mobile ? -80 : -160, y: 0 },
                { x: 0, y: mobile ? 20 : 100 },
                { x: mobile ? 80 : 160, y: 0 },
              ]
              return (
                <ValueCard key={v.title} value={v} direction={directions[i]} delay={i * 0.15} />
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
