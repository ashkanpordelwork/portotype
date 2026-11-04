import type { SVGProps } from 'react'

// مجموعه‌ی آیکون‌های ساده به‌سبک Lucide (stroke) — بدون وابستگی خارجی

type P = SVGProps<SVGSVGElement> & { size?: number }

const base = (size = 24, props: P): SVGProps<SVGSVGElement> => ({
  width: props.size ?? size,
  height: props.size ?? size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
})

export const IconCheck = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><polyline points="20 6 9 17 4 12" /></svg>
)
export const IconClock = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>
)
export const IconInfo = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16" /><circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none" /></svg>
)
export const IconPlus = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
)
export const IconMinus = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><line x1="5" y1="12" x2="19" y2="12" /></svg>
)
export const IconLocate = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><circle cx="12" cy="12" r="3.5" /><line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" /><line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" /></svg>
)
export const IconX = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
)
export const IconBell = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>
)
export const IconChevronLeft = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><polyline points="15 18 9 12 15 6" /></svg>
)
export const IconChevronRight = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><polyline points="9 18 15 12 9 6" /></svg>
)
export const IconChevronDown = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><polyline points="6 9 12 15 18 9" /></svg>
)
export const IconMessage = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" /></svg>
)
export const IconAward = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><circle cx="12" cy="8" r="5" /><polyline points="8.5 12.5 7 21 12 18 17 21 15.5 12.5" /></svg>
)
export const IconUsers = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" /><circle cx="9.5" cy="7.5" r="3.2" /><path d="M21 19v-1a4 4 0 0 0-3-3.8" /><path d="M16 4.2a3.2 3.2 0 0 1 0 6.6" /></svg>
)
export const IconScroll = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M8 3h9a2 2 0 0 1 2 2v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2" /><path d="M19 5h1a2 2 0 0 1 2 2v1" /><line x1="8" y1="9" x2="14" y2="9" /><line x1="8" y1="13" x2="14" y2="13" /></svg>
)
export const IconMapPin = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="2.6" /></svg>
)
export const IconArrowLeft = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
)
export const IconBook = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z" /><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /></svg>
)
export const IconHome = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></svg>
)
export const IconBriefcase = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="3" y1="12" x2="21" y2="12" /></svg>
)
export const IconStar = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><polygon points="12 2 15 9 22 9.5 16.5 14 18 21 12 17 6 21 7.5 14 2 9.5 9 9" /></svg>
)
export const IconRoles = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="13" width="18" height="6" rx="1.5" /><circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" /><circle cx="7" cy="16" r="1" fill="currentColor" stroke="none" /></svg>
)
export const IconShield = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" /></svg>
)
export const IconFlame = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M12 2c1 3 3 4.5 3 7a3 3 0 0 1-6 0c0-1 .3-1.8.7-2.5C9 8 8 9.5 8 12a4 4 0 0 0 8 0c0-4-3-7-4-10z" /></svg>
)
export const IconBookmark = ({ size, ...p }: P) => (
  <svg {...base(size, p)}><path d="M6 3h12v18l-6-4-6 4z" /></svg>
)
