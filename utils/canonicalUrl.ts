import { LANG_OPTIONS } from './languageConfig'

// 获取基础网站URL
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://roadmp3.com'
}

// 生成canonical URL - 修复重复页面问题
export function generateCanonicalUrl(pathname: string, lang?: string): string {
  const baseUrl = getBaseUrl()
  
  // 清理路径，移除多余的斜杠
  const cleanPathname = pathname.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
  
  // 如果路径已经包含语言代码，直接使用
  if (LANG_OPTIONS.some(langOption => cleanPathname.startsWith(`/${langOption.code}`))) {
    return `${baseUrl}${cleanPathname}`
  }
  
  // 如果提供了语言参数，构建语言路径
  if (lang && lang !== 'en') {
    const cleanPath = cleanPathname === '/' ? '' : cleanPathname
    return `${baseUrl}/${lang}${cleanPath}`
  }
  
  // 默认英文路径（根路径）
  return `${baseUrl}${cleanPathname}`
}

// 生成所有语言的alternate URLs - 确保一致性
export function generateAlternateUrls(pathname: string, currentLang?: string): Array<{
  hreflang: string
  href: string
}> {
  const baseUrl = getBaseUrl()
  const alternates: Array<{ hreflang: string; href: string }> = []
  
  // 清理路径
  const cleanPathname = pathname.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
  
  // 移除当前路径中的语言前缀以获取基础路径
  let basePath = cleanPathname
  for (const langOption of LANG_OPTIONS) {
    if (cleanPathname.startsWith(`/${langOption.code}/`)) {
      basePath = cleanPathname.substring(`/${langOption.code}`.length)
      break
    } else if (cleanPathname === `/${langOption.code}`) {
      basePath = '/'
      break
    }
  }
  
  // 确保basePath格式正确
  basePath = basePath.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
  
  // 为每种语言生成alternate URL
  for (const langOption of LANG_OPTIONS) {
    const { code, html } = langOption
    let href: string
    
    if (code === 'en') {
      // 英文使用根路径
      href = `${baseUrl}${basePath}`
    } else {
      // 其他语言使用语言前缀
      const cleanPath = basePath === '/' ? '' : basePath
      href = `${baseUrl}/${code}${cleanPath}`
    }
    
    alternates.push({
      hreflang: html,
      href
    })
  }
  
  // 添加 x-default 指向英文版本
  const defaultPath = basePath === '/' ? '' : basePath
  alternates.push({
    hreflang: 'x-default',
    href: `${baseUrl}${defaultPath}`
  })
  
  return alternates
}

// 从路径中提取语言代码
export function extractLangFromPath(pathname: string): string | null {
  for (const langOption of LANG_OPTIONS) {
    if (pathname.startsWith(`/${langOption.code}/`) || pathname === `/${langOption.code}`) {
      return langOption.code
    }
  }
  return null
}

// 验证canonical URL是否有效
export function validateCanonicalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'https:' && urlObj.hostname === 'roadmp3.com'
  } catch {
    return false
  }
}