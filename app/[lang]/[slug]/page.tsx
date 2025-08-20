export { default } from '@/app/page'
import { LANG_OPTIONS } from '@/utils/languageConfig'
import { CONVERSION_SLUGS } from '@/utils/routeSlugs'

export const dynamicParams = false

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  for (const l of LANG_OPTIONS) {
    for (const s of CONVERSION_SLUGS) {
      params.push({ lang: l.code, slug: s })
    }
  }
  return params
}

