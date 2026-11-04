# نقشینه — پروتوتایپ تعاملی

پروتوتایپ لایو و کاملاً تعاملی نقشه‌ی محله و مدرسه، بر اساس طراحی فیگما.
ساخته‌شده با Vite + React + TypeScript + Framer Motion + @use-gesture/react.

## امکانات

- **نقشه‌ی محله و مدرسه**: pan با اینرسی، zoom با پینچ/اسکرول/دکمه، Locate، مینی‌مپ، لبه‌های محو
- **Bottom Sheet** با بستن از × ، کلیک بیرون، یا کشیدن به پایین (drag-to-dismiss)
- **صفحه‌ی کتابخانه** با تب‌های «اعضای امسال» و «سوابق» (۳ سال داده + یک سال خالی)
- **درخواست عضویت** با انتخاب نقش و متن، ذخیره در localStorage
- **مودال پیام**، **شیت پروفایل عضو**، **toast** ها
- **مسیریابی با HashRouter** (دکمه‌ی back مرورگر کار می‌کند)
- **واکنش‌گرا**: زیر ۷۶۸px موبایل (منوی پایین)، بالای ۷۶۸px دسکتاپ (تب‌ها در هدر، ستون ۵۶۰ وسط)
- **پشتیبانی از prefers-reduced-motion**
- **فونت Vazirmatn** با اعداد فارسی، کل اپ `dir="rtl"` و `lang="fa"`

## اجرای محلی

```bash
npm install
npm run dev          # حالت توسعه روی http://localhost:5173
npm run build        # بیلد پروداکشن در dist/
npm run preview      # پیش‌نمایش بیلد روی http://localhost:4173
npm run test:e2e     # تست‌های Playwright (ابتدا build و preview را اجرا کن)
```

برای اجرای تست E2E، ابتدا یک ترمینال `npm run preview` را باز نگه دار، بعد `npm run test:e2e` را اجرا کن.

## انتشار روی GitHub Pages

این پروژه برای انتشار خودکار روی GitHub Pages آماده است:

1. یک ریپوی جدید بساز (پیشنهادی: `naghshineh-prototype`) یا فایل‌ها را به ریپوی موجود منتقل کن.
2. **مهم:** اگر نام ریپو چیزی جز `naghshineh-prototype` است، مقدار `base` را در `vite.config.ts` عوض کن:
   ```ts
   base: '/نام-ریپو-شما/',
   ```
3. پوش کن به `main`:
   ```bash
   git init
   git add .
   git commit -m "init: naghshineh prototype"
   git branch -M main
   git remote add origin https://github.com/USER/naghshineh-prototype.git
   git push -u origin main
   ```
4. در تنظیمات ریپو: **Settings → Pages → Source = GitHub Actions**.
5. ورک‌فلوی `.github/workflows/deploy.yml` به‌طور خودکار روی هر push به `main` اجرا می‌شود.
6. پس از چند دقیقه، اپ روی آدرس زیر در دسترس است:
   ```
   https://USER.github.io/naghshineh-prototype/
   ```

## ساختار پوشه‌ها

```
src/
├── main.tsx                 # ورودی (HashRouter, dir=rtl)
├── App.tsx                  # مسیرها
├── index.css                # توکن‌ها + فونت + tailwind
├── data/data.ts             # همه‌ی داده‌های mock
├── store/useStore.ts        # Zustand + localStorage
├── lib/{persian,motion,hooks}.ts
├── components/
│   ├── layout/              # AppShell, Header, BottomNav, DesktopTabs
│   ├── map/                 # MapView, MapAssets, NameTag, Controls, Minimap, Legend
│   ├── sheets/              # BottomSheet, PlaceSheet
│   ├── library/             # LibraryPage, LevelCard, ManagerCard, MembersTab, HistoryTab, ScoreTable, Podium, RequestCard, RequestSheet, MessageModal, ActivityList, ProfileSheet
│   ├── common/              # Toast, Modal, Button3D, Avatar, Chip, ProgressBar, Skeleton, ComingSoon
│   └── icons.tsx
└── pages/                   # NeighborhoodPage, SchoolPage
tests/flow.spec.ts           # تست E2E (۱۵ تست × ۲ اندازه = ۳۰)
.github/workflows/deploy.yml # build & deploy به Pages
```

## نکته درباره‌ی نقشه‌ها

چون ابزار Figma MCP در محیط ساخت در دسترس نبود، نقشه‌های محله و مدرسه به‌صورت **SVG برنامه‌نویسی‌شده** ساخته شده‌اند (ساختار لایه‌ای: پس‌زمینه + هر ساختمان جدا + برچسب‌های HTML/CSS). مختصات هر ساختمان در آرایه‌ی `places` در `data.ts` تعریف شده. برای تطبیق پیکسل‌به‌پیکسل با فیگما، می‌توانید SVGها را با export واقعی فیگما جایگزین کنید.

## سناریوی تست (علی)

کل سناریوی «علی کتابخانه را پیدا می‌کند و درخواست عضویت می‌دهد» (قدم ۱ تا ۷ + اکشن‌های جانبی) در `tests/flow.spec.ts` پوشش داده شده و در اندازه‌های ۳۶۰×۸۰۰ و ۱۴۴۰×۹۰۰ اجرا می‌شود.
