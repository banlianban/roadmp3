// 懒加载组件 - 提高首屏加载性能
'use client'

import { lazy, Suspense } from 'react'
import LoadingSpinner from './LoadingSpinner'

// 懒加载音频转换器组件
const AudioConverter = lazy(() => import('./AudioConverter'))

// 懒加载页脚组件
const Footer = lazy(() => import('./Footer'))

// 音频转换器懒加载包装器
export function LazyAudioConverter() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    }>
      <AudioConverter />
    </Suspense>
  )
}

// 页脚懒加载包装器
export function LazyFooter() {
  return (
    <Suspense fallback={
      <div className="h-32 bg-gray-100 animate-pulse" />
    }>
      <Footer />
    </Suspense>
  )
}