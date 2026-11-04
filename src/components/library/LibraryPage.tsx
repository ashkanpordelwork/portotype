import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStore, type LibraryTab } from '../../store/useStore'
import { LIBRARY_INFO, SCHOOL_PLACES, stageById } from '../../data/data'
import { LevelCard } from './LevelCard'
import { ManagerCard } from './ManagerCard'
import { MembersTab } from './MembersTab'
import { HistoryTab } from './HistoryTab'
import { RequestSheet } from './RequestSheet'
import { MessageModal } from './MessageModal'
import { CardSkeleton, TableSkeleton } from '../common/Skeleton'
import { IconArrowLeft, IconBook } from '../icons'
import { BuildingShape } from '../map/MapAssets'
import { pageTransition, useReducedMotion } from '../../lib/motion'

const TABS: { id: LibraryTab; label: string }[] = [
  { id: 'members', label: 'اعضای امسال' },
  { id: 'history', label: 'سوابق' },
]

export function LibraryPage() {
  const navigate = useNavigate()
  const tab = useStore((s) => s.libraryTab)
  const setTab = useStore((s) => s.setLibraryTab)
  const reduced = useReducedMotion()

  const [loading, setLoading] = useState(true)
  const [requestOpen, setRequestOpen] = useState(false)
  const [messageOpen, setMessageOpen] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollMemory = useRef<Record<string, number>>({})

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 420)
    return () => clearTimeout(t)
  }, [])

  // حفظ و بازیابی اسکرول هر تب
  const switchTab = (next: LibraryTab) => {
    if (scrollRef.current) scrollMemory.current[tab] = scrollRef.current.scrollTop
    setTab(next)
  }
  useEffect(() => {
    if (!loading && scrollRef.current) {
      scrollRef.current.scrollTop = scrollMemory.current[tab] ?? 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, loading])

  const libraryPlace = SCHOOL_PLACES.find((p) => p.id === 'library')!
  const stage = stageById(LIBRARY_INFO.stage)

  return (
    <motion.div {...pageTransition} className="flex h-full flex-col">
      {/* هدر صفحه */}
      <div className="flex items-center gap-2 border-b border-sand-100 bg-sand-50/80 px-3 py-2.5 backdrop-blur-sm md:px-0">
        <button
          onClick={() => navigate('/school')}
          className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink-700 shadow-soft"
        >
          <IconArrowLeft size={14} />
          بازگشت به نقشه
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 text-xs text-ink-500">
          <span className="truncate">{SCHOOL_PLACES && 'مدرسه‌ی شهید بهشتی'}</span>
          <span className="text-ink-300">/</span>
          <span className="font-bold text-ink-900">کتابخانه</span>
        </div>
      </div>

      {/* محتوای قابل اسکرول */}
      <div ref={scrollRef} className="no-scrollbar flex-1 overflow-y-auto px-3 pb-4 md:px-0">
        <div className="mx-auto w-full max-w-[560px] space-y-4 pt-3">
          {/* هیرو: ساختمان کتابخانه */}
          <div
            className="relative overflow-hidden rounded-3xl p-4 shadow-card"
            style={{ background: `linear-gradient(135deg, ${stage.color}22 0%, ${stage.color}11 100%)` }}
          >
            <div className="flex items-center gap-3">
              <div className="shrink-0">
                <svg width="84" height="70" viewBox="0 0 200 150">
                  <BuildingShape place={{ ...libraryPlace, x: 0, y: 0, w: 200, h: 150 }} selected={false} />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-leaf-600">
                  <IconBook size={16} />
                  <span className="text-xs font-bold">{libraryPlace.domain}</span>
                </div>
                <h1 className="text-xl font-extrabold text-ink-900">{LIBRARY_INFO.name}</h1>
                <p className="text-xs text-ink-500">{SCHOOL_PLACES ? 'مدرسه‌ی شهید بهشتی' : ''}</p>
              </div>
            </div>
          </div>

          {loading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <TableSkeleton rows={5} />
            </>
          ) : (
            <>
              <LevelCard />
              <ManagerCard onMessage={() => setMessageOpen(true)} />

              {/* تب‌ها */}
              <div className="sticky top-0 z-10 -mx-3 bg-sand-50/90 px-3 py-2 backdrop-blur-sm md:mx-0 md:px-0">
                <div className="relative flex rounded-2xl bg-sand-100 p-1">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => switchTab(t.id)}
                      className="relative flex-1 rounded-xl py-2 text-sm font-bold"
                      style={{ color: tab === t.id ? '#1F2419' : '#6B7359' }}
                    >
                      {tab === t.id && (
                        <motion.div
                          layoutId="tab-indicator"
                          className="absolute inset-0 rounded-xl bg-white shadow-soft"
                          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {tab === 'members' ? <MembersTab onApply={() => setRequestOpen(true)} /> : <HistoryTab />}
            </>
          )}
        </div>
      </div>

      <RequestSheet open={requestOpen} onClose={() => setRequestOpen(false)} />
      <MessageModal open={messageOpen} onClose={() => setMessageOpen(false)} />
    </motion.div>
  )
}
