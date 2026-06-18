import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const COLOR_VARIANTS = {
  athea: {
    border: [
      'border-[#6000D3]/60',
      'border-[#8B30FF]/40',
      'border-[#4800A0]/20',
    ],
    gradient: 'from-[#6000D3]/30',
  },
} as const

type ColorVariant = keyof typeof COLOR_VARIANTS

interface AnimatedGridProps {
  className?: string
}

function AnimatedGrid({ className }: AnimatedGridProps) {
  return (
    <motion.div
      className={cn('absolute inset-0', className)}
      animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
    >
      <div className="h-full w-full [background-image:repeating-linear-gradient(100deg,#6000D3_0%,#6000D3_1px,transparent_1px,transparent_4%)] opacity-10" />
    </motion.div>
  )
}

interface BackgroundCirclesProps {
  className?: string
  variant?: ColorVariant
}

export function BackgroundCircles({ className, variant = 'athea' }: BackgroundCirclesProps) {
  const variantStyles = COLOR_VARIANTS[variant]

  return (
    <div className={cn('relative flex h-full w-full items-center justify-center overflow-hidden bg-transparent', className)}>
      <AnimatedGrid />

      <div className="absolute h-[480px] w-[480px]">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className={cn('absolute inset-0 rounded-full border-2', variantStyles.border[i])}
            style={{ transform: `scale(${1 - i * 0.2})` }}
            animate={{
              rotate: 360,
              scale: [1 - i * 0.2, 1.04 - i * 0.2, 1 - i * 0.2],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className={cn('absolute inset-0 rounded-full bg-gradient-to-r mix-blend-screen', variantStyles.gradient)} />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(96,0,211,0.25),transparent_70%)] blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,48,255,0.10),transparent)] blur-[80px]" />
      </div>
    </div>
  )
}
