import { useMemo } from 'react'
import type { Cam } from './MapView'
import type { Place } from '../../data/data'
import { MAP_W, MAP_H } from './MapAssets'
import { stageById } from '../../data/data'

interface Props {
  cam: Cam
  vw: number
  vh: number
  places: Place[]
  onJump: (cx: number, cy: number) => void
}

const MW = 130 // عرض مینی‌مپ
const MH = (MW * MAP_H) / MAP_W

export function Minimap({ cam, vw, vh, places, onJump }: Props) {
  const scale = MW / MAP_W
  // مستطیل دیده‌شده در مختصات مینی‌مپ
  const viewW = (vw / cam.s) * scale
  const viewH = (vh / cam.s) * scale
  const viewX = (cam.cx - vw / cam.s / 2) * scale
  const viewY = (cam.cy - vh / cam.s / 2) * scale

  const dots = useMemo(
    () => places.map((p) => ({ x: (p.x + p.w / 2) * scale, y: (p.y + p.h / 2) * scale, c: stageById(p.stage).color })),
    [places, scale],
  )

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / scale
    const y = (e.clientY - rect.top) / scale
    onJump(x, y)
  }

  return (
    <div
      className="absolute right-3 top-3 z-30 overflow-hidden rounded-2xl border border-sand-200 bg-sand-50/95 shadow-card backdrop-blur-sm"
      style={{ width: MW, height: MH }}
    >
      <svg width={MW} height={MH} viewBox={`0 0 ${MW} ${MH}`} onClick={handleClick} className="cursor-pointer">
        <rect width={MW} height={MH} fill="#EFE7D4" />
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={2.6} fill={d.c} />
        ))}
        <rect
          x={Math.max(0, viewX)}
          y={Math.max(0, viewY)}
          width={Math.min(MW, viewW)}
          height={Math.min(MH, viewH)}
          fill="rgba(74,128,57,0.18)"
          stroke="#4A8039"
          strokeWidth="1.5"
          rx="3"
        />
      </svg>
    </div>
  )
}
