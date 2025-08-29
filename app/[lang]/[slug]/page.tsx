import ServerHomePage from '@/components/ServerHomePage'
import { LANG_OPTIONS } from '@/utils/languageConfig'
import { CONVERSION_SLUGS } from '@/utils/routeSlugs'
import { generateMetadata as genTDK } from '@/utils/tdk'
import type { Metadata } from 'next'

// 服务器端组件
export default function SlugHomePage() {
  return <ServerHomePage />
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const pathname = `/${params.lang}/${params.slug}`
  return genTDK(params.lang, pathname)
}

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  for (const l of LANG_OPTIONS) {
    for (const s of CONVERSION_SLUGS) {
      params.push({ lang: l.code, slug: s })
    }
  }
  return params
}

