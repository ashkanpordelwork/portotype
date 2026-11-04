import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapView, type MapViewHandle } from '../map/MapView'
import { NeighborhoodBg } from '../map/MapAssets'
import { NEIGHBORHOOD_PLACES } from '../../data/data'
import { BottomSheet } from '../sheets/BottomSheet'
import { PlaceSheet } from '../sheets/PlaceSheet'
import { StageLegend } from '../map/StageLegend'
import { useStore } from '../../store/useStore'
import { fadeOnly, useReducedMotion } from '../../lib/motion'
import { toast } from '../common/Toast'

export function NeighborhoodPage() {
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const mapRef = useRef<MapViewHandle>(null)
  const selectedId = useStore((s) => s.neighborhoodSelected)
  const select = useStore((s) => s.selectNeighborhood)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleSelect = (id: string) => {
    select(id)
    if (id === 'school') {
      // زوم روی مدرسه، سپس انتقال به نقشه‌ی مدرسه
      setSheetOpen(false)
      setTimeout(() => navigate('/school'), reduced ? 150 : 480)
    } else {
      setSheetOpen(true)
      toast('این مکان هنوز در نسخه‌ی آزمایشی نیست', 'info')
    }
  }

  const handleDeselect = () => {
    select(null)
    setSheetOpen(false)
  }

  const selectedPlace = NEIGHBORHOOD_PLACES.find((p) => p.id === selectedId) ?? null

  return (
    <motion.div {...fadeOnly} className="relative h-full w-full">
      <MapView
        ref={mapRef}
        places={NEIGHBORHOOD_PLACES}
        Bg={NeighborhoodBg}
        selectedId={selectedId}
        onSelectPlace={handleSelect}
        onDeselect={handleDeselect}
        initialCam={{ cx: 500, cy: 360, s: 1 }}
      />

      {/* کارت «محله‌ی من» */}
      <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center px-4">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-auto rounded-2xl bg-white/95 px-4 py-2.5 text-center shadow-card backdrop-blur-sm"
        >
          <p className="text-xs font-semibold text-ink-500">محله‌ی من</p>
          <p className="text-sm font-extrabold text-ink-900">روی هر مکان بزن تا واردش بشی</p>
        </motion.div>
      </div>

      {/* راهنمای مرحله‌ها */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[calc(var(--safe-bottom)+76px)] flex justify-center px-4 md:bottom-3">
        <StageLegend />
      </div>

      {/* شیت مکان (غیر از مدرسه) */}
      <BottomSheet
        open={sheetOpen && !!selectedPlace && selectedPlace.id !== 'school'}
        onClose={handleDeselect}
        title={selectedPlace?.name}
      >
        {selectedPlace && (
          <PlaceSheet
            place={selectedPlace}
            onEnter={() => {}}
            onDetails={() => {}}
          />
        )}
      </BottomSheet>
    </motion.div>
  )
}
