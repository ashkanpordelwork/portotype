import type { Place } from '../../data/data'
import { stageById } from '../../data/data'

// فضای مختصات نقشه: ۱۰۰۰ × ۷۲۰

export const MAP_W = 1000
export const MAP_H = 720

// ---------- پس‌زمینه‌ی نقشه‌ی محله ----------
export function NeighborhoodBg() {
  return (
    <svg width={MAP_W} height={MAP_H} viewBox={`0 0 ${MAP_W} ${MAP_H}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="nb-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EFE7D4" />
          <stop offset="1" stopColor="#E6DBBF" />
        </linearGradient>
      </defs>
      <rect width={MAP_W} height={MAP_H} fill="url(#nb-ground)" />
      {/* بلوک‌های سبز */}
      <g opacity="0.55">
        <rect x="40" y="40" width="260" height="220" rx="20" fill="#DCEBCF" />
        <rect x="640" y="40" width="300" height="200" rx="20" fill="#DCEBCF" />
        <rect x="60" y="520" width="260" height="170" rx="20" fill="#DCEBCF" />
        <rect x="660" y="540" width="280" height="150" rx="20" fill="#DCEBCF" />
        <rect x="360" y="500" width="280" height="180" rx="20" fill="#E8F0DF" />
      </g>
      {/* خیابان‌ها */}
      <g stroke="#D8CCAE" strokeWidth="46" strokeLinecap="round" fill="none">
        <line x1="0" y1="250" x2="1000" y2="250" />
        <line x1="0" y1="500" x2="1000" y2="500" />
        <line x1="330" y1="0" x2="330" y2="720" />
        <line x1="700" y1="0" x2="700" y2="720" />
      </g>
      <g stroke="#E8DFC8" strokeWidth="40" strokeLinecap="round" fill="none">
        <line x1="0" y1="250" x2="1000" y2="250" />
        <line x1="0" y1="500" x2="1000" y2="500" />
        <line x1="330" y1="0" x2="330" y2="720" />
        <line x1="700" y1="0" x2="700" y2="720" />
      </g>
      {/* خط‌چین وسط خیابان */}
      <g stroke="#C9BB95" strokeWidth="2" strokeDasharray="10 12" fill="none" opacity="0.7">
        <line x1="0" y1="250" x2="1000" y2="250" />
        <line x1="0" y1="500" x2="1000" y2="500" />
        <line x1="330" y1="0" x2="330" y2="720" />
        <line x1="700" y1="0" x2="700" y2="720" />
      </g>
      {/* میدان مرکزی */}
      <circle cx="510" cy="370" r="60" fill="#EFE6CF" stroke="#D8CCAE" strokeWidth="3" />
      <circle cx="510" cy="370" r="40" fill="#DCEBCF" />
      {/* درخت‌ها */}
      {NB_TREES.map((t, i) => (
        <g key={i} transform={`translate(${t[0]} ${t[1]})`}>
          <circle r="11" fill="#7FB069" />
          <circle r="7" fill="#5E9C4A" opacity="0.7" cx="-3" cy="-3" />
        </g>
      ))}
    </svg>
  )
}

// ---------- پس‌زمینه‌ی نقشه‌ی مدرسه ----------
export function SchoolBg() {
  return (
    <svg width={MAP_W} height={MAP_H} viewBox={`0 0 ${MAP_W} ${MAP_H}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="sb-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8F0DF" />
          <stop offset="1" stopColor="#DCEBCF" />
        </linearGradient>
      </defs>
      <rect width={MAP_W} height={MAP_H} fill="url(#sb-ground)" />
      {/* حصار مدرسه */}
      <rect x="14" y="14" width={MAP_W - 28} height={MAP_H - 28} rx="26" fill="none" stroke="#C9BB95" strokeWidth="4" strokeDasharray="3 10" />
      {/* مسیرها */}
      <g stroke="#E2D6B8" strokeWidth="30" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M120 230 H880" />
        <path d="M500 130 V620" />
        <path d="M150 480 H850" />
      </g>
      {/* حیاط مرکزی */}
      <circle cx="500" cy="370" r="70" fill="#EFE6CF" stroke="#D8CCAE" strokeWidth="3" />
      <circle cx="500" cy="370" r="44" fill="#DCEBCF" />
      <circle cx="500" cy="370" r="14" fill="#6FB7D6" opacity="0.7" />
      {/* درخت‌ها */}
      {SB_TREES.map((t, i) => (
        <g key={i} transform={`translate(${t[0]} ${t[1]})`}>
          <circle r="10" fill="#7FB069" />
          <circle r="6" fill="#5E9C4A" opacity="0.7" cx="-2" cy="-2" />
        </g>
      ))}
    </svg>
  )
}

// ---------- شکل ساختمان ----------
export function BuildingShape({ place, selected }: { place: Place; selected: boolean }) {
  const stage = stageById(place.stage)
  const { x, y, w, h } = place
  // رنگ ساختمان بر اساس مرحله (ملایم‌تر)
  const fill = stage.color
  const roof = shade(fill, -18)
  return (
    <g>
      {/* سایه */}
      <rect x={x + 3} y={y + 5} width={w} height={h} rx="14" fill="rgba(31,36,25,0.12)" />
      {/* بدنه */}
      <rect x={x} y={y} width={w} height={h} rx="14" fill={fill} />
      {/* سقف */}
      <rect x={x} y={y} width={w} height={Math.min(26, h * 0.28)} rx="14" fill={roof} />
      <rect x={x} y={y + 14} width={w} height={Math.max(0, Math.min(12, h * 0.14))} fill={roof} />
      {/* پنجره‌ها */}
      <g fill="rgba(255,255,255,0.5)">
        {windowsFor(w, h, x, y)}
      </g>
      {/* در */}
      <rect x={x + w / 2 - 10} y={y + h - 22} width="20" height="22" rx="6" fill="rgba(31,36,25,0.25)" />
      {/* انتخاب: خط‌چین دور */}
      {selected && (
        <rect
          x={x - 8}
          y={y - 8}
          width={w + 16}
          height={h + 16}
          rx="20"
          fill="none"
          stroke="#E9A23B"
          strokeWidth="4"
          strokeDasharray="10 8"
        />
      )}
    </g>
  )
}

// پنجره‌های تزئینی
function windowsFor(w: number, h: number, x: number, y: number) {
  const cols = Math.max(2, Math.floor(w / 52))
  const rows = Math.max(1, Math.floor((h - 50) / 40))
  const out: JSX.Element[] = []
  const padX = 14
  const padTop = 34
  const gapX = (w - padX * 2 - cols * 22) / Math.max(1, cols - 1)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = x + padX + c * (22 + Math.max(0, gapX))
      const wy = y + padTop + r * 36
      if (wy + 16 > y + h - 28) break
      out.push(<rect key={`${r}-${c}`} x={wx} y={wy} width="22" height="16" rx="3" />)
    }
  }
  return out
}

// تیره‌تر/روشن‌تر کردن رنگ
function shade(hex: string, percent: number): string {
  const n = hex.replace('#', '')
  const num = parseInt(n.length === 3 ? n.split('').map((c) => c + c).join('') : n, 16)
  let r = (num >> 16) & 0xff
  let g = (num >> 8) & 0xff
  let b = num & 0xff
  r = Math.max(0, Math.min(255, Math.round(r + (r * percent) / 100)))
  g = Math.max(0, Math.min(255, Math.round(g + (g * percent) / 100)))
  b = Math.max(0, Math.min(255, Math.round(b + (b * percent) / 100)))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

const NB_TREES: [number, number][] = [
  [60, 90], [280, 100], [60, 330], [60, 600], [290, 660],
  [560, 120], [820, 90], [560, 660], [840, 660], [620, 360], [420, 360], [600, 380],
]
const SB_TREES: [number, number][] = [
  [60, 80], [920, 80], [60, 640], [920, 640], [300, 60], [700, 60], [300, 660], [700, 660], [440, 200], [560, 540],
]
