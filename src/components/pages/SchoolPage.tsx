import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapView, type MapViewHandle } from '../map/MapView'
import { SchoolBg, MAP_W, MAP_H } from '../map/MapAssets'
import { SCHOOL_PLACES, SCHOOL_STATS } from '../../data/data'
import { BottomSheet } from '../sheets/BottomSheet'
import { PlaceSheet } from '../sheets/PlaceSheet'
import { StageLegend } from '../map/StageLegend'
import { useStore } from '../../store/useStore'
import { fadeOnly, useReducedMotion } from '../../lib/motion'
import { IconArrowLeft, IconUsers, IconMapPin, IconShield } from '../icons'
import { faNum } from '../../lib/persian'
import { toast } from '../common/Toast'

export function SchoolPage() {
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const mapRef = useRef<MapViewHandle>(null)
  const selectedId = useStore((s) => s.schoolSelected)
  const select = useStore((s) => s.selectSchool)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleSelect = (id: string) => {
    select(id)
    setSheetOpen(true)
  }

  const handleDeselect = () => {
    select(null)
    setSheetOpen(false)
  }

  const handleBack = () => {
    // زوم‌اوت سپس برگشت به محله
    mapRef.current?.focus(MAP_W / 2, MAP_H / 2, 0.7)
    setTimeout(() => navigate('/'), reduced ? 150 : 420)
  }

  const selectedPlace = SCHOOL_PLACES.find((p) => p.id === selectedId) ?? null

  const enterPlace = (id: string) => {
    if (id === 'library') navigate('/school/library')
    else toast('این مکان هنوز در نسخه‌ی آزمایشی نیست', 'info')
  }

  return (
    <motion.div {...fadeOnly} className="relative h-full w-full">
      {/* هدر مدرسه */}
      <div className="absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-sand-50/95 to-sand-50/0 px-3 pt-2.5 pb-6 backdrop-blur-sm md:px-4">
        <div className="mx-auto flex max-w-[600px] items-center gap-2">
          <button
            onClick={handleBack}
            aria-label="بازگشت"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-700 shadow-soft"
          >
            <IconArrowLeft size={18} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-extrabold text-ink-900">{SCHOOL_STATS.name}</p>
            <p className="text-[11px] text-ink-500">
              {faNum(SCHOOL_STATS.totalPlaces)} مکان، سطح {faNum(SCHOOL_STATS.level)} مدرسه
            </p>
          </div>
        </div>
        {/* آمار */}
        <div className="mx-auto mt-2 flex max-w-[600px] gap-2">
          <Stat icon={<IconUsers size={14} />} value={faNum(SCHOOL_STATS.studentCount)} label="دانش‌آموز" />
          <Stat icon={<IconMapPin size={14} />} value={`${faNum(SCHOOL_STATS.activePlaces)}/${faNum(SCHOOL_STATS.totalPlaces)}`} label="مکان فعال" />
          <Stat icon={<IconShield size={14} />} value={`${faNum(SCHOOL_STATS.filledRoles)}/${faNum(SCHOOL_STATS.totalRoles)}`} label="نقش پر شده" />
        </div>
      </div>

      <MapView
        ref={mapRef}
        places={SCHOOL_PLACES}
        Bg={SchoolBg}
        selectedId={selectedId}
        onSelectPlace={handleSelect}
        onDeselect={handleDeselect}
        initialCam={{ cx: 500, cy: 360, s: 0.85 }}
      />

      {/* راهنمای مرحله‌ها */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[calc(var(--safe-bottom)+76px)] flex justify-center px-4 md:bottom-3">
        <StageLegend />
      </div>

      {/* شیت مکان */}
      <BottomSheet
        open={sheetOpen && !!selectedPlace}
        onClose={handleDeselect}
        title={selectedPlace?.name}
      >
        {selectedPlace && (
          <PlaceSheet
            place={selectedPlace}
            onEnter={() => enterPlace(selectedPlace.id)}
            onDetails={() => enterPlace(selectedPlace.id)}
          />
        )}
      </BottomSheet>
    </motion.div>
  )
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-1 items-center gap-1.5 rounded-xl bg-white/90 px-2 py-1.5 shadow-soft">
      <span className="text-leaf-500">{icon}</span>
      <div className="leading-tight">
        <p className="text-xs font-extrabold text-ink-900">{value}</p>
        <p className="text-[9px] text-ink-500">{label}</p>
      </div>
    </div>
  )
}
