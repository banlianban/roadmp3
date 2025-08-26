'use client'

import { generateCompleteStructuredData } from '@/utils/structuredData'

interface StructuredDataProps {
  pathname?: string
  lang?: string
}

export default function StructuredData({ pathname = '/', lang = 'en' }: StructuredDataProps) {
  const structuredData = generateCompleteStructuredData(pathname, lang)
  
  return (
    <>
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.website)
        }}
      />
      
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.organization)
        }}
      />
      
      {/* Software Application Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.software)
        }}
      />
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.breadcrumb)
        }}
      />
    </>
  )
}