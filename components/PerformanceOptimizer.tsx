'use client'

import { useEffect } from 'react'
import { preloadCriticalResources, lazyLoadImages, cleanupMemory } from '@/utils/performance'

export default function PerformanceOptimizer() {
  useEffect(() => {
    // 预加载关键资源
    preloadCriticalResources()
    
    // 初始化懒加载
    lazyLoadImages()
    
    // 设置内存清理
    cleanupMemory()
    
    // 预加载下一页的关键资源
    const prefetchNextPage = () => {
      const links = document.querySelectorAll('a[href^="/"]')
      links.forEach((link) => {
        const href = (link as HTMLAnchorElement).href
        if (href && href !== window.location.href) {
          const prefetchLink = document.createElement('link')
          prefetchLink.rel = 'prefetch'
          prefetchLink.href = href
          document.head.appendChild(prefetchLink)
        }
      })
    }
    
    // 延迟执行预获取，避免影响首屏加载
    const timer = setTimeout(prefetchNextPage, 2000)
    
    return () => {
      clearTimeout(timer)
    }
  }, [])
  
  return null // 这个组件不渲染任何UI
}