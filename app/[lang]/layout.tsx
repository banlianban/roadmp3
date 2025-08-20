import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ErrorBoundary from '@/components/ErrorBoundary'
import { generateMetadata as genTDK } from '@/utils/tdk'
import { getHtmlLang } from '@/utils/languageConfig'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return genTDK(params.lang)
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const htmlLang = getHtmlLang(params.lang)
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

