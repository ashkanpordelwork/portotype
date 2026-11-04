import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../lib/motion'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const styles: Record<Variant, string> = {
  primary: 'bg-leaf-500 text-white shadow-btn3d active:shadow-btn3d-press',
  secondary: 'bg-sand-100 text-ink-900 shadow-btn3d active:shadow-btn3d-press',
  ghost: 'bg-transparent text-ink-700',
  danger: 'bg-clay-500 text-white shadow-btn3d active:shadow-btn3d-press',
}

interface Props {
  children: ReactNode
  onClick?: () => void
  variant?: Variant
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
  ariaLabel?: string
}

export function Button3D({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
  ariaLabel,
}: Props) {
  const reduced = useReducedMotion()
  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled || reduced ? undefined : { y: 2 }}
      transition={{ duration: 0.08 }}
      className={[
        'relative inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-colors',
        'disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed',
        styles[variant],
        className,
      ].join(' ')}
    >
      {children}
    </motion.button>
  )
}
