import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  className?: string
}

export default function ShimmerButton({
  children = 'Shimmer',
  className,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-12 animate-[shimmer2_2s_infinite_linear] items-center justify-center rounded-md border border-accent/30 bg-[linear-gradient(110deg,#0A0A0F,45%,#8B5CF6,55%,#0A0A0F)] bg-[size:200%_100%] px-6 font-medium text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}