import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ErrorBoundary from '@/components/ErrorBoundary'
import { cookies } from 'next/headers'
import { generateMetadata as generateTDKMetadata } from '@/utils/tdk'
import { getHtmlLang } from '@/utils/languageConfig'

const inter = Inter({ subsets: ['latin'] })

// 基于 Cookie 动态生成 metadata（Next.js 会在服务端执行此函数）
export async function generateMetadata(): Promise<Metadata> {
  const langCookie = cookies().get('lang')?.value || 'en'
  const baseMetadata = generateTDKMetadata(langCookie)
  
  return {
    ...baseMetadata,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'),
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const langCookie = cookies().get('lang')?.value || 'en'
  const htmlLang = getHtmlLang(langCookie)
  
  return (
    <html lang={htmlLang}>
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
} 