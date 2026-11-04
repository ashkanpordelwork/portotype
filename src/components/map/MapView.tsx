import {
  forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState,
} from 'react'
import { useDrag, usePinch } from '@use-gesture/react'
import { animate } from 'framer-motion'
import type { Place } from '../../data/data'
import { MAP_W, MAP_H, BuildingShape } from './MapAssets'
import { stageById } from '../../data/data'
import { NameTag } from './NameTag'
import { MapControls } from './MapControls'
import { Minimap } from './Minimap'
import { useReducedMotion, SPRING } from '../../lib/motion'

export interface Cam { cx: number; cy: number; s: number }

export interface MapViewHandle {
  focus: (cx: number, cy: number, s?: number) => void
  getCam: () => Cam
}

interface Props {
  places: Place[]
  Bg: () => JSX.Element
  selectedId: string | null
  onSelectPlace: (id: string) => void
  onDeselect: () => void
  initialCam: Cam
  // وقتی تغییر کرد، دوربین به این نقطه می‌رود
  focusRequest?: { cx: number; cy: number; s: number; key: number } | null
  showMinimap?: boolean
  className?: string
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

function clampCam(cx: number, cy: number, s: number, vw: number, vh: number): Cam {
  const hw = vw / 2 / s
  const hh = vh / 2 / s
  const margin = 70
  let ncx = cx, ncy = cy
  let cxMin = hw - margin, cxMax = MAP_W - hw + margin
  let cyMin = hh - margin, cyMax = MAP_H - hh + margin
  if (cxMin > cxMax) ncx = MAP_W / 2
  else ncx = clamp(ncx, cxMin, cxMax)
  if (cyMin > cyMax) ncy = MAP_H / 2
  else ncy = clamp(ncy, cyMin, cyMax)
  return { cx: ncx, cy: ncy, s }
}

export const MapView = forwardRef<MapViewHandle, Props>(function MapView(
  { places, Bg, selectedId, onSelectPlace, onDeselect, initialCam, focusRequest, showMinimap = true, className = '' },
  ref,
) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [vp, setVp] = useState({ vw: 0, vh: 0 })
  const [cam, setCam] = useState<Cam>(initialCam)
  const camRef = useRef(cam)
  camRef.current = cam
  const reduced = useReducedMotion()
  const momentumRef = useRef<number | null>(null)

  // اندازه‌ی viewport
  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      setVp({ vw: el.clientWidth, vh: el.clientHeight })
    })
    ro.observe(el)
    setVp({ vw: el.clientWidth, vh: el.clientHeight })
    return () => ro.disconnect()
  }, [])

  // re-clamp هنگام تغییر اندازه
  useEffect(() => {
    if (!vp.vw) return
    setCam((c) => clampCam(c.cx, c.cy, c.s, vp.vw, vp.vh))
  }, [vp])

  const stopMomentum = () => {
    if (momentumRef.current) {
      cancelAnimationFrame(momentumRef.current)
      momentumRef.current = null
    }
  }

  const animateCam = useCallback((to: Cam) => {
    stopMomentum()
    if (reduced) {
      setCam(to)
      return
    }
    const from = { ...camRef.current }
    const controls = animate(from, to, {
      type: 'spring',
      stiffness: SPRING.camera.stiffness,
      damping: SPRING.camera.damping,
      mass: SPRING.camera.mass,
      onUpdate: (v) => {
        setCam(clampCam(v.cx, v.cy, v.s, vp.vw || 1, vp.vh || 1))
      },
    })
    return () => controls.stop()
  }, [reduced, vp])

  useImperativeHandle(ref, () => ({
    focus: (cx, cy, s) => animateCam(clampCam(cx, cy, s ?? camRef.current.s, vp.vw || 1, vp.vh || 1)),
    getCam: () => camRef.current,
  }))

  // واکنش به focusRequest
  useEffect(() => {
    if (!focusRequest || !vp.vw) return
    animateCam(clampCam(focusRequest.cx, focusRequest.cy, focusRequest.s, vp.vw, vp.vh))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusRequest?.key])

  // ---- مومنتوم (اینرسی) ----
  const startMomentum = (vx: number, vy: number) => {
    if (reduced || (Math.abs(vx) < 0.05 && Math.abs(vy) < 0.05)) return
    let last = performance.now()
    let velx = vx, vely = vy
    const friction = 0.92
    const step = (now: number) => {
      const dt = Math.min(32, now - last) / 1000
      last = now
      const c = camRef.current
      let ncx = c.cx - (velx * dt) / c.s
      let ncy = c.cy - (vely * dt) / c.s
      const clamped = clampCam(ncx, ncy, c.s, vp.vw || 1, vp.vh || 1)
      // اگر به لبه رسید، سرعت همان محور صفر
      if (Math.abs(clamped.cx - ncx) > 0.5) velx = 0
      if (Math.abs(clamped.cy - ncy) > 0.5) vely = 0
      setCam(clamped)
      velx *= friction
      vely *= friction
      if (Math.abs(velx) > 0.02 || Math.abs(vely) > 0.02) {
        momentumRef.current = requestAnimationFrame(step)
      } else {
        momentumRef.current = null
      }
    }
    momentumRef.current = requestAnimationFrame(step)
  }

  // ---- drag ----
  // NOTE: از filterTaps استفاده نمی‌کنیم چون روی تاچ کلیک合成 را لغو می‌کند.
  // در عوض، حرکت را با dragMovedRef ردیابی می‌کنیم و انتخاب/لغو را در pointerup مدیریت می‌کنیم.
  const dragMovedRef = useRef(false)
  const bindDragDelta = useDrag(
    ({ delta: [dx, dy], down, velocity: [vx, vy], first, movement: [mx, my] }) => {
      if (first) dragMovedRef.current = false
      if (Math.abs(mx) > 4 || Math.abs(my) > 4) dragMovedRef.current = true
      stopMomentum()
      const c = camRef.current
      const ncx = c.cx - dx / c.s
      const ncy = c.cy - dy / c.s
      setCam(clampCam(ncx, ncy, c.s, vp.vw || 1, vp.vh || 1))
      if (!down) {
        startMomentum(vx * 1000, vy * 1000)
      }
    },
    { pointer: { touch: true } },
  )

  // ---- pointerup: مدیریت tap برای لغو انتخاب روی پس‌زمینه ----
  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragMovedRef.current) return // یک درگ بود، نه کلیک
    const target = e.target as HTMLElement
    // اگر روی ساختمان یا برچسب بوده، onClick خودش مدیریت می‌کند
    if (target.closest('[data-place]') || target.closest('[data-nametag]')) return
    if (target.closest('[data-bg]')) {
      onDeselect()
    }
  }

  // ---- pinch ----
  const bindPinch = usePinch(
    ({ offset: [s], delta: [ds], origin: [ox, oy], first, memo, event }) => {
      stopMomentum()
      const c = camRef.current
      let newS = clamp(c.s + ds * 0.01 * c.s, 0.6, 2.0)
      // نقطه‌ی کانونی: وسط صفحه (پینچ معمولاً مرکز است)
      const vw = vp.vw || 1, vh = vp.vh || 1
      const fx = vw / 2, fy = vh / 2
      const mx = (fx - vw / 2) / c.s + c.cx
      const my = (fy - vh / 2) / c.s + c.cy
      const ncx = mx - (fx - vw / 2) / newS
      const ncy = my - (fy - vh / 2) / newS
      setCam(clampCam(ncx, ncy, newS, vw, vh))
      event.preventDefault?.()
    },
    { pointer: { touch: true }, pinchOnWheel: false },
  )

  // ---- wheel zoom ----
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      stopMomentum()
      const c = camRef.current
      const rect = el.getBoundingClientRect()
      const fx = e.clientX - rect.left
      const fy = e.clientY - rect.top
      const vw = rect.width, vh = rect.height
      const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08
      const newS = clamp(c.s * factor, 0.6, 2.0)
      const mx = (fx - vw / 2) / c.s + c.cx
      const my = (fy - vh / 2) / c.s + c.cy
      const ncx = mx - (fx - vw / 2) / newS
      const ncy = my - (fy - vh / 2) / newS
      setCam(clampCam(ncx, ncy, newS, vw, vh))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // ---- دکمه‌های زوم ----
  const zoomBy = (factor: number) => {
    stopMomentum()
    const c = camRef.current
    const newS = clamp(c.s * factor, 0.6, 2.0)
    animateCam(clampCam(c.cx, c.cy, newS, vp.vw || 1, vp.vh || 1))
  }
  const locate = () => {
    animateCam(clampCam(initialCam.cx, initialCam.cy, initialCam.s, vp.vw || 1, vp.vh || 1))
  }

  // ---- کلیک ساختمان ----
  const handleBuildingClick = (p: Place) => {
    const cx = p.x + p.w / 2
    const cy = p.y + p.h / 2
    const targetS = Math.max(camRef.current.s, 1.15)
    animateCam(clampCam(cx, cy, targetS, vp.vw || 1, vp.vh || 1))
    onSelectPlace(p.id)
  }

  // پروجکشن نقطه‌ی نقشه → صفحه
  const project = (mx: number, my: number) => ({
    x: (mx - cam.cx) * cam.s + (vp.vw || 0) / 2,
    y: (my - cam.cy) * cam.s + (vp.vh || 0) / 2,
  })

  const tx = (vp.vw || 0) / 2 - cam.cx * cam.s
  const ty = (vp.vh || 0) / 2 - cam.cy * cam.s

  return (
    <div
      ref={wrapRef}
      className={['relative h-full w-full overflow-hidden touch-none select-none', className].join(' ')}
      {...bindDragDelta()}
      {...bindPinch()}
      onPointerUp={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      {/* لایه‌ی قابل‌تبدیل: پس‌زمینه + ساختمان‌ها */}
      <div
        className="absolute top-0 left-0 map-fade-mask"
        style={{
          width: MAP_W,
          height: MAP_H,
          transform: `translate(${tx}px, ${ty}px) scale(${cam.s})`,
          transformOrigin: '0 0',
        }}
      >
        <div data-bg="1" className="absolute inset-0 cursor-grab active:cursor-grabbing">
          <Bg />
        </div>
        <svg
          width={MAP_W}
          height={MAP_H}
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          className="absolute inset-0"
          style={{ pointerEvents: 'none' }}
        >
          {/* هیت‌اریا برای هر ساختمان */}
          {places.map((p) => (
            <rect
              key={p.id + '-hit'}
              x={p.x}
              y={p.y}
              width={p.w}
              height={p.h}
              rx="14"
              fill="transparent"
              data-place={p.id}
              style={{ pointerEvents: 'all', cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation()
                handleBuildingClick(p)
              }}
            />
          ))}
          {/* شکل ساختمان‌ها */}
          {places.map((p) => (
            <BuildingShapeByKey key={p.id} place={p} selected={selectedId === p.id} dimmed={!!selectedId && selectedId !== p.id} />
          ))}
        </svg>
      </div>

      {/* لایه‌ی برچسب‌ها (HTML، بدون مقیاس) */}
      <div className="pointer-events-none absolute inset-0">
        {places.map((p) => {
          const pos = project(p.x + p.w / 2, p.y)
          const stage = stageById(p.stage)
          const isSel = selectedId === p.id
          const dim = !!selectedId && !isSel
          return (
            <div
              key={p.id + '-tag'}
              className="absolute"
              style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -100%)' }}
            >
              <div className="pointer-events-auto" data-nametag={p.id}>
                <NameTag
                  name={p.name}
                  stageColor={stage.color}
                  stageName={stage.name}
                  progress={p.progress}
                  selected={isSel}
                  dimmed={dim}
                  onClick={() => handleBuildingClick(p)}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* کنترل‌ها */}
      <MapControls onZoomIn={() => zoomBy(1.2)} onZoomOut={() => zoomBy(1 / 1.2)} onLocate={locate} />

      {/* مینی‌مپ */}
      {showMinimap && vp.vw > 0 && (
        <Minimap
          cam={cam}
          vw={vp.vw}
          vh={vp.vh}
          places={places}
          onJump={(cx, cy) => animateCam(clampCam(cx, cy, camRef.current.s, vp.vw, vp.vh))}
        />
      )}
    </div>
  )
})

// wrapper برای رسم شکل ساختمان با dim/selected
function BuildingShapeByKey({ place, selected, dimmed }: { place: Place; selected: boolean; dimmed: boolean }) {
  return (
    <g style={{ opacity: dimmed ? 0.45 : 1, transition: 'opacity 0.25s' }}>
      <BuildingShape place={place} selected={selected} />
    </g>
  )
}
