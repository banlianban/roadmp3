import ServerHomePage from '@/components/ServerHomePage'
import { LANG_OPTIONS } from '@/utils/languageConfig'
import { generateMetadata as genTDK } from '@/utils/tdk'
import type { Metadata } from 'next'

// 服务器端组件
export default function LangHomePage() {
  return <ServerHomePage />
}

// 仅在构建时生成这些静态路径，禁用运行时的任意动态参数
export const dynamicParams = false

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const pathname = `/${params.lang}`
  return genTDK(params.lang, pathname)
}

export function generateStaticParams() {
  return LANG_OPTIONS.map(l => ({ lang: l.code }))
}

