import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ErrorBoundary from '@/components/ErrorBoundary'
import StructuredData from '@/components/StructuredData'
import { generateMetadata as genTDK } from '@/utils/tdk'
import { getHtmlLang } from '@/utils/languageConfig'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const pathname = `/${params.lang}`
  return genTDK(params.lang, pathname)
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
        <StructuredData pathname={`/${params.lang}`} lang={params.lang} />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}

