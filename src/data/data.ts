// ============================================================
//  داده‌های mock نقشینه — همه‌ی داده‌ها در این یک فایل
// ============================================================

export type StageId = 'seed' | 'sprout' | 'bloom' | 'fruit'

export interface StageInfo {
  id: StageId
  name: string
  color: string
  order: number
}

export const STAGES: StageInfo[] = [
  { id: 'seed', name: 'نشانه', color: '#B5895A', order: 0 },
  { id: 'sprout', name: 'جوانه', color: '#A8C66C', order: 1 },
  { id: 'bloom', name: 'شکوفا', color: '#5E9C4A', order: 2 },
  { id: 'fruit', name: 'پربار', color: '#3A6630', order: 3 },
]

export const stageById = (id: StageId): StageInfo =>
  STAGES.find((s) => s.id === id) ?? STAGES[0]

// ---------- کاربر ----------
export interface CurrentUser {
  name: string
  grade: string
  level: number
  points: number
  streak: number
  schoolName: string
  avatarColor: string
}

export const ME: CurrentUser = {
  name: 'علی رضایی',
  grade: 'پایه‌ی هشتم',
  level: 7,
  points: 6400,
  streak: 12,
  schoolName: 'مدرسه‌ی شهید بهشتی',
  avatarColor: '#4F9FC4',
}

// ---------- مکان‌ها روی نقشه ----------
export type PlaceCategory = 'school' | 'library' | 'lab' | 'field' | 'art' | 'hall' | 'garden' | 'park' | 'mosque' | 'sports'

export interface Place {
  id: string
  name: string
  category: PlaceCategory
  stage: StageId
  progress: number // ۰ تا ۱
  x: number
  y: number
  w: number
  h: number
  shortDesc: string
  canEnter: boolean // آیا دکمه‌ی ورود فعال است
  // اطلاعات اضافه برای شیت
  domain?: string
  rolesFilled?: number
  rolesTotal?: number
  manager?: string
  memberColors?: string[]
}

// مختصات در فضای ۱۰۰۰×۷۲۰
export const NEIGHBORHOOD_PLACES: Place[] = [
  {
    id: 'school',
    name: 'مدرسه‌ی شهید بهشتی',
    category: 'school',
    stage: 'fruit',
    progress: 0.8,
    x: 400, y: 280, w: 220, h: 180,
    shortDesc: '۶ مکان، سطح ۴ مدرسه',
    canEnter: true,
    domain: 'مرکز آموزشی',
    rolesFilled: 24, rolesTotal: 36,
    manager: 'آقای رضایی',
    memberColors: ['#5E9C4A', '#4F9FC4', '#E9A23B', '#C76B54'],
  },
  {
    id: 'park',
    name: 'پارک محله',
    category: 'park',
    stage: 'bloom',
    progress: 0.6,
    x: 90, y: 130, w: 200, h: 150,
    shortDesc: 'حوزه‌ی محیطی، ۳ از ۴ نقش پر شده',
    canEnter: false,
    domain: 'حوزه‌ی محیطی',
    rolesFilled: 3, rolesTotal: 4,
    manager: 'خانم موسوی',
    memberColors: ['#7FB069', '#6FB7D6'],
  },
  {
    id: 'mosque',
    name: 'مسجد محله',
    category: 'mosque',
    stage: 'sprout',
    progress: 0.4,
    x: 740, y: 120, w: 170, h: 140,
    shortDesc: 'حوزه‌ی معنوی، ۲ از ۳ نقش پر شده',
    canEnter: false,
    domain: 'حوزه‌ی معنوی',
    rolesFilled: 2, rolesTotal: 3,
    manager: 'آقای کریمی',
    memberColors: ['#D98C7A'],
  },
  {
    id: 'sports',
    name: 'باشگاه ورزشی',
    category: 'sports',
    stage: 'bloom',
    progress: 0.55,
    x: 720, y: 470, w: 200, h: 160,
    shortDesc: 'حوزه‌ی بدنی، ۵ از ۶ نقش پر شده',
    canEnter: false,
    domain: 'حوزه‌ی بدنی',
    rolesFilled: 5, rolesTotal: 6,
    manager: 'آقای نوری',
    memberColors: ['#E9A23B', '#5E9C4A', '#4F9FC4'],
  },
]

export const SCHOOL_PLACES: Place[] = [
  {
    id: 'library',
    name: 'کتابخانه',
    category: 'library',
    stage: 'bloom',
    progress: 0.85,
    x: 380, y: 230, w: 200, h: 150,
    shortDesc: 'حوزه‌ی آموزشی، ۵ از ۵ نقش پر شده',
    canEnter: true,
    domain: 'حوزه‌ی آموزشی',
    rolesFilled: 5, rolesTotal: 5,
    manager: 'امیر حسینی',
    memberColors: ['#5E9C4A', '#4F9FC4', '#E9A23B', '#C76B54', '#7FB069'],
  },
  {
    id: 'lab',
    name: 'آزمایشگاه',
    category: 'lab',
    stage: 'sprout',
    progress: 0.5,
    x: 100, y: 170, w: 170, h: 120,
    shortDesc: 'حوزه‌ی آموزشی، ۳ از ۴ نقش پر شده',
    canEnter: false,
    domain: 'حوزه‌ی آموزشی',
    rolesFilled: 3, rolesTotal: 4,
    manager: 'آقای صالحی',
    memberColors: ['#6FB7D6', '#A8C66C'],
  },
  {
    id: 'hall',
    name: 'سالن هم‌نگار',
    category: 'hall',
    stage: 'bloom',
    progress: 0.7,
    x: 660, y: 150, w: 180, h: 130,
    shortDesc: 'حوزه‌ی هنری، ۴ از ۵ نقش پر شده',
    canEnter: false,
    domain: 'حوزه‌ی هنری',
    rolesFilled: 4, rolesTotal: 5,
    manager: 'خانم رحیمی',
    memberColors: ['#D98C7A', '#E9A23B'],
  },
  {
    id: 'art',
    name: 'کارگاه هنر',
    category: 'art',
    stage: 'sprout',
    progress: 0.45,
    x: 90, y: 420, w: 170, h: 140,
    shortDesc: 'حوزه‌ی هنری، ۲ از ۴ نقش پر شده',
    canEnter: false,
    domain: 'حوزه‌ی هنری',
    rolesFilled: 2, rolesTotal: 4,
    manager: 'خانم بهرامی',
    memberColors: ['#C76B54'],
  },
  {
    id: 'garden',
    name: 'باغچه‌ی مدرسه',
    category: 'garden',
    stage: 'fruit',
    progress: 0.9,
    x: 390, y: 480, w: 190, h: 130,
    shortDesc: 'حوزه‌ی محیطی، ۴ از ۴ نقش پر شده',
    canEnter: false,
    domain: 'حوزه‌ی محیطی',
    rolesFilled: 4, rolesTotal: 4,
    manager: 'آقای احمدی',
    memberColors: ['#7FB069', '#A8C66C'],
  },
  {
    id: 'field',
    name: 'زمین ورزش',
    category: 'field',
    stage: 'seed',
    progress: 0.3,
    x: 640, y: 430, w: 230, h: 160,
    shortDesc: 'حوزه‌ی بدنی، ۲ از ۵ نقش پر شده',
    canEnter: false,
    domain: 'حوزه‌ی بدنی',
    rolesFilled: 2, rolesTotal: 5,
    manager: 'آقای نوری',
    memberColors: ['#E9A23B'],
  },
]

// ---------- اعضای کتابخانه ----------
export interface Member {
  id: string
  name: string
  role: string
  points: number
  color: string
  grad?: boolean       // فارغ‌التحصیل
  honorary?: boolean   // عضو افتخاری
  badges?: string[]    // نشان‌ها (برای شیت پروفایل)
  isMe?: boolean
}

// ۱۴۰۵ تا ۱۴۰۶ (سال جاری)
export const LIBRARY_1405: Member[] = [
  { id: 'sina', name: 'سینا کریمی', role: 'مسئول قفسه‌ها', points: 820, color: '#5E9C4A', badges: ['کتاب‌خوان', 'راهبر', 'فعال'] },
  { id: 'mohammad', name: 'محمد نوری', role: 'امانت‌دار', points: 640, color: '#4F9FC4', badges: ['دقیق', 'فعال'] },
  { id: 'amir', name: 'امیر حسینی', role: 'مسئول', points: 590, color: '#E9A23B', badges: ['راهبر', 'کتاب‌خوان', 'فعال'] },
  { id: 'reza', name: 'رضا احمدی', role: 'راهنمای کتاب', points: 410, color: '#C76B54', badges: ['فعال'] },
  { id: 'mehdi', name: 'مهدی صالحی', role: 'راهنمای کتاب', points: 270, color: '#7FB069', badges: ['تازه‌وارد'] },
]

// ۱۴۰۴ تا ۱۴۰۵
export const LIBRARY_1404: Member[] = [
  { id: 'hossein-m', name: 'حسین مرادی', role: 'مسئول', points: 740, color: '#3A6630', badges: ['راهبر', 'فعال', 'کتاب‌خوان'] },
  { id: 'sina', name: 'سینا کریمی', role: 'مسئول قفسه‌ها', points: 580, color: '#5E9C4A', badges: ['کتاب‌خوان', 'فعال'] },
  { id: 'parsa', name: 'پارسا نیکو', role: 'امانت‌دار', points: 460, color: '#6FB7D6', badges: ['دقیق'] },
  { id: 'kian', name: 'کیان رحیمی', role: 'راهنمای کتاب', points: 390, color: '#A8C66C', grad: true, badges: ['فعال'] },
  { id: 'mohammad', name: 'محمد نوری', role: 'راهنمای کتاب', points: 310, color: '#4F9FC4', badges: ['فعال'] },
  { id: 'arash', name: 'آرش بهرامی', role: 'راهنمای کتاب', points: 240, color: '#D98C7A', badges: ['تازه‌وارد'] },
  { id: 'ali', name: 'علی رضایی', role: 'عضو افتخاری', points: 120, color: '#4F9FC4', honorary: true, isMe: true, badges: ['افتخاری'] },
]

// ۱۴۰۳ تا ۱۴۰۴
export const LIBRARY_1403: Member[] = [
  { id: 'hossein-m', name: 'حسین مرادی', role: 'مسئول', points: 680, color: '#3A6630', grad: true, badges: ['راهبر', 'فعال'] },
  { id: 'sina', name: 'سینا کریمی', role: 'امانت‌دار', points: 520, color: '#5E9C4A', badges: ['دقیق', 'کتاب‌خوان'] },
  { id: 'parsa', name: 'پارسا نیکو', role: 'راهنمای کتاب', points: 440, color: '#6FB7D6', grad: true, badges: ['فعال'] },
  { id: 'kian', name: 'کیان رحیمی', role: 'راهنمای کتاب', points: 360, color: '#A8C66C', grad: true, badges: ['فعال'] },
  { id: 'arash', name: 'آرش بهرامی', role: 'راهنمای کتاب', points: 210, color: '#D98C7A', badges: ['تازه‌وارد'] },
]

// ۱۴۰۲ تا ۱۴۰۳
export const LIBRARY_1402: Member[] = [
  { id: 'hossein-m', name: 'حسین مرادی', role: 'مسئول', points: 610, color: '#3A6630', grad: true, badges: ['راهبر'] },
  { id: 'parsa', name: 'پارسا نیکو', role: 'امانت‌دار', points: 470, color: '#6FB7D6', grad: true, badges: ['دقیق'] },
  { id: 'kian', name: 'کیان رحیمی', role: 'راهنمای کتاب', points: 330, color: '#A8C66C', grad: true, badges: ['فعال'] },
  { id: 'sina', name: 'سینا کریمی', role: 'راهنمای کتاب', points: 250, color: '#5E9C4A', badges: ['تازه‌وارد'] },
]

// سالی که داده ندارد
export const LIBRARY_EMPTY: Member[] = []

export interface YearSummary {
  yearId: string
  label: string            // مثلاً «۱۴۰۴ تا ۱۴۰۵»
  manager: string
  memberCount: number
  totalPoints: number
  approvedReports: number
  groupBadges: number
  members: Member[]
  empty?: boolean
}

export const YEAR_SUMMARIES: YearSummary[] = [
  {
    yearId: '1405',
    label: '۱۴۰۵ تا ۱۴۰۶',
    manager: 'امیر حسینی',
    memberCount: 5,
    totalPoints: 2480,
    approvedReports: 162,
    groupBadges: 3,
    members: LIBRARY_1405,
  },
  {
    yearId: '1404',
    label: '۱۴۰۴ تا ۱۴۰۵',
    manager: 'حسین مرادی',
    memberCount: 7,
    totalPoints: 1920,
    approvedReports: 148,
    groupBadges: 2,
    members: LIBRARY_1404,
  },
  {
    yearId: '1403',
    label: '۱۴۰۳ تا ۱۴۰۴',
    manager: 'حسین مرادی',
    memberCount: 5,
    totalPoints: 2210,
    approvedReports: 131,
    groupBadges: 2,
    members: LIBRARY_1403,
  },
  {
    yearId: '1402',
    label: '۱۴۰۲ تا ۱۴۰۳',
    manager: 'حسین مرادی',
    memberCount: 4,
    totalPoints: 1660,
    approvedReports: 98,
    groupBadges: 1,
    members: LIBRARY_1402,
  },
  {
    yearId: '1401',
    label: '۱۴۰۱ تا ۱۴۰۲',
    manager: '—',
    memberCount: 0,
    totalPoints: 0,
    approvedReports: 0,
    groupBadges: 0,
    members: LIBRARY_EMPTY,
    empty: true,
  },
]

// سال جاری = آخرین سال فعال (۱۴۰۵)
export const CURRENT_YEAR = YEAR_SUMMARIES[0]

// ---------- نقش‌های خالی کتابخانه (برای فرم درخواست) ----------
export interface OpenRole {
  id: string
  name: string
  desc: string
}

export const LIBRARY_OPEN_ROLES: OpenRole[] = [
  { id: 'guide', name: 'راهنمای کتاب', desc: 'کمک به پیدا کردن کتاب و معرفی کتاب‌های مناسب' },
  { id: 'promo', name: 'تبلیغات', desc: 'طراحی پوستر و اطلاع‌رسانی رویدادهای کتابخانه' },
]

// ---------- اطلاعات کتابخانه (کارت سطح/مسئول) ----------
export const LIBRARY_INFO = {
  name: 'کتابخانه',
  stage: 'bloom' as StageId,
  progress: 0.85,
  totalPoints: 2480,
  manager: {
    name: 'امیر حسینی',
    grade: 'پایه‌ی نهم',
    since: 'مهر ۱۴۰۵',
    color: '#E9A23B',
  },
  stats: { activeMembers: 5, openRoles: 2, yearsActive: 3 },
  description: 'کتابخانه‌ی مدرسه‌ی شهید بهشتی، مرکز مطالعه و فعالیت گروهی دانش‌آموزان. هر هفته رویداد کتاب‌خوانی برگزار می‌شود.',
}

// ---------- فعالیت‌های اخیر ----------
export interface Activity {
  id: string
  who: string
  what: string
  when: string
  points?: number
}

export const RECENT_ACTIVITIES: Activity[] = [
  { id: 'a1', who: 'سینا کریمی', what: 'گزارش کتاب‌خوانی «جزیره‌ی پنگوئن‌ها» را ثبت کرد', when: 'امروز', points: 40 },
  { id: 'a2', who: 'امیر حسینی', what: 'جلسه‌ی گروه راهنمایان را برگزار کرد', when: 'دیروز', points: 30 },
  { id: 'a3', who: 'محمد نوری', what: '۸ کتاب جدید را قفسه‌بندی کرد', when: '۲ روز پیش', points: 25 },
  { id: 'a4', who: 'رضا احمدی', what: 'راهنمایی دو دانش‌آموز برای انتخاب کتاب', when: '۳ روز پیش', points: 15 },
  { id: 'a5', who: 'مهدی صالحی', what: 'به رویداد کتاب‌خوانی پیوست', when: '۴ روز پیش', points: 10 },
]

// ---------- آمار مدرسه ----------
export const SCHOOL_STATS = {
  name: 'مدرسه‌ی شهید بهشتی',
  studentCount: 128,
  activePlaces: 3,   // ۳ از ۶ مکان فعال
  totalPlaces: 6,
  filledRoles: 24,
  totalRoles: 36,
  level: 4,
  placeStage: 'fruit' as StageId,
}

// ---------- راهنمای رنگ مرحله‌ها ----------
export const STAGE_LEGEND = STAGES
