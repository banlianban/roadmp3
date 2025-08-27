// 性能监控和优化工具
'use client'

// Web Vitals 监控
export function reportWebVitals(metric: any) {
  // 在生产环境中，您可以将这些数据发送到分析服务
  if (process.env.NODE_ENV === 'production') {
    console.log('Web Vitals:', metric)
    
    // 示例：发送到Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        custom_parameter_1: Math.round(metric.value),
        custom_parameter_2: metric.id,
        custom_parameter_3: metric.name === 'CLS' ? 'low' : 'milliseconds'
      })
    }
  }
}

// 预加载关键资源
export function preloadCriticalResources() {
  if (typeof window !== 'undefined') {
    // 预加载FFmpeg配置
    const link1 = document.createElement('link')
    link1.rel = 'preload'
    link1.href = '/ffmpeg-config.js'
    link1.as = 'script'
    document.head.appendChild(link1)
    
    // 预连接到CDN
    const link2 = document.createElement('link')
    link2.rel = 'preconnect'
    link2.href = 'https://unpkg.com'
    link2.crossOrigin = 'anonymous'
    document.head.appendChild(link2)
  }
}

// 懒加载图片工具
export function lazyLoadImages() {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ''
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      })
    })
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img)
    })
  }
}

// 内存清理工具
export function cleanupMemory() {
  if (typeof window !== 'undefined') {
    // 清理未使用的事件监听器
    const cleanup = () => {
      // 手动垃圾回收建议（仅在开发环境）
      if (process.env.NODE_ENV === 'development' && (window as any).gc) {
        (window as any).gc()
      }
    }
    
    // 页面隐藏时清理
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        setTimeout(cleanup, 5000)
      }
    })
  }
}

// 性能提示
export const performanceTips = {
  // 建议使用的图片格式
  imageFormats: ['webp', 'avif', 'jpg', 'png'],
  
  // 建议的资源大小
  maxImageSize: 500 * 1024, // 500KB
  maxScriptSize: 200 * 1024, // 200KB
  
  // Core Web Vitals 阈值
  vitalsThresholds: {
    LCP: 2500, // Largest Contentful Paint
    FID: 100,  // First Input Delay
    CLS: 0.1   // Cumulative Layout Shift
  }
}