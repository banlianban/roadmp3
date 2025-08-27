import { generateCompleteStructuredData } from '@/utils/structuredData'

interface StructuredDataProps {
  pathname?: string
  lang?: string
}

export default function StructuredData({ pathname = '/', lang = 'en' }: StructuredDataProps) {
  const structuredData = generateCompleteStructuredData(pathname, lang)
  
  // 合并所有结构化数据到一个script标签中以提高性能
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      structuredData.website,
      structuredData.organization,
      structuredData.software,
      structuredData.breadcrumb
    ]
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(combinedSchema)
      }}
    />
  )
}