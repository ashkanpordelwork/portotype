import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { NeighborhoodPage } from './components/pages/NeighborhoodPage'
import { SchoolPage } from './components/pages/SchoolPage'
import { LibraryPage } from './components/library/LibraryPage'
import { ComingSoon } from './components/common/ComingSoon'
import { IconStar, IconBookmark, IconRoles, IconShield } from './components/icons'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<NeighborhoodPage />} />
        <Route path="/school" element={<SchoolPage />} />
        <Route path="/school/library" element={<LibraryPage />} />
        <Route
          path="/profile"
          element={<ComingSoon title="پروفایل" icon={<IconStar size={32} />} backTo="/" backLabel="بازگشت به محله" />}
        />
        <Route
          path="/bookmarks"
          element={<ComingSoon title="نشان‌ها" icon={<IconBookmark size={32} />} backTo="/" backLabel="بازگشت به محله" />}
        />
        <Route
          path="/roles"
          element={<ComingSoon title="نقش‌ها" icon={<IconRoles size={32} />} backTo="/school" backLabel="بازگشت به مدرسه" />}
        />
        <Route
          path="/duties"
          element={<ComingSoon title="مسئولیت‌ها" icon={<IconShield size={32} />} backTo="/school" backLabel="بازگشت به مدرسه" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
