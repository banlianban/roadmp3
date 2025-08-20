export { default } from '@/app/page'
import { LANG_OPTIONS } from '@/utils/languageConfig'

// 仅在构建时生成这些静态路径，禁用运行时的任意动态参数
export const dynamicParams = false

export function generateStaticParams() {
  return LANG_OPTIONS.map(l => ({ lang: l.code }))
}

