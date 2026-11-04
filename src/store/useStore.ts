import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LibraryTab = 'members' | 'history'
export type RequestStatus = 'none' | 'pending'

export interface RequestState {
  status: RequestStatus
  roleId: string | null
  text: string
  submittedAt: number | null
}

interface AppState {
  // انتخاب مکان روی نقشه‌ها
  neighborhoodSelected: string | null
  schoolSelected: string | null

  // وضعیت صفحه‌ی کتابخانه
  libraryTab: LibraryTab
  historyYearId: string

  // وضعیت درخواست عضویت (persist)
  request: RequestState

  // اکشن‌ها
  selectNeighborhood: (id: string | null) => void
  selectSchool: (id: string | null) => void
  setLibraryTab: (tab: LibraryTab) => void
  setHistoryYear: (yearId: string) => void
  submitRequest: (roleId: string, text: string) => void
  cancelRequest: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      neighborhoodSelected: null,
      schoolSelected: null,
      libraryTab: 'members',
      historyYearId: '1404', // پیش‌فرض: آخرین سال کامل (سوابق)
      request: { status: 'none', roleId: null, text: '', submittedAt: null },

      selectNeighborhood: (id) => set({ neighborhoodSelected: id }),
      selectSchool: (id) => set({ schoolSelected: id }),
      setLibraryTab: (tab) => set({ libraryTab: tab }),
      setHistoryYear: (yearId) => set({ historyYearId: yearId }),
      submitRequest: (roleId, text) =>
        set({
          request: { status: 'pending', roleId, text, submittedAt: Date.now() },
        }),
      cancelRequest: () =>
        set({
          request: { status: 'none', roleId: null, text: '', submittedAt: null },
        }),
    }),
    {
      name: 'naghshineh-store',
      // فقط بخش‌های پایدار را ذخیره کن (نه انتخاب موقت نقشه)
      partialize: (s) => ({
        libraryTab: s.libraryTab,
        historyYearId: s.historyYearId,
        request: s.request,
      }),
    },
  ),
)
