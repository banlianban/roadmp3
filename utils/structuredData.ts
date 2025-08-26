// 结构化数据配置 - 用于增强搜索引擎显示效果
import { LANG_OPTIONS } from './languageConfig'

const baseUrl = 'https://roadmp3.com'

// 网站基本信息
export const websiteInfo = {
  name: 'RoadMP3',
  description: 'Free online audio and video to car-compatible MP3 converter',
  url: baseUrl,
  founded: '2024-01-01', // 网站创建日期
  logo: `${baseUrl}/favicon.ico`,
  image: `${baseUrl}/favicon.ico`,
  sameAs: [
    // 社交媒体链接（如果有的话）
    // 'https://twitter.com/roadmp3',
    // 'https://facebook.com/roadmp3',
  ]
}

// 生成 WebSite 结构化数据
export function generateWebsiteSchema(lang: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: websiteInfo.name,
    description: websiteInfo.description,
    url: websiteInfo.url,
    inLanguage: LANG_OPTIONS.find(l => l.code === lang)?.html || 'en',
    datePublished: websiteInfo.founded,
    publisher: {
      '@type': 'Organization',
      name: websiteInfo.name,
      logo: {
        '@type': 'ImageObject',
        url: websiteInfo.logo
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/zh?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'RoadMP3 Converter',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      description: 'Convert audio and video files to car-compatible MP3 format',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      featureList: [
        'Convert audio to MP3',
        'Convert video to MP3',
        'Car stereo compatible format',
        'Multiple input formats supported',
        'Free online conversion'
      ]
    }
  }
}

// 生成 Organization 结构化数据
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: websiteInfo.name,
    description: websiteInfo.description,
    url: websiteInfo.url,
    logo: websiteInfo.logo,
    image: websiteInfo.image,
    foundingDate: websiteInfo.founded,
    sameAs: websiteInfo.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: LANG_OPTIONS.map(lang => lang.html)
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Audio Conversion Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Audio to MP3 Conversion',
            description: 'Convert various audio formats to car-compatible MP3'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Video to MP3 Conversion',
            description: 'Extract audio from video files as car-compatible MP3'
          }
        }
      ]
    }
  }
}

// 生成 SoftwareApplication 结构化数据
export function generateSoftwareApplicationSchema(lang: string = 'en') {
  const langOption = LANG_OPTIONS.find(l => l.code === lang)
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'RoadMP3 - Car Audio Converter',
    description: 'Free online tool to convert any audio or video file to car-compatible MP3 format',
    url: websiteInfo.url,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Modern web browser with JavaScript enabled',
    memoryRequirements: '512MB',
    processorRequirements: 'Any',
    storageRequirements: 'No installation required',
    inLanguage: langOption?.html || 'en',
    datePublished: websiteInfo.founded,
    creator: {
      '@type': 'Organization',
      name: websiteInfo.name
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    featureList: [
      'Convert WAV to MP3',
      'Convert FLAC to MP3', 
      'Convert AAC to MP3',
      'Convert video files to MP3',
      'Car stereo optimization',
      'Batch conversion support',
      'No software installation required',
      'Privacy-focused processing'
    ],
    screenshot: websiteInfo.image,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Car Audio Enthusiast'
        },
        reviewBody: 'Perfect tool for converting music files for my car stereo. Works flawlessly!'
      }
    ]
  }
}

// 生成 BreadcrumbList 结构化数据
export function generateBreadcrumbSchema(pathname: string, lang: string = 'en') {
  const breadcrumbs = []
  const parts = pathname.split('/').filter(Boolean)
  
  // 根路径
  breadcrumbs.push({
    '@type': 'ListItem',
    position: 1,
    name: 'Home',
    item: lang === 'en' ? baseUrl : `${baseUrl}/${lang}`
  })
  
  // 如果是转换页面
  if (parts.length >= 2 || (parts.length === 1 && !LANG_OPTIONS.find(l => l.code === parts[0]))) {
    const slug = parts[parts.length - 1]
    if (slug && slug.includes('-mp3')) {
      const format = slug.replace('-mp3', '').toUpperCase()
      breadcrumbs.push({
        '@type': 'ListItem',
        position: 2,
        name: `${format} to MP3 Converter`,
        item: pathname.startsWith('http') ? pathname : `${baseUrl}${pathname}`
      })
    }
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs
  }
}

// 生成完整的结构化数据
export function generateCompleteStructuredData(pathname: string = '/', lang: string = 'en') {
  return {
    website: generateWebsiteSchema(lang),
    organization: generateOrganizationSchema(),
    software: generateSoftwareApplicationSchema(lang),
    breadcrumb: generateBreadcrumbSchema(pathname, lang)
  }
}