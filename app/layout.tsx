import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import ErrorBoundary from '@/components/ErrorBoundary'
import StructuredData from '@/components/StructuredData'
import { cookies } from 'next/headers'
import { generateMetadata as generateTDKMetadata } from '@/utils/tdk'
import { getHtmlLang } from '@/utils/languageConfig'

const inter = Inter({ subsets: ['latin'] })

// 基于 Cookie 动态生成 metadata（Next.js 会在服务端执行此函数）
export async function generateMetadata(): Promise<Metadata> {
  const langCookie = cookies().get('lang')?.value || 'en'
  const baseMetadata = generateTDKMetadata(langCookie, '/')
  
  return {
    ...baseMetadata,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://roadmp3.com'),
    verification: {
      google: 'JemmzyxGt-4szeq0OHh6ukF3hBzDWjxxPTBytz1shZM',
    },
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
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WQWJ763TNL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WQWJ763TNL');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <StructuredData pathname="/" lang={langCookie} />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
} 