import { Suspense } from 'react'
import ClientHomePage from '@/components/ClientHomePage'

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <ClientHomePage />
    </Suspense>
  )
} 