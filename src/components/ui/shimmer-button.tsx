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
        'inline-flex h-12 animate-[shimmer2_2s_infinite_linear] items-center justify-center rounded-md border border-blue-500/30 bg-[linear-gradient(110deg,#0A0A0A,45%,#1e3a5f,55%,#0A0A0A)] bg-[size:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus-visible:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}