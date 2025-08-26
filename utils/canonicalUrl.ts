import { LANG_OPTIONS } from './languageConfig'

// 获取基础网站URL
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://roadmp3.com'
}

// 生成canonical URL
export function generateCanonicalUrl(pathname: string, lang?: string): string {
  const baseUrl = getBaseUrl()
  
  // 如果路径已经包含语言代码，直接使用
  if (pathname.startsWith('/zh') || pathname.startsWith('/en') || pathname.startsWith('/ja') || 
      pathname.startsWith('/ko') || pathname.startsWith('/fr') || pathname.startsWith('/de') ||
      pathname.startsWith('/es') || pathname.startsWith('/ru') || pathname.startsWith('/it') ||
      pathname.startsWith('/pt') || pathname.startsWith('/tr') || pathname.startsWith('/nl') ||
      pathname.startsWith('/pl') || pathname.startsWith('/uk') || pathname.startsWith('/vi') ||
      pathname.startsWith('/th') || pathname.startsWith('/id') || pathname.startsWith('/ms') ||
      pathname.startsWith('/ar') || pathname.startsWith('/he')) {
    return `${baseUrl}${pathname}`
  }
  
  // 如果提供了语言参数，构建语言路径
  if (lang && lang !== 'en') {
    const cleanPath = pathname === '/' ? '' : pathname
    return `${baseUrl}/${lang}${cleanPath}`
  }
  
  // 默认英文路径（根路径）
  return `${baseUrl}${pathname}`
}

// 生成所有语言的alternate URLs
export function generateAlternateUrls(pathname: string, currentLang?: string): Array<{
  hreflang: string
  href: string
}> {
  const baseUrl = getBaseUrl()
  const alternates: Array<{ hreflang: string; href: string }> = []
  
  // 移除当前路径中的语言前缀以获取基础路径
  let basePath = pathname
  for (const langOption of LANG_OPTIONS) {
    if (pathname.startsWith(`/${langOption.code}/`)) {
      basePath = pathname.substring(`/${langOption.code}`.length)
      break
    } else if (pathname === `/${langOption.code}`) {
      basePath = '/'
      break
    }
  }
  
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