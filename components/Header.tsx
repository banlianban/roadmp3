"use client"

import { useEffect, useState } from 'react'
import { Music, Globe, ChevronDown, Check } from 'lucide-react'
import { LANG_OPTIONS, type LangCode, useLanguage } from '@/utils/i18n'

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest?.('#lang-selector')) {
        setOpen(false)
      }
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  const applyLang = (next: LangCode) => {
    setLang(next)
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', next)
      // 将语言写入 Cookie，便于服务端生成对应的 metadata
      document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`
    }
    // 触发语言变化事件，让其他组件能够响应
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChange', { detail: next }))
      // 切换到语言前缀路由，如 /en /zh
      const current = new URL(window.location.href)
      const parts = current.pathname.split('/').filter(Boolean)
      // 如果第一段已是语言码则替换，否则在前面加一段
      const supported = ['en','zh','ja','ko','fr','de','es','ru','it','pt','tr','nl','pl','uk','vi','th','id','ms','ar','he']
      if (parts.length && supported.includes(parts[0])) {
        parts[0] = next
      } else {
        parts.unshift(next)
      }
      const nextPath = '/' + parts.join('/')
      window.location.assign(nextPath)
    }
    setOpen(false)
  }

  return (
    <header className="bg-transparent backdrop-blur-xl shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300 transform group-hover:scale-110">
              <Music className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-accent">{t('title')}</h1>
              <p className="text-sm text-gray-500 font-medium">{t('subtitle')}</p>
            </div>
          </div>
        </div>

        {/* 语言切换 */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2" id="lang-selector">
          <button onClick={() => setOpen(v => !v)} className="btn-secondary px-3 py-2 text-sm">
            <Globe className="w-4 h-4" />
            <span className="ml-1">{LANG_OPTIONS.find(o => o.code === lang)?.label || '中文'}</span>
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-44 max-h-80 overflow-auto bg-white rounded-xl border border-gray-200 shadow-medium">
              {LANG_OPTIONS.map(option => (
                <button
                  key={option.code}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between ${lang === option.code ? 'text-primary-600' : 'text-gray-700'}`}
                  onClick={() => applyLang(option.code)}
                >
                  <span>{option.label}</span>
                  {lang === option.code && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 