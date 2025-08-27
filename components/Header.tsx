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
    <header className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-accent-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300 transform group-hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Music className="w-6 h-6 text-white relative z-10" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-accent leading-tight">{t('title')}</h1>
              <p className="text-sm text-gray-400 font-medium mt-1">{t('subtitle')}</p>
            </div>
          </div>

          {/* 语言切换 */}
          <div className="relative" id="lang-selector">
            <button 
              onClick={() => setOpen(v => !v)} 
              className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 hover:bg-slate-700/60 backdrop-blur-sm rounded-xl border border-white/10 text-white/90 hover:text-white transition-all duration-300 shadow-soft hover:shadow-medium"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{LANG_OPTIONS.find(o => o.code === lang)?.label || '中文'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
              <div className="absolute right-0 mt-3 w-48 max-h-80 overflow-auto bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-soft">
                <div className="p-2">
                  {LANG_OPTIONS.map(option => (
                    <button
                      key={option.code}
                      className={`w-full text-left px-4 py-3 rounded-xl hover:bg-slate-700/60 flex items-center justify-between transition-all duration-200 ${
                        lang === option.code 
                          ? 'text-accent-400 bg-slate-700/40' 
                          : 'text-white/80 hover:text-white'
                      }`}
                      onClick={() => applyLang(option.code)}
                    >
                      <span className="text-sm font-medium">{option.label}</span>
                      {lang === option.code && <Check className="w-4 h-4 text-accent-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 