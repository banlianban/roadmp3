'use client'

import { useEffect, useState } from 'react'

interface LightTrail {
  id: number
  x: number
  y: number
  length: number
  width: number
  speed: number
  opacity: number
  hue: number
}

export default function BackgroundAnimation() {
  const [trails, setTrails] = useState<LightTrail[]>([])

  useEffect(() => {
    const createTrails = () => {
      const items: LightTrail[] = []
      const count = 20
      for (let i = 0; i < count; i++) {
        items.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          length: 120 + Math.random() * 180,
          width: 2 + Math.random() * 3,
          speed: 1 + Math.random() * 2.5,
          opacity: 0.15 + Math.random() * 0.3,
          hue: 205 + Math.random() * 80 // 蓝紫霓虹
        })
      }
      setTrails(items)
    }

    const animate = () => {
      setTrails(prev => prev.map(t => {
        let nx = t.x + t.speed * 4
        let ny = t.y + t.speed * -1.5 // 略向上，形成斜向光轨
        if (nx - t.length > window.innerWidth || ny < -100) {
          // 重置到左下角区域，像公路流光
          nx = -50 - Math.random() * 200
          ny = window.innerHeight + Math.random() * 150
        }
        return { ...t, x: nx, y: ny }
      }))
    }

    const handleResize = () => createTrails()
    createTrails()
    const timer = setInterval(animate, 40)
    window.addEventListener('resize', handleResize)
    return () => {
      clearInterval(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* 夜间道路渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black opacity-90"></div>

      {/* 车速光轨 */}
      {trails.map(t => (
        <div
          key={t.id}
          className="absolute rounded-full"
          style={{
            left: `${t.x}px`,
            top: `${t.y}px`,
            width: `${t.length}px`,
            height: `${t.width}px`,
            opacity: t.opacity,
            background: `linear-gradient(90deg, hsla(${t.hue}, 90%, 60%, 0) 0%, hsla(${t.hue}, 90%, 60%, 0.9) 50%, hsla(${t.hue}, 90%, 60%, 0) 100%)`,
            transform: 'translate(-50%, -50%) rotate(-15deg)',
            filter: 'blur(0.5px) drop-shadow(0 0 6px hsla(210, 100%, 70%, 0.35))'
          }}
        />
      ))}

      {/* 道路车道线（远处消失的透视） */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-48 opacity-25"
        style={{
          background: `repeating-linear-gradient(90deg, transparent 0 40px, rgba(255,255,255,0.15) 40px 42px, transparent 42px 82px)`,
          clipPath: 'polygon(0 100%, 100% 100%, 70% 0, 30% 0)'
        }}
      ></div>
    </div>
  )
}