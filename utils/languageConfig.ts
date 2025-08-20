// 语言配置 - 仅包含静态数据，可在服务端使用
export const LANG_OPTIONS = [
  { code: 'zh', label: '中文', html: 'zh-CN' },
  { code: 'en', label: 'English', html: 'en' },
  { code: 'ja', label: '日本語', html: 'ja' },
  { code: 'ko', label: '한국어', html: 'ko' },
  { code: 'fr', label: 'Français', html: 'fr' },
  { code: 'de', label: 'Deutsch', html: 'de' },
  { code: 'es', label: 'Español', html: 'es' },
  { code: 'ru', label: 'Русский', html: 'ru' },
  { code: 'it', label: 'Italiano', html: 'it' },
  { code: 'pt', label: 'Português', html: 'pt' },
  { code: 'tr', label: 'Türkçe', html: 'tr' },
  { code: 'nl', label: 'Nederlands', html: 'nl' },
  { code: 'pl', label: 'Polski', html: 'pl' },
  { code: 'uk', label: 'Українська', html: 'uk' },
  { code: 'vi', label: 'Tiếng Việt', html: 'vi' },
  { code: 'th', label: 'ไทย', html: 'th' },
  { code: 'id', label: 'Bahasa Indonesia', html: 'id' },
  { code: 'ms', label: 'Bahasa Melayu', html: 'ms' },
  { code: 'ar', label: 'العربية', html: 'ar' },
  { code: 'he', label: 'עברית', html: 'he' },
] as const

export type LangCode = typeof LANG_OPTIONS[number]['code']

// 获取HTML语言代码的辅助函数
export function getHtmlLang(langCode: string): string {
  const option = LANG_OPTIONS.find(o => o.code === langCode)
  return option?.html || 'en'
} 