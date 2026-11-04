// تبدیل اعداد انگلیسی به فارسی و قالب‌بندی

const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

/** تبدیل هر رشته/عدد به ارقام فارسی */
export function toFa(input: string | number): string {
  return String(input).replace(/\d/g, (d) => FA_DIGITS[+d])
}

/** قالب‌بندی عدد با جداکننده‌ی هزارگان (به‌سبک فارسی: ،) سپس تبدیل به فارسی */
export function faNum(n: number): string {
  return toFa(n.toLocaleString('en-US'))
}

/** جداکننده‌ی هزارگان فارسی */
export function faGrouped(n: number): string {
  return faNum(n)
}

/** اعداد با صفر پیشوند برای رتبه */
export function faRank(n: number): string {
  return toFa(String(n).padStart(2, '0'))
}

/** شمارنده‌ی کاراکتر فارسی */
export function faCount(n: number, max: number): string {
  return `${toFa(n)} / ${toFa(max)}`
}

/** تاریخ شمسی ساده‌شده برای نمایش (ورودی: متن از پیش آماده) */
export function faDate(text: string): string {
  return toFa(text)
}
