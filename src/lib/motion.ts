import { createContext, useContext } from 'react'

/** تشخیص reduced-motion و تعریف presetهای انیمیشن */

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const ReducedMotionContext = createContext(false)
export const useReducedMotion = () => useContext(ReducedMotionContext)

// Springهای مشترک
export const SPRING = {
  soft: { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 } as const,
  camera: { type: 'spring', stiffness: 120, damping: 22, mass: 1 } as const,
  snappy: { type: 'spring', stiffness: 380, damping: 32 } as const,
}

export const EASE_OUT = [0.22, 1, 0.36, 1] as const

// انتقال صفحه: fade + slide کوتاه
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: EASE_OUT },
}

export const fadeOnly = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: EASE_OUT },
}

/** stagger برای ورود ردیف‌ها */
export const staggerContainer = (stagger = 0.05, delayChildren = 0.05) => ({
  animate: { transition: { staggerChildren: stagger, delayChildren } },
})

export const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
}
