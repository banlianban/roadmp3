// TDK使用示例
import { getTDK, generateMetadata } from './tdk'
import { LANG_OPTIONS, type LangCode } from './languageConfig'

// 示例1: 获取特定语言的TDK配置
export function exampleGetTDK() {
  // 获取中文TDK
  const chineseTDK = getTDK('zh')
  console.log('中文TDK:', chineseTDK)
  
  // 获取日文TDK
  const japaneseTDK = getTDK('ja')
  console.log('日文TDK:', japaneseTDK)
  
  // 获取德文TDK
  const germanTDK = getTDK('de')
  console.log('德文TDK:', germanTDK)
}

// 示例2: 在页面组件中使用动态TDK
export function examplePageComponent() {
  // 假设从URL参数或用户偏好获取语言
  const userLang = 'zh' // 可以是 'en', 'zh', 'ja', 'ko', 'fr', 'de', 'es', 'ru', 'it', 'pt', 'tr', 'nl', 'pl', 'uk', 'vi', 'th', 'id', 'ms', 'ar', 'he'
  
  const tdk = getTDK(userLang)
  
  return {
    title: tdk.title,
    description: tdk.description,
    keywords: tdk.keywords
  }
}

// 示例3: 在Next.js页面中使用动态metadata
export async function exampleNextPageMetadata({ params }: { params: { lang: string } }) {
  return generateMetadata(params.lang)
}

// 示例4: 获取所有支持的语言列表
export function getSupportedLanguages() {
  return LANG_OPTIONS.map(lang => ({
    code: lang.code,
    name: lang.label
  }))
}

// 示例5: 语言检测和回退
export function detectLanguage(userLang?: string, fallbackLang: LangCode = 'en'): LangCode {
  const isLangCode = (v: string): v is LangCode => LANG_OPTIONS.some(l => l.code === v)
  if (userLang && isLangCode(userLang)) {
    return userLang as LangCode
  }
  return fallbackLang
}

// 示例6: 在React组件中使用
export function useTDK(lang: LangCode = 'en') {
  const tdk = getTDK(lang)
  
  return {
    title: tdk.title,
    description: tdk.description,
    keywords: tdk.keywords,
    // 可以添加更多SEO相关的属性
    ogTitle: tdk.title,
    ogDescription: tdk.description,
    twitterTitle: tdk.title,
    twitterDescription: tdk.description
  }
} 