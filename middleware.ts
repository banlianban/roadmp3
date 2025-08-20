import { NextResponse, NextRequest } from 'next/server'
import { LANG_OPTIONS } from '@/utils/languageConfig'

const SUPPORTED = new Set(LANG_OPTIONS.map(l => `/${l.code}`))

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 保留 API 路由，避免被语言重定向
  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // 允许 /{lang} 或 /{lang}/{slug}（slug 需在白名单内）
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length >= 1) {
    const langOk = LANG_OPTIONS.some(l => l.code === parts[0])
    if (langOk) {
      if (parts.length === 1) return NextResponse.next()
      // 第二段 slug 校验
      const { CONVERSION_SLUGS } = require('@/utils/routeSlugs') as typeof import('@/utils/routeSlugs')
      if (!parts[1] || CONVERSION_SLUGS.includes(parts[1])) {
        return NextResponse.next()
      }
    }
  }

  // 根路径或非语言前缀路径，重定向到最佳语言
  if (pathname === '/' || pathname === '') {
    // 从 cookie 或浏览器语言选择最优语言
    const cookieLang = req.cookies.get('lang')?.value
    const byCookie = LANG_OPTIONS.find(l => l.code === cookieLang)
    let target = byCookie?.code

    if (!target) {
      const header = req.headers.get('accept-language') || ''
      const candidates = header.split(',').map(p => p.split(';')[0].trim().toLowerCase())
      for (const cand of candidates) {
        const primary = cand.split('-')[0]
        const byHtml = LANG_OPTIONS.find(l => l.html.toLowerCase() === cand)
        if (byHtml) { target = byHtml.code; break }
        const byPrimary = LANG_OPTIONS.find(l => l.code === primary)
        if (byPrimary) { target = byPrimary.code; break }
      }
    }

    if (!target) target = 'en'

    const url = req.nextUrl.clone()
    url.pathname = `/${target}`
    return NextResponse.redirect(url)
  }

  // 其它不受支持的路径统一重定向到 /en，避免 404
  const url = req.nextUrl.clone()
  url.pathname = '/en'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|public|api).*)'],
}

