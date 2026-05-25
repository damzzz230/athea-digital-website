import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Eye } from 'lucide-react'

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
    body: "No hidden costs, no vague timelines. You see exactly what you're getting before any money changes hands.",
  },
]

const team = [
  {
    name: 'Damian de Boer',
    title: 'Co-Founder & Lead Developer',
    bio: 'Damian handles the architecture, code, and performance of every site we build. Obsessed with clean interfaces and conversion-focused layouts.',
    initials: 'DD',
    color: '#1e3a5f',
  },
  {
    name: 'Dasendhran Subramoney',
    title: 'Co-Founder & Lead Developer',
    bio: 'Dasendran drives the design direction and client experience. His eye for detail ensures every pixel earns its place on the screen.',
    initials: 'DS',
    color: '#1a2e1a',
  },
]

export default function About() {
  return (
    <div style={{ background: '#0A0A0A' }}>
      {/* Hero */}
      <section style={{
        padding: '160px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
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
            About the Studio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#F0F0F0',
              maxWidth: '800px',
              marginBottom: '28px',
            }}
          >
            Two developers.<br />
            <span style={{ color: '#3B82F6' }}>One obsession.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '1.1rem',
              color: '#A0A0A0',
              maxWidth: '560px',
              lineHeight: 1.7,
            }}
          >
            We're a two-person studio based in Johannesburg, South Africa. We don't take on dozens of clients — we focus on doing exceptional work for the ones we do.
          </motion.p>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {team.map((member, i) => (
              <FadeUp key={member.name} delay={i * 0.15}>
                <div style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  padding: '36px',
                  transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#3B82F6'
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.6)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: member.color,
                    border: '2px solid rgba(59,130,246,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#F0F0F0' }}>
                      {member.initials}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#F0F0F0', marginBottom: '4px' }}>
                    {member.name}
                  </h3>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: '#3B82F6', marginBottom: '16px', letterSpacing: '0.02em' }}>
                    {member.title}
                  </p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: '#A0A0A0', lineHeight: 1.7 }}>
                    {member.bio}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Studio story */}
      <section style={{ padding: '80px 24px', background: '#0D0D0D' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <FadeUp>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: '16px' }}>
              How We Work
            </p>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: '#F0F0F0',
              letterSpacing: '-0.02em',
              marginBottom: '28px',
            }}>
              The Spec-Build Model
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: '#A0A0A0', lineHeight: 1.8, marginBottom: '20px' }}>
              Most agencies ask you to sign a contract, pay a deposit, and then wait weeks to see anything. We do the opposite.
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: '#A0A0A0', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong style={{ color: '#F0F0F0' }}>We build the site first.</strong> You get to see exactly what you're getting — the design, the layout, the copy, the features — before you commit to anything. If you love it, we talk about a deal. If it's not right, we iterate until it is.
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: '#A0A0A0', lineHeight: 1.8 }}>
              This model works because we're confident in what we produce. It also means we only build sites we believe in — so you never end up with something we're not proud of.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
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
                    boxShadow: '0 0 24px rgba(59,130,246,0.25)',
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
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: '12px' }}>
                What We Stand For
              </p>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F0F0F0', letterSpacing: '-0.02em' }}>
                Our Values
              </h2>
            </div>
          </FadeUp>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.1}>
                <div style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: '32px',
                  transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.6)'
                    e.currentTarget.style.borderColor = '#3B82F6'
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
                    <v.icon size={20} style={{ color: '#3B82F6' }} />
                  </div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#F0F0F0', marginBottom: '12px' }}>
                    {v.title}
                  </h3>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: '#A0A0A0', lineHeight: 1.7 }}>
                    {v.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
