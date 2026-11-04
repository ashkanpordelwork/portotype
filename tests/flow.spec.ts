import { test, expect, type Page } from '@playwright/test'

// ============================================================
//  سناریوی کامل: «علی کتابخانه‌ی مدرسه رو پیدا می‌کنه و درخواست عضویت می‌ده»
//  در دو اندازه: موبایل ۳۶۰×۸۰۰ و دسکتاپ ۱۴۴۰×۹۰۰
//  نکته: متن فارسی ZWNJ (U+200C) دارد؛ الگوها را طوری می‌نویسیم که
//  روی مرز ZWNJ قرار نگیرند، یا از testId استفاده می‌کنیم.
// ============================================================

const isMobile = (p: Page) => (p.viewportSize()?.width ?? 0) < 768

async function clearStorage(p: Page) {
  // پاک‌سازی فقط یک بار قبل از شروع تست؛ initScript نباید روی reload اجرا شود.
  try { await p.evaluate(() => localStorage.removeItem('naghshineh-store')) } catch {}
}

test.describe('سناریوی علی', () => {
  test.beforeEach(async ({ page }) => {
    // ابتدا یک بار goto کن تا صفحه بالا بیاید، سپس ذخیره را پاک کن و دوباره بارگذاری کن
    await page.goto('#/')
    await clearStorage(page)
    await page.reload()
    await page.waitForTimeout(500)
  })

  // ---------- قدم ۱ ----------
  test('قدم ۱: نقشه‌ی محله', async ({ page }) => {
    await page.goto('#/')
    await page.waitForTimeout(1000)
    await expect(page.getByText(/واردش بشی/)).toBeVisible()
    await expect(page.getByText(/شهید بهشتی/).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /محله من/ })).toBeVisible()
    await expect(page.getByRole('button', { name: 'بزرگ‌نمایی' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'مکان من' })).toBeVisible()
  })

  // ---------- قدم ۲ ----------
  test('قدم ۲: ورود به مدرسه', async ({ page }) => {
    await page.goto('#/')
    await page.waitForTimeout(1000)
    await page.getByText(/شهید بهشتی/).first().click()
    await page.waitForTimeout(1800)
    await expect(page).toHaveURL(/#\/school$/)
    await expect(page.getByText(/۶ مکان/)).toBeVisible()
    await expect(page.getByText(/دانش/)).toBeVisible()
    await expect(page.getByText(/^کتابخانه$/).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /دفتر کار/ })).toBeVisible()
    await expect(page.getByRole('link', { name: /نقش/ })).toBeVisible()
    await expect(page.getByRole('link', { name: /مسئولیت/ })).toBeVisible()
  })

  // ---------- قدم ۳ ----------
  test('قدم ۳: انتخاب کتابخانه و شیت', async ({ page }) => {
    await page.goto('#/school')
    await page.waitForTimeout(1200)
    await page.getByText(/^کتابخانه$/).first().click()
    await page.waitForTimeout(1200)
    await expect(page.getByText(/۵ از ۵ نقش پر شده/)).toBeVisible()
    await expect(page.getByText(/امیر حسینی/).first()).toBeVisible()
    await expect(page.getByRole('button', { name: 'ورود به کتابخانه' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'جزئیات' })).toBeVisible()
  })

  // ---------- قدم ۳b ----------
  test('قدم ۳b: بستن شیت', async ({ page }) => {
    await page.goto('#/school')
    await page.waitForTimeout(1200)
    await page.getByText(/^کتابخانه$/).first().click()
    await page.waitForTimeout(900)
    await page.getByRole('button', { name: 'بستن' }).first().click()
    await page.waitForTimeout(600)
    await expect(page.getByRole('button', { name: 'ورود به کتابخانه' })).toHaveCount(0)
  })

  // ---------- قدم ۴ ----------
  test('قدم ۴: صفحه‌ی کتابخانه و اعضای امسال', async ({ page }) => {
    await page.goto('#/school')
    await page.waitForTimeout(1200)
    await page.getByText(/^کتابخانه$/).first().click()
    await page.waitForTimeout(900)
    await page.getByRole('button', { name: 'ورود به کتابخانه' }).click()
    await page.waitForTimeout(1800)
    await expect(page).toHaveURL(/#\/school\/library$/)
    await expect(page.getByText(/^شکوفا$/).first()).toBeVisible()
    await expect(page.getByText(/سینا کریمی/).first()).toBeVisible()
    await expect(page.getByText(/محمد نوری/).first()).toBeVisible()
    await expect(page.getByText(/امیر حسینی/).first()).toBeVisible()
    await expect(page.getByText(/عضو کتابخانه نیستی/)).toBeVisible()
    await expect(page.getByRole('button', { name: 'درخواست عضویت' })).toBeVisible()
  })

  // ---------- قدم ۵ ----------
  test('قدم ۵: تب سوابق و چیپ‌های سال', async ({ page }) => {
    await page.goto('#/school/library')
    await page.waitForTimeout(1800)
    await page.getByRole('button', { name: 'سوابق' }).click()
    await page.waitForTimeout(900)
    await expect(page.getByRole('button', { name: /۱۴۰۴ تا ۱۴۰۵/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /۱۴۰۳ تا ۱۴۰۴/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /۱۴۰۲ تا ۱۴۰۳/ })).toBeVisible()
    await expect(page.getByText(/خلاصه/)).toBeVisible()
  })

  test('قدم ۵b: سال دیگر + سال خالی', async ({ page }) => {
    await page.goto('#/school/library')
    await page.waitForTimeout(1800)
    await page.getByRole('button', { name: 'سوابق' }).click()
    await page.waitForTimeout(700)
    await page.getByRole('button', { name: /۱۴۰۲ تا ۱۴۰۳/ }).click()
    await page.waitForTimeout(800)
    await expect(page.getByText(/حسین مرادی/).first()).toBeVisible()
    await page.getByRole('button', { name: /۱۴۰۱ تا ۱۴۰۲/ }).click()
    await page.waitForTimeout(800)
    await expect(page.getByText(/ثبت نشده/)).toBeVisible()
  })

  // ---------- قدم ۶ ----------
  test('قدم ۶: درخواست عضویت', async ({ page }) => {
    await page.goto('#/school/library')
    await page.waitForTimeout(1800)
    await page.getByRole('button', { name: 'درخواست عضویت' }).click()
    await page.waitForTimeout(700)
    await expect(page.getByText(/درخواست عضویت در کتابخانه/)).toBeVisible()
    await page.waitForTimeout(500)
    const sendBtn = page.getByRole('button', { name: 'ارسال درخواست' })
    await expect(sendBtn).toBeDisabled()
    await page.getByTestId('role-guide').click({ force: true })
    await page.getByPlaceholder(/عاشق/).fill('کوتاه')
    await expect(sendBtn).toBeDisabled()
    await page.getByPlaceholder(/عاشق/).fill('عاشق کتاب‌خوانی‌ام و می‌خوام به بچه‌ها کمک کنم کتاب‌های خوب پیدا کنن.')
    await expect(sendBtn).toBeEnabled()
    await sendBtn.click()
    await page.waitForTimeout(900)
    await expect(page.getByText(/فرستاده شد/)).toBeVisible()
    await expect(page.getByText(/در انتظار تایید/)).toBeVisible()
    await expect(page.getByRole('button', { name: 'لغو درخواست' })).toBeVisible()
    const stored = await page.evaluate(() => localStorage.getItem('naghshineh-store'))
    expect(stored).toContain('pending')
  })

  test('قدم ۶b: حفظ وضعیت پس از رفرش', async ({ page }) => {
    await page.goto('#/school/library')
    await page.waitForTimeout(1800)
    await page.getByRole('button', { name: 'درخواست عضویت' }).click()
    await page.waitForTimeout(600)
    await page.getByTestId('role-guide').click({ force: true })
    await page.getByPlaceholder(/عاشق/).fill('عاشق کتاب‌خوانی‌ام و می‌خوام به بچه‌ها کمک کنم.')
    await page.getByRole('button', { name: 'ارسال درخواست' }).click()
    await page.waitForTimeout(1200)
    // قبل از رفرش، وضعیت باید pending باشد
    await expect(page.getByText(/در انتظار تایید/)).toBeVisible()
    await page.reload()
    await page.waitForTimeout(1800)
    await expect(page.getByText(/در انتظار تایید/)).toBeVisible()
    await expect(page.getByRole('button', { name: 'لغو درخواست' })).toBeVisible()
  })

  // ---------- قدم ۷ ----------
  test('قدم ۷: بازگشت به نقشه‌ی مدرسه', async ({ page }) => {
    await page.goto('#/school/library')
    await page.waitForTimeout(1800)
    await page.getByRole('button', { name: 'بازگشت به نقشه' }).click()
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL(/#\/school$/)
    await expect(page.getByText(/^کتابخانه$/).first()).toBeVisible()
  })

  test('قدم ۷b: back مرورگر', async ({ page }) => {
    await page.goto('#/')
    await page.waitForTimeout(800)
    await page.getByText(/شهید بهشتی/).first().click()
    await page.waitForTimeout(1800)
    await page.goto('#/school/library')
    await page.waitForTimeout(1400)
    await page.goBack()
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL(/#\/school$/)
    await page.goBack()
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL(/#\/$/)
  })

  // ---------- اکشن‌های جانبی ----------
  test('جانبی: پیام به مسئول', async ({ page }) => {
    await page.goto('#/school/library')
    await page.waitForTimeout(1800)
    await page.getByRole('button', { name: 'پیام' }).first().click()
    await page.waitForTimeout(600)
    await expect(page.getByText(/پیام به مسئول/)).toBeVisible()
    await page.getByPlaceholder(/پیامت/).fill('سلام، چه کتاب‌هایی رو پیشنهاد می‌کنید؟')
    await page.getByRole('button', { name: 'ارسال پیام' }).click()
    await page.waitForTimeout(700)
    await expect(page.getByText(/پیامت فرستاده شد/)).toBeVisible()
  })

  test('جانبی: پروفایل عضو', async ({ page }) => {
    await page.goto('#/school/library')
    await page.waitForTimeout(1800)
    await page.getByText(/رضا احمدی/).first().click()
    await page.waitForTimeout(700)
    await expect(page.getByText(/پروفایل عضو/)).toBeVisible()
    await expect(page.getByText(/نشان ها|نشان‌ها/)).toBeVisible({ timeout: 5000 })
  })

  test('جانبی: صفحه‌ی به‌زودی', async ({ page }) => {
    await page.goto('#/')
    await page.waitForTimeout(800)
    await page.getByRole('link', { name: /پروفایل/ }).click()
    await page.waitForTimeout(700)
    await expect(page.getByText(/فعال می شود|فعال می‌شود/)).toBeVisible()
    await page.getByRole('button', { name: /بازگشت به محله/ }).click()
    await page.waitForTimeout(600)
    await expect(page).toHaveURL(/#\/$/)
  })

  test('جانبی: مکان غیرفعال toast', async ({ page }) => {
    await page.goto('#/school')
    await page.waitForTimeout(1200)
    await page.getByText(/^آزمایشگاه$/).first().click()
    await page.waitForTimeout(900)
    // دکمه ورود برای مکان غیرفعال → toast
    await page.getByRole('button', { name: 'ورود' }).click()
    await page.waitForTimeout(600)
    await expect(page.getByText(/آزمایشی نیست|آزمایشی‌نیست/)).toBeVisible()
  })
})
