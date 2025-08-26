export { default } from '@/app/page'
import { LANG_OPTIONS } from '@/utils/languageConfig'
import { generateMetadata as genTDK } from '@/utils/tdk'
import type { Metadata } from 'next'

// 仅在构建时生成这些静态路径，禁用运行时的任意动态参数
export const dynamicParams = false

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const pathname = `/${params.lang}`
  return genTDK(params.lang, pathname)
}

export function generateStaticParams() {
  return LANG_OPTIONS.map(l => ({ lang: l.code }))
}

