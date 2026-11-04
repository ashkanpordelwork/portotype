import { IconHome, IconStar, IconBookmark, IconBriefcase, IconRoles, IconShield } from '../icons'
import type { ComponentType, SVGProps } from 'react'

export interface TabDef {
  id: string
  label: string
  to: string
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>
  comingSoon?: boolean
}

export interface Section {
  id: 'neighborhood' | 'school'
  tabs: TabDef[]
}

export const NEIGHBORHOOD_SECTION: Section = {
  id: 'neighborhood',
  tabs: [
    { id: 'home', label: 'محله من', to: '/', icon: IconHome },
    { id: 'profile', label: 'پروفایل', to: '/profile', icon: IconStar, comingSoon: true },
    { id: 'bookmarks', label: 'نشان‌ها', to: '/bookmarks', icon: IconBookmark, comingSoon: true },
  ],
}

export const SCHOOL_SECTION: Section = {
  id: 'school',
  tabs: [
    { id: 'workspace', label: 'دفتر کار', to: '/school', icon: IconBriefcase },
    { id: 'roles', label: 'نقش‌ها', to: '/roles', icon: IconRoles, comingSoon: true },
    { id: 'duties', label: 'مسئولیت‌ها', to: '/duties', icon: IconShield, comingSoon: true },
  ],
}

// تعیین سکشن بر اساس مسیر
export function sectionForPath(pathname: string): Section {
  if (pathname.startsWith('/school') || pathname.startsWith('/roles') || pathname.startsWith('/duties')) {
    return SCHOOL_SECTION
  }
  return NEIGHBORHOOD_SECTION
}

// آیدی تب فعال بر اساس مسیر
export function activeTabId(pathname: string, section: Section): string | null {
  for (const t of section.tabs) {
    if (pathname === t.to) return t.id
  }
  // اگر در /school/library بود، تب دفتر کار فعال
  if (pathname.startsWith('/school')) return 'workspace'
  return null
}
