import { NextResponse, NextRequest } from 'next/server'
import { LANG_OPTIONS } from '@/utils/languageConfig'

const SUPPORTED = new Set(LANG_OPTIONS.map(l => `/${l.code}`))

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 保留 API 路由，避免被语言重定向
  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // 允许静态资源通过
  if (pathname.startsWith('/_next') || 
      pathname.startsWith('/favicon') || 
      pathname.startsWith('/sitemap') || 
      pathname.startsWith('/robots') ||
      pathname.includes('.')) {
    return NextResponse.next()
  }

  // 简化逻辑：允许所有语言页面直接访问
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length >= 1) {
    const langOk = LANG_OPTIONS.some(l => l.code === parts[0])
    if (langOk) {
      // 语言页面直接通过
      return NextResponse.next()
    }
  }

  // 根路径直接通过，不重定向（SEO友好）
  if (pathname === '/' || pathname === '') {
    return NextResponse.next()
  }

  // 其他路径重定向到英文
  const url = req.nextUrl.clone()
  url.pathname = '/en'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|sitemap.xml|robots.txt|public|api).*)'],
}

